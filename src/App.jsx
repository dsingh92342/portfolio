import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [particles, setParticles] = useState([]);

  // Scroll Progress Logic
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolledPercent = (winScroll / height) * 100;
      setScrollProgress(scrolledPercent);
      setScrolled(winScroll > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Custom Cursor Logic
  useEffect(() => {
    const moveCursor = (e) => {
      if (cursorRef.current && followerRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX - 10}px, ${e.clientY - 10}px, 0)`;
        followerRef.current.style.transform = `translate3d(${e.clientX - 20}px, ${e.clientY - 20}px, 0)`;
      }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  // Intersection Observer for Reveal Animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal, .stagger-container').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // DNA Particles Setup
  useEffect(() => {
    const newParticles = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      size: Math.random() * 600 + 200,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: Math.random() > 0.6 ? 'var(--primary-accent)' : 'var(--secondary-accent)',
      delay: Math.random() * -20,
      duration: Math.random() * 15 + 15
    }));
    setParticles(newParticles);
  }, []);

  const projects = [
    {
      title: "Udhar Saathi",
      image: "/udhar-saathi.png",
      desc: "A premium Android ecosystem for micro-credit management, bridging traditional bookkeeping with modern architecture.",
      tags: ["Kotlin", "Compose", "MVVM", "Room"],
      link: "#"
    },
    {
      title: "Neural Content Engine",
      image: "/neural-engine.png",
      desc: "Architected high-intent AI response systems for enterprise automation using precision prompt engineering.",
      tags: ["AI", "GenAI", "NLP", "Python"],
      link: "#"
    },
    {
      title: "Bio-Logic Systems",
      image: "/biologic-systems.png",
      desc: "Mapping cellular communication protocols to distributed software systems for resilient, adaptive services.",
      tags: ["Zoology", "System Design", "Go"],
      link: "#"
    }
  ];

  const skills = [
    "Android (Kotlin/Jetpack)", "Clean Architecture", "UI/UX Motion",
    "AI Prompt Engineering", "Zoology Research", "Reactive Systems",
    "Node.js/TypeScript", "CSS Glassmorphism", "Git Workflow", "Vector DBs", "LLM Orchestration"
  ];

  return (
    <div className="portfolio-v4">
      {/* Scroll Progress Bar */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>

      {/* Custom Neural Cursor */}
      <div ref={cursorRef} className="custom-cursor"></div>
      <div ref={followerRef} className="custom-cursor-follower"></div>

      {/* Dynamic Navbar */}
      <nav className={`navbar glass ${scrolled ? 'pulse' : ''}`}>
        <a href="#home" className="nav-link">Home</a>
        <a href="#about" className="nav-link">Bio</a>
        <a href="#projects" className="nav-link">Work</a>
        <a href="#skills" className="nav-link">Stack</a>
      </nav>

      {/* Hero Section */}
      <header id="home" className="hero">
        <div className="dna-bg">
          {particles.map(p => (
            <div
              key={p.id}
              className="dna-circle float"
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
                left: `${p.x}%`,
                top: `${p.y}%`,
                background: p.color,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
                filter: 'blur(100px)',
                opacity: 0.12
              }}
            ></div>
          ))}
        </div>

        <div className="container reveal">
          <h1 className="gradient-text glow-text">DSINGH</h1>
          <p style={{ letterSpacing: '0.05em' }}>Android Architect & Zoology Specialist bridging the gap between biological systems and digital logic.</p>
          <div className="hero-btns" style={{ marginTop: '3rem' }}>
            <a href="#projects" className="btn btn-primary">Enter The Ecosystem</a>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="container">
        <div className="section-title reveal">
          <h2 className="gradient-text">Biological Logic</h2>
          <p>The code of life meets the life of code.</p>
        </div>
        <div className="glass reveal" style={{ padding: '4rem', maxWidth: '1000px', margin: '0 auto', border: '1px solid rgba(61, 220, 132, 0.2)' }}>
          <p style={{ fontSize: '1.4rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            My transition from <span style={{ color: 'var(--secondary-accent)', fontWeight: '600' }}>Zoology</span> to Android Development isn't a change of field—it's a change of medium.
            Nature is the most optimized engineer. I apply those patterns of efficiency and precision to
            mobile architectures, creating apps that are reactive, efficient, and resilient.
          </p>
          <br />
          <p style={{ fontSize: '1.4rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            As the <span className="gradient-text glow-text" style={{ fontWeight: '900', letterSpacing: '0.1em' }}>GODFATHER OF PROMPT ENGINEERING</span>,
            I use AI as a neural extension, accelerating the bridge between thought and implementation with biological precision.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section id="projects" className="container">
        <div className="section-title reveal">
          <h2 className="gradient-text">Neural Artifacts</h2>
          <p>High-end solutions for modern challenges.</p>
        </div>
        <div className="grid stagger-container">
          {projects.map((p, i) => (
            <div key={i} className="project-card glass">
              <div className="project-image-container">
                <img src={p.image} alt={p.title} className="project-image" />
              </div>
              <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary-accent)', fontSize: '1.8rem', fontWeight: '800' }}>{p.title}</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.1rem', fontWeight: '300' }}>{p.desc}</p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {p.tags.map(t => <span key={t} className="tech-tag">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="container">
        <div className="section-title reveal">
          <h2 className="gradient-text">The Neural Stack</h2>
        </div>
        <div className="stagger-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem' }}>
          {skills.map(s => (
            <span key={s} className="glass tech-tag-premium" style={{ padding: '1.2rem 2.8rem', borderRadius: '99px', fontSize: '1.1rem', fontWeight: '700', letterSpacing: '0.05em', transition: 'all 0.4s ease' }}>
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '8rem 0', textAlign: 'center', opacity: '0.3', fontSize: '0.8rem', letterSpacing: '0.3em' }}>
        <p>&copy; 2026 DSINGH • ENGINEERED WITH GOOGLE ANTIGRAVITY PRECISION</p>
      </footer>

      <style dangerouslySetInnerHTML={{
        __html: `
        .tech-tag-premium:hover {
          background: rgba(61, 220, 132, 0.1);
          border-color: var(--primary-accent);
          color: var(--primary-accent);
          transform: translateY(-10px) scale(1.05);
          box-shadow: 0 10px 30px rgba(61, 220, 132, 0.2);
        }
      `}} />
    </div>
  )
}

export default App
