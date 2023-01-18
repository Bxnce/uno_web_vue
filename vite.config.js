import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {VitePWA} from "vite-plugin-pwa";
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [basicSsl(), vue(), VitePWA({
    registerType: "autoUpdate",
    devOptions: {
      enabled: true,
    },
    manifest: {
      name: "UnoWeb",
      short_name: "Uno",
      start_url: "index.html",
      description:
          "Uno Web implementation",
      id: "unoweb",
      orientation: "any",
      shortcuts: [],
      dir: "ltr",
      prefer_related_applications: false,
      related_applications: [],
      categories: ["games", "strategy", "casual", "online"],
      iarc_rating_id: "none",
      share_target: {},
      display_override: [],
      icons: [
        {
          "src": "/images/android-icon-36x36.png",
          "sizes": "36x36",
          "type": "image\/png",
          "density": "0.75"
        },
        {
          "src": "/images/android-icon-48x48.png",
          "sizes": "48x48",
          "type": "image\/png",
          "density": "1.0"
        },
        {
          "src": "/images/android-icon-72x72.png",
          "sizes": "72x72",
          "type": "image\/png",
          "density": "1.5"
        },
        {
          "src": "/images/android-icon-96x96.png",
          "sizes": "96x96",
          "type": "image\/png",
          "density": "2.0"
        },
        {
          "src": "/images/android-icon-144x144.png",
          "sizes": "144x144",
          "type": "image\/png",
          "density": "3.0"
        },
        {
          "src": "/images/android-icon-192x192.png",
          "sizes": "192x192",
          "type": "image\/png",
          "density": "4.0"
        },
        {
          "src": "/images/android-icon-512x512.png",
          "sizes": "512x512",
          "type": "image\/png",
          "purpose": "any maskable"
        },
        {
          "src": "uno_web_vue/public/images/apple-touch-icon-180x180.png",
          "sizes": "180x180",
          "type": "image\/png",
        }
      ],
      theme_color: "#000000",
      background_color: "#000000",
      display: "standalone",
    },
  })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port:8080,
    https: true,
  },
  base : "/uno_web_vue/",
});
