'use client';

import { useState } from 'react';

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
  {
    title: 'Social Media App',
    description: '실시간 채팅과 피드 기능을 갖춘 소셜 미디어 애플리케이션입니다.',
    tech: ['React', 'Firebase', 'Tailwind CSS'],
    image: '💬',
    link: '#',
  },
  {
    title: 'Music Player',
    description: '현대적인 UI/UX를 가진 음악 플레이어 애플리케이션입니다.',
    tech: ['React', 'Web Audio API', 'CSS3'],
    image: '🎵',
    link: '#',
  },
  {
    title: 'Blog Platform',
    description: '마크다운 지원과 댓글 기능이 있는 블로그 플랫폼입니다.',
    tech: ['Next.js', 'MDX', 'Prisma'],
    image: '📝',
    link: '#',
  },
  {
    title: 'Analytics Dashboard',
    description: '데이터 시각화와 분석 기능을 제공하는 대시보드입니다.',
    tech: ['React', 'D3.js', 'TypeScript'],
    image: '📊',
    link: '#',
  },
];

const ITEMS_PER_PAGE = 4;

export function Projects() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProjects = projects.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="projects"
      className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white dark:bg-gray-800"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-8 sm:mb-12">
          Projects
        </h2>
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {currentProjects.map((project, index) => (
            <div
              key={index}
              className="group bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="h-40 sm:h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-5xl sm:text-6xl">
                {project.image}
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
                  {project.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-3 sm:mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 sm:px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs sm:text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  className="inline-flex items-center text-sm sm:text-base text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                >
                  프로젝트 보기 →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-1.5 sm:gap-2 flex-wrap">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 sm:px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm sm:text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-600 active:scale-95 transition-all"
            >
              이전
            </button>
            
            <div className="flex gap-1.5 sm:gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-all active:scale-95 ${
                    currentPage === page
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 sm:px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm sm:text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-600 active:scale-95 transition-all"
            >
              다음
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

