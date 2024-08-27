import { defineConfig } from 'astro/config';
import netlify from "@astrojs/netlify";

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  site: 'https://astrotutorialisk.netlify.app',
  output: "server",
  adapter: netlify(),
  integrations: [preact()]
});