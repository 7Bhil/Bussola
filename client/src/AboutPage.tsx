import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AboutSection from './AboutSection';
import Navbar from './Navbar';
import Footer from './Footer';
import { Folder, FileText, Download } from 'lucide-react';

const resources = [
  {
    title: 'Rapport de capitalisation RESPECT',
    file: '/RAPPORT_DE_CAPITALISATION__RESPECT_BUSOLA2026_VF.pdf'
  },
  {
    title: 'Règlement Intérieur ONG Busola',
    file: '/Règlement_Interieur_ONG_BUSOLA_1.pdf'
  },
  {
    title: 'Politique PEAHS',
    file: '/PEAHS_Busola_hv3fXKQ.pdf'
  },
  {
    title: 'Statuts de l\'ONG Busola',
    file: '/STATUTS.pdf'
  }
];

export default function AboutPage() {
  useEffect(() => {
    if (window.WOW) new window.WOW().init();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="wrapper">
      {/* Navbar */}
      <Navbar />

      {/* Premium Hero Header Banner */}
      <div
        className="container-fluid position-relative d-flex align-items-center justify-content-center text-white py-5 shadow-sm"
        style={{
          minHeight: '500px',
          background: `linear-gradient(135deg, rgba(39, 100, 174, 0.85) 0%, rgba(39, 176, 116, 0.85) 100%), url('/optimized/about.webp') center/cover`,
          paddingTop: '120px',
          paddingBottom: '60px',
          overflow: 'hidden'
        }}
      >
        {/* Subtle decorative circles */}
        <div className="position-absolute bg-white rounded-circle" style={{ width: '200px', height: '200px', top: '-100px', left: '-100px', opacity: 0.08 }}></div>
        <div className="position-absolute bg-white rounded-circle" style={{ width: '300px', height: '300px', bottom: '-150px', right: '-150px', opacity: 0.08 }}></div>

        <div className="container text-center position-relative" style={{ zIndex: 2 }}>
          {/* Breadcrumbs */}
          <nav aria-label="breadcrumb" className="mb-3">
            <ol className="breadcrumb justify-content-center mb-0 bg-transparent p-0">
              <li className="breadcrumb-item">
                <Link to="/" className="text-white text-decoration-none opacity-75 hover-opacity-100 fw-medium" style={{ fontSize: '0.95rem' }}>Accueil</Link>
              </li>
              <li className="breadcrumb-item active fw-bold text-warning" aria-current="page" style={{ fontSize: '0.95rem' }}>
                À propos
              </li>
            </ol>
          </nav>

          <h1 className="display-4 fw-black text-uppercase text-white mb-3" style={{ letterSpacing: '2px', textShadow: '0 2px 10px rgba(0,0,0,0.15)' }}>
            À propos
          </h1>
          
          <div className="mx-auto mb-4" style={{ width: '85px', height: '4px', backgroundColor: 'var(--brand-secondary)', borderRadius: '2px' }}></div>

          <p className="lead text-white opacity-95 mx-auto" style={{ maxWidth: '850px', fontSize: '1.15rem', lineHeight: '1.7', textShadow: '0 1px 5px rgba(0,0,0,0.1)' }}>
            Découvrez notre histoire, notre vision et les valeurs qui animent notre engagement au quotidien pour le développement communautaire.
          </p>
        </div>
      </div>

      {/* Contenu de la page */}
      <AboutSection />

      {/* Resources Content added to About page - Split Card Design */}
      <div className="container-fluid py-5 bg-white" style={{ minHeight: '40vh' }}>
        <div className="container py-4">
          <div 
            className="row g-0 align-items-center wow fadeInUp" 
            data-wow-delay="0.1s"
            style={{ 
              backgroundColor: '#faf6ed', 
              borderRadius: '24px', 
              overflow: 'hidden',
              boxShadow: '0 8px 30px rgba(0,0,0,0.03)',
              border: '1px solid rgba(245, 159, 35, 0.08)'
            }}
          >
            {/* Left Column: Title and Description */}
            <div className="col-lg-5 p-5 d-flex flex-column justify-content-center">
              <div className="d-flex align-items-center mb-3">
                <Folder className="me-2 text-warning" size={28} style={{ fill: 'var(--brand-secondary)', opacity: 0.15, color: 'var(--brand-secondary)' }} />
                <h2 
                  className="fw-bold mb-0 text-primary" 
                  style={{ 
                    fontSize: '2.2rem', 
                    fontFamily: '"Barlow Condensed", sans-serif',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    color: 'var(--brand-primary)'
                  }}
                >
                  Nos ressources
                </h2>
              </div>
              <p className="text-muted mb-0" style={{ fontSize: '1.05rem', lineHeight: '1.6', maxWidth: '380px' }}>
                Accédez à nos documents officiels : rapport de capitalisation, règlement intérieur et politique de protection.
              </p>
            </div>

            {/* Right Column: Interactive Document List */}
            <div className="col-lg-7 p-5" style={{ borderLeft: '1px solid rgba(0,0,0,0.03)' }}>
              <div className="d-flex flex-column gap-3">
                {resources.map((res, i) => (
                  <a 
                    key={i} 
                    href={res.file} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="d-flex align-items-center justify-content-between p-3 bg-white text-decoration-none shadow-sm transition-all"
                    style={{ 
                      borderRadius: '16px', 
                      border: '1px solid rgba(0,0,0,0.04)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = '0 10px 20px rgba(39, 100, 174, 0.08)';
                      e.currentTarget.style.borderColor = 'var(--brand-primary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 .125rem .25rem rgba(0,0,0,.075)';
                      e.currentTarget.style.borderColor = 'rgba(0,0,0,0.04)';
                    }}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div 
                        className="d-flex align-items-center justify-content-center rounded-circle text-white flex-shrink-0"
                        style={{ width: '46px', height: '46px', backgroundColor: 'var(--brand-primary)' }}
                      >
                        <FileText size={20} />
                      </div>
                      <span className="fw-bold text-dark" style={{ fontSize: '1rem', letterSpacing: '-0.2px' }}>
                        {res.title}
                      </span>
                    </div>
                    <div className="d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '36px', height: '36px' }}>
                      <Download size={18} style={{ color: 'var(--brand-secondary)' }} />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
