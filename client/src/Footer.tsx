import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Linkedin, Twitter, Youtube, MapPin, Phone, Mail, Code2 } from 'lucide-react';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      const API_URL = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${API_URL}/api/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setNewsletterStatus({ type: 'success', message: data.message });
        setEmail('');
      } else {
        setNewsletterStatus({ type: 'error', message: data.message });
      }
    } catch (error) {
      setNewsletterStatus({ type: 'error', message: 'Erreur de connexion au serveur.' });
    }

    setTimeout(() => setNewsletterStatus({ type: null, message: '' }), 5000);
  };

  return (
    <footer 
      id="footer" 
      className="container-fluid footer pt-4 pb-0 bg-primary wow fadeIn position-relative" 
      data-wow-delay="0.1s" 
      style={{ 
        borderTop: '6px solid #f59e0b',
        backgroundImage: 'url(/optimized/motif-logo.webp)',
        backgroundSize: 'auto',
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat'
      }}
    >
      {/* Deep blue overlay with strong contrast */}
      <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: 'rgba(15, 45, 85, 0.95)', zIndex: 0 }}></div>
      
      <div className="container pt-4 pb-4 position-relative" style={{ zIndex: 1 }}>
        <div className="row g-5">
          <div className="col-lg-4 col-md-6">
            <div className="mb-4">
              <img className="img-fluid w-75" src="/logo.png" style={{ filter: "brightness(0) invert(1)" }} alt="Logo Busola" />
            </div>
            <p className="text-white fs-6 mb-4 leading-relaxed opacity-90">
              Depuis 2020, nous œuvrons aux côtés des femmes et des jeunes du Nord-Bénin pour construire un avenir de dignité, d'égalité et de paix.
            </p>
            <div className="d-flex pt-2">
              {[
                { icon: <Facebook size={20} />, url: 'https://www.facebook.com/profile.php?id=100064788966440' },
                { icon: <Linkedin size={20} />, url: 'https://www.linkedin.com/company/ong-busola/' },
                { icon: <Twitter size={20} />, url: '#' },
                { icon: <Youtube size={20} />, url: '#' }
              ].map((s, i) => (
                <a key={i} className="btn btn-square btn-outline-light rounded-circle me-2 d-flex align-items-center justify-content-center transition-all hover-up" 
                   href={s.url} style={{ width: '45px', height: '45px' }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <h4 className="text-white fw-bold mb-4 border-bottom border-warning pb-2 d-inline-block">Contact Rapide</h4>
            <p className="mb-3 d-flex align-items-start text-white"><MapPin className="me-3 text-warning shrink-0" size={20} /> <span className="text-white">Parakou, Quartier Arafat, <br />République du Bénin</span></p>
            <p className="mb-3 d-flex align-items-center text-white"><Phone className="me-3 text-warning shrink-0" size={20} /> <span className="text-white">+229 01 90 44 46 90</span></p>
            <p className="mb-3 d-flex align-items-center"><a href="mailto:ongbusola@gmail.com" className="text-white text-decoration-none hover-warning"><Mail className="me-3 text-warning shrink-0" size={20} /> ongbusola@gmail.com</a></p>
          </div>
          <div className="col-lg-2 col-md-6">
            <h4 className="text-white fw-bold mb-4 border-bottom border-warning pb-2 d-inline-block">Navigation</h4>
            <Link className="btn btn-link text-white text-decoration-none mb-2 d-block text-start ps-0 hover-warning" to="/about">À Propos</Link>
            <Link className="btn btn-link text-white text-decoration-none mb-2 d-block text-start ps-0 hover-warning" to="/actions">Nos Actions</Link>
            <Link className="btn btn-link text-white text-decoration-none mb-2 d-block text-start ps-0 hover-warning" to="/team">Notre Équipe</Link>
            <Link className="btn btn-link text-white text-decoration-none mb-2 d-block text-start ps-0 hover-warning" to="/galerie">Galerie</Link>
            <Link className="btn btn-link text-white text-decoration-none mb-2 d-block text-start ps-0 hover-warning" to="/actualites">Actualités</Link>
            <Link className="btn btn-link text-white text-decoration-none d-block text-start ps-0 hover-warning" to="/contact">Contact</Link>
          </div>
          <div className="col-lg-3 col-md-6">
            <h4 className="text-white fw-bold mb-4 border-bottom border-warning pb-2 d-inline-block">Newsletter</h4>
            <p className="text-white small mb-4">Restez informé de nos impacts mensuels en vous inscrivant.</p>
            
            {newsletterStatus.type && (
              <div className={`alert alert-${newsletterStatus.type === 'success' ? 'success' : 'danger'} p-2 small mb-3`}>
                {newsletterStatus.message}
              </div>
            )}

            <form onSubmit={handleNewsletterSubmit} className="position-relative w-100">
              <input 
                className="form-control bg-white text-dark w-100 py-3 ps-4 pe-5 rounded-pill shadow-sm" 
                type="email" 
                placeholder="Votre email..." 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-warning text-dark fw-bold py-2 px-4 position-absolute top-0 end-0 mt-1 me-1 rounded-pill">S'inscrire</button>
            </form>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="position-relative" style={{ zIndex: 1, backgroundColor: '#091c36', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="container py-3">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start mb-2 mb-md-0">
              <span className="text-white fw-medium small">
                © {new Date().getFullYear()} <span className="text-warning fw-bold">ONG BUSOLA</span>. Tous droits réservés.
              </span>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <div className="footer-menu small">
                <a href="#!" className="text-white-50 text-decoration-none me-3 hover-white">Confidentialité</a>
                <a href="#!" className="text-white-50 text-decoration-none me-3 hover-white">Mentions Légales</a>
                <a href="#!" className="text-white-50 text-decoration-none hover-white">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── HIGH CONTRAST AUTHOR CREDITS BAR ── */}
      <div className="position-relative" style={{ zIndex: 1, backgroundColor: '#030a14', borderTop: '2px solid #f59e0b' }}>
        <div className="container py-3">
          <div className="d-flex flex-wrap align-items-center justify-content-center gap-2 text-center">
            <Code2 size={18} className="text-warning me-1" />
            <span className="text-white font-weight-bold" style={{ fontSize: '0.9rem', letterSpacing: '0.3px' }}>
              Conçu &amp; développé par :
            </span>

            <a
              href="https://7bhil.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="badge bg-warning text-dark px-3 py-2 text-decoration-none fw-bold fs-6 shadow-sm rounded-pill ms-1 transition-all hover-scale"
              style={{ letterSpacing: '0.5px' }}
            >
              CHITOU Bhilal ↗
            </a>

            <span className="text-warning font-weight-bold mx-1">&amp;</span>

            <a
              href="https://portfolio-jolidon-v2.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="badge bg-warning text-dark px-3 py-2 text-decoration-none fw-bold fs-6 shadow-sm rounded-pill transition-all hover-scale"
              style={{ letterSpacing: '0.5px' }}
            >
              HOUGUE Jolidon ↗
            </a>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
