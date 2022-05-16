import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
        port: 3000,
        proxy: {
            '/socket.io': {
                target: 'http://192.168.0.114:5000',
                changeOrigin: true,
                secure: false,
                ws: true,
                rewrite: path => path.replace(/^\/socket.io/, ''),
            },
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '/src'),
        },
    },
});
