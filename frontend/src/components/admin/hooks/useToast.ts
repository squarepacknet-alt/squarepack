import { useState, useCallback } from "react";
import { ToastState } from "../types";

export function useToast() {
  const [toast, setToast] = useState<ToastState>(null);

  const showToast = useCallback((msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  return { toast, showToast };
}