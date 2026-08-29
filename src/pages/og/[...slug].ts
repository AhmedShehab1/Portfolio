import { OGImageRoute } from "astro-og-canvas";
import { getCollection } from "astro:content";

const posts = await getCollection("blog", ({ data }) => !data.draft);

const pages = Object.fromEntries(posts.map((post) => [post.id, post.data]));

export const { getStaticPaths, GET } = await OGImageRoute({
  param: "slug",
  pages,
  getImageOptions: (_path, page: (typeof pages)[string]) => ({
    title: page.title,
    description: page.description,
    bgGradient: [[14, 17, 22]], // --color-ink
    border: { color: [79, 209, 174], width: 4 }, // --color-signal
    padding: 80,
    fonts: ["./src/fonts/inter-variable.ttf"],
    font: {
      title: {
        color: [231, 228, 220], // --color-text-dark
        size: 64,
        weight: "Bold",
        families: ["Inter"],
      },
      description: {
        color: [154, 160, 171], // --color-text-dark-dim
        size: 32,
        families: ["Inter"],
      },
    },
  }),
});
