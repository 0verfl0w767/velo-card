const VELOG_GRAPHQL = "https://v3.velog.io/graphql";

const QUERY = `
query VeloCard($username: String!, $limit: Int, $tag: String) {
  user(input: { username: $username }) {
    username
    followers_count
    followings_count
    profile { display_name short_bio thumbnail }
    velog_config { title }
  }
  posts(input: { username: $username, limit: $limit, tag: $tag }) {
    title
    url_slug
    released_at
    likes
    comments_count
    tags
    thumbnail
    short_description
  }
  userTags(input: { username: $username }) {
    posts_count
    tags { name posts_count }
  }
}`;

export class NotFoundError extends Error {}

const TIMEOUT = 4000;

async function gql(query, variables) {
  const res = await fetch(VELOG_GRAPHQL, {
    method: "POST",
    headers: { "Content-Type": "application/json", "User-Agent": "velo-card" },
    body: JSON.stringify({ query, variables }),
    signal: AbortSignal.timeout(TIMEOUT + 2000),
  });
  const json = await res.json().catch(() => null);
  if (json?.errors?.length) throw new Error(json.errors[0].message);
  if (!res.ok || !json) throw new Error(`velog API 응답 오류 (${res.status})`);
  return json.data;
}

function toBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  let bin = "";
  for (let i = 0; i < bytes.length; i += 8192) {
    bin += String.fromCharCode(...bytes.subarray(i, i + 8192));
  }
  return btoa(bin);
}

async function download(url, maxBytes) {
  const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT) });
  if (!res.ok) return null;
  const type = (res.headers.get("content-type") || "").split(";")[0];
  if (!type.startsWith("image/")) return null;
  const buf = await res.arrayBuffer();
  if (buf.byteLength > maxBytes) return null;
  return `data:${type};base64,${toBase64(buf)}`;
}

export async function toDataUri(url, { w = 400, h = 0 } = {}) {
  if (!url) return null;
  const proxy =
    `https://wsrv.nl/?url=${encodeURIComponent(url)}&w=${w * 2}` +
    (h ? `&h=${h * 2}&fit=cover&a=attention` : "") +
    `&output=jpg&q=72&default=1`;
  try {
    const viaProxy = await download(proxy, 300 * 1024);
    if (viaProxy) return viaProxy;
  } catch {}
  try {
    return await download(url, 600 * 1024);
  } catch {
    return null;
  }
}

export async function fetchVelog(username, { limit = 5, offset = 0, tag = null, avatar = true, thumbnails = null } = {}) {
  let data;
  try {
    data = await gql(QUERY, { username, limit: Math.max(offset + limit, 1), tag: tag || null });
  } catch (err) {
    if (/invalid username|not found/i.test(err.message)) throw new NotFoundError(`velog 사용자 "${username}"을(를) 찾을 수 없습니다`);
    throw err;
  }
  if (!data?.user) throw new NotFoundError(`velog 사용자 "${username}"을(를) 찾을 수 없습니다`);

  const { user, userTags } = data;
  const posts = (data.posts || []).slice(offset, offset + limit);

  const [avatarUri, ...thumbs] = await Promise.all([
    avatar ? toDataUri(user.profile?.thumbnail, { w: 64, h: 64 }) : null,
    ...posts.map((p) => (thumbnails && p.thumbnail ? toDataUri(p.thumbnail, thumbnails) : null)),
  ]);

  return {
    username: user.username,
    displayName: user.profile?.display_name || user.username,
    bio: user.profile?.short_bio || "",
    blogTitle: user.velog_config?.title || `${user.username}.log`,
    avatar: avatarUri,
    followers: user.followers_count ?? 0,
    followings: user.followings_count ?? 0,
    postsCount: userTags?.posts_count ?? posts.length,
    topTags: (userTags?.tags || []).slice(0, 6),
    allTags: (userTags?.tags || []).slice(0, 30).map((t) => ({ name: t.name, count: t.posts_count })),
    posts: posts.map((p, i) => ({
      title: p.title,
      description: p.short_description || "",
      url: `https://velog.io/@${user.username}/${encodeURIComponent(p.url_slug)}`,
      releasedAt: p.released_at,
      likes: p.likes ?? 0,
      comments: p.comments_count ?? 0,
      tags: p.tags || [],
      thumbnail: thumbs[i] || null,
    })),
  };
}
