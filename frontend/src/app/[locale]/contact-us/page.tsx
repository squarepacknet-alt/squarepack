import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { Mail, Phone, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import BrochureButton from "@/components/brochure/BrochureButton";
import WhatsAppButton from "@/components/whatsapp/WhatsappButton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact.metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function ContactUsPage() {
  const t = useTranslations("Contact");
  const infoT = useTranslations("Contact.info");
  const formT = useTranslations("Contact.form");

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="relative pt-28 pb-12 md:pt-36 md:pb-16 overflow-hidden">
          {/* Subtle cyan glow centered behind text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[#3fe6c2]/20 blur-[100px] rounded-[100%] pointer-events-none" />

          <div className="container relative z-10 text-center text-slate-900">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-heading font-extrabold mb-5 tracking-tight">
              {t("hero.title")}
            </h1>
            <p className="text-slate-800 font-medium text-[15px] md:text-[16px] max-w-xl mx-auto leading-relaxed">
              {t("hero.subtitle")}
            </p>
          </div>
        </div>

        {/* Content Section (Split layout) */}
        <div className="container pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 lg:gap-24 items-start">
            {/* Left Side: Contact Info */}
            <div className="flex flex-col space-y-8 lg:pr-6 text-left rtl:text-right">
              <div>
                <h2 className="text-3xl lg:text-4xl font-heading font-bold text-slate-900 mb-5">
                  {infoT("title")}
                </h2>
                <p className="text-slate-500 leading-relaxed text-[15.5px]">
                  {infoT("subtitle")}
                </p>
              </div>

              <div className="flex flex-col space-y-8 pt-4">
                {/* Email Card */}
                <a href={`mailto:${infoT("email.value1")}`} className="bg-[#34E8BB] hover:bg-[#35d1b1] transition-transform hover:-translate-y-1 duration-300 p-5 rounded-[1.25rem] flex items-center gap-4 cursor-pointer shadow-sm">
                  <div className="w-[50px] h-[50px] bg-[#313131] rounded-xl flex items-center justify-center shrink-0 shadow-inner">
                    <Mail className="w-5 h-5 text-[#FFFFFF]" />
                  </div>
                  <div className="text-left rtl:text-right">
                    <h4 className="text-slate-900 font-bold text-[15px] mb-0.5 tracking-tight">
                      {infoT("email.label")}
                    </h4>
                    <p className="text-slate-900 text-[13px] opacity-75 font-medium tracking-wide">
                      {infoT("email.value1")}
                    </p>
                    <p className="text-slate-900 text-[13px] opacity-75 font-medium tracking-wide">
                      {infoT("email.value2")}
                    </p>
                  </div>
                </a>

                {/* Call Card */}
                <div className="bg-[#34E8BB] hover:bg-[#35d1b1] transition-transform hover:-translate-y-1 duration-300 p-5 rounded-[1.25rem] flex items-center gap-4 shadow-sm">
                  <div className="w-[50px] h-[50px] bg-[#313131] rounded-xl flex items-center justify-center shrink-0 shadow-inner">
                    <Phone className="w-5 h-5 text-[#FFFFFF]" />
                  </div>
                  <div className="text-left rtl:text-right">
                    <h4 className="text-slate-900 font-bold text-[15px] mb-0.5 tracking-tight">
                      {infoT("call.label")}
                    </h4>
                    <div className="text-slate-900 text-[13px] opacity-75 font-medium tracking-wide flex flex-col space-y-0.5">
                      <a href="tel:+971504578900" className="hover:underline">
                        {infoT("call.value1")}
                      </a>
                      <a href="tel:+971509929801" className="hover:underline">
                        {infoT("call.value2")}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Visit Card */}
                <div className="bg-[#34E8BB] hover:bg-[#35d1b1] transition-transform hover:-translate-y-1 duration-300 p-5 rounded-[1.25rem] flex items-center gap-4 cursor-pointer shadow-sm">
                  <div className="w-[50px] h-[50px] bg-[#313131] rounded-xl flex items-center justify-center shrink-0 shadow-inner">
                    <MapPin className="w-5 h-5 text-[#FFFFFF]" />
                  </div>
                  <div className="text-left rtl:text-right">
                    <h4 className="text-slate-900 font-bold text-[15px] mb-0.5 tracking-tight">
                      {infoT("visit.label")}
                    </h4>
                    <p className="text-slate-900 text-[13px] opacity-75 font-medium tracking-wide">
                      {infoT("visit.value")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Form Card */}
            <div className="bg-[#fcfdfd] border border-slate-200 rounded-[2rem] p-8 md:p-10 shadow-[0_8px_40px_rgb(0,0,0,0.04)]">
              <h2 className="text-2xl lg:text-[28px] font-heading font-bold text-slate-900 mb-8 tracking-tight text-left rtl:text-right">
                {formT("title")}
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <BrochureButton />
      <WhatsAppButton />
    </>
  );
}
