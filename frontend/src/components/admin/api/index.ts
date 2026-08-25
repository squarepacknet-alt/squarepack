import { API_URL } from "@/config/api";

export const API = API_URL;

let onUnauthorized: (() => void) | null = null;

export function setUnauthorizedHandler(handler: () => void) {
  onUnauthorized = handler;
}

function authHeaders(extra?: HeadersInit): HeadersInit {
  return {
    Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
    ...extra,
  };
}

function jsonHeaders(): HeadersInit {
  return authHeaders({ "Content-Type": "application/json" });
}

async function apiFetch(path: string, init?: RequestInit) {
  const response = await fetch(`${API}${path}`, init);
  
  // Handle 401 Unauthorized - clear invalid token and trigger redirect
  if (response.status === 401) {
    localStorage.removeItem("admin_token");
    if (onUnauthorized) {
      onUnauthorized();
    }
  }
  
  return response;
}

// --- Auth ---
export async function loginRequest(email: string, password: string) {
  return apiFetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
}

export async function validateTokenRequest(signal?: AbortSignal) {
  return apiFetch("/api/auth/validate", { headers: authHeaders(), signal });
}

// --- Products ---
export async function fetchProductsRequest() {
  return apiFetch("/api/products?all=true", { headers: authHeaders() });
}

export async function createProductRequest(data: object) {
  return apiFetch("/api/products", {
    method: "POST",
    headers: jsonHeaders(),
    body: JSON.stringify(data),
  });
}

export async function updateProductRequest(id: string, data: object) {
  return apiFetch(`/api/products/${id}`, {
    method: "PUT",
    headers: jsonHeaders(),
    body: JSON.stringify({ ...data, id }),
  });
}

export async function deleteProductRequest(id: string) {
  return apiFetch(`/api/products/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
}

// --- Testimonials ---
export async function fetchTestimonialsRequest() {
  return apiFetch("/api/testimonials?all=true", { headers: authHeaders() });
}

export async function createTestimonialRequest(data: object) {
  return apiFetch("/api/testimonials", {
    method: "POST",
    headers: jsonHeaders(),
    body: JSON.stringify(data),
  });
}

export async function updateTestimonialRequest(id: string, data: object) {
  return apiFetch(`/api/testimonials/${id}`, {
    method: "PUT",
    headers: jsonHeaders(),
    body: JSON.stringify({ ...data, id }),
  });
}

export async function deleteTestimonialRequest(id: string) {
  return apiFetch(`/api/testimonials/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
}

export async function approveTestimonialRequest(id: string) {
  return apiFetch(`/api/testimonials/${id}/approve`, {
    method: "PATCH",
    headers: authHeaders(),
  });
}

// --- Inquiries ---
export async function fetchInquiriesRequest() {
  return apiFetch("/api/contact", { headers: authHeaders() });
}

export async function deleteInquiryRequest(id: string) {
  return apiFetch(`/api/contact/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
}

// --- Blogs ---
export async function fetchBlogsRequest() {
  return apiFetch("/api/blogs", { headers: authHeaders() });
}

export async function createBlogRequest(data: object) {
  return apiFetch("/api/blogs", {
    method: "POST",
    headers: jsonHeaders(),
    body: JSON.stringify(data),
  });
}

export async function updateBlogRequest(id: string, data: object) {
  return apiFetch(`/api/blogs/${id}`, {
    method: "PUT",
    headers: jsonHeaders(),
    body: JSON.stringify({ ...data, id }),
  });
}

export async function deleteBlogRequest(id: string) {
  return apiFetch(`/api/blogs/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
}

export async function uploadBlogImageRequest(formData: FormData) {
  return apiFetch("/api/blogs/upload-image", {
    method: "POST",
    headers: authHeaders(), // Let the browser set Content-Type for FormData
    body: formData,
  });
}