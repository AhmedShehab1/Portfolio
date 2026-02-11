import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, MapPin, Calendar, ChevronRight } from 'lucide-react';
import { RUNTIME_HISTORY, CERTIFICATIONS, type RuntimeEntry } from '../constants';

// ── Animations ──────────────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

// ── Status Badge ────────────────────────────────────────────────────────────

const StatusBadge: React.FC<{ status: RuntimeEntry['status'] }> = ({
  status,
}) => {
  const styles: Record<string, string> = {
    running: 'text-neon-green border-neon-green/30 bg-neon-green/5',
    completed: 'text-neon-blue border-neon-blue/30 bg-neon-blue/5',
    terminated: 'text-neon-red border-neon-red/30 bg-neon-red/5',
  };

  return (
    <span
      className={`px-2 py-0.5 text-[10px] border rounded uppercase tracking-wider ${styles[status]}`}
    >
      {status}
    </span>
  );
};

// ── RuntimeHistory Component ────────────────────────────────────────────────

const RuntimeHistory: React.FC = () => {
  return (
    <section id="runtime" className="relative py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="text-2xl font-bold text-neon-green text-glow-green mb-2">
            // runtime_history
          </h2>
          <p className="text-sm text-muted">
            Process execution logs — professional runtime entries with
            timestamps and status codes.
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="relative"
        >
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />

          {RUNTIME_HISTORY.map((entry, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="relative pl-12 pb-10 last:pb-0 group"
            >
              {/* Dot on timeline */}
              <div className="absolute left-[11px] top-1 w-[10px] h-[10px] rounded-full bg-surface border-2 border-neon-green group-hover:bg-neon-green transition-colors duration-300" />

              {/* Card */}
              <div className="panel p-4 hover:border-neon-green/30 transition-all duration-300">
                {/* Top row */}
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <Terminal className="w-4 h-4 text-neon-green opacity-60" />
                  <h3 className="text-sm font-bold text-gray-200">
                    {entry.role}
                  </h3>
                  <StatusBadge status={entry.status} />
                </div>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-4 mb-3 text-[11px] text-muted">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {entry.org} — {entry.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {entry.period}
                  </span>
                </div>

                {/* Highlights */}
                <ul className="space-y-1.5">
                  {entry.highlights.map((h, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2 text-xs text-gray-400"
                    >
                      <ChevronRight className="w-3 h-3 text-neon-green/50 mt-0.5 flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16"
        >
          <h3 className="text-lg font-bold text-neon-amber text-glow-amber mb-4">
            // verified_certificates
          </h3>
          <div className="flex flex-wrap gap-2">
            {CERTIFICATIONS.map((cert) => (
              <span
                key={cert}
                className="px-3 py-1.5 text-[11px] bg-surface border border-border rounded text-gray-400 hover:border-neon-amber/40 hover:text-neon-amber transition-all duration-200"
              >
                {cert}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RuntimeHistory;
