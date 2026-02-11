import React from 'react';
import NavBar from './components/NavBar';
import TerminalHero from './components/TerminalHero';
import LoadBalancerViz from './components/LoadBalancerViz';
import ServiceMesh from './components/ServiceMesh';
import RuntimeHistory from './components/RuntimeHistory';
import TechStack from './components/TechStack';
import CommandPalette from './components/CommandPalette';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-void text-gray-200 font-mono noise scanline-overlay">
      <NavBar />
      <TerminalHero />
      <LoadBalancerViz />
      <ServiceMesh />
      <RuntimeHistory />
      <TechStack />
      <Footer />
      <CommandPalette />
    </div>
  );
}

export default App;