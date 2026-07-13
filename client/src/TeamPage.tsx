import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { ClipboardCheck, Settings, Briefcase } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  description: string;
  photo: string;
  email?: string;
  contact?: string;
  facebook?: string;
  linkedin?: string;
  twitter?: string;
}

export default function TeamPage() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    if (window.WOW) new window.WOW().init();
    window.scrollTo(0, 0);
  }, []);

  const team: TeamMember[] = [
    {
      name: "Sybgath SANNI",
      role: "Présidente du Conseil d’Administration",
      photo: "/optimized/pca.webp",
      description: "Pionnière de la naissance de l'ONG BUSOLA, est une figure remarquable, dotée d'un esprit brillant, d'un talent indéniable et d'un esprit innovant. En tant qu'entrepreneuse émérite, elle a fondé plusieurs entreprises prospères telles que BUSOLA BUILDINGS SARL, SUPERMARCHÉ CHANCE GLORY et le restaurant AFRICAN'S DELICES by SYB. En tant que gestionnaire de projets de formation, Sybgath se spécialise dans le domaine du Droit à la Santé Sexuelle et Reproductive (DSSR) ainsi que dans les..."
    },
    {
      name: "Alain ASSANKPON",
      role: "Président d'honneur",
      photo: "/optimized/ph.webp",
      description: ""
    },
    {
      name: "BOUKO Chabi Dramane",
      role: "Président du Conseil de Surveillance",
      photo: "/optimized/pcs.webp",
      description: ""
    },
    {
      name: "Abouyaïdou MAMA",
      role: "Directeur Exécutif",
      photo: "/optimized/de.webp",
      email: "mamaabouyaidou22@gmail.com",
      description: "MAMA Abouyaïdou est doctorant en relations internationales à l’Université de Parakou (Bénin), spécialisé en sécurité internationale, cohésion sociale et prévention du terrorisme au Sahel. Fort de plus de huit années d’expérience, il a coordonné et supervisé des projets communautaires majeurs financés par des partenaires internationaux tels que l’UNICEF, l’Union européenne et CARE International. Coordonnateur et Directeur exécutif de l’ONG Busola, il œuvre dans les domaines de la paix, des VBG, du développement rural et de la santé sexuelle et reproductive. Assistant de recherche et enseignant universitaire, il est certifié par le Peace Operations Training Institute des Nations Unies. Sa vision est de transformer la recherche en action pour une paix durable et inclusive."
    },
    {
      name: "Fadel KASSALI",
      role: "Assistant Projet",
      photo: "/optimized/ap.webp",
      email: "kassalifadel4@gmail.com",
      description: ""
    },
    {
      name: "Zoulfath ZIME ",
      role: "Chargé de Communauté ",
      photo: "/optimized/cc.webp",
      description: ""
    }
  ];

  return (
    <div className="wrapper">
      <Navbar />

      {/* Premium Hero Header Banner */}
      <div
        className="container-fluid position-relative d-flex align-items-center justify-content-center text-white py-5 shadow-sm"
        style={{
          minHeight: '500px',
          background: `linear-gradient(135deg, rgba(39, 100, 174, 0.85) 0%, rgba(245, 159, 35, 0.85) 100%), url('/optimized/team-3.webp') center/cover`,
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
              <li className="breadcrumb-item">
                <Link to="/about" className="text-white text-decoration-none opacity-75 hover-opacity-100 fw-medium" style={{ fontSize: '0.95rem' }}>À propos</Link>
              </li>
              <li className="breadcrumb-item active fw-bold text-warning" aria-current="page" style={{ fontSize: '0.95rem' }}>
                Notre équipe
              </li>
            </ol>
          </nav>

          <h1 className="display-4 fw-black text-uppercase text-white mb-3" style={{ letterSpacing: '2px', textShadow: '0 2px 10px rgba(0,0,0,0.15)' }}>
            Notre équipe
          </h1>
          
          <div className="mx-auto mb-4" style={{ width: '85px', height: '4px', backgroundColor: 'var(--brand-tertiary)', borderRadius: '2px' }}></div>

          <p className="lead text-white opacity-95 mx-auto" style={{ maxWidth: '850px', fontSize: '1.15rem', lineHeight: '1.7', textShadow: '0 1px 5px rgba(0,0,0,0.1)' }}>
            Rencontrez les personnes engagées et passionnées qui travaillent chaque jour pour la réalisation des objectifs de l'ONG Busola.
          </p>
        </div>
      </div>

      {/* Blue Sub-banner */}
      <div className="container-fluid p-0 d-flex position-relative shadow-sm" style={{ backgroundColor: 'var(--brand-primary)', minHeight: '120px' }}>
        <div className="container d-flex align-items-center justify-content-center text-white text-center px-4" style={{ minHeight: '120px' }}>
          <h5 className="mb-0 fw-bold" style={{ fontSize: '1.25rem', lineHeight: 1.5 }}>
             - Contribuer a l'émergence des dynamiques du développement communautaire
          </h5>
        </div>
        <div 
          className="d-none d-lg-flex flex-column align-items-center justify-content-center position-absolute end-0 h-100"
          style={{ width: '80px', backgroundColor: 'var(--brand-secondary)', writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}
        >
          <span className="text-white fw-bold" style={{ fontSize: '1rem', letterSpacing: '1px' }}>Découvrez</span>
        </div>
      </div>

      {/* Green Rolling Band */}
      <div 
        className="container-fluid bg-tertiary text-white py-3 overflow-hidden shadow-sm"
        style={{ whiteSpace: 'nowrap', zIndex: 5 }}
      >
        <marquee behavior="scroll" direction="left" scrollamount="6" style={{ fontSize: '1.05rem', fontWeight: 'bold', letterSpacing: '0.5px' }}>
          {[1, 2, 3, 4].map(i => (
            <span key={i} className="mx-5 text-uppercase">
              L'ONG BUSOLA EST UNE ORGANISATION STRUCTURÉE, DOTÉE DE PROCÉDURES CLAIRES QUI GARANTISSENT UNE GESTION RIGOUREUSE ET REDEVABLE.
            </span>
          ))}
        </marquee>
      </div>

      {/* Organes de Gouvernance */}
      <div className="container-fluid py-5" style={{ backgroundColor: '#faf9f6' }}>
        <div className="container py-4">
          <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: '800px' }}>
            <div className="d-flex align-items-center justify-content-center mb-3">
              <div style={{ height: "1px", background: "var(--brand-secondary)", width: "40px" }}></div>
              <span className="text-uppercase mx-2 fw-bold" style={{ color: 'var(--brand-secondary)', fontSize: '0.9rem', letterSpacing: '2px' }}>NOTRE STRUCTURE</span>
              <div style={{ height: "1px", background: "var(--brand-secondary)", width: "40px" }}></div>
            </div>
            <h2 className="fw-black mb-4 text-uppercase" style={{ lineHeight: 1.2, fontSize: '2.5rem', color: 'var(--brand-text)', fontFamily: '"Barlow Condensed", sans-serif' }}>
              Organes de Gouvernance
            </h2>
            <p className="text-muted" style={{ fontSize: '1.05rem' }}>
              La structure organisationnelle de l’ONG Busola garantit l’orientation stratégique, la rigueur de gestion et l’efficacité de nos actions sur le terrain.
            </p>
          </div>

          <div className="row g-4 justify-content-center">
            {/* Card 1: Assemblée Générale */}
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
              <div className="h-100 p-4 bg-white border shadow-sm transition-all" 
                   style={{ 
                     borderTop: '5px solid var(--brand-primary)', 
                     transition: 'all 0.3s ease',
                     borderRadius: '16px'
                   }}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.transform = 'translateY(-8px)';
                     e.currentTarget.style.boxShadow = '0 15px 30px rgba(39, 100, 174, 0.15)';
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.transform = 'translateY(0)';
                     e.currentTarget.style.boxShadow = '0 .125rem .25rem rgba(0,0,0,.075)';
                   }}
              >
                <div className="d-flex align-items-center justify-content-center rounded-circle mb-4" 
                     style={{ width: '70px', height: '70px', backgroundColor: '#eef4fc' }}>
                  <ClipboardCheck size={32} style={{ color: 'var(--brand-primary)' }} />
                </div>
                <div className="d-flex align-items-center gap-2 mb-3">
                  <h4 className="fw-bold mb-0 text-dark" style={{ fontSize: '1.35rem', fontFamily: '"Barlow Condensed", sans-serif', textTransform: 'uppercase' }}>
                    Assemblée Générale
                  </h4>
                </div>
                <p className="text-muted mb-0" style={{ fontSize: '0.95rem', lineHeight: '1.6', textAlign: 'justify' }}>
                  Organe suprême garantissant l'orientation stratégique et la légitimité des choix organisationnels.
                </p>
              </div>
            </div>

            {/* Card 2: Conseil d'Administration */}
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.2s">
              <div className="h-100 p-4 bg-white border shadow-sm transition-all" 
                   style={{ 
                     borderTop: '5px solid var(--brand-secondary)', 
                     transition: 'all 0.3s ease',
                     borderRadius: '16px'
                   }}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.transform = 'translateY(-8px)';
                     e.currentTarget.style.boxShadow = '0 15px 30px rgba(245, 159, 35, 0.15)';
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.transform = 'translateY(0)';
                     e.currentTarget.style.boxShadow = '0 .125rem .25rem rgba(0,0,0,.075)';
                   }}
              >
                <div className="d-flex align-items-center justify-content-center rounded-circle mb-4" 
                     style={{ width: '70px', height: '70px', backgroundColor: '#fdf5e8' }}>
                  <Settings size={32} style={{ color: 'var(--brand-secondary)' }} />
                </div>
                <div className="d-flex align-items-center gap-2 mb-3">
                  <h4 className="fw-bold mb-0 text-dark" style={{ fontSize: '1.35rem', fontFamily: '"Barlow Condensed", sans-serif', textTransform: 'uppercase' }}>
                    Conseil d'Administration
                  </h4>
                </div>
                <p className="text-muted mb-0" style={{ fontSize: '0.95rem', lineHeight: '1.6', textAlign: 'justify' }}>
                  Leaders et experts en paix, droit, santé et finances assurant une vision stratégique et une gestion rigoureuse.
                </p>
              </div>
            </div>

            {/* Card 3: Direction Exécutive */}
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
              <div className="h-100 p-4 bg-white border shadow-sm transition-all" 
                   style={{ 
                     borderTop: '5px solid var(--brand-tertiary)', 
                     transition: 'all 0.3s ease',
                     borderRadius: '16px'
                   }}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.transform = 'translateY(-8px)';
                     e.currentTarget.style.boxShadow = '0 15px 30px rgba(59, 177, 67, 0.15)';
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.transform = 'translateY(0)';
                     e.currentTarget.style.boxShadow = '0 .125rem .25rem rgba(0,0,0,.075)';
                   }}
              >
                <div className="d-flex align-items-center justify-content-center rounded-circle mb-4" 
                     style={{ width: '70px', height: '70px', backgroundColor: '#eefcf0' }}>
                  <Briefcase size={32} style={{ color: 'var(--brand-tertiary)' }} />
                </div>
                <div className="d-flex align-items-center gap-2 mb-3">
                  <h4 className="fw-bold mb-0 text-dark" style={{ fontSize: '1.35rem', fontFamily: '"Barlow Condensed", sans-serif', textTransform: 'uppercase' }}>
                    Direction Exécutive
                  </h4>
                </div>
                <p className="text-muted mb-0" style={{ fontSize: '0.95rem', lineHeight: '1.6', textAlign: 'justify' }}>
                  Organe opérationnel intégrant des compétences en gestion, communication, plaidoyer et redevabilité.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Content */}
      <div className="container-fluid py-5 bg-white">
        <div className="container py-5">
          <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: '800px' }}>
            <div className="d-flex align-items-center justify-content-center mb-3">
              <div style={{ height: "1px", background: "var(--brand-tertiary)", width: "40px" }}></div>
              <span className="text-uppercase mx-2 fw-bold" style={{ color: 'var(--brand-tertiary)', fontSize: '0.9rem', letterSpacing: '2px' }}>LA TEAM BUSOLA</span>
              <div style={{ height: "1px", background: "var(--brand-tertiary)", width: "40px" }}></div>
            </div>
            <h1 className="fw-black mb-4" style={{ lineHeight: 1.2, fontSize: '2.5rem', color: 'var(--brand-text)' }}>
              <span className="text-uppercase fw-black" style={{ color: 'var(--brand-text)', letterSpacing: '-0.5px' }}>Découvrez quelques membres du C.A.</span><br/>
              <span className="text-uppercase fw-black" style={{ color: 'var(--brand-text)', letterSpacing: '-0.5px' }}>et la Direction Exécutive de BUSOLA</span>
            </h1>
          </div>
          
          <h3 className="fw-bold mb-4 text-center wow fadeInUp" data-wow-delay="0.1s" style={{ color: 'var(--brand-primary)' }}>Conseil d'Administration (C.A.)</h3>
          <div className="row g-4 justify-content-center mb-5">
            {team.filter(m => m.name !== 'Zoulfath ZIME ' && m.name !== 'Fadel KASSALI' && m.name !== 'Abouyaïdou MAMA').map((m, i) => (
              <div key={i} className="col-md-6 col-lg-4 mb-4 wow fadeInUp" data-wow-delay={`${0.1 * (i + 1)}s`}>
                <div className="team-item bg-white h-100 d-flex flex-column shadow-sm" style={{ border: '1px solid #f0f0f0' }}>
                  <div className="d-flex" style={{ height: '350px' }}>
                    {/* Img Container */}
                    <div className="w-100 position-relative overflow-hidden">
                      <img className="img-fluid w-100 h-100" src={m.photo} style={{ objectFit: 'cover', objectPosition: 'top center' }} alt={m.name}  loading="lazy" decoding="async" />
                    </div>
                    {/* Social Container Beige */}
                    <div className="d-flex flex-column justify-content-end align-items-center py-4 flex-shrink-0" style={{ width: '60px', backgroundColor: '#fcf8ec' }}>
                      <a className="btn btn-primary btn-sm btn-square rounded-0 mb-3" href="#!"><i className="fab fa-facebook-f"></i></a>
                      <a className="btn btn-primary btn-sm btn-square rounded-0" href="#!"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                  </div>
                  {/* Name and Role Section */}
                  <div className="p-4 bg-white d-flex flex-column justify-content-center" style={{ minHeight: '120px' }}>
                    <h5 className="text-primary fw-bold mb-2" style={{ fontSize: '1.2rem' }}>{m.name}</h5>
                    <p className="text-secondary fw-bold mb-0" style={{ fontSize: '0.85rem', textTransform: 'uppercase' }}>{m.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h3 className="fw-bold mb-4 text-center wow fadeInUp" data-wow-delay="0.1s" style={{ color: 'var(--brand-primary)' }}>Direction Exécutive</h3>
          <div className="row g-4 justify-content-center">
            {team.filter(m => m.name === 'Zoulfath ZIME ' || m.name === 'Fadel KASSALI' || m.name === 'Abouyaïdou MAMA').map((m, i) => (
              <div key={i} className="col-md-6 col-lg-4 mb-4 wow fadeInUp" data-wow-delay={`${0.1 * (i + 1)}s`}>
                <div className="team-item bg-white h-100 d-flex flex-column shadow-sm" style={{ border: '1px solid #f0f0f0' }}>
                  <div className="d-flex" style={{ height: '350px' }}>
                    {/* Img Container */}
                    <div className="w-100 position-relative overflow-hidden">
                      <img className="img-fluid w-100 h-100" src={m.photo} style={{ objectFit: 'cover', objectPosition: 'top center' }} alt={m.name}  loading="lazy" decoding="async" />
                    </div>
                    {/* Social Container Beige */}
                    <div className="d-flex flex-column justify-content-end align-items-center py-4 flex-shrink-0" style={{ width: '60px', backgroundColor: '#fcf8ec' }}>
                      <a className="btn btn-primary btn-sm btn-square rounded-0 mb-3" href="#!"><i className="fab fa-facebook-f"></i></a>
                      <a className="btn btn-primary btn-sm btn-square rounded-0" href="#!"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                  </div>
                  {/* Name and Role Section */}
                  <div className="p-4 bg-white d-flex flex-column justify-content-center" style={{ minHeight: '120px' }}>
                    <h5 className="text-primary fw-bold mb-2" style={{ fontSize: '1.2rem' }}>{m.name}</h5>
                    <p className="text-secondary fw-bold mb-0" style={{ fontSize: '0.85rem', textTransform: 'uppercase' }}>{m.role}</p>
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
