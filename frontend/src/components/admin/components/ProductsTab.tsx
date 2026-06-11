"use client";
import { useState, useRef } from "react";
import {
  Plus, Pencil, Trash2, ImageIcon, Link, Upload, X, Loader2,
  ChevronDown, ChevronUp, Zap, Check, Settings, Layout, FileText,
} from "lucide-react";
import { Modal, InputField, TextAreaField, ModalActions } from "./ui";
import {
  Product, ProductFormData, ModalMode,
  ProductDetails, QuickSpec, FeatureItem, SpecificationItem, ApplicationItem,
} from "../types";
import AppButton from "@/components/appButton/AppButton";
import { API } from "../api";

/* ─── helpers ───────────────────────────────────────────────────────────── */

const EMPTY_DETAILS: ProductDetails = {
  quick_specs: [],
  features: [],
  specifications: [],
  applications: [],
};

const EMPTY_FORM: ProductFormData = {
  name: "", name_ar: "", desc: "", desc_ar: "",
  image_url: "", tag: "", tag_ar: "", category: "", category_ar: "",
  details: EMPTY_DETAILS,
  details_ar: null,
};

const PRODUCT_CATEGORIES: { label: string; slug: string }[] = [
  { label: "Self Adhesive Labels", slug: "self-adhesive-products" },
  { label: "Security Labels", slug: "security-labels" },
  { label: "Speciality Labels", slug: "speciality-labels" },
  { label: "Printers", slug: "printers" },
  { label: "Packaging Products", slug: "packaging-products" },
  { label: "Pallet Bands", slug: "pallet-bands" },
  { label: "Barcode Ribbons", slug: "barcode" },
];

/* ─── CategorySelect ────────────────────────────────────────────────────── */

