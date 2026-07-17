import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Image as ImageIcon } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import { galleryItems } from './galleryData';

// ── LES 3 PROJETS FIXES (UI hardcodée — titre, image, couleur) ──
// Leur slug (_id ici) correspond au champ `pillar` en base de données.
const STATIC_PROJECTS = [
  {
    slug: 'dssr',
    title: 'DSSR et VBG',
    description: "Santé Sexuelle et Reproductive & Lutte contre les Violences Basées sur le Genre.",
    coverImage: '/optimized/project-1.webp',
    color: '#2764ae'
  },
  {
    slug: 'paix',
    title: 'Paix et Cohésion Sociale',
    description: "Promotion du vivre-ensemble, prévention de la radicalisation et dialogue intergénérationnel.",
    coverImage: '/optimized/project-2.webp',
    color: '#27b074'
  },
  {
    slug: 'leadership',
    title: 'Leadership et Autonomisation',
    description: "Renforcement du pouvoir d'agir des femmes et des jeunes pour un impact communautaire durable.",
    coverImage: '/optimized/project-3.webp',
    color: '#f89d2a'
  }
];

// Slugs réservés aux 3 projets fixes (ne pas les afficher en double depuis la DB)
const STATIC_SLUGS = new Set(STATIC_PROJECTS.map(p => p.slug));

// Titres legacy à ignorer complètement
const LEGACY_TITLES = new Set(['pageda', 'yes', 'tedidjo']);

