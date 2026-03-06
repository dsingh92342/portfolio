import { useState, useEffect, useRef, useMemo } from 'react'
import './App.css'

function App() {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isHovering, setIsHovering] = useState(false);

  const cursorRef = useRef(null);
  const auraRef = useRef(null);

  // High-Performance Loading Orbit
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      // Final init of observers
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('active');
        });
      }, { threshold: 0.1 });
      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }, 2500);
    return () => clearTimeout(timer);
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
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        auraRef.current.style.transform = `translate3d(${e.clientX - 20}px, ${e.clientY - 20}px, 0)`;
      }
    };

    const handleScroll = () => setScrolled(window.scrollY > 100);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Bio-Particles Memoization
  const particles = useMemo(() => Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    size: Math.random() * 400 + 200,
    x: Math.random() * 100,
    y: Math.random() * 100,
    color: Math.random() > 0.6 ? 'var(--primary-accent)' : 'var(--secondary-accent)',
    delay: Math.random() * -20,
    duration: Math.random() * 15 + 15
  })), []);

  const projects = [
    {
      id: 1,
      title: "Udhar Saathi v3",
      image: "/udhar-saathi.png",
      desc: "Micro-credit engine for rural resilient sectors.",
      fullDesc: "Architecture mapping traditional village bookkeeping to metabolic digital nodes. Implements Room persistence with a self-correcting sync algorithm that treats data packets like biological metabolic signals.",
      tech: ["Kotlin", "Jetpack Compose", "Biological Architecture", "Room", "Hilt"],
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
      tech: ["Go", "Kubernetes", "Mitochondrial Logic", "gRPC", "Docker"],
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

      {/* Neural Cursor */}
      <div ref={cursorRef} className="cursor-main"></div>
      <div ref={auraRef} className="cursor-aura"></div>

      {/* Advanced Navbar */}
      <header className="nav-shell">
        <nav className="nav-content glass">
          <div className="nav-group" style={{ display: 'flex', gap: '2rem' }}>
            {['home', 'bio', 'work', 'connect'].map(item => (
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
            style={{ cursor: 'none' }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {theme === 'dark' ? 'NEURAL' : 'CELLULAR'}
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <main id="home" className="hero">
        <div className="vortex-background" style={{ position: 'fixed', inset: 0, z-index: -1 }}>
          {particles.map(p => (
            <div 
              key={p.id} 
              className="float-loop" 
              style={{ 
                position: 'absolute', 
                width: p.size, 
                height: p.size, 
                left: `${p.x}%`, 
                top: `${p.y}%`, 
                background: p.color, 
                opacity: theme === 'dark' ? 0.05 : 0.03, 
                filter: 'blur(120px)', 
                animationDelay: `${p.delay}s`, 
                animationDuration: `${p.duration}s`,
                borderRadius: '50%' 
              }}
            ></div>
          ))}
        </div>
        
        <div className="container">
          <h1 className="gradient-text">DSINGH</h1>
          <p>Architecting at the synapse of Biological Logic, Android Ecosystems, and High-Intent Prompt Engineering.</p>
          <div style={{ marginTop: '5rem' }}>
            <a 
              href="#work" 
              className="btn" 
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              Enter The Lab →
            </a>
          </div>
        </div>
      </main >

    {/* Evolutionary Track */ }
    < section id = "bio" className = "container" style = {{ padding: '12rem 0' }
}>
        <div className="section-header reveal" style={{ marginBottom: '8rem', textAlign: 'center' }}>
          <h2 className="gradient-text" style={{ fontSize: '4rem' }}>Career Evolution</h2>
        </div>
        <div className="bio-track">
          <div className="track-line"></div>
          {[
            { year: "2020", title: "Zoology Investigator", desc: "Specialized in cellular signal transduction and metabolic protocols." },
            { year: "2022", title: "Android Architect", desc: "Pioneering reactive code structures modeled after biological resilience." },
            { year: "2024", title: "Prompt Godfather", desc: "Engineering neural intent protocols for massive-scale agentic synergy." }
          ].map((item, i) => (
            <div key={i} className="node reveal">
              <div className="node-content glass">
                <span className="bio-tag" style={{ marginBottom: '1rem', display: 'inline-block' }}>Node {item.year}</span>
                <h3 style={{ fontSize: '2.5rem', margin: '1rem 0' }}>{item.title}</h3>
                <p style={{ opacity: 0.6 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section >

  {/* Artifact Grid */ }
  < section id = "work" className = "container" style = {{ padding: '12rem 0' }}>
        <div className="section-header reveal" style={{ marginBottom: '6rem' }}>
          <h2 className="gradient-text" style={{ fontSize: '4rem' }}>Neural Artifacts</h2>
        </div>
        <div className="grid-system">
          {projects.map((p) => (
            <div 
              key={p.id} 
              className="artifact-card reveal" 
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              onClick={() => setSelectedProject(p)}
            >
              <div className="artifact-visual">
                <img src={p.image} alt={p.title} />
              </div>
              <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{p.title}</h3>
              <p style={{ opacity: 0.5, fontSize: '0.95rem' }}>{p.desc}</p>
              <div style={{ marginTop: '2.5rem', color: var(--primary-accent), fontWeight: '900', letterSpacing: '0.3em', fontSize: '0.7rem' }}>OBSERVE SIGNAL</div>
            </div>
          ))}
        </div >
      </section >

  {/* Neural Interface Modal */ }
  < div className = {`premium-modal ${selectedProject ? 'open' : ''}`} onClick = {() => setSelectedProject(null)}>
    { selectedProject && (
      <div className="modal-canvas glass" onClick={e => e.stopPropagation()}>
        <button onClick={() => setSelectedProject(null)} style={{ position: 'absolute', top: '3rem', right: '3rem', background: 'transparent', border: 'none', color: '#fff', fontSize: '2.5rem', cursor: 'pointer' }}>×</button>
        <h2 className="gradient-text" style={{ fontSize: '5rem', marginBottom: '2rem' }}>{selectedProject.title}</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
          {selectedProject.tech.map(t => <span key={t} className="bio-tag">{t}</span>)}
        </div>
        <p style={{ fontSize: '1.4rem', color: 'var(--text-secondary)', lineHeight: '1.9' }}>{selectedProject.fullDesc}</p>
        <div style={{ marginTop: '5rem', display: 'flex', gap: '3rem' }}>
          <a href={selectedProject.links.github} target="_blank" className="btn">Decrypt Source</a>
          <a href={selectedProject.links.demo} className="btn" style={{ background: 'transparent', border: '1px solid var(--glass-border)', color: '#fff' }}>Live Interface</a>
        </div>
      </div>
    )}
      </div >

  <footer style={{ padding: '10rem 0', textAlign: 'center', backgroundColor: 'transparent' }}>
    <p style={{ opacity: 0.1, letterSpacing: '0.8em', textTransform: 'uppercase', fontSize: '0.65rem' }}>
      DSINGH © 2026 • Structural Precision Verified
    </p>
  </footer>
    </div >
  )
}

export default App
