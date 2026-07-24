import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import './index.css'
import { registerSW } from 'virtual:pwa-register'

// Enregistrement du Service Worker PWA avec rechargement automatique
registerSW({
  onNeedRefresh() {
    // L'app a une nouvelle version — rechargement silencieux
    window.location.reload()
  },
  onOfflineReady() {
    console.log('[PWA] Application prête pour une utilisation hors-ligne.')
  },
})
import AboutPage from './AboutPage'
import TeamPage from './TeamPage'
import ResourcePage from './ResourcePage'
import ActionPage from './ActionPage'
import ActionDetailPage from './ActionDetailPage'
import ContactPage from './ContactPage'
import NewsPage from './NewsPage'
import NewsDetailPage from './NewsDetailPage'
import ScrollToTop from './ScrollToTop'
import GalleryPage from './GalleryPage'
import SupportPage from './SupportPage'
import Chatbot from './Chatbot'
import AlbumPage from './AlbumPage'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter basename="/">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/ressources" element={<ResourcePage />} />
        <Route path="/actions" element={<ActionPage />} />
        <Route path="/actions/:id" element={<ActionDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/actualites" element={<NewsPage />} />
        <Route path="/actualites/:id" element={<NewsDetailPage />} />
        <Route path="/galerie" element={<GalleryPage />} />
        <Route path="/galerie/:category" element={<GalleryPage />} />
        <Route path="/galerie/album/:albumName" element={<AlbumPage />} />
        <Route path="/soutenir" element={<SupportPage />} />
      </Routes>
      <Chatbot />
    </BrowserRouter>
)
