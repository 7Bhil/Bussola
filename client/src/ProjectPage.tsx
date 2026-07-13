import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { galleryItems, GalleryItem } from './galleryData';
import { groupItemsBySection } from './galleryUtils';
import { ZoomIn, Heart, Users, Star } from 'lucide-react';

function optimizedGalleryImage(src: string, size: 'thumbs' | 'large') {
  if (!src.startsWith('/gallery/')) return src;
  const filename = src.split('/').pop();
  if (!filename) return src;
  const basename = filename.replace(/\.[^.]+$/, '');
  return '/optimized/gallery/' + size + '/' + basename + '.webp';
}

export default function ProjectPage() {
  const { projectId } = useParams();
  const [currentGalleryList, setCurrentGalleryList] = useState<GalleryItem[] | null>(null);
  const [isSectionGalleryOpen, setIsSectionGalleryOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!projectId) return <div>Projet non trouvé</div>;

  const mapping: any = {
    dssr: { label: 'DSSR et VBG', color: '#e74c3c', icon: <Heart size={24} className="text-danger" /> },
    paix: { label: 'Paix et Cohésion Sociale', color: '#3498db', icon: <Users size={24} className="text-info" /> },
    leadership: { label: 'Leadership et Autonomisation', color: '#f39c12', icon: <Star size={24} className="text-warning" /> }
  };

  const projMeta = mapping[projectId as string];
  if (!projMeta) return <div>Projet non trouvé</div>;

  const catItems = galleryItems.filter(i => i.category === projectId);
  const map = groupItemsBySection(catItems);
  const sections = Array.from(map.keys());

  return (
    <div className="wrapper">
      <Navbar />
      {/* Hero header matching GalleryPage style */}
      <div
        className="container-fluid position-relative d-flex align-items-center justify-content-center text-white py-5 shadow-sm"
        style={{
          minHeight: '380px',
          background: `linear-gradient(135deg, rgba(39, 100, 174, 0.85) 0%, rgba(39, 176, 116, 0.85) 100%), url('/optimized/cta-2.webp') center/cover`,
          paddingTop: '120px',
          paddingBottom: '60px',
          overflow: 'hidden'
        }}
      >
        <div className="container text-center position-relative" style={{ zIndex: 2 }}>
          <nav aria-label="breadcrumb" className="mb-3">
            <ol className="breadcrumb justify-content-center mb-0 bg-transparent p-0">
              <li className="breadcrumb-item">
                <Link to="/" className="text-white text-decoration-none opacity-75 hover-opacity-100 fw-medium" style={{ fontSize: '0.95rem' }}>Accueil</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/about" className="text-white text-decoration-none opacity-75 hover-opacity-100 fw-medium" style={{ fontSize: '0.95rem' }}>À propos</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/galerie" className="text-white text-decoration-none opacity-75 hover-opacity-100 fw-medium" style={{ fontSize: '0.95rem' }}>Galerie</Link>
              </li>
              <li className="breadcrumb-item active fw-bold text-warning" aria-current="page" style={{ fontSize: '0.95rem' }}>
                {projMeta.label}
              </li>
            </ol>
          </nav>

          <h1 className="display-5 fw-black text-uppercase text-white mb-3" style={{ letterSpacing: '1px' }}>
            {projMeta.label}
          </h1>

          <p className="lead text-white opacity-95 mx-auto" style={{ maxWidth: '850px', fontSize: '1.05rem' }}>
            Découvrez les actions et activités menées dans le cadre de "{projMeta.label}" à travers nos photos et témoignages.
          </p>
        </div>
      </div>

      <div className="container py-5 bg-white">
        <div className="container py-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="fw-black mb-0">{projMeta.label}</h2>
              <p className="text-muted small mb-0">Galerie du projet</p>
            </div>
            <div>
              <Link to="/galerie" className="btn btn-outline-secondary">Retour aux projets</Link>
            </div>
          </div>

          {sections.map(sec => {
            const secItems = map.get(sec) || [];
            const sample = secItems[0];
            const sampleSrc = sample ? optimizedGalleryImage(sample.img, 'thumbs') : '/optimized/cta-2.webp';
            return (
              <div key={sec} className="mb-5 pb-4">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h3 className="fw-bold mb-0" style={{ fontSize: '1.25rem' }}>{sec}</h3>
                  <small className="text-muted">{secItems.length} photos</small>
                </div>

                <div className="row g-4">
                  <div className="col-12 col-md-6 col-lg-4 mb-4">
                    <div className="card border-0 h-100 shadow-sm overflow-hidden position-relative group cursor-pointer" style={{ borderRadius: '15px', border: '1px solid #f0f0f0' }} onClick={() => { setCurrentGalleryList(secItems); setIsSectionGalleryOpen(true); }}>
                      <div className="position-relative overflow-hidden" style={{ height: '280px' }}>
                        <img src={sampleSrc} alt={sec} className="w-100 h-100" style={{ objectFit: 'cover' }} />
                        <div className="position-absolute bottom-0 start-0 w-100 p-3" style={{ background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.5))' }}>
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <h5 className="text-white fw-bold mb-0" style={{ fontSize: '1rem' }}>{sec}</h5>
                              <small className="text-white opacity-75">{secItems.length} photos</small>
                            </div>
                            <button className="btn btn-sm btn-light" onClick={(e) => { e.stopPropagation(); setCurrentGalleryList(secItems); setIsSectionGalleryOpen(true); }}>Voir les photos</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section Gallery Modal (basic) */}
      {isSectionGalleryOpen && currentGalleryList && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 9998 }} onClick={() => { setIsSectionGalleryOpen(false); setCurrentGalleryList(null); }}>
          <div className="container" onClick={(e) => e.stopPropagation()} style={{ maxHeight: '85vh', overflowY: 'auto' }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-white fw-bold">Galerie</h4>
              <button className="btn btn-sm btn-light" onClick={() => { setIsSectionGalleryOpen(false); setCurrentGalleryList(null); }}>Fermer</button>
            </div>

            <div className="row g-3">
              {currentGalleryList.map((item, idx) => (
                <div key={item.id} className="col-6 col-md-4 col-lg-3">
                  <div className="card overflow-hidden cursor-pointer" onClick={() => { setLightboxIndex(idx); setIsSectionGalleryOpen(false); }}>
                    <img src={optimizedGalleryImage(item.img, 'thumbs')} alt={item.title} className="w-100" style={{ height: '160px', objectFit: 'cover' }} />
                    <div className="p-2 bg-white">
                      <small className="d-block text-truncate" title={item.title}>{item.title}</small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
