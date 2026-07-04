"use client";

import { useState } from "react";
import { FileText } from "lucide-react";

export default function BrochureButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href="https://ubsmrihzrvqmdvzfqoyu.supabase.co/storage/v1/object/public/brochure/SQUAREPACK%20BROCHURE.pdf"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Download Brochure PDF"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "fixed",
        right: 0,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        // Matches navbar: rgba(12, 20, 18, 0.82) + teal tint
        background: hovered
          ? "rgba(52, 232, 187, 0.18)"
          : "rgba(12, 20, 18, 0.82)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        color: hovered ? "#34E8BB" : "rgba(255,255,255,0.65)",
        textDecoration: "none",
        padding: hovered ? "18px 12px" : "14px 10px",
        borderRadius: "8px 0 0 8px",
        // Matches navbar border style
        border: "1px solid rgba(52, 232, 187, 0.18)",
        borderRight: "none",
        boxShadow: hovered
          ? "-4px 0 20px rgba(52, 232, 187, 0.25)"
          : "-3px 0 14px rgba(0,0,0,0.3)",
        transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        whiteSpace: "nowrap",
        minWidth: "36px",
      }}
    >
      {/* PDF Icon — matches navbar icon sizing (w-3.5 h-3.5) */}
      <FileText
        style={{
          width: "14px",
          height: "14px",
          flexShrink: 0,
          color: "#34E8BB",
          opacity: hovered ? 1 : 0.7,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Teal glow line separator — mirrors the top bar bottom glow */}
      <span
        style={{
          display: "block",
          width: "1px",
          height: hovered ? "20px" : "12px",
          background:
            "linear-gradient(180deg, transparent, rgba(52,232,187,0.55), transparent)",
          transition: "height 0.3s ease",
        }}
      />
      <span
        style={{
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          transform: "rotate(180deg)",
          fontSize: "10.5px",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          fontFamily: "'Barlow Condensed', 'Segoe UI', system-ui, sans-serif",
          lineHeight: 1,
          color: hovered ? "#34E8BB" : "rgba(52, 232, 187, 0.7)",
          transition: "color 0.3s ease",
        }}
      >
        Brochure
      </span>
    </a>
  );
}
