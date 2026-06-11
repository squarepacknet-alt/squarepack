export const API = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000").replace(/\/$/, "");

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
  return fetch(`${API}${path}`, init);
}

// --- Auth ---
export async function loginRequest(password: string) {
  return apiFetch("/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });
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