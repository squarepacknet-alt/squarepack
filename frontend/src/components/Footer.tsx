import { Package, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="bg-[#f0f6f6] border-t-2 border-[#d5ebe8]">
      <div className="container pt-16 pb-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr] gap-12 lg:gap-8 pb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/logo.png"
                alt="SquarePack Logo"
                width={50}
                height={50}
                className="h-12 w-auto"
              />
              <Image
                src="/logo_text.png"
                alt="SquarePack Text"
                width={150}
                height={40}
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-slate-500 text-[15.5px] max-w-[300px] leading-relaxed pt-2">
              {t('brandDescription')}
            </p>
          </div>

          {/* Navigation Column */}
          <div className="lg:pl-8">
            <h4 className="font-bold text-[17px] text-slate-800 mb-6 font-heading uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-3.5">
              <li>
                <Link href="/" className="text-[15px] font-medium text-slate-500 hover:text-[#28b098] transition-colors">{t('home')}</Link>
              </li>
              <li>
                <Link href="/about-us" className="text-[15px] font-medium text-slate-500 hover:text-[#28b098] transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/products" className="text-[15px] font-medium text-slate-500 hover:text-[#28b098] transition-colors">Products</Link>
              </li>
              <li>
                <Link href="/contact-us" className="text-[15px] font-medium text-slate-500 hover:text-[#28b098] transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="font-bold text-[17px] text-slate-800 mb-6 font-heading uppercase tracking-wider">
              Legal
            </h4>
            <ul className="space-y-3.5">
              <li>
                <Link href="#" className="text-[15px] font-medium text-slate-500 hover:text-[#28b098] transition-colors">{t('privacyPolicy')}</Link>
              </li>
              <li>
                <Link href="#" className="text-[15px] font-medium text-slate-500 hover:text-[#28b098] transition-colors">{t('termsConditions')}</Link>
              </li>
            
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-[17px] text-slate-800 mb-6 font-heading uppercase tracking-wider">
              {t('contact')}
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-[18px] h-[18px] text-[#28b098] mt-0.5" strokeWidth={2} />
                <div className="text-[14.5px] font-medium text-slate-600 space-y-1">
                  <div>{t('contactInfo.email1')}</div>
                  <div>{t('contactInfo.email2')}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-[18px] h-[18px] text-[#28b098] mt-0.5" strokeWidth={2} />
                <div className="text-[14.5px] font-medium text-slate-600 space-y-1">
                  <div>
                    <a href="tel:+971504578900" className="hover:text-[#28b098] transition-colors">
                      {t('contactInfo.phone1')}
                    </a>
                  </div>
                  <div>
                    <a href="tel:+971509929801" className="hover:text-[#28b098] transition-colors">
                      {t('contactInfo.phone2')}
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-[18px] h-[18px] text-[#28b098] mt-0.5" strokeWidth={2} />
                <span className="text-[14.5px] font-medium text-slate-600">{t('contactInfo.address')}</span>
              </div>
            </div>

            {/* Social Icons row */}
            <div className="flex items-center gap-3 mt-8">
              {[
                { icon: <FacebookIcon className="w-4 h-4" />, href: "#" },
                { icon: <TwitterIcon className="w-[15px] h-[15px]" />, href: "#" },
                { icon: <LinkedinIcon className="w-[15px] h-[15px]" />, href: "#" },
                { icon: <InstagramIcon className="w-4 h-4" />, href: "#" },
              ].map((social, i) => (
                <Link
                  key={i}
                  href={social.href}
                  className="w-9 h-9 rounded-lg bg-white shadow-sm border border-slate-200 hover:border-[#28b098] hover:text-[#28b098] flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1 text-slate-500"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom copyright & legal bar */}
        <div className="pt-6 border-t border-slate-400/50 flex flex-col sm:flex-row justify-between items-center gap-4 text-[13px] text-slate-500 font-semibold font-sans text-center sm:text-left">
          <p className="tracking-wide">
            {t('rightsReserved')}
          </p>
          <div className="flex items-center gap-7 underline decoration-slate-400 decoration-1 underline-offset-4 opacity-90 hover:opacity-100 transition-opacity">
            <Link href="#">{t('privacyPolicy')}</Link>
            <Link href="#">{t('termsConditions')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
