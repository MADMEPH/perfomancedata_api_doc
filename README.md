# Performance Data API Documentation

[![Deploy to GitHub Pages](https://github.com/MADMEPH/perfomancedata_api_doc/actions/workflows/deploy.yml/badge.svg)](https://github.com/MADMEPH/perfomancedata_api_doc/actions/workflows/deploy.yml)

> 🌐 **Live Documentation**: [https://madmeph.github.io/perfomancedata_api_doc/](https://madmeph.github.io/perfomancedata_api_doc/)

This documentation is built with [VitePress](https://vitepress.dev/) and deployed to GitHub Pages.

### 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run docs:dev
   ```
   The documentation will be available at `http://localhost:5173`

3. **Build for Production**
   ```bash
   npm run docs:build
   ```

4. **Preview Production Build**
   ```bash
   npm run docs:preview
   ```

### 📁 Project Structure

```
docs/
├── .vitepress/
│   ├── config.mjs          # VitePress configuration
│   └── theme/
│       ├── index.js        # Theme customization
│       └── custom.css      # Custom styles
├── index.md                # Homepage (English)
├── guide/                  # English guides
├── api/                    # API reference (English)
├── examples/               # Code examples (English)
└── ru/                     # Russian version
    ├── index.md
    ├── guide/
    ├── api/
    └── examples/
```

### 🌐 Multi-language Support

The documentation is available in:
- **English** (`/`) - Default
- **Russian** (`/ru/`) - Complete translation

### 🎨 Features

- ✨ Dark theme optimized
- 🔍 Built-in search
- 🌍 Multi-language support
- 📱 Mobile responsive
- 🚀 Fast static site
- 💻 Code syntax highlighting
- 📝 Markdown-based content

### 📝 Adding Content

1. Create a new `.md` file in the appropriate directory
2. Add frontmatter if needed
3. Write content in Markdown
4. Update sidebar in `.vitepress/config.mjs`

### 🚀 Deployment to GitHub Pages

1. **Update base path** in `.vitepress/config.mjs`:
   ```js
   base: '/your-repo-name/',
   ```

2. **Create GitHub Actions workflow** (`.github/workflows/deploy.yml`):
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [main]

   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: 18
         - run: npm ci
         - run: npm run docs:build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: docs/.vitepress/dist
   ```

3. **Enable GitHub Pages** in repository settings:
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: gh-pages, root

### 🛠️ Customization

#### Colors
Edit `.vitepress/theme/custom.css` to change colors:
```css
:root {
  --vp-c-brand: #646cff;
  --vp-c-brand-light: #747bff;
}
```

#### Navigation
Edit `.vitepress/config.mjs` to modify navigation and sidebar.

#### Add Languages
Add new locale in `.vitepress/config.mjs`:
```js
locales: {
  // ... existing locales
  es: {
    label: 'Español',
    lang: 'es',
    link: '/es/'
  }
}
```

### 📚 Documentation

- [VitePress Documentation](https://vitepress.dev/)
- [Markdown Extensions](https://vitepress.dev/guide/markdown)
- [Theme Configuration](https://vitepress.dev/reference/default-theme-config)

### 📄 License

MIT License

---

**Built with ❤️ using VitePress**
