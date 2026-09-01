import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Image as ImageIcon, ArrowLeft, FolderKanban, Layers } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import { galleryItems } from './galleryData';

// ── PROJETS HISTORIQUES FONDATEURS DE BUSOLA ──
const STATIC_PROJECTS = [
  {
    _id: 'dssr',
    slug: 'dssr',
    title: 'DSSR et VBG',
    description: "Santé Sexuelle et Reproductive & Lutte contre les Violences Basées sur le Genre.",
    coverImage: '/optimized/project-1.webp',
    color: '#2764ae',
    pillar: 'dssr'
  },
  {
    _id: 'paix',
    slug: 'paix',
    title: 'Paix et Cohésion Sociale',
    description: "Promotion du vivre-ensemble, prévention de la radicalisation et dialogue intergénérationnel.",
    coverImage: '/optimized/project-2.webp',
    color: '#27b074',
    pillar: 'paix'
  },
  {
    _id: 'leadership',
    slug: 'leadership',
    title: 'Leadership et Autonomisation',
    description: "Renforcement du pouvoir d'agir des femmes et des jeunes pour un impact communautaire durable.",
    coverImage: '/optimized/project-3.webp',
    color: '#f89d2a',
    pillar: 'leadership'
  }
];

// Regroupement des photos statiques historiques en albums par section
const groupGalleryIntoAlbums = (items: any[]) => {
  const map = new Map<string, any>();
  items.forEach(item => {
    if (!map.has(item.section)) {
      map.set(item.section, {
        _id: `static-${item.id}`,
        title: item.section,
        description: item.desc,
        category: item.category,
        images: []
      });
    }
    map.get(item.section).images.push(item.img);
  });
  return Array.from(map.values());
};

interface Action {
  _id: string;
  title: string;
  description?: string;
  images: string[];
  project?: any;
  category?: string;
  status?: string;
  location?: string;
}

interface Project {
  _id: string;
  title: string;
  description: string;
  coverImage?: string;
  color?: string;
  order?: number;
  pillar?: string;
  slug?: string;
}

