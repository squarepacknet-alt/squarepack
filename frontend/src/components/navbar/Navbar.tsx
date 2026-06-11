/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { Menu, X, Languages, Headphones, Mail, Phone } from "lucide-react";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useState, useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import AppButton from "../appButton/AppButton";
import ProductMegaMenu from "./prodcut-menu";

const TOP_BAR_HEIGHT = 36;
const NAV_HEIGHT = 80;

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isOverDark, setIsOverDark] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [topBarVisible, setTopBarVisible] = useState(true);
  const lastScrollY = useRef(0);
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      setIsScrolled(currentY > 20);

      // Show top bar at very top or when scrolling back up; hide when scrolling down
      if (currentY <= 10) {
        setTopBarVisible(true);
      } else if (currentY > lastScrollY.current) {
        setTopBarVisible(false);
      } else {
        setTopBarVisible(true);
      }
      lastScrollY.current = currentY;

      // Dark section detection
      const darkElements = document.querySelectorAll(
        '[data-navbar-dark="true"]',
      );
      let overDark = false;
      darkElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 60 && rect.bottom >= 40) {
          overDark = true;
        }
      });
      setIsOverDark(overDark);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const toggleLanguage = () => {
    const newLocale = locale === "en" ? "ar" : "en";
    router.replace(pathname, { locale: newLocale });
  };

  const navLinks = [
    { href: "/about-us", label: t("about") },
    { href: "/products", label: t("products") },
    { href: "/industries", label: t("industries") },
    { href: "/testimonials", label: t("testimonials") },
    { href: "/contact-us", label: t("contact") },
  ] as const;

  return (
    <>
      {/* ── Top Contact Bar ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[60] w-full hidden md:flex items-center justify-center gap-5 px-6 overflow-hidden"
        style={{ height: `${TOP_BAR_HEIGHT}px` }}
        animate={{ y: topBarVisible ? 0 : -TOP_BAR_HEIGHT }}
        transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Background: dark tint matching the site's dark tone with teal tint + blur */}
        <div
          className="absolute inset-0"
          style={{
            background: "rgba(12, 20, 18, 0.82)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(52, 232, 187, 0.18)",
          }}
        />

        {/* Teal glow accent line at bottom */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px pointer-events-none"
          style={{
            width: "35%",
            background:
              "linear-gradient(90deg, transparent, rgba(52,232,187,0.55), transparent)",
          }}
        />

        {/* Content */}
        <div className="relative flex items-center gap-5 text-[12.5px]">
          {/* 24/7 Support badge */}
          <div className="flex items-center gap-1.5">
            <Headphones className="w-3.5 h-3.5 text-[#34E8BB]" />
            <span
              className="uppercase tracking-widest text-[10.5px] font-bold"
              style={{ color: "rgba(52,232,187,0.7)" }}
            >
              24/7 Support
            </span>
          </div>

          <span
            style={{ color: "rgba(52,232,187,0.2)" }}
            className="text-lg leading-none"
          >
            ·
          </span>

          {/* Phone 1 */}
          <a
            href="tel:+971504578900"
            className="group flex items-center gap-1.5 font-medium transition-colors duration-200"
            style={{ color: "rgba(255,255,255,0.5)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#34E8BB")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,0.5)")
            }
          >
            <Phone className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
            +971 50 457 8900
          </a>

          <span style={{ color: "rgba(255,255,255,0.15)" }}>|</span>

          {/* Phone 2 */}
          <a
            href="tel:+971509929801"
            className="font-medium transition-colors duration-200"
            style={{ color: "rgba(255,255,255,0.5)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#34E8BB")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,0.5)")
            }
          >
            +971 50 992 9801
          </a>

          <span style={{ color: "rgba(255,255,255,0.15)" }}>|</span>

          {/* Email */}
          <a
            href="mailto:sales@squarepack.net"
            className="group flex items-center gap-1.5 font-medium transition-colors duration-200"
            style={{ color: "rgba(255,255,255,0.5)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#34E8BB")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,0.5)")
            }
          >
            <Mail className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
            sales@squarepack.net
          </a>
        </div>
      </motion.div>

      {/* ── Main Navbar — slides with the top bar ── */}
      <motion.header
        className="fixed left-0 right-0 z-50 w-full"
        animate={{ top: topBarVisible ? TOP_BAR_HEIGHT : 0 }}
        transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          background: "rgba(52, 232, 187, 0.1)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          height: `${NAV_HEIGHT}px`,
          // On mobile, top bar is hidden so always sit at 0 via override below
        }}
      >
        {/* Mobile override: always at top since top bar is hidden on mobile */}
        <style>{`
          @media (max-width: 767px) {
            .navbar-header { top: 0 !important; }
          }
        `}</style>
        <div
          className="navbar-header h-full flex items-center justify-between px-6 lg:px-10"
          style={{ maxWidth: "1440px", margin: "0 auto" }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <Image
              src="/logo.png"
              alt="SquarePack Logo"
              width={40}
              height={40}
              className="h-10 w-auto"
              priority
            />
            <Image
              src="/logo_text.png"
              alt="SquarePack Text"
              width={120}
              height={32}
              className={`hidden sm:block h-8 w-auto object-contain transition-all duration-300 ${isOverDark ? "brightness-0 invert" : ""}`}
            />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-12 text-[14px] lg:text-[15px] font-medium">
            {navLinks.map((link) => {
              const isProducts = link.href === "/products";
              if (isProducts) {
                return (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => setProductsOpen(true)}
                    onMouseLeave={() => setProductsOpen(false)}
                  >
                    <Link
                      href={link.href}
                      className={`transition-colors duration-300 hover:text-[#34E8BB] ${
                        isOverDark ? "text-white/80" : "text-[#1D1D1D]/60"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </div>
                );
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors duration-300 hover:text-[#34E8BB] ${
                    isOverDark ? "text-white/80" : "text-[#1D1D1D]/60"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-5">
            <button
              onClick={toggleLanguage}
              className={`flex items-center justify-center transition-colors duration-300 hover:opacity-70 ${
                isOverDark ? "text-white" : "text-[#1D1D1D]"
              }`}
              title={
                locale === "en" ? "Switch to Arabic" : "التحويل للإنجليزية"
              }
              aria-label="Toggle language"
            >
              <Languages className="w-5 h-5" />
            </button>
            <AppButton href="/contact-us">{t("bookDemo")}</AppButton>
          </div>

          {/* Mobile: lang + burger */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={toggleLanguage}
              className={`flex items-center gap-1.5 border rounded-full px-2.5 py-1 transition-colors duration-300 hover:opacity-70 ${
                isOverDark
                  ? "border-white/30 text-white"
                  : "border-[#1D1D1D]/30 text-[#1D1D1D]"
              }`}
            >
              <Languages className="w-4 h-4" />
              <span className="text-[11px] font-bold uppercase">
                {locale === "en" ? "Ar" : "En"}
              </span>
            </button>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className={`p-1 transition-colors duration-300 ${
                isOverDark ? "text-white" : "text-[#1D1D1D]"
              }`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      <div
        onMouseEnter={() => setProductsOpen(true)}
        onMouseLeave={() => setProductsOpen(false)}
      >
        <ProductMegaMenu open={productsOpen} topOffset={topBarVisible ? TOP_BAR_HEIGHT + NAV_HEIGHT : NAV_HEIGHT}/>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 md:hidden"
              style={{
                background: "rgba(0,0,0,0.25)",
                backdropFilter: "blur(4px)",
              }}
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              key="drawer"
              initial={{ x: locale === "ar" ? "-100%" : "100%" }}
              animate={{ x: 0 }}
              exit={{ x: locale === "ar" ? "-100%" : "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.35 }}
              className={`fixed top-0 ${
                locale === "ar" ? "left-0" : "right-0"
              } h-full w-[75vw] max-w-[320px] z-50 md:hidden flex flex-col`}
              style={{
                background: "rgba(245, 255, 252, 0.97)",
                backdropFilter: "blur(16px)",
                boxShadow: "-4px 0 40px rgba(0,0,0,0.1)",
              }}
            >
              <div
                className="flex items-center justify-between px-6 h-20 border-b"
                style={{ borderColor: "rgba(52,232,187,0.2)" }}
              >
                <span
                  className="font-bold text-[15px] tracking-wide"
                  style={{ color: "#1D1D1D" }}
                >
                  Menu
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  style={{ color: "#1D1D1D", opacity: 0.5 }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav
                className={`flex flex-col p-6 gap-1 ${locale === "ar" ? "text-right" : "text-left"}`}
              >
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: locale === "ar" ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i + 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className="block py-3 px-4 rounded-xl text-[16px] font-medium transition-colors"
                      style={{ color: "rgba(29,29,29,0.7)" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#34E8BB")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "rgba(29,29,29,0.7)")
                      }
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Mobile contact info */}
              <div
                className="px-6 py-4 border-t"
                style={{ borderColor: "rgba(52,232,187,0.2)" }}
              >
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#1D1D1D]/40 mb-3">
                  Contact
                </p>
                <div className="flex flex-col gap-2.5">
                  <a
                    href="tel:+971504578900"
                    className="flex items-center gap-2 text-[13px] text-[#1D1D1D]/60 hover:text-[#34E8BB] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#34E8BB]" />
                    +971 50 457 8900
                  </a>
                  <a
                    href="tel:+971509929801"
                    className="flex items-center gap-2 text-[13px] text-[#1D1D1D]/60 hover:text-[#34E8BB] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#34E8BB]" />
                    +971 50 992 9801
                  </a>
                  <a
                    href="mailto:sales@squarepack.net"
                    className="flex items-center gap-2 text-[13px] text-[#1D1D1D]/60 hover:text-[#34E8BB] transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#34E8BB]" />
                    sales@squarepack.net
                  </a>
                </div>
              </div>

              <div
                className="mt-auto p-6 border-t"
                style={{ borderColor: "rgba(52,232,187,0.2)" }}
              >
                <Link href="/contact-us" className="block">
                  <button
                    className="w-full py-3 rounded-full font-bold text-[15px] transition-colors"
                    style={{ backgroundColor: "#34E8BB", color: "#0C0C0C" }}
                  >
                    {t("bookDemo")}
                  </button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
