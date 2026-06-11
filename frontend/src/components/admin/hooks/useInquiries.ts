import { useState, useCallback } from "react";
import { Inquiry } from "../types";
import { fetchInquiriesRequest, deleteInquiryRequest } from "../api";

export function useInquiries(showToast: (msg: string, type?: "success" | "error") => void) {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  const fetchInquiries = useCallback(async () => {
    try {
      const res = await fetchInquiriesRequest();
      if (res.ok) setInquiries(await res.json());
    } catch (e) {
      console.error("Fetch inquiries failed", e);
    }
  }, []);

  const deleteInquiry = useCallback(async (id: string) => {
    if (!confirm("Delete this inquiry?")) return;
    try {
      const res = await deleteInquiryRequest(id);
      if (res.ok) {
        setInquiries((prev) => prev.filter((i) => i.id !== id));
        showToast("Inquiry deleted");
      }
    } catch {
      showToast("Delete failed", "error");
    }
  }, [showToast]);

  return { inquiries, fetchInquiries, deleteInquiry };
}