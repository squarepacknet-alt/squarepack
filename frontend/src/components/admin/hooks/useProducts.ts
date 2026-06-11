import { useState, useCallback } from "react";
import { Product, ProductFormData } from "../types";
import {
  fetchProductsRequest,
  createProductRequest,
  updateProductRequest,
  deleteProductRequest,
} from "../api";

export function useProducts(showToast: (msg: string, type?: "success" | "error") => void) {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetchProductsRequest();
      if (res.ok) setProducts(await res.json());
    } catch (e) {
      console.error("Fetch products failed", e);
    }
  }, []);

  const createProduct = useCallback(async (form: ProductFormData) => {
    const res = await createProductRequest(form);
    if (res.ok) {
      showToast("Product created!");
      fetchProducts();
      return true;
    }
    showToast("Failed to create product", "error");
    return false;
  }, [fetchProducts, showToast]);

  const updateProduct = useCallback(async (id: string, form: ProductFormData) => {
    const res = await updateProductRequest(id, form);
    if (res.ok) {
      showToast("Product updated!");
      fetchProducts();
      return true;
    }
    showToast("Failed to update product", "error");
    return false;
  }, [fetchProducts, showToast]);

  const deleteProduct = useCallback(async (id: string) => {
    if (!confirm("Delete this product?")) return;
    const res = await deleteProductRequest(id);
    if (res.ok) {
      showToast("Product deleted!");
      fetchProducts();
    } else {
      showToast("Failed to delete", "error");
    }
  }, [fetchProducts, showToast]);

  return { products, fetchProducts, createProduct, updateProduct, deleteProduct };
}