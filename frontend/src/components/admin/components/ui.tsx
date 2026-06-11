"use client";
import { X, Check, AlertTriangle } from "lucide-react";

// --- Modal ---
export function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-[1.5rem] shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h3 className="font-heading font-bold text-[18px] text-slate-900">{title}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-slate-600" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

// --- Toast ---
export function Toast({ msg, type }: { msg: string; type: "success" | "error" }) {
  return (
    <div
      className={`fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl text-white font-semibold text-[14px] animate-in slide-in-from-bottom-4 duration-500 ${
        type === "success" ? "bg-[#28b098]" : "bg-red-500"
      }`}
    >
      {type === "success" ? <Check className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
      {msg}
    </div>
  );
}

// --- InputField ---
export function InputField({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-extrabold text-slate-600 uppercase tracking-widest">
        {label}
      </label>
      <input
        {...props}
        className="px-4 py-3 rounded-xl border border-slate-200 text-[14px] font-medium focus:outline-none focus:border-[#28b098] focus:ring-2 focus:ring-[#28b098]/20 transition-all"
      />
    </div>
  );
}

// --- TextAreaField ---
export function TextAreaField({
  label,
  ...props
}: { label: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-extrabold text-slate-600 uppercase tracking-widest">
        {label}
      </label>
      <textarea
        {...props}
        className="px-4 py-3 rounded-xl border border-slate-200 text-[14px] font-medium focus:outline-none focus:border-[#28b098] focus:ring-2 focus:ring-[#28b098]/20 transition-all resize-none"
      />
    </div>
  );
}

// --- ModalActions (Cancel + Submit row) ---
export function ModalActions({
  onCancel,
  onSubmit,
  submitLabel,
}: {
  onCancel: () => void;
  onSubmit: () => void;
  submitLabel: string;
}) {
  return (
    <div className="flex gap-3 pt-2">
      <button
        onClick={onCancel}
        className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors"
      >
        Cancel
      </button>
      <button
        onClick={onSubmit}
        className="flex-1 py-3 rounded-xl bg-[#3de0be] hover:bg-[#35d1b1] text-slate-900 font-bold text-sm transition-colors"
      >
        {submitLabel}
      </button>
    </div>
  );
}