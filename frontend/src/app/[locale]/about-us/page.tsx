import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";
import AboutHero from "@/components/about/AboutHero";
import AboutStats from "@/components/about/AboutStats";
import AboutTeam from "@/components/about/AboutTeam";
import AboutCTA from "@/components/about/AboutCTA";
import { getTranslations } from "next-intl/server";
import BrochureButton from "@/components/brochure/BrochureButton";
import WhatsAppButton from "@/components/whatsapp/WhatsappButton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About.metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function AboutUsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <AboutHero />
        {/* <AboutStats /> */}
        {/* <AboutTeam /> */}
        <AboutCTA />
      </main>
      <Footer />
      <BrochureButton />
      <WhatsAppButton />
    </>
  );
}
