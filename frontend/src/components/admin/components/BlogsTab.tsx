"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import {
  Plus, Edit2, Trash2, X, Image as ImageIcon, Globe, FileText,
  Search, Eye, ListTree, Sparkles, CheckCircle2, AlertCircle, Copy, Check
} from "lucide-react";
import { Blog, BlogFormData, ModalMode } from "../types";
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

export function BlogsTab({ blogs, onCreate, onUpdate, onDelete, canDelete = true, showToast }: BlogsTabProps) {
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"content" | "seo" | "preview">("content");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

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
  });

  const quillRef = useRef<any>(null);

  // Auto update slug & meta_title when title changes if in create mode or slug empty
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

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files ? input.files[0] : null;
      if (!file) return;

      const fd = new FormData();
      fd.append("file", file);
      fd.append("blog_id", editingId || "temp_" + Date.now().toString());

      try {
        setIsUploadingImage(true);
        if (showToast) showToast("Uploading image to Supabase...", "success");
        const res = await uploadBlogImageRequest(fd);
        if (res.ok) {
          const { url } = await res.json();
          const quill = quillRef.current?.getEditor ? quillRef.current.getEditor() : null;
          if (quill) {
            const range = quill.getSelection(true);
            quill.insertEmbed(range.index, "image", url);
          }
          if (showToast) showToast("Image uploaded successfully!", "success");
        } else {
          const errData = await res.json().catch(() => ({}));
          const errMsg = errData.detail || "Failed to upload image to Supabase";
          if (showToast) showToast(errMsg, "error");
        }
      } catch (err: any) {
        console.error("Image upload failed", err);
        if (showToast) showToast("Image upload network error", "error");
      } finally {
        setIsUploadingImage(false);
      }
    };
  };

  // Helper to generate and insert Table of Contents into Quill
  const insertTableOfContents = () => {
    const quill = quillRef.current?.getEditor ? quillRef.current.getEditor() : null;
    if (!quill) return;

    const html = formData.content;
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const headings = doc.querySelectorAll("h1, h2, h3");

    if (headings.length === 0) {
      if (showToast) showToast("No H1, H2, or H3 headings found in content to generate TOC", "error");
      return;
    }

    let tocHtml = `<div class="toc-container" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:16px 20px;margin:20px 0;">
      <h4 style="margin:0 0 10px 0;font-weight:bold;color:#0f172a;font-size:16px;">📑 Table of Contents</h4>
      <ul style="margin:0;padding-left:20px;line-height:1.8;">`;

    headings.forEach((h, index) => {
      const text = h.textContent || `Section ${index + 1}`;
      const anchor = slugify(text) || `section-${index + 1}`;
      const level = h.tagName.toLowerCase();
      const indent = level === "h1" ? "font-weight:bold;color:#0f172a;" : level === "h2" ? "color:#334155;" : "color:#64748b;font-size:14px;";
      tocHtml += `<li style="${indent}"><a href="#${anchor}" style="color:#0284c7;text-decoration:none;">${text}</a></li>`;
    });

    tocHtml += `</ul></div><p><br></p>`;

    const range = quill.getSelection(true);
    quill.clipboard.dangerouslyPasteHTML(range.index, tocHtml);
    if (showToast) showToast("Table of Contents inserted!", "success");
  };

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
        image: imageHandler,
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
      is_published: true,
      meta_title: "",
      meta_description: "",
      keywords: "",
      permalink: "",
    });
    setEditingId(null);
    setActiveTab("content");
    setModalMode("create");
  };

  const openEdit = (b: Blog) => {
    setFormData({
      title: b.title,
      slug: b.slug || slugify(b.title),
      summary: b.summary || "",
      content: b.content,
      cover_image: b.cover_image || "",
      author: b.author || "Admin",
      is_published: b.is_published ?? true,
      meta_title: b.meta_title || b.title,
      meta_description: b.meta_description || b.summary || "",
      keywords: b.keywords || "",
      permalink: b.permalink || `/blog/${b.slug || b.id}`,
    });
    setEditingId(b.id);
    setActiveTab("content");
    setModalMode("edit");
  };

  const copySlugUrl = (slugOrId: string) => {
    const url = `${window.location.origin}/blog/${slugOrId}`;
    navigator.clipboard.writeText(url);
    setCopiedSlug(slugOrId);
    setTimeout(() => setCopiedSlug(null), 2000);
    if (showToast) showToast("Blog URL copied to clipboard!", "success");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let success = false;
    const payload = {
      ...formData,
      slug: formData.slug || slugify(formData.title),
      meta_title: formData.meta_title || formData.title,
      meta_description: formData.meta_description || formData.summary || "",
      permalink: formData.permalink || `/blog/${formData.slug || slugify(formData.title)}`,
    };

    if (modalMode === "create") {
      success = await onCreate(payload);
    } else if (modalMode === "edit" && editingId) {
      success = await onUpdate(editingId, payload);
    }
    if (success) {
      setModalMode(null);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Blog Posts</h2>
          <p className="text-xs text-slate-500 mt-0.5">Manage SEO-friendly articles, rich media, and publication status</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-slate-800 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Create Article
        </button>
      </div>

      <div className="divide-y divide-slate-100">
        {blogs.length === 0 ? (
          <div className="p-12 text-center text-slate-500">No blog posts published yet.</div>
        ) : (
          blogs.map((b) => (
            <div key={b.id} className="p-5 flex items-center justify-between hover:bg-slate-50/60 transition-colors group">
              <div className="flex items-start gap-4">
                {b.cover_image && (
                  <img
                    src={b.cover_image}
                    alt={b.title}
                    className="w-16 h-12 object-cover rounded-lg border border-slate-200 shrink-0 mt-0.5"
                  />
                )}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base font-bold text-slate-900">{b.title}</h3>
                    <span className={`px-2 py-0.5 text-[11px] font-bold rounded-full ${
                      b.is_published !== false ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-slate-100 text-slate-600 border border-slate-200"
                    }`}>
                      {b.is_published !== false ? "Published" : "Draft"}
                    </span>
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
              <div className="flex gap-2">
                <button
                  onClick={() => openEdit(b)}
                  className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Edit article"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                {canDelete && (
                  <button
                    onClick={() => onDelete(b.id)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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

      {modalMode && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden border border-slate-100">
            {/* Header */}
            <div className="p-5 px-7 border-b border-slate-100 flex items-center justify-between bg-white z-10">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {modalMode === "create" ? "Create New Blog Article" : "Edit Blog Article"}
                </h2>
                <p className="text-xs text-slate-500">Add SEO metadata, rich headings (H1-H4), anchor text and images</p>
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
                onClick={() => setActiveTab("preview")}
                className={`py-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-all ${
                  activeTab === "preview" ? "border-slate-900 text-slate-900" : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <Search className="w-3.5 h-3.5" /> Google Search Preview
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-7 space-y-6">
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

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Cover Image URL</label>
                      <input
                        value={formData.cover_image || ""}
                        onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-slate-900 focus:bg-white transition-all"
                        placeholder="https://images.unsplash.com/..."
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Publication Status</label>
                      <div className="flex items-center gap-3 pt-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.is_published ?? true}
                            onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                            className="w-4 h-4 rounded text-slate-900 focus:ring-slate-900"
                          />
                          Publish Article Publicly
                        </label>
                      </div>
                    </div>
                  </div>

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

                  {/* Rich Text Editor with Table of Contents generator */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Content Writing</label>
                      <button
                        type="button"
                        onClick={insertTableOfContents}
                        className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 bg-sky-50 text-sky-700 hover:bg-sky-100 rounded-lg transition-colors border border-sky-200"
                        title="Scan H1, H2, H3 tags and insert a clickable Table of Contents"
                      >
                        <ListTree className="w-3.5 h-3.5" /> Insert Table of Contents
                      </button>
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

              {/* Action Buttons */}
              <div className="pt-5 border-t border-slate-100 flex items-center justify-between">
                <div className="text-xs text-slate-500">
                  {formData.is_published ? (
                    <span className="flex items-center gap-1 text-emerald-600 font-semibold"><CheckCircle2 className="w-3.5 h-3.5" /> Will be published live</span>
                  ) : (
                    <span className="flex items-center gap-1 text-slate-500"><AlertCircle className="w-3.5 h-3.5" /> Saved as draft</span>
                  )}
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setModalMode(null)}
                    className="px-5 py-2.5 text-slate-500 font-semibold hover:bg-slate-50 rounded-xl text-sm transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-slate-900 text-white font-semibold rounded-xl text-sm hover:bg-slate-800 transition-all active:scale-[0.98] shadow-sm"
                  >
                    {modalMode === "create" ? "Publish Article" : "Save Changes"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

