import { useState, useEffect, useRef, useMemo } from 'react'
import './App.css'

function App() {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [metabolicRate, setMetabolicRate] = useState(98.4);

  const cursorRef = useRef(null);
  const auraRef = useRef(null);

  // High-Performance Loading Orbit
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(() => {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('active');
            }
          });
        }, { threshold: 0.1 });
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
      }, 300);
    }, 2500);

    const metabolicInterval = setInterval(() => {
      setMetabolicRate(prev => {
        const diff = (Math.random() - 0.5) * 0.2;
        return parseFloat((prev + diff).toFixed(1));
      });
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(metabolicInterval);
    };
  }, []);

  // Neural Theme System
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  // Magnetic Cursor Engine
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorRef.current && auraRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
        auraRef.current.style.left = `${e.clientX}px`;
        auraRef.current.style.top = `${e.clientY}px`;
      }
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
      const sections = ['home', 'bio', 'work', 'connect'];
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveTab(id);
          }
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Bio-Particles Memoization
  const particles = useMemo(() => Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    size: Math.random() * 400 + 200,
    x: Math.random() * 100,
    y: Math.random() * 100,
    color: Math.random() > 0.6 ? 'var(--primary-accent)' : 'var(--secondary-accent)',
    delay: Math.random() * -20,
    duration: Math.random() * 20 + 20
  })), []);

  const projects = [
    {
      id: 1,
      title: "Udhar Saathi v3",
      image: "/udhar-saathi.png",
      desc: "Micro-credit engine for rural resilient sectors.",
      fullDesc: "Architecture mapping traditional village bookkeeping to metabolic digital nodes. Implements Room persistence with a self-correcting sync algorithm that treats data packets like biological metabolic signals.",
      tech: ["Kotlin", "Jetpack Compose", "Bio-Architecture", "Room", "Hilt"],
      links: { github: "https://github.com/dsingh92342/portfolio", demo: "#" }
    },
    {
      id: 2,
      title: "Neural Content Host",
      image: "/neural-engine.png",
      desc: "High-intent AI multi-agent orchestration.",
      fullDesc: "A specialized framework using recursive prompt-chaining and vector semantic lookup. Designed to handle enterprise-grade high-intent payloads with metabolic resource allocation for cost efficiency.",
      tech: ["Python", "GenAI", "LangChain", "Vector DB", "Prompt Engineering"],
      links: { github: "#", demo: "#" }
    },
    {
      id: 3,
      title: "Bio-Logic Kernels",
      image: "/biologic-systems.png",
      desc: "Distributed systems modeled on cellular biology.",
      fullDesc: "A research project mapping mitochondrial energy exchange protocols to microservice load-balancing. Successfully simulated metabolic resilience in distributed Go environments with self-healing nodes.",
      tech: ["Go", "Kubernetes", "gRPC", "Docker"],
      links: { github: "#", demo: "#" }
    }
  ];

  return (
    <div className={`ecosystem-v5 ${isHovering ? 'cursor-active' : ''}`}>
      {/* Premium Loader */}
      <div className={`premium-loader ${!loading ? 'hidden' : ''}`}>
        <div className="loader-bar"><div className="loader-progress"></div></div>
        <div className="loader-text">Metabolizing Interface Architecture...</div>
      </div>

      <div className="grain-overlay"></div>
      <div className="ambient-light"></div>
      <div className="glow-blobs">
        <div className="blob"></div>
        <div className="blob"></div>
      </div>
      <div className="neural-grid"></div>

      {/* Neural Cursor */}
      <div ref={cursorRef} className="cursor-main"></div>
      <div ref={auraRef} className="cursor-aura"></div>

      {/* Advanced Navbar */}
      <header className={`nav-shell ${scrolled ? 'scrolled' : ''}`}>
        <nav className="nav-content">
          <div className="nav-group">
            {['home', 'bio', 'work'].map(item => (
              <a
                key={item}
                href={`#${item}`}
                className={`nav-link ${activeTab === item ? 'active' : ''}`}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onClick={() => setActiveTab(item)}
              >
                {item}
              </a>
            ))}
          </div>
          <button
            onClick={toggleTheme}
            className="bio-tag"
            style={{ background: 'transparent', cursor: 'pointer' }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {theme === 'dark' ? 'NEURAL' : 'CELLULAR'}
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <main id="home" className="hero">
        <div className="hero-banner-overlay" style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('/neural_biotech_banner.png')`, // Note: Assuming the file is copied/mapped correctly
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: theme === 'dark' ? 0.15 : 0.05,
          zIndex: -1,
          maskImage: 'radial-gradient(circle at center, black, transparent 80%)'
        }}></div>

        <div className="container reveal">
          <div className="bio-tag" style={{ marginBottom: '2rem', display: 'inline-block' }}>SYSTEM STATUS: OPTIMAL</div>
          <h1 className="gradient-text">DSINGH</h1>
          <p>Architecting at the synapse of **Biological Logic**, **Android Ecosystems**, and **High-Intent Prompt Engineering**.</p>
          <div style={{ marginTop: '4rem' }}>
            <a
              href="#work"
              className="btn"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              Access Artifacts →
            </a>
          </div>
        </div>
      </main>

      {/* Evolutionary Track */}
      <section id="bio" className="container" style={{ padding: '12rem 0' }}>
        <div className="section-header reveal" style={{ marginBottom: '8rem', textAlign: 'center' }}>
          <h2 className="gradient-text" style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)' }}>Evolutionary Track</h2>
        </div>
        <div className="bio-track">
          <div className="track-line"></div>
          {[
            { year: "2020", title: "Zoology Specialist", desc: "Deciphering cellular communication and metabolic resilience protocols." },
            { year: "2022", title: "Android Architect", desc: "Pioneering reactive code structures modeled after biological systems." },
            { year: "2024", title: "Prompt Godfather", desc: "Engineering high-intent neural protocols for massive-scale agentic synergy." }
          ].map((item, i) => (
            <div key={i} className="node reveal">
              <div className="node-content glass">
                <span className="bio-tag" style={{ marginBottom: '1.5rem', display: 'inline-block' }}>{item.year} PHASE</span>
                <h3 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', margin: '1rem 0', fontWeight: '800' }}>{item.title}</h3>
                <p style={{ opacity: 0.6, fontSize: '1.1rem' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Artifact Grid */}
      <section id="work" className="container" style={{ padding: '12rem 0' }}>
        <div className="section-header reveal" style={{ marginBottom: '6rem' }}>
          <h2 className="gradient-text" style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)' }}>Neural Artifacts</h2>
        </div>
        <div className="grid-system reveal">
          {projects.map((p) => (
            <div
              key={p.id}
              className="artifact-card"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              onClick={() => setSelectedProject(p)}
            >
              <div className="artifact-visual">
                <img src={p.image} alt={p.title} />
              </div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>{p.title}</h3>
              <p style={{ opacity: 0.5, fontSize: '1rem' }}>{p.desc}</p>
              <div style={{ marginTop: '2.5rem', color: 'var(--primary-accent)', fontWeight: '900', letterSpacing: '0.3em', fontSize: '0.75rem' }}>METABOLIZE SIGNAL →</div>
            </div>
          ))}
        </div>
      </section>

      {/* Neural Interface Modal */}
      <div className={`premium-modal ${selectedProject ? 'open' : ''}`} onClick={() => setSelectedProject(null)}>
        {selectedProject && (
          <div className="modal-canvas" onClick={e => e.stopPropagation()}>
            <button
              className="close-btn"
              onClick={() => setSelectedProject(null)}
              style={{
                position: 'absolute',
                top: '2rem',
                right: '2.5rem',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--glass-border)',
                color: '#fff',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                fontSize: '1.5rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer'
              }}
            >×</button>
            <div className="bio-tag" style={{ marginBottom: '1.5rem', display: 'inline-block' }}>ARTIFACT DECRYPTION</div>
            <h2 className="gradient-text" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', marginBottom: '2rem', lineHeight: '1.1' }}>{selectedProject.title}</h2>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
              {selectedProject.tech.map(t => <span key={t} className="bio-tag" style={{ opacity: 0.8 }}>{t}</span>)}
            </div>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.8', maxWidth: '800px' }}>{selectedProject.fullDesc}</p>
            <div style={{ marginTop: '4rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <a href={selectedProject.links.github} target="_blank" className="btn" style={{ padding: '1rem 2.5rem' }}>Source Code</a>
              <a href={selectedProject.links.demo} className="btn" style={{ background: 'transparent', border: '1px solid var(--glass-border)', color: '#fff', padding: '1rem 2.5rem' }}>Live Demo</a>
            </div>
          </div>
        )}
      </div>

      <footer id="connect" className="container" style={{ padding: '6rem 1.5rem' }}>
        <h2 className="gradient-text reveal" style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center' }}>Neural Sync</h2>
        <div className="reveal" style={{ display: 'flex', gap: '2.5rem', justifyContent: 'center', marginBottom: '6rem', flexWrap: 'wrap' }}>
          <a href="https://github.com/dsingh92342" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="nav-link">GitHub</a>
          <a href="#" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="nav-link">LinkedIn</a>
          <a href="#" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="nav-link">Twitter</a>
        </div>

        {/* Elite System Dash */}
        <div className="system-dash reveal">
          <div className="stat-node">
            <span className="stat-label">Synapse Depth</span>
            <span className="stat-value">99.9%</span>
          </div>
          <div className="stat-node">
            <span className="stat-label">Metabolic Rate</span>
            <span className="stat-value">{metabolicRate}%</span>
          </div>
          <div className="stat-node">
            <span className="stat-label">Neural Integrity</span>
            <span className="stat-value">OPTIMAL</span>
          </div>
          <div className="stat-node">
            <span className="stat-label">Signal Delay</span>
            <span className="stat-value">0.03ms</span>
          </div>
        </div>

        <p style={{ opacity: 0.1, letterSpacing: '0.8em', textTransform: 'uppercase', fontSize: '0.6rem', marginTop: '6rem', textAlign: 'center' }}>
          DSINGH © 2026 • Structural Precision Verified
        </p>
      </footer>
    </div>
  )
}

export default App
