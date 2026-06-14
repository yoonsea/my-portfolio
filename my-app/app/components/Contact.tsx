import { Reveal } from './Reveal';

const EMAIL = 'yoonseok84@gmail.com';

export function Contact() {
  return (
    <section id="contact" className="relative py-16 sm:py-20 md:py-28 px-4 sm:px-6 bg-white/[0.015]">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <p className="font-mono text-xs sm:text-sm tracking-[0.3em] text-cyan-400 mb-3 text-center">
            06 / CONTACT
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-white mb-10 sm:mb-14">
            Contact
          </h2>
        </Reveal>

        <Reveal>
          <div className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-12 overflow-hidden">
            {/* Accent glow */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-cyan-500/10 blur-[100px]" />

            <p className="relative text-center text-base sm:text-lg text-gray-400 mb-8">
              프로젝트 협업이나 문의사항이 있으시면 언제든지 연락주세요!
            </p>
            <div className="relative flex justify-center">
              <a
                href={`mailto:${EMAIL}`}
                className="group flex flex-col items-center p-7 sm:p-8 bg-white/[0.03] border border-white/10 rounded-2xl hover:border-cyan-400/40 hover:bg-white/[0.06] active:scale-95 transition-all w-full sm:min-w-[320px] max-w-sm"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400 group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div className="font-semibold text-white text-lg sm:text-xl mb-1">Email</div>
                <div className="text-sm sm:text-base text-gray-400 group-hover:text-cyan-400 break-all text-center transition-colors">
                  {EMAIL}
                </div>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
