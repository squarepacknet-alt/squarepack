import { useState, useCallback } from "react";
import { Blog, BlogFormData } from "../types";
import {
  fetchBlogsRequest,
  createBlogRequest,
  updateBlogRequest,
  deleteBlogRequest,
} from "../api";

export function useBlogs(showToast: (msg: string, type: "success" | "error") => void) {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const fetchBlogs = useCallback(async () => {
    try {
      const res = await fetchBlogsRequest();
      if (res.ok) {
        const data = await res.json();
        setBlogs(data);
      }
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    }
  }, []);

  const createBlog = async (data: BlogFormData) => {
    try {
      const res = await createBlogRequest(data);
      if (res.ok) {
        showToast("Blog created successfully", "success");
        fetchBlogs();
        return true;
      }
      showToast("Failed to create blog", "error");
      return false;
    } catch (error) {
      showToast("Failed to create blog", "error");
      return false;
    }
  };

  const updateBlog = async (id: string, data: BlogFormData) => {
    try {
      const res = await updateBlogRequest(id, data);
      if (res.ok) {
        showToast("Blog updated successfully", "success");
        fetchBlogs();
        return true;
      }
      showToast("Failed to update blog", "error");
      return false;
    } catch (error) {
      showToast("Failed to update blog", "error");
      return false;
    }
  };

  const deleteBlog = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      const res = await deleteBlogRequest(id);
      if (res.ok) {
        showToast("Blog deleted successfully", "success");
        fetchBlogs();
      } else {
        showToast("Failed to delete blog", "error");
      }
    } catch (error) {
      showToast("Failed to delete blog", "error");
    }
  };

  return {
    blogs,
    fetchBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
  };
}
