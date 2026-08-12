import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import App from './App'
import './index.css'
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
import InstallPwaBanner from './InstallPwaBanner'
import { registerSW } from 'virtual:pwa-register'
import { useTraffic } from './useTraffic'

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

// Composant interne pour activer le tracking (doit être enfant de BrowserRouter)
function TrafficTracker() {
  useTraffic()
  return null
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter basename="/">
      <ScrollToTop />
      <TrafficTracker />
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
      <InstallPwaBanner />
    </BrowserRouter>
)
