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
    <section
      id="education"
      className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white dark:bg-gray-800"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-8 sm:mb-12">
          Education
        </h2>
        <div className="space-y-8">
          {education.map((item, index) => (
            <div
              key={index}
              className="relative pl-8 sm:pl-12 pb-8 border-l-2 border-gray-200 dark:border-gray-700 last:border-0 last:pb-0"
            >
              <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-blue-600 dark:bg-blue-400 border-4 border-white dark:border-gray-800" />
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                    {item.degree}
                  </h3>
                  <p className="text-base sm:text-lg text-blue-600 dark:text-blue-400 font-medium">
                    {item.school}
                  </p>
                </div>
                <span className="text-sm sm:text-base text-gray-500 dark:text-gray-400 font-medium whitespace-nowrap">
                  {item.year}
                </span>
              </div>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-2">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

