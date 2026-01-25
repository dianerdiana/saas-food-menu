// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import node from "@astrojs/node";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  output: "server",
  trailingSlash: "always",
  integrations: [react()],
  devToolbar: {
    enabled: false,
  },
  // adapter: node({
  //   mode: "standalone",
  // }),
  adapter: vercel(),
});
