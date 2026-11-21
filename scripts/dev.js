import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import handler from "../api/index.js";

const PORT = process.env.PORT || 3000;
process.env.LOCAL_DEV = "1";
const INDEX_PATH = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../public/index.html",
);

http
  .createServer((req, res) => {
    const url = new URL(req.url, "http://localhost");
    if (url.pathname === "/api") return handler(req, res);
    if (url.pathname === "/" || url.pathname === "/index.html") {
      if (url.searchParams.has("name") || url.searchParams.has("username")) {
        return handler(req, res);
      }
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.statusCode = 200;
      return res.end(fs.readFileSync(INDEX_PATH));
    }
    res.statusCode = 404;
    res.end("찾을 수 없습니다");
  })
  .listen(PORT, () => console.log(`http://localhost:${PORT}`));
