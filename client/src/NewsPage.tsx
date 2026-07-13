import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

// ── Données statiques (fallback si l'API ne répond pas) ──
export const staticNewsItems = [
  {
    id: 1,
    title: "Déjeuner de cohésion sociale - Edition 2024",
    date: "17 Décembre 2025",
    img: "/Dejeuner.png",
    desc: "À l'occasion de la célébration de son quatrième anniversaire, BUSOLA ONG a organisé, les 24 et 25 mai 2024, deux journées dédiées à la paix et à la cohésion sociale à Parakou. Cet événement a mis en lumière l'engagement constant de l'organisation envers le développement communautaire et le vivre-ensemble. Il a permis de renforcer les liens entre les acteurs locaux, les autorités et la société civile. 1. Vendredi 24 mai 2024 – Sensibilisation citoyenne La première journée a débuté à 9h00 par une session de sensibilisation à l'Université de Parakou. Cette séance portait sur la démocratie, la bonne gouvernance et la sécurité. Elle a été animée par Monsieur BADOUSSI, docteur à la faculté de droit et de science politique de l'Université de Parakou. Son intervention a mis en évidence l'importance de la démocratie, en s'appuyant sur des données claires et chiffrées. Il a également abordé les principes fondamentaux de la bonne gouvernance. Une séance de questions-réponses interactive a suivi, offrant aux participants l'occasion d'exprimer leurs points de vue et de formuler des contributions pertinentes. La journée s'est conclue par des échanges fructueux, des remerciements à l'intervenant, et une photo de famille. 2. Samedi 25 mai 2024 – Déjeuner de cohésion sociale La deuxième journée a commencé à 10h00 par un déjeuner de cohésion sociale à l'ONG SIA N' SON. Cet événement a réuni plusieurs personnalités : le Maire et le Préfet du Borgou, des représentants de la police républicaine, des leaders religieux et traditionnels (pasteur, imam, roi et sages), ainsi que des membres d'institutions et ONG locales telles que PLAN INTERNATIONAL, CARE Bénin Togo, UNICEF, l'Association Barika, Wendia Faaba, entre autres. La cérémonie a été introduite par les mots de bienvenue de Nadège BIGNON, maîtresse de cérémonie. Ont suivi les présentations des responsables de BUSOLA ONG et les allocutions du Maire et du Préfet. Une communication principale sur la paix et la cohésion sociale a été animée par M. Dramane BOUKO. Son exposé a mis l'accent sur l'importance de la cohésion sociale, les obstacles à surmonter et les stratégies à mettre en œuvre dans la commune de Parakou. Après un échange interactif avec le public, une pause déjeuner a permis des discussions informelles, marquées par les interventions du Maire et du Préfet. Tous ont souligné la nécessité de renforcer la cohésion sociale à travers des actions concrètes et inclusives. La séance s'est achevée par des mots de félicitation du Préfet et une photo de famille. À 16h00, les participants se sont retrouvés à la Place Tabera pour une série d'activités ludiques destinées à briser les barrières entre civils et forces de l'ordre. Des jeux tels que la pétanque, le Ludo et les cartes ont permis des moments de détente dans une ambiance conviviale, accompagnés d'amuse-bouches. L'activité s'est conclu par la signature d'une bâche d'engagement à la cohésion sociale, un acte symbolique fort témoignant de l'implication des participants. Une dernière photo de famille a été prise, marquant la clôture officielle de ces deux journées de célébration. En résumé, la célébration des quatre ans de BUSOLA ONG a été un véritable succès. Elle a permis d'aborder des thématiques essentielles comme la démocratie et la cohésion sociale, tout en favorisant le dialogue entre acteurs locaux. Cette initiative a renforcé l'engagement collectif pour la paix à Parakou et jeté les bases de futures actions en faveur du vivre-ensemble."
  },
  {
    id: 2,
    title: "Mobilisation des zem et conducteurs de Taxi contre la désinformation en période électorale pour préserver la cohésion sociale",
    date: "08 Février 2026",
    img: "/mobilisation.png",
    desc: "Busola ONG, en collaboration avec la Direction Départementale de l'Intérieur et de la Sécurité Publique du Borgou et de l'Alibori, mobilise Zém et conducteurs de taxi pour lutter contre la désinformation en période électorale et renforcer la cohésion sociale. Aujourd'hui marque le lancement officiel de cette campagne avec un atelier de renforcement de capacités réunissant 20 leaders, présidents et chefs de groupements de Zémidjan et de conducteurs de taxi. La formation, facilitée par le Directeur Départemental, porte sur l'identification des #FakeNews, la gestion des #rumeurs et les principes de la communication non violente. Elle a permis de mettre en lumière l'impact et les conséquences de la #désinformation sur la stabilité sociale. Les échanges ont mis en évidence les risques que représente la désinformation pour la stabilité sociale, notamment en période électorale. le Directeur Départemental a également mis l'accent sur les dispositions légales qui régissent la vie associative au Bénin, en particulier l'Article 50 de la loi n°2025-19 du 22 juillet 2025 relative aux associations et aux fondations en République du Bénin qui encouragent le rôle citoyen des associations et interdisent toute incitation à la violence ou à la contestation de l'ordre public. Par ailleurs, la Loi n°2017-20 du 20 avril 2018 portant Code du numérique en République du Bénin en son article 550 contient des dispositions pénales qui répriment la diffusion de fausses informations ou toute forme de harcèlement par communication électronique, y compris via les réseaux sociaux. Ces éléments juridiques rappellent à chacun l'importance d'une information fiable, vérifiée et responsable, tout en soulignant que la liberté d'expression se conjugue avec le devoir de respecter l'ordre public et les droits d'autrui. À la fin de la formation, les participants ont été invités à devenir des ambassadeurs de paix, à veiller à partager des informations vérifiées et fiables, et à démystifier toute rumeur ou intox au sein de leurs communautés. Demain, cap sur le terrain avec les Zemidjan pour une action de proximité pour sensibiliser au moins 400 Zémidjan et conducteurs de taxi à Parakou. "
  },
  {
    id: 3,
    title: "Renforcement de capacités en Plaidoyer et Redevabilité",
    date: "08 Février 2026",
    img: "/optimized/news-3.webp",
    desc: "Du 10 au 12 novembre 2025, l'Hôtel SOUNON SERO de Parakou a accueilli un atelier de renforcement de capacités sur le plaidoyer, organisé par Busola ONG avec l'appui de l'UNFPA Benin et de l'Ambassade des Pays-Bas au Bénin. Cette initiative a réuni vingt-cinq membres de Busola et acteurs de la société civile partenaires, engagés pour renforcer leur #influence en faveur des Droits en Santé Sexuelle et Reproductive (DSSR) au Bénin. L'objectif de la formation était de permettre aux participants de maîtriser les concepts, outils et stratégies du plaidoyer, afin de transformer leur #engagement citoyen en actions d'impact durable. Sous la facilitation de Mme Nadia ELHADJI BOUEYE, Consultante de l'UNFPA, les travaux se sont articulés autour de trois axes : Clarification des concepts : distinction entre plaidoyer et #lobbying, identification des approches et outils d'influence adaptés aux contextes d'intervention ; Planification stratégique : élaboration de cartographies d'acteurs, définition des messages clés et formulation de stratégies de #mobilisation efficaces ; Production et mise en pratique : co-rédaction et production de la première version du guide de plaidoyer de Busola ONG, suivies de simulations de négociation face à des décideurs. Ces trois journées ont permis aux participants d'acquérir des compétences pratiques, de renforcer leur confiance collective et de développer un cadre stratégique commun, matérialisé par le guide de #plaidoyer établi, qui servira de référence pour les futures campagnes de l'organisation. Cet atelier constitue une étape majeure dans la démarche de Busola ONG visant à structurer et professionnaliser son action citoyenne. Les travaux se poursuivront avec le module sur la #redevabilité sociale, afin de consolider cette dynamique d'apprentissage et d'engagement au service du changement social. "
  },
  {
    id: 4,
    title: "48H contre le cancer du sein Edition 2025",
    date: "23 Octobre 2025",
    img: "/optimized/news-2.webp",
    desc: "Ce jeudi 23 octobre, la 2ème journée de notre initiative \"48h contre le Cancer du Sein\" a été consacrée à l'extension de notre périmètre d'intervention, en déployant nos équipes au sein d'un deuxieme pole économique majeur de Parakou : Le marché dépôt L'accueil a été tout aussi chaleureux, et les discussions encore plus profondes. Mais hier, nous avons ajouté une étape clé à notre mission. Car après l'information, vient souvent la question qui paralyse : \"Et si je sens quelque chose d'anormal je vais où ?\" Informer ne suffit pas. Il faut orienter. Pour briser l'isolement et la peur, chaque femme sensibilisée hier est repartie avec des connaissances, mais aussi avec une orientation claire. Nous avons partagé les contacts et les lieux des centres de santé partenaires à Parakou où elles peuvent se rendre pour un dépistage, un conseil ou une consultation en toute confiance. Aujourd'hui, plus de 100 femmes du marché dépôt savent non seulement comment se protéger, mais aussi où trouver de l'aide. C'est ça, notre plus grande victoire. Le succès de cette seconde journée démontre la scalabilité et la pertinence de notre modèle d'action mobile et ciblé. Il confirme l'urgence d'intégrer des stratégies de santé communautaire adaptatives dans kes politiques de santé publique pour ne laisser aucune femme de côté. La sensibilisation doit aller là où se trouve le besoin.."
  },
  {
    id: 5,
    title: "Cérémonie de présentation des voeux au CA et aux PTF de Busola",
    date: "20 Février 2026",
    img: "/optimized/news-1.webp",
    desc: "Un moment fort. Une vision partagée. Une énergie renouvelée. 10 Février, Busola ONG a vécu un instant d'exception à l'occasion de sa cérémonie de présentation des vœux à son Président d'Honneur, Monsieur Alain ASSANKPO, ainsi qu'à ses partenaires techniques et financiers locaux, nationaux et internationaux. Au-delà du protocole, c'était un moment de chaleur humaine, de regards complices, de sourires sincères et d'engagement renouvelé. Les mots prononcés n'étaient pas de simples vœux. Ils portaient une vision. Ils racontaient un parcours. Ils dessinaient l'avenir. Les réalisations présentées ont témoigné du chemin parcouru avec détermination. Les perspectives annoncées ont ravivé l'espoir et l'ambition d'aller plus loin,ensemble. Cette cérémonie n'était pas seulement un rendez-vous institutionnel. C'était la célébration d'un partenariat solide, d'une confiance mutuelle et d'une volonté commune d'impacter durablement nos communautés. Busola adresse sa profonde gratitude à son Président d'Honneur et à l'ensemble de ses partenaires pour leur soutien constant et leur engagement indéfectible. Ensemble, nous ne formulons pas seulement des vœux. Nous construisons des actions. Nous changeons des vies. Nous inspirons l'avenir. Nos partenaires : UNFPA Benin | UNICEF Benin | CARE Bénin/Togo | Médecins du Monde Suisse au Bénin | Association Barika | Wendia Fáabà | Compagnie Ola culture | ABPF/MAJ Parakou | Association Jeunesse pour la Santé Préventive - AJSP | CEDH | FeD ONG | Jeunesse et Développement | OCPM | Préfecture du Borgou | CIMIC | Direction Départementale de la Santé du Borgou | Direction Départementale des Affaires Sociales et de la Microfinance du Borgou | Direction Départementale de la Police Republicaine du Borgou | ..."
  }
];

