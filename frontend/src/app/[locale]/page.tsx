import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/Hero";
import Certifications from "@/components/Certifications";
import BestSellingProduct from "@/components/BestSellingProduct";
import Features from "@/components/Features";
import Industries from "@/components/Industries";
import PreFooterGallery from "@/components/PreFooterGallery";
import Footer from "@/components/Footer";
import BrochureButton from "@/components/brochure/BrochureButton";
import WhatsAppButton from "@/components/whatsapp/WhatsappButton";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Certifications />
      <BestSellingProduct />
      <Features />
      <Industries />
      {/* <CaseStudies /> */}
      <PreFooterGallery />
      <Footer />
      <BrochureButton />
      <WhatsAppButton />
    </>
  );
}
