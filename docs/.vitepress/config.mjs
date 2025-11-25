import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Perion API",
  description: "Performance Data API Documentation",
  base: '/perion-api-docs/',
  
  themeConfig: {
    logo: '/logo.svg',
    
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'API Reference', link: '/api/endpoints' },
      { text: 'Examples', link: '/examples/php' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          items: [
            { text: 'Introduction', link: '/guide/getting-started' },
            { text: 'Authentication', link: '/guide/authentication' }
          ]
        }
      ],
      '/examples/': [
        {
          text: 'Code Examples',
          items: [
            { text: 'PHP', link: '/examples/php' },
            { text: 'Python', link: '/examples/python' },
            { text: 'JavaScript', link: '/examples/javascript' },
            { text: 'cURL', link: '/examples/curl' }
          ]
        }
      ]
    },

    outline: {
      level: [2, 3],
      label: 'On this page'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-org/perion-api' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025 Perion'
    },

    search: {
      provider: 'local'
    }
  },

  locales: {
    root: {
      label: 'English',
      lang: 'en',
      themeConfig: {
        nav: [
          { text: 'Guide', link: '/guide/getting-started' },
          { text: 'API Reference', link: '/api/endpoints' },
          { text: 'Examples', link: '/examples/php' }
        ]
      }
    },
    ru: {
      label: 'Русский',
      lang: 'ru',
      link: '/ru/',
      themeConfig: {
        nav: [
          { text: 'Руководство', link: '/ru/guide/getting-started' },
          { text: 'API Справочник', link: '/ru/api/endpoints' },
          { text: 'Примеры', link: '/ru/examples/php' }
        ],
        sidebar: {
          '/ru/guide/': [
            {
              text: 'Руководство',
              items: [
                { text: 'Введение', link: '/ru/guide/getting-started' },
                { text: 'Аутентификация', link: '/ru/guide/authentication' }
              ]
            }
          ],
          '/ru/examples/': [
            {
              text: 'Примеры кода',
              items: [
                { text: 'PHP', link: '/ru/examples/php' },
                { text: 'Python', link: '/ru/examples/python' },
                { text: 'JavaScript', link: '/ru/examples/javascript' },
                { text: 'cURL', link: '/ru/examples/curl' }
              ]
            }
          ]
        },
        
        outline: {
          level: [2, 3],
          label: 'На этой странице'
        }
      }
    }
  }
})
