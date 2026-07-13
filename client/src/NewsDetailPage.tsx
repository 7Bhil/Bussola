import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { newsItems, staticNewsItems } from './NewsPage';

// Real article full-text content from busolaong.com (fallback for static items)
const newsFullText: Record<number, string> = {
  1: `À l'occasion de la célébration de son quatrième anniversaire, BUSOLA ONG a organisé, les 24 et 25 mai 2024, deux journées dédiées à la paix et à la cohésion sociale à Parakou. Cet événement a mis en lumière l'engagement constant de l'organisation envers le développement communautaire et le vivre-ensemble. Il a permis de renforcer les liens entre les acteurs locaux, les autorités et la société civile.

1. Vendredi 24 mai 2024 – Sensibilisation citoyenne

La première journée a débuté à 9h00 par une session de sensibilisation à l'Université de Parakou. Cette séance portait sur la démocratie, la bonne gouvernance et la sécurité. Elle a été animée par Monsieur BADOUSSI, docteur à la faculté de droit et de science politique de l'Université de Parakou.

Son intervention a mis en évidence l'importance de la démocratie, en s'appuyant sur des données claires et chiffrées. Il a également abordé les principes fondamentaux de la bonne gouvernance. Une séance de questions-réponses interactive a suivi, offrant aux participants l'occasion d'exprimer leurs points de vue et de formuler des contributions pertinentes. La journée s'est conclue par des échanges fructueux, des remerciements à l'intervenant, et une photo de famille.

2. Samedi 25 mai 2024 – Déjeuner de cohésion sociale

La deuxième journée a commencé à 10h00 par un déjeuner de cohésion sociale à l'ONG SIA N' SON. Cet événement a réuni plusieurs personnalités : le Maire et le Préfet du Borgou, des représentants de la police républicaine, des leaders religieux et traditionnels (pasteur, imam, roi et sages), ainsi que des membres d'institutions et ONG locales telles que PLAN INTERNATIONAL, CARE Bénin Togo, UNICEF, l'Association Barika, Wendia Faaba, entre autres.

La cérémonie a été introduite par les mots de bienvenue de Nadège BIGNON, maîtresse de cérémonie. Ont suivi les présentations des responsables de BUSOLA ONG et les allocutions du Maire et du Préfet. Une communication principale sur la paix et la cohésion sociale a été animée par M. Dramane BOUKO. Son exposé a mis l'accent sur l'importance de la cohésion sociale, les obstacles à surmonter et les stratégies à mettre en œuvre dans la commune de Parakou.

Après un échange interactif avec le public, une pause déjeuner a permis des discussions informelles, marquées par les interventions du Maire et du Préfet. Tous ont souligné la nécessité de renforcer la cohésion sociale à travers des actions concrètes et inclusives. La séance s'est achevée par des mots de félicitation du Préfet et une photo de famille.

À 16h00, les participants se sont retrouvés à la Place Tabera pour une série d'activités ludiques destinées à briser les barrières entre civils et forces de l'ordre. Des jeux tels que la pétanque, le Ludo et les cartes ont permis des moments de détente dans une ambiance conviviale, accompagnés d'amuse-bouches.

L'activité s'est conclu par la signature d'une bâche d'engagement à la cohésion sociale, un acte symbolique fort témoignant de l'implication des participants. Une dernière photo de famille a été prise, marquant la clôture officielle de ces deux journées de célébration.

En résumé, la célébration des quatre ans de BUSOLA ONG a été un véritable succès. Elle a permis d'aborder des thématiques essentielles comme la démocratie et la cohésion sociale, tout en favorisant le dialogue entre acteurs locaux. Cette initiative a renforcé l'engagement collectif pour la paix à Parakou et jeté les bases de futures actions en faveur du vivre-ensemble.`,

  2: `Busola ONG, en collaboration avec la Direction Départementale de l'Intérieur et de la Sécurité Publique du Borgou et de l'Alibori, mobilise Zém et conducteurs de taxi pour lutter contre la désinformation en période électorale et renforcer la cohésion sociale.

Aujourd'hui marque le lancement officiel de cette campagne avec un atelier de renforcement de capacités réunissant 20 leaders, présidents et chefs de groupements de Zémidjan et de conducteurs de taxi. La formation, facilitée par le Directeur Départemental, porte sur l'identification des Fake News, la gestion des rumeurs et les principes de la communication non violente. Elle a permis de mettre en lumière l'impact et les conséquences de la désinformation sur la stabilité sociale.

Les échanges ont mis en évidence les risques que représente la désinformation pour la stabilité sociale, notamment en période électorale. Le Directeur Départemental a également mis l'accent sur les dispositions légales qui régissent la vie associative au Bénin, en particulier l'Article 50 de la loi n°2025-19 du 22 juillet 2025 relative aux associations et aux fondations en République du Bénin qui encouragent le rôle citoyen des associations et interdisent toute incitation à la violence ou à la contestation de l'ordre public.

Par ailleurs, la Loi n°2017-20 du 20 avril 2018 portant Code du numérique en République du Bénin en son article 550 contient des dispositions pénales qui répriment la diffusion de fausses informations ou toute forme de harcèlement par communication électronique, y compris via les réseaux sociaux. Ces éléments juridiques rappellent à chacun l'importance d'une information fiable, vérifiée et responsable, tout en soulignant que la liberté d'expression se conjugue avec le devoir de respecter l'ordre public et les droits d'autrui.

À la fin de la formation, les participants ont été invités à devenir des ambassadeurs de paix, à veiller à partager des informations vérifiées et fiables, et à démystifier toute rumeur ou intox au sein de leurs communautés. Demain, cap sur le terrain avec les Zemidjan pour une action de proximité pour sensibiliser au moins 400 Zémidjan et conducteurs de taxi à Parakou.`,

  3: `Du 10 au 12 novembre 2025, l'Hôtel SOUNON SERO de Parakou a accueilli un atelier de renforcement de capacités sur le plaidoyer, organisé par Busola ONG avec l'appui de l'UNFPA Benin et de l'Ambassade des Pays-Bas au Bénin. Cette initiative a réuni vingt-cinq membres de Busola et acteurs de la société civile partenaires, engagés pour renforcer leur influence en faveur des Droits en Santé Sexuelle et Reproductive (DSSR) au Bénin.

L'objectif de la formation était de permettre aux participants de maîtriser les concepts, outils et stratégies du plaidoyer, afin de transformer leur engagement citoyen en actions d'impact durable.

Sous la facilitation de Mme Nadia ELHADJI BOUEYE, Consultante de l'UNFPA, les travaux se sont articulés autour de trois axes :

Clarification des concepts : distinction entre plaidoyer et lobbying, identification des approches et outils d'influence adaptés aux contextes d'intervention ;

Planification stratégique : élaboration de cartographies d'acteurs, définition des messages clés et formulation de stratégies de mobilisation efficaces ;

Production et mise en pratique : co-rédaction et production de la première version du guide de plaidoyer de Busola ONG, suivies de simulations de négociation face à des décideurs.

Ces trois journées ont permis aux participants d'acquérir des compétences pratiques, de renforcer leur confiance collective et de développer un cadre stratégique commun, matérialisé par le guide de plaidoyer établi, qui servira de référence pour les futures campagnes de l'organisation.

Cet atelier constitue une étape majeure dans la démarche de Busola ONG visant à structurer et professionnaliser son action citoyenne. Les travaux se poursuivront avec le module sur la redevabilité sociale, afin de consolider cette dynamique d'apprentissage et d'engagement au service du changement social.`,

  4: `Ce jeudi 23 octobre, la 2ème journée de notre initiative "48h contre le Cancer du Sein" a été consacrée à l'extension de notre périmètre d'intervention, en déployant nos équipes au sein d'un deuxième pôle économique majeur de Parakou : Le marché dépôt.

L'accueil a été tout aussi chaleureux, et les discussions encore plus profondes. Mais hier, nous avons ajouté une étape clé à notre mission.

Car après l'information, vient souvent la question qui paralyse : "Et si je sens quelque chose d'anormal je vais où ?"

Informer ne suffit pas. Il faut orienter.

Pour briser l'isolement et la peur, chaque femme sensibilisée hier est repartie avec des connaissances, mais aussi avec une orientation claire. Nous avons partagé les contacts et les lieux des centres de santé partenaires à Parakou où elles peuvent se rendre pour un dépistage, un conseil ou une consultation en toute confiance.

Aujourd'hui, plus de 100 femmes du marché dépôt savent non seulement comment se protéger, mais aussi où trouver de l'aide. C'est ça, notre plus grande victoire.

Le succès de cette seconde journée démontre la scalabilité et la pertinence de notre modèle d'action mobile et ciblé. Il confirme l'urgence d'intégrer des stratégies de santé communautaire adaptatives dans les politiques de santé publique pour ne laisser aucune femme de côté.

La sensibilisation doit aller là où se trouve le besoin.`,

  5: `Un moment fort. Une vision partagée. Une énergie renouvelée.

10 Février, Busola ONG a vécu un instant d'exception à l'occasion de sa cérémonie de présentation des vœux à son Président d'Honneur, Monsieur Alain ASSANKPO, ainsi qu'à ses partenaires techniques et financiers locaux, nationaux et internationaux.

Au-delà du protocole, c'était un moment de chaleur humaine, de regards complices, de sourires sincères et d'engagement renouvelé.

Les mots prononcés n'étaient pas de simples vœux. Ils portaient une vision. Ils racontaient un parcours. Ils dessinaient l'avenir.

Les réalisations présentées ont témoigné du chemin parcouru avec détermination. Les perspectives annoncées ont ravivé l'espoir et l'ambition d'aller plus loin, ensemble.

Cette cérémonie n'était pas seulement un rendez-vous institutionnel. C'était la célébration d'un partenariat solide, d'une confiance mutuelle et d'une volonté commune d'impacter durablement nos communautés.

Busola adresse sa profonde gratitude à son Président d'Honneur et à l'ensemble de ses partenaires pour leur soutien constant et leur engagement indéfectible.

Ensemble, nous ne formulons pas seulement des vœux. Nous construisons des actions. Nous changeons des vies. Nous inspirons l'avenir.

Nos partenaires : UNFPA Benin | UNICEF Benin | CARE Bénin/Togo | Médecins du Monde Suisse au Bénin | Association Barika | Wendia Fáabà | Compagnie Ola culture | ABPF/MAJ Parakou | Association Jeunesse pour la Santé Préventive - AJSP | CEDH | FeD ONG | Jeunesse et Développement | OCPM | Préfecture du Borgou | CIMIC | Direction Départementale de la Santé du Borgou | Direction Départementale des Affaires Sociales et de la Microfinance du Borgou | Direction Départementale de la Police Républicaine du Borgou.`,
};

