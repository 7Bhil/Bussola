import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLandmark, faSearch, faHandshake, faBolt, faRocket } from '@fortawesome/free-solid-svg-icons';
import { 
  HeartPulse, 
  Scale, 
  GraduationCap, 
  Handshake, 
  TrendingUp, 
  Megaphone,
  FileText,
  BookOpen,
  Home,
  Lightbulb,
  Target,
  Heart,
  Building,
  Sprout,
  Mountain,
  Trees,
  Users
} from 'lucide-react';

// ─── Animated Counter Hook ────────────────────────────────────────────────────
function useCountUp(target: number, duration = 2000, trigger: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [trigger, target, duration]);
  return count;
}

// ─── Shared design tokens (True colors of the site) ─────────────────────────
const cobalt = '#2864ae'; // Primary Blue
const cobaltMid = '#205295';
const cobaltBright = '#2864ae';
const gold = '#f39c12'; // Secondary Gold/Orange
const goldWarm = 'var(--brand-secondary)';
const goldPale = '#f8f2e2';
const sable = '#f8f9fa';
const cream = '#ffffff';
const muted = '#555555';
const border = 'rgba(40, 100, 174, 0.1)';
const serif = '"Poppins", Georgia, serif';
const cond = '"Barlow Condensed", "Arial Black", Impact, sans-serif';
const sans = '"Inter", system-ui, sans-serif';

