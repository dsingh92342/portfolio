import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [selectedProject, setSelectedProject] = useState(null);
  const [particles, setParticles] = useState([]);
  const [toast, setToast] = useState({ visible: false, message: '' });
  const [formStatus, setFormStatus] = useState('idle');

  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const formRef = useRef();

  // Loading Metabolism
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      // Trigger animations after loader clears
      setTimeout(() => {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
          });
        }, { threshold: 0.1 });
        document.querySelectorAll('.reveal, .stagger-container').forEach(el => observer.observe(el));
      }, 100);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Theme Sync
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const showToast = (message) => {
    setToast({ visible: true, message });
    setTimeout(() => setToast({ visible: false, message: '' }), 4500);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('idle');
      showToast("Transmission received. Synapse initiated.");
      e.target.reset();
    }, 2000);
  };

  // Scroll & UI Events
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress((winScroll / height) * 100);
      setScrolled(winScroll > 80);
    };

    const handleMouseMove = (e) => {
      if (cursorRef.current && followerRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
        followerRef.current.style.left = `${e.clientX}px`;
        followerRef.current.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Background Particle Engine
  useEffect(() => {
    setParticles(Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      size: Math.random() * 500 + 200,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: Math.random() > 0.5 ? 'var(--primary-accent)' : 'var(--secondary-accent)',
      delay: Math.random() * -15,
      duration: Math.random() * 15 + 15
    })));
  }, []);

  const projects = [
    {
      id: 1,
      title: "Udhar Saathi",
      image: "/udhar-saathi.png",
      desc: "Micro-credit engine for rural economies.",
      fullDesc: "A fault-tolerant Android ecosystem mapping traditional bookkeeping to reactive digital nodes. Built with Jetpack Compose and biological synchronization patterns for offline-first reliability in low-connectivity sectors.",
      tech: ["Kotlin", "Compose", "Room DB", "Hilt", "WorkManager"],
      links: { github: "https://github.com/dsingh92342/portfolio", demo: "#" }
    },
    {
      id: 2,
      title: "Neural Engine",
      image: "/neural-engine.png",
      desc: "High-intent AI agentic frameworks.",
      fullDesc: "Specialized multi-agent architecture utilizing recursive prompt-chaining and vector embeddings. Designed to handle high-intent enterprise payloads with 99.9% semantic accuracy and metabolic resource optimization.",
      tech: ["Python", "OpenAI API", "LangChain", "Pinecone", "Zoology"],
      links: { github: "#", demo: "#" }
    },
    {
      id: 3,
      title: "Bio-Logic Systems",
      image: "/biologic-systems.png",
      desc: "Cellular-inspired distributed software.",
      fullDesc: "Applying mitochondrial energy models to microservice load-balancing. Successfully simulated metabolic resource allocation in distributed Go environments, achieving self-healing protocols based on cellular resilience.",
      tech: ["Go", "Kubernetes", "gRPC", "Docker", "Istio"],
      links: { github: "#", demo: "#" }
    }
  ];

  return (
    <div className="bio-digital-app">
      {/* Loader */}
      <div className={`loader-wrapper ${!loading ? 'hidden' : ''}`}>
        <div className="loader-element"></div>
        <div className="loader-text">Metabolizing Interface Nodes...</div>
      </div>

      <div className="noise-overlay"></div>
      <div className="bio-vortex"></div>

      {/* Neural Cursor */}
      <div ref={cursorRef} className="cursor-dot"></div>
      <div ref={followerRef} className="cursor-follower"></div>

      {/* Progress & UI Status */}
      <div className={`toast-synapse glass ${toast.visible ? 'active' : ''}`} style={{ border: '1px solid var(--primary-accent)' }}>
        {toast.message}
      </div>

      {/* Navbar */}
      <nav className={`navbar glass ${scrolled ? 'scrolled' : ''}`}>
        <a href="#home" className="nav-link">Home</a>
        <a href="#bio" className="nav-link">Bio</a>
        <a href="#work" className="nav-link">Work</a>
        <a href="#connect" className="nav-link">Connect</a>
        <button onClick={toggleTheme} className="theme-toggle glass" style={{ padding: '0.4rem 1rem', border: '1px solid var(--glass-border)', fontSize: '0.6rem', fontWeight: '900', color: 'var(--text-primary)', cursor: 'none' }}>
          {theme === 'dark' ? 'CELLULAR' : 'NEURAL'}
        </button>
      </nav>

      {/* Hero Section */}
      <header id="home" className="hero">
        <div className="particles-container">
          {particles.map(p => (
            <div key={p.id} className="float-loop" style={{ position: 'absolute', width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%`, background: p.color, opacity: 0.08, filter: 'blur(100px)', animationDelay: `${p.delay}s`, animationDuration: `${p.duration}s`, borderRadius: '50%' }}></div>
          ))}
        </div>
        <div className="container reveal">
          <h1 className="gradient-text glow-text">DSINGH</h1>
          <p>Architecting the intersection of biological logic and reactive software engineering.</p>
          <div style={{ marginTop: '4rem' }}>
            <a href="#work" className="btn btn-accent">Enter Ecosystem</a>
          </div>
        </div>
      </header>

      {/* Bio Evolution */}
      <section id="bio" className="container">
        <div className="section-title reveal">
          <h2 className="gradient-text" style={{ fontSize: '3.5rem', marginBottom: '4rem' }}>Bio-Evolutionary Track</h2>
        </div>
        <div className="timeline-container">
          <div className="timeline-line"></div>
          {[
            { year: "2020", title: "Zoology Investigator", desc: "Deciphering cellular communication and metabolic resilience protocols." },
            { year: "2022", title: "Android Architect", desc: "Injecting bio-inspired stability into reactive mobile ecosystems." },
            { year: "2024", title: "Prompt Godfather", desc: "Engineering high-intent neural extensions for large language models." }
          ].map((item, i) => (
            <div key={i} className="timeline-node reveal">
              <div className="timeline-box glass">
                <h4 className="gradient-text" style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{item.year}</h4>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>{item.title}</h3>
                <p style={{ opacity: 0.7 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio Grid */}
      <section id="work" className="container">
        <div className="section-title reveal">
          <h2 className="gradient-text" style={{ fontSize: '3.5rem', marginBottom: '4rem' }}>Neural Artifacts</h2>
        </div>
        <div className="project-grid">
          {projects.map((p) => (
            <div key={p.id} className="project-card glass reveal" onClick={() => setSelectedProject(p)}>
              <div className="project-thumbnail">
                <img src={p.image} alt={p.title} />
              </div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>{p.title}</h3>
              <p style={{ opacity: 0.6, fontSize: '0.95rem' }}>{p.desc}</p>
              <div style={{ marginTop: '2rem', color: 'var(--primary-accent)', fontWeight: '800', fontSize: '0.75rem', letterSpacing: '0.2em' }}>METABOLIZE SIGNAL →</div>
            </div>
          ))}
        </div>
      </section>

      {/* Connect Interface */}
      <section id="connect" className="container">
        <div className="section-title reveal" style={{ textAlign: 'center' }}>
          <h2 className="gradient-text" style={{ fontSize: '3.5rem', marginBottom: '4rem' }}>Neural Connectivity</h2>
        </div>
        <div className="glass reveal" style={{ maxWidth: '800px', margin: '0 auto', padding: '5rem' }}>
          <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="form-group"><input type="text" required placeholder="IDENTIFIER (NAME)" style={{ width: '100%', padding: '1.5rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border)', borderRadius: '1rem', color: '#fff', fontSize: '0.9rem', outline: 'none' }} /></div>
            <div className="form-group"><input type="email" required placeholder="SYNAPSE SOURCE (EMAIL)" style={{ width: '100%', padding: '1.5rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border)', borderRadius: '1rem', color: '#fff', fontSize: '0.9rem', outline: 'none' }} /></div>
            <div className="form-group"><textarea required rows="6" placeholder="TRANSMISSION DATA..." style={{ width: '100%', padding: '1.5rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border)', borderRadius: '1rem', color: '#fff', fontSize: '0.9rem', outline: 'none', resize: 'none' }}></textarea></div>
            <button type="submit" disabled={formStatus === 'sending'} className="btn btn-accent" style={{ width: '100%', opacity: formStatus === 'sending' ? 0.4 : 1 }}>
              {formStatus === 'sending' ? 'Sending Signal...' : 'Initiate Transmission'}
            </button>
          </form>
        </div>
      </section>

      {/* Modals & Socials */}
      <div className={`modal-overlay ${selectedProject ? 'active' : ''}`} onClick={() => setSelectedProject(null)}>
        {selectedProject && (
          <div className="modal-canvas glass" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedProject(null)} style={{ position: 'absolute', top: '2.5rem', right: '2.5rem', background: 'transparent', border: 'none', color: '#fff', fontSize: '2rem', cursor: 'none' }}>×</button>
            <h2 className="gradient-text glow-text" style={{ fontSize: '4rem', marginBottom: '2rem' }}>{selectedProject.title}</h2>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
              {selectedProject.tech.map(t => <span key={t} style={{ padding: '0.6rem 1.4rem', background: 'rgba(61, 220, 132, 0.1)', border: '1px solid var(--primary-accent)', borderRadius: '50px', fontSize: '0.7rem', fontWeight: '900', color: 'var(--primary-accent)' }}>{t}</span>)}
            </div>
            <p style={{ fontSize: '1.3rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>{selectedProject.fullDesc}</p>
            <div style={{ marginTop: '4rem', display: 'flex', gap: '2rem' }}>
              <a href={selectedProject.links.github} target="_blank" className="btn btn-accent">Decrypt Source</a>
              <a href={selectedProject.links.demo} className="glass" style={{ padding: '1.4rem 3.5rem', borderRadius: '100px', fontWeight: '800', color: '#fff', fontSize: '0.9rem', border: '1px solid var(--glass-border)' }}>Observe Organism</a>
            </div>
          </div>
        )}
      </div>

      <div className="social-rail">
        <a href="https://github.com/dsingh92342" target="_blank" className="rail-link">GitHub</a>
        <a href="#" className="rail-link">LinkedIn</a>
        <a href="#" className="rail-link">X / Twitter</a>
      </div>

      <footer style={{ padding: '8rem 0', textAlign: 'center', opacity: 0.1, letterSpacing: '0.5em', fontSize: '0.7rem' }}>
        <p>&copy; 2026 DSINGH • ECOSYSTEM INTEGRITY VERIFIED</p>
      </footer>
    </div >
  )
}

export default App
