// Vercel deployment: Cloudflare plugin disabled, TanStack Start target = "vercel".
// Build output goes to .vercel/output (Vercel Build Output API v3) — Vercel auto-detects it.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  cloudflare: false,
  tanstackStart: {
    target: "vercel",
  },
});
