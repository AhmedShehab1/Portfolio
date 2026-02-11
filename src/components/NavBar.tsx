import React from 'react';
import { motion } from 'framer-motion';
import { Server, Terminal, Database, Activity, Cpu, Wifi } from 'lucide-react';
import { PROFILE } from '../constants';

// ── Floating background nodes ───────────────────────────────────────────────

const NavBar: React.FC = () => {
  const navItems = [
    { label: 'services', href: '#services', icon: <Server className="w-3.5 h-3.5" /> },
    { label: 'concurrency', href: '#loadbalancer', icon: <Activity className="w-3.5 h-3.5" /> },
    { label: 'runtime', href: '#runtime', icon: <Terminal className="w-3.5 h-3.5" /> },
    { label: 'deps', href: '#dependencies', icon: <Database className="w-3.5 h-3.5" /> },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-40 bg-void/80 backdrop-blur-md border-b border-border/50"
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2 text-neon-green hover:text-neon-green/80 transition-colors"
        >
          <Cpu className="w-4 h-4" />
          <span className="text-xs font-bold tracking-wider uppercase">
            {PROFILE.name.split(' ')[0]}.sys
          </span>
        </a>

        {/* Nav links */}
        <div className="hidden sm:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] text-muted hover:text-neon-green rounded transition-all duration-200 hover:bg-neon-green/5"
            >
              {item.icon}
              <span className="uppercase tracking-wider">{item.label}</span>
            </a>
          ))}
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-2 text-[10px] text-muted">
          <Wifi className="w-3.5 h-3.5 text-neon-green" />
          <span className="hidden sm:inline">all systems nominal</span>
          <div className="status-online" />
        </div>
      </div>
    </motion.nav>
  );
};

export default NavBar;
