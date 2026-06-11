"use client";
import { useState, useEffect } from "react";
import { Package, LogOut } from "lucide-react";
import { TabType } from "@/components/admin/types";
import { useToast } from "@/components/admin/hooks/useToast";
import { useProducts } from "@/components/admin/hooks/useProducts";
import { useTestimonials } from "@/components/admin/hooks/useTestimonials";
import { useInquiries } from "@/components/admin/hooks/useInquiries";
import { Toast } from "@/components/admin/components/ui";
import { LoginScreen } from "@/components/admin/components/LoginScreen";
import { StatCards } from "@/components/admin/components/StatCards";
import { ProductsTab } from "@/components/admin/components/ProductsTab";
import { TestimonialsTab } from "@/components/admin/components/TestimonialsTab";
import { InquiriesTab } from "@/components/admin/components/InquiriesTab";


export default function AdminDashboard() {
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<TabType>("products");

  const { toast, showToast } = useToast();
  const { products, fetchProducts, createProduct, updateProduct, deleteProduct } = useProducts(showToast);
  const { testimonials, fetchTestimonials, createTestimonial, updateTestimonial, deleteTestimonial, approveTestimonial } = useTestimonials(showToast);
  const { inquiries, fetchInquiries, deleteInquiry } = useInquiries(showToast);

  useEffect(() => {
    if (localStorage.getItem("admin_token")) setAuthed(true);
  }, []);

  useEffect(() => {
    if (authed) {
      fetchProducts();
      fetchTestimonials();
      fetchInquiries();
    }
  }, [authed]);

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;

  return (
    <div className="min-h-screen bg-[#f6f8fa]">
      {toast && <Toast msg={toast.msg} type={toast.type} />}

      <header className="bg-slate-900 px-8 py-4 flex items-center justify-between sticky top-0 z-40 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#3de0be] flex items-center justify-center">
            <Package className="w-5 h-5 text-slate-900" />
          </div>
          <span className="text-white font-heading font-bold text-[17px]">SquarePack Admin</span>
        </div>
        <button
          onClick={() => { localStorage.removeItem("admin_token"); setAuthed(false); }}
          className="flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium transition-colors"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </header>

      <div className="max-w-[1200px] mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-black text-slate-900 mb-1">Dashboard</h1>
          <p className="text-slate-500 text-sm">Manage your products and testimonials content.</p>
        </div>

        <StatCards productCount={products.length} testimonialCount={testimonials.length} />

        {/* Tabs */}
        <div className="flex gap-1 bg-slate-100 p-1 rounded-xl mb-6">
          {(["products", "testimonials", "inquiries"] as TabType[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2.5 rounded-lg text-[13px] font-bold transition-all capitalize ${
                tab === t ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {t}
              {t === "inquiries" && inquiries.length > 0 && (
                <span className="ml-1 px-1.5 py-0.5 bg-[#28b098] text-white text-[10px] rounded-full">
                  {inquiries.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {tab === "products" && (
          <ProductsTab
            products={products}
            onCreate={createProduct}
            onUpdate={updateProduct}
            onDelete={deleteProduct}
          />
        )}
        {tab === "testimonials" && (
          <TestimonialsTab
            testimonials={testimonials}
            onCreate={createTestimonial}
            onUpdate={updateTestimonial}
            onDelete={deleteTestimonial}
            onApprove={approveTestimonial}
          />
        )}
        {tab === "inquiries" && (
          <InquiriesTab inquiries={inquiries} onDelete={deleteInquiry} />
        )}
      </div>
    </div>
  );
}