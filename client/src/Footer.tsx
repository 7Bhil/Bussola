import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Linkedin, Twitter, Youtube, MapPin, Phone, Mail } from 'lucide-react';

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

    // Reset status after 5 seconds
    setTimeout(() => setNewsletterStatus({ type: null, message: '' }), 5000);
  };

  return (
    <footer 
      id="footer" 
      className="container-fluid footer pt-4 pb-4 bg-primary wow fadeIn position-relative" 
      data-wow-delay="0.1s" 
      style={{ 
        borderTop: '8px solid var(--bs-secondary)',
        backgroundImage: 'url(/optimized/motif-logo.webp)',
        backgroundSize: 'auto',
        backgroundPosition: 'center',
        backgroundAttachment: 'scroll',
        backgroundRepeat: 'repeat'
      }}
    >
      {/* Blue overlay for contrast */}
      <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: 'rgba(40, 100, 174, 0.92)', zIndex: 0 }}></div>
      
      <div className="container pt-3 pb-4 position-relative" style={{ zIndex: 1 }}>
        <div className="row g-5">
          <div className="col-lg-4 col-md-6">
            <div className="mb-4">
              <img className="img-fluid w-75" src="/logo.png" style={{ filter: "brightness(0) invert(1)" }} alt="Logo Busola" />
            </div>
            <p className="text-white-50 fs-6 mb-4 leading-relaxed">
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
            <h4 className="text-white fw-bold mb-4">Contact Rapide</h4>
            <p className="mb-3 d-flex align-items-start"><MapPin className="me-3 text-secondary" size={20} /> <span>Parakou, Quartier Arafat, <br />République du Bénin</span></p>
            <p className="mb-3 d-flex align-items-center"><Phone className="me-3 text-secondary" size={20} /> +229 01 90 44 46 90</p>
            <p className="mb-3 d-flex align-items-center"><a href="mailto:ongbusola@gmail.com" className="text-white-50 text-decoration-none"><Mail className="me-3 text-secondary" size={20} /> ongbusola@gmail.com</a></p>
          </div>
          <div className="col-lg-2 col-md-6">
            <h4 className="text-white fw-bold mb-4">Navigation</h4>
            <Link className="btn btn-link text-white-50 text-decoration-none mb-2 d-block text-start" to="/about">À Propos</Link>
            <Link className="btn btn-link text-white-50 text-decoration-none mb-2 d-block text-start" to="/actions">Nos Actions</Link>
            <Link className="btn btn-link text-white-50 text-decoration-none mb-2 d-block text-start" to="/team">Notre Équipe</Link>
            <Link className="btn btn-link text-white-50 text-decoration-none mb-2 d-block text-start" to="/galerie">Galerie</Link>
            <Link className="btn btn-link text-white-50 text-decoration-none mb-2 d-block text-start" to="/actualites">Actualités</Link>
            <Link className="btn btn-link text-white-50 text-decoration-none d-block text-start" to="/contact">Contact</Link>
          </div>
          <div className="col-lg-3 col-md-6">
            <h4 className="text-white fw-bold mb-4">Newsletter</h4>
            <p className="text-white-50 small mb-4">Restez informé de nos impacts mensuels en vous inscrivant.</p>
            
            {newsletterStatus.type && (
              <div className={`alert alert-${newsletterStatus.type === 'success' ? 'success' : 'danger'} p-2 small mb-3`}>
                {newsletterStatus.message}
              </div>
            )}

            <form onSubmit={handleNewsletterSubmit} className="position-relative w-100">
              <input 
                className="form-control bg-transparent border-light w-100 py-3 ps-4 pe-5 text-white" 
                type="email" 
                placeholder="Votre email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2 rounded-pill">S'inscrire</button>
            </form>
          </div>
        </div>
      </div>
      <div className="container py-4 border-top border-secondary">
        <div className="row">
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <span className="text-white-50 small">© {new Date().getFullYear()} <span className="text-secondary fw-bold">ONG BUSOLA</span>. Tous droits réservés.</span>
            <div className="mt-1">
              <span className="text-white-50" style={{ fontSize: '0.75rem' }}>
                Conçu et développé par <a href="https://7bhil.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-secondary text-decoration-none fw-bold">Bhilal CHITOU</a> & <a href="https://jolidonhoungue.pages.dev/" target="_blank" rel="noopener noreferrer" className="text-secondary text-decoration-none fw-bold">HOUNGUE Jolidon</a>
              </span>
            </div>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <div className="footer-menu small">
              <a href="#!" className="text-white-50 text-decoration-none me-3">Confidentialité</a>
              <a href="#!" className="text-white-50 text-decoration-none me-3">Mentions Légales</a>
              <a href="#!" className="text-white-50 text-decoration-none">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
