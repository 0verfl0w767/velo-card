import { handleApiRequest } from "./handler.js";

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
    const cacheKey = new Request(`${url.origin}/__v2${url.pathname}${url.search}`, { method: "GET" });
    if (cache && request.method === "GET") {
      const cached = await cache.match(cacheKey);
      if (cached) return cached;
    }

    const result = await handleApiRequest(url);
    const response = new Response(result.body, { status: result.status, headers: result.headers });

    if (cache && request.method === "GET" && result.status === 200) {
      ctx.waitUntil(cache.put(cacheKey, response.clone()));
    }
    return response;
  },
};
