import { Reveal } from './Reveal';

type Tier = '주력' | '능숙' | '경험';

const tierStyles: Record<Tier, string> = {
  주력: 'border-cyan-400/40 bg-cyan-400/10 text-cyan-200',
  능숙: 'border-violet-400/40 bg-violet-400/10 text-violet-200',
  경험: 'border-white/15 bg-white/5 text-gray-300',
};

const tierDot: Record<Tier, string> = {
  주력: 'bg-cyan-400',
  능숙: 'bg-violet-400',
  경험: 'bg-gray-500',
};

const categories: { name: string; skills: { name: string; tier: Tier }[] }[] = [
  {
    name: 'Languages',
    skills: [
      { name: 'C++', tier: '주력' },
      { name: 'C#', tier: '주력' },
      { name: 'Java', tier: '주력' },
      { name: 'JavaScript', tier: '주력' },
      { name: 'Python', tier: '경험' },
    ],
  },
  {
    name: 'Game · 3D',
    skills: [
      { name: 'Unity', tier: '능숙' },
      { name: 'Unreal Engine', tier: '능숙' },
    ],
  },
  {
    name: 'Mobile',
    skills: [
      { name: 'iOS', tier: '능숙' },
      { name: 'Android', tier: '능숙' },
      { name: 'Swift', tier: '능숙' },
      { name: 'React Native', tier: '경험' },
      { name: 'Flutter', tier: '경험' },
    ],
  },
  {
    name: 'AI',
    skills: [
      { name: 'AI / ML', tier: '경험' },
      { name: '바이브 코딩', tier: '능숙' },
    ],
  },
];

export function Skills() {
  return (
    <section id="skills" className="relative py-16 sm:py-20 md:py-28 px-4 sm:px-6 bg-white/[0.015]">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <p className="font-mono text-xs sm:text-sm tracking-[0.3em] text-cyan-400 mb-3">
            02 / SKILLS
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">Skills</h2>
            {/* Legend */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-gray-400">
              {(['주력', '능숙', '경험'] as Tier[]).map((tier) => (
                <span key={tier} className="inline-flex items-center gap-1.5">
                  <span className={`h-2 w-2 rounded-full ${tierDot[tier]}`} />
                  {tier}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {categories.map((category, i) => (
            <Reveal key={category.name} delay={i * 100}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 hover:border-white/20 transition-colors">
                <h3 className="font-mono text-sm tracking-widest text-gray-300 mb-4">
                  {category.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium ${tierStyles[skill.tier]}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${tierDot[skill.tier]}`} />
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
