import { defineConfig } from "vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [TanStackRouterVite(), react(), tsconfigPaths()],
    server: {
        host: true, // Allows the server to be accessible externally
        port: 5173, // Port that Vite runs on
        strictPort: true, // Ensures Vite will fail if 5173 is already in use
        watch: {
            usePolling: true, // Useful for file changes in mounted volumes
        },
    },
});
