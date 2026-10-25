import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

const __dirname = import.meta.dirname || path.resolve('.');

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          romanUrdu: path.resolve(__dirname, 'roman-urdu-to-urdu/index.html'),
          zakat: path.resolve(__dirname, 'zakat-calculator/index.html'),
          emi: path.resolve(__dirname, 'emi-calculator/index.html'),
          names: path.resolve(__dirname, 'stylish-name-generator/index.html'),
          compress: path.resolve(__dirname, 'image-compress/index.html'),
          cv: path.resolve(__dirname, 'cv-maker/index.html'),
          pdf: path.resolve(__dirname, 'pdf-merge/index.html'),
          wordCounter: path.resolve(__dirname, 'word-counter/index.html'),
          ageCalc: path.resolve(__dirname, 'age-calculator/index.html'),
          imageResize: path.resolve(__dirname, 'image-resize/index.html'),
          qrGen: path.resolve(__dirname, 'qr-code-generator/index.html'),
          shayariCard: path.resolve(__dirname, 'shayari-card-maker/index.html'),
          caseConverter: path.resolve(__dirname, 'text-case-converter/index.html'),
          numberWords: path.resolve(__dirname, 'number-to-urdu-words/index.html'),
          about: path.resolve(__dirname, 'about/index.html'),
          contact: path.resolve(__dirname, 'contact/index.html'),
          privacy: path.resolve(__dirname, 'privacy-policy/index.html'),
          terms: path.resolve(__dirname, 'terms/index.html'),
          notFound: path.resolve(__dirname, '404.html'),
          blog: path.resolve(__dirname, 'blog/index.html'),
          blogUrdu: path.resolve(__dirname, 'blog/roman-urdu-se-urdu-kaise-likhein/index.html'),
          blogZakat: path.resolve(__dirname, 'blog/zakat-kaise-nikalte-hain/index.html'),
          blogEmi: path.resolve(__dirname, 'blog/emi-kya-hai-aur-kaise-calculate-hoti-hai/index.html'),
          blogCv: path.resolve(__dirname, 'blog/cv-kaise-banayein/index.html'),
          blogPdf: path.resolve(__dirname, 'blog/pdf-files-merge-kaise-karein/index.html'),
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
