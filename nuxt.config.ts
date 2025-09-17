import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    head: {
      title: 'ytxt – YouTube Transcript Fetcher', // fallback title
      titleTemplate: '%s - ytxt',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Fetch transcripts from any public YouTube video instantly with ytxt. Minimal, fast, and privacy-friendly.' },
        { name: 'robots', content: 'index, follow' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'ytxt – YouTube Transcript Fetcher' },
        { property: 'og:description', content: 'Fetch transcripts from any public YouTube video instantly with ytxt. Minimal, fast, and privacy-friendly.' },
        { property: 'og:image', content: 'https://ytxt.m1dnght.dev/ytxt.png' },
        { property: 'og:url', content: 'https://ytxt.m1dnght.dev' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap' },
      ],
    }
  }
});
