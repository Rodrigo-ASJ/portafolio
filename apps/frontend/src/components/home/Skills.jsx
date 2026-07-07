import { motion } from 'framer-motion'

const skills = [
  { name: 'React', color: 'text-accent-blue' },
  { name: 'Node.js', color: 'text-accent-green' },
  { name: 'MongoDB', color: 'text-accent-green' },
  { name: 'Express', color: 'text-text-primary' },
  { name: 'Tailwind', color: 'text-accent-blue' },
  { name: 'JavaScript', color: 'text-accent-orange' },
  { name: 'TypeScript', color: 'text-accent-blue' },
  { name: 'HTML/CSS', color: 'text-accent-orange' },
  { name: 'Git', color: 'text-accent-orange' },
  { name: 'Figma', color: 'text-accent-pink' },
  { name: 'REST APIs', color: 'text-accent-purple' },
  { name: 'PostgreSQL', color: 'text-accent-blue' },
]

export default function Skills() {
  return (
    <section id="skills" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-white mb-2 font-mono">
            <span className="text-accent-purple">$</span> skills
          </h2>
          <div className="w-12 h-0.5 bg-accent-blue rounded mb-10" />

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className="flex items-center justify-center px-4 py-3 rounded-lg border border-bg-toolbar bg-bg-surface hover:border-accent-blue/30 hover:bg-bg-panel transition-all cursor-default"
              >
                <span className={`text-sm font-medium ${skill.color}`}>{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