export default function GalleryPage() {
  const { category } = useParams<{ category: string }>();
  const [dbActions, setDbActions] = useState<Action[]>([]);
  const [dbProjects, setDbProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || '';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [actionsRes, projectsRes] = await Promise.all([
          fetch(`${API_URL}/api/actions`),
          fetch(`${API_URL}/api/projects`)
        ]);

        if (actionsRes.ok) {
          const actionsData = await actionsRes.json();
          if (Array.isArray(actionsData)) setDbActions(actionsData);
        }

        if (projectsRes.ok) {
          const projectsData = await projectsRes.json();
          if (Array.isArray(projectsData)) setDbProjects(projectsData);
        }
      } catch (err) {
        console.error('Erreur chargement galerie:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    window.scrollTo(0, 0);
  }, []);

  // ── COMBINER PROJETS FONDATEURS + PROJETS DE LA BASE DE DONNÉES ──
  // Évite d'effacer les projets historiques tout en affichant les nouveaux projets ajoutés par l'admin.
  const extraDbProjects = dbProjects.filter(p => {
    const pPillar = (p.pillar || '').toLowerCase();
    const pSlug = (p.slug || '').toLowerCase();
    const pTitle = (p.title || '').toLowerCase().trim();
    
    // Ignorer si c'est un doublon des 3 piliers fondateurs
    const isPillarDuplicate = ['dssr', 'paix', 'leadership'].includes(pPillar) ||
                              ['dssr', 'paix', 'leadership'].includes(pSlug) ||
                              ['dssr et vbg', 'paix et cohésion sociale', 'leadership et autonomisation'].includes(pTitle);
    return !isPillarDuplicate;
  });

  const projectsList: Project[] = [...STATIC_PROJECTS, ...extraDbProjects];

  // ── Sélection du projet en vue détail ──
  const selectedProject = category
    ? projectsList.find(
        p => p._id === category || p.pillar === category || p.slug === category
      ) || STATIC_PROJECTS.find(p => p.slug === category || p._id === category)
    : null;

  // ── COMBINER TOUTES LES ACTIONS (HISTORIQUES STATIQUES + DYNAMIQUES MONGODB) ──
  let projectActions: any[] = [];

  if (selectedProject) {
    const pillarKey = selectedProject.pillar || selectedProject.slug || selectedProject._id;
    
    // 1. Charger les albums historiques statiques associés à ce pilier
    const allStaticAlbums = groupGalleryIntoAlbums(galleryItems);
    const staticMatches = allStaticAlbums.filter(a => a.category === pillarKey);

    // 2. Charger les actions de la base de données MongoDB associées à ce projet
    const dynamicMatches = dbActions.filter(action => {
      if (!action.project) return false;

      // Si action.project est un objet populé
      if (typeof action.project === 'object' && action.project !== null) {
        return (
          action.project._id === selectedProject._id ||
          action.project.pillar === pillarKey ||
          action.project.slug === pillarKey ||
          action.project.title?.toLowerCase() === selectedProject.title?.toLowerCase()
        );
      }

      // Si action.project est un ID string
      if (typeof action.project === 'string') {
        return (
          action.project === selectedProject._id ||
          action.project === pillarKey
        );
      }

      return false;
    });

    // Combinaison : Les actions dynamiques récentes apparaissent en premier, suivies des albums historiques
    projectActions = [...dynamicMatches, ...staticMatches];
  }

  const isDetailView = !!category;
  const notFound = isDetailView && !selectedProject;

  return (
    <div className="wrapper">
      <Navbar />

      {/* Header Banner */}
      <div
        className="container-fluid position-relative d-flex align-items-center justify-content-center text-white py-5 shadow-sm"
        style={{
          minHeight: '400px',
          background: "linear-gradient(135deg, rgba(40,100,174,0.92) 0%, rgba(39,176,116,0.92) 100%), url('/motif-logo.png') center/cover",
          paddingTop: '120px',
          paddingBottom: '50px',
          overflow: 'hidden'
        }}
      >
        <div className="container text-center position-relative" style={{ zIndex: 2 }}>
          <nav aria-label="breadcrumb" className="mb-3">
            <ol className="breadcrumb justify-content-center mb-0 bg-transparent p-0">
              <li className="breadcrumb-item">
                <Link to="/" className="text-white text-decoration-none opacity-75 hover-opacity-100 fw-medium">
                  Accueil
                </Link>
              </li>
              <li className="breadcrumb-item active fw-bold text-warning" aria-current="page">
                Galerie des Projets
              </li>
            </ol>
          </nav>

          <h1 className="display-4 fw-black text-uppercase text-white mb-2" style={{ letterSpacing: '1px' }}>
            {selectedProject ? selectedProject.title : "Galerie d'impact des Projets"}
          </h1>

          <div className="mx-auto mb-3" style={{ width: '70px', height: '4px', backgroundColor: 'var(--brand-secondary)', borderRadius: '2px' }} />

          <p className="lead text-white opacity-95 mx-auto" style={{ maxWidth: '800px', fontSize: '1.1rem' }}>
            {selectedProject
              ? selectedProject.description
              : "Découvrez les grands projets de l'ONG Busola et toutes les actions de terrain associées."}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-fluid py-5 bg-white">
        <div className="container py-2">

          {/* ── 1. VUE LISTE DE TOUS LES PROJETS ── */}
          {!isDetailView && (
            <>
              <div className="text-center mx-auto mb-5" style={{ maxWidth: '700px' }}>
                <span className="text-uppercase fw-bold text-primary tracking-wider small d-block mb-1">
                  COMMUNAUTÉ & IMPACT
                </span>
                <h2 className="fw-black mb-3 text-uppercase text-dark" style={{ fontSize: '2.2rem' }}>
                  Nos Projets Majeurs
                </h2>
                <p className="text-muted">
                  Sélectionnez un projet pour explorer l'ensemble des actions, photos et programmes réalisés sur le terrain.
                </p>
                <div className="mx-auto mt-3" style={{ width: '60px', height: '3px', backgroundColor: 'var(--brand-primary)' }} />
              </div>

              <div className="row g-4 justify-content-center">
                {projectsList.map(proj => {
                  const pillarKey = proj.pillar || proj.slug || proj._id;
                  
                  // Compter le nombre total d'actions (statiques historiques + dynamiques MongoDB)
                  const staticCount = groupGalleryIntoAlbums(galleryItems).filter(a => a.category === pillarKey).length;
                  const dynamicCount = dbActions.filter(a => {
                    if (!a.project) return false;
                    const projId = typeof a.project === 'object' ? a.project._id : a.project;
                    return projId === proj._id || projId === pillarKey;
                  }).length;

                  const totalActions = staticCount + dynamicCount;

                  return (
                    <div key={proj._id} className="col-md-6 col-lg-4">
                      <div
                        className="card shadow-sm overflow-hidden cursor-pointer h-100 border-0 transition-all hover-up bg-white rounded-4"
                        onClick={() => navigate(`/galerie/${proj.slug || proj._id}`)}
                        style={{ border: '1px solid #eaeaea' }}
                      >
                        <div className="position-relative" style={{ height: '240px', overflow: 'hidden' }}>
                          <img
                            src={proj.coverImage || '/optimized/project-1.webp'}
                            alt={proj.title}
                            className="w-100 h-100 object-cover transition-all hover-scale"
                            onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/optimized/project-1.webp'; }}
                          />
                          {totalActions > 0 && (
                            <span className="badge bg-primary text-white position-absolute top-0 end-0 m-3 px-3 py-2 rounded-pill shadow-sm font-bold">
                              {totalActions} action{totalActions > 1 ? 's' : ''}
                            </span>
                          )}
                        </div>
                        <div className="card-body text-center p-4 d-flex flex-column justify-content-between">
                          <div>
                            <h3 className="fw-bold mb-2" style={{ color: proj.color || 'var(--brand-primary)', fontSize: '1.3rem' }}>
                              {proj.title}
                            </h3>
                            <p className="text-muted mb-4" style={{ fontSize: '0.92rem', lineHeight: '1.6' }}>
                              {proj.description}
                            </p>
                          </div>
                          <div>
                            <button className="btn btn-outline-primary rounded-pill px-4 py-2 fw-bold text-uppercase text-xs tracking-wider">
                              Découvrir les actions →
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* ── 2. VUE PROJET INTROUVABLE ── */}
          {notFound && (
            <div className="text-center py-5">
              <ImageIcon size={48} className="text-muted mb-3 opacity-25" />
              <h3 className="fw-bold text-dark mb-2">Projet introuvable</h3>
              <p className="text-muted mb-4">Le projet demandé n'existe pas ou a été déplacé.</p>
              <Link to="/galerie" className="btn btn-primary rounded-pill px-4">
                Retour à la liste des projets
              </Link>
            </div>
          )}

          {/* ── 3. VUE DÉTAIL D'UN PROJET ET SES ACTIONS ── */}
          {isDetailView && !notFound && selectedProject && (
            <div>
              {/* En-tête du projet sélectionné */}
              <div
                className="d-flex flex-col flex-md-row align-items-md-center justify-content-between mb-5 p-4 rounded-4 shadow-sm bg-light"
                style={{ borderLeft: `8px solid ${selectedProject.color || 'var(--brand-primary)'}` }}
              >
                <div>
                  <div className="d-flex items-center gap-2 mb-1">
                    <FolderKanban className="text-primary" size={20} />
                    <span className="text-xs font-bold uppercase tracking-wider text-muted">Projet d'intervention</span>
                  </div>
                  <h2 className="fw-black text-uppercase mb-1 text-dark">{selectedProject.title}</h2>
                  <p className="text-muted mb-0">{selectedProject.description}</p>
                </div>
                <Link to="/galerie" className="btn btn-outline-secondary rounded-pill px-4 mt-3 mt-md-0 fw-bold">
                  <ArrowLeft size={16} className="me-2" /> Tous les projets
                </Link>
              </div>

              {/* En-tête Actions */}
              <div className="mb-4">
                <div className="d-flex align-items-center gap-2">
                  <Layers className="text-primary" size={20} />
                  <h3 className="fw-bold text-dark mb-0">Actions & Albums associés</h3>
                </div>
                <p className="text-muted text-sm mt-1">
                  Tous les programmes et photos de terrain rattachés à ce projet ({projectActions.length} au total).
                </p>
              </div>

              {loading && projectActions.length === 0 ? (
                <div className="text-center py-5">Chargement des actions...</div>
              ) : projectActions.length === 0 ? (
                <div className="text-center py-5 bg-light rounded-4 border p-5">
                  <ImageIcon size={48} className="text-muted mb-3 opacity-25" />
                  <h4 className="fw-bold text-slate-700 mb-2">Aucune action associée pour le moment</h4>
                  <p className="text-muted max-w-md mx-auto mb-4">
                    Les photos et résumés d'intervention seront ajoutés sous peu.
                  </p>
                  <Link to="/galerie" className="btn btn-primary rounded-pill px-4">
                    Explorer d'autres projets
                  </Link>
                </div>
              ) : (
                <div className="row g-4">
                  {projectActions.map((action, idx) => (
                    <div key={action._id || idx} className="col-md-6 col-lg-4">
                      <Link
                        to={`/galerie/album/${action._id}`}
                        className="card border-0 h-100 shadow-sm overflow-hidden text-decoration-none group bg-dark rounded-4"
                      >
                        <div className="position-relative" style={{ height: '260px' }}>
                          <img
                            src={(action.images && action.images.length > 0 ? action.images[0] : '/optimized/cta-2.webp').replace('/large/', '/thumbs/')}
                            alt={action.title}
                            className="w-100 h-100 object-cover opacity-80 transition-all hover-scale"
                            onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/optimized/cta-2.webp'; }}
                          />
                          <div
                            className="position-absolute bottom-0 start-0 w-100 p-4"
                            style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.9))' }}
                          >
                            {action.category && (
                              <span className="badge bg-tertiary text-white mb-2 text-uppercase text-[10px]">
                                {action.category}
                              </span>
                            )}
                            <h5
                              className="fw-bold text-white mb-2"
                              style={{ fontSize: '1.15rem', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
                            >
                              {action.title}
                            </h5>
                            <span className="badge rounded-pill bg-primary px-3 py-1 font-bold">
                              {action.images?.length || 1} photo{(action.images?.length || 1) > 1 ? 's' : ''}
                            </span>
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
