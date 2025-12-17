'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Experience {
  id: string;
  year: string;
  position: string;
  company: string;
  description: string;
  achievements: string[];
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

  if (loading) {
    return (
      <section
        id="experience"
        className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gray-50 dark:bg-gray-900"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-8 sm:mb-12">
            Experience
          </h2>
          <div className="text-center text-gray-600 dark:text-gray-400">로딩 중...</div>
        </div>
      </section>
    );
  }
  return (
    <section
      id="experience"
      className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gray-50 dark:bg-gray-900"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-8 sm:mb-12">
          Experience
        </h2>
        <div className="space-y-8 max-h-[800px] overflow-y-scroll pr-2">
          {experiences.length === 0 ? (
            <div className="text-center text-gray-600 dark:text-gray-400">
              경력 정보가 없습니다.
            </div>
          ) : (
            experiences.map((exp) => (
              <div
                key={exp.id}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow"
              >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-1">
                    {exp.company}
                  </h3>
                  <p className="text-base sm:text-lg text-blue-600 dark:text-blue-400 font-medium">
                    {exp.position}
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
            ))
          )}
        </div>
      </div>
    </section>
  );
}

