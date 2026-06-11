import { useState, useCallback } from "react";
import { Testimonial, TestimonialFormData } from "../types";
import {
  fetchTestimonialsRequest,
  createTestimonialRequest,
  updateTestimonialRequest,
  deleteTestimonialRequest,
  approveTestimonialRequest,
} from "../api";

export function useTestimonials(showToast: (msg: string, type?: "success" | "error") => void) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  const fetchTestimonials = useCallback(async () => {
    try {
      const res = await fetchTestimonialsRequest();
      if (res.ok) setTestimonials(await res.json());
    } catch (e) {
      console.error("Fetch testimonials failed", e);
    }
  }, []);

  const createTestimonial = useCallback(async (form: TestimonialFormData) => {
    const res = await createTestimonialRequest(form);
    if (res.ok) {
      showToast("Testimonial created!");
      fetchTestimonials();
      return true;
    }
    showToast("Failed to create testimonial", "error");
    return false;
  }, [fetchTestimonials, showToast]);

  const updateTestimonial = useCallback(async (id: string, form: TestimonialFormData) => {
    const res = await updateTestimonialRequest(id, form);
    if (res.ok) {
      showToast("Testimonial updated!");
      fetchTestimonials();
      return true;
    }
    showToast("Failed to update", "error");
    return false;
  }, [fetchTestimonials, showToast]);

  const deleteTestimonial = useCallback(async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    const res = await deleteTestimonialRequest(id);
    if (res.ok) {
      showToast("Testimonial deleted!");
      fetchTestimonials();
    } else {
      showToast("Failed to delete", "error");
    }
  }, [fetchTestimonials, showToast]);

  const approveTestimonial = useCallback(async (id: string) => {
    const res = await approveTestimonialRequest(id);
    if (res.ok) {
      showToast("Testimonial approved!");
      fetchTestimonials();
    } else {
      showToast("Failed to approve", "error");
    }
  }, [fetchTestimonials, showToast]);

  return { testimonials, fetchTestimonials, createTestimonial, updateTestimonial, deleteTestimonial, approveTestimonial };
}