"use client";
import { useState } from "react";
import { Send, Star, Check, AlertTriangle } from "lucide-react";
import { useTranslations } from "next-intl";

const rawAPI = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const API = rawAPI.replace(/\/$/, "");

export default function SubmitTestimonialForm() {
  const t = useTranslations("Testimonials.form");
  const [form, setForm] = useState({
    author: "",
    role: "",
    company: "",
    content: "",
    rating: 5,
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [hoverRating, setHoverRating] = useState(0);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.author || !form.company || !form.content) return;
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/testimonials`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ author: "", role: "", company: "", content: "", rating: 5 });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-20 h-20 rounded-full bg-[#3de0be] flex items-center justify-center mb-6 shadow-[0_10px_30px_rgba(61,224,190,0.4)]">
          <Check className="w-9 h-9 text-slate-900" strokeWidth={3} />
        </div>
        <h3 className="text-2xl font-heading font-bold text-slate-900 mb-3">
          {t("success.title")}
        </h3>
        <p className="text-slate-500 text-[15px] max-w-md leading-relaxed mb-8">
          {t("success.desc")}
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="text-[#28b098] font-bold text-sm hover:underline"
        >
          {t("success.button")}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 text-left rtl:text-right"
    >
      {status === "error" && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl text-[14px] font-semibold">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          {t("error")}
        </div>
      )}

      {/* Author + Role */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-5"> */}

      {/* Removing the Role text field, as per the client demand */}
      {/* </div> */}

      <div className="flex flex-col gap-2 w-full">
        <label className="text-[11px] font-extrabold text-slate-600 uppercase tracking-widest pl-1 rtl:pl-0 rtl:pr-1">
          {t("fields.name.label")}
        </label>
        <input
          required
          type="text"
          placeholder={t("fields.name.placeholder")}
          value={form.author}
          onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
          className="w-full px-5 py-3.5 rounded-xl border border-slate-200 bg-white text-[14px] font-medium placeholder:text-slate-400 focus:outline-none focus:border-[#3de0be] focus:ring-2 focus:ring-[#3de0be]/20 transition-all"
        />
      </div>

      {/*Removing the Company text field, as per the client demand */}

      {/* Rating */}
      <div className="flex flex-col gap-3">
        <label className="text-[11px] font-extrabold text-slate-600 uppercase tracking-widest pl-1 rtl:pl-0 rtl:pr-1">
          {t("fields.rating.label")}
        </label>
        <div className="flex gap-2 rtl:flex-row-reverse rtl:justify-end">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onMouseEnter={() => setHoverRating(n)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setForm((f) => ({ ...f, rating: n }))}
              className="focus:outline-none transition-transform hover:scale-125 duration-150"
            >
              <Star
                className={`w-8 h-8 transition-colors duration-150 ${
                  n <= (hoverRating || form.rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-slate-300"
                }`}
              />
            </button>
          ))}
          <span className="ml-2 rtl:ml-0 rtl:mr-2 self-center text-slate-500 text-sm font-medium">
            {
              (t.raw("fields.rating.options") as string[])[
                hoverRating || form.rating
              ]
            }
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2">
        <label className="text-[11px] font-extrabold text-slate-600 uppercase tracking-widest pl-1 rtl:pl-0 rtl:pr-1">
          {t("fields.review.label")}
        </label>
        <textarea
          required
          rows={5}
          placeholder={t("fields.review.placeholder")}
          value={form.content}
          onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
          className="px-5 py-3.5 rounded-xl border border-slate-200 bg-white text-[14px] font-medium placeholder:text-slate-400 focus:outline-none focus:border-[#3de0be] focus:ring-2 focus:ring-[#3de0be]/20 transition-all resize-none"
        />
        <span className="text-slate-400 text-[12px] self-end">
          {form.content.length} / 500
        </span>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#3de0be] hover:bg-[#35d1b1] disabled:opacity-60 disabled:cursor-not-allowed text-slate-900 font-bold text-[15px] tracking-wide py-4 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 shadow-lg shadow-[#3de0be]/20"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
        ) : (
          <>
            {t("submit")} <Send className="w-4 h-4 rtl:rotate-[-90deg]" />
          </>
        )}
      </button>
    </form>
  );
}
