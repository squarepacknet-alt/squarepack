export interface QuickSpec {
  label: string;
  value: string;
}

export interface FeatureItem {
  title: string;
}

export interface SpecificationItem {
  label: string;
  value: string;
}

export interface ApplicationItem {
  title: string;
}

export interface ProductDetails {
  quick_specs?: QuickSpec[];
  features?: FeatureItem[];
  specifications?: SpecificationItem[];
  applications?: ApplicationItem[];
}

export interface Product {
  id: string;
  name: string;
  name_ar: string;
  desc: string;
  desc_ar: string;
  image_url: string;
  tag: string | null;
  tag_ar: string | null;
  category: string;
  category_ar: string;
  details?: ProductDetails | null;
  details_ar?: ProductDetails | null;
}

export interface Testimonial {
  id: string;
  author: string;
  author_ar: string;
  role: string;
  role_ar: string;
  company: string;
  company_ar: string;
  content: string;
  content_ar: string;
  rating: number;
  is_approved: boolean;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
  created_at: string;
}

export type TabType = "products" | "testimonials" | "inquiries";
export type ModalMode = "create" | "edit" | null;
export type ToastState = { msg: string; type: "success" | "error" } | null;

export type ProductFormData = Omit<Product, "id">;
export type TestimonialFormData = Omit<Testimonial, "id">;