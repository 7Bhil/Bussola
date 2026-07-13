import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon, ArrowLeft } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import { galleryItems } from './galleryData';

// Helper pour grouper les photos par "Section" (Album) - MÊME LOGIQUE QUE DANS GALLERYPAGE
const groupGalleryIntoAlbums = (items: any[]) => {
  const albums: any[] = [];
  const map = new Map();
  
  items.forEach(item => {
    if (!map.has(item.section)) {
      map.set(item.section, {
        _id: `static-${item.id}`,
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
  project?: any;
}

export default function AlbumPage() {
  const { albumName } = useParams<{ albumName: string }>(); 
  const [action, setAction] = useState<Action | null>(null);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || '';

  useEffect(() => {
    const fetchAlbum = async () => {
      if (!albumName) return;
      setLoading(true);

      // 1. Essayer de trouver dans les albums statiques (galleryData)
      const allStaticAlbums = groupGalleryIntoAlbums(galleryItems);
      const staticAlbum = allStaticAlbums.find(a => a._id === albumName || a.title === albumName);

      if (staticAlbum) {
        setAction(staticAlbum);
        setLoading(false);
        return;
      }

      // 2. Si non trouvé, essayer via l'API (BDD)
      try {
        const res = await fetch(`${API_URL}/api/actions/${albumName}`);
        if (res.ok) {
          const data = await res.json();
          setAction(data);
        } else {
          throw new Error("Album non trouvé");
        }
      } catch (error) {
        console.error("Failed to fetch album", error);
        setAction(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAlbum();
    window.scrollTo(0, 0);
  }, [albumName]);

  if (loading) return <div className="wrapper"><Navbar /><div className="container py-5 text-center" style={{paddingTop: '150px'}}>Chargement de l'album...</div><Footer /></div>;

  if (!action) {
    return (
      <div className="wrapper">
        <Navbar />
        <div className="container py-5 text-center" style={{ minHeight: '60vh', paddingTop: '150px' }}>
          <h2 className="fw-bold mb-4">Album non trouvé</h2>
          <p className="text-muted mb-4">Désolé, cet album semble ne pas exister ou ne contient aucune image.</p>
          <Link to="/galerie" className="btn btn-primary rounded-pill px-4">Retour à la galerie</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex(prev => (prev !== null && prev > 0) ? prev - 1 : action.images.length - 1);
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex(prev => (prev !== null && prev < action.images.length - 1) ? prev + 1 : 0);
  };

  return (
    <div className="wrapper">
      <Navbar />

      <div className="container-fluid pt-5 bg-light" style={{ marginTop: '80px' }}>
        <div className="container py-4">
          <nav aria-label="breadcrumb" className="mb-4">
            <ol className="breadcrumb mb-0 bg-transparent p-0">
              <li className="breadcrumb-item"><Link to="/" className="text-decoration-none opacity-75 fw-medium">Accueil</Link></li>
              <li className="breadcrumb-item"><Link to="/galerie" className="text-decoration-none opacity-75 fw-medium">Galerie</Link></li>
              <li className="breadcrumb-item active fw-bold text-primary" aria-current="page">{action.title}</li>
            </ol>
          </nav>

          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5">
            <div>
              <h1 className="display-5 fw-black text-uppercase mb-2" style={{ color: 'var(--brand-text)' }}>{action.title}</h1>
              <p className="text-muted mb-0"><ImageIcon size={18} className="me-2 d-inline" />{action.images.length} photos dans cet album</p>
            </div>
            <Link to="/galerie" className="btn btn-outline-primary rounded-pill px-4 mt-3 mt-md-0"><ArrowLeft size={18} className="me-2" /> Retour</Link>
          </div>
        </div>
      </div>

      <div className="container-fluid py-5 bg-white">
        <div className="container">
          <div className="row g-4">
            {action.images.map((img, idx) => (
              <div key={idx} className="col-sm-6 col-md-4 col-lg-3">
                <div 
                  className="card border-0 shadow-sm overflow-hidden h-100 cursor-pointer transition-all hover-scale" 
                  style={{ borderRadius: '12px' }} 
                  onClick={() => setLightboxIndex(idx)}
                >
                  <div className="position-relative overflow-hidden" style={{ height: '220px' }}>
                    <img src={img.replace('/large/', '/thumbs/')} alt={`${action.title} - ${idx}`} className="w-100 h-100 object-cover" loading="lazy" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {lightboxIndex !== null && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.95)', zIndex: 9999 }} onClick={() => setLightboxIndex(null)}>
          <button className="position-absolute top-0 end-0 m-4 btn text-white p-2 border-0 bg-transparent" onClick={() => setLightboxIndex(null)}><X size={36} /></button>
          <button className="position-absolute start-0 m-3 btn text-white rounded-circle p-3 border-0 bg-dark bg-opacity-50" onClick={handlePrev}><ChevronLeft size={36} /></button>
          <button className="position-absolute end-0 m-3 btn text-white rounded-circle p-3 border-0 bg-dark bg-opacity-50" onClick={handleNext}><ChevronRight size={36} /></button>
          <div className="d-flex flex-column align-items-center justify-content-center p-3 text-center" style={{ maxWidth: '90%', maxHeight: '90%' }} onClick={(e) => e.stopPropagation()}>
            <img src={action.images[lightboxIndex]} alt="" className="img-fluid rounded shadow-lg" style={{ objectFit: 'contain', maxHeight: '80vh' }} />
            <div className="text-white mt-3"><p className="opacity-75 small">{lightboxIndex + 1} / {action.images.length}</p></div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
