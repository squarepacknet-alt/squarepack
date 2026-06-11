import { useTranslations } from "next-intl";

export default function AboutTeam() {
  const t = useTranslations('About.team');
  
  const placeholders = ['bg-slate-300', 'bg-slate-200', 'bg-slate-300', 'bg-slate-200'];

  const members = t.raw('members') as Array<{name: string, role: string, desc: string}>;

  return (
    <section className="bg-white py-20 md:py-32">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-slate-900 mb-4 tracking-tight">
            {t('title')}
          </h2>
          <p className="text-slate-500 text-lg">
            {t('subtitle')}
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {members.map((member, i) => (
            <div
              key={i}
              className="bg-white rounded-[20px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_15px_40px_rgb(0,0,0,0.1)] transition-all duration-300 flex flex-col group border border-slate-100/50"
            >
              {/* Image Placeholder */}
              <div
                className={`w-full h-[280px] ${placeholders[i % placeholders.length]} relative overflow-hidden`}
              >
                {/* Simulated photo overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
              </div>

              {/* Card Body */}
              <div className="p-6 md:p-8 flex flex-col flex-grow text-left rtl:text-right">
                <h3 className="text-xl font-heading font-bold text-slate-900 mb-1">
                  {member.name}
                </h3>
                <span className="text-[#28b098] font-semibold text-sm mb-4 block">
                  {member.role}
                </span>
                <p className="text-slate-500 text-[13.5px] leading-relaxed mb-6 flex-grow">
                  {member.desc}
                </p>

                {/* Socials */}
                <div className="flex items-center gap-2">
                  <a
                    href="#"
                    className="w-8 h-8 rounded-md bg-[#f0fbfb] flex items-center justify-center text-[#28b098] hover:bg-[#28b098] hover:text-white transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 rounded-md bg-[#f0fbfb] flex items-center justify-center text-[#28b098] hover:bg-[#28b098] hover:text-white transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
