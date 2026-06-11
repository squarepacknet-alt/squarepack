import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import AppButton from "../appButton/AppButton";

export default function AboutCTA() {
  const t = useTranslations("About.cta");

  return (
    <section className="bg-[#e4fcfa] py-24 md:py-32">
      <div className="container text-center">
        <h2 className="text-4xl md:text-5xl lg:text-[54px] font-heading font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
          {t.rich("title", {
            br: () => <br className="hidden md:block" />,
          })}
        </h2>
        <p className="text-slate-600 text-[17px] max-w-2xl mx-auto mb-10">
          {t("subtitle")}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <AppButton href="/contact-us">{t("contactUs")}</AppButton>
          <AppButton isOutlined={true} href="/products">
            {t("viewServices")}
          </AppButton>
        </div>
      </div>
    </section>
  );
}
