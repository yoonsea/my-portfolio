const skills = [
  { name: 'React', level: 90, color: 'from-blue-500 to-blue-600' },
  { name: 'Next.js', level: 85, color: 'from-gray-700 to-gray-900' },
  { name: 'TypeScript', level: 88, color: 'from-blue-600 to-blue-700' },
  { name: 'JavaScript', level: 92, color: 'from-yellow-400 to-yellow-500' },
  { name: 'Tailwind CSS', level: 90, color: 'from-cyan-400 to-cyan-500' },
  { name: 'Node.js', level: 75, color: 'from-green-500 to-green-600' },
  { name: 'Git', level: 85, color: 'from-orange-500 to-orange-600' },
  { name: 'UI/UX Design', level: 80, color: 'from-pink-500 to-pink-600' },
];

export function Skills() {
  return (
    <section
      id="skills"
      className="py-20 px-6 bg-gray-50 dark:bg-gray-900"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Skills
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {skills.map((skill) => (
            <div key={skill.name} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-900 dark:text-white">
                  {skill.name}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {skill.level}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

