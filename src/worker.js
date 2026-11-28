import { handleApiRequest } from "./handler.js";

const IGNORED_LOG_USERS = new Set(["velopert", "0verfl0w767"]);

function logApiRequest(url, status, cache) {
  const name = (url.searchParams.get("name") || url.searchParams.get("username") || "").replace(/^@/, "");
  if (status < 500 && IGNORED_LOG_USERS.has(name.toLowerCase())) return;
  const entry = JSON.stringify({
    message: name || "(no name)",
    path: url.pathname,
    name: name || null,
    layout: url.searchParams.get("layout") || "list",
    theme: url.searchParams.get("theme") || "light",
    meta: url.searchParams.get("meta") || null,
    cache,
    status,
  });
  if (status >= 500) console.error(entry);
  else console.log(entry);
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const isApi =
      url.pathname === "/api" ||
      url.pathname === "/api/" ||
      ((url.pathname === "/" || url.pathname === "/index.html") &&
        (url.searchParams.has("name") || url.searchParams.has("username")));

    if (!isApi) return env.ASSETS.fetch(request);

    const cache = typeof caches !== "undefined" ? caches.default : null;
    const cacheKey = new Request(`${url.origin}/__v3${url.pathname}${url.search}`, { method: "GET" });
    if (cache && request.method === "GET") {
      const cached = await cache.match(cacheKey);
      if (cached) {
        logApiRequest(url, cached.status, "hit");
        return cached;
      }
    }

    const result = await handleApiRequest(url);
    const response = new Response(result.body, { status: result.status, headers: result.headers });
    logApiRequest(url, result.status, "miss");

    if (cache && request.method === "GET" && result.status === 200) {
      ctx.waitUntil(cache.put(cacheKey, response.clone()));
    }
    return response;
  },
};
