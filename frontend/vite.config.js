import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Consolidate configuration into a single export
export default defineConfig({
  server:{
   
      open: false, // Set to false to prevent automatic opening

    host:"0.0.0.0",
    fs:{
      strict:false,
    },
  },
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1600, // Adjust the chunk size warning limit
  },
});