// Regroupe les items statiques de galleryData en albums par section
const groupGalleryIntoAlbums = (items: any[]) => {
  const map = new Map<string, any>();
  items.forEach(item => {
    if (!map.has(item.section)) {
      map.set(item.section, {
        _id: item.section,
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
  description: string;
  images: string[];
  project?: string;
  category?: string;
}

interface DbProject {
  _id: string;
  title: string;
  description: string;
  coverImage?: string;
  color?: string;
  order?: number;
  pillar?: string;
}

export default function GalleryPage() {
  const { category } = useParams<{ category: string }>();
  const [dbActions, setDbActions] = useState<Action[]>([]);
  const [dbProjects, setDbProjects] = useState<DbProject[]>([]);
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
        if (actionsRes.ok) setDbActions(await actionsRes.json());
        if (projectsRes.ok) setDbProjects(await projectsRes.json());
      } catch (err) {
        console.error('Erreur chargement galerie:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    window.scrollTo(0, 0);
  }, []);

  // Projets DB considérés comme "système" = ceux seedés avec un pillar connu
  // (seuls eux alimentent les 3 cartes fixes de la galerie)
  const systemPillarSlugs = new Set(STATIC_PROJECTS.map(p => p.slug));

  // Projets créés par l'admin = tous les non-legacy ET non-système
  // Un projet avec un pillar mal configuré par accident est quand même affiché ici
  const extraDbProjects = dbProjects
    .filter(p => {
      const title = p.title.trim().toLowerCase();
      if (LEGACY_TITLES.has(title)) return false; // ignorer legacy
      // Un projet est "système" seulement s'il a un pillar CONNU et que son titre
      // correspond exactement à l'un des 3 projets hardcodés
      const isSystem =
        p.pillar && systemPillarSlugs.has(p.pillar) &&
        STATIC_PROJECTS.some(s => s.title.trim().toLowerCase() === title);
      return !isSystem;
    })
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0) || a.title.localeCompare(b.title));

  // ── Vue détail d'un projet ──
  // `category` peut être un slug fixe ('dssr', 'paix', 'leadership')
  // ou l'_id MongoDB d'un projet admin.

  const selectedStatic = category ? STATIC_PROJECTS.find(p => p.slug === category) : null;
  const selectedDb = category && !selectedStatic
    ? dbProjects.find(p => p._id === category)
    : null;

  // Actions à afficher pour un projet fixe :
  // on cherche le(s) projet(s) DB dont le champ `pillar` correspond au slug
  const allStaticAlbums = groupGalleryIntoAlbums(galleryItems);

  const actionsForStatic = selectedStatic
    ? [
        // Actions DB dont le projet est un projet SYSTÈME avec le bon pilier
        ...dbActions.filter(a => {
          if (!a.project) return false;
          const dbProj = dbProjects.find(p => p._id === a.project);
          if (!dbProj) return false;
          const isSystem =
            dbProj.pillar === selectedStatic.slug &&
            STATIC_PROJECTS.some(s => s.title.trim().toLowerCase() === dbProj.title.trim().toLowerCase());
          return isSystem;
        }),
        // Albums statiques (galleryData) de la même catégorie
        ...allStaticAlbums.filter(a => a.category === selectedStatic.slug)
      ]
    : [];

  // Actions à afficher pour un projet admin :
  const actionsForDb = selectedDb
    ? dbActions.filter(a => a.project === selectedDb._id)
    : [];

  const filteredActions = selectedStatic ? actionsForStatic : actionsForDb;

  // Infos d'affichage pour la vue détail
  const detailTitle  = selectedStatic?.title  ?? selectedDb?.title  ?? '';
  const detailColor  = selectedStatic?.color  ?? selectedDb?.color  ?? 'var(--brand-primary)';
  const detailDesc   = selectedStatic?.description ?? selectedDb?.description ?? '';

  const isDetailView = !!category;
  const notFound     = isDetailView && !selectedStatic && !selectedDb;

  return (
    <div className="wrapper">
      <Navbar />

      {/* ── HERO ── */}
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

          {/* ── VUE LISTE DES PROJETS ── */}
          {!isDetailView && (
            <>
              <div className="text-center mx-auto mb-5">
                <h2 className="fw-black mb-3 text-uppercase">Nos Projets</h2>
                <div className="mx-auto mb-4" style={{ width: '60px', height: '4px', backgroundColor: 'var(--brand-primary)' }} />
              </div>

              <div className="row g-4 justify-content-center">
                {/* Les 3 projets fixes */}
                {STATIC_PROJECTS.map(proj => (
                  <div key={proj.slug} className="col-md-6 col-lg-4">
                    <div
                      className="card shadow-sm overflow-hidden cursor-pointer h-100 border-0 transition-all hover-up"
                      onClick={() => navigate(`/galerie/${proj.slug}`)}
                    >
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

                {/* Projets créés par l'admin — dans la même grille */}
                {!loading && extraDbProjects.map(proj => (
                  <div key={proj._id} className="col-md-6 col-lg-4">
                    <div
                      className="card shadow-sm overflow-hidden cursor-pointer h-100 border-0 transition-all hover-up"
                      onClick={() => navigate(`/galerie/${proj._id}`)}
                    >
                      <div style={{ height: '260px', overflow: 'hidden' }}>
                        <img
                          src={proj.coverImage || '/optimized/cta-2.webp'}
                          alt={proj.title}
                          className="w-100 h-100 object-cover transition-all hover-scale"
                        />
                      </div>
                      <div className="card-body text-center p-4">
                        <h3 className="fw-bold mb-3" style={{ color: proj.color || 'var(--brand-primary)' }}>{proj.title}</h3>
                        <p className="text-muted mb-4" style={{ fontSize: '0.95rem' }}>{proj.description}</p>
                        <button className="btn btn-outline-primary rounded-pill px-4 fw-bold">Découvrir les actions</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ── VUE PROJET INTROUVABLE ── */}
          {notFound && (
            <div className="text-center py-5">
              <ImageIcon size={48} className="text-muted mb-3 opacity-25" />
              <p className="text-muted fs-5 mb-4">Ce projet est introuvable.</p>
              <Link to="/galerie" className="btn btn-primary rounded-pill px-4">Retour à la galerie</Link>
            </div>
          )}

          {/* ── VUE DÉTAIL D'UN PROJET ── */}
          {isDetailView && !notFound && (
            <div>
              {/* En-tête projet */}
              <div
                className="d-flex align-items-center justify-content-between mb-5 p-4 rounded-4 shadow-sm bg-light"
                style={{ borderLeft: `8px solid ${detailColor}` }}
              >
                <div>
                  <h2 className="fw-black text-uppercase mb-1">{detailTitle}</h2>
                  <p className="text-muted mb-0">{detailDesc || "Actions réalisées dans le cadre de ce projet."}</p>
                </div>
                <Link to="/galerie" className="btn btn-secondary rounded-pill px-4">Retour</Link>
              </div>

              {/* Albums / actions */}
              {loading && filteredActions.length === 0 ? (
                <div className="text-center py-5">Chargement des albums...</div>
              ) : filteredActions.length === 0 ? (
                <div className="text-center py-5">
                  <ImageIcon size={48} className="text-muted mb-3 opacity-25" />
                  <p className="text-muted fs-5">Aucun album photo disponible pour ce projet actuellement.</p>
                </div>
              ) : (
                <div className="row g-4">
                  {filteredActions.map((action, idx) => (
                    <div key={action._id || idx} className="col-md-6 col-lg-4">
                      <Link
                        to={`/galerie/album/${action._id}`}
                        className="card border-0 h-100 shadow-sm overflow-hidden text-decoration-none group bg-dark"
                      >
                        <div className="position-relative" style={{ height: '280px' }}>
                          <img
                            src={(action.images[0] || '/optimized/cta-2.webp').replace('/large/', '/thumbs/')}
                            alt={action.title}
                            className="w-100 h-100 object-cover opacity-75 transition-all hover-scale"
                          />
                          <div className="position-absolute bottom-0 start-0 w-100 p-4" style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.9))' }}>
                            <h5 className="fw-bold text-white mb-1" style={{ fontSize: '1.2rem', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                              {action.title}
                            </h5>
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
