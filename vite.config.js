import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadHttpsCredentials() {
  const certDir = path.resolve(__dirname, "certs");
  const keyPath = path.join(certDir, "key.pem");
  const certPath = path.join(certDir, "cert.pem");

  if (!fs.existsSync(keyPath) || !fs.existsSync(certPath)) {
    throw new Error(
      [
        "Missing HTTPS certificates for local network testing.",
        `Expected files: ${keyPath} and ${certPath}`,
        "Generate them with mkcert and place them in the certs folder."
      ].join("\n")
    );
  }

  return {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath)
  };
}

export default defineConfig(({ command }) => {
  const shouldUseHttps = command === "serve";
  const https = shouldUseHttps ? loadHttpsCredentials() : undefined;

  return {
    server: {
      host: "0.0.0.0",
      port: 5173,
      strictPort: true,
      https
    },
    preview: {
      host: "0.0.0.0",
      port: 4173,
      strictPort: true,
      https
    }
  };
});
