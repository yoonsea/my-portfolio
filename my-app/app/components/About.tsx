export function About() {
  return (
    <section
      id="about"
      className="py-20 px-6 bg-white dark:bg-gray-800"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-12">
          About Me
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-gray-700 dark:text-gray-300">
            <p className="text-lg leading-relaxed">
              안녕하세요! 프론트엔드 개발자로서 사용자 경험과 코드 품질을 중시하며,
              최신 기술을 활용해 혁신적인 웹 애플리케이션을 개발하고 있습니다.
            </p>
            <p className="text-lg leading-relaxed">
              React, Next.js, TypeScript를 주로 사용하며, 반응형 디자인과 접근성을
              고려한 웹 개발에 관심이 많습니다.
            </p>
            <div className="pt-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                주요 관심사
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-blue-600 dark:text-blue-400">✓</span>
                  사용자 중심의 UI/UX 디자인
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600 dark:text-blue-400">✓</span>
                  성능 최적화 및 웹 접근성
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600 dark:text-blue-400">✓</span>
                  클린 코드와 테스트 주도 개발
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600 dark:text-blue-400">✓</span>
                  최신 기술 트렌드 학습
                </li>
              </ul>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500 p-1">
              <div className="w-full h-full rounded-2xl bg-white dark:bg-gray-900 flex items-center justify-center">
                <div className="text-6xl">👨‍💻</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

