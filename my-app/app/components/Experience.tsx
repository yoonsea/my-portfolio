'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Reveal } from './Reveal';

interface Experience {
  id: string;
  year: string;
  position: string;
  company: string;
  description: string;
  achievements: string[];
}

function SectionHeader() {
  return (
    <>
      <p className="font-mono text-xs sm:text-sm tracking-[0.3em] text-cyan-400 mb-3">
        04 / EXPERIENCE
      </p>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-10 sm:mb-14">
        Experience
      </h2>
    </>
  );
}

export function Experience() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExperiences() {
      try {
        const { data, error } = await supabase
          .from('experience')
          .select('*')
          .order('order_index', { ascending: false });

        if (error) throw error;
        setExperiences(data || []);
      } catch (error) {
        console.error('Error fetching experiences:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchExperiences();
  }, []);

  return (
    <section id="experience" className="relative py-16 sm:py-20 md:py-28 px-4 sm:px-6 bg-white/[0.015]">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <SectionHeader />
        </Reveal>

        {loading ? (
          <div className="text-center text-gray-500 font-mono text-sm">로딩 중...</div>
        ) : experiences.length === 0 ? (
          <div className="text-center text-gray-500">경력 정보가 없습니다.</div>
        ) : (
          <div className="space-y-5 sm:space-y-6">
            {experiences.map((exp) => (
              <Reveal key={exp.id}>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 hover:border-white/20 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-white mb-1">
                        {exp.company}
                      </h3>
                      <p className="text-base sm:text-lg text-cyan-400 font-medium">
                        {exp.position}
                      </p>
                    </div>
                    <span className="font-mono text-sm text-gray-500 whitespace-nowrap">
                      {exp.year}
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-gray-400 mb-4">{exp.description}</p>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-sm sm:text-base text-gray-300"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
