import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Server,
  Database,
  Activity,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Box,
} from 'lucide-react';
import { SERVICES, type Service } from '../constants';

// ── Helpers ─────────────────────────────────────────────────────────────────

const categoryIcon: Record<Service['category'], React.ReactNode> = {
  backend: <Server className="w-4 h-4" />,
  fullstack: <Activity className="w-4 h-4" />,
  systems: <Database className="w-4 h-4" />,
  tools: <Box className="w-4 h-4" />,
};

const statusClass: Record<Service['status'], string> = {
  online: 'status-online',
  maintenance: 'status-maintenance',
  archived: 'status-archived',
};

const statusLabel: Record<Service['status'], string> = {
  online: 'ONLINE',
  maintenance: 'MAINT',
  archived: 'ARCHIVED',
};

const statusTextColor: Record<Service['status'], string> = {
  online: 'text-neon-green',
  maintenance: 'text-neon-amber',
  archived: 'text-muted',
};

// ── Container Variants ──────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

// ── ServiceCard ─────────────────────────────────────────────────────────────

const ServiceCard = React.forwardRef<
  HTMLDivElement,
  { service: Service; index: number }
>(({ service, index }, ref) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      className="panel p-0 overflow-hidden group"
    >
      {/* Card Header — looks like a container/process header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface/50">
        <span className="text-neon-green opacity-60">
          {categoryIcon[service.category]}
        </span>
        <span className="text-[11px] font-bold text-gray-300 tracking-wide uppercase truncate">
          {service.name}
        </span>
        <div className="ml-auto flex items-center gap-2">
          <div className={statusClass[service.status]} />
          <span className={`text-[10px] ${statusTextColor[service.status]}`}>
            {statusLabel[service.status]}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="px-4 py-3">
        {/* Metrics Row */}
        <div className="flex items-center gap-4 mb-3 text-[10px] text-muted">
          <span>
            PID:{' '}
            <span className="text-gray-400">
              {(1000 + index * 137).toString()}
            </span>
          </span>
          {service.uptime !== 'N/A' && (
            <span>
              Uptime:{' '}
              <span className="text-neon-green">{service.uptime}</span>
            </span>
          )}
          <span>
            Type:{' '}
            <span className="text-neon-blue">{service.category}</span>
          </span>
        </div>

        {/* Description */}
        <p className="text-xs text-gray-400 leading-relaxed mb-3 line-clamp-2">
          {service.description}
        </p>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {service.tech.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 text-[10px] bg-void border border-border rounded text-gray-400 hover:border-neon-green/40 hover:text-neon-green transition-colors duration-200"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Expandable Logs */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="bg-void rounded p-3 mb-3 text-[10px] font-mono text-gray-500 border border-border">
                <div className="text-muted mb-1">
                  [LOG] Service started at container init
                </div>
                <div>
                  <span className="text-neon-green">INFO</span>{' '}
                  {service.description}
                </div>
                <div className="mt-1">
                  <span className="text-neon-blue">DEPS</span>{' '}
                  {service.tech.join(' → ')}
                </div>
                <div className="mt-1">
                  <span className="text-neon-amber">STATUS</span>{' '}
                  {service.status.toUpperCase()} | Uptime {service.uptime}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 px-3 py-1.5 text-[10px] border border-border rounded text-muted hover:border-neon-green/40 hover:text-neon-green transition-all duration-200"
          >
            {expanded ? (
              <>
                <ChevronUp className="w-3 h-3" /> Hide Logs
              </>
            ) : (
              <>
                <ChevronDown className="w-3 h-3" /> View Logs
              </>
            )}
          </button>
          {service.repo && (
            <a
              href={service.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-1.5 text-[10px] border border-border rounded text-muted hover:border-neon-blue/40 hover:text-neon-blue transition-all duration-200"
            >
              <ExternalLink className="w-3 h-3" /> Inspect Source
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
});

ServiceCard.displayName = 'ServiceCard';

// ── ServiceMesh (Main) ──────────────────────────────────────────────────────

const ServiceMesh: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const categories = ['all', 'backend', 'fullstack', 'systems', 'tools'];

  const filtered =
    filter === 'all'
      ? SERVICES
      : SERVICES.filter((s) => s.category === filter);

  return (
    <section id="services" className="relative py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-neon-green text-glow-green mb-2">
            // service_registry
          </h2>
          <p className="text-sm text-muted">
            Deployed microservices and engineering projects. Status monitored in
            real time.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 text-[11px] rounded border transition-all duration-200 uppercase tracking-wider ${
                filter === cat
                  ? 'border-neon-green text-neon-green bg-neon-green/5 glow-green'
                  : 'border-border text-muted hover:border-gray-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="sync">
            {filtered.map((service, i) => (
              <ServiceCard key={service.name} service={service} index={i} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ServiceMesh;
