import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      workbox: {
        // Augmentation de la limite à 4 MiB et exclusion des PNG non optimisés
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
        globIgnores: [
          '**/ONGBusola-front/**',
          '**/*.png',            // Exclure les PNG bruts (on garde les .webp optimisés)
          '**/sw.js.bak',
        ],
        // Précache les assets statiques du build
        globPatterns: ['**/*.{js,css,html,ico,svg,webp,woff,woff2}'],
        // Ne pas intercepter les appels API
        navigateFallbackDenylist: [/^\/api\//],
        // Stratégie réseau d'abord pour les pages navigables
        runtimeCaching: [
          {
            // Images optimisées — Cache d'abord, réseau ensuite
            urlPattern: /\/optimized\/.*\.webp$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'busola-images-v1',
              expiration: {
                maxEntries: 80,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 jours
              },
            },
          },
          {
            // Appels API — Network d'abord, cache de secours
            urlPattern: /^https:\/\/bussola-server\.onrender\.com\/api\//,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'busola-api-v1',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 5, // 5 minutes
              },
              networkTimeoutSeconds: 10,
            },
          },
          {
            // Google Fonts — Cache d'abord
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'busola-fonts-v1',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 an
              },
            },
          },
        ],
      },
      manifest: {
        name: 'ONG Busola - Site Officiel',
        short_name: 'Busola',
        description:
          "Plateforme officielle de l'ONG Busola. Autonomisation des femmes, droits des jeunes, santé sexuelle et reproductive au Nord-Bénin.",
        theme_color: '#2864ae',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait-primary',
        start_url: '/',
        scope: '/',
        lang: 'fr',
        categories: ['education', 'social', 'health'],
        icons: [
          {
            src: '/optimized/pwa-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/optimized/pwa-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/optimized/pwa-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: '/ICON_LOGO-03.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any',
          },
        ],
        screenshots: [
          {
            src: '/optimized/hero-slider.webp',
            sizes: '1280x720',
            type: 'image/webp',
            form_factor: 'wide',
            label: "Page d'accueil ONG Busola",
          },
        ],
      },
      devOptions: {
        enabled: true,
        type: 'module',
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
