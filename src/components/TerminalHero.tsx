import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { PROFILE } from '../constants';

const TerminalHero: React.FC = () => {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const terminalRef = useRef<HTMLDivElement>(null);

  const bootLines = PROFILE.bootIntro;

  useEffect(() => {
    if (currentLine >= bootLines.length) {
      setIsTyping(false);
      return;
    }

    const line = bootLines[currentLine];

    // Empty lines appear instantly
    if (line === '') {
      setLines((prev) => [...prev, '']);
      setCurrentLine((prev) => prev + 1);
      setCurrentChar(0);
      return;
    }

    if (currentChar < line.length) {
      // Determine typing speed based on content
      const isCommand = line.startsWith('$');
      const isBox = line.startsWith('│') || line.startsWith('┌') || line.startsWith('└') || line.startsWith('→');
      const speed = isCommand ? 40 : isBox ? 8 : 25;

      const timer = setTimeout(() => {
        setLines((prev) => {
          const newLines = [...prev];
          if (newLines.length <= currentLine) {
            newLines.push(line[currentChar]);
          } else {
            newLines[currentLine] = line.substring(0, currentChar + 1);
          }
          return newLines;
        });
        setCurrentChar((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else {
      // Move to next line after a brief pause
      const pause = bootLines[currentLine].startsWith('$') ? 400 : 80;
      const timer = setTimeout(() => {
        setCurrentLine((prev) => prev + 1);
        setCurrentChar(0);
      }, pause);
      return () => clearTimeout(timer);
    }
  }, [currentLine, currentChar, bootLines]);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const renderLine = (line: string, index: number) => {
    if (line.startsWith('$')) {
      return (
        <span>
          <span className="text-neon-green">❯</span>{' '}
          <span className="text-neon-blue">{line.substring(2)}</span>
        </span>
      );
    }
    if (line.startsWith('→')) {
      return <span className="text-neon-amber">{line}</span>;
    }
    if (line.includes('✓')) {
      return (
        <span>
          {line.replace('✓', '')}
          <span className="text-neon-green">✓</span>
        </span>
      );
    }
    if (
      line.startsWith('┌') ||
      line.startsWith('│') ||
      line.startsWith('└')
    ) {
      return <span className="text-neon-green text-glow-green">{line}</span>;
    }
    return <span className="text-gray-400">{line}</span>;
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center px-4 py-20 grid-bg"
      aria-label="Introduction"
    >
      {/* SEO — visible to crawlers, visually hidden */}
      <h1 className="sr-only">
        Ahmed Shehab — Backend &amp; Systems Engineer | Software Engineer specializing in
        distributed systems, Django, Flask, Spring Boot, Node.js, Docker
      </h1>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-void via-transparent to-void pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative w-full max-w-3xl"
      >
        {/* Terminal Window */}
        <div className="panel overflow-hidden">
          {/* Title Bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-surface border-b border-border">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-neon-red opacity-80" />
              <div className="w-3 h-3 rounded-full bg-neon-amber opacity-80" />
              <div className="w-3 h-3 rounded-full bg-neon-green opacity-80" />
            </div>
            <span className="ml-3 text-xs text-muted font-mono">
              ahmed@portfolio ~ /home/ahmed
            </span>
            <div className="ml-auto flex items-center gap-2">
              <span className="text-[10px] text-muted">zsh</span>
              <div className="status-online" />
            </div>
          </div>

          {/* Terminal Body */}
          <div
            ref={terminalRef}
            className="p-6 min-h-[380px] max-h-[500px] overflow-y-auto font-mono text-sm leading-relaxed"
          >
            {lines.map((line, i) => (
              <div key={i} className="whitespace-pre">
                {renderLine(line, i)}
              </div>
            ))}

            {/* Blinking cursor */}
            {isTyping && (
              <span className="inline-block w-2 h-4 bg-neon-green animate-blink ml-0.5" />
            )}

            {/* Post-boot actions */}
            {!isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mt-6 flex flex-wrap gap-3"
              >
                <a
                  href={PROFILE.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-xs border border-neon-green text-neon-green rounded hover:bg-neon-green hover:text-void transition-all duration-200 glow-green"
                >
                  $ open github
                </a>
                <a
                  href={PROFILE.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-xs border border-neon-blue text-neon-blue rounded hover:bg-neon-blue hover:text-void transition-all duration-200 glow-blue"
                >
                  $ open linkedin
                </a>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="px-4 py-2 text-xs border border-neon-amber text-neon-amber rounded hover:bg-neon-amber hover:text-void transition-all duration-200 glow-amber"
                >
                  $ send mail
                </a>
              </motion.div>
            )}
          </div>
        </div>

        {/* Scroll hint */}
        {!isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-8 text-center"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-muted text-xs"
            >
              ↓ scroll to explore system ↓
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default TerminalHero;
