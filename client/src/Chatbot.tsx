import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X, ShieldCheck, Mail, User, AlertCircle, BookOpen, HeartPulse, Zap, HandHeart, Heart, Phone, Home, Sparkles } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'bot' | 'user';
  text: string;
  actions?: { label: string; icon?: React.ReactNode; action: string }[];
  isHtml?: boolean;
}

const API_URL = import.meta.env.VITE_API_URL || '';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Human agent contact state
  const [isContactForm, setIsContactForm] = useState(false);
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    subject: 'Demande depuis le Chatbot',
    message: ''
  });
  const [contactStatus, setContactStatus] = useState<{ type: 'success' | 'error' | null; msg: string }>({ type: null, msg: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Welcome Message
  useEffect(() => {
    setMessages([
      {
        id: 'welcome',
        role: 'bot',
        text: "Bonjour ! Je suis l'assistant virtuel de l'ONG Busola. Comment puis-je vous aider aujourd'hui ? Choisissez une question fréquente ou écrivez-moi directement.",
        actions: [
          { label: "Projet PAGEDA (Femmes)", icon: <BookOpen size={14} />, action: "pageda" },
          { label: "Projet TEDIDJO (Santé/VBG)", icon: <HeartPulse size={14} />, action: "tedidjo" },
          { label: "Projet YES (Jeunesse)", icon: <Zap size={14} />, action: "yes" },
          { label: "Devenir Bénévole", icon: <HandHeart size={14} />, action: "benevole" },
          { label: "Faire un Don", icon: <Heart size={14} />, action: "don" },
          { label: "Parler à un agent", icon: <Phone size={14} />, action: "contact_agent" }
        ]
      }
    ]);
  }, []);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, isContactForm]);

  const handleActionClick = (action: string, label: string) => {
    // Add user message
    const userMsgId = Math.random().toString();
    setMessages(prev => [...prev, { id: userMsgId, role: 'user', text: label }]);
    
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let responseText = "";
      let newActions: { label: string; icon?: React.ReactNode; action: string }[] = [];

      switch (action) {
        case 'pageda':
          responseText = "Le programme **PAGEDA** (Autonomisation des Femmes) se concentre sur l'alphabétisation fonctionnelle, l'apprentissage de métiers générateurs de revenus et l'accès sécurisé aux droits fonciers pour les femmes du Nord-Bénin. C'est un pilier essentiel pour l'égalité des genres.";
          newActions = [
            { label: "Voir nos autres projets", action: "projets" },
            { label: "Comment soutenir ce projet ?", action: "don" }
          ];
          break;
        case 'tedidjo':
          responseText = "Le projet **TEDIDJO** est notre initiative phare en matière de santé sexuelle, reproductive et de lutte contre les Violences Basées sur le Genre (VBG). Nous offrons une orientation psychologique, un accompagnement médical et juridique pour soutenir les victimes et sensibiliser les communautés.";
          newActions = [
            { label: "Signaler un abus / Parler", action: "contact_agent" },
            { label: "Autre programme", action: "projets" }
          ];
          break;
        case 'yes':
          responseText = "Le projet **YES** (Youth Empowerment & Sexual Health) accompagne les adolescents et les jeunes dans le développement de compétences de vie saine, l'accès à l'information fiable sur la santé de la reproduction et encourage une citoyenneté active et responsable.";
          newActions = [
            { label: "Nos projets", action: "projets" },
            { label: "Devenir Bénévole", action: "benevole" }
          ];
          break;
        case 'benevole':
          responseText = "C'est merveilleux ! L'ONG Busola grandit grâce à la force et au dévouement de ses bénévoles. Nous recherchons régulièrement des profils en animation terrain, communication, soutien scolaire ou appui de projets.";
          newActions = [
            { label: "Remplir le formulaire de bénévolat", action: "contact_agent" },
            { label: "Retour au menu", action: "menu" }
          ];
          break;
        case 'don':
          responseText = "Merci infiniment pour votre intérêt à soutenir nos actions ! Vos contributions financières ou matérielles financent directement l'achat de kits de dignité pour les jeunes filles, des formations professionnelles et le fonctionnement de nos centres d'écoute.";
          newActions = [
            { label: "Faire un don en ligne", action: "faire_don_web" },
            { label: "Nous contacter pour partenariat", action: "contact_agent" }
          ];
          break;
        case 'projets':
          responseText = "L'ONG Busola coordonne trois programmes majeurs sur le terrain à Parakou et au Nord-Bénin : **PAGEDA** (autonomisation féminine), **YES** (éducation des jeunes) et **TEDIDJO** (santé reproductive & lutte contre les VBG). Lequel souhaitez-vous découvrir ?";
          newActions = [
            { label: "PAGEDA", action: "pageda" },
            { label: "TEDIDJO", action: "tedidjo" },
            { label: "YES", action: "yes" }
          ];
          break;
        case 'faire_don_web':
          responseText = "Vous pouvez faire un don directement en cliquant sur le bouton 'Faire un Don' dans notre barre de navigation supérieure, ou en nous écrivant via le formulaire de partenariat.";
          newActions = [{ label: "Formulaire Partenariat", action: "contact_agent" }];
          break;
        case 'contact_agent':
          setIsContactForm(true);
          setContactData(prev => ({
            ...prev,
            message: `Bonjour, j'aimerais parler à un agent de l'ONG Busola concernant l'action : "${label}".`
          }));
          return; // Stop here, we show the form
        case 'menu':
        default:
          responseText = "Comment puis-je vous aider aujourd'hui ? Choisissez l'une des options ci-dessous :";
          newActions = [
            { label: "Projet PAGEDA", icon: <BookOpen size={14} />, action: "pageda" },
            { label: "Projet TEDIDJO", icon: <HeartPulse size={14} />, action: "tedidjo" },
            { label: "Projet YES", icon: <Zap size={14} />, action: "yes" },
            { label: "Devenir Bénévole", icon: <HandHeart size={14} />, action: "benevole" },
            { label: "Faire un Don", icon: <Heart size={14} />, action: "don" },
            { label: "Parler à un agent", icon: <Phone size={14} />, action: "contact_agent" }
          ];
          break;
      }

      setMessages(prev => [...prev, {
        id: Math.random().toString(),
        role: 'bot',
        text: responseText,
        actions: newActions
      }]);
    }, 1000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue.trim();
    setMessages(prev => [...prev, { id: Math.random().toString(), role: 'user', text: userText }]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const text = userText.toLowerCase();
      let responseText = "";
      let newActions: { label: string; icon?: React.ReactNode; action: string }[] = [];

      if (text.includes('pageda') || text.includes('femme') || text.includes('alphabétisation') || text.includes('terre') || text.includes('foncier')) {
        responseText = "Le projet **PAGEDA** vise à renforcer l'autonomie socio-économique des femmes rurales du Nord-Bénin à travers l'alphabétisation fonctionnelle et l'accès à la propriété foncière.";
        newActions = [{ label: "En savoir plus sur PAGEDA", action: "pageda" }];
      } else if (text.includes('tedidjo') || text.includes('reproductive') || text.includes('vbg') || text.includes('violence') || text.includes('viol') || text.includes('abus')) {
        responseText = "Le projet **TEDIDJO** œuvre pour l'accès aux soins de santé sexuelle et la protection des jeunes et des femmes contre les Violences Basées sur le Genre (VBG).";
        newActions = [{ label: "En savoir plus sur TEDIDJO", action: "tedidjo" }, { label: "Parler urgemment à un agent", action: "contact_agent" }];
      } else if (text.includes('yes') || text.includes('jeune') || text.includes('adolescent') || text.includes('citoyen')) {
        responseText = "Le projet **YES** forme et sensibilise les adolescents et les jeunes pour qu'ils soient acteurs de leur santé de reproduction et citoyens responsables.";
        newActions = [{ label: "En savoir plus sur YES", action: "yes" }];
      } else if (text.includes('don') || text.includes('argent') || text.includes('aider') || text.includes('financement')) {
        responseText = "Vos contributions soutiennent directement nos actions sur le terrain. Vous pouvez faire un don financier en ligne ou nous contacter pour un partenariat.";
        newActions = [{ label: "Faire un don", action: "don" }];
      } else if (text.includes('bénévole') || text.includes('stage') || text.includes('recrutement') || text.includes('rejoindre') || text.includes('travail')) {
        responseText = "Nous sommes toujours à la recherche d'énergies nouvelles pour nos actions terrains et de sensibilisation !";
        newActions = [{ label: "Devenir Bénévole", action: "benevole" }];
      } else if (text.includes('contact') || text.includes('téléphone') || text.includes('appel') || text.includes('adresse') || text.includes('mail') || text.includes('parakou')) {
        responseText = "L'ONG Busola est située à **Parakou**, quartier Arafat. Vous pouvez nous écrire à **contact@busola.org** ou nous joindre par téléphone au **+229 01 90 44 46 90**.";
        newActions = [{ label: "Écrire directement à un agent", action: "contact_agent" }];
      } else {
        responseText = "Je n'ai pas d'information exacte sur ce sujet. Souhaitez-vous laisser un message directement à notre équipe ? Un agent vous répondra sous 24h.";
        newActions = [
          { label: "Oui, laisser un message", icon: <Phone size={14} />, action: "contact_agent" },
          { label: "Retourner au menu", icon: <Home size={14} />, action: "menu" }
        ];
      }

      setMessages(prev => [...prev, {
        id: Math.random().toString(),
        role: 'bot',
        text: responseText,
        actions: newActions
      }]);
    }, 1200);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactData.name || !contactData.email || !contactData.message) {
      setContactStatus({ type: 'error', msg: 'Veuillez remplir tous les champs obligatoires.' });
      return;
    }

    setIsSubmitting(true);
    setContactStatus({ type: null, msg: '' });

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: 'partenariat',
          name: contactData.name,
          email: contactData.email,
          subject: contactData.subject,
          message: contactData.message
        })
      });

      const data = await response.json();
      if (response.ok) {
        setContactStatus({ type: 'success', msg: 'Votre message a été transmis avec succès ! Notre équipe reviendra vers vous sous 24 heures.' });
        setContactData({ name: '', email: '', subject: 'Demande depuis le Chatbot', message: '' });
        
        setTimeout(() => {
          setIsContactForm(false);
          setMessages(prev => [...prev, {
            id: Math.random().toString(),
            role: 'bot',
            text: "Votre demande de contact a été transmise avec succès à nos agents. Un courriel de confirmation vous a été envoyé. Comment puis-je vous aider d'autre ?",
            actions: [{ label: "Retour au menu principal", action: "menu" }]
          }]);
        }, 3000);
      } else {
        setContactStatus({ type: 'error', msg: data.message || "Erreur lors de l'envoi." });
      }
    } catch (err) {
      setContactStatus({ type: 'error', msg: 'Connexion réseau impossible. Veuillez réessayer ultérieurement.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ fontFamily: 'Outfit, Poppins, sans-serif' }}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="card shadow-lg border-0 rounded-4 overflow-hidden position-fixed bottom-0 end-0 m-4"
            style={{ 
              width: '370px', 
              height: '530px', 
              zIndex: 9998, 
              marginBottom: '95px', // Lift above floating action button
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.15)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Header */}
            <div 
              className="card-header text-white d-flex justify-content-between align-items-center p-3 border-0"
              style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)' }}
            >
              <div className="d-flex align-items-center">
                <div className="bg-white rounded-circle p-1 me-2 shadow-sm d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                  <img src="logo.png" className="img-fluid rounded-circle" alt="Bot"  loading="lazy" decoding="async" />
                </div>
                <div>
                  <h6 className="mb-0 fw-bold" style={{ fontSize: '0.9rem' }}>Assistant Busola</h6>
                  <div className="d-flex align-items-center mt-0.5" style={{ gap: '4px' }}>
                    <span className="rounded-circle bg-success animate-pulse" style={{ width: '8px', height: '8px', display: 'inline-block' }}></span>
                    <span className="text-white-50" style={{ fontSize: '0.7rem' }}>En ligne • Actif</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="btn-close btn-close-white shadow-none border-0"
                style={{ fontSize: '0.8rem' }}
              ></button>
            </div>

            {/* Chat Body */}
            <div 
              className="card-body p-3 overflow-auto" 
              style={{ flex: 1, backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              {!isContactForm ? (
                <>
                  {messages.map((msg) => (
                    <div 
                      key={msg.id} 
                      className={`d-flex flex-column ${msg.role === 'user' ? 'align-items-end' : 'align-items-start'}`}
                    >
                      <div 
                        className={`p-3 shadow-sm ${
                          msg.role === 'user'
                            ? 'bg-primary text-white rounded-bottom rounded-start'
                            : 'bg-white text-dark rounded-bottom rounded-end'
                        }`}
                        style={{ 
                          maxWidth: '85%', 
                          fontSize: '0.85rem', 
                          lineHeight: '1.5',
                          borderRadius: msg.role === 'user' ? '16px 16px 0px 16px' : '16px 16px 16px 0px',
                          border: msg.role === 'user' ? 'none' : '1px solid #e2e8f0'
                        }}
                      >
                        {msg.text.split('\n').map((para, i) => (
                          <p key={i} className={i > 0 ? "mb-2" : "mb-0"}>
                            {para.split('**').map((part, index) => 
                              index % 2 === 1 ? <strong key={index} className="fw-bold" style={{ color: msg.role === 'user' ? '#fff' : '#1e3a8a' }}>{part}</strong> : part
                            )}
                          </p>
                        ))}
                      </div>

                      {/* Action buttons (quick answers) */}
                      {msg.actions && msg.actions.length > 0 && (
                        <div className="d-flex flex-wrap gap-2 mt-2" style={{ maxWidth: '90%' }}>
                          {msg.actions.map((act, index) => (
                            <button
                              key={index}
                              onClick={() => handleActionClick(act.action, act.label)}
                              className="btn btn-sm btn-outline-primary rounded-pill px-3 py-1.5 d-flex align-items-center gap-1"
                              style={{ 
                                fontSize: '0.72rem', 
                                fontWeight: 500,
                                backgroundColor: '#f0f7ff',
                                borderColor: '#bfdbfe',
                                borderStyle: 'solid',
                                borderWidth: '1px'
                              }}
                            >
                              {act.icon && <span className="d-flex align-items-center">{act.icon}</span>}
                              {act.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="d-flex align-items-start">
                      <div 
                        className="bg-white border text-muted p-2.5 rounded-4 shadow-sm d-flex align-items-center gap-2"
                        style={{ 
                          fontSize: '0.8rem',
                          borderRadius: '16px 16px 16px 0px',
                          borderColor: '#e2e8f0'
                        }}
                      >
                        <span className="fst-italic" style={{ fontSize: '0.75rem' }}>L'assistant écrit</span>
                        <div className="d-flex gap-1 align-items-center">
                          <span className="spinner-grow spinner-grow-sm text-primary animate-ping" style={{ width: '6px', height: '6px' }} role="status"></span>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                /* Human Contact Form Transition */
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white border rounded-3 p-3 shadow-sm"
                  style={{ borderColor: '#e2e8f0' }}
                >
                  <div className="d-flex align-items-center gap-2 text-primary fw-bold border-b pb-2 mb-2">
                    <Mail size={18} className="text-warning" />
                    <span style={{ fontSize: '0.9rem' }}>Relais Agent Humain</span>
                  </div>
                  <p className="text-muted mb-3" style={{ fontSize: '0.75rem' }}>
                    Nos conseillers sont temporairement sur le terrain. Laissez votre message ci-dessous, un agent vous recontactera sous 24h.
                  </p>

                  <form onSubmit={handleContactSubmit} className="d-flex flex-column gap-2">
                    <div>
                      <label className="form-label mb-1" style={{ fontSize: '0.7rem', fontWeight: 600, color: '#475569' }}>Nom complet *</label>
                      <div className="input-group input-group-sm">
                        <span className="input-group-text bg-light text-muted border-end-0"><User size={14} /></span>
                        <input
                          type="text"
                          required
                          value={contactData.name}
                          onChange={(e) => setContactData(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Ex: Jean DUPONT"
                          className="form-control border-start-0 focus-none"
                          style={{ fontSize: '0.75rem' }}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="form-label mb-1" style={{ fontSize: '0.7rem', fontWeight: 600, color: '#475569' }}>Adresse Email *</label>
                      <div className="input-group input-group-sm">
                        <span className="input-group-text bg-light text-muted border-end-0"><Mail size={14} /></span>
                        <input
                          type="email"
                          required
                          value={contactData.email}
                          onChange={(e) => setContactData(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="Ex: jean@gmail.com"
                          className="form-control border-start-0 focus-none"
                          style={{ fontSize: '0.75rem' }}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="form-label mb-1" style={{ fontSize: '0.7rem', fontWeight: 600, color: '#475569' }}>Votre message *</label>
                      <textarea
                        required
                        rows={3}
                        value={contactData.message}
                        onChange={(e) => setContactData(prev => ({ ...prev, message: e.target.value }))}
                        placeholder="Écrivez votre question ici..."
                        className="form-control focus-none"
                        style={{ fontSize: '0.75rem' }}
                      />
                    </div>

                    {contactStatus.type && (
                      <div className={`p-2 rounded-3 mt-1 d-flex gap-2 ${
                        contactStatus.type === 'success' 
                          ? 'bg-success bg-opacity-10 text-success border border-success border-opacity-20' 
                          : 'bg-danger bg-opacity-10 text-danger border border-danger border-opacity-20'
                      }`} style={{ fontSize: '0.7rem' }}>
                        <AlertCircle size={14} className="flex-shrink-0" />
                        <span>{contactStatus.msg}</span>
                      </div>
                    )}

                    <div className="d-flex gap-2 mt-2">
                      <button
                        type="button"
                        onClick={() => setIsContactForm(false)}
                        className="btn btn-sm btn-light flex-grow-1"
                        style={{ fontSize: '0.75rem' }}
                      >
                        Annuler
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-sm btn-primary flex-grow-1 d-flex align-items-center justify-content-center gap-1"
                        style={{ fontSize: '0.75rem', background: '#1e3a8a', border: 'none' }}
                      >
                        {isSubmitting ? (
                          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        ) : (
                          <>
                            <Send size={12} />
                            <span>Envoyer</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Footer */}
            {!isContactForm && (
              <div className="card-footer bg-white border-0 p-3">
                <form onSubmit={handleSendMessage} className="d-flex align-items-center gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Écrivez votre message..."
                    className="form-control rounded-pill border-0 bg-light px-3 py-2 flex-grow-1"
                    style={{ fontSize: '0.8rem' }}
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim()}
                    className="btn btn-primary rounded-circle p-0 d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{ width: '40px', height: '40px', background: '#1e3a8a', border: 'none' }}
                  >
                    <Send size={16} />
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="btn btn-primary rounded-circle shadow-lg p-0 d-flex align-items-center justify-content-center position-fixed bottom-0 end-0 m-4"
        style={{ 
          width: '55px', 
          height: '55px', 
          zIndex: 9999,
          background: 'linear-gradient(135deg, #2864ae 0%, #1a457a 100%)',
          border: 'none',
          boxShadow: '0 8px 20px rgba(40, 100, 174, 0.4)'
        }}
      >
        {isOpen ? <X size={22} style={{ color: 'white' }} /> : <MessageCircle size={22} className="animate-pulse" style={{ color: 'white' }} />}
      </motion.button>
    </div>
  );
}
