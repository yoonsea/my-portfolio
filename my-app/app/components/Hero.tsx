export function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-20 pt-24 sm:pt-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-4 sm:mb-6 animate-fade-in">
          <div className="inline-block px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-base sm:text-lg font-medium mb-4 sm:mb-6">
            안녕하세요, 최윤석 입니다.
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 px-4 animate-slide-up">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            풀스택, 3D 개발자
          </span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 px-4 animate-slide-up-delay">
          사용자 경험을 중시하며, 아름답고 효율적인 웹, 3D 애플리케이션을 만듭니다.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 animate-fade-in-delay">
          <a
            href="#projects"
            className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-sm sm:text-base hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
          >
            프로젝트 보기
          </a>
          <a
            href="#contact"
            className="px-6 sm:px-8 py-3 sm:py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 rounded-lg font-semibold text-sm sm:text-base hover:bg-gray-50 dark:hover:bg-gray-700 active:scale-95 transition-all duration-300"
          >
            연락하기
          </a>
        </div>
      </div>
    </section>
  );
}

