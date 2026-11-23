import { layouts } from "./layouts.js";
import { resolveTheme } from "./themes.js";
import { clampInt, parseBool } from "./utils.js";

const RATIOS = { wide: 0.5, video: 0.5625, classic: 0.75, square: 1 };

export function parseOptions(q = {}) {
  const layoutName = layouts[q.layout] ? q.layout : "list";
  const layout = layouts[layoutName];
  const index = clampInt(q.index, 0, 20, 0);
  const width = clampInt(q.width, 300, 1000, layout.width);
  const count = clampInt(q.count, 0, 10, layout.count);

  const ratio = RATIOS[q.thumb_ratio] ?? (parseFloat(q.thumb_ratio) > 0 ? Math.min(1.2, Math.max(0.3, parseFloat(q.thumb_ratio))) : 0.52);
  const rawScale = parseFloat(q.scale);
  const scale = Number.isFinite(rawScale) && rawScale > 0
    ? Math.round(Math.min(2, Math.max(0.7, rawScale)) * 100) / 100
    : 1.2;

  const opts = {
    layout: layoutName,
    theme: resolveTheme(q.theme, q),
    width,
    scale,
    count,
    index,
    columns: clampInt(q.columns, 1, 4, Math.min(2, Math.max(count, 1))),
    thumbRatio: ratio,
    radius: clampInt(q.border_radius, 0, 30, 10),
    tag: q.tag || null,
    tags:
      typeof q.tags === "string"
        ? q.tags
            .split(",")
            .map((s) => s.trim().replace(/^#/, ""))
            .filter(Boolean)
            .slice(0, 12)
        : null,
    title: q.title ? String(q.title).slice(0, 40) : "",
    hideAvatar: parseBool(q.hide_avatar),
    hideBio: parseBool(q.hide_bio),
    hideTags: parseBool(q.hide_tags),
    hideStats: parseBool(q.hide_stats),
    hideFollow: parseBool(q.hide_follow),
    hideProfile: parseBool(q.hide_profile),
    hideDescription: parseBool(q.hide_description),
    hideBorder: parseBool(q.hide_border),
    disableAnimations: parseBool(q.disable_animations),
  };
  opts.thumbs = layout.thumbs ? layout.thumbs(opts) : null;
  opts.needAvatar = !opts.hideAvatar;
  return opts;
}