export default function AboutSection() {
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const count1 = useCountUp(15000, 2000, statsVisible);
  const count2 = useCountUp(50, 2000, statsVisible);
  const count3 = useCountUp(30, 2000, statsVisible);
  const count4 = useCountUp(25, 2000, statsVisible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  // ── Styles ──────────────────────────────────────────────────────────────────
  const labelStyle: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: '12px',
    fontSize: '10.5px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase',
    color: cobaltBright, marginBottom: '14px', fontFamily: sans,
  };
  const labelBeforeStyle: React.CSSProperties = {
    content: "''", width: '32px', height: '2px', background: gold,
    display: 'inline-block', flexShrink: 0,
  };

  return (
    <>
      {/* ── 1. NOTRE HISTOIRE ────────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(64px,8vh,110px) clamp(1.5rem,5vw,3rem)', background: cream, fontFamily: sans }}>
        <div style={{ maxWidth: '1260px', margin: 'auto' }}>
          
          {/* Centered header */}
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div style={{ ...labelStyle, justifyContent: 'center' }}>
              <span style={labelBeforeStyle}></span>Notre origine<span style={labelBeforeStyle}></span>
            </div>
            <h2 style={{ fontFamily: cond, fontSize: 'clamp(38px,5vw,62px)', fontWeight: 900, lineHeight: .95, textTransform: 'uppercase', letterSpacing: '-1px', color: cobalt }}>
              Notre histoire : une conviction née à Parakou
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}
               className="story-layout-responsive">

            {/* Image */}
            <div style={{ aspectRatio: '4/3', background: sable, borderRadius: '4px', border: `1px solid ${border}`, overflow: 'hidden' }}>
              <img
                src="/optimized/about.webp"
                alt="Équipe Busola"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
               loading="lazy" decoding="async" />
            </div>

            {/* Texte */}
            <div>
              <p style={{ fontSize: '16px', color: muted, lineHeight: 2.2, marginBottom: '24px' }}>
                Créée en 2020 à Parakou, BUSOLA est le fruit d'un engagement citoyen et associatif porté par des femmes et des jeunes acteurs du développement, convaincus que les réponses aux défis sociaux devaient être locales, inclusives et ancrées dans les communautés.
              </p>
              <p style={{ fontSize: '16px', color: muted, lineHeight: 2.2, marginBottom: '24px' }}>
                Le nom <strong>Busola</strong>, qui signifie <strong>augmenter le prestige</strong> en yoruba, incarne notre vocation : accompagner chaque individu vers un avenir où il dispose pleinement du pouvoir d'agir, de décider et de transformer positivement sa communauté. Nous sommes une organisation née du terrain, pour le terrain, guidée par la promesse de : Unir, Eduquer, Protéger et Autonomiser.              </p>
              <p style={{ fontSize: '16px', color: muted, lineHeight: 2.2, marginBottom: '32px' }}>
                En 6 ans d'existence, nous avons prouvé qu'une ONG jeune, locale et engagée peut porter des projets à impact réel, mobiliser des partenaires de confiance et transformer des vies concrètes dans les communes les plus éloignées du Bénin.
              </p>

              {/* Stats mini */}
              <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
                {[
                  { n: '2020', label: 'Année de création', suffix: '' },
                  { n: '6', suffix: 'ans', label: "d'impact continu" },
                  { n: '9', label: 'projets en 2025', suffix: '' },
                ].map((s, i) => (
                  <div key={i}>
                    <div style={{ fontFamily: cond, fontSize: '42px', fontWeight: 900, color: cobalt, lineHeight: 1 }}>
                      {s.n}{s.suffix && <span style={{ fontSize: '24px' }}>{s.suffix}</span>}
                    </div>
                    <div style={{ fontSize: '13px', color: muted, marginTop: '4px' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SLOGAN SECTION ────────────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(60px,8vh,100px) clamp(1.5rem,5vw,3rem)', background: sable, fontFamily: sans }}>
        <div style={{
          maxWidth: '900px',
          margin: 'auto',
          background: 'linear-gradient(135deg, #2864ae 0%, #1e4b83 50%, #27b074 100%), url(/images/motif-logo-54.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '24px',
          border: '2px solid rgba(255,255,255,0.15)',
          padding: 'clamp(50px,8vh,90px) clamp(30px,5vw,60px)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 25px 70px rgba(10,20,50,.4)'
        }}>
          {/* Subtle glow */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,.15) 0%, transparent 70%)', pointerEvents: 'none' }}></div>

          <h2 style={{
            fontFamily: cond,
            fontSize: 'clamp(40px, 6.5vw, 72px)',
            fontWeight: 900,
            fontStyle: 'italic',
            textTransform: 'uppercase',
            color: '#ffffff',
            lineHeight: 0.95,
            letterSpacing: '-2px',
            marginBottom: '24px',
            position: 'relative',
            zIndex: 1
          }}>
            <span style={{
              color: '#f89d2a',
              fontStyle: 'italic'
            }}>LA PAIX </span> COMMENCE<br />
            QUAND <br />
            <span style={{
              color: '#f89d2a',
              fontStyle: 'italic'
            }}>LA VIOLENCE </span>S'ARRÊTE
          </h2>

          <p style={{ 
            color: 'rgba(255,255,255,.85)', 
            fontSize: '17px', 
            fontWeight: 500,
            fontStyle: 'italic', 
            lineHeight: 1.7, 
            maxWidth: '550px', 
            margin: '0 auto', 
            position: 'relative', 
            zIndex: 1 
          }}>
            « Nous sommes <strong>BUSOLA</strong>. Nous sommes la lumière qui oriente et le moteur qui transforme. »
          </p>
        </div>
      </section>

      {/* ── SECTIONS STRATÉGIQUES ET OPÉRATIONNELLES (Axes, Projets, Terrain, Partenaires) ── */}
      
      {/* Section 1: Nos axes stratégiques */}
      <section style={{ padding: '80px 0', background: '#faf9f6', fontFamily: sans }}>
        <div className="container">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: '800px' }}>
            <div style={{ ...labelStyle, justifyContent: 'center' }}>
              <span style={labelBeforeStyle}></span>Ce que nous faisons<span style={labelBeforeStyle}></span>
            </div>
            <h2 style={{ fontFamily: cond, fontSize: 'clamp(2.2rem, 4vw, 3rem)', fontWeight: 900, textTransform: 'uppercase', color: 'var(--brand-text)', marginBottom: '16px', letterSpacing: '-0.5px' }}>
              Nos axes stratégiques
            </h2>
            <p className="text-muted" style={{ fontSize: '1.05rem', lineHeight: '1.6' }}>
              Cinq domaines d'intervention complémentaires pour un impact durable sur les communautés du nord-Bénin.
            </p>
          </div>

          <div className="row g-4 justify-content-center">
            {[
              {
                title: "Santé Sexuelle & Reproductive",
                desc: "Éducation complète à la sexualité, prévention des grossesses précoces, IST/VIH, accès aux services de santé adaptés pour les adolescentes et jeunes femmes de 10 à 24 ans.",
                icon: <HeartPulse size={24} style={{ color: 'var(--brand-primary)' }} />,
                bg: 'rgba(39, 100, 174, 0.08)',
                borderColor: 'var(--brand-primary)'
              },
              {
                title: "Prévention et lutte contre les VBG",
                desc: "Sensibilisation, collecte de données, plaidoyer pour l'ouverture des centres CIPEC-VBG, formation des acteurs communautaires et leaders religieux.",
                icon: <Scale size={24} style={{ color: 'var(--brand-secondary)' }} />,
                bg: 'rgba(245, 159, 35, 0.08)',
                borderColor: 'var(--brand-secondary)'
              },
              {
                title: "Alphabétisation & Éducation",
                desc: "Gestion de centres d'alphabétisation en langues locales (Yom, Dendi, Fulfuldé, Lopka) pour l'autonomisation des adultes dans les communes rurales.",
                icon: <GraduationCap size={24} style={{ color: 'var(--brand-tertiary)' }} />,
                bg: 'rgba(59, 177, 67, 0.08)',
                borderColor: 'var(--brand-tertiary)'
              },
              {
                title: "Cohésion Sociale & Paix",
                desc: "Cadres de dialogue communautaire et intergénérationnel, prévention de la radicalisation et promotion du vivre-ensemble pacifique.",
                icon: <Handshake size={24} style={{ color: 'var(--brand-primary)' }} />,
                bg: 'rgba(39, 100, 174, 0.08)',
                borderColor: 'var(--brand-primary)'
              },
              {
                title: "Autonomisation Économique",
                desc: "Formations aux activités génératrices de revenus (AGR), techniques de pépinière, gestion financière de base et accès aux micro-crédits.",
                icon: <TrendingUp size={24} style={{ color: 'var(--brand-secondary)' }} />,
                bg: 'rgba(245, 159, 35, 0.08)',
                borderColor: 'var(--brand-secondary)'
              },
              {
                title: "Plaidoyer & Communication",
                desc: "Campagnes digitales, téléfilms éducatifs, théâtre communautaire, formation en plaidoyer pour amplifier la voix des sans-voix.",
                icon: <Megaphone size={24} style={{ color: 'var(--brand-tertiary)' }} />,
                bg: 'rgba(59, 177, 67, 0.08)',
                borderColor: 'var(--brand-tertiary)'
              }
            ].map((axe, i) => (
              <div key={i} className="col-lg-4 col-md-6">
                <div 
                  className="h-100 p-4 bg-white border shadow-sm transition-all"
                  style={{ 
                    borderRadius: '20px', 
                    borderTop: `5px solid ${axe.borderColor}`,
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 .125rem .25rem rgba(0,0,0,.075)';
                  }}
                >
                  <div className="d-flex align-items-center justify-content-center rounded-circle mb-4"
                       style={{ width: '56px', height: '56px', backgroundColor: axe.bg }}>
                    {axe.icon}
                  </div>
                  <h4 style={{ fontFamily: cond, fontSize: '1.4rem', fontWeight: 800, color: 'var(--brand-text)', marginBottom: '12px' }}>
                    {axe.title}
                  </h4>
                  <p className="text-muted mb-0" style={{ fontSize: '0.92rem', lineHeight: '1.6', textAlign: 'justify' }}>
                    {axe.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Projets en cours */}
      <section style={{ padding: '80px 0', background: '#ffffff', fontFamily: sans }}>
        <div className="container">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: '800px' }}>
            <span className="text-uppercase fw-bold" style={{ color: 'var(--brand-secondary)', fontSize: '0.9rem', letterSpacing: '2px', display: 'block', marginBottom: '8px' }}>
              NOS INTERVENTIONS ACTUELLES
            </span>
            <h2 style={{ fontFamily: cond, fontSize: 'clamp(2.2rem, 4vw, 3rem)', fontWeight: 900, textTransform: 'uppercase', color: 'var(--brand-text)', marginBottom: '16px', letterSpacing: '-0.5px' }}>
              Projets en cours
            </h2>
            <p className="text-muted" style={{ fontSize: '1.05rem', lineHeight: '1.6' }}>
              Des initiatives financées par des partenaires de confiance et par nos propres ressources pour maximiser l'impact sur le terrain.
            </p>
          </div>

          <div className="row g-4">
            {[
              {
                title: "Programme RESPECT - Année 4",
                desc: "Accroître la jouissance des droits de santé pour les adolescentes et jeunes femmes (10-24 ans). Données VBG, plaidoyer, téléfilm éducatif, ouverture CIPEC-VBG.",
                partner: "Médecins du Monde / ROAJELF Bénin",
                partnerLogos: ['/logo-mdm.png', '/roajelf.jpeg'],
                headerBg: 'var(--brand-primary)',
                themeColor: 'var(--brand-primary)',
                icon: <FileText size={20} className="text-white" />
              },
              {
                title: "PAGEDA II - Alphabétisation",
                desc: "Renforcement de l'éducation non formelle dans la commune de Copargo. Reprise des cours, dotation en matériels pédagogiques, évaluation finale avec 100% de réussite.",
                partner: "SIA N'SON ONG / Coopération Suisse",
                partnerLogos: ['/logo-suisse.png'],
                headerBg: 'var(--brand-secondary)',
                themeColor: 'var(--brand-secondary)',
                icon: <BookOpen size={20} className="text-white" />
              },
              {
                title: "TEDIDJO 3 - \"Baani Gordo\"",
                desc: "Espaces sûrs pour 1500 adolescentes à Nikki et Karimama. Santé reproductive, prévention VBG, leadership féminin. Durée : Août 2025 – Juillet 2026.",
                partner: "CARE Bénin/Togo / FJSI",
                partnerLogos: ['/logo-care.png', '/LOGO FJSI.jpg(1).jpeg'],
                headerBg: 'var(--brand-tertiary)',
                themeColor: 'var(--brand-tertiary)',
                icon: <Home size={20} className="text-white" />
              },
              {
                title: "Projet YES - Phase 3",
                desc: "Bootcamp de 50 jeunes à Karigui et Fadama, théâtre communautaire, réseau d'ambassadeurs DSSR pour lutter contre les mariages précoces à Karimama.",
                partner: "UNFPA Bénin / CARE Bénin-Togo",
                partnerLogos: ['/unfpa.png', '/logo-care.png'],
                headerBg: 'var(--brand-primary)',
                themeColor: 'var(--brand-primary)',
                icon: <Lightbulb size={20} className="text-white" />
              },
              {
                title: "Résilience des Jeunes de Matéri (RéJeM)",
                desc: "Offrir aux jeunes de Matéri des alternatives concrètes et locales face aux activités illicites, en transformant les défis sécuritaires en opportunités de développement.",
                partner: "Commune de Matéri / Partenaires locaux",
                partnerLogos: ['/logo-hands.png', '/unicri.svg'],
                headerBg: 'var(--brand-tertiary)',
                themeColor: 'var(--brand-tertiary)',
                icon: <HeartPulse size={20} className="text-white" />
              }
            ].map((proj, i) => (
              <div key={i} className="col-lg-4 col-md-6">
                <div 
                  className="h-100 bg-white border shadow-sm transition-all overflow-hidden"
                  style={{ 
                    borderRadius: '20px',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 .125rem .25rem rgba(0,0,0,.075)';
                  }}
                >
                  <div 
                    className="p-3 d-flex align-items-center gap-3 text-white"
                    style={{ backgroundColor: proj.headerBg }}
                  >
                    <div className="d-flex align-items-center justify-content-center rounded"
                         style={{ width: '38px', height: '38px', backgroundColor: proj.themeColor }}>
                      {proj.icon}
                    </div>
                    <h5 className="mb-0 fw-bold" style={{ fontFamily: cond, fontSize: '1.15rem', letterSpacing: '0.3px', textTransform: 'uppercase', color: '#ffffff' }}>
                      {proj.title}
                    </h5>
                  </div>
                  <div className="p-4 flex-grow-1 d-flex flex-column justify-content-between">
                    <p className="text-muted mb-4" style={{ fontSize: '0.92rem', lineHeight: '1.6', textAlign: 'justify' }}>
                      {proj.desc}
                    </p>
                    <div className="pt-3 border-top d-flex align-items-center gap-2" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
                      {proj.partnerLogos ? (
                        <div className="d-flex align-items-center gap-2 flex-wrap">
                          {proj.partnerLogos.map((logo, li) => (
                            <img
                              key={li}
                              src={logo.endsWith('.svg') ? logo : `/optimized/${logo.substring(1).split('.')[0]}.webp`}
                              alt="Logo partenaire"
                              style={{ height: '18px', width: 'auto', objectFit: 'contain', maxWidth: '70px' }}
                             loading="lazy" decoding="async" />
                          ))}
                        </div>
                      ) : (
                        <>
                          <Handshake size={16} style={{ color: proj.themeColor }} />
                          <span className="fw-bold" style={{ fontSize: '0.82rem', color: proj.themeColor }}>
                            {proj.partner}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Sur le terrain au Bénin */}
      <section style={{ padding: '80px 0', background: '#faf9f6', fontFamily: sans }}>
        <div className="container">
          <div className="mb-4 overflow-hidden rounded-4" style={{ background: '#198754', color: '#fff', boxShadow: '0 12px 30px rgba(0,0,0,0.12)' }}>
            <marquee behavior="scroll" direction="left" scrollamount="6" style={{ padding: '16px 24px', fontSize: '1rem', fontWeight: 700, letterSpacing: '0.6px' }}>
              Busola ONG agit sur le terrain au Bénin : Borgou, Alibori, Atacora, Donga. Nos équipes apportent santé, prévention et autonomisation au plus près des communautés.
            </marquee>
          </div>
          <div className="text-center mx-auto mb-5" style={{ maxWidth: '800px' }}>
            <div style={{ ...labelStyle, justifyContent: 'center' }}>
              <span style={labelBeforeStyle}></span>Zone d'intervention<span style={labelBeforeStyle}></span>
            </div>
            <h2 style={{ fontFamily: cond, fontSize: 'clamp(2.2rem, 4vw, 3rem)', fontWeight: 900, textTransform: 'uppercase', color: 'var(--brand-text)', marginBottom: '16px', letterSpacing: '-0.5px' }}>
              Sur le terrain au Bénin
            </h2>
            <p className="text-muted" style={{ fontSize: '1.05rem', lineHeight: '1.6' }}>
              L'ONG BUSOLA intervient principalement dans quatre départements du nord du Bénin, avec un ancrage particulier au coeur des communes et des villages.
            </p>
          </div>

          <div className="row g-4 mb-5">
            {[
              {
                name: "Borgou",
                sub: "Siège social - Parakou",
                icon: <Building size={32} style={{ color: 'var(--brand-primary)' }} />,
                bg: 'rgba(39, 100, 174, 0.08)',
                borderColor: 'var(--brand-primary)'
              },
              {
                name: "Alibori",
                sub: "Commune de Karimama",
                icon: <Sprout size={32} style={{ color: 'var(--brand-secondary)' }} />,
                bg: 'rgba(245, 159, 35, 0.08)',
                borderColor: 'var(--brand-secondary)'
              },
              {
                name: "Atacora",
                sub: "Commune de Copargo",
                icon: <Mountain size={32} style={{ color: 'var(--brand-tertiary)' }} />,
                bg: 'rgba(59, 177, 67, 0.08)',
                borderColor: 'var(--brand-tertiary)'
              },
              {
                name: "Donga",
                sub: "Communes rurales",
                icon: <Trees size={32} style={{ color: 'var(--brand-primary)' }} />,
                bg: 'rgba(39, 100, 174, 0.08)',
                borderColor: 'var(--brand-primary)'
              }
            ].map((d, i) => (
              <div key={i} className="col-lg-3 col-sm-6">
                <div 
                  className="p-4 text-center bg-white border h-100 transition-all"
                  style={{ 
                    borderRadius: '20px',
                    borderColor: 'rgba(0,0,0,0.06)',
                    borderTop: `5px solid ${d.borderColor}`,
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 .125rem .25rem rgba(0,0,0,.075)';
                  }}
                >
                  <div className="d-flex align-items-center justify-content-center rounded-circle mx-auto mb-3"
                       style={{ width: '64px', height: '64px', backgroundColor: d.bg }}>
                    {d.icon}
                  </div>
                  <h4 className="fw-bold mb-1" style={{ fontFamily: cond, fontSize: '1.4rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--brand-text)' }}>
                    {d.name}
                  </h4>
                  <span className="text-muted" style={{ fontSize: '0.85rem' }}>
                    {d.sub}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Communautés d'intervention box */}
          <div 
            className="p-5 bg-white border shadow-sm"
            style={{ borderRadius: '24px' }}
          >
            <div className="row g-4 align-items-center">
              <div className="col-lg-7">
                <h3 style={{ fontFamily: cond, fontSize: '1.8rem', fontWeight: 900, textTransform: 'uppercase', color: 'var(--brand-primary)', marginBottom: '16px' }}>
                  Nos communautés d'intervention
                </h3>
                <p className="text-muted mb-0" style={{ fontSize: '0.95rem', lineHeight: '1.7', textAlign: 'justify' }}>
                  Nous travaillons au cœur des villages les plus reculés, là où les services de base sont insuffisants et où les jeunes filles sont les plus vulnérables aux violences et aux mariages précoces. Nos équipes de bénévoles, formées et accompagnées, constituent le premier point de contact avec les communautés de Karimama, Malanville, Gogounou, Nikki, Parakou, Copargo et Tchaourou.
                </p>
              </div>
              <div className="col-lg-5">
                <div className="d-flex flex-wrap gap-2 justify-content-lg-end">
                  {[
                    { name: "Karimama", bg: 'var(--brand-primary)' },
                    { name: "Malanville", bg: 'var(--brand-primary)' },
                    { name: "Gogounou", bg: 'var(--brand-secondary)' },
                    { name: "Nikki", bg: 'var(--brand-secondary)' },
                    { name: "Parakou", bg: 'var(--brand-tertiary)' },
                    { name: "Copargo", bg: 'var(--brand-tertiary)' },
                    { name: "Tchaourou", bg: 'var(--brand-primary)' }
                  ].map((c, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-2 text-white fw-bold shadow-sm transition-all"
                      style={{ 
                        backgroundColor: c.bg, 
                        borderRadius: '10px', 
                        fontSize: '0.82rem',
                        letterSpacing: '0.3px',
                        cursor: 'default'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      {c.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. VISION & MISSION ──────────────────────────────────────────────── */}
      <section style={{ background: sable, fontFamily: sans }}>
        <div style={{ maxWidth: '1260px', margin: 'auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', background: border }} className="story-layout-responsive">
            {/* Vision */}
            <div style={{ background: cream, padding: '48px 40px', textAlign: 'center' }}>
              <div style={{ ...labelStyle, justifyContent: 'center' }}>
                <span style={labelBeforeStyle}></span>Notre cap<span style={labelBeforeStyle}></span>
              </div>
              <h3 style={{ fontFamily: cond, fontSize: '32px', fontWeight: 900, textTransform: 'uppercase', color: cobalt, marginBottom: '16px', letterSpacing: '-0.5px' }}>Notre Vision</h3>
              <p style={{ fontSize: '15px', color: muted, lineHeight: 1.85 }}>
                Un Bénin où le potentiel de chaque femme et de chaque jeune est libéré pour bâtir des communautés justes, pacifiques et autonomes.
              </p>
            </div>
            {/* Mission */}
            <div style={{ background: 'var(--brand-tertiary)', padding: '48px 40px', textAlign: 'center' }}>
              <div style={{ ...labelStyle, color: 'rgba(255,255,255,.85)', justifyContent: 'center' }}>
                <span style={{ ...labelBeforeStyle, background: '#ffffff' }}></span>Notre engagement<span style={{ ...labelBeforeStyle, background: '#ffffff' }}></span>
              </div>
              <h3 style={{ fontFamily: cond, fontSize: '32px', fontWeight: 900, textTransform: 'uppercase', color: '#fff', marginBottom: '16px', letterSpacing: '-0.5px' }}>Notre Mission</h3>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,.9)', lineHeight: 1.85 }}>
                Renforcer le pouvoir d'agir des communautés, en particulier des femmes et des jeunes, en co-construisant des solutions locales pour la santé, la protection, l'autonomisation et la paix.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. NOS VALEURS ───────────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(64px,8vh,110px) clamp(1.5rem,5vw,3rem)', background: cream, fontFamily: sans }}>
        <div style={{ maxWidth: '1260px', margin: 'auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '0' }}>
            <div style={{ ...labelStyle, justifyContent: 'center' }}>
              <span style={labelBeforeStyle}></span>Ce qui nous anime<span style={labelBeforeStyle}></span>
            </div>
            <h2 style={{ fontFamily: cond, fontSize: 'clamp(38px,5vw,62px)', fontWeight: 900, lineHeight: .95, textTransform: 'uppercase', letterSpacing: '-1px', color: cobalt, marginBottom: '0' }}>
              NOS VALEURS
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, marginTop: '56px' }}
               className="valeurs-grid-responsive">
            {[
              { icon: faLandmark, titre: 'Centralité humaine', desc: "Nous plaçons l’individu au cœur du changement, sans jamais imposer." },
              { icon: faBolt, titre: 'Équité de genre', desc: "Nous œuvrons pour un monde où les femmes et les hommes bénéficient des mêmes opportunités." },
              { icon: faHandshake, titre: 'Partenariats', desc: "Nous agissons en synergie avec les communautés et organisations." },
              { icon: faSearch, titre: 'Excellence & Intégrité', desc: "Nous défendons la rigueur, la transparence et la qualité dans tout ce que nous faisons.", last: true },
            ].map((v, i) => (
              <div key={i} style={{
                padding: '40px 24px', textAlign: 'center',
                borderRight: v.last ? 'none' : `1px solid ${border}`,
                borderTop: `3px solid ${goldWarm}`,
              }}>
                <div style={{ fontSize: '28px', marginBottom: '16px', color: goldWarm }}>
                  <FontAwesomeIcon icon={v.icon} />
                </div>
                <h4 style={{ fontFamily: cond, fontSize: '16px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.5px', color: cobalt, marginBottom: '8px' }}>{v.titre}</h4>
                <p style={{ fontSize: '13px', color: muted, lineHeight: 1.6 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. NOTRE APPROCHE ────────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(64px,8vh,110px) clamp(1.5rem,5vw,3rem)', background: sable, fontFamily: sans }}>
        <div style={{ maxWidth: '1260px', margin: 'auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{ ...labelStyle, justifyContent: 'center' }}>
              <span style={labelBeforeStyle}></span>Méthodologie<span style={labelBeforeStyle}></span>
            </div>
            <h2 style={{ fontFamily: cond, fontSize: 'clamp(38px,5vw,62px)', fontWeight: 900, lineHeight: .95, textTransform: 'uppercase', letterSpacing: '-1px', color: cobalt, marginBottom: '16px' }}>
              NOTRE APPROCHE : FAIRE « AVEC », PAS « POUR »
            </h2>
            <p className="mx-auto" style={{ fontSize: '17px', color: muted, lineHeight: 1.8, maxWidth: '620px', marginBottom: 0 }}>
              Nous ne croyons pas aux solutions importées. Notre approche est celle de l'ingénierie du développement social, fondée sur l'écoute et la co-construction.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginTop: '52px' }}
               className="approach-grid-responsive">
            {[
              {
                n: '01', title: 'Proximité & Immersion',
                desc: "Nos équipes sont sur le terrain, au contact direct des réalités, pour comprendre les dynamiques locales avant d'agir. Pas de solution venue d'ailleurs — chaque intervention naît du dialogue avec la communauté."
              },
              {
                n: '02', title: 'Partenariat Stratégique',
                desc: "Nous travaillons en synergie avec les communautés, les autorités locales, les leaders traditionnels et d'autres organisations. C'est l'intelligence collective qui crée les changements les plus profonds."
              },
              {
                n: '03', title: "Renforcement du Pouvoir d'Agir",
                desc: "Notre but ultime est de rendre les communautés autonomes. Chaque projet est conçu pour transférer des compétences et renforcer les capacités locales pour une pérennité des actions."
              },
            ].map((c, i) => (
              <div key={i} style={{ padding: '36px 28px', background: cream, border: `1px solid ${border}`, borderRadius: '2px', borderTop: `3px solid ${cobalt}` }}>
                <div style={{ fontFamily: cond, fontSize: '48px', fontWeight: 900, color: 'rgba(40,100,174,.08)', lineHeight: 1, marginBottom: '12px' }}>{c.n}</div>
                <h3 style={{ fontFamily: cond, fontSize: '22px', fontWeight: 800, textTransform: 'uppercase', color: cobalt, marginBottom: '12px', letterSpacing: '0.3px' }}>{c.title}</h3>
                <p style={{ fontSize: '14px', color: muted, lineHeight: 1.75 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. IMPACT EN CHIFFRES ─────────────────────────────────────────────── */}
      <section style={{ padding: '80px 0', background: '#ffffff', fontFamily: sans }}>
        <div className="container">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: '800px' }}>
            <span className="text-uppercase fw-bold" style={{ color: 'var(--brand-secondary)', fontSize: '0.9rem', letterSpacing: '2px', display: 'block', marginBottom: '8px' }}>
              DES RÉSULTATS CONCRETS DEPUIS 2020
            </span>
            <h2 style={{ fontFamily: cond, fontSize: 'clamp(2.2rem, 4vw, 3rem)', fontWeight: 900, textTransform: 'uppercase', color: 'var(--brand-text)', marginBottom: '16px', letterSpacing: '-0.5px' }}>
              NOTRE IMPACT<br /><span style={{ color: 'var(--brand-secondary)' }}>EN QUELQUES CHIFFRES</span>
            </h2>
          </div>

          <div className="row g-4">
            {[
              { n: count1, suffix: '+', label: 'Bénéficiaires directs', sub: 'depuis 2020', icon: <FileText size={32} style={{ color: 'var(--brand-secondary)' }} />, bg: 'rgba(245, 159, 35, 0.1)', borderColor: 'var(--brand-secondary)' },
              { n: count2, suffix: '+', label: 'Projets et actions de terrain', sub: 'interventions', icon: <HeartPulse size={32} style={{ color: 'var(--brand-primary)' }} />, bg: 'rgba(39, 100, 174, 0.1)', borderColor: 'var(--brand-primary)' },
              { n: count3, suffix: '+', label: 'Autorités locales mobilisées', sub: 'partenaires', icon: <Users size={32} style={{ color: 'var(--brand-secondary)' }} />, bg: 'rgba(245, 159, 35, 0.1)', borderColor: 'var(--brand-secondary)' },
              { n: count4, suffix: '', label: 'Membres actifs', sub: 'équipe engagée', icon: <FileText size={32} style={{ color: 'var(--brand-primary)' }} />, bg: 'rgba(39, 100, 174, 0.1)', borderColor: 'var(--brand-primary)' },
            ].map((item, i) => (
              <div key={i} className="col-lg-3 col-md-6">
                <div 
                  className="p-4 text-center bg-white border h-100 transition-all"
                  style={{ 
                    borderRadius: '20px',
                    borderColor: 'rgba(0,0,0,0.06)',
                    borderTop: `5px solid ${item.borderColor}`,
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 .125rem .25rem rgba(0,0,0,.075)';
                  }}
                >
                  <div className="d-flex align-items-center justify-content-center rounded-circle mx-auto mb-3"
                       style={{ width: '64px', height: '64px', backgroundColor: item.bg }}>
                    {item.icon}
                  </div>
                  <h3 className="fw-bold mb-2" style={{ fontFamily: cond, fontSize: '2.5rem', color: 'var(--brand-text)', lineHeight: 1 }}>
                    {item.n}{item.suffix}
                  </h3>
                  <h4 className="fw-bold mb-1" style={{ fontFamily: cond, fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--brand-text)' }}>
                    {item.label}
                  </h4>
                  <span className="text-muted" style={{ fontSize: '0.9rem' }}>
                    {item.sub}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. GOUVERNANCE ────────────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(64px,8vh,110px) clamp(1.5rem,5vw,3rem)', background: cream, fontFamily: sans }}>
        <div style={{ maxWidth: '1260px', margin: 'auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <div style={{ ...labelStyle, justifyContent: 'center' }}>
              <span style={labelBeforeStyle}></span>Structure<span style={labelBeforeStyle}></span>
            </div>
            <h2 style={{ fontFamily: cond, fontSize: 'clamp(38px,5vw,62px)', fontWeight: 900, lineHeight: .95, textTransform: 'uppercase', letterSpacing: '-1px', color: cobalt, marginBottom: '16px' }}>
              GOUVERNANCE & TRANSPARENCE
            </h2>
            <p className="mx-auto" style={{ fontSize: '17px', color: muted, lineHeight: 1.8, maxWidth: '620px', marginBottom: 0 }}>
              Une gouvernance solide, une gestion rigoureuse et redevable. Nous croyons que la confiance se bâtit sur la transparence.
            </p>
          </div>

          {/* Org chart */}
          <div style={{ maxWidth: '600px', margin: '0 auto 64px' }}>
            {/* AG */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 0 }}>
              <div style={{ background: cobalt, color: '#fff', padding: '16px 28px', borderRadius: '2px', textAlign: 'center', minWidth: '220px' }}>
                <b style={{ display: 'block', fontFamily: cond, fontSize: '15px', fontWeight: 800, letterSpacing: '.3px' }}>Assemblée Générale</b>
                <small style={{ fontSize: '11px', color: 'rgba(255,255,255,.6)' }}>Organe suprême de décision</small>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '1px', height: '32px', background: border }}></div>
            </div>
            {/* CA */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 0 }}>
              <div style={{ background: cobalt, color: '#fff', padding: '16px 28px', borderRadius: '2px', textAlign: 'center', minWidth: '280px' }}>
                <b style={{ display: 'block', fontFamily: cond, fontSize: '15px', fontWeight: 800, letterSpacing: '.3px' }}>Conseil d'Administration</b>
                <small style={{ fontSize: '11px', color: 'rgba(255,255,255,.6)' }}>Vision stratégique · Présidente : SANNI Sybgath</small>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '1px', height: '32px', background: border }}></div>
            </div>
            {/* Direction */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ background: sable, color: cobalt, padding: '16px 28px', borderRadius: '2px', textAlign: 'center', minWidth: '220px', border: `1px solid ${border}` }}>
                <b style={{ display: 'block', fontFamily: cond, fontSize: '15px', fontWeight: 800, letterSpacing: '.3px', color: cobalt }}>Direction Exécutive</b>
                <small style={{ fontSize: '11px', color: muted }}>Mise en œuvre opérationnelle</small>
              </div>
            </div>
          </div>


        </div>
      </section>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 960px) {
          .story-layout-responsive { grid-template-columns: 1fr !important; }
          .valeurs-grid-responsive { grid-template-columns: 1fr 1fr 1fr !important; }
          .approach-grid-responsive { grid-template-columns: 1fr !important; }
          .impact-grid-responsive { grid-template-columns: 1fr 1fr !important; }
          .docs-grid-responsive { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .valeurs-grid-responsive { grid-template-columns: 1fr 1fr !important; }
          .impact-grid-responsive { grid-template-columns: 1fr !important; }
          .docs-grid-responsive { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
