import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@/*": path.resolve(__dirname, "./src/*"),
      "@workspace/ui/*": path.resolve(__dirname, "../../packages/ui/src/*"),
    },
  },
  server: {
    fs: {
      // Mengizinkan Vite untuk melayani file di luar folder apps/web
      // Ini penting agar komponen dari packages/ui bisa terbaca saat dev
      allow: [".."],
    },
    watch: {
      // Pastikan Vite memantau perubahan di folder packages/ui
      ignored: ["!**/node_modules/@workspace/ui/**"],
    },
  },
});
