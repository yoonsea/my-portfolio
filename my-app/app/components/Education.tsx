import { Reveal } from './Reveal';

const education = [
  {
    year: '2002 - 2010',
    degree: '게임공학과 학사',
    school: '한국산업기술대학교 (현 한국공학대학교)',
    description: '게임 개발 및 게임 기술에 대한 기초를 배웠습니다.',
  },
];

export function Education() {
  return (
    <section id="education" className="relative py-16 sm:py-20 md:py-28 px-4 sm:px-6 bg-[#08080c]">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <p className="font-mono text-xs sm:text-sm tracking-[0.3em] text-cyan-400 mb-3">
            03 / EDUCATION
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-10 sm:mb-14">
            Education
          </h2>
        </Reveal>

        <div className="space-y-8">
          {education.map((item, index) => (
            <Reveal key={index}>
              <div className="relative pl-8 sm:pl-10 pb-2 border-l border-white/10 last:border-0">
                <span className="absolute -left-[7px] top-1 h-3.5 w-3.5 rounded-full bg-cyan-400 shadow-[0_0_12px_2px_rgba(34,211,238,0.6)]" />
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white">{item.degree}</h3>
                    <p className="text-base sm:text-lg text-cyan-400 font-medium">{item.school}</p>
                  </div>
                  <span className="font-mono text-sm text-gray-500 whitespace-nowrap">
                    {item.year}
                  </span>
                </div>
                <p className="text-sm sm:text-base text-gray-400 mt-2">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
