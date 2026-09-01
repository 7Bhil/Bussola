/**
 * useTraffic — Hook de tracking discret pour le site public Busola.
 *
 * - Visite unique par session (sessionStorage) → POST /api/traffic/track-visit
 * - Page view à chaque changement de route → POST /api/traffic/track-pageview
 * - Silencieux : aucune erreur visible, aucun blocage UX
 */

import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

const API_BASE = import.meta.env.VITE_API_URL || ''

async function ping(endpoint: string) {
  try {
    await fetch(`${API_BASE}/api/traffic/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
    })
  } catch {
    // silencieux — ne jamais bloquer le site si le tracking échoue
  }
}

export function useTraffic() {
  const location = useLocation()
  const sessionTracked = useRef(false)

  useEffect(() => {
    // Une seule visite par session navigateur
    if (!sessionTracked.current && !sessionStorage.getItem('busola_visited')) {
      sessionStorage.setItem('busola_visited', '1')
      sessionTracked.current = true
      ping('track-visit')
    }
  }, [])

  useEffect(() => {
    // Page view à chaque changement de route
    ping('track-pageview')
  }, [location.pathname])
}
