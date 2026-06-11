"use client";
import { Package, MessageSquare } from "lucide-react";

interface Props {
  productCount: number;
  testimonialCount: number;
}

export function StatCards({ productCount, testimonialCount }: Props) {
  return (
    <div className="grid grid-cols-2 gap-5 mb-10">
      <StatCard icon={<Package className="w-5 h-5 text-[#28b098]" />} count={productCount} label="Total Products" />
      <StatCard icon={<MessageSquare className="w-5 h-5 text-[#28b098]" />} count={testimonialCount} label="Total Testimonials" />
    </div>
  );
}

function StatCard({ icon, count, label }: { icon: React.ReactNode; count: number; label: string }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-sm flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-[#effcfa] flex items-center justify-center">{icon}</div>
      <div>
        <div className="text-3xl font-black text-slate-900">{count}</div>
        <div className="text-slate-500 text-sm font-medium">{label}</div>
      </div>
    </div>
  );
}