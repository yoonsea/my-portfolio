const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'Next.js와 TypeScript를 활용한 모던한 전자상거래 플랫폼입니다.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe'],
    image: '🛒',
    link: '#',
  },
  {
    title: 'Task Management App',
    description: '실시간 협업이 가능한 프로젝트 관리 애플리케이션입니다.',
    tech: ['React', 'Node.js', 'WebSocket', 'MongoDB'],
    image: '📋',
    link: '#',
  },
  {
    title: 'Weather Dashboard',
    description: '날씨 정보를 실시간으로 보여주는 대시보드입니다.',
    tech: ['React', 'API Integration', 'Chart.js'],
    image: '🌤️',
    link: '#',
  },
  {
    title: 'Portfolio Website',
    description: '개인 포트폴리오 웹사이트입니다. (현재 사이트)',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    image: '💼',
    link: '#',
  },
];

export function Projects() {
  return (
    <section
      id="projects"
      className="py-20 px-6 bg-white dark:bg-gray-800"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Projects
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-6xl">
                {project.image}
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                >
                  프로젝트 보기 →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

