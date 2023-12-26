import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/posts': 'http://localhost:6666',
            '/auth/login': 'http://localhost:6666',
            '/auth/register': 'http://localhost:6666',
            '/auth/logout': 'http://localhost:6666',
        },
    },
})
