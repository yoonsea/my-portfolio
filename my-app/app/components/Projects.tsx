'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

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
    <section
      id="projects"
      className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white dark:bg-gray-800"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-8 sm:mb-12">
          Projects
        </h2>
        {loading ? (
          <div className="text-center text-gray-600 dark:text-gray-400">로딩 중...</div>
        ) : projects.length === 0 ? (
          <div className="text-center text-gray-600 dark:text-gray-400">
            프로젝트가 없습니다.
          </div>
        ) : (
          <>
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
              {currentProjects.map((project) => {
                const imageUrls = parseImageUrls(project.image_url);
                const currentImageIndex = imageIndexes[project.id] ?? 0;
                const currentImageUrl = imageUrls[currentImageIndex];

                return (
            <div
                  key={project.id}
              className="group bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              onClick={() => {
                if (imageUrls.length === 0) return;
                openPopup(project.id, currentImageIndex);
              }}
            >
              <div className="relative h-40 sm:h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-5xl sm:text-6xl overflow-hidden">
                    {currentImageUrl ? (
                      <img
                        src={currentImageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover"
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
                          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 text-white w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
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
                          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 text-white w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
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
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2 sm:mb-3">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  {project.title}
                </h3>
                  {project.period && (
                    <span className="text-sm sm:text-base text-gray-500 dark:text-gray-400 font-medium whitespace-nowrap">
                      {project.period}
                    </span>
                  )}
                </div>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-3 sm:mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 sm:px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs sm:text-sm"
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
              className="px-3 sm:px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm sm:text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-600 active:scale-95 transition-all"
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
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
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
              className="px-3 sm:px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm sm:text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-600 active:scale-95 transition-all"
            >
              다음
            </button>
          </div>
          )}
        {popupProjectId && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            onClick={closePopup}
          >
            <div
              className="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                aria-label="팝업 닫기"
                onClick={closePopup}
                className="absolute right-3 top-3 z-10 rounded-full bg-black/60 text-white w-9 h-9 flex items-center justify-center"
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
                    <div className="p-6 text-center text-gray-600 dark:text-gray-300">
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
                          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 text-white w-10 h-10 flex items-center justify-center"
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
                          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 text-white w-10 h-10 flex items-center justify-center"
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

