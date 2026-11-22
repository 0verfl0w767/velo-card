import { fetchVelog, NotFoundError } from "./fetcher.js";
import { renderCard, renderError } from "./card.js";
import { parseOptions } from "./options.js";

const USERNAME = /^[a-zA-Z0-9_-]{1,40}$/;

export async function handleApiRequest(url, { noCache = false } = {}) {
  const q = Object.fromEntries(url.searchParams);
  const name = (q.name || q.username || "").replace(/^@/, "");

  if (q.meta === "tags") {
    const headers = { "Content-Type": "application/json; charset=utf-8" };
    if (!USERNAME.test(name)) {
      headers["Cache-Control"] = "no-store";
      return { status: 400, headers, body: JSON.stringify({ error: "유효한 name 파라미터가 필요합니다." }) };
    }
    try {
      const data = await fetchVelog(name, { limit: 0, avatar: false });
      headers["Cache-Control"] = noCache
        ? "no-store"
        : "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400";
      return { status: 200, headers, body: JSON.stringify({ username: data.username, tags: data.allTags }) };
    } catch (err) {
      headers["Cache-Control"] = "no-store";
      return {
        status: err instanceof NotFoundError ? 404 : 500,
        headers,
        body: JSON.stringify({ error: err.message }),
      };
    }
  }

  const opts = parseOptions(q);
  const headers = { "Content-Type": "image/svg+xml; charset=utf-8" };

  if (!USERNAME.test(name)) {
    headers["Cache-Control"] = "no-store";
    return {
      status: 400,
      headers,
      body: renderError('유효한 "name" 파라미터가 필요합니다. 예: ?name=velopert', opts.theme, opts.width, opts.scale),
    };
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
    headers["Cache-Control"] = noCache
      ? "no-store"
      : `public, max-age=${cache}, s-maxage=${cache}, stale-while-revalidate=86400`;
    return { status: 200, headers, body: svg };
  } catch (err) {
    headers["Cache-Control"] = "no-store";
    return {
      status: err instanceof NotFoundError ? 404 : 500,
      headers,
      body: renderError(err.message, opts.theme, opts.width, opts.scale),
    };
  }
}
