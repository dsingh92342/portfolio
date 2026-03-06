import { useState, useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser'
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

  // Loading Screen Timer
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Theme Persistence
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  // EmailJS Logic
  const sendEmail = (e) => {
    e.preventDefault();
    setFormStatus('sending');

    // MOCK SENDING for now - real implementation would use:
    // emailjs.sendForm('SERVICE_ID', 'TEMPLATE_ID', formRef.current, 'PUBLIC_KEY')

    setTimeout(() => {
      setFormStatus('idle');
      showToast("Transmission Successful. Synapse established.");
      e.target.reset();
    }, 1500);
  };

  const showToast = (message) => {
    setToast({ visible: true, message });
    setTimeout(() => setToast({ visible: false, message: '' }), 4000);
  };

  // UI Handlers
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress((winScroll / height) * 100);
      setScrolled(winScroll > 50);
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Cursor & Particles
  useEffect(() => {
    const moveCursor = (e) => {
      if (cursorRef.current && followerRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX - 10}px, ${e.clientY - 10}px, 0)`;
        followerRef.current.style.transform = `translate3d(${e.clientX - 20}px, ${e.clientY - 20}px, 0)`;
      }
    };
    window.addEventListener('mousemove', moveCursor);

    const newParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      size: Math.random() * 600 + 300,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: Math.random() > 0.6 ? 'var(--primary-accent)' : 'var(--secondary-accent)',
      delay: Math.random() * -20,
      duration: Math.random() * 20 + 20
    }));
    setParticles(newParticles);

    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  // Intersection Observer
  useEffect(() => {
    if (loading) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal, .stagger-container').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [loading, selectedProject, theme]);

  const projects = [
    {
      id: 1,
      title: "Udhar Saathi",
      image: "/udhar-saathi.png",
      desc: "A premium Android ecosystem for micro-credit management.",
      fullDesc: "Udhar Saathi is engineered to bridge traditional rural bookkeeping with modern reactive architecture. It features full offline capability with Room DB, Jetpack Compose UI, and a biological synchronization pattern for data consistency. Version 3.0 implements cellular-level state management to ensure zero data loss.",
      tech: ["Kotlin", "Compose", "MVVM", "Room", "Hilt", "WorkManager"],
      links: { github: "#", demo: "#" }
    },
    {
      id: 2,
      title: "Neural Content Engine",
      image: "/neural-engine.png",
      desc: "Architected high-intent AI response systems.",
      fullDesc: "A multi-agent specialized framework for enterprise automation. It uses advanced prompt chaining and vector embeddings to achieve 99.9% accuracy in intent classification. This engine reduces manual review time by 85% across high-scale deployment vectors.",
      tech: ["AI", "GenAI", "Python", "LangChain", "OpenAI", "Pinecone"],
      links: { github: "#", demo: "#" }
    },
    {
      id: 3,
      title: "Bio-Logic Systems",
      image: "/biologic-systems.png",
      desc: "Mapping cellular protocols to distributed software.",
      fullDesc: "A research-driven system architecture that treats microservices as biological cells. It implements self-healing mechanisms and adaptive load balancing based on mitochondrial energy exchange models, successfully simulating metabolic resource allocation.",
      tech: ["Go", "Kubernetes", "gRPC", "Zoology", "Docker", "Istio"],
      links: { github: "#", demo: "#" }
    }
  ];

  return (
    <div className="portfolio-v4">
      {/* Loading Screen */}
      <div className={`loader-wrapper ${!loading ? 'hidden' : ''}`}>
        <div className="loader-helix"></div>
        <div className="loader-text">Metabolizing Logic Assets...</div>
      </div>

      {/* Toast Notification */}
      <div className="toast-container">
        <div className={`toast ${toast.visible ? 'visible' : ''}`}>
          {toast.message}
        </div>
      </div>

      {/* Sidebar Synapses */}
      <div className="social-synapses">
        <a href="https://github.com/dsingh92342" target="_blank" className="social-link">GitHub</a>
        <a href="#" className="social-link">LinkedIn</a>
        <a href="#" className="social-link">X / Twitter</a>
      </div>

      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>
      <div ref={cursorRef} className="custom-cursor"></div>
      <div ref={followerRef} className="custom-cursor-follower"></div>

      {/* Navbar */}
      <nav className={`navbar glass ${scrolled ? 'pulse' : ''}`}>
        <a href="#home" className="nav-link">Home</a>
        <a href="#about" className="nav-link">Bio</a>
        <a href="#projects" className="nav-link">Work</a>
        <button onClick={toggleTheme} className="glass theme-toggle" style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 1.2rem', borderRadius: '50px', color: 'var(--text-primary)', fontWeight: '800', cursor: 'none' }}>
          {theme === 'dark' ? 'CELLULAR' : 'NEURAL'}
        </button>
      </nav>

      {/* Hero */}
      <header id="home" className="hero">
        <div className="dna-bg">
          {particles.map(p => (
            <div key={p.id} className="dna-circle float" style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%`, background: p.color, animationDelay: `${p.delay}s`, animationDuration: `${p.duration}s`, filter: 'blur(120px)', opacity: 0.12 }}></div>
          ))}
        </div>
        <div className="container reveal">
          <h1 className="gradient-text glow-text">DSINGH</h1>
          <p style={{ letterSpacing: '0.05em', fontWeight: '300' }}>Android Architect & Zoology Specialist bridging biological systems with digital logic.</p>
          <div className="hero-btns" style={{ marginTop: '3.5rem' }}>
            <a href="#projects" className="btn btn-primary">Enter The Ecosystem</a>
          </div>
        </div>
      </header>

      {/* Career Evolution (Enhanced Timeline) */}
      <section id="about" className="container">
        <div className="section-title reveal">
          <h2 className="gradient-text">Biological Evolution</h2>
        </div>
        <div className="timeline">
          {[
            { year: "2020", title: "Zoology Research", desc: "Studied metabolic efficiency and cellular signaling protocols." },
            { year: "2022", title: "Android Architect", desc: "Translated biological resilience into reactive Kotlin architectures." },
            { year: "2024", title: "Prompt Godfather", desc: "Engineering high-intent neural extensions for modern AI systems." }
          ].map((item, i) => (
            <div key={i} className="timeline-item reveal">
              <div className="timeline-content glass">
                <h4 className="gradient-text">{item.year}</h4>
                <h3>{item.title}</h3>
                <p style={{ opacity: 0.7 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section id="projects" className="container">
        <div className="section-title reveal">
          <h2 className="gradient-text">Neural Artifacts</h2>
        </div>
        <div className="grid stagger-container">
          {projects.map((p) => (
            <div key={p.id} className="project-card glass" onClick={() => setSelectedProject(p)}>
              <div className="project-image-container">
                <img src={p.image} alt={p.title} className="project-image" />
              </div>
              <h3>{p.title}</h3>
              <p style={{ opacity: 0.6 }}>{p.desc}</p>
              <div style={{ marginTop: '1.5rem', color: 'var(--primary-accent)', fontWeight: '700' }}>Observe Signal →</div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Synapse */}
      <section className="container">
        <div className="section-title reveal">
          <h2 className="gradient-text">Neural Connection</h2>
        </div>
        <div className="glass reveal" style={{ padding: '4rem', maxWidth: '850px', margin: '0 auto' }}>
          <form ref={formRef} onSubmit={sendEmail} className="contact-form">
            <div className="form-group"><input type="text" name="user_name" required placeholder="Designation (Name)" /></div>
            <div className="form-group"><input type="email" name="user_email" required placeholder="Return Synapse (Email)" /></div>
            <div className="form-group"><textarea name="message" required rows="6" placeholder="Transmission Payload..."></textarea></div>
            <button type="submit" disabled={formStatus === 'sending'} className="btn btn-primary" style={{ width: '100%', opacity: formStatus === 'sending' ? 0.5 : 1 }}>
              {formStatus === 'sending' ? 'Sending Signal...' : 'Deploy Transmission'}
            </button>
          </form>
        </div>
      </section>

      {/* Project Modal */}
      <div className={`modal-overlay ${selectedProject ? 'active' : ''}`} onClick={() => setSelectedProject(null)}>
        {selectedProject && (
          <div className="modal-content glass reveal active" onClick={e => e.stopPropagation()}>
            <button className="glass" onClick={() => setSelectedProject(null)} style={{ position: 'absolute', top: '2rem', right: '2rem', border: 'none', color: 'var(--text-primary)', fontSize: '1.5rem', width: '40px', height: '40px', borderRadius: '50%', cursor: 'none' }}>×</button>
            <h2 className="gradient-text glow-text" style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>{selectedProject.title}</h2>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
              {selectedProject.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
            </div>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'var(--text-secondary)' }}>{selectedProject.fullDesc}</p>
            <div style={{ marginTop: '3rem', display: 'flex', gap: '2rem' }}>
              <a href={selectedProject.links.github} className="btn btn-primary">Decrypt Source</a>
              <a href={selectedProject.links.demo} className="glass" style={{ padding: '1.25rem 3rem', borderRadius: '100px', fontWeight: '800' }}>Observe Live</a>
            </div>
          </div>
        )}
      </div>

      <footer style={{ padding: '6rem 0', textAlign: 'center', opacity: '0.2', letterSpacing: '0.3rem' }}>
        <p>&copy; 2026 DSINGH • BIO-DIGITAL ARCHITECT</p>
      </footer>
    </div>
  )
}

export default App
