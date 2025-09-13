import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,                 // your Vite port
    proxy: {
      '/api': {
        target: "https://cosmosbackend.onrender.com", // your Express server
        changeOrigin: true,
        secure: false,
      },
    },
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
});

