import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { ArrowRight } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="wrapper">
      <Navbar />

      <div className="container-fluid p-5 text-center" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="row">
          <div className="col-12">
            <div className="p-5 bg-white rounded-4 shadow-lg">
              <div className="mb-4 d-flex justify-content-center">
                <img src="/LOGO SANS FOND-02.png" alt="Busola" style={{ maxWidth: '220px', height: 'auto' }} />
              </div>
              <h1 className="display-1 text-primary fw-black mb-3" style={{ fontSize: '5.5rem' }}>404</h1>
              <h2 className="fw-bold mb-3" style={{ fontSize: '2rem' }}>Page introuvable</h2>
              <p className="text-muted mb-4" style={{ maxWidth: '760px', margin: '0 auto' }}>
                La page que vous cherchez n'existe pas ou a été déplacée. Utilisez le menu pour retourner à l'accueil
                ou explorez nos actions et actualités.
              </p>

              <div className="d-flex justify-content-center gap-3 mt-4">
                <Link to="/" className="btn btn-primary rounded-pill px-4 py-2 fw-bold d-inline-flex align-items-center">
                  Retour à l'accueil <ArrowRight size={16} className="ms-2" />
                </Link>
                <Link to="/actions" className="btn btn-outline-primary rounded-pill px-4 py-2 fw-bold">Nos programmes</Link>
                <Link to="/actualites" className="btn btn-outline-secondary rounded-pill px-4 py-2 fw-bold">Actualités</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NotFound;
