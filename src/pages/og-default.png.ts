import { generateOpenGraphImage } from "astro-og-canvas";
import { SITE } from "../data/profile";

export async function GET() {
  const image = await generateOpenGraphImage({
    title: SITE.name,
    description: SITE.tagline,
    bgGradient: [[14, 17, 22]],
    border: { color: [79, 209, 174], width: 4 },
    padding: 80,
    fonts: ["./src/fonts/inter-variable.ttf"],
    font: {
      title: { color: [231, 228, 220], size: 64, weight: "Bold", families: ["Inter"] },
      description: { color: [154, 160, 171], size: 32, families: ["Inter"] },
    },
  });

  return new Response(image, {
    headers: { "Content-Type": "image/png" },
  });
}
