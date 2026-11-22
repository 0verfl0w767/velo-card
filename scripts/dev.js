import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import handler from "../api/index.js";

const PORT = process.env.PORT || 3000;
process.env.LOCAL_DEV = "1";
const PUBLIC_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../public");
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".svg": "image/svg+xml; charset=utf-8",
  ".png": "image/png",
  ".ico": "image/x-icon",
};

http
  .createServer((req, res) => {
    const url = new URL(req.url, "http://localhost");
    if (url.pathname === "/api" || url.pathname === "/api/") return handler(req, res);
    if ((url.pathname === "/" || url.pathname === "/index.html") && (url.searchParams.has("name") || url.searchParams.has("username"))) {
      return handler(req, res);
    }
    const rel = url.pathname === "/" ? "index.html" : url.pathname.replace(/^\/+/, "");
    const file = path.resolve(PUBLIC_DIR, rel);
    if (file.startsWith(PUBLIC_DIR + path.sep) && fs.existsSync(file) && fs.statSync(file).isFile()) {
      const ext = path.extname(file).toLowerCase();
      res.setHeader("Content-Type", MIME[ext] || "application/octet-stream");
      res.setHeader("Cache-Control", "no-store");
      res.statusCode = 200;
      return res.end(fs.readFileSync(file));
    }
    res.statusCode = 404;
    res.end("찾을 수 없습니다");
  })
  .listen(PORT, () => console.log(`velo-card 개발 서버 → http://localhost:${PORT}`));
