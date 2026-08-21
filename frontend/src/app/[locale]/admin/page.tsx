"use client";
import { useState, useEffect, useCallback } from "react";
import { Package, LogOut, ShieldCheck, UserCheck } from "lucide-react";
import { TabType, UserRole } from "@/components/admin/types";
import { useToast } from "@/components/admin/hooks/useToast";
import { useProducts } from "@/components/admin/hooks/useProducts";
import { useTestimonials } from "@/components/admin/hooks/useTestimonials";
import { useInquiries } from "@/components/admin/hooks/useInquiries";
import { useBlogs } from "@/components/admin/hooks/useBlogs";
import { Toast } from "@/components/admin/components/ui";
import { LoginScreen } from "@/components/admin/components/LoginScreen";
import { StatCards } from "@/components/admin/components/StatCards";
import { ProductsTab } from "@/components/admin/components/ProductsTab";
import { TestimonialsTab } from "@/components/admin/components/TestimonialsTab";
import { InquiriesTab } from "@/components/admin/components/InquiriesTab";
import { BlogsTab } from "@/components/admin/components/BlogsTab";
import { validateTokenRequest, setUnauthorizedHandler } from "@/components/admin/api";


export default function AdminDashboard() {
  const [authed, setAuthed] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>("admin");
  const [userEmail, setUserEmail] = useState<string>("");
  const [tab, setTab] = useState<TabType>("products");
  const [isValidating, setIsValidating] = useState(true);

  const { toast, showToast } = useToast();
  const { products, fetchProducts, createProduct, updateProduct, deleteProduct } = useProducts(showToast);
  const { testimonials, fetchTestimonials, createTestimonial, updateTestimonial, deleteTestimonial, approveTestimonial } = useTestimonials(showToast);
  const { inquiries, fetchInquiries, deleteInquiry } = useInquiries(showToast);
  const { blogs, fetchBlogs, createBlog, updateBlog, deleteBlog } = useBlogs(showToast);

  const canDelete = userRole === "admin";

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("admin_token");
      const storedRole = (localStorage.getItem("admin_role") as UserRole) || "admin";
      const storedEmail = localStorage.getItem("admin_email") || "";

      if (!token) {
        setIsValidating(false);
        return;
      }

      // Abort validation after 5 s so the login form always appears
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 5000);

      try {
        const res = await validateTokenRequest(controller.signal);
        clearTimeout(timer);
        if (res.ok) {
          const data = await res.json();
          setAuthed(true);
          setUserRole(data.role || storedRole);
          setUserEmail(data.email || storedEmail);
        } else {
          localStorage.removeItem("admin_token");
          localStorage.removeItem("admin_role");
          localStorage.removeItem("admin_email");
        }
      } catch {
        clearTimeout(timer);
        localStorage.removeItem("admin_token");
        localStorage.removeItem("admin_role");
        localStorage.removeItem("admin_email");
      } finally {
        setIsValidating(false);
      }
    };

    validateToken();
  }, []);

  // Set up unauthorized handler to redirect to login on 401 errors
  const handleUnauthorized = useCallback(() => {
    setAuthed(false);
  }, []);

  useEffect(() => {
    setUnauthorizedHandler(handleUnauthorized);
  }, [handleUnauthorized]);

  useEffect(() => {
    if (authed) {
      fetchProducts();
      fetchTestimonials();
      fetchInquiries();
      fetchBlogs();
    }
  }, [authed]);

  const handleLoginSuccess = (role: string) => {
    setUserRole((role as UserRole) || "editor");
    setUserEmail(localStorage.getItem("admin_email") || "");
    setAuthed(true);
  };

  const handleSignOut = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_role");
    localStorage.removeItem("admin_email");
    setAuthed(false);
  };

  if (isValidating) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-[#3de0be] border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-400 text-sm font-medium">Checking session…</p>
      </div>
    </div>
  );
  if (!authed) return <LoginScreen onLogin={handleLoginSuccess} />;

  return (
    <div className="min-h-screen bg-[#f6f8fa]">
      {toast && <Toast msg={toast.msg} type={toast.type} />}

      <header className="bg-slate-900 px-8 py-4 flex items-center justify-between sticky top-0 z-40 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#3de0be] flex items-center justify-center">
            <Package className="w-5 h-5 text-slate-900" />
          </div>
          <div>
            <span className="text-white font-heading font-bold text-[17px] leading-tight block">SquarePack Admin</span>
            <span className="text-[11px] text-slate-400 block">Content Management Portal</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* User info badge */}
          <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
            {userRole === "admin" ? (
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <UserCheck className="w-4 h-4 text-amber-400 shrink-0" />
            )}
            <div className="text-left">
              <div className="text-[12px] font-medium text-slate-200">{userEmail || (userRole === "admin" ? "admin@squarepack.net" : "user@squarepack.net")}</div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {userRole === "admin" ? (
                  <span className="text-emerald-400">Full Admin (All Permissions)</span>
                ) : (
                  <span className="text-amber-400">Editor (No Delete Access)</span>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium transition-colors bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-xl"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-[1200px] mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-black text-slate-900 mb-1">Dashboard</h1>
          <p className="text-slate-500 text-sm">
            {canDelete
              ? "Full administrator access: create, edit, approve, and delete content."
              : "Editor access: you can create, update, and manage content (deletion is restricted to admins)."}
          </p>
        </div>

        <StatCards productCount={products.length} testimonialCount={testimonials.length} />

        {/* Tabs */}
        <div className="flex gap-1 bg-slate-100 p-1 rounded-xl mb-6">
          {(["products", "testimonials", "inquiries", "blogs"] as TabType[]).map((t) => (
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
            canDelete={canDelete}
          />
        )}
        {tab === "testimonials" && (
          <TestimonialsTab
            testimonials={testimonials}
            onCreate={createTestimonial}
            onUpdate={updateTestimonial}
            onDelete={deleteTestimonial}
            onApprove={approveTestimonial}
            canDelete={canDelete}
          />
        )}
        {tab === "inquiries" && (
          <InquiriesTab
            inquiries={inquiries}
            onDelete={deleteInquiry}
            canDelete={canDelete}
          />
        )}
        {tab === "blogs" && (
          <BlogsTab
            blogs={blogs}
            onCreate={createBlog}
            onUpdate={updateBlog}
            onDelete={deleteBlog}
            canDelete={canDelete}
            showToast={showToast}
          />
        )}
      </div>
    </div>
  );
}