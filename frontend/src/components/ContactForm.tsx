"use client";
import { useState } from "react";
import { Send, Check, AlertTriangle } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ContactForm() {
  const formT = useTranslations('Contact.form');
  const [form, setForm] = useState({ name: "", email: "", phone: "", topic: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const rawAPI = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  const API = rawAPI.replace(/\/$/, "");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    try {
      const res = await fetch(`${API}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", topic: "", message: "" });
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
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-20 h-20 rounded-full bg-[#3de0be] flex items-center justify-center mb-6 shadow-lg shadow-[#3de0be]/20">
          <Check className="w-10 h-10 text-slate-900" strokeWidth={3} />
        </div>
        <h3 className="text-2xl font-heading font-bold text-slate-900 mb-3">Message Sent!</h3>
        <p className="text-slate-500 text-[15px] max-w-xs mx-auto leading-relaxed mb-8">
          Thank you for reaching out. Our team will get back to you shortly.
        </p>
        <button onClick={() => setStatus("idle")} className="text-[#28b098] font-bold text-sm hover:underline underline-offset-4">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
      {status === "error" && (
        <div className="bg-red-50 border border-red-100 text-red-600 px-5 py-3.5 rounded-xl text-sm font-semibold flex items-center gap-3">
          <AlertTriangle className="w-4 h-4" />
          Something went wrong. Please try again.
        </div>
      )}
      
      {/* Full Name */}
      <div className="flex flex-col space-y-2.5 text-left rtl:text-right">
        <label className="text-[11px] font-extrabold text-slate-700 uppercase tracking-widest pl-1 rtl:pl-0 rtl:pr-1">{formT('fields.name.label')}</label>
        <input 
          required
          type="text" 
          placeholder={formT('fields.name.placeholder')} 
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          className="px-5 py-3.5 rounded-xl border border-slate-200 bg-white placeholder:text-slate-400 text-[14px] focus:outline-none focus:border-[#3de0be] focus:ring-2 focus:ring-[#3de0be]/20 transition-all font-medium" 
        />
      </div>

      {/* Email / Phone Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col space-y-2.5 text-left rtl:text-right">
          <label className="text-[11px] font-extrabold text-slate-700 uppercase tracking-widest pl-1 rtl:pl-0 rtl:pr-1">{formT('fields.email.label')}</label>
          <input 
            required
            type="email" 
            placeholder={formT('fields.email.placeholder')} 
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            className="px-5 py-3.5 rounded-xl border border-slate-200 bg-white placeholder:text-slate-400 text-[14px] focus:outline-none focus:border-[#3de0be] focus:ring-2 focus:ring-[#3de0be]/20 transition-all font-medium" 
          />
        </div>
        <div className="flex flex-col space-y-2.5 text-left rtl:text-right">
          <label className="text-[11px] font-extrabold text-slate-700 uppercase tracking-widest pl-1 rtl:pl-0 rtl:pr-1">{formT('fields.phone.label')}</label>
          <input 
            type="tel" 
            placeholder={formT('fields.phone.placeholder')} 
            value={form.phone}
            onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
            className="px-5 py-3.5 rounded-xl border border-slate-200 bg-white placeholder:text-slate-400 text-[14px] focus:outline-none focus:border-[#3de0be] focus:ring-2 focus:ring-[#3de0be]/20 transition-all font-medium" 
          />
        </div>
      </div>

      {/* Topic */}
      <div className="flex flex-col space-y-2.5 text-left rtl:text-right">
        <label className="text-[11px] font-extrabold text-slate-700 uppercase tracking-widest pl-1 rtl:pl-0 rtl:pr-1">{formT('fields.topic.label')}</label>
        <select 
          value={form.topic}
          onChange={e => setForm(f => ({ ...f, topic: e.target.value }))}
          className="px-5 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-500 font-medium text-[14px] focus:outline-none focus:border-[#3de0be] focus:ring-2 focus:ring-[#3de0be]/20 transition-all appearance-none cursor-pointer rtl:bg-left" 
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 1.2rem center" }}
        >
          <option value="">{formT('fields.topic.placeholder')}</option>
          {(formT.raw('fields.topic.options') as string[]).map((option, idx) => (
            <option key={idx} value={option}>{option}</option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div className="flex flex-col space-y-2.5 text-left rtl:text-right">
        <label className="text-[11px] font-extrabold text-slate-700 uppercase tracking-widest pl-1 rtl:pl-0 rtl:pr-1">{formT('fields.message.label')}</label>
        <textarea 
          required
          rows={4} 
          placeholder={formT('fields.message.placeholder')} 
          value={form.message}
          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          className="px-5 py-3.5 rounded-xl border border-slate-200 bg-white placeholder:text-slate-400 text-[14px] focus:outline-none focus:border-[#3de0be] focus:ring-2 focus:ring-[#3de0be]/20 transition-all resize-none font-medium"
        ></textarea>
      </div>

      {/* Submit Button */}
      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-[#3de0be] hover:bg-[#31cfb0] disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-[#3de0be]/20 text-slate-900 font-bold text-[15px] tracking-wide py-4.5 min-h-[56px] rounded-xl flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 mt-2 border border-[#2bbd9f]/20"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
        ) : (
          <>
            {formT('submit')}
            <Send className="w-4 h-4 ml-0.5 rtl:mr-0.5 rtl:ml-0 rtl:rotate-[-90deg]" strokeWidth={2.5} />
          </>
        )}
      </button>
    </form>
  );
}
