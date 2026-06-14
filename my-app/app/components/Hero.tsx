export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 py-20 pt-24 sm:pt-20 overflow-hidden bg-[#08080c]"
    >
      {/* Tech grid */}
      <div className="absolute inset-0 tech-grid grid-mask opacity-70" />

      {/* Floating gradient orbs */}
      <div className="absolute -top-24 -left-24 w-[28rem] h-[28rem] rounded-full bg-cyan-500/20 blur-[120px] animate-float-slow" />
      <div
        className="absolute -bottom-32 -right-16 w-[30rem] h-[30rem] rounded-full bg-violet-600/20 blur-[130px] animate-float-slow"
        style={{ animationDelay: '2s' }}
      />

      <div className="relative max-w-4xl mx-auto text-center">
        <div className="mb-5 sm:mb-7 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-sm sm:text-base font-mono text-gray-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            </span>
            안녕하세요, 최윤석입니다
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-5 sm:mb-6 px-4 animate-slide-up leading-[1.1]">
          <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-400 bg-clip-text text-transparent">
            풀스택 · 앱 · 3D 개발자
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 mb-8 sm:mb-10 px-4 max-w-2xl mx-auto animate-slide-up-delay leading-relaxed">
          사용자 경험을 중시하며, 아름답고 효율적인 웹, 모바일 앱, 3D 애플리케이션을 만듭니다.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 animate-fade-in-delay">
          <a
            href="#projects"
            className="px-7 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-cyan-500 to-violet-500 text-white rounded-lg font-semibold text-sm sm:text-base shadow-[0_0_25px_-4px_rgba(34,211,238,0.6)] hover:shadow-[0_0_35px_-2px_rgba(34,211,238,0.8)] hover:scale-105 active:scale-95 transition-all duration-300"
          >
            프로젝트 보기
          </a>
          <a
            href="#contact"
            className="px-7 sm:px-8 py-3.5 sm:py-4 bg-white/5 text-white border border-white/15 rounded-lg font-semibold text-sm sm:text-base hover:bg-white/10 hover:border-white/30 active:scale-95 transition-all duration-300"
          >
            연락하기
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        aria-label="아래로 스크롤"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-gray-500 hover:text-white transition-colors"
      >
        <span className="font-mono text-xs tracking-widest">SCROLL</span>
        <span className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-1.5">
          <span className="w-1 h-1.5 rounded-full bg-cyan-400 animate-pulse-soft" />
        </span>
      </a>
    </section>
  );
}
