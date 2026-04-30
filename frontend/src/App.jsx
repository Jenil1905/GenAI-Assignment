import { useState, useEffect } from 'react';
import { PERSONAS, PERSONA_ORDER } from './personas';
import Chat from './Chat';
import './App.css';

// Orb colours per persona
const ORB_COLORS = {
  anshuman: { orb1: 'rgba(108, 99, 255, 0.18)', orb2: 'rgba(139, 92, 246, 0.10)' },
  abhimanyu: { orb1: 'rgba(249, 115, 22, 0.18)', orb2: 'rgba(239, 68, 68, 0.10)' },
  kshitij:   { orb1: 'rgba(16, 185, 129, 0.18)', orb2: 'rgba(6, 182, 212, 0.10)' },
};

export default function App() {
  const [activePersonaId, setActivePersonaId] = useState('anshuman');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Wake up Render backend on initial load
  useEffect(() => {
    const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    fetch(`${API_BASE}/api/health`).catch(() => {
      // Ignore errors, we just want to wake it up
    });
  }, []);

  const persona = PERSONAS[activePersonaId];
  const orbs = ORB_COLORS[activePersonaId];

  const handlePersonaSwitch = (id) => {
    setActivePersonaId(id);
    setSidebarOpen(false); // close sidebar on mobile after switching
  };

  return (
    <div className="app-shell">
      {/* Animated background orbs */}
      <div
        className="bg-orb bg-orb-1 visible"
        style={{ background: orbs.orb1 }}
        aria-hidden="true"
      />
      <div
        className="bg-orb bg-orb-2 visible"
        style={{ background: orbs.orb2 }}
        aria-hidden="true"
      />

      {/* Mobile sidebar overlay */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? 'visible' : ''}`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />

      {/* Header */}
      <header className="app-header">
        <div className="header-brand">
          <div className="header-logo" aria-hidden="true">S</div>
          <div>
            <div className="header-title">Scaler Personas</div>
            <div className="header-subtitle">AI Chatbot · Prompt Engineering</div>
          </div>
        </div>

        <div
          className="header-active-persona"
          style={{
            borderColor: persona.color,
            boxShadow: `0 0 16px ${persona.glow}`,
          }}
          aria-label={`Active persona: ${persona.name}`}
        >
          <div
            className="header-persona-dot"
            style={{ background: persona.color }}
          />
          <span className="header-persona-name">{persona.name}</span>
        </div>
      </header>

      {/* Main layout */}
      <div className="main-layout">
        {/* Persona Sidebar */}
        <aside
          className={`persona-sidebar ${sidebarOpen ? 'open' : ''}`}
          aria-label="Persona selector"
        >
          <div className="sidebar-header">
            <p className="sidebar-label">Choose Persona</p>
          </div>
          <div className="persona-list" role="listbox" aria-label="Available personas">
            {PERSONA_ORDER.map((id) => {
              const p = PERSONAS[id];
              const isActive = id === activePersonaId;
              return (
                <div
                  key={id}
                  className={`persona-card ${isActive ? 'active' : ''}`}
                  style={{
                    color: p.color,
                    boxShadow: isActive ? `0 0 20px ${p.glow}` : 'none',
                  }}
                  onClick={() => handlePersonaSwitch(id)}
                  role="option"
                  aria-selected={isActive}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handlePersonaSwitch(id)}
                  id={`persona-option-${id}`}
                >
                  <div
                    className="persona-card::before"
                    style={{ background: p.color }}
                  />
                  <div className="persona-card-top">
                    <div
                      className="persona-avatar"
                      style={{ background: p.gradient }}
                    >
                      {p.avatar}
                    </div>
                    <div className="persona-card-info">
                      <div className="persona-card-name">{p.name}</div>
                      <div className="persona-card-title">{p.title}</div>
                    </div>
                    {isActive && (
                      <div
                        className="persona-active-indicator"
                        style={{ background: p.color }}
                        aria-label="Currently active"
                      />
                    )}
                  </div>
                  <div className="persona-card-tagline">"{p.tagline}"</div>
                </div>
              );
            })}
          </div>
        </aside>

        {/* Chat Window */}
        <main style={{ flex: 1, overflow: 'hidden', display: 'flex' }}>
          <Chat key={activePersonaId} persona={persona} />
        </main>
      </div>

      {/* Mobile sidebar toggle */}
      <button
        className="sidebar-toggle-btn"
        onClick={() => setSidebarOpen(prev => !prev)}
        aria-label="Toggle persona switcher"
        aria-expanded={sidebarOpen}
        id="sidebar-toggle"
      >
        {sidebarOpen ? '✕' : '👥'}
      </button>
    </div>
  );
}
