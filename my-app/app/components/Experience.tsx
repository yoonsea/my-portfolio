const experiences = [
  {
    year: '2022.03 - 2023.12',
    position: '프론트엔드 개발자',
    company: '○○테크',
    description: 'React와 TypeScript를 활용한 웹 애플리케이션 개발 및 유지보수를 담당했습니다.',
    achievements: [
      '주요 프로젝트의 프론트엔드 아키텍처 설계 및 구현',
      '사용자 경험 개선을 위한 UI/UX 최적화',
      '성능 최적화로 페이지 로딩 속도 40% 개선',
    ],
  },
  {
    year: '2024.01 - 현재',
    position: '시니어 프론트엔드 개발자',
    company: '○○스타트업',
    description: 'Next.js 기반의 모던 웹 애플리케이션 개발 및 팀 리더십을 담당하고 있습니다.',
    achievements: [
      '새로운 프로젝트의 기술 스택 선정 및 아키텍처 설계',
      '주니어 개발자 멘토링 및 코드 리뷰',
      'CI/CD 파이프라인 구축 및 자동화',
    ],
  },
  {
    year: '2024.01 - 현재',
    position: '시니어 프론트엔드 개발자',
    company: '○○스타트업',
    description: 'Next.js 기반의 모던 웹 애플리케이션 개발 및 팀 리더십을 담당하고 있습니다.',
    achievements: [
      '새로운 프로젝트의 기술 스택 선정 및 아키텍처 설계',
      '주니어 개발자 멘토링 및 코드 리뷰',
      'CI/CD 파이프라인 구축 및 자동화',
    ],
  },
  {
    year: '2024.01 - 현재',
    position: '시니어 프론트엔드 개발자',
    company: '○○스타트업',
    description: 'Next.js 기반의 모던 웹 애플리케이션 개발 및 팀 리더십을 담당하고 있습니다.',
    achievements: [
      '새로운 프로젝트의 기술 스택 선정 및 아키텍처 설계',
      '주니어 개발자 멘토링 및 코드 리뷰',
      'CI/CD 파이프라인 구축 및 자동화',
    ],
  },
];

export function Experience() {
  return (
    <section
      id="experience"
      className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gray-50 dark:bg-gray-900"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-8 sm:mb-12">
          Experience
        </h2>
        <div className="space-y-8 max-h-[800px] overflow-y-auto pr-2">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-1">
                    {exp.position}
                  </h3>
                  <p className="text-base sm:text-lg text-blue-600 dark:text-blue-400 font-medium">
                    {exp.company}
                  </p>
                </div>
                <span className="text-sm sm:text-base text-gray-500 dark:text-gray-400 font-medium whitespace-nowrap">
                  {exp.year}
                </span>
              </div>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4">
                {exp.description}
              </p>
              <ul className="space-y-2">
                {exp.achievements.map((achievement, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-sm sm:text-base text-gray-600 dark:text-gray-300"
                  >
                    <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

