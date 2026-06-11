import { ReactNode } from "react";
interface AppButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  width?: string;
  isOutlined?: boolean;
  isDark?: boolean;
}

export default function AppButton({
  children,
  onClick,
  href,
  type = "button",
  className = "",
  disabled = false,
  fullWidth = false,
  isOutlined = false,
  isDark = false,
}: AppButtonProps) {
  const baseStyles = {
    backgroundColor: "#34E8BB",
    color: "#0c0c0c",
    padding: "12px 26.5px",
    borderRadius: "9999px",
    boxShadow: "0 4px 20px rgba(52, 232, 187, 0.25)",
    width: fullWidth ? "100%" : "auto",
  };

  const outlinedBaseStyles = {
    backgroundColor: isDark ? "transparent" : "#0c0c0c",
    color: isDark ? "#ffffff" : "#34E8BB",
    border: isDark ? "1px solid rgba(255, 255, 255, 0.3)" : "none",
    padding: "12px 26.5px",
    borderRadius: "9999px",
    boxShadow: isDark ? "none" : "0 4px 20px rgba(52, 232, 187, 0.25)",
    width: fullWidth ? "100%" : "auto",
  };

  const combineClassName = `font-semibold text-[14px] lg:text-[15px] transition-all hover:scale-105 inline-flex items-center justify-center gap-2 ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={combineClassName}
        style={isOutlined ? outlinedBaseStyles : baseStyles}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combineClassName}
      style={isOutlined ? outlinedBaseStyles : baseStyles}
    >
      {children}
    </button>
  );
}
