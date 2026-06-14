'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Reveal } from './Reveal';

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  image: string | null;
  image_url: string | null;
  link: string | null;
  period: string | null;
}

const ITEMS_PER_PAGE = 4;

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [imageIndexes, setImageIndexes] = useState<Record<string, number>>({});
  const [popupProjectId, setPopupProjectId] = useState<string | null>(null);
  const [popupImageIndex, setPopupImageIndex] = useState(0);

  const parseImageUrls = (value: string | null): string[] => {
    if (!value) return [];
    const trimmed = value.trim();

    if (!trimmed) return [];

    if (trimmed.startsWith('[')) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) {
          return parsed.filter((url) => typeof url === 'string' && url.trim());
        }
      } catch {
        // fall through to other parsing strategies
      }
    }

    if (trimmed.includes(',')) {
      return trimmed
        .split(',')
        .map((url) => url.trim())
        .filter(Boolean);
    }

    return [trimmed];
  };

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('order_index', { ascending: false });

        if (error) throw error;
        const sorted = (data || []).slice().sort((a, b) => {
          const aHasImage = parseImageUrls(a.image_url).length > 0;
          const bHasImage = parseImageUrls(b.image_url).length > 0;

          if (aHasImage === bHasImage) return 0;
          return aHasImage ? -1 : 1;
        });

        setProjects(sorted);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProjects = projects.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    // 스크롤을 약간 지연시켜 상태 업데이트 후 실행
    setTimeout(() => {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const updateImageIndex = (projectId: string, nextIndex: number) => {
    setImageIndexes((prev) => ({
      ...prev,
      [projectId]: nextIndex,
    }));
  };

  const openPopup = (projectId: string, startIndex: number) => {
    setPopupProjectId(projectId);
    setPopupImageIndex(startIndex);
  };

  const closePopup = () => {
    setPopupProjectId(null);
    setPopupImageIndex(0);
  };

  return (
    <section id="projects" className="relative py-16 sm:py-20 md:py-28 px-4 sm:px-6 bg-[#08080c]">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="font-mono text-xs sm:text-sm tracking-[0.3em] text-cyan-400 mb-3">
            05 / PROJECTS
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">Projects</h2>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              갤러리로 보기
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </Reveal>

        {loading ? (
          <div className="text-center text-gray-500 font-mono text-sm">로딩 중...</div>
        ) : projects.length === 0 ? (
          <div className="text-center text-gray-500">프로젝트가 없습니다.</div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-10 sm:mb-12">
              {currentProjects.map((project) => {
                const imageUrls = parseImageUrls(project.image_url);
                const currentImageIndex = imageIndexes[project.id] ?? 0;
                const currentImageUrl = imageUrls[currentImageIndex];

                return (
                  <div
                    key={project.id}
                    className="group rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] hover:border-white/25 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/60 transition-all duration-300 cursor-pointer"
                    onClick={() => {
                      if (imageUrls.length === 0) return;
                      openPopup(project.id, currentImageIndex);
                    }}
                  >
                    <div className="relative h-44 sm:h-52 bg-gradient-to-br from-cyan-500/25 to-violet-600/25 flex items-center justify-center text-5xl sm:text-6xl overflow-hidden">
                      {currentImageUrl ? (
                        <img
                          src={currentImageUrl}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        project.image || '💼'
                      )}
                      {imageUrls.length > 1 && (
                        <>
                          <button
                            type="button"
                            aria-label="이전 이미지"
                            onClick={(event) => {
                              event.stopPropagation();
                              const prevIndex =
                                (currentImageIndex - 1 + imageUrls.length) % imageUrls.length;
                              updateImageIndex(project.id, prevIndex);
                            }}
                            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 text-white w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                          >
                            ‹
                          </button>
                          <button
                            type="button"
                            aria-label="다음 이미지"
                            onClick={(event) => {
                              event.stopPropagation();
                              const nextIndex = (currentImageIndex + 1) % imageUrls.length;
                              updateImageIndex(project.id, nextIndex);
                            }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 text-white w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                          >
                            ›
                          </button>
                          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
                            {imageUrls.map((_, index) => (
                              <button
                                key={`${project.id}-dot-${index}`}
                                type="button"
                                aria-label={`이미지 ${index + 1}번으로 이동`}
                                onClick={(event) => {
                                  event.stopPropagation();
                                  updateImageIndex(project.id, index);
                                }}
                                className={`h-1.5 w-1.5 rounded-full transition-all ${
                                  index === currentImageIndex
                                    ? 'bg-white'
                                    : 'bg-white/50 hover:bg-white/80'
                                }`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                    <div className="p-5 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2 sm:mb-3">
                        <h3 className="text-xl sm:text-2xl font-bold text-white">
                          {project.title}
                        </h3>
                        {project.period && (
                          <span className="font-mono text-sm text-gray-500 whitespace-nowrap">
                            {project.period}
                          </span>
                        )}
                      </div>
                      <p className="text-sm sm:text-base text-gray-400 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 sm:px-3 py-1 bg-white/5 border border-white/10 text-gray-300 rounded-full text-xs sm:text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-1.5 sm:gap-2 flex-wrap relative z-10">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    goToPage(currentPage - 1);
                  }}
                  disabled={currentPage === 1}
                  className="px-3 sm:px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 text-sm sm:text-base font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/10 active:scale-95 transition-all"
                >
                  이전
                </button>

                <div className="flex gap-1.5 sm:gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        goToPage(page);
                      }}
                      className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-all active:scale-95 cursor-pointer ${
                        currentPage === page
                          ? 'bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow-[0_0_18px_-4px_rgba(34,211,238,0.7)]'
                          : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    goToPage(currentPage + 1);
                  }}
                  disabled={currentPage === totalPages}
                  className="px-3 sm:px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 text-sm sm:text-base font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/10 active:scale-95 transition-all"
                >
                  다음
                </button>
              </div>
            )}

            {popupProjectId && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                onClick={closePopup}
              >
                <div
                  className="relative w-full max-w-4xl bg-[#0d0d13] border border-white/10 rounded-xl overflow-hidden shadow-2xl"
                  onClick={(event) => event.stopPropagation()}
                >
                  <button
                    type="button"
                    aria-label="팝업 닫기"
                    onClick={closePopup}
                    className="absolute right-3 top-3 z-10 rounded-full bg-black/60 hover:bg-black/80 text-white w-9 h-9 flex items-center justify-center transition-colors"
                  >
                    ×
                  </button>
                  {(() => {
                    const popupProject = projects.find(
                      (project) => project.id === popupProjectId,
                    );
                    const popupImages = popupProject
                      ? parseImageUrls(popupProject.image_url)
                      : [];
                    const popupImage = popupImages[popupImageIndex];

                    if (!popupProject || popupImages.length === 0 || !popupImage) {
                      return (
                        <div className="p-6 text-center text-gray-400">
                          표시할 이미지가 없습니다.
                        </div>
                      );
                    }

                    return (
                      <div className="relative bg-black">
                        <img
                          src={popupImage}
                          alt={popupProject.title}
                          className="w-full max-h-[80vh] object-contain"
                        />
                        {popupImages.length > 1 && (
                          <>
                            <button
                              type="button"
                              aria-label="이전 이미지"
                              onClick={() =>
                                setPopupImageIndex(
                                  (popupImageIndex - 1 + popupImages.length) %
                                    popupImages.length,
                                )
                              }
                              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 hover:bg-black/80 text-white w-10 h-10 flex items-center justify-center transition-colors"
                            >
                              ‹
                            </button>
                            <button
                              type="button"
                              aria-label="다음 이미지"
                              onClick={() =>
                                setPopupImageIndex(
                                  (popupImageIndex + 1) % popupImages.length,
                                )
                              }
                              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 hover:bg-black/80 text-white w-10 h-10 flex items-center justify-center transition-colors"
                            >
                              ›
                            </button>
                            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                              {popupImages.map((_, index) => (
                                <button
                                  key={`${popupProject.id}-popup-dot-${index}`}
                                  type="button"
                                  aria-label={`팝업 이미지 ${index + 1}번으로 이동`}
                                  onClick={() => setPopupImageIndex(index)}
                                  className={`h-2 w-2 rounded-full transition-all ${
                                    index === popupImageIndex
                                      ? 'bg-white'
                                      : 'bg-white/50 hover:bg-white/80'
                                  }`}
                                />
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })()}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
