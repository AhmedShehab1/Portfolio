import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  Linkedin,
  Code2,
  Mail,
  Server,
  Terminal,
  Package,
  Search,
  X,
} from 'lucide-react';
import { COMMANDS, type CommandItem } from '../constants';

// ── Icon Map ────────────────────────────────────────────────────────────────

const iconMap: Record<string, React.ReactNode> = {
  github: <Github className="w-4 h-4" />,
  linkedin: <Linkedin className="w-4 h-4" />,
  'code-2': <Code2 className="w-4 h-4" />,
  mail: <Mail className="w-4 h-4" />,
  server: <Server className="w-4 h-4" />,
  terminal: <Terminal className="w-4 h-4" />,
  package: <Package className="w-4 h-4" />,
};

// ── Component ───────────────────────────────────────────────────────────────

const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = COMMANDS.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  // ── Keyboard shortcut to open ──
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'p') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // ── Focus input when opened ──
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // ── Keyboard nav within palette ──
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(filtered[selectedIndex]);
    }
  };

  const executeCommand = (cmd: CommandItem) => {
    if (cmd.action.startsWith('#')) {
      const el = document.querySelector(cmd.action);
      el?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.open(cmd.action, '_blank');
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Trigger Button (fixed) */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-lg text-xs text-muted hover:border-neon-green/40 hover:text-neon-green transition-all duration-200 group"
      >
        <Search className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Command Palette</span>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-void rounded text-[10px] border border-border group-hover:border-neon-green/30">
          Ctrl+P
        </kbd>
      </motion.button>

      {/* Palette Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />

            {/* Palette */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="fixed top-[20%] left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-lg"
            >
              <div className="bg-panel border border-border rounded-xl overflow-hidden shadow-2xl shadow-black/50">
                {/* Search Input */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
                  <Search className="w-4 h-4 text-muted flex-shrink-0" />
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setSelectedIndex(0);
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a command..."
                    className="flex-1 bg-transparent text-sm text-gray-200 outline-none placeholder:text-muted font-mono"
                  />
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-muted hover:text-gray-300 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Results */}
                <div className="max-h-64 overflow-y-auto py-2">
                  {filtered.length === 0 && (
                    <div className="px-4 py-8 text-center text-muted text-xs">
                      No commands match "{query}"
                    </div>
                  )}
                  {filtered.map((cmd, i) => (
                    <button
                      key={cmd.label}
                      onClick={() => executeCommand(cmd)}
                      onMouseEnter={() => setSelectedIndex(i)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors duration-100 ${
                        i === selectedIndex
                          ? 'bg-neon-green/5 text-neon-green'
                          : 'text-gray-400 hover:bg-surface'
                      }`}
                    >
                      <span
                        className={
                          i === selectedIndex ? 'text-neon-green' : 'text-muted'
                        }
                      >
                        {iconMap[cmd.icon] || (
                          <Terminal className="w-4 h-4" />
                        )}
                      </span>
                      <span className="flex-1 text-xs font-mono">
                        {cmd.label}
                      </span>
                      <kbd className="text-[10px] text-muted px-1.5 py-0.5 bg-void rounded border border-border">
                        {cmd.shortcut}
                      </kbd>
                    </button>
                  ))}
                </div>

                {/* Footer */}
                <div className="px-4 py-2 border-t border-border flex items-center gap-4 text-[10px] text-muted">
                  <span>↑↓ navigate</span>
                  <span>↵ select</span>
                  <span>esc close</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default CommandPalette;
