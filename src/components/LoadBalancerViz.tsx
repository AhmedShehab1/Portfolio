import React, { useRef, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';

// ── Types ───────────────────────────────────────────────────────────────────

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  speed: number;
  phase: 'toBalancer' | 'toServer' | 'done';
  serverIndex: number;
  radius: number;
  opacity: number;
  trail: { x: number; y: number }[];
}

interface ServerNode {
  x: number;
  y: number;
  label: string;
  load: number;
  maxLoad: number;
  color: string;
}

// ── Constants ───────────────────────────────────────────────────────────────

const COLORS = {
  green: '#39ff14',
  blue: '#00d4ff',
  amber: '#ffb300',
  purple: '#a855f7',
  bg: '#0a0a0a',
  surface: '#111111',
  border: '#2a2a2a',
  muted: '#6b7280',
};

const SERVER_COLORS = [COLORS.green, COLORS.blue, COLORS.amber, COLORS.purple];

// ── Component ───────────────────────────────────────────────────────────────

const LoadBalancerViz: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const serversRef = useRef<ServerNode[]>([]);
  const frameCountRef = useRef(0);
  const dprRef = useRef(1);

  const initServers = useCallback((w: number, h: number) => {
    const cx = w / 2;
    const serverCount = 4;
    const spacing = Math.min(w * 0.18, 140);
    const serverY = h * 0.78;

    serversRef.current = Array.from({ length: serverCount }, (_, i) => ({
      x: cx - ((serverCount - 1) / 2) * spacing + i * spacing,
      y: serverY,
      label: `srv-${i}`,
      load: 0,
      maxLoad: 100,
      color: SERVER_COLORS[i % SERVER_COLORS.length],
    }));
  }, []);

  const spawnParticle = useCallback((w: number, h: number) => {
    const balancerX = w / 2;
    const balancerY = h * 0.38;
    const startX = w / 2 + (Math.random() - 0.5) * 60;
    const startY = h * 0.05;

    // Round-robin with slight randomization
    const servers = serversRef.current;
    const minLoad = Math.min(...servers.map((s) => s.load));
    const candidates = servers.filter((s) => s.load <= minLoad + 15);
    const target = candidates[Math.floor(Math.random() * candidates.length)];
    const serverIndex = servers.indexOf(target);

    const particle: Particle = {
      x: startX,
      y: startY,
      targetX: balancerX,
      targetY: balancerY,
      speed: 1.5 + Math.random() * 1.5,
      phase: 'toBalancer',
      serverIndex,
      radius: 2 + Math.random() * 2,
      opacity: 0.9,
      trail: [],
    };

    particlesRef.current.push(particle);
    servers[serverIndex].load = Math.min(
      servers[serverIndex].load + 8,
      servers[serverIndex].maxLoad
    );
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = dprRef.current;
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;

    ctx.save();
    ctx.scale(dpr, dpr);

    // Clear
    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(0, 0, w, h);

    const balancerX = w / 2;
    const balancerY = h * 0.38;
    const servers = serversRef.current;

    // ── Draw connection lines ──
    ctx.strokeStyle = 'rgba(57, 255, 20, 0.06)';
    ctx.lineWidth = 1;
    servers.forEach((srv) => {
      ctx.beginPath();
      ctx.moveTo(balancerX, balancerY);
      ctx.lineTo(srv.x, srv.y);
      ctx.stroke();
    });

    // ── Draw incoming line ──
    ctx.strokeStyle = 'rgba(0, 212, 255, 0.08)';
    ctx.beginPath();
    ctx.moveTo(w / 2, 0);
    ctx.lineTo(balancerX, balancerY);
    ctx.stroke();

    // ── Draw Load Balancer node ──
    ctx.fillStyle = COLORS.surface;
    ctx.strokeStyle = COLORS.green;
    ctx.lineWidth = 1.5;
    const lbSize = 28;
    ctx.beginPath();
    // Hexagon
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 6;
      const px = balancerX + lbSize * Math.cos(angle);
      const py = balancerY + lbSize * Math.sin(angle);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // LB glow
    ctx.shadowColor = COLORS.green;
    ctx.shadowBlur = 15;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // LB label
    ctx.fillStyle = COLORS.green;
    ctx.font = '10px JetBrains Mono, monospace';
    ctx.textAlign = 'center';
    ctx.fillText('LB', balancerX, balancerY + 4);

    ctx.fillStyle = COLORS.muted;
    ctx.font = '9px JetBrains Mono, monospace';
    ctx.fillText('load-balancer', balancerX, balancerY - lbSize - 8);

    // ── Draw server nodes ──
    servers.forEach((srv) => {
      const nodeSize = 20;

      // Server box
      ctx.fillStyle = COLORS.surface;
      ctx.strokeStyle = srv.color;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(srv.x - nodeSize, srv.y - nodeSize, nodeSize * 2, nodeSize * 2, 4);
      ctx.fill();
      ctx.stroke();

      // Glow on load
      if (srv.load > 30) {
        ctx.shadowColor = srv.color;
        ctx.shadowBlur = srv.load / 5;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Server label
      ctx.fillStyle = srv.color;
      ctx.font = '9px JetBrains Mono, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(srv.label, srv.x, srv.y + 3);

      // Load bar beneath
      const barW = 36;
      const barH = 4;
      const barX = srv.x - barW / 2;
      const barY = srv.y + nodeSize + 8;

      ctx.fillStyle = COLORS.border;
      ctx.fillRect(barX, barY, barW, barH);

      const loadPct = srv.load / srv.maxLoad;
      const loadColor =
        loadPct > 0.8 ? '#ff3e3e' : loadPct > 0.5 ? COLORS.amber : srv.color;
      ctx.fillStyle = loadColor;
      ctx.fillRect(barX, barY, barW * loadPct, barH);

      // Load percentage text
      ctx.fillStyle = COLORS.muted;
      ctx.font = '8px JetBrains Mono, monospace';
      ctx.fillText(`${Math.round(srv.load)}%`, srv.x, barY + 14);

      // Decay load
      srv.load = Math.max(0, srv.load - 0.15);
    });

    // ── Draw & update particles ──
    particlesRef.current = particlesRef.current.filter((p) => {
      // Trail
      p.trail.push({ x: p.x, y: p.y });
      if (p.trail.length > 12) p.trail.shift();

      // Draw trail
      p.trail.forEach((t, i) => {
        const alpha = (i / p.trail.length) * 0.3 * p.opacity;
        const srvColor = servers[p.serverIndex]?.color || COLORS.green;
        ctx.fillStyle =
          p.phase === 'toBalancer'
            ? `rgba(0, 212, 255, ${alpha})`
            : `${srvColor}${Math.round(alpha * 255)
                .toString(16)
                .padStart(2, '0')}`;
        ctx.beginPath();
        ctx.arc(t.x, t.y, p.radius * 0.6, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw particle
      const srvColor = servers[p.serverIndex]?.color || COLORS.green;
      const pColor = p.phase === 'toBalancer' ? COLORS.blue : srvColor;
      ctx.fillStyle = pColor;
      ctx.shadowColor = pColor;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Move particle
      const dx = p.targetX - p.x;
      const dy = p.targetY - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 4) {
        if (p.phase === 'toBalancer') {
          // Redirect to server
          const srv = servers[p.serverIndex];
          if (srv) {
            p.targetX = srv.x;
            p.targetY = srv.y;
            p.phase = 'toServer';
            p.trail = [];
          }
        } else {
          p.phase = 'done';
          p.opacity -= 0.1;
          return p.opacity > 0;
        }
      }

      p.x += (dx / dist) * p.speed;
      p.y += (dy / dist) * p.speed;
      return true;
    });

    ctx.restore();

    // Spawn new particles on interval
    frameCountRef.current++;
    if (frameCountRef.current % 18 === 0) {
      spawnParticle(w, h);
    }

    animRef.current = requestAnimationFrame(draw);
  }, [spawnParticle]);

  // ── Resize handler ──
  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const dpr = window.devicePixelRatio || 1;
      dprRef.current = dpr;
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      initServers(rect.width, rect.height);
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [initServers]);

  // ── Animation loop ──
  useEffect(() => {
    if (isInView) {
      animRef.current = requestAnimationFrame(draw);
    }
    return () => cancelAnimationFrame(animRef.current);
  }, [isInView, draw]);

  return (
    <section id="loadbalancer" className="relative py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <h2 className="text-2xl font-bold text-neon-green text-glow-green mb-2">
            // concurrency_visualizer
          </h2>
          <p className="text-sm text-muted max-w-lg mx-auto">
            Live simulation of a load balancer distributing incoming requests
            across server nodes. Round-robin with load-aware routing.
          </p>
        </motion.div>

        <motion.div
          ref={containerRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="panel p-1 overflow-hidden"
        >
          {/* Header bar */}
          <div className="flex items-center gap-2 px-4 py-2 border-b border-border">
            <div className="status-online" />
            <span className="text-[10px] text-muted">
              NETWORK TOPOLOGY — LIVE
            </span>
            <span className="ml-auto text-[10px] text-neon-green animate-pulse-glow">
              ● streaming
            </span>
          </div>
          <canvas
            ref={canvasRef}
            className="w-full"
            style={{ height: '400px' }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default LoadBalancerViz;
