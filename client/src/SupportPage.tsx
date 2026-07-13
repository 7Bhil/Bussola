import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Handshake, Users, ShieldCheck, Mail, ArrowRight, Star, Megaphone } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState<'don' | 'benevole' | 'partenaire'>('don');
  
  useEffect(() => {
    if (window.WOW) {
      new window.WOW().init();
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="wrapper">
      <Navbar />

      {/* Premium Hero Header Banner */}
      <div
        className="container-fluid position-relative d-flex align-items-center justify-content-center text-white py-5 shadow-sm"
        style={{
          minHeight: '500px',
          background: `linear-gradient(135deg, rgba(39, 100, 174, 0.85) 0%, rgba(39, 176, 116, 0.85) 100%), url('/optimized/testimony1.webp') center/cover`,
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
                Soutenir Busola
              </li>
            </ol>
          </nav>

          <h1 className="display-4 fw-black text-uppercase text-white mb-3" style={{ letterSpacing: '2px', textShadow: '0 2px 10px rgba(0,0,0,0.15)' }}>
            Nous soutenir
          </h1>
          
          <div className="mx-auto mb-4" style={{ width: '85px', height: '4px', backgroundColor: 'var(--brand-secondary)', borderRadius: '2px' }}></div>

          <p className="lead text-white opacity-95 mx-auto" style={{ maxWidth: '850px', fontSize: '1.15rem', lineHeight: '1.7', textShadow: '0 1px 5px rgba(0,0,0,0.1)' }}>
            Découvrez comment vous pouvez contribuer à nos actions. Faites un don, devenez bénévole ou partenaire pour amplifier notre impact.
          </p>
        </div>
      </div>

      {/* Intro Section */}
      <div className="container py-5 bg-white">
        <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: '800px' }}>
          <div className="d-flex align-items-center justify-content-center mb-3">
            <div style={{ height: "1px", background: "var(--brand-tertiary)", width: "40px" }}></div>
            <span className="text-uppercase mx-2 fw-bold" style={{ color: 'var(--brand-tertiary)', fontSize: '0.9rem', letterSpacing: '2px' }}>SOUTENIR BUSOLA</span>
            <div style={{ height: "1px", background: "var(--brand-tertiary)", width: "40px" }}></div>
          </div>
          <h1 className="fw-black mb-4" style={{ lineHeight: 1.2, fontSize: '2.75rem', color: 'var(--brand-text)' }}>
            <span className="text-uppercase fw-black" style={{ color: 'var(--brand-text)', letterSpacing: '-0.5px' }}>Ensemble, créons</span><br/>
            <span className="text-uppercase fw-black" style={{ color: 'var(--brand-text)', letterSpacing: '-0.5px' }}>un impact durable</span>
          </h1>
          <p className="text-muted fs-5 mt-4 mx-auto" style={{ maxWidth: '800px', lineHeight: '1.8' }}>
            Les actions de l'ONG Busola au Nord-Bénin reposent sur la solidarité de nos soutiens et de nos partenaires. Que vous souhaitiez faire un don ponctuel, offrir votre temps ou nouer un partenariat stratégique, chaque contribution nous aide à avancer vers plus de dignité et d'égalité.
          </p>
        </div>
      </div>

      {/* Maquette : Faire un don + actions */}
      <div className="container-fluid bg-light">
        <div className="container py-5">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: '900px' }}>
            <div className="d-flex align-items-center justify-content-center mb-3">
              <div style={{ height: '1px', background: '#f39c12', width: '40px' }}></div>
              <span className="text-uppercase fw-bold" style={{ color: '#2864ae', fontSize: '0.85rem', letterSpacing: '2px', margin: '0 14px' }}>Le levier le plus direct</span>
              <div style={{ height: '1px', background: '#f39c12', width: '40px' }}></div>
            </div>
            <h2 className="fw-black text-uppercase mb-4" style={{ color: '#2864ae', fontSize: '3rem', lineHeight: 1.05 }}>Faire un don</h2>
            <p className="text-muted mx-auto" style={{ maxWidth: '720px', fontSize: '1.05rem', lineHeight: '1.8' }}>
              Votre don est transformé en action immédiate sur le terrain. Ce n'est pas une simple contribution — c'est un investissement dans la dignité et l'avenir.
            </p>
          </div>

          <div className="row gy-4 mb-5">
            {[
              { amount: '5 000 FCFA', label: '1 kit de dignité menstruelle complet pour une collégienne' },
              { amount: '25 000 FCFA', label: '1 journée de formation en gestion pour une femme entrepreneure' },
              { amount: '50 000 FCFA', label: 'Organisation d’une causerie sur les VBG pour 35 jeunes' }
            ].map((item) => (
              <div className="col-md-4" key={item.amount}>
                <div className="bg-white rounded-4 p-4 h-100 shadow-sm" style={{ border: '1px solid rgba(40,100,174,0.1)' }}>
                  <div className="fw-black mb-3" style={{ color: '#2864ae', fontSize: '1.5rem' }}>{item.amount}</div>
                  <p className="text-muted mb-0" style={{ lineHeight: '1.75' }}>{item.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="rounded-4 p-5" style={{ background: '#2864ae', borderLeft: '5px solid #f39c12', color: '#fff' }}>
                <h4 className="fw-bold mb-4" style={{ color: '#f39c12', letterSpacing: '1px', textTransform: 'uppercase' }}>Coordonnées de don</h4>
                <p className="mb-2"><strong>Mobile Money :</strong> <a href="tel:+2290195333344" className="text-white text-decoration-none">+229 01 95 33 33 44</a> / <a href="tel:+2290197374955" className="text-white text-decoration-none">+229 01 97 37 49 55</a></p>
                <p className="mb-2"><strong>Email pour virement :</strong> <a href="mailto:ongbusola@gmail.com" className="text-white text-decoration-none">ongbusola@gmail.com</a></p>
                <p className="mb-2"><strong>Adresse :</strong> Parakou, Arafat — non loin de l'hôtel Marie Rose, Bénin</p>
                <p className="mt-3 mb-0" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem' }}>
                  Nous accusons réception de chaque don et fournissons un reçu sur demande. Votre confiance nous honore.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid bg-white">
        <div className="container py-5">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: '900px' }}>
            <div className="d-flex align-items-center justify-content-center mb-3">
              <div style={{ height: '1px', background: '#2864ae', width: '40px' }}></div>
              <span className="text-uppercase fw-bold" style={{ color: '#2864ae', fontSize: '0.85rem', letterSpacing: '2px', margin: '0 14px' }}>Engagez-vous</span>
              <div style={{ height: '1px', background: '#2864ae', width: '40px' }}></div>
            </div>
            <h2 className="fw-black text-uppercase mb-4" style={{ color: '#2864ae', fontSize: '3rem', lineHeight: 1.05 }}>Trois façons d'agir</h2>
          </div>

          <div className="row gy-4">
            <div className="col-md-4">
              <div className="rounded-4 p-4 h-100 shadow-sm" style={{ border: '1px solid rgba(40,100,174,0.1)' }}>
                <div className="d-flex align-items-center justify-content-center rounded-circle mb-4" style={{ width: '72px', height: '72px', background: '#2864ae', color: '#f39c12' }}><Handshake size={32} /></div>
                <h3 className="fw-bold mb-3" style={{ color: '#2864ae' }}>Devenir Partenaire</h3>
                <p className="text-muted" style={{ lineHeight: '1.8' }}>
                  Vous êtes une entreprise, une fondation, une institution ? Collaborons pour démultiplier notre impact. Mettons en commun nos expertises, nos réseaux et nos ressources pour concevoir et déployer des projets innovants.
                </p>
                <button className="btn btn-primary rounded-pill mt-4 px-4 py-2 fw-bold" onClick={() => window.location.href = 'mailto:ongbusola@gmail.com?subject=Proposition%20de%20partenariat'}>
                  Proposer un partenariat
                </button>
              </div>
            </div>

            <div className="col-md-4">
              <div className="rounded-4 p-4 h-100 shadow-sm" style={{ border: '1px solid rgba(40,100,174,0.1)' }}>
                <div className="d-flex align-items-center justify-content-center rounded-circle mb-4" style={{ width: '72px', height: '72px', background: '#f39c12', color: '#2864ae' }}><Star size={32} /></div>
                <h3 className="fw-bold mb-3" style={{ color: '#2864ae' }}>Devenir Bénévole</h3>
                <p className="text-muted" style={{ lineHeight: '1.8' }}>
                  Notre plus grande richesse, c'est notre capital humain. Compétences en animation, communication, gestion de projet, santé — votre engagement est précieux. Rejoignez une équipe dynamique et diverse.
                </p>
                <button className="btn btn-secondary rounded-pill mt-4 px-4 py-2 fw-bold text-white" onClick={() => window.location.href = 'mailto:ongbusola@gmail.com?subject=Candidature%20de%20bénévolat'}>
                  Rejoindre l'équipe
                </button>
              </div>
            </div>

            <div className="col-md-4">
              <div className="rounded-4 p-4 h-100 shadow-sm" style={{ border: '1px solid rgba(40,100,174,0.1)' }}>
                <div className="d-flex align-items-center justify-content-center rounded-circle mb-4" style={{ width: '72px', height: '72px', background: 'var(--brand-tertiary)', color: '#fff' }}><Megaphone size={32} /></div>
                <h3 className="fw-bold mb-3" style={{ color: '#2864ae' }}>Sensibiliser autour de vous</h3>
                <p className="text-muted" style={{ lineHeight: '1.8' }}>
                  Partagez nos actions sur les réseaux sociaux, parlez de nous à votre entourage. Amplifiez nos messages sur les droits des femmes et des jeunes. Chaque partage compte et peut changer une vie.
                </p>
                <a href="https://web.facebook.com/profile.php?id=100064788966440" target="_blank" rel="noopener noreferrer" className="btn btn-tertiary rounded-pill mt-4 px-4 py-2 fw-bold">
                  Suivre sur Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5 text-center wow fadeIn">
        <div className="d-flex align-items-center justify-content-center mb-3">
          <div style={{ height: "1px", background: "var(--brand-tertiary)", width: "40px" }}></div>
          <span className="text-uppercase mx-2 fw-bold" style={{ color: 'var(--brand-tertiary)', fontSize: '0.9rem', letterSpacing: '2px' }}>NOS PARTENAIRES</span>
          <div style={{ height: "1px", background: "var(--brand-tertiary)", width: "40px" }}></div>
        </div>
        
        <div className="row align-items-center justify-content-center mt-4">
          {[
            'unfpa.png', 'unicef.png', 'unicri.svg', 
            'logo-uk.jpg', 'canada.png', 'logo-suisse.png', 
            'logo-mdm.png', 'logo-care.png', 'engender.png', 
            'roajelf.jpeg', 'sianson.png', 'barika.jpg', 'wendia.jpg'
          ].map((img, i) => (
            <div key={i} className="col-4 col-md-3 col-lg-2 p-3 text-center">
              <img src={`/${img}`} className="img-fluid transition-all" 
                   style={{ maxHeight: "120px", objectFit: "contain", cursor: "pointer" }} 
                   onMouseOver={e => { e.currentTarget.style.transform = 'scale(1.1)'; }}
                   onMouseOut={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                   alt="partner" />
            </div>
          ))}
        </div>
      </div>

      {/* Toggles */}
      <div className="container pb-5">
        <div className="d-flex justify-content-center flex-wrap gap-3 mb-5">
          <button 
            className={`btn px-5 py-3 rounded-pill fw-bold fs-5 shadow-sm transition-all ${activeTab === 'don' ? 'btn-primary text-white' : 'btn-outline-primary'}`}
            onClick={() => setActiveTab('don')}
          >
            <Heart className="me-2" size={24} /> Faire un don
          </button>
          <button 
            className={`btn px-5 py-3 rounded-pill fw-bold fs-5 shadow-sm transition-all ${activeTab === 'benevole' ? 'btn-secondary text-white' : 'btn-outline-secondary'}`}
            onClick={() => setActiveTab('benevole')}
          >
            <Users className="me-2" size={24} /> Devenir bénévole
          </button>
          <button 
            className={`btn px-5 py-3 rounded-pill fw-bold fs-5 shadow-sm transition-all ${activeTab === 'partenaire' ? 'btn-tertiary text-white' : 'btn-outline-tertiary'}`}
            onClick={() => setActiveTab('partenaire')}
          >
            <Handshake className="me-2" size={24} /> Devenir partenaire
          </button>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-10">
            {/* OBTENTION DON */}
            {activeTab === 'don' && (
              <div className="bg-light p-5 rounded-5 shadow-sm animate-fade-in border" style={{ borderColor: 'rgba(40,100,174,0.1)' }}>
                <div className="row g-5 align-items-center">
                  <div className="col-md-6">
                    <img src="/optimized/action-3.webp" className="img-fluid rounded-4 shadow" alt="Impact du don" style={{ objectFit: 'cover', height: '100%', minHeight: '350px' }}  loading="lazy" decoding="async" />
                  </div>
                  <div className="col-md-6">
                    <h3 className="fw-bold mb-4" style={{ color: 'var(--brand-primary)' }}>Soutenez nos actions sur le terrain</h3>
                    <p className="text-muted mb-4" style={{ textAlign: 'justify' }}>
                      Votre don aide directement des jeunes filles à rester à l'école, des femmes à accéder à l'alphabétisation, et des communautés à prévenir les violences basées sur le genre.
                    </p>
                    <div className="d-flex align-items-center mb-3">
                      <ShieldCheck size={28} className="text-tertiary me-3" />
                      <span className="fw-semi-bold">Paiement 100% sécurisé et transparent</span>
                    </div>
                    <div className="d-flex align-items-center mb-4">
                      <Heart size={28} className="text-secondary me-3" />
                      <span className="fw-semi-bold">Rapport d'impact partagé chaque année</span>
                    </div>
                    
                    <a href="mailto:ongbusola@gmail.com?subject=Soutien%20Financier" className="btn btn-primary btn-lg w-100 rounded-pill py-3 fw-bold shadow">
                      Contactez-nous pour aider <ArrowRight className="ms-2" size={20} />
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* BENEVOLAT */}
            {activeTab === 'benevole' && (
              <div className="bg-light p-5 rounded-5 shadow-sm animate-fade-in border" style={{ borderColor: 'rgba(243,156,18,0.1)' }}>
                <div className="row g-5 align-items-center">
                  <div className="col-md-6 order-md-2">
                    <img src="/optimized/team-1.webp" className="img-fluid rounded-4 shadow" alt="Bénévolat" style={{ objectFit: 'cover', height: '100%', minHeight: '350px' }}  loading="lazy" decoding="async" />
                  </div>
                  <div className="col-md-6 order-md-1">
                    <h3 className="fw-bold mb-4" style={{ color: '#f39c12' }}>Rejoignez notre équipe d'action</h3>
                    <p className="text-muted mb-4" style={{ textAlign: 'justify' }}>
                      Vous êtes développeur, communicant, spécialiste de la santé, formateur ou simplement désireux d'agir pour les droits humains ? Busola cherche des profils engagés et dynamiques.
                    </p>
                    <ul className="list-unstyled text-muted mb-4">
                      <li className="mb-2"><i className="fa fa-check text-secondary me-2"></i>Missions de terrain et plaidoyer</li>
                      <li className="mb-2"><i className="fa fa-check text-secondary me-2"></i>Actions de communication & événements</li>
                      <li className="mb-2"><i className="fa fa-check text-secondary me-2"></i>Expertise technique (Santé, Droit)</li>
                    </ul>
                    <a href="mailto:ongbusola@gmail.com?subject=Candidature%20de%20Bénévolat" className="btn btn-secondary btn-lg w-100 text-white rounded-pill py-3 fw-bold shadow">
                      Soumettre mon profil <Mail className="ms-2" size={20} />
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* PARTENARIAT */}
            {activeTab === 'partenaire' && (
              <div className="bg-light p-5 rounded-5 shadow-sm animate-fade-in border" style={{ borderColor: 'rgba(39,174,96,0.1)' }}>
                <div className="row g-5 align-items-center">
                  <div className="col-md-6">
                    <div className="row g-2 justify-content-center">
                      {['unfpa.png', 'unicef.png', 'canada.png', 'logo-uk.jpg'].map((p, i) => (
                        <div className="col-6" key={i}>
                          <div className="bg-white p-3 rounded-4 shadow-sm h-100 d-flex align-items-center justify-content-center">
                            <img src={`/${p}`} className="img-fluid" style={{ maxHeight: '80px', objectFit: 'contain' }} alt="Partner"  loading="lazy" decoding="async" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <h3 className="fw-bold mb-4" style={{ color: 'var(--brand-tertiary)' }}>Inscrivez votre RSE dans l'action</h3>
                    <p className="text-muted mb-4" style={{ textAlign: 'justify' }}>
                      Les fondations, entreprises et ambassades sont les piliers de notre croissance. Nous développons des projets sur mesure garantissant un suivi exigeant des indicateurs techniques et financiers.
                    </p>
                    <p className="text-muted mb-4">
                      Nous proposons un partenariat :<br/>
                      <strong>► Financier</strong> (Financement direct de projets)<br/>
                      <strong>► Technique</strong> (Appui et échange de compétences)<br/>
                      <strong>► Médiatique</strong> (Visibilité mutuelle et campagnes)
                    </p>
                    <a href="mailto:ongbusola@gmail.com?subject=Proposition%20de%20Partenariat" className="btn btn-tertiary text-white btn-lg w-100 rounded-pill py-3 fw-bold shadow">
                      Discutons-en ensemble <Handshake className="ms-2" size={20} />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
