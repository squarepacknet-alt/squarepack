"use client";
import { Trash2 } from "lucide-react";
import { Inquiry } from "../types";

interface Props {
  inquiries: Inquiry[];
  onDelete: (id: string) => void;
}

export function InquiriesTab({ inquiries, onDelete }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-100">
        <h2 className="font-heading font-bold text-[16px] text-slate-900">Contact Inquiries</h2>
      </div>
      <div className="divide-y divide-slate-100">
        {inquiries.length === 0 && (
          <div className="py-12 text-center text-slate-400 text-sm">No new inquiries.</div>
        )}
        {inquiries.map((i) => (
          <div key={i.id} className="px-6 py-4 flex items-start justify-between gap-4">
            <div>
              <div className="font-bold text-[14px] text-slate-900">
                {i.name} · <span className="font-normal text-slate-500">{i.email}</span>
              </div>
              <div className="text-[12px] text-slate-400">{i.phone} | Topic: {i.topic}</div>
              <div className="mt-2 text-[14px] text-slate-700 bg-slate-50 p-3 rounded-lg">{i.message}</div>
            </div>
            <button
              onClick={() => onDelete(i.id)}
              className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-red-100 flex items-center justify-center shrink-0 transition-colors group"
            >
              <Trash2 className="w-3.5 h-3.5 text-slate-500 group-hover:text-red-600" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}