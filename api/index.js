import { fetchVelog, NotFoundError } from "../src/fetcher.js";
import { renderCard, renderError } from "../src/card.js";
import { parseOptions } from "../src/options.js";

const USERNAME = /^[a-zA-Z0-9_-]{1,40}$/;

export default async function handler(req, res) {
  const url = new URL(req.url, "http://localhost");
  const q = Object.fromEntries(url.searchParams);
  const name = (q.name || q.username || "").replace(/^@/, "");

  if (q.meta === "tags") {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (!USERNAME.test(name)) {
      res.setHeader("Cache-Control", "no-store");
      res.statusCode = 400;
      return res.end(JSON.stringify({ error: "유효한 name 파라미터가 필요합니다." }));
    }
    try {
      const data = await fetchVelog(name, { limit: 0, avatar: false });
      res.setHeader(
        "Cache-Control",
        process.env.LOCAL_DEV ? "no-store" : "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
      );
      res.statusCode = 200;
      return res.end(JSON.stringify({ username: data.username, tags: data.allTags }));
    } catch (err) {
      res.setHeader("Cache-Control", "no-store");
      res.statusCode = err instanceof NotFoundError ? 404 : 500;
      return res.end(JSON.stringify({ error: err.message }));
    }
  }

  const opts = parseOptions(q);
  res.setHeader("Content-Type", "image/svg+xml; charset=utf-8");

  if (!USERNAME.test(name)) {
    res.setHeader("Cache-Control", "no-store");
    res.statusCode = 400;
    return res.end(renderError('유효한 "name" 파라미터가 필요합니다. 예: ?name=velopert', opts.theme, opts.width));
  }

  try {
    const data = await fetchVelog(name, {
      limit: opts.count,
      offset: opts.index,
      tag: opts.tag,
      avatar: opts.needAvatar,
      thumbnails: opts.thumbs,
    });
    const svg = renderCard(data, opts);
    const cache = Math.min(86400, Math.max(1800, parseInt(q.cache_seconds, 10) || 3600));
    res.setHeader(
      "Cache-Control",
      process.env.LOCAL_DEV ? "no-store" : `public, max-age=${cache}, s-maxage=${cache}, stale-while-revalidate=86400`,
    );
    res.statusCode = 200;
    return res.end(svg);
  } catch (err) {
    res.setHeader("Cache-Control", "no-store");
    res.statusCode = err instanceof NotFoundError ? 404 : 500;
    return res.end(renderError(err.message, opts.theme, opts.width));
  }
}