function CategorySelect({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-extrabold text-slate-600 uppercase tracking-widest">Category</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full appearance-none px-4 py-3 pr-10 rounded-xl border border-slate-200 text-[14px] font-medium focus:outline-none focus:border-[#28b098] focus:ring-2 focus:ring-[#28b098]/20 transition-all bg-white cursor-pointer ${!value ? "text-slate-400" : "text-slate-900"}`}
        >
          <option value="" disabled>Select a category…</option>
          {PRODUCT_CATEGORIES.map(({ label, slug }) => (
            <option key={slug} value={slug}>{label}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
      </div>
    </div>
  );
}

/* ─── ImagePreview ──────────────────────────────────────────────────────── */

function ImagePreview({ url }: { url: string }) {
  return (
    <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden shrink-0 flex items-center justify-center border border-slate-200">
      {url ? <img src={url} className="w-full h-full object-cover" /> : <ImageIcon className="w-5 h-5 text-slate-300" />}
    </div>
  );
}

/* ─── ImageField ────────────────────────────────────────────────────────── */

type ImageTab = "url" | "upload";

function ImageField({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const [imageTab, setImageTab] = useState<ImageTab>("url");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    if (!file.type.startsWith("image/")) { setUploadError("Please select an image file."); return; }
    if (file.size > 10 * 1024 * 1024) { setUploadError("Image must be under 10 MB."); return; }
    setUploadError(null);
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch(`${API}/api/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
        body: fd,
      });
      if (!res.ok) throw new Error(`Upload failed (${res.status})`);
      const data = await res.json();
      const url: string = data.url ?? data.image_url ?? data.path ?? "";
      if (!url) throw new Error("Server didn't return a URL.");
      onChange(url);
    } catch (err: unknown) {
      setUploadError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-extrabold text-slate-600 uppercase tracking-widest">Product Image</label>
      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit mb-1">
        {(["url", "upload"] as ImageTab[]).map((t) => (
          <button key={t} type="button" onClick={() => setImageTab(t)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-bold transition-all capitalize ${imageTab === t ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
          >
            {t === "url" ? <><Link className="w-3 h-3" /> URL</> : <><Upload className="w-3 h-3" /> Upload</>}
          </button>
        ))}
      </div>
      {imageTab === "url" ? (
        <div className="flex gap-3">
          <input type="text" value={value} onChange={(e) => onChange(e.target.value)}
            placeholder="https://images.unsplash.com/..."
            className="flex-grow px-4 py-3 rounded-xl border border-slate-200 text-[14px] font-medium focus:outline-none focus:border-[#28b098] focus:ring-2 focus:ring-[#28b098]/20 transition-all"
          />
          <ImagePreview url={value} />
        </div>
      ) : (
        <div className="flex gap-3">
          <div
            onClick={() => !uploading && inputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files?.[0]; if (f) handleFile(f); }}
            className={`flex-grow flex flex-col items-center justify-center gap-2 px-4 py-5 rounded-xl border-2 border-dashed transition-all cursor-pointer select-none ${uploading ? "border-[#28b098] bg-[#effcfa] cursor-not-allowed"
                : dragOver ? "border-[#28b098] bg-[#effcfa]"
                  : "border-slate-200 hover:border-[#28b098] hover:bg-slate-50"
              }`}
          >
            {uploading ? (
              <><Loader2 className="w-5 h-5 text-[#28b098] animate-spin" /><span className="text-[12px] text-slate-500 font-medium">Uploading…</span></>
            ) : value ? (
              <><div className="relative">
                <img src={value} className="h-16 w-auto rounded-lg object-cover" />
                <button type="button" onClick={(e) => { e.stopPropagation(); onChange(""); }}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <X className="w-3 h-3 text-white" />
                </button>
              </div><span className="text-[11px] text-slate-400">Click to replace</span></>
            ) : (
              <><Upload className="w-5 h-5 text-slate-400" />
                <span className="text-[12px] text-slate-500 font-medium">Drop an image or <span className="text-[#28b098] font-bold">browse</span></span>
                <span className="text-[11px] text-slate-400">PNG, JPG, WEBP · max 10 MB</span></>
            )}
          </div>
          <ImagePreview url={value} />
          <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
        </div>
      )}
      {uploadError && <p className="text-red-500 text-[12px] font-semibold mt-0.5">{uploadError}</p>}
    </div>
  );
}

/* ─── DetailsEditor ─────────────────────────────────────────────────────── */

const SECTION_META = [
  {
    key: "quick_specs" as const,
    label: "Quick Specs",
    icon: FileText,
    color: "text-amber-500",
    bg: "bg-amber-50",
    border: "border-amber-200",
    type: "label-value" as const,
    placeholder: { label: "e.g. Material", value: "e.g. BOPP" },
  },
  {
    key: "features" as const,
    label: "Features",
    icon: Check,
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    type: "title" as const,
    placeholder: { title: "e.g. Weather resistant" },
  },
  {
    key: "specifications" as const,
    label: "Specifications",
    icon: Settings,
    color: "text-blue-500",
    bg: "bg-blue-50",
    border: "border-blue-200",
    type: "label-value" as const,
    placeholder: { label: "e.g. Width", value: "e.g. 50mm" },
  },
  {
    key: "applications" as const,
    label: "Applications",
    icon: Layout,
    color: "text-purple-500",
    bg: "bg-purple-50",
    border: "border-purple-200",
    type: "title" as const,
    placeholder: { title: "e.g. Retail barcodes" },
  },
] as const;

function DetailsEditor({
  details,
  onChange,
}: {
  details: ProductDetails;
  onChange: (d: ProductDetails) => void;
}) {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<typeof SECTION_META[number]["key"]>("quick_specs");

  function updateSection<K extends keyof ProductDetails>(key: K, value: ProductDetails[K]) {
    onChange({ ...details, [key]: value });
  }

  const totalItems =
    (details.quick_specs?.length ?? 0) +
    (details.features?.length ?? 0) +
    (details.specifications?.length ?? 0) +
    (details.applications?.length ?? 0);

  return (
    <div className="flex flex-col gap-2">
      {/* Accordion header */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center justify-between w-full px-4 py-3 rounded-xl border transition-all ${open
            ? "border-[#28b098] bg-[#f0fdf9] text-slate-900"
            : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-white"
          }`}
      >
        <div className="flex items-center gap-2.5">
          <Zap className={`w-4 h-4 ${open ? "text-[#28b098]" : "text-slate-400"}`} />
          <span className="text-[13px] font-bold">Product Details</span>
          <span className="text-[13px] font-bold text-slate-400">(Features, Specs, Applications)</span>
          {totalItems > 0 && (
            <span className="px-2 py-0.5 bg-[#28b098] text-white text-[10px] font-bold rounded-full">
              {totalItems}
            </span>
          )}
        </div>
        {open ? (
          <ChevronUp className="w-4 h-4 text-slate-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400" />
        )}
      </button>

      {open && (
        <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
          {/* Section tab bar */}
          <div className="flex border-b border-slate-100 bg-slate-50/60">
            {SECTION_META.map((s) => {
              const Icon = s.icon;
              const count =
                s.type === "title"
                  ? (details[s.key] as FeatureItem[] | ApplicationItem[] | undefined)?.length ?? 0
                  : (details[s.key] as QuickSpec[] | SpecificationItem[] | undefined)?.length ?? 0;
              return (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => setActiveSection(s.key)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-[12px] font-bold transition-all border-b-2 ${activeSection === s.key
                      ? `border-[#28b098] text-slate-900 bg-white`
                      : "border-transparent text-slate-400 hover:text-slate-600"
                    }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${activeSection === s.key ? s.color : ""}`} />
                  <span className="hidden sm:inline">{s.label}</span>
                  {count > 0 && (
                    <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold text-white ${activeSection === s.key ? "bg-[#28b098]" : "bg-slate-300"}`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Active section content */}
          <div className="p-5">
            {SECTION_META.map((s) => {
              if (s.key !== activeSection) return null;
              const Icon = s.icon;

              if (s.type === "title") {
                const key = s.key as "features" | "applications";
                const items = (details[key] ?? []) as FeatureItem[] | ApplicationItem[];

                return (
                  <div key={s.key} className="flex flex-col gap-3">
                    <p className="text-[12px] text-slate-400 font-medium">
                      Each entry is a single title/label shown on the product page.
                    </p>
                    <div className="flex flex-col gap-2">
                      {items.map((item, i) => (
                        <div key={i} className="flex gap-2 items-center">
                          <div className={`w-7 h-7 rounded-lg ${s.bg} flex items-center justify-center shrink-0`}>
                            <Icon className={`w-3.5 h-3.5 ${s.color}`} />
                          </div>
                          <input
                            type="text"
                            value={(item as FeatureItem).title}
                            placeholder={(s.placeholder as { title: string }).title}
                            onChange={(e) => {
                              const next = items.map((it, idx) =>
                                idx === i ? { title: e.target.value } : it
                              ) as typeof items;
                              updateSection(key, next);
                            }}
                            className="flex-grow px-3 py-2 rounded-xl border border-slate-200 text-[13px] font-medium focus:outline-none focus:border-[#28b098] focus:ring-2 focus:ring-[#28b098]/20 transition-all"
                          />
                          <button
                            type="button"
                            onClick={() => updateSection(key, items.filter((_, idx) => idx !== i) as typeof items)}
                            className="w-7 h-7 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center shrink-0 transition-colors group"
                          >
                            <X className="w-3.5 h-3.5 text-red-400 group-hover:text-red-600" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => updateSection(key, [...items, { title: "" }] as typeof items)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed ${s.border} ${s.bg} text-[12px] font-bold ${s.color} hover:opacity-80 transition-all w-full justify-center`}
                    >
                      <Plus className="w-3.5 h-3.5" /> Add {s.label.slice(0, -1)}
                    </button>
                  </div>
                );
              }

              // label-value type
              const key = s.key as "quick_specs" | "specifications";
              const items = (details[key] ?? []) as QuickSpec[] | SpecificationItem[];

              return (
                <div key={s.key} className="flex flex-col gap-3">
                  <p className="text-[12px] text-slate-400 font-medium">
                    Each entry has a label and a value shown as a key-value pair on the product page.
                  </p>
                  <div className="flex flex-col gap-2">
                    {items.map((item, i) => {
                      const typed = item as QuickSpec;
                      const ph = s.placeholder as { label: string; value: string };
                      return (
                        <div key={i} className="flex gap-2 items-center">
                          <div className={`w-7 h-7 rounded-lg ${s.bg} flex items-center justify-center shrink-0`}>
                            <Icon className={`w-3.5 h-3.5 ${s.color}`} />
                          </div>
                          <input
                            type="text"
                            value={typed.label}
                            placeholder={ph.label}
                            onChange={(e) => {
                              const next = items.map((it, idx) =>
                                idx === i ? { ...(it as QuickSpec), label: e.target.value } : it
                              ) as typeof items;
                              updateSection(key, next);
                            }}
                            className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-[13px] font-medium focus:outline-none focus:border-[#28b098] focus:ring-2 focus:ring-[#28b098]/20 transition-all"
                          />
                          <input
                            type="text"
                            value={typed.value}
                            placeholder={ph.value}
                            onChange={(e) => {
                              const next = items.map((it, idx) =>
                                idx === i ? { ...(it as QuickSpec), value: e.target.value } : it
                              ) as typeof items;
                              updateSection(key, next);
                            }}
                            className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-[13px] font-medium focus:outline-none focus:border-[#28b098] focus:ring-2 focus:ring-[#28b098]/20 transition-all"
                          />
                          <button
                            type="button"
                            onClick={() => updateSection(key, items.filter((_, idx) => idx !== i) as typeof items)}
                            className="w-7 h-7 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center shrink-0 transition-colors group"
                          >
                            <X className="w-3.5 h-3.5 text-red-400 group-hover:text-red-600" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                  <button
                    type="button"
                    onClick={() => updateSection(key, [...items, { label: "", value: "" }] as typeof items)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed ${s.border} ${s.bg} text-[12px] font-bold ${s.color} hover:opacity-80 transition-all w-full justify-center`}
                  >
                    <Plus className="w-3.5 h-3.5" /> Add {s.label.slice(0, -1)}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── ProductsTab ───────────────────────────────────────────────────────── */

interface Props {
  products: Product[];
  onCreate: (form: ProductFormData) => Promise<boolean>;
  onUpdate: (id: string, form: ProductFormData) => Promise<boolean>;
  onDelete: (id: string) => void;
}

export function ProductsTab({ products, onCreate, onUpdate, onDelete }: Props) {
  const [modal, setModal] = useState<ModalMode>(null);
  const [editTarget, setEditTarget] = useState<Product | null>(null);
  const [form, setForm] = useState<ProductFormData>(EMPTY_FORM);

  function openCreate() {
    setForm(EMPTY_FORM);
    setEditTarget(null);
    setModal("create");
  }

  function openEdit(p: Product) {
    setEditTarget(p);
    setForm({
      name: p.name,
      name_ar: p.name_ar || "",
      desc: p.desc,
      desc_ar: p.desc_ar || "",
      image_url: p.image_url || "",
      tag: p.tag ?? "",
      tag_ar: p.tag_ar ?? "",
      category: p.category,
      category_ar: p.category_ar || "",
      details: {
        quick_specs: p.details?.quick_specs ?? [],
        features: p.details?.features ?? [],
        specifications: p.details?.specifications ?? [],
        applications: p.details?.applications ?? [],
      },
      details_ar: p.details_ar ?? null,
    });
    setModal("edit");
  }

  async function handleSubmit() {
    const ok = modal === "create" ? await onCreate(form) : await onUpdate(editTarget!.id, form);
    if (ok) setModal(null);
  }

  const set = (key: keyof ProductFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <h2 className="font-heading font-bold text-[16px] text-slate-900">Products</h2>
          <AppButton onClick={openCreate}><Plus className="w-4 h-4" /> Add Product</AppButton>
        </div>
        <div className="divide-y divide-slate-100">
          {products.length === 0 && (
            <div className="py-12 text-center text-slate-400 text-sm">No products yet. Add one!</div>
          )}
          {products.map((p) => {
            const detailCount =
              (p.details?.quick_specs?.length ?? 0) +
              (p.details?.features?.length ?? 0) +
              (p.details?.specifications?.length ?? 0) +
              (p.details?.applications?.length ?? 0);
            return (
              <div key={p.id} className="flex items-center gap-5 px-6 py-4 hover:bg-slate-50 transition-colors">
                <div className="w-12 h-12 rounded-xl shrink-0 bg-slate-100 overflow-hidden flex items-center justify-center">
                  {p.image_url ? <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" /> : <ImageIcon className="w-5 h-5 text-slate-300" />}
                </div>
                <div className="flex-grow min-w-0">
                  <div className="font-bold text-slate-900 text-[15px] truncate">{p.name}</div>
                  <div className="flex items-center gap-2 text-slate-400 text-[12px]">
                    <span className="truncate">{p.category}{p.tag ? ` · ${p.tag}` : ""}</span>
                    {detailCount > 0 && (
                      <span className="shrink-0 px-1.5 py-0.5 bg-[#3de0be]/15 text-[#0e9e80] text-[10px] font-bold rounded-full">
                        {detailCount} detail{detailCount !== 1 ? "s" : ""}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => openEdit(p)} className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-[#3de0be] flex items-center justify-center transition-colors group">
                    <Pencil className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-900" />
                  </button>
                  <button onClick={() => onDelete(p.id)} className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-red-100 flex items-center justify-center transition-colors group">
                    <Trash2 className="w-3.5 h-3.5 text-slate-500 group-hover:text-red-600" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {modal && (
        <Modal title={modal === "create" ? "Add New Product" : "Edit Product"} onClose={() => setModal(null)}>
          <div className="flex flex-col gap-4">
            <InputField label="Name" value={form.name} onChange={set("name")} placeholder="e.g. Cosmetic & Beauty" />
            <TextAreaField label="Description" value={form.desc} onChange={set("desc")} placeholder="Short product description..." rows={3} />
            <CategorySelect value={form.category} onChange={(val) => setForm((f) => ({ ...f, category: val }))} />
            <InputField label="Tag (optional)" value={form.tag ?? ""} onChange={set("tag")} placeholder="e.g. Best Seller, Trending" />
            <ImageField value={form.image_url} onChange={(url) => setForm((f) => ({ ...f, image_url: url }))} />

            {/* ── Details section ── */}
            <div className="border-t border-slate-100 pt-2 mt-1">
              <DetailsEditor
                details={form.details ?? EMPTY_DETAILS}
                onChange={(d) => setForm((f) => ({ ...f, details: d }))}
              />
            </div>

            <ModalActions
              onCancel={() => setModal(null)}
              onSubmit={handleSubmit}
              submitLabel={modal === "create" ? "Create Product" : "Save Changes"}
            />
          </div>
        </Modal>
      )}
    </>
  );
}