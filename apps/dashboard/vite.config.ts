import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@workspace/ui/*': path.resolve(__dirname, '../../packages/ui/src/*'),
      '@/*': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/configs': path.resolve(__dirname, './src/configs'),
      '@/layouts': path.resolve(__dirname, './src/layouts'),
      '@/navigation': path.resolve(__dirname, './src/navigation'),
      '@/pages': path.resolve(__dirname, './src/pages'),
      '@/types': path.resolve(__dirname, './src/types'),
      '@/utils': path.resolve(__dirname, './src/utils'),
      '@/views': path.resolve(__dirname, './src/views'),
    },
  },
  server: {
    port: 7000,
    fs: {
      // Mengizinkan Vite untuk melayani file di luar folder apps/web
      // Ini penting agar komponen dari packages/ui bisa terbaca saat dev
      allow: ['..'],
    },
    watch: {
      // Pastikan Vite memantau perubahan di folder packages/ui
      ignored: ['!**/node_modules/@workspace/ui/**'],
    },
  },
});
