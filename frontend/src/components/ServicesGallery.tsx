export default function ServicesGallery() {
  return (
    <section className="bg-[#e6fcf6] bg-opacity-40 py-20 md:py-28 px-4">
      <div className="container">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-4">
            Our Services
          </h2>
          <p className="text-slate-500 text-lg font-sans">
            Only the best 1% of applicants make it onto our platform
          </p>
        </div>

        {/* 8-Grid Setup for Images */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square bg-slate-200 rounded-3xl w-full"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