interface NewsArticle {
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
}

export default function NewsDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [allNews, setAllNews] = useState<NewsArticle[]>(newsItems.length > 0 ? newsItems : staticNewsItems);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (window.WOW) {
      new window.WOW().init();
    }
    window.scrollTo(0, 0);

    if (!id) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    const API_URL = import.meta.env.VITE_API_URL || '';

    // Essayer de fetch depuis l'API si l'ID ressemble à un ObjectId MongoDB
    const isMongoId = /^[a-f\d]{24}$/i.test(id);

    if (isMongoId) {
      // C'est un ID MongoDB → fetch depuis l'API
      fetch(`${API_URL}/api/news/${id}`)
        .then(res => {
          if (!res.ok) throw new Error('Not found');
          return res.json();
        })
        .then((data) => {
          setArticle({
            _id: data._id,
            title: data.title,
            content: data.content,
            summary: data.summary,
            image: data.image,
            img: data.image,
            category: data.category,
            author: data.author,
            date: new Date(data.date || data.createdAt).toLocaleDateString('fr-FR', {
              day: '2-digit', month: 'long', year: 'numeric'
            }),
          });
          // Aussi charger la liste complète pour la sidebar
          fetch(`${API_URL}/api/news`)
            .then(res => res.json())
            .then(allData => {
              setAllNews(allData.map((item: any, i: number) => ({
                _id: item._id,
                id: i + 1,
                title: item.title,
                date: new Date(item.date || item.createdAt).toLocaleDateString('fr-FR', {
                  day: '2-digit', month: 'long', year: 'numeric'
                }),
                img: item.image || '/optimized/news-1.webp',
              })));
            })
            .catch(() => {});
        })
        .catch(() => setNotFound(true))
        .finally(() => setLoading(false));
    } else {
      // C'est un ID numérique → données statiques
      const newsId = parseInt(id);
      const item = staticNewsItems.find(n => n.id === newsId);
      if (item) {
        setArticle(item);
        setAllNews(staticNewsItems);
      } else {
        setNotFound(true);
      }
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="wrapper">
        <Navbar />
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (notFound || !article) {
    return <Navigate to="/actualites" />;
  }

  // Déterminer le texte complet à afficher
  const fullText = article.content || (article.id ? newsFullText[article.id] : null) || article.desc || '';

  return (
    <div className="wrapper">
      <Navbar />

      {/* Page Header Banner */}
      <div
        className="container-fluid d-flex flex-column align-items-center justify-content-center"
        style={{
          minHeight: '280px',
          background: `url('/motif-logo.png') center/cover`,
          opacity: 0.9,
          position: 'relative',
          paddingTop: '80px',
          paddingBottom: '40px'
        }}
      >
        <div className="text-center position-relative w-100" style={{ zIndex: 1 }}>
          <h1 className="display-4 fw-bold mb-3 text-uppercase" style={{ color: 'var(--brand-primary)' }}>
            ACTUALITÉS
          </h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center mb-0 bg-transparent p-0">
              <li className="breadcrumb-item">
                <Link to="/" className="text-decoration-none fw-medium" style={{ color: 'var(--brand-tertiary)', fontSize: '1.05rem' }}>Accueil</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/actualites" className="text-decoration-none fw-medium" style={{ color: 'var(--brand-tertiary)', fontSize: '1.05rem' }}>Actualités</Link>
              </li>
              <li className="breadcrumb-item active fw-medium" aria-current="page" style={{ color: 'var(--brand-primary)', fontSize: '1.05rem' }}>
                Détails
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-fluid py-5 bg-white">
        <div className="container py-5">
          <div className="row g-5">
            {/* Article Content */}
            <div className="col-lg-8 wow fadeInUp" data-wow-delay="0.1s">
              <div className="mb-4 overflow-hidden rounded-4 shadow-sm" style={{ maxHeight: '500px' }}>
                <img 
                  src={article.img || article.image || '/optimized/news-1.webp'} 
                  alt={article.title} 
                  className="img-fluid w-100" 
                  style={{ objectFit: 'cover' }} 
                 loading="lazy" decoding="async" />
              </div>
              <div className="d-flex align-items-center gap-3 mb-3">
                <p className="mb-0 text-tertiary fw-bold">
                  <i className="fa fa-calendar-alt me-2" style={{ color: 'var(--brand-tertiary)' }}></i>
                  {article.date}
                </p>
                {article.category && (
                  <span className="badge" style={{ backgroundColor: 'var(--brand-primary)' }}>
                    {article.category}
                  </span>
                )}
                {article.author && (
                  <span className="text-muted small">
                    <i className="fa fa-user me-1"></i> {article.author}
                  </span>
                )}
              </div>
              <h1 className="display-6 fw-bold mb-4" style={{ color: 'var(--brand-primary)' }}>{article.title}</h1>
              <div className="text-muted" style={{ lineHeight: '1.8', textAlign: 'justify', fontSize: '1rem' }}>
                {fullText
                  .split('\n\n')
                  .map((para, idx) => (
                    <p key={idx} className="mb-3">{para}</p>
                  ))
                }
              </div>
              
              <div className="mt-5 pt-4 border-top">
                <Link to="/actualites" className="btn btn-primary px-4 py-2 rounded-pill">
                  <i className="fa fa-arrow-left me-2"></i> Retour aux actualités
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4 wow fadeInUp" data-wow-delay="0.3s">
              <div className="p-4 bg-light rounded-4 shadow-sm">
                <h4 className="fw-bold mb-4" style={{ color: 'var(--brand-primary)' }}>Dernières Actualités</h4>
                {allNews
                  .filter(n => (n._id || n.id) !== (article._id || article.id))
                  .slice(0, 3)
                  .map(other => (
                    <div key={other._id || other.id} className="mb-4 border-bottom pb-3">
                      <p className="small text-muted mb-1">{other.date}</p>
                      <Link 
                        to={`/actualites/${other._id || other.id}`} 
                        className="text-decoration-none text-dark fw-bold h6 d-block mb-0 hover-text-primary"
                      >
                        {other.title}
                      </Link>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
