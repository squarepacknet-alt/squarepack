"use client";
import { useState, useMemo, useRef } from "react";
import {
  Plus, Edit2, Trash2, X, Image as ImageIcon, Globe, FileText,
  Search, ListTree, Sparkles, CheckCircle2, AlertCircle, Copy, Check,
  Upload, Eye, Trash, CheckSquare, Square, AlignLeft, AlignCenter,
  AlignRight, Maximize2, RefreshCw, Send, BookmarkCheck
} from "lucide-react";
import { Blog, BlogFAQ, BlogFormData, ModalMode } from "../types";
import { uploadBlogImageRequest } from "../api";
import dynamic from "next/dynamic";

const ReactQuill = dynamic<any>(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";

interface BlogsTabProps {
  blogs: Blog[];
  onCreate: (data: BlogFormData) => Promise<boolean>;
  onUpdate: (id: string, data: BlogFormData) => Promise<boolean>;
  onDelete: (id: string) => void;
  canDelete?: boolean;
  showToast?: (msg: string, type: "success" | "error") => void;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

interface TocItem {
  id: string;
  tag: string;
  originalText: string;
  customLabel: string;
  anchor: string;
  selected: boolean;
}

export function BlogsTab({ blogs, onCreate, onUpdate, onDelete, canDelete = true, showToast }: BlogsTabProps) {
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"content" | "seo" | "faq" | "preview">("content");
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // FAQ state
  const [faqItems, setFaqItems] = useState<BlogFAQ[]>([]);

  // Cover image upload state
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const coverFileInputRef = useRef<HTMLInputElement>(null);

  // Custom Table of Contents Modal State
  const [isTocModalOpen, setIsTocModalOpen] = useState(false);
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [tocStyle, setTocStyle] = useState<"card" | "numbered" | "minimal">("card");
  const [tocTitle, setTocTitle] = useState("Table of Contents");

  // Insert Image with ALT Text Modal State
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageTab, setImageTab] = useState<"upload" | "url">("upload");
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [imageAltInput, setImageAltInput] = useState("");
  const [imageCaptionInput, setImageCaptionInput] = useState("");
  const [imageAlignment, setImageAlignment] = useState<"center" | "left" | "right" | "full">("center");
  const [isUploadingContentImage, setIsUploadingContentImage] = useState(false);
  const contentImageFileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<BlogFormData>({
    title: "",
    slug: "",
    summary: "",
    content: "",
    cover_image: "",
    author: "Admin",
    is_published: false,
    meta_title: "",
    meta_description: "",
    keywords: "",
    permalink: "",
    faqs: [],
  });

  const quillRef = useRef<any>(null);

  // Auto update slug & meta_title when title changes
  const handleTitleChange = (newTitle: string) => {
    setFormData((prev) => {
      const updates: Partial<BlogFormData> = { title: newTitle };
      if (modalMode === "create" || !prev.slug) {
        updates.slug = slugify(newTitle);
      }
      if (modalMode === "create" || !prev.meta_title) {
        updates.meta_title = newTitle;
      }
      return { ...prev, ...updates };
    });
  };

  // --- Cover Image Upload Handler ---
  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (!file) return;

    const fd = new FormData();
    fd.append("file", file);
    fd.append("blog_id", editingId || "cover_" + Date.now().toString());

    try {
      setIsUploadingCover(true);
      if (showToast) showToast("Uploading cover image to Supabase...", "success");
      const res = await uploadBlogImageRequest(fd);
      if (res.ok) {
        const { url } = await res.json();
        setFormData((prev) => ({ ...prev, cover_image: url }));
        if (showToast) showToast("Cover image uploaded successfully!", "success");
      } else {
        const errData = await res.json().catch(() => ({}));
        const errMsg = errData.detail || "Failed to upload cover image";
        if (showToast) showToast(errMsg, "error");
      }
    } catch (err: any) {
      console.error("Cover image upload failed", err);
      if (showToast) showToast("Cover image upload error", "error");
    } finally {
      setIsUploadingCover(false);
      if (coverFileInputRef.current) coverFileInputRef.current.value = "";
    }
  };

  // --- Open Custom TOC Modal & Scan Content ---
  const handleOpenTocModal = () => {
    const html = formData.content;
    const parser = new DOMParser();
    const doc = parser.parseFromString(html || "", "text/html");
    const headings = doc.querySelectorAll("h1, h2, h3, h4");

    const extracted: TocItem[] = [];
    headings.forEach((h, index) => {
      const text = h.textContent?.trim() || `Section ${index + 1}`;
      const anchor = slugify(text) || `section-${index + 1}`;
      extracted.push({
        id: `h_${index}_${Date.now()}`,
        tag: h.tagName.toLowerCase(),
        originalText: text,
        customLabel: text,
        anchor: anchor,
        selected: true,
      });
    });

    setTocItems(extracted);
    setIsTocModalOpen(true);
  };

  // --- Insert Custom TOC into Quill Editor ---
  const handleInsertToc = () => {
    const selected = tocItems.filter((item) => item.selected);
    if (selected.length === 0) {
      if (showToast) showToast("Please select at least one heading for the Table of Contents", "error");
      return;
    }

    const quill = quillRef.current?.getEditor ? quillRef.current.getEditor() : null;
    if (!quill) return;

    let tocHtml = "";

    if (tocStyle === "card") {
      tocHtml = `<div class="toc-container" style="background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:14px;padding:20px 24px;margin:24px 0;box-shadow:0 1px 3px rgba(0,0,0,0.04);">
        <h4 style="margin:0 0 14px 0;font-weight:800;color:#0f172a;font-size:16px;display:flex;align-items:center;gap:8px;">📑 ${tocTitle}</h4>
        <ul style="margin:0;padding-left:20px;list-style-type:none;">`;

      selected.forEach((item) => {
        const indent = item.tag === "h1" ? "font-weight:700;color:#0f172a;margin-bottom:8px;" : item.tag === "h2" ? "margin-left:14px;font-weight:600;color:#334155;margin-bottom:6px;" : item.tag === "h3" ? "margin-left:28px;font-size:14px;color:#64748b;margin-bottom:4px;" : "margin-left:40px;font-size:13px;color:#94a3b8;margin-bottom:4px;";
        tocHtml += `<li style="${indent}"><a href="#${item.anchor}" style="color:#0284c7;text-decoration:none;transition:color 0.15s;">→ ${item.customLabel}</a></li>`;
      });

      tocHtml += `</ul></div><p><br></p>`;
    } else if (tocStyle === "numbered") {
      tocHtml = `<div class="toc-container" style="background:#ffffff;border:1px solid #cbd5e1;border-radius:12px;padding:18px 22px;margin:24px 0;">
        <h4 style="margin:0 0 12px 0;font-weight:700;color:#1e293b;font-size:16px;">${tocTitle}</h4>
        <ol style="margin:0;padding-left:22px;line-height:1.9;">`;

      selected.forEach((item) => {
        tocHtml += `<li><a href="#${item.anchor}" style="color:#0f766e;text-decoration:underline;text-underline-offset:3px;font-weight:500;">${item.customLabel}</a></li>`;
      });

      tocHtml += `</ol></div><p><br></p>`;
    } else {
      // Minimal
      tocHtml = `<div class="toc-container" style="border-left:3px solid #26D0A8;padding:8px 0 8px 18px;margin:24px 0;">
        <div style="font-weight:700;color:#0f172a;font-size:15px;margin-bottom:8px;">${tocTitle}</div>
        <ul style="margin:0;padding:0;list-style:none;line-height:1.75;">`;

      selected.forEach((item) => {
        tocHtml += `<li style="margin-bottom:4px;"><a href="#${item.anchor}" style="color:#2563eb;text-decoration:none;font-size:14.5px;">• ${item.customLabel}</a></li>`;
      });

      tocHtml += `</ul></div><p><br></p>`;
    }

    // Also update headings in content to ensure corresponding ID anchors exist
    let updatedContent = formData.content;
    const parser = new DOMParser();
    const doc = parser.parseFromString(updatedContent, "text/html");
    const docHeadings = doc.querySelectorAll("h1, h2, h3, h4");

    selected.forEach((sel) => {
      docHeadings.forEach((h) => {
        if (h.textContent?.trim() === sel.originalText) {
          h.setAttribute("id", sel.anchor);
        }
      });
    });

    const newHtmlWithIds = doc.body.innerHTML;
    setFormData((prev) => ({ ...prev, content: newHtmlWithIds }));

    const range = quill.getSelection(true);
    quill.clipboard.dangerouslyPasteHTML(range.index, tocHtml);
    setIsTocModalOpen(false);
    if (showToast) showToast("Custom Table of Contents inserted successfully!", "success");
  };

  // --- Open In-Content Image Modal ---
  const handleOpenImageModal = () => {
    setImageUrlInput("");
    setImageAltInput("");
    setImageCaptionInput("");
    setImageAlignment("center");
    setImageTab("upload");
    setIsImageModalOpen(true);
  };

  // --- Content Image Upload Handler ---
  const handleContentImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (!file) return;

    const fd = new FormData();
    fd.append("file", file);
    fd.append("blog_id", editingId || "content_" + Date.now().toString());

    try {
      setIsUploadingContentImage(true);
      if (showToast) showToast("Uploading image to Supabase...", "success");
      const res = await uploadBlogImageRequest(fd);
      if (res.ok) {
        const { url } = await res.json();
        setImageUrlInput(url);
        // Default alt to clean filename if not set
        if (!imageAltInput) {
          const autoAlt = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
          setImageAltInput(autoAlt);
        }
        if (showToast) showToast("Image uploaded to Supabase!", "success");
      } else {
        const errData = await res.json().catch(() => ({}));
        const errMsg = errData.detail || "Failed to upload image";
        if (showToast) showToast(errMsg, "error");
      }
    } catch (err: any) {
      console.error("Content image upload failed", err);
      if (showToast) showToast("Image upload network error", "error");
    } finally {
      setIsUploadingContentImage(false);
      if (contentImageFileInputRef.current) contentImageFileInputRef.current.value = "";
    }
  };

  // --- Insert Image into Quill with Alt text & caption ---
  const handleInsertImageToEditor = () => {
    if (!imageUrlInput.trim()) {
      if (showToast) showToast("Please provide or upload an image first", "error");
      return;
    }

    const quill = quillRef.current?.getEditor ? quillRef.current.getEditor() : null;
    if (!quill) return;

    const alt = imageAltInput.trim() || formData.title || "Blog illustration";
    const caption = imageCaptionInput.trim();

    let alignStyle = "margin: 20px auto; display: block; text-align: center;";
    if (imageAlignment === "left") alignStyle = "margin: 16px 20px 16px 0; float: left; max-width: 50%;";
    if (imageAlignment === "right") alignStyle = "margin: 16px 0 16px 20px; float: right; max-width: 50%;";
    if (imageAlignment === "full") alignStyle = "margin: 24px 0; width: 100%; display: block;";

    let imgHtml = "";
    if (caption) {
      imgHtml = `<figure style="${alignStyle}" class="image-figure">
        <img src="${imageUrlInput.trim()}" alt="${alt.replace(/"/g, "&quot;")}" style="max-width:100%;height:auto;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.06);" />
        <figcaption style="font-size:13px;color:#64748b;margin-top:8px;font-style:italic;text-align:center;">${caption}</figcaption>
      </figure><p><br></p>`;
    } else {
      imgHtml = `<div style="${alignStyle}">
        <img src="${imageUrlInput.trim()}" alt="${alt.replace(/"/g, "&quot;")}" style="max-width:100%;height:auto;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.06);" />
      </div><p><br></p>`;
    }

    const range = quill.getSelection(true);
    quill.clipboard.dangerouslyPasteHTML(range.index, imgHtml);
    setIsImageModalOpen(false);
    if (showToast) showToast("Image inserted with ALT text!", "success");
  };

  // Quill configuration with custom image toolbar handler
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }],
        ["blockquote", "code-block"],
        ["link", "image"],
        ["clean"],
      ],
      handlers: {
        image: handleOpenImageModal,
      },
    },
  }), [editingId]);

  const openCreate = () => {
    setFormData({
      title: "",
      slug: "",
      summary: "",
      content: "",
      cover_image: "",
      author: "Admin",
      is_published: false,
      meta_title: "",
      meta_description: "",
      keywords: "",
      permalink: "",
      faqs: [],
    });
    setFaqItems([]);
    setEditingId(null);
    setActiveTab("content");
    setModalMode("create");
  };

  const openEdit = (b: Blog) => {
    const existingFaqs = b.faqs ?? [];
    setFormData({
      title: b.title,
      slug: b.slug || slugify(b.title),
      summary: b.summary || "",
      content: b.content,
      cover_image: b.cover_image || "",
      author: b.author || "Admin",
      is_published: b.is_published ?? false,
      meta_title: b.meta_title || b.title,
      meta_description: b.meta_description || b.summary || "",
      keywords: b.keywords || "",
      permalink: b.permalink || `/blog/${b.slug || b.id}`,
      faqs: existingFaqs,
    });
    setFaqItems(existingFaqs);
    setEditingId(b.id);
    setActiveTab("content");
    setModalMode("edit");
  };

  const copySlugUrl = (slugOrId: string) => {
    const domain = process.env.NEXT_PUBLIC_APP_URL || "https://squarepack.net";
    const url = `${domain}/en/blog/${slugOrId}`;
    navigator.clipboard.writeText(url);
    setCopiedSlug(slugOrId);
    setTimeout(() => setCopiedSlug(null), 2000);
    if (showToast) showToast("Blog URL copied to clipboard!", "success");
  };

  // Quick 1-click status toggle from the blog list
  const handleTogglePublish = async (b: Blog) => {
    const newStatus = !b.is_published;
    const payload: BlogFormData = {
      title: b.title,
      slug: b.slug,
      summary: b.summary,
      content: b.content,
      cover_image: b.cover_image,
      author: b.author,
      is_published: newStatus,
      meta_title: b.meta_title,
      meta_description: b.meta_description,
      keywords: b.keywords,
      permalink: b.permalink,
    };
    const success = await onUpdate(b.id, payload);
    if (success && showToast) {
      showToast(newStatus ? "Article published live!" : "Article moved to drafts", "success");
    }
  };

  // Submit with explicit publish state (Draft vs Published)
  const handleSaveWithStatus = async (publishStatus: boolean) => {
    if (!formData.title.trim()) {
      if (showToast) showToast("Article title is required", "error");
      return;
    }

    try {
      setIsSubmitting(true);
      const payload: BlogFormData = {
        ...formData,
        is_published: publishStatus,
        slug: formData.slug || slugify(formData.title),
        meta_title: formData.meta_title || formData.title,
        meta_description: formData.meta_description || formData.summary || "",
        permalink: formData.permalink || `/blog/${formData.slug || slugify(formData.title)}`,
        faqs: faqItems.filter((f) => f.question.trim() && f.answer.trim()),
      };

      let success = false;
      if (modalMode === "create") {
        success = await onCreate(payload);
      } else if (modalMode === "edit" && editingId) {
        success = await onUpdate(editingId, payload);
      }

      if (success) {
        setModalMode(null);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filtered blogs for table list
  const filteredBlogs = useMemo(() => {
    return blogs.filter((b) => {
      // Status filter
      if (filterStatus === "published" && b.is_published === false) return false;
      if (filterStatus === "draft" && b.is_published !== false) return false;

      // Query filter
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        b.title.toLowerCase().includes(q) ||
        (b.author && b.author.toLowerCase().includes(q)) ||
        (b.slug && b.slug.toLowerCase().includes(q)) ||
        (b.keywords && b.keywords.toLowerCase().includes(q))
      );
    });
  }, [blogs, filterStatus, searchQuery]);

  const publishedCount = blogs.filter((b) => b.is_published !== false).length;
  const draftCount = blogs.filter((b) => b.is_published === false).length;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      {/* Header Bar */}
      <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Blog Articles</h2>
          <p className="text-xs text-slate-500 mt-0.5">Manage SEO-friendly articles, cover images, custom TOC, and draft status</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={openCreate}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-slate-800 transition-colors shadow-sm active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" /> Create Article
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row items-center justify-between gap-3 bg-white">
        {/* Status Filters */}
        <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => setFilterStatus("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              filterStatus === "all" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All Articles <span className="text-[11px] opacity-80">({blogs.length})</span>
          </button>
          <button
            onClick={() => setFilterStatus("published")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              filterStatus === "published" ? "bg-emerald-600 text-white" : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" /> Published ({publishedCount})
          </button>
          <button
            onClick={() => setFilterStatus("draft")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              filterStatus === "draft" ? "bg-amber-600 text-white" : "bg-amber-50 text-amber-700 hover:bg-amber-100"
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" /> Drafts ({draftCount})
          </button>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by title, author, slug..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-xs"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Blogs Table List */}
      <div className="divide-y divide-slate-100">
        {filteredBlogs.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            {blogs.length === 0 ? "No blog posts published yet." : "No articles match the selected filter."}
          </div>
        ) : (
          filteredBlogs.map((b) => (
            <div key={b.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors group">
              <div className="flex items-start gap-4">
                {b.cover_image ? (
                  <img
                    src={b.cover_image}
                    alt={b.title}
                    className="w-16 h-12 object-cover rounded-lg border border-slate-200 shrink-0 mt-0.5"
                  />
                ) : (
                  <div className="w-16 h-12 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 shrink-0 mt-0.5">
                    <ImageIcon className="w-5 h-5 opacity-40" />
                  </div>
                )}
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-900 transition-colors">{b.title}</h3>
                    
                    {/* Status Badge with Quick 1-Click Toggle */}
                    <button
                      onClick={() => handleTogglePublish(b)}
                      title="Click to toggle Draft / Published status"
                      className={`px-2.5 py-0.5 text-[11px] font-bold rounded-full cursor-pointer transition-all flex items-center gap-1 ${
                        b.is_published !== false
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                          : "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"
                      }`}
                    >
                      {b.is_published !== false ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Published
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-3 h-3 text-amber-600" /> Draft
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span>By <strong className="text-slate-700">{b.author || "Admin"}</strong></span>
                    <span>•</span>
                    <span>{new Date(b.created_at).toLocaleDateString()}</span>
                    {b.slug && (
                      <>
                        <span>•</span>
                        <button
                          onClick={() => copySlugUrl(b.slug!)}
                          className="flex items-center gap-1 text-sky-600 hover:text-sky-800 font-medium"
                          title="Copy permalink"
                        >
                          {copiedSlug === b.slug ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                          /blog/{b.slug}
                        </button>
                      </>
                    )}
                  </div>
                  {b.summary && (
                    <p className="text-xs text-slate-600 line-clamp-1 mt-1.5 max-w-xl">{b.summary}</p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                <button
                  onClick={() => openEdit(b)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50 border border-slate-200 rounded-lg transition-colors"
                  title="Edit article"
                >
                  <Edit2 className="w-3.5 h-3.5" /> Edit
                </button>
                {canDelete && (
                  <button
                    onClick={() => onDelete(b.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                    title="Delete article"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* ═══════════════════════════════════════════════════════
         Main Article Create / Edit Modal
         ═══════════════════════════════════════════════════════ */}
      {modalMode && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden border border-slate-100">
            {/* Modal Header */}
            <div className="p-5 px-7 border-b border-slate-100 flex items-center justify-between bg-white z-10">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-slate-900">
                    {modalMode === "create" ? "Create New Blog Article" : "Edit Blog Article"}
                  </h2>
                  <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full ${
                    formData.is_published
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}>
                    {formData.is_published ? "Status: Published" : "Status: Draft"}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Add SEO metadata, rich headings, ALT-tagged images, and custom Table of Contents</p>
              </div>
              <button
                onClick={() => setModalMode(null)}
                className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tab navigation in modal */}
            <div className="flex border-b border-slate-100 px-7 bg-slate-50/60 gap-4">
              <button
                type="button"
                onClick={() => setActiveTab("content")}
                className={`py-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-all ${
                  activeTab === "content" ? "border-slate-900 text-slate-900" : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <FileText className="w-3.5 h-3.5" /> Content & Writing
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("seo")}
                className={`py-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-all ${
                  activeTab === "seo" ? "border-slate-900 text-slate-900" : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <Globe className="w-3.5 h-3.5" /> SEO & Permalinks
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("faq" as any)}
                className={`py-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-all ${
                  (activeTab as string) === "faq" ? "border-emerald-600 text-emerald-700" : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" /> FAQ
                {faqItems.length > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full">{faqItems.length}</span>
                )}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("preview")}
                className={`py-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-all ${
                  activeTab === "preview" ? "border-slate-900 text-slate-900" : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <Search className="w-3.5 h-3.5" /> Google Search Preview
              </button>
            </div>

            {/* Scrollable Form Body */}
            <div className="flex-1 overflow-y-auto p-7 space-y-6">
              {activeTab === "content" && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Article Title *</label>
                      <input
                        required
                        value={formData.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm font-semibold focus:outline-none focus:border-slate-900 focus:bg-white transition-all"
                        placeholder="e.g. 10 Essential Label Packaging Guidelines for 2026"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Author</label>
                      <input
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-slate-900 focus:bg-white transition-all"
                        placeholder="Admin"
                      />
                    </div>
                  </div>

                  {/* ── Enhanced Cover Image Section: URL + Upload Button + Live Preview ── */}
                  <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">Cover Image (Featured Image)</label>
                        <span className="text-[11px] text-slate-500">Provide an image URL or upload directly to Supabase storage</span>
                      </div>
                      {formData.cover_image && (
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, cover_image: "" })}
                          className="text-xs text-red-600 hover:text-red-800 font-semibold flex items-center gap-1"
                        >
                          <Trash className="w-3 h-3" /> Remove Cover Image
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                      {/* URL input */}
                      <div className="md:col-span-8 relative">
                        <input
                          value={formData.cover_image || ""}
                          onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
                          className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-none focus:border-slate-900 transition-all font-mono"
                          placeholder="https://images.unsplash.com/... or upload via button"
                        />
                      </div>

                      {/* Direct Upload Button */}
                      <div className="md:col-span-4 flex items-center gap-2">
                        <input
                          ref={coverFileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleCoverUpload}
                          className="hidden"
                        />
                        <button
                          type="button"
                          disabled={isUploadingCover}
                          onClick={() => coverFileInputRef.current?.click()}
                          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm disabled:opacity-50"
                        >
                          {isUploadingCover ? (
                            <>
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Uploading...
                            </>
                          ) : (
                            <>
                              <Upload className="w-3.5 h-3.5" /> Upload Cover Image
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Cover Image Live Preview Thumbnail */}
                    {formData.cover_image && (
                      <div className="mt-2 flex items-center gap-3 p-2.5 bg-white rounded-xl border border-slate-200 shadow-sm max-w-md">
                        <img
                          src={formData.cover_image}
                          alt="Cover preview"
                          className="w-20 h-14 object-cover rounded-lg border border-slate-100 shrink-0"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = "none";
                          }}
                        />
                        <div className="min-w-0 flex-1 text-xs">
                          <span className="font-semibold text-slate-800 block truncate">Cover Image Selected</span>
                          <span className="text-slate-400 font-mono block truncate text-[10px]">{formData.cover_image}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Summary / Excerpt */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Article Summary / Excerpt</label>
                    <textarea
                      rows={2}
                      value={formData.summary || ""}
                      onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-slate-900 focus:bg-white transition-all"
                      placeholder="Brief overview snippet for listing cards and meta description..."
                    />
                  </div>

                  {/* Rich Text Editor Toolbar Helpers & Quill */}
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Content Writing</label>
                      
                      <div className="flex items-center gap-2">
                        {/* Insert Image with ALT text button */}
                        <button
                          type="button"
                          onClick={handleOpenImageModal}
                          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded-lg transition-colors border border-emerald-200"
                          title="Insert image with custom ALT text and caption for SEO"
                        >
                          <ImageIcon className="w-3.5 h-3.5 text-emerald-600" /> Insert Image + ALT Text
                        </button>

                        {/* Custom Table of Contents button */}
                        <button
                          type="button"
                          onClick={handleOpenTocModal}
                          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-sky-50 text-sky-800 hover:bg-sky-100 rounded-lg transition-colors border border-sky-200"
                          title="Select which headings to include in your Table of Contents"
                        >
                          <ListTree className="w-3.5 h-3.5 text-sky-600" /> Custom Table of Contents
                        </button>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                      <ReactQuill
                        ref={quillRef}
                        theme="snow"
                        value={formData.content}
                        onChange={(val: string) => setFormData({ ...formData, content: val })}
                        modules={modules}
                        className="h-[360px] mb-12"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "seo" && (
                <div className="space-y-5">
                  <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-sky-900">SEO & Permalink Optimization</h4>
                      <p className="text-xs text-sky-700 mt-0.5">
                        Customize meta tags, keyword snippets, and URL slugs to rank higher on search engines.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700">URL Slug / Permalink *</label>
                      <span className="text-xs text-slate-400">/blog/{formData.slug || "your-slug"}</span>
                    </div>
                    <input
                      required
                      value={formData.slug || ""}
                      onChange={(e) => setFormData({ ...formData, slug: slugify(e.target.value) })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm font-mono focus:outline-none focus:border-slate-900 focus:bg-white transition-all"
                      placeholder="e.g. 10-essential-label-guidelines"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Meta Title (SEO Title)</label>
                      <span className={`text-xs ${
                        (formData.meta_title?.length || 0) > 60 ? "text-amber-600 font-bold" : "text-slate-400"
                      }`}>
                        {formData.meta_title?.length || 0} / 60 chars (recommended: 50–60)
                      </span>
                    </div>
                    <input
                      value={formData.meta_title || ""}
                      onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-slate-900 focus:bg-white transition-all"
                      placeholder="Search engine title tag..."
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Meta Description</label>
                      <span className={`text-xs ${
                        (formData.meta_description?.length || 0) > 160 ? "text-amber-600 font-bold" : "text-slate-400"
                      }`}>
                        {formData.meta_description?.length || 0} / 160 chars (recommended: 140–160)
                      </span>
                    </div>
                    <textarea
                      rows={3}
                      value={formData.meta_description || ""}
                      onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-slate-900 focus:bg-white transition-all"
                      placeholder="Provide a compelling 1-2 sentence description for search snippets..."
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Keywords Snippet (Tags)</label>
                    <input
                      value={formData.keywords || ""}
                      onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-slate-900 focus:bg-white transition-all"
                      placeholder="packaging, barcode labels, thermal printing, security stickers (comma separated)"
                    />
                  </div>
                </div>
              )}

              {activeTab === "preview" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-1">Google Search Result Preview</h3>
                    <p className="text-xs text-slate-500">Live preview of how this blog appears on Google Desktop Search.</p>
                  </div>

                  <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm max-w-2xl">
                    <div className="flex items-center gap-2 text-xs text-slate-600 mb-1 font-sans">
                      <div className="w-4 h-4 rounded-full bg-[#3de0be] flex items-center justify-center text-[10px] font-bold text-slate-900">S</div>
                      <span>squarepack.net</span>
                      <span className="text-slate-400">› blog › {formData.slug || "article-slug"}</span>
                    </div>
                    <h4 className="text-lg text-[#1a0dab] hover:underline font-medium cursor-pointer line-clamp-1 mb-1">
                      {formData.meta_title || formData.title || "Your Blog Article Title Here"}
                    </h4>
                    <p className="text-xs text-[#4d5156] line-clamp-2 leading-relaxed">
                      {formData.meta_description || formData.summary || "This is how your article summary and meta description will display on Google search result pages..."}
                    </p>
                  </div>

                  {formData.keywords && (
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Target Keywords</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {formData.keywords.split(",").map((kw, i) => kw.trim() && (
                          <span key={i} className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium">
                            #{kw.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ── FAQ Tab Panel ── */}
              {(activeTab as string) === "faq" && (
                <div className="space-y-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">Frequently Asked Questions</h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        FAQs are injected as FAQ Schema (JSON-LD) for SEO and displayed at the bottom of the blog post.
                        Only headings ending with <strong>?</strong> are needed — the answer follows automatically.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFaqItems((prev) => [...prev, { question: "", answer: "" }])}
                      className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add FAQ
                    </button>
                  </div>

                  {faqItems.length === 0 ? (
                    <div className="py-14 border-2 border-dashed border-slate-200 rounded-2xl text-center">
                      <Sparkles className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                      <p className="text-sm font-semibold text-slate-500">No FAQs yet</p>
                      <p className="text-xs text-slate-400 mt-1 mb-4">Add Q&A pairs to boost your blog's SEO with FAQ Schema markup</p>
                      <button
                        type="button"
                        onClick={() => setFaqItems([{ question: "", answer: "" }])}
                        className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors"
                      >
                        Add First FAQ
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {faqItems.map((faq, idx) => (
                        <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 group relative">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">FAQ #{idx + 1}</span>
                            <button
                              type="button"
                              onClick={() => setFaqItems((prev) => prev.filter((_, i) => i !== idx))}
                              className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                              title="Remove FAQ"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                              <span className="w-4 h-4 rounded bg-emerald-100 text-emerald-700 flex items-center justify-center text-[9px] font-black">Q</span>
                              Question
                            </label>
                            <input
                              type="text"
                              value={faq.question}
                              onChange={(e) => setFaqItems((prev) => prev.map((f, i) => i === idx ? { ...f, question: e.target.value } : f))}
                              placeholder="e.g. What types of labels do you offer?"
                              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-emerald-500 transition-all"
                            />
                            {faq.question && !faq.question.trim().endsWith("?") && (
                              <p className="text-[11px] text-amber-600 font-medium">💡 Tip: End with a "?" for FAQ Schema to activate</p>
                            )}
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                              <span className="w-4 h-4 rounded bg-blue-100 text-blue-700 flex items-center justify-center text-[9px] font-black">A</span>
                              Answer
                            </label>
                            <textarea
                              rows={3}
                              value={faq.answer}
                              onChange={(e) => setFaqItems((prev) => prev.map((f, i) => i === idx ? { ...f, answer: e.target.value } : f))}
                              placeholder="Provide a clear, concise answer..."
                              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-emerald-500 transition-all resize-none"
                            />
                          </div>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() => setFaqItems((prev) => [...prev, { question: "", answer: "" }])}
                        className="w-full py-2.5 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 text-xs font-bold hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50/40 transition-all"
                      >
                        + Add Another FAQ
                      </button>
                    </div>
                  )}

                  {/* Schema preview hint */}
                  {faqItems.filter(f => f.question.trim().endsWith("?") && f.answer.trim()).length > 0 && (
                    <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl">
                      <p className="text-xs font-bold text-emerald-800 mb-1">✅ FAQ Schema will be injected</p>
                      <p className="text-[11px] text-emerald-700">
                        {faqItems.filter(f => f.question.trim().endsWith("?") && f.answer.trim()).length} valid FAQ{faqItems.filter(f => f.question.trim().endsWith("?") && f.answer.trim()).length > 1 ? "s" : ""} will be included in the <code className="bg-emerald-100 px-1 rounded">FAQPage</code> JSON-LD schema for rich search results.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ═══════════════════════════════════════════════════════
               Modal Footer with Clear Save as Draft vs Publish Actions
               ═══════════════════════════════════════════════════════ */}
            <div className="p-5 px-7 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/70">
              <div className="flex items-center gap-3 text-xs">
                <label className="flex items-center gap-2 text-slate-700 font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_published}
                    onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                    className="w-4 h-4 rounded text-slate-900 focus:ring-slate-900"
                  />
                  Mark as Published Publicly
                </label>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => setModalMode(null)}
                  className="px-4 py-2.5 text-slate-600 font-semibold hover:bg-slate-200/60 rounded-xl text-sm transition-colors"
                >
                  Cancel
                </button>

                {/* Dedicated Save as Draft Button */}
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => handleSaveWithStatus(false)}
                  className="flex items-center gap-1.5 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-sm transition-all active:scale-[0.98] shadow-sm disabled:opacity-50"
                >
                  <BookmarkCheck className="w-4 h-4" /> Save as Draft
                </button>

                {/* Dedicated Publish Button */}
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => handleSaveWithStatus(true)}
                  className="flex items-center gap-1.5 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-sm transition-all active:scale-[0.98] shadow-sm disabled:opacity-50"
                >
                  <Send className="w-4 h-4" /> {modalMode === "create" ? "Publish Article" : "Publish Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════
         Custom Table of Contents Modal
         ═══════════════════════════════════════════════════════ */}
      {isTocModalOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 z-[60] animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col overflow-hidden border border-slate-100 max-h-[85vh]">
            <div className="p-5 px-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center text-sky-700">
                  <ListTree className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Custom Table of Contents</h3>
                  <p className="text-xs text-slate-500">Select and customize which sections appear in the TOC</p>
                </div>
              </div>
              <button
                onClick={() => setIsTocModalOpen(false)}
                className="p-1.5 text-slate-400 hover:bg-slate-200 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5 flex-1">
              {/* Style & Title settings */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-slate-100">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">TOC Title</label>
                  <input
                    type="text"
                    value={tocTitle}
                    onChange={(e) => setTocTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:border-slate-900"
                    placeholder="e.g. Table of Contents"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">TOC Style</label>
                  <select
                    value={tocStyle}
                    onChange={(e) => setTocStyle(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:border-slate-900"
                  >
                    <option value="card">Modern Box Card (Border & Icon)</option>
                    <option value="numbered">Numbered Ordered Guide</option>
                    <option value="minimal">Minimal Accent Line</option>
                  </select>
                </div>
              </div>

              {/* Headings Checklist */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Detected Headings ({tocItems.filter((t) => t.selected).length}/{tocItems.length} selected)
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setTocItems((prev) => prev.map((t) => ({ ...t, selected: true })))}
                      className="text-[11px] text-sky-600 hover:text-sky-800 font-semibold"
                    >
                      Select All
                    </button>
                    <span className="text-slate-300">|</span>
                    <button
                      type="button"
                      onClick={() => setTocItems((prev) => prev.map((t) => ({ ...t, selected: false })))}
                      className="text-[11px] text-slate-500 hover:text-slate-700 font-semibold"
                    >
                      Deselect All
                    </button>
                  </div>
                </div>

                {tocItems.length === 0 ? (
                  <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    <p className="text-xs text-slate-600 font-medium">No H1, H2, H3, or H4 headings found in the content yet.</p>
                    <p className="text-[11px] text-slate-400 mt-1">Add some headings in the editor and click Custom Table of Contents again.</p>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                    {tocItems.map((item, idx) => (
                      <div
                        key={item.id}
                        className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                          item.selected
                            ? "bg-sky-50/40 border-sky-200"
                            : "bg-slate-50/50 border-slate-200 opacity-60"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() =>
                            setTocItems((prev) =>
                              prev.map((t, i) => (i === idx ? { ...t, selected: !t.selected } : t))
                            )
                          }
                          className="text-slate-700 shrink-0"
                        >
                          {item.selected ? (
                            <CheckSquare className="w-4 h-4 text-sky-600" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-400" />
                          )}
                        </button>

                        <span className="px-2 py-0.5 bg-slate-200 text-slate-700 text-[10px] font-bold uppercase rounded">
                          {item.tag}
                        </span>

                        <input
                          type="text"
                          value={item.customLabel}
                          onChange={(e) =>
                            setTocItems((prev) =>
                              prev.map((t, i) => (i === idx ? { ...t, customLabel: e.target.value } : t))
                            )
                          }
                          disabled={!item.selected}
                          className="flex-1 px-2.5 py-1 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-sky-500 font-medium disabled:bg-slate-100"
                          placeholder="Heading label..."
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 px-6 border-t border-slate-100 flex items-center justify-between bg-slate-50">
              <span className="text-xs text-slate-500">
                Only checked headings will appear in the inserted TOC.
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsTocModalOpen(false)}
                  className="px-4 py-2 text-slate-600 text-xs font-semibold hover:bg-slate-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleInsertToc}
                  disabled={tocItems.filter((t) => t.selected).length === 0}
                  className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-lg transition-colors shadow-sm disabled:opacity-50"
                >
                  Insert Table of Contents
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════
         Insert Image with ALT Text Modal
         ═══════════════════════════════════════════════════════ */}
      {isImageModalOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 z-[60] animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col overflow-hidden border border-slate-100">
            <div className="p-5 px-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <ImageIcon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Insert Feature / Article Image</h3>
                  <p className="text-xs text-slate-500">Provide an SEO Alt tag and caption for accessibility</p>
                </div>
              </div>
              <button
                onClick={() => setIsImageModalOpen(false)}
                className="p-1.5 text-slate-400 hover:bg-slate-200 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Source Switcher: Upload vs URL */}
              <div className="flex bg-slate-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setImageTab("upload")}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    imageTab === "upload" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Upload from Computer
                </button>
                <button
                  type="button"
                  onClick={() => setImageTab("url")}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    imageTab === "url" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Image URL / Link
                </button>
              </div>

              {imageTab === "upload" ? (
                <div className="space-y-2">
                  <input
                    ref={contentImageFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleContentImageUpload}
                    className="hidden"
                  />
                  <div
                    onClick={() => contentImageFileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-200 hover:border-emerald-500 bg-slate-50/50 hover:bg-emerald-50/30 rounded-2xl p-6 text-center cursor-pointer transition-all"
                  >
                    <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <span className="text-xs font-bold text-slate-700 block">
                      {isUploadingContentImage ? "Uploading to Supabase..." : "Click to select and upload image"}
                    </span>
                    <span className="text-[11px] text-slate-400 mt-1 block">PNG, JPG, WebP up to 10MB</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Image Web URL *</label>
                  <input
                    type="text"
                    value={imageUrlInput}
                    onChange={(e) => setImageUrlInput(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-600 font-mono"
                  />
                </div>
              )}

              {/* Preview Thumbnail if URL is loaded */}
              {imageUrlInput && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3">
                  <img
                    src={imageUrlInput}
                    alt="Preview"
                    className="w-16 h-12 object-cover rounded-lg border border-slate-200 shrink-0"
                    onError={(e) => ((e.target as HTMLElement).style.display = "none")}
                  />
                  <div className="min-w-0 flex-1 text-xs">
                    <span className="font-bold text-slate-800 block">Image Ready</span>
                    <span className="text-slate-400 font-mono text-[10px] block truncate">{imageUrlInput}</span>
                  </div>
                </div>
              )}

              {/* ALT Text Input */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Image ALT Text (SEO & Accessibility) *
                  </label>
                  <span className="text-[11px] text-emerald-600 font-semibold">Recommended for Google SEO</span>
                </div>
                <input
                  type="text"
                  value={imageAltInput}
                  onChange={(e) => setImageAltInput(e.target.value)}
                  placeholder="e.g. High speed barcode printer applying thermal label to cardboard box"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-600"
                />
              </div>

              {/* Optional Caption */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Caption (Optional subtitle)
                </label>
                <input
                  type="text"
                  value={imageCaptionInput}
                  onChange={(e) => setImageCaptionInput(e.target.value)}
                  placeholder="e.g. Figure 1: Modern roll label manufacturing process"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-600"
                />
              </div>

              {/* Alignment */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Layout Alignment</label>
                <div className="grid grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setImageAlignment("center")}
                    className={`py-2 text-xs font-semibold rounded-lg border flex items-center justify-center gap-1 transition-all ${
                      imageAlignment === "center"
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <AlignCenter className="w-3.5 h-3.5" /> Center
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageAlignment("full")}
                    className={`py-2 text-xs font-semibold rounded-lg border flex items-center justify-center gap-1 transition-all ${
                      imageAlignment === "full"
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <Maximize2 className="w-3.5 h-3.5" /> Full Width
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageAlignment("left")}
                    className={`py-2 text-xs font-semibold rounded-lg border flex items-center justify-center gap-1 transition-all ${
                      imageAlignment === "left"
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <AlignLeft className="w-3.5 h-3.5" /> Left
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageAlignment("right")}
                    className={`py-2 text-xs font-semibold rounded-lg border flex items-center justify-center gap-1 transition-all ${
                      imageAlignment === "right"
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <AlignRight className="w-3.5 h-3.5" /> Right
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 px-6 border-t border-slate-100 flex items-center justify-end gap-2 bg-slate-50">
              <button
                type="button"
                onClick={() => setIsImageModalOpen(false)}
                className="px-4 py-2 text-slate-600 text-xs font-semibold hover:bg-slate-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleInsertImageToEditor}
                disabled={!imageUrlInput.trim() || isUploadingContentImage}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors shadow-sm disabled:opacity-50"
              >
                Insert Image
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
