import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const resources = [
  {
    title: 'Statuts de l’ONG',
    category: 'Gouvernance',
    description: 'Les statuts officiels qui structurent l’organisation et guident nos prises de décision.',
    file: '/STATUTS.pdf',
    updated: '2024'
  },
  {
    title: 'PEAHS',
    category: 'Protection',
    description: "Politique de protection contre l'exploitation, les abus et le harcèlement sexuel.",
    file: '/PEAHS_Busola_hv3fXKQ.pdf',
    updated: '2025'
  },
  {
    title: 'Règlement intérieur',
    category: 'Ressources humaines',
    description: "Le règlement intérieur de Busola ONG pour un environnement de travail respectueux et inclusif.",
    file: '/Règlement_Interieur_ONG_BUSOLA_1.pdf',
    updated: '2025'
  },
  {
    title: 'Rapport de capitalisation RESPECT',
    category: 'Rapports',
    description: 'Capitalisation des résultats du projet RESPECT et des leçons tirées pour l’impact social.',
    file: '/RAPPORT_DE_CAPITALISATION__RESPECT_BUSOLA2026_VF.pdf',
    updated: '2026'
  }
];

export default function ResourcePage() {
  useEffect(() => {
    if (window.WOW) {
      new window.WOW().init();
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="wrapper">
      <Navbar />

      <div
        className="container-fluid position-relative d-flex align-items-center justify-content-center text-white py-5 shadow-sm"
        style={{
          minHeight: '500px',
          background: `linear-gradient(135deg, rgba(40, 100, 174, 0.9) 0%, rgba(39, 176, 116, 0.85) 100%), url('/optimized/hero-slider.webp') center/cover`,
          paddingTop: '120px',
          paddingBottom: '60px',
          overflow: 'hidden'
        }}
      >
        <div className="position-absolute bg-white rounded-circle" style={{ width: '200px', height: '200px', top: '-100px', left: '-100px', opacity: 0.08 }}></div>
        <div className="position-absolute bg-white rounded-circle" style={{ width: '300px', height: '300px', bottom: '-150px', right: '-150px', opacity: 0.08 }}></div>

                <div className="container text-center position-relative" style={{ zIndex: 2 }}>
                  {/* Breadcrumbs */}
                  <nav aria-label="breadcrumb" className="mb-3">
                    <ol className="breadcrumb justify-content-center mb-0 bg-transparent p-0">
                      <li className="breadcrumb-item">
                        <Link to="/" className="text-white text-decoration-none opacity-75 hover-opacity-100 fw-medium" style={{ fontSize: '0.95rem' }}>Accueil</Link>
                      </li>
                      <li className="breadcrumb-item">
                        <Link to="/about" className="text-white text-decoration-none opacity-75 hover-opacity-100 fw-medium" style={{ fontSize: '0.95rem' }}>À propos</Link>
                      </li>
                      <li className="breadcrumb-item active fw-bold text-warning" aria-current="page" style={{ fontSize: '0.95rem' }}>
                        Centre de ressources
                      </li>
                    </ol>
                  </nav>
        
                  <h1 className="display-4 fw-black text-uppercase text-white mb-3" style={{ letterSpacing: '2px', textShadow: '0 2px 10px rgba(0,0,0,0.15)' }}>
                    Centre de ressources
                  </h1>
                  
                  <div className="mx-auto mb-4" style={{ width: '85px', height: '4px', backgroundColor: 'var(--brand-tertiary)', borderRadius: '2px' }}></div>
        
                  <p className="lead text-white opacity-95 mx-auto" style={{ maxWidth: '850px', fontSize: '1.15rem', lineHeight: '1.7', textShadow: '0 1px 5px rgba(0,0,0,0.1)' }}>
                    Tous les documents officiels de Busola ONG
                  </p>
                </div>
      </div>

      <div className="container-fluid bg-white py-5">
        <div className="container py-5">
          <div className="row g-4 mb-5">
            <div className="col-lg-7">
              <div className="row g-3">
                <div className="col-sm-4">
                  <div className="rounded-4 p-3" style={{ background: 'var(--brand-light)', border: '1px solid rgba(40, 100, 174, 0.08)' }}>
                    <div className="text-uppercase fw-bold mb-2" style={{ fontSize: '0.75rem', letterSpacing: '1px', color: 'var(--brand-dark)' }}>
                      Documents
                    </div>
                    <div className="display-6 fw-black" style={{ color: 'var(--brand-dark)' }}>4</div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="rounded-4 p-3" style={{ background: 'var(--brand-light)', border: '1px solid rgba(40, 100, 174, 0.08)' }}>
                    <div className="text-uppercase fw-bold mb-2" style={{ fontSize: '0.75rem', letterSpacing: '1px', color: 'var(--brand-dark)' }}>
                      Catégories
                    </div>
                    <div className="display-6 fw-black" style={{ color: 'var(--brand-dark)' }}>4</div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="rounded-4 p-3" style={{ background: 'var(--brand-light)', border: '1px solid rgba(40, 100, 174, 0.08)' }}>
                    <div className="text-uppercase fw-bold mb-2" style={{ fontSize: '0.75rem', letterSpacing: '1px', color: 'var(--brand-dark)' }}>
                      Format
                    </div>
                    <div className="display-6 fw-black" style={{ color: 'var(--brand-dark)' }}>PDF</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="rounded-4 p-4" style={{ background: 'var(--brand-light)' }}>
                <h5 className="fw-bold mb-3" style={{ color: 'var(--brand-dark)' }}>Pourquoi ce centre ?</h5>
                <ul className="list-unstyled mb-0" style={{ lineHeight: '2', color: 'var(--brand-dark)', opacity: 0.85 }}>
                  <li>• Transparence dans nos actions et nos procédures</li>
                  <li>• Protection et sécurité pour toutes nos équipes</li>
                  <li>• Pilotage clair de nos projets et de nos partenariats</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="row mb-5 justify-content-center">
            <div className="col-12">
              <div className="text-center mx-auto" style={{ maxWidth: '800px' }}>
                <div className="d-flex align-items-center justify-content-center mb-3">
                  <div style={{ height: "1px", background: "var(--brand-secondary)", width: "40px" }}></div>
                  <span className="text-uppercase mx-2 fw-bold" style={{ color: 'var(--brand-secondary)', fontSize: '0.9rem', letterSpacing: '2px' }}>
                    DOCUMENTS OFFICIELS
                  </span>
                  <div style={{ height: "1px", background: "var(--brand-secondary)", width: "40px" }}></div>
                </div>
                <h2 className="fw-black mb-4 text-uppercase" style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)', color: 'var(--brand-text)', lineHeight: '1.05', fontFamily: '"Barlow Condensed", sans-serif' }}>
                  Accédez à nos ressources certifiées
                </h2>
                <p className="text-muted mx-auto" style={{ maxWidth: '700px', lineHeight: '1.8' }}>
                  Chaque document est validé par notre équipe de gouvernance. Cliquez sur « Télécharger » pour ouvrir, enregistrer ou imprimer le PDF de votre choix. Tous les documents sont régulièrement mis à jour pour rester en conformité avec nos engagements.
                </p>
              </div>
            </div>
          </div>

          <div className="row g-4">
            {resources.map((resource, index) => (
              <div key={index} className="col-md-6 col-xl-3 wow fadeInUp" data-wow-delay={`${0.1 + index * 0.08}s`}>
                <div className="h-100 rounded-4 overflow-hidden shadow-sm" style={{ border: '1px solid rgba(40, 100, 174, 0.08)' }}>
                  <div className="p-4 bg-white h-100 d-flex flex-column">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <span className="badge rounded-pill text-uppercase fw-bold" style={{ background: 'var(--brand-light)', color: 'var(--brand-dark)', fontSize: '0.75rem', letterSpacing: '0.8px' }}>
                        {resource.category}
                      </span>
                      <span className="text-muted" style={{ fontSize: '0.8rem' }}>{resource.updated}</span>
                    </div>

                    <h3 className="h5 fw-bold mb-3" style={{ color: 'var(--brand-dark)' }}>{resource.title}</h3>
                    <p className="text-muted mb-4" style={{ flexGrow: 1, lineHeight: '1.75' }}>{resource.description}</p>

                    <div className="mt-auto pt-3 border-top" style={{ borderColor: 'rgba(40, 100, 174, 0.08)' }}>
                      <a href={resource.file} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-100 rounded-pill py-3 fw-bold text-white">
                        Télécharger le PDF
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
