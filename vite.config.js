import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
// Mkcert plugin for easy https
// ESLINT plugin to be sad
export default defineConfig({
  plugins: [mkcert(), eslint()],
});
