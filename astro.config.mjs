// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://transcendent-bonbon-b9241d.netlify.app',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [mdx(), sitemap()],

  markdown: {
    shikiConfig: {
      // A dark theme that reads well against the site's "ink" background,
      // paired with a light theme for when the reader is in paper mode.
      themes: {
        dark: 'github-dark-dimmed',
        light: 'github-light',
      },
      defaultColor: false, // we drive light/dark via our own .dark class below
      wrap: true,
    },
  },
});
