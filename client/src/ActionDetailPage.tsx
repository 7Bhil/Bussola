import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const staticActionDetailsData: any = {
  'projet-respect': {
    title: 'PROJET RESPECT',
    tag: 'DSSR & VBG',
    img: '/optimized/projet_respect.webp',
    fullText: "Le projet RESPECT est une initiative de promotion des droits en santé sexuelle et reproductive (SSR) des adolescentes et des jeunes, intégrant la prévention des violences basées sur le genre (VBG) et le renforcement de l’engagement communautaire. Mis en œuvre depuis 2022 dans plusieurs localités du Bénin, notamment dans la partie septentrionale, le projet vise à créer un environnement favorable au respect, à l’égalité et à la dignité humaine. Dans ce cadre, l'ONG Busola assure des actions de proximité centrées sur l'information, la sensibilisation et la mobilisation communautaire. Elle a organisé des séances de sensibilisation et causeries éducatives à l'endroit des adolescents et des jeunes, aussi bien en milieu scolaire, universitaire que communautaire. Ces activités ont porté sur les droits en SSR, la prévention des VBG, la responsabilité individuelle et collective, ainsi que le respect mutuel entre filles et garçons. BUSOLA a également contribué au renforcement des capacités de jeunes pairs éducateurs et à la mobilisation des leaders communautaires pour favoriser l'appropriation locale du projet. Le projet RESPECT est mis en œuvre avec l'appui technique et financier de Médecins du Monde Suisse, en collaboration avec ROAJELF-Bénin et d'autres organisations de la société civile, ainsi qu'avec l'implication des autorités locales et des acteurs communautaires.",
    secteur: 'DSSR & VBG',
    partenaires: 'Médecins du Monde Suisse et ROAJELF Bénin',
    tauxRealisation: '100.00 %',
    financement: '3000000.00 Fcfa'
  },
  'tedidjo': {
    title: 'TEDIDJO',
    tag: 'DSSR & VBG',
    img: '/optimized/tedjido.webp',
    fullText: "Le projet TEDIDJO est une initiative de développement communautaire visant à améliorer la santé sexuelle et reproductive (SSR) des adolescents et des jeunes, à prévenir les violences basées sur le genre (VBG) et à renforcer l’autonomisation des filles et des jeunes femmes, notamment dans les départements du nord du Bénin. Le projet s’inscrit dans une approche fondée sur les droits humains, l’égalité de genre et la participation communautaire. Le projet est mis en œuvre par CARE International Bénin-Togo, avec l’appui financier de la Foundation for a Just Society International (FJSI) et l’appui technique de CARE Canada, en collaboration avec plusieurs organisations locales partenaires, dont l’ONG BUSOLA. Dans le cadre du projet TEDIDJO, l’ONG BUSOLA intervient comme organisation de mise en œuvre communautaire. Elle conduit des actions de sensibilisation et de mobilisation sociale auprès des adolescents, des jeunes et des communautés, axées sur la promotion des droits en SSR, la prévention des VBG et la lutte contre les normes sociales néfastes. BUSOLA organise également des causeries éducatives, facilite des espaces de dialogue communautaire et participe au renforcement des capacités des jeunes et leaders communautaires, afin de favoriser des changements de comportements durables. Grâce aux interventions conjointes des partenaires et à l’implication active de BUSOLA, le projet TEDIDJO a permis de toucher plusieurs milliers de bénéficiaires, principalement des adolescents, des jeunes, des femmes et des acteurs communautaires. Le projet contribue ainsi à renforcer la protection des droits, l’autonomie des filles et la cohésion sociale au sein des communautés ciblées.",
    secteur: 'DSSR & VBG',
    partenaires: 'CARE International Bénin-Togo, FJSI, CARE Canada',
    tauxRealisation: '100.00 %',
    financement: '13000000.00 Fcfa'
  },
  'yes': {
    title: 'YES',
    tag: 'Autonomisation des jeunes',
    img: '/optimized/yes.webp',
    fullText: "Le projet YES (Youth Engagement for Sexual and Reproductive Health Rights) est une initiative visant à renforcer l’autonomisation des jeunes, à promouvoir l’accès aux droits en santé sexuelle et reproductive (SSR) et à prévenir les violences basées sur le genre (VBG). Il est mis en œuvre au Bénin dans plusieurs départements, notamment l’Alibori, le Borgou, l’Atacora et l’Atlantique, avec pour objectif de développer les compétences des jeunes en entrepreneuriat social et solidaire et de stimuler leur participation active dans la société. Le projet est financé par le Grand-Duché de Luxembourg et coordonné techniquement par l’UNFPA (Fonds des Nations Unies pour la Population), en collaboration avec le Ministère des Sports et plusieurs acteurs locaux. Dans le cadre du projet, l’ONG BUSOLA intervient comme partenaire de mise en œuvre communautaire. Elle conduit des sessions de sensibilisation et de formation auprès des jeunes sur la santé sexuelle et reproductive, la prévention des VBG et le respect des droits humains. BUSOLA participe également aux bootcamps et ateliers de renforcement des compétences des jeunes en entrepreneuriat social et en leadership communautaire, tout en accompagnant le suivi des projets initiés par les participants. Grâce à l’implication de BUSOLA et des partenaires, le projet YES a permis de toucher directement plusieurs centaines de jeunes dans les zones ciblées et indirectement des milliers d’autres, contribuant à leur autonomisation économique et sociale, à l’amélioration des comportements responsables et à la promotion d’un environnement protecteur pour les jeunes et les communautés.",
    secteur: 'Autonomisation des jeunes',
    partenaires: 'Grand-Duché de Luxembourg, UNFPA, Ministère des Sports',
    tauxRealisation: '90.00 %',
    financement: '3000000.00 Fcfa'
  },
  'pageda': {
    title: 'PAGEDA',
    tag: 'Leadership et Autonomisation',
    img: '/optimized/pageda.webp',
    fullText: "Le Programme d’Appui à la Gestion Décentralisée de l’Alphabétisation (PAGEDA) est une initiative multiforme visant à renforcer l’alphabétisation des populations exclues du système éducatif formel dans plusieurs communes du Bénin, notamment dans le Nord du pays. Conçu pour promouvoir l’accès à l’éducation de base, le PAGEDA s’inscrit dans une approche décentralisée du développement humain, mobilisant des acteurs institutionnels, des autorités communales et des organisations de la société civile. Plusieurs organisations partenaires sont impliquées dans la mise en œuvre à la suite d’un partage des zones d’intervention par commune. Dans la commune de Copargo, le programme est mis en œuvre depuis 2022 par l’ONG Busola. Busola ONG joue un rôle clé en tant qu’acteur de mise en œuvre. Cette organisation est chargée de superviser les activités sur le terrain et de s’assurer que les actions opérationnelles prévues dans le cadre du PAGEDA sont effectivement exécutées conformément aux plans convenus avec les autorités et les bailleurs. Spécifiquement, le rôle de Busola ONG comprend : la supervision des activités d’alphabétisation communautaire dans les villages et quartiers ciblés de la commune de Copargo, en veillant à la qualité pédagogique et à la cohérence des interventions avec les objectifs du programme ; le suivi et l’évaluation réguliers des actions opérationnelles, notamment par la collecte de données, l’identification des difficultés d’exécution et la proposition d’ajustements pour améliorer l’impact des activités ; la coordination avec les autorités locales, les formateurs et les partenaires institutionnels, afin d’assurer une synergie optimale entre les différents acteurs du programme et de soutenir la durabilité des acquis auprès des bénéficiaires ; la production de rapports et le partage d’informations avec les structures de pilotage du PAGEDA, garantissant ainsi la transparence, la redevabilité et l’alignement des actions sur les résultats attendus. Grâce à cette implication, Busola ONG contribue à renforcer l’impact du PAGEDA dans la commune de Copargo, en facilitant l’accès à l’alphabétisation et en favorisant une gestion locale plus efficace et participative des activités éducatives.",
    secteur: 'Leadership et Autonomisation',
    partenaires: "Coopération Suisse, SIA N'SON-DC",
    tauxRealisation: '80.00 %',
    financement: '11000000.00 Fcfa'
  }
};

