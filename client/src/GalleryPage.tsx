import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import { galleryItems } from './galleryData';

// ── LES 3 PILIERS PHARES (Basés sur galleryData.ts) ──
const staticPillars = [
  {
    _id: 'dssr',
    title: 'DSSR et VBG',
    description: "Santé Sexuelle et Reproductive & Lutte contre les Violences Basées sur le Genre.",
    coverImage: '/optimized/project-1.webp',
    color: '#2764ae'
  },
  {
    _id: 'paix',
    title: 'Paix et Cohésion Sociale',
    description: "Promotion du vivre-ensemble, prévention de la radicalisation et dialogue intergénérationnel.",
    coverImage: '/optimized/project-2.webp',
    color: '#27b074'
  },
  {
    _id: 'leadership',
    title: 'Leadership et Autonomisation',
    description: "Renforcement du pouvoir d'agir des femmes et des jeunes pour un impact communautaire durable.",
    coverImage: '/optimized/project-3.webp',
    color: '#f89d2a'
  }
];

// Helper pour grouper les photos par "Section" (Album)
const groupGalleryIntoAlbums = (items: any[]) => {
  const albums: any[] = [];
  const map = new Map();
  
  items.forEach(item => {
    if (!map.has(item.section)) {
      map.set(item.section, {
        _id: item.section, // Utiliser le titre comme ID pour les albums statiques
        title: item.section,
        description: item.desc,
        category: item.category,
        images: []
      });
      albums.push(map.get(item.section));
    }
    map.get(item.section).images.push(item.img);
  });
  
  return albums;
};

interface Action {
  _id: string;
  title: string;
  description: string;
  images: string[];
  project?: string;
  category?: string;
}

export default function GalleryPage() {
  const { category } = useParams<{ category: string }>();
  const [dbActions, setDbActions] = useState<Action[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || '';

  useEffect(() => {
    const fetchActions = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/api/actions`);
        if (res.ok) {
          const data = await res.json();
          setDbActions(data);
        }
      } catch (error) {
        console.error("Failed to fetch gallery actions", error);
      } finally {
        setLoading(false);
      }
    };
    fetchActions();
    window.scrollTo(0, 0);
  }, []);

  const selectedPillar = category ? staticPillars.find(p => p._id === category) : null;
  
  // Fusion des actions Statiques (de galleryData) et Dynamiques (de la BDD)
  const allStaticAlbums = groupGalleryIntoAlbums(galleryItems);
  
  const filteredActions = selectedPillar 
    ? [
        ...dbActions.filter(a => a.category === selectedPillar._id || a.project === selectedPillar.title),
        ...allStaticAlbums.filter(a => a.category === selectedPillar._id)
      ]
    : [];

  return (
    <div className="wrapper">
      <Navbar />

      <div
        className="container-fluid position-relative d-flex align-items-center justify-content-center text-white py-5 shadow-sm"
        style={{
          minHeight: '350px',
          background: `linear-gradient(135deg, rgba(39, 100, 174, 0.9) 0%, rgba(39, 176, 116, 0.9) 100%), url('/optimized/cta-2.webp') center/cover`,
          paddingTop: '100px'
        }}
      >
        <div className="container text-center" style={{ zIndex: 2 }}>
          <h1 className="display-4 fw-black text-uppercase text-white mb-2">Galerie d'impact</h1>
          <p className="lead text-white opacity-95">Les moments forts de nos interventions sur le terrain.</p>
        </div>
      </div>

      <div className="container-fluid py-5 bg-white">
        <div className="container py-2">
          {!category ? (
            <>
              <div className="text-center mx-auto mb-5">
                <h2 className="fw-black mb-3 text-uppercase">Nos Piliers d'Intervention</h2>
                <div className="mx-auto mb-4" style={{ width: '60px', height: '4px', backgroundColor: 'var(--brand-primary)' }}></div>
              </div>
              
              <div className="row g-4 justify-content-center">
                {staticPillars.map(proj => (
                  <div key={proj._id} className="col-md-6 col-lg-4">
                    <div className="card shadow-sm overflow-hidden cursor-pointer h-100 border-0 transition-all hover-up" onClick={() => navigate(`/galerie/${proj._id}`)}>
                      <div style={{ height: '260px', overflow: 'hidden' }}>
                        <img src={proj.coverImage} alt={proj.title} className="w-100 h-100 object-cover transition-all hover-scale" />
                      </div>
                      <div className="card-body text-center p-4">
                        <h3 className="fw-bold mb-3" style={{ color: proj.color }}>{proj.title}</h3>
                        <p className="text-muted mb-4" style={{ fontSize: '0.95rem' }}>{proj.description}</p>
                        <button className="btn btn-outline-primary rounded-pill px-4 fw-bold">Découvrir les actions</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div>
              <div className="d-flex align-items-center justify-content-between mb-5 p-4 rounded-4 shadow-sm bg-light" style={{ borderLeft: `8px solid ${selectedPillar?.color || '#000'}` }}>
                <div>
                  <h2 className="fw-black text-uppercase mb-1">{selectedPillar?.title}</h2>
                  <p className="text-muted mb-0">Activités réalisées dans ce domaine d'intervention</p>
                </div>
                <Link to="/galerie" className="btn btn-secondary rounded-pill px-4">Retour</Link>
              </div>

              {loading && dbActions.length === 0 ? (
                <div className="text-center py-5">Chargement des albums...</div>
              ) : filteredActions.length === 0 ? (
                <div className="text-center py-5">
                  <ImageIcon size={48} className="text-muted mb-3 opacity-25" />
                  <p className="text-muted fs-5">Aucun album photo disponible pour cet axe actuellement.</p>
                </div>
              ) : (
                <div className="row g-4">
                  {filteredActions.map((action, idx) => (
                    <div key={action._id || idx} className="col-md-6 col-lg-4">
                      <Link to={`/galerie/album/${action._id}`} className="card border-0 h-100 shadow-sm overflow-hidden text-decoration-none group bg-dark">
                        <div className="position-relative" style={{ height: '280px' }}>
                          <img src={(action.images[0] || '/optimized/cta-2.webp').replace('/large/', '/thumbs/')} alt={action.title} className="w-100 h-100 object-cover opacity-75 transition-all hover-scale" />
                          <div className="position-absolute bottom-0 start-0 w-100 p-4" style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.9))' }}>
                            <h5 className="fw-bold text-white mb-1" style={{ fontSize: '1.2rem', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{action.title}</h5>
                            <span className="badge rounded-pill bg-primary">{action.images.length} photos</span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
