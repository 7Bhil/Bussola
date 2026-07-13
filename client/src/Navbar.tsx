import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { X, Menu, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isAboutGroup = ['/about', '/team', '/galerie', '/ressources'].includes(pathname);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);



  const closeDrawer = () => {
    setDrawerOpen(false);
    setAboutOpen(false);
  };

  return (
    <>
      <div className="nav-bar bg-primary p-0 sticky-top shadow-sm" style={{ zIndex: 1050 }}>
        <nav className="navbar navbar-expand-lg bg-primary navbar-dark py-lg-0 container-fluid px-3 px-lg-5">
          <Link to="/" className="navbar-brand m-0">
            <img width="170" height="50" src="/logo.png" alt="Logo" />
          </Link>

          {/* Desktop Nav */}
          <div className="collapse navbar-collapse d-none d-lg-flex">
            <div className="navbar-nav mx-auto align-items-center">
              <Link to="/" className={`nav-item nav-link ${pathname === '/' ? 'active' : ''}`}>Accueil</Link>

              <div className="nav-item dropdown dropdown-hover">
                <Link
                  to="/about"
                  className={`nav-link dropdown-toggle ${isAboutGroup ? 'active' : ''}`}
                  onClick={(e) => { if (window.innerWidth >= 992) navigate('/about'); }}
                >
                  A propos
                </Link>
                <div className="dropdown-menu border-0 m-0 shadow-sm">
                  <Link to="/team" className="dropdown-item">LA TEAM</Link>
                  <Link to="/galerie" className="dropdown-item">GALERIE</Link>
                  <Link to="/ressources" className="dropdown-item">CENTRE DE RESSOURCES</Link>
                </div>
              </div>

              <Link to="/actions" className={`nav-item nav-link ${pathname.startsWith('/actions') ? 'active' : ''}`}>Nos actions</Link>
              <Link to="/actualites" className={`nav-item nav-link ${pathname.startsWith('/actualites') ? 'active' : ''}`}>Nos actualités</Link>
              <Link to="/contact" className={`nav-item nav-link ${pathname === '/contact' ? 'active' : ''}`}>Contact</Link>
            </div>
            <div className="ms-auto d-none d-lg-flex">
              <Link className="btn btn-secondary m-1 px-3 text-white fw-bold" to="/soutenir" style={{ borderRadius: '7px' }}>Nous soutenir</Link>
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            className="d-flex d-lg-none align-items-center justify-content-center border-0"
            style={{ background: 'transparent', color: '#fff', width: '44px', height: '44px', borderRadius: '8px' }}
            onClick={() => setDrawerOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <Menu size={26} />
          </button>
        </nav>
      </div>

      {/* Overlay */}
      <div
        onClick={closeDrawer}
        style={{
          position: 'fixed', inset: 0, zIndex: 1199,
          background: 'rgba(0,0,0,0.45)',
          opacity: drawerOpen ? 1 : 0,
          pointerEvents: drawerOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
          backdropFilter: 'blur(2px)',
        }}
      />

      {/* Right Drawer */}
      <div
        style={{
          position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 1200,
          width: '280px',
          background: '#fff',
          boxShadow: '-8px 0 40px rgba(0,0,0,0.18)',
          transform: drawerOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
        }}
      >
        {/* Drawer Header */}
        <div style={{
          background: 'var(--brand-primary)',
          padding: '20px 20px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <img src="/logo.png" alt="Logo" height="38" />
          <button
            onClick={closeDrawer}
            style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '8px', color: '#fff', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Links */}
        <nav style={{ flex: 1, padding: '12px 0' }}>
          {/* Accueil */}
          <Link
            to="/" onClick={closeDrawer}
            style={{
              display: 'block', padding: '14px 24px',
              color: pathname === '/' ? 'var(--brand-primary)' : '#1a1a2e',
              fontWeight: pathname === '/' ? 700 : 500,
              fontSize: '15px',
              textDecoration: 'none',
              borderLeft: pathname === '/' ? '3px solid var(--brand-primary)' : '3px solid transparent',
              background: pathname === '/' ? 'rgba(40,100,174,0.06)' : 'transparent',
            }}
          >
            Accueil
          </Link>

          {/* À propos (accordion) */}
          <div>
            <button
              onClick={() => setAboutOpen(!aboutOpen)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                width: '100%', padding: '14px 24px', border: 'none',
                background: isAboutGroup ? 'rgba(40,100,174,0.06)' : 'transparent',
                color: isAboutGroup ? 'var(--brand-primary)' : '#1a1a2e',
                fontWeight: isAboutGroup ? 700 : 500,
                fontSize: '15px',
                cursor: 'pointer',
                borderLeft: isAboutGroup ? '3px solid var(--brand-primary)' : '3px solid transparent',
                textAlign: 'left',
              }}
            >
              À propos
              <ChevronDown size={16} style={{ transform: aboutOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s' }} />
            </button>
            {aboutOpen && (
              <div style={{ background: '#f8f9fa', borderLeft: '3px solid rgba(40,100,174,0.2)' }}>
                {[
                  { to: '/about', label: 'À propos' },
                  { to: '/team', label: 'La Team' },
                  { to: '/galerie', label: 'Galerie' },
                  { to: '/ressources', label: 'Centre de ressources' },
                ].map(item => (
                  <Link
                    key={item.to} to={item.to} onClick={closeDrawer}
                    style={{
                      display: 'block', padding: '11px 24px 11px 32px',
                      color: pathname === item.to ? 'var(--brand-primary)' : '#555',
                      fontWeight: pathname === item.to ? 600 : 400,
                      fontSize: '14px',
                      textDecoration: 'none',
                      borderBottom: '1px solid rgba(0,0,0,0.04)',
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Autres liens */}
          {[
            { to: '/actions', label: 'Nos actions', active: pathname.startsWith('/actions') },
            { to: '/actualites', label: 'Nos actualités', active: pathname.startsWith('/actualites') },
            { to: '/contact', label: 'Contact', active: pathname === '/contact' },
          ].map(item => (
            <Link
              key={item.to} to={item.to} onClick={closeDrawer}
              style={{
                display: 'block', padding: '14px 24px',
                color: item.active ? 'var(--brand-primary)' : '#1a1a2e',
                fontWeight: item.active ? 700 : 500,
                fontSize: '15px',
                textDecoration: 'none',
                borderLeft: item.active ? '3px solid var(--brand-primary)' : '3px solid transparent',
                background: item.active ? 'rgba(40,100,174,0.06)' : 'transparent',
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div style={{ padding: '16px 24px 32px' }}>
          <Link
            to="/soutenir" onClick={closeDrawer}
            style={{
              display: 'block', textAlign: 'center',
              background: 'var(--brand-secondary)',
              color: '#fff', fontWeight: 700,
              padding: '14px', borderRadius: '10px',
              textDecoration: 'none', fontSize: '15px',
              letterSpacing: '0.3px',
            }}
          >
            Nous soutenir
          </Link>
        </div>
      </div>
    </>
  );
}
