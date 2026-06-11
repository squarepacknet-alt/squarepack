"use client";
import { useState } from "react";
import { Plus, Pencil, Trash2, Check } from "lucide-react";
import { Modal, InputField, TextAreaField, ModalActions } from "./ui";
import { Testimonial, TestimonialFormData, ModalMode } from "../types";

const EMPTY_FORM: TestimonialFormData = {
  author: "", author_ar: "", role: "", role_ar: "", company: "", company_ar: "",
  content: "", content_ar: "", rating: 5, is_approved: false,
};

interface Props {
  testimonials: Testimonial[];
  onCreate: (form: TestimonialFormData) => Promise<boolean>;
  onUpdate: (id: string, form: TestimonialFormData) => Promise<boolean>;
  onDelete: (id: string) => void;
  onApprove: (id: string) => void;
}

export function TestimonialsTab({ testimonials, onCreate, onUpdate, onDelete, onApprove }: Props) {
  const [modal, setModal] = useState<ModalMode>(null);
  const [editTarget, setEditTarget] = useState<Testimonial | null>(null);
  const [form, setForm] = useState<TestimonialFormData>(EMPTY_FORM);

  function openCreate() {
    setForm(EMPTY_FORM);
    setEditTarget(null);
    setModal("create");
  }

  function openEdit(t: Testimonial) {
    setEditTarget(t);
    setForm({ author: t.author, author_ar: t.author_ar || "", role: t.role, role_ar: t.role_ar || "",
      company: t.company, company_ar: t.company_ar || "", content: t.content, content_ar: t.content_ar || "",
      rating: t.rating, is_approved: t.is_approved });
    setModal("edit");
  }

  async function handleSubmit() {
    const ok = modal === "create"
      ? await onCreate(form)
      : await onUpdate(editTarget!.id, form);
    if (ok) setModal(null);
  }

  const set = (key: keyof TestimonialFormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <h2 className="font-heading font-bold text-[16px] text-slate-900">Testimonials</h2>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-[#3de0be] hover:bg-[#35d1b1] text-slate-900 font-bold text-[13px] px-4 py-2.5 rounded-xl transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Testimonial
          </button>
        </div>
        <div className="divide-y divide-slate-100">
          {testimonials.length === 0 && (
            <div className="py-12 text-center text-slate-400 text-sm">No testimonials yet.</div>
          )}
          {testimonials.map((t) => (
            <div key={t.id} className="flex items-start gap-5 px-6 py-4 hover:bg-slate-50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#28b098] to-[#1a7a6e] flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-white font-black text-[14px]">{t.author.charAt(0)}</span>
              </div>
              <div className="flex-grow min-w-0">
                <div className="font-bold text-slate-900 text-[14px]">
                  {t.author} <span className="text-slate-400 font-normal">· {t.company}</span>
                  {!t.is_approved && (
                    <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-700 text-[10px] font-black uppercase rounded-full">
                      Pending
                    </span>
                  )}
                </div>
                <div className="text-slate-500 text-[12px] line-clamp-2 mt-0.5">{t.content}</div>
                <div className="flex gap-0.5 mt-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xs">★</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {!t.is_approved && (
                  <button onClick={() => onApprove(t.id)} className="w-8 h-8 rounded-lg bg-[#effcfa] hover:bg-[#3de0be] flex items-center justify-center transition-colors group">
                    <Check className="w-3.5 h-3.5 text-[#28b098] group-hover:text-slate-900" />
                  </button>
                )}
                <button onClick={() => openEdit(t)} className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-[#3de0be] flex items-center justify-center transition-colors group">
                  <Pencil className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-900" />
                </button>
                <button onClick={() => onDelete(t.id)} className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-red-100 flex items-center justify-center transition-colors group">
                  <Trash2 className="w-3.5 h-3.5 text-slate-500 group-hover:text-red-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modal && (
        <Modal title={modal === "create" ? "Add Testimonial" : "Edit Testimonial"} onClose={() => setModal(null)}>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Author (EN)" value={form.author} onChange={set("author")} />
              <InputField label="Author (AR)" value={form.author_ar} onChange={set("author_ar")} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Role (EN)" value={form.role} onChange={set("role")} />
              <InputField label="Role (AR)" value={form.role_ar} onChange={set("role_ar")} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Company (EN)" value={form.company} onChange={set("company")} />
              <InputField label="Company (AR)" value={form.company_ar} onChange={set("company_ar")} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <TextAreaField label="Content (EN)" value={form.content} onChange={set("content")} rows={3} />
              <TextAreaField label="Content (AR)" value={form.content_ar} onChange={set("content_ar")} rows={3} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-extrabold text-slate-600 uppercase tracking-widest">Rating (1–5)</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    onClick={() => setForm((f) => ({ ...f, rating: n }))}
                    className={`flex-1 py-2.5 rounded-xl border font-bold text-sm transition-all ${
                      form.rating >= n ? "bg-yellow-400 border-yellow-400 text-white" : "border-slate-200 text-slate-400 hover:border-yellow-300"
                    }`}
                  >★</button>
                ))}
              </div>
            </div>
            <ModalActions
              onCancel={() => setModal(null)}
              onSubmit={handleSubmit}
              submitLabel={modal === "create" ? "Add Testimonial" : "Save Changes"}
            />
          </div>
        </Modal>
      )}
    </>
  );
}