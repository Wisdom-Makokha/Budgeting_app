import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    server: {
        host: true, // Allows the server to be accessible externally
        port: 5173, // Port that Vite runs on
        strictPort: true, // Ensures Vite will fail if 5173 is already in use
        watch: {
            usePolling: true, // Useful for file changes in mounted volumes
        },
    },
});
