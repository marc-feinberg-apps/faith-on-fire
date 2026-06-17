import { defineConfig } from "vite"
import { devtools } from "@tanstack/devtools-vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import viteReact from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    devtools(),
    tailwindcss(),
    tanstackStart({
      pages: [{ path: "/" }],
      prerender: {
        enabled: true,
        crawlLinks: true,
        filter: (page) => !page.path.endsWith(".pdf"),
      },
      sitemap: {
        host: "https://www.faithonfire.world",
      },
    }),
    viteReact(),
  ],
})

export default config
