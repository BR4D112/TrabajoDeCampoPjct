import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import process from 'node:process';

export default defineConfig(({ mode }) => {
  // Cargar variables de entorno
  const env = loadEnv(mode, process.cwd(), '');

  
  const envWithPrefix = Object.entries(env).reduce((prev, [key, val]) => {
    prev[`import.meta.env.${key}`] = JSON.stringify(val);
    return prev;
  }, {});

  console.log("loadEnv variables:", env);
  console.log("Mapped import.meta.env variables:", envWithPrefix);
  console.log("trying to see the import meta",import.meta.env)
  return {
    plugins: [react()],
    define: {
       ...envWithPrefix, 
       //envDir: './src/config'
    },
  };
});
