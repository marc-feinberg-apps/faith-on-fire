import { defineConfig, loadEnv } from "vite"
import { devtools } from "@tanstack/devtools-vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import netlify from "@netlify/vite-plugin-tanstack-start"
import viteReact from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

// Vite's built-in env loading only exposes VITE_-prefixed vars to process.env.
// Server-only secrets (e.g. RESEND_API_KEY) live in the root .env without that
// prefix, so we load them into process.env ourselves for server functions.
const rootEnv = loadEnv(process.env.NODE_ENV ?? "development", "../..", "")
for (const [key, value] of Object.entries(rootEnv)) {
  if (process.env[key] === undefined) process.env[key] = value
}

const config = defineConfig({
  envDir: "../..",
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
    netlify(),
    viteReact(),
  ],
})

export default config