// ── Interface pour les news depuis l'API ──
interface NewsItem {
  _id?: string;
  id?: number;
  title: string;
  content?: string;
  summary?: string;
  image?: string;
  img?: string;
  category?: string;
  author?: string;
  date: string;
  desc?: string;
  published?: boolean;
}

// ── Fonction utilitaire pour normaliser les données API → format d'affichage ──
function normalizeNewsItem(item: any, index: number): NewsItem {
  // Si c'est un item de l'API (a _id), on le normalise
  if (item._id) {
    return {
      _id: item._id,
      id: index,
      title: item.title,
      date: new Date(item.date || item.createdAt).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }),
      img: item.image || '/optimized/news-1.webp',
      desc: item.content || item.summary || '',
      summary: item.summary,
      content: item.content,
      category: item.category,
      author: item.author,
    };
  }
  // Sinon c'est un item statique, on le garde tel quel
  return item;
}

// ── Export pour utilisation par NewsDetailPage ──
export let newsItems: NewsItem[] = staticNewsItems;

export default function NewsPage() {
  const [items, setItems] = useState<NewsItem[]>(staticNewsItems);
  const [loading, setLoading] = useState(true);
  const [isFromApi, setIsFromApi] = useState(false);

  useEffect(() => {
    if (window.WOW) {
      new window.WOW().init();
    }
    window.scrollTo(0, 0);

    // Fetch des news depuis l'API
    const API_URL = import.meta.env.VITE_API_URL || '';
    fetch(`${API_URL}/api/news`)
      .then(res => {
        if (!res.ok) throw new Error('API unavailable');
        return res.json();
      })
      .then((data: any[]) => {
        if (data && data.length > 0) {
          const normalized = data.map((item, i) => normalizeNewsItem(item, i + 1));
          // Fusionner les news de l'API avec les news statiques
          const merged = [...normalized, ...staticNewsItems];
          setItems(merged);
          setIsFromApi(true);
          // Met à jour l'export pour NewsDetailPage
          newsItems = merged;
        }
        // Si pas de données API, on garde les statiques
      })
      .catch(() => {
        // Fallback silencieux sur les données statiques
        console.log('📰 API indisponible, utilisation des données statiques');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="wrapper">
      <Navbar />

      {/* Premium Hero Header Banner */}
      <div
        className="container-fluid position-relative d-flex align-items-center justify-content-center text-white py-5 shadow-sm"
        style={{
          minHeight: '500px',
          background: `linear-gradient(135deg, rgba(39, 100, 174, 0.85) 0%, rgba(39, 176, 116, 0.85) 100%), url('/optimized/news-3.webp') center/cover`,
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
                Actualités
              </li>
            </ol>
          </nav>

          <h1 className="display-4 fw-black text-uppercase text-white mb-3" style={{ letterSpacing: '2px', textShadow: '0 2px 10px rgba(0,0,0,0.15)' }}>
            Actualités
          </h1>
          
          <div className="mx-auto mb-4" style={{ width: '85px', height: '4px', backgroundColor: 'var(--brand-secondary)', borderRadius: '2px' }}></div>

          <p className="lead text-white opacity-95 mx-auto" style={{ maxWidth: '850px', fontSize: '1.15rem', lineHeight: '1.7', textShadow: '0 1px 5px rgba(0,0,0,0.1)' }}>
            Restez informé des dernières nouvelles, événements et avancées de nos différents programmes et actions sur le terrain.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-fluid py-5 bg-white">
        <div className="container py-5">
          {/* Section Header */}
          <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: '800px' }}>
            <div className="d-flex align-items-center justify-content-center mb-3">
              <div style={{ height: "1px", background: "var(--brand-tertiary)", width: "40px" }}></div>
              <span className="text-uppercase mx-2 fw-bold" style={{ color: 'var(--brand-tertiary)', fontSize: '0.9rem', letterSpacing: '2px' }}>ACTUALITÉS</span>
              <div style={{ height: "1px", background: "var(--brand-tertiary)", width: "40px" }}></div>
            </div>
            <h1 className="fw-black mb-4" style={{ lineHeight: 1.2, fontSize: '2.75rem', color: 'var(--brand-text)' }}>
              <span className="text-uppercase fw-black" style={{ color: 'var(--brand-text)', letterSpacing: '-0.5px' }}>Soyez au courant de</span><br/>
              <span className="text-uppercase fw-black" style={{ color: 'var(--brand-text)', letterSpacing: '-0.5px' }}>Notre actualité en temps réel</span>
            </h1>
          </div>

          {/* Loading state */}
          {loading && (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Chargement...</span>
              </div>
            </div>
          )}

          {/* News Grid */}
          <div className="row g-4">
            {items.map((item, i) => {
              // Déterminer l'ID pour le lien : _id pour les données API, id pour les statiques
              const linkId = item._id || item.id;
              const displayDesc = item.desc || item.summary || item.content || '';

              return (
                <div key={item._id || item.id} className="col-md-6 col-lg-4 wow fadeIn" data-wow-delay={`${0.1 + (i % 3) * 0.2}s`}>
                  <Link to={`/actualites/${linkId}`} className="text-decoration-none text-dark h-100 d-block">
                    <div className="event-item h-100 p-4 shadow-sm bg-white rounded-4 border transition-all hover-up overflow-hidden">
                      <div className="overflow-hidden rounded-4 mb-4" style={{ height: "220px" }}>
                        <img 
                          className="img-fluid w-100 h-100 transition-all hover-scale" 
                          src={item.img || item.image || '/optimized/news-1.webp'} 
                          style={{ objectFit: "cover" }} 
                          alt={item.title} 
                         loading="lazy" decoding="async" />
                      </div>
                      <p className="mb-2 text-tertiary fw-bold small">
                        <i className="fa fa-calendar-alt me-2" style={{ color: 'var(--brand-tertiary)' }}></i>
                        {item.date}
                      </p>
                      {item.category && (
                        <span className="badge mb-2" style={{ backgroundColor: 'var(--brand-primary)', fontSize: '0.75rem' }}>
                          {item.category}
                        </span>
                      )}
                      <h3 className="h5 text-primary fw-bold mb-3" style={{ fontSize: '1.2rem', lineHeight: '1.4' }}>
                        {item.title}
                      </h3>
                      <p className="text-muted small mb-4" style={{ textAlign: 'justify', lineHeight: '1.6' }}>
                        {displayDesc.length > 150 ? displayDesc.slice(0, 150) + '…' : displayDesc}
                      </p>
                      <div className="text-secondary fw-bold small d-inline-flex align-items-center transition-all hover-right">
                        Lire la suite <i className="fa fa-arrow-right ms-2"></i>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
