import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  // server: {
  //   host: "0.0.0.0", // This will allow connections from all network interfaces
  //   port: 3000, // You can choose any port number
  //   allowedHosts: ["saravana.local", "0.0.0.0", "localhost", "127.17.2.66"],
  // },
});
