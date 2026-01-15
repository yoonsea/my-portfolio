export function Contact() {
  return (
    <section
      id="contact"
      className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gray-50 dark:bg-gray-900"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-8 sm:mb-12">
          Contact
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 md:p-12 shadow-lg">
          <p className="text-center text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-6 sm:mb-8">
            프로젝트 협업이나 문의사항이 있으시면 언제든지 연락주세요!
          </p>
          <div className="flex justify-center">
            <a
              href="mailto:your.email@example.com"
              className="flex flex-col items-center p-6 sm:p-8 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 active:scale-95 transition-all w-full sm:min-w-[300px] max-w-sm"
            >
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">📧</div>
              <div className="font-semibold text-gray-900 dark:text-white text-lg sm:text-xl mb-2">Email</div>
              <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400 break-all text-center">yoonsea@naver.com</div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

