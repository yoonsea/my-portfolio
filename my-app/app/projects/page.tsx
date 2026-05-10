'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
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

const parseImageUrls = (value: string | null): string[] => {
  if (!value) return [];
  const trimmed = value.trim();
  if (!trimmed) return [];
  if (trimmed.startsWith('[')) {
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) return parsed.filter((u) => typeof u === 'string' && u.trim());
    } catch {}
  }
  if (trimmed.includes(',')) return trimmed.split(',').map((u) => u.trim()).filter(Boolean);
  return [trimmed];
};

export default function ProjectsGallery() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<{ project: Project; imageIndex: number } | null>(null);
  const [imageIndexes, setImageIndexes] = useState<Record<string, number>>({});

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('order_index', { ascending: false });
        if (error) throw error;
        const sorted = (data || []).slice().sort((a, b) => {
          const aHas = parseImageUrls(a.image_url).length > 0;
          const bHas = parseImageUrls(b.image_url).length > 0;
          if (aHas === bHas) return 0;
          return aHas ? -1 : 1;
        });
        setProjects(sorted);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const openLightbox = (project: Project, imageIndex: number) => {
    setSelected({ project, imageIndex });
  };

  const closeLightbox = useCallback(() => setSelected(null), []);

  const lightboxPrev = useCallback(() => {
    if (!selected) return;
    const imgs = parseImageUrls(selected.project.image_url);
    setSelected((s) => s && { ...s, imageIndex: (s.imageIndex - 1 + imgs.length) % imgs.length });
  }, [selected]);

  const lightboxNext = useCallback(() => {
    if (!selected) return;
    const imgs = parseImageUrls(selected.project.image_url);
    setSelected((s) => s && { ...s, imageIndex: (s.imageIndex + 1) % imgs.length });
  }, [selected]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!selected) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') lightboxPrev();
      if (e.key === 'ArrowRight') lightboxNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [selected, closeLightbox, lightboxPrev, lightboxNext]);

  const updateCardImage = (projectId: string, index: number) => {
    setImageIndexes((prev) => ({ ...prev, [projectId]: index }));
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Top nav */}
      <nav className="sticky top-0 z-40 bg-gray-950/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z" clipRule="evenodd" />
            </svg>
            Portfolio
          </Link>
          <span className="text-white/20">/</span>
          <span className="text-white font-semibold">Projects</span>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <h1 className="text-4xl sm:text-5xl font-bold mb-2 text-white">Projects</h1>
        <p className="text-gray-400 mb-10 sm:mb-14 text-base sm:text-lg">
          {loading ? '' : `${projects.length}개의 프로젝트`}
        </p>

        {loading ? (
          <div className="grid sm:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-white/5 animate-pulse" style={{ height: 480 }} />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <p className="text-gray-500 text-center py-20">프로젝트가 없습니다.</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-6">
            {projects.map((project) => {
              const imgs = parseImageUrls(project.image_url);
              const cardIdx = imageIndexes[project.id] ?? 0;
              const currentImg = imgs[cardIdx];

              return (
                <article
                  key={project.id}
                  className="group relative rounded-2xl overflow-hidden cursor-pointer h-80 sm:h-96 md:h-112 border border-white/10 hover:border-white/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/60"
                  onClick={() => imgs.length > 0 && openLightbox(project, cardIdx)}
                >
                  {/* Full-bleed image */}
                  {currentImg ? (
                    <img
                      src={currentImg}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-7xl bg-linear-to-br from-blue-600/40 to-purple-600/40">
                      {project.image || '💼'}
                    </div>
                  )}

                  {/* Image count badge */}
                  {imgs.length > 1 && (
                    <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full z-10">
                      {cardIdx + 1} / {imgs.length}
                    </span>
                  )}

                  {/* Arrow controls */}
                  {imgs.length > 1 && (
                    <>
                      <button
                        type="button"
                        aria-label="이전 이미지"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateCardImage(project.id, (cardIdx - 1 + imgs.length) % imgs.length);
                        }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80 z-10 text-lg"
                      >
                        ‹
                      </button>
                      <button
                        type="button"
                        aria-label="다음 이미지"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateCardImage(project.id, (cardIdx + 1) % imgs.length);
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80 z-10 text-lg"
                      >
                        ›
                      </button>
                    </>
                  )}

                  {/* Bottom gradient overlay with info */}
                  <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/90 via-black/50 to-transparent p-5 pt-16 z-10">
                    {/* Dot indicators */}
                    {imgs.length > 1 && (
                      <div className="flex gap-1.5 mb-3">
                        {imgs.map((_, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={(e) => { e.stopPropagation(); updateCardImage(project.id, i); }}
                            className={`rounded-full transition-all ${i === cardIdx ? 'w-4 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'}`}
                          />
                        ))}
                      </div>
                    )}

                    <div className="flex items-end justify-between gap-2 mb-1.5">
                      <h2 className="text-base font-bold text-white leading-snug">{project.title}</h2>
                      {project.period && (
                        <span className="text-xs text-white/60 whitespace-nowrap shrink-0">{project.period}</span>
                      )}
                    </div>

                    <p className="text-xs text-white/70 leading-relaxed line-clamp-2 mb-3">{project.description}</p>

                    <div className="flex items-center justify-between gap-2">
                      <div className="flex flex-wrap gap-1">
                        {project.tech.slice(0, 4).map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded-full text-xs bg-white/15 text-white/80 border border-white/10">
                            {t}
                          </span>
                        ))}
                        {project.tech.length > 4 && (
                          <span className="px-2 py-0.5 rounded-full text-xs bg-white/10 text-white/60">+{project.tech.length - 4}</span>
                        )}
                      </div>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="shrink-0 w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 flex items-center justify-center transition-colors"
                          aria-label="링크 보기"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-white">
                            <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" />
                            <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 0 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>

      {/* Lightbox */}
      {selected && (() => {
        const imgs = parseImageUrls(selected.project.image_url);
        const img = imgs[selected.imageIndex];
        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={closeLightbox}
          >
            <div
              className="relative flex flex-col items-center w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                type="button"
                aria-label="닫기"
                onClick={closeLightbox}
                className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                </svg>
              </button>

              {/* Image */}
              <div className="relative w-full rounded-xl overflow-hidden bg-black">
                {img && (
                  <img
                    src={img}
                    alt={selected.project.title}
                    className="w-full max-h-[75vh] object-contain"
                  />
                )}

                {imgs.length > 1 && (
                  <>
                    <button
                      type="button"
                      aria-label="이전 이미지"
                      onClick={lightboxPrev}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white text-2xl transition-colors"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      aria-label="다음 이미지"
                      onClick={lightboxNext}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white text-2xl transition-colors"
                    >
                      ›
                    </button>
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                      {imgs.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setSelected((s) => s && { ...s, imageIndex: i })}
                          className={`rounded-full transition-all ${i === selected.imageIndex ? 'w-5 h-2 bg-white' : 'w-2 h-2 bg-white/40 hover:bg-white/70'}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Project info below lightbox */}
              <div className="mt-4 w-full px-1 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-white">{selected.project.title}</h3>
                  {selected.project.period && (
                    <p className="text-sm text-gray-500 mt-0.5">{selected.project.period}</p>
                  )}
                </div>
                {imgs.length > 1 && (
                  <span className="text-sm text-gray-500 whitespace-nowrap mt-1">
                    {selected.imageIndex + 1} / {imgs.length}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
