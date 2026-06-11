import { Printer, Scissors, Droplets, Layers } from "lucide-react";

export default function Capabilities() {
  const features = [
    {
      icon: <Printer className="w-7 h-7" />,
      title: "Advanced Flexographic Printing",
      desc: "High-definition 10-color printing presses capable of intricate designs, rapid changeovers, and perfect color consistency across massive runs."
    },
    {
      icon: <Layers className="w-7 h-7" />,
      title: "Multi-Layer Extrusion",
      desc: "Custom engineered film structures providing exceptional barrier properties against oxygen, moisture, and UV light to maximize shelf life."
    },
    {
      icon: <Droplets className="w-7 h-7" />,
      title: "Premium Coatings & Finishes",
      desc: "Differentiate your brand with tactile soft-touch matte varnishes, spot gloss UV, metallic foils, and striking holographic elements."
    },
    {
      icon: <Scissors className="w-7 h-7" />,
      title: "Precision Die-Cutting",
      desc: "Custom automated pouch shaping, laser scoring for easy-tear mechanisms, and integrated handles for maximum consumer convenience."
    }
  ];

  return (
    <section className="bg-[#f0f6f6] py-24 md:py-32">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <div className="inline-block px-4 py-2 bg-[#28b098]/10 rounded-full mb-6">
            <span className="text-[#28b098] font-bold text-sm tracking-wide uppercase">Core Capabilities</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-slate-900 mb-6 leading-tight">
            State-of-the-art Technology.<br />
            Limitless Possibilities.
          </h2>
          <p className="text-slate-500 text-lg">
            Our manufacturing facilities are equipped with industry-leading machinery designed for efficiency, precision, and extraordinary visual output.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feat, i) => (
            <div key={i} className="bg-white p-8 md:p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-[#e6f4f2] text-[#28b098] flex items-center justify-center mb-6 group-hover:bg-[#28b098] group-hover:text-white transition-colors duration-300">
                {feat.icon}
              </div>
              <h3 className="text-2xl font-bold font-heading text-slate-900 mb-4">{feat.title}</h3>
              <p className="text-slate-500 leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