export default function ActionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (window.WOW) new window.WOW().init();
    window.scrollTo(0, 0);

    if (!id) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    const API_URL = import.meta.env.VITE_API_URL || '';
    const isMongoId = /^[a-f\d]{24}$/i.test(id);

    if (isMongoId) {
      // Fetch dynamic project from API
      fetch(`${API_URL}/api/actions/${id}`)
        .then(res => {
          if (!res.ok) throw new Error('Not found');
          return res.json();
        })
        .then(data => {
          setProject({
            title: data.title,
            tag: data.category || 'Non catégorisé',
            img: (data.images && data.images.length > 0) ? data.images[0] : '/optimized/projet_respect.webp',
            fullText: data.description || '',
            secteur: data.category || 'Non catégorisé',
            partenaires: data.beneficiaries || 'Non spécifié',
            tauxRealisation: data.status === 'Terminé' ? '100%' : data.status === 'En cours' ? '50%' : '0%',
            financement: 'N/A'
          });
        })
        .catch(() => setNotFound(true))
        .finally(() => setLoading(false));
    } else {
      // Use static data
      const staticProj = staticActionDetailsData[id];
      if (staticProj) {
        setProject(staticProj);
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

  if (notFound || !project) {
    return <Navigate to="/actions" />;
  }

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
            {project.title}
          </h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center mb-0 bg-transparent p-0">
              <li className="breadcrumb-item">
                <Link to="/" className="text-decoration-none fw-medium" style={{ color: 'var(--brand-tertiary)', fontSize: '1.05rem' }}>Accueil</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/actions" className="text-decoration-none fw-medium" style={{ color: 'var(--brand-tertiary)', fontSize: '1.05rem' }}>Actions</Link>
              </li>
              <li className="breadcrumb-item active fw-medium text-uppercase" aria-current="page" style={{ color: 'var(--brand-primary)', fontSize: '1.05rem' }}>
                {project.title}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Project Details Content */}
      <div className="container-fluid py-5 bg-white">
        <div className="container py-5">
          <div className="row g-5">
            {/* Left Column: Text Content */}
            <div className="col-lg-7 wow fadeInUp" data-wow-delay="0.1s">
              <h1 className="fw-bold mb-4" style={{ color: '#000', fontSize: '2.2rem' }}>{project.title}</h1>
              <div className="text-muted" style={{ fontSize: '0.85rem', lineHeight: '1.8', textAlign: 'justify' }}>
                {project.fullText.split('\n').map((paragraph: string, i: number) => (
                  <p key={i} className="mb-3">{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Right Column: Image and Specs */}
            <div className="col-lg-5 wow fadeInUp" data-wow-delay="0.3s">
              <div className="mb-4">
                <img src={project.img} alt={project.title} className="img-fluid w-100 shadow-sm" style={{ objectFit: 'cover' }}  loading="lazy" decoding="async" />
              </div>
              
              <div className="p-4" style={{ backgroundColor: 'var(--brand-secondary)', color: 'white' }}>
                <h4 className="fw-bold text-white mb-4">Détails du projet</h4>
                <div className="mb-2" style={{ fontSize: '0.9rem' }}>
                  <span className="fw-bold">Secteur: </span>{project.secteur}
                </div>
                <div className="mb-2" style={{ fontSize: '0.9rem' }}>
                  <span className="fw-bold">Partenaires: </span>{project.partenaires}
                </div>
                <div className="mb-2" style={{ fontSize: '0.9rem' }}>
                  <span className="fw-bold">Taux de réalisation: </span>{project.tauxRealisation}
                </div>
                <div className="mb-2" style={{ fontSize: '0.9rem' }}>
                  <span className="fw-bold">Financement: </span>{project.financement}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
