import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Performance data API",
  description: "Complete API documentation for accessing performance data",
  
  // Theme configuration
  themeConfig: {
    // Logo
    logo: '/logo.svg',
    
    // Navigation - removed for single page documentation
    
    // Sidebar - removed for single page documentation

    // Social links
    socialLinks: [
      { icon: 'github', link: 'https://github.com/MADMEPH/perfomancedata_api_doc' }
    ],

    // Footer
    footer: {
      message: 'Perion Performance Data API Documentation',
      copyright: 'Copyright © 2025'
    },

    // Search
    search: {
      provider: 'local'
    },

    // Edit link
    editLink: {
      pattern: 'https://github.com/MADMEPH/perfomancedata_api_doc/edit/main/docs/docs/:path',
      text: 'Edit this page on GitHub'
    },

    // Last updated
    lastUpdated: {
      text: 'Last updated',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short'
      }
    }
  },

  // Markdown configuration
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    },
    lineNumbers: true
  },

  // Head tags
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#646cff' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:locale', content: 'en' }],
    ['meta', { name: 'og:site_name', content: 'Perion Performance API' }]
  ],

  // Base URL for GitHub Pages
  base: '/perfomancedata_api_doc/',

  // Clean URLs
  cleanUrls: true
})
