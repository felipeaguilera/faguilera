# SPEC.md — faguilera.com (Astro)

Contexto técnico para agentes de código (Antigravity, Claude en VSCode). Lee esto antes de tocar cualquier archivo.

## Stack

- **Framework:** Astro 4.x (static site generator)
- **Hosting:** Netlify, deploy automático desde rama `main`
- **CMS:** ninguno por ahora. Artículos como archivos `.md` en `src/content/notebook/`
- **Repo:** por crear en GitHub (privado), sugerido: `faguilera-web-astro`
- **URL temporal Netlify:** pendiente de configurar
- **Dominio final:** faguilera.com (DNS en Namecheap, email en MXroute — independiente del hosting)

## Estructura de archivos

```
web-astro/
├── package.json
├── astro.config.mjs
├── netlify.toml
├── .env.example              # Muestra PUBLIC_GA_ID
├── src/
│   ├── styles/
│   │   └── global.css        # Todo el CSS del sitio
│   ├── layouts/
│   │   └── Base.astro        # HTML base con GA4 + fonts + meta
│   ├── pages/
│   │   ├── index.astro       # Home EN (artículos dinámicos, currently dinámico)
│   │   ├── es.astro          # Home ES (misma estructura, texto en español)
│   │   ├── cv.astro          # CV EN
│   │   ├── cv-es.astro       # CV ES
│   │   └── notebook/
│   │       └── [slug].astro  # Página de artículo individual
│   ├── content/
│   │   ├── config.ts         # Schema de colecciones
│   │   └── notebook/         # Artículos en Markdown
│   │       ├── cynicism-enemy-community.md
│   │       ├── becoming-the-burglar.md
│   │       └── there-and-back-again.md
│   └── data/
│       └── currently.json    # Sección "What I'm into" — editar aquí
└── public/
    └── assets/               # Copiar desde web/assets/ — mismos nombres
```

## Design system

```css
--orange: #c0461f;  /* acento principal */
--ink:    #1a1612;  /* texto */
--muted:  #5e554a;  /* secundario */
--line:   #ddd3c2;  /* bordes */
--cream:  #f1ece1;  /* fondo secciones alternadas */
--paper:  #faf7ef;  /* fondo base */
```

Tipografía (Google Fonts):
- Headings: Fraunces (400, 500, 600, italic)
- Body: EB Garamond (400, 500, 600, italic)
- Monospace/UI: Special Elite

## Sistema de artículos

### Agregar un artículo nuevo
Crear un archivo `.md` en `src/content/notebook/` con este frontmatter:

```yaml
---
title: "Título del artículo"
date: 2026-07-01
description: "Bajada corta para la card y el meta description"
category: "Categoría visible"
cover: "URL o ruta /assets/imagen.jpg"
lang: en  # o es
draft: false
substackUrl: "https://felipeaguilera.substack.com/p/slug"
mediumUrl: ""      # opcional
linkedinUrl: ""    # opcional
---
```

### Workflow POSSE (Publish Own Site, Syndicate Elsewhere)
1. Escribir el artículo aquí en `.md` (faguilera.com = fuente canónica)
2. Push a GitHub → Netlify deploya automáticamente
3. Copiar el texto a Substack/Medium/LinkedIn manualmente
4. Agregar las URLs de sindicación al frontmatter del `.md`

### Importar artículos existentes de Substack
Los 3 artículos actuales tienen el frontmatter correcto pero cuerpo pendiente.
Pasos: ir a la URL de Substack, copiar el texto, pegar en el `.md` correspondiente.

## Analytics (GA4)

- Agregar `PUBLIC_GA_ID=G-XXXXXXXXXX` en Netlify: Site settings > Environment variables
- En desarrollo local, crear `.env` con la misma variable (no hacer commit)
- Si `PUBLIC_GA_ID` no está definida, el script GA4 no se inyecta (sin errores)

## Sección "Currently" (libros, series, podcasts)

Editar `src/data/currently.json` directamente. Iconos disponibles: `book`, `television`, `film-slate`, `microphone`, `headphones`. Cada item: `{ "icon": "...", "title": "...", "author": "...", "url": "..." }`.

## Assets (imágenes)

Copiar la carpeta `web/assets/` completa a `web-astro/public/assets/`. Los paths son idénticos: `/assets/mark-seal.svg`, `/assets/portrait.png`, etc.

## Deploy a Netlify (primera vez)

1. Crear repo en GitHub (privado), sugerido `faguilera-web-astro`
2. `git init && git add . && git commit -m "Initial Astro migration"` desde `web-astro/`
3. En Netlify: Add new site > Import from Git > conectar repo
4. Build command: `npm run build`, Publish directory: `dist`
5. Agregar variable de entorno `PUBLIC_GA_ID` en Netlify
6. Cuando esté listo: cambiar DNS de faguilera.com en Namecheap a los nameservers de Netlify

## DNS migration (cuando el sitio esté listo)

- Email en MXroute (independiente del hosting). Verificar que los MX records de MXroute estén configurados antes de cambiar nameservers.
- Cambiar en Namecheap: Nameservers > Custom > usar los de Netlify
- TTL de propagación: 24-48h

## Qué NO hacer

- No editar archivos en `public/assets/` sin confirmar con Felipe
- No cambiar el design system (colores, tipografía)
- No agregar dependencias sin necesidad (el sitio es intencionalmente minimalista)
- No mover el contenido bilingüe a un sistema i18n complejo todavía (2 páginas separadas es suficiente)
- cv.astro y cv-es.astro creados con base en _legacy/cv.html y _legacy/cv-es.html
