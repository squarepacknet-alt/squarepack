import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#fcfdfd] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-heading font-bold text-slate-900 mb-4">
            Blog
          </h1>
          <p className="text-slate-500 text-lg">Coming soon.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
