import { Reveal } from './Reveal';

const interests = [
  '3D 어플리케이션 개발',
  '성능 최적화 및 웹 접근성',
  '클린 코드와 테스트 주도 개발',
  '최신 기술 트렌드 학습',
];

export function About() {
  return (
    <section id="about" className="relative py-16 sm:py-20 md:py-28 px-4 sm:px-6 bg-[#08080c]">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <p className="font-mono text-xs sm:text-sm tracking-[0.3em] text-cyan-400 mb-3">
            01 / ABOUT
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-10 sm:mb-14">
            About Me
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-5 gap-8 md:gap-12">
          <Reveal className="md:col-span-3">
            <div className="space-y-5 text-gray-400">
              <p className="text-base sm:text-lg leading-relaxed">
                안녕하세요! 풀스택, 3D 개발자로서 사용자 경험과 코드 품질을 중시하며, 최신 기술을 활용해
                혁신적인 웹 애플리케이션과 3D 애플리케이션을 개발하고 있습니다.
              </p>
              <p className="text-base sm:text-lg leading-relaxed">
                <span className="text-gray-200">C++, C#, Java, Python, JavaScript, TypeScript, React</span>{' '}
                를 주로 사용하며, 반응형 디자인과 접근성을 고려한 웹 개발과{' '}
                <span className="text-gray-200">Unity, Unreal</span> 등 3D 개발에 관심이 많습니다.
              </p>
            </div>
          </Reveal>

          <Reveal className="md:col-span-2" delay={120}>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-7">
              <h3 className="text-base font-mono tracking-widest text-gray-300 mb-5">
                주요 관심사
              </h3>
              <ul className="space-y-3">
                {interests.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm sm:text-base text-gray-300">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-cyan-400/10 text-cyan-400 text-xs">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
