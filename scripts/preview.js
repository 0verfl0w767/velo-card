import fs from "node:fs";
import path from "node:path";
import { fetchVelog } from "../src/fetcher.js";
import { renderCard } from "../src/card.js";
import { parseOptions } from "../src/options.js";
import { themeNames } from "../src/themes.js";

const args = process.argv.slice(2);
const isStatic = args.includes("--static");
const name = args.find((a) => !a.startsWith("--")) || "velopert";
const out = path.resolve("preview");
fs.mkdirSync(out, { recursive: true });

const samples = {
  list: { layout: "list" },
  thumbnail: { layout: "thumbnail", theme: "dark" },
  grid: { layout: "grid" },
  "grid-dark": { layout: "grid", theme: "github_dark", count: "2", hide_profile: "true" },
  "grid-3": { layout: "grid", theme: "tokyonight", count: "3", columns: "3", width: "800" },
  featured: { layout: "featured", theme: "sunset" },
  compact: { layout: "compact", theme: "nord" },
  custom: { layout: "thumbnail", bg_color: "135,0f2027,2c5364", title_color: "ffffff", text_color: "dfe6e9", muted_color: "b2bec3", accent_color: "fdcb6e", border_color: "00000000", surface_color: "ffffff14", chip_color: "ffffff1f", chip_text_color: "fdcb6e" },
};
for (const t of themeNames) samples[`theme-${t}`] = { layout: "list", theme: t, count: "3" };

const cache = new Map();
const imgs = [];
for (const [key, q] of Object.entries(samples)) {
  const opts = parseOptions(isStatic ? { ...q, disable_animations: "true" } : q);
  const ck = JSON.stringify([opts.count, opts.index, opts.tag, opts.needAvatar, opts.thumbs]);
  if (!cache.has(ck)) cache.set(ck, await fetchVelog(name, { limit: opts.count, offset: opts.index, tag: opts.tag, avatar: opts.needAvatar, thumbnails: opts.thumbs }));
  const file = `${key}.svg`;
  fs.writeFileSync(path.join(out, file), renderCard(cache.get(ck), opts));
  imgs.push(`<figure><figcaption>${key}</figcaption><img src="${file}"></figure>`);
  console.log("생성:", file);
}
fs.writeFileSync(
  path.join(out, "index.html"),
  `<!doctype html><meta charset="utf-8"><body style="margin:16px;background:#888;font-family:sans-serif;display:flex;flex-wrap:wrap;gap:16px;align-items:flex-start">${imgs.join("")}</body>`,
);
console.log("preview/index.html 파일을 열어보세요");
