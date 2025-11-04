export function Contact() {
  return (
    <section
      id="contact"
      className="py-20 px-6 bg-gray-50 dark:bg-gray-900"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Contact
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12 shadow-lg">
          <p className="text-center text-lg text-gray-600 dark:text-gray-300 mb-8">
            프로젝트 협업이나 문의사항이 있으시면 언제든지 연락주세요!
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <a
              href="mailto:your.email@example.com"
              className="flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <div className="text-3xl mb-2">📧</div>
              <div className="font-semibold text-gray-900 dark:text-white">Email</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">your.email@example.com</div>
            </a>
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <div className="text-3xl mb-2">💻</div>
              <div className="font-semibold text-gray-900 dark:text-white">GitHub</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">github.com/yourusername</div>
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <div className="text-3xl mb-2">💼</div>
              <div className="font-semibold text-gray-900 dark:text-white">LinkedIn</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">linkedin.com/in/yourusername</div>
            </a>
          </div>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                이름
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="이름을 입력하세요"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                이메일
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="이메일을 입력하세요"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                메시지
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="메시지를 입력하세요"
              />
            </div>
            <button
              type="submit"
              className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              메시지 보내기
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

