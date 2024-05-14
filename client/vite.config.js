import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
//import vitePluginRequire from "vite-plugin-require";
//import { defineConfig } from 'vite';
//import commonjs from '@rollup/plugin-commonjs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    minify: false,
  },

  server: {
    proxy: {
      "/api": "http://localhost:3001",
    },
  },
  mimeTypes: {
    ".js": "text/plain",
  },
});
