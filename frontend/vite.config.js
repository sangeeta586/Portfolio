import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    open: false, // Set to false to prevent automatic opening
    host: "0.0.0.0",
    fs: {
      strict: false,
    },
  },
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1600, // Adjust the chunk size warning limit
  },
  // Add Swiper to optimize dependencies
  optimizeDeps: {
    include: ['swiper'],
  },
});
