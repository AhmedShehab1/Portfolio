import React from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Layers,
  Database,
  Server,
  Cpu,
} from 'lucide-react';
import { DEPENDENCIES, type Dependency } from '../constants';

// ── Icon Map ────────────────────────────────────────────────────────────────

const iconMap: Record<string, React.ReactNode> = {
  'code-2': <Code2 className="w-5 h-5" />,
  layers: <Layers className="w-5 h-5" />,
  database: <Database className="w-5 h-5" />,
  server: <Server className="w-5 h-5" />,
  cpu: <Cpu className="w-5 h-5" />,
};

// ── Animations ──────────────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const tagVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 },
  },
};

// ── Component ───────────────────────────────────────────────────────────────

const TechStack: React.FC = () => {
  const accentColors = [
    'neon-green',
    'neon-blue',
    'neon-amber',
    'neon-purple',
    'neon-green',
  ];

  return (
    <section id="dependencies" className="relative py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="text-2xl font-bold text-neon-green text-glow-green mb-2">
            // dependencies
          </h2>
          <p className="text-sm text-muted">
            Core packages and runtime dependencies powering the stack.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {DEPENDENCIES.map((dep, i) => {
            const accent = accentColors[i % accentColors.length];

            return (
              <motion.div
                key={dep.category}
                variants={cardVariants}
                whileHover={{
                  scale: 1.03,
                  transition: { duration: 0.2 },
                }}
                className="panel p-0 overflow-hidden"
              >
                {/* Card header */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-surface/50">
                  <span className={`text-${accent}`}>
                    {iconMap[dep.icon] || <Code2 className="w-5 h-5" />}
                  </span>
                  <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                    {dep.category}
                  </h3>
                  <span className="ml-auto text-[10px] text-muted">
                    {dep.items.length} pkgs
                  </span>
                </div>

                {/* Items */}
                <div className="p-4">
                  <motion.div
                    variants={containerVariants}
                    className="flex flex-wrap gap-2"
                  >
                    {dep.items.map((item) => (
                      <motion.span
                        key={item}
                        variants={tagVariants}
                        whileHover={{
                          scale: 1.1,
                          transition: { duration: 0.15 },
                        }}
                        className={`px-2.5 py-1 text-[11px] bg-void border border-border rounded cursor-default text-gray-400 hover:border-${accent}/40 hover:text-${accent} transition-all duration-200`}
                      >
                        {item}
                      </motion.span>
                    ))}
                  </motion.div>

                  {/* Faux install line */}
                  <div className="mt-4 pt-3 border-t border-border/50">
                    <code className="text-[10px] text-muted">
                      <span className="text-neon-green">$</span> install{' '}
                      <span className="text-gray-500">
                        {dep.items.slice(0, 3).join(' ')}
                        {dep.items.length > 3 ? ' ...' : ''}
                      </span>
                    </code>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;
