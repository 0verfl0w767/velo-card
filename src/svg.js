import { escapeXml, truncate, measureText, kFormat, formatDate } from "./utils.js";

export const FONT = `'Pretendard','Apple SD Gothic Neo','Malgun Gothic','Segoe UI',system-ui,sans-serif`;

const ICONS = {
  heart:
    "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
  comment:
    "M6 3h12a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4H9.6l-4.1 3.3A1 1 0 0 1 3.8 19.5V16.4A4 4 0 0 1 2 13V7a4 4 0 0 1 4-4zm1 5.2a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1zm0 3.6a1 1 0 0 1 1-1h5a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1z",
  post:
    "M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13zm-5 4h8v1.6H8V13zm0 3.2h8v1.6H8v-1.6z",
  pen:
    "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm17.71-10.21a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z",
  users:
    "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z",
};

export function createCtx(theme, width, opts) {
  let n = 0;
  return { t: theme, width, opts, pad: 24, uid: (p = "c") => `${p}${++n}` };
}

export const icon = (name, x, y, color, size = 13) =>
  `<svg x="${x}" y="${y}" width="${size}" height="${size}" viewBox="0 0 24 24"><path fill="${color}" fill-rule="evenodd" d="${ICONS[name]}"/></svg>`;

export const velogLogo = (x, y, size, color = "#20c997") => `
  <svg x="${x}" y="${y}" width="${size}" height="${size}" viewBox="0 0 192 192">
    <rect width="192" height="192" rx="32" fill="${color}"/>
    <path fill="#fff" d="M49 65.4v-6.4c7.2-1.4 17.6-2.3 25.3-2.3 6.5 0 8.9 3 8.9 8.4l-0.5 40.6c13.7-15.6 22-31.1 22-43.5 0-4-1-6.7-3.6-9.2 7.5-1.8 13.6-2.6 19.6-2.6 6.1 0 10.2 3 10.2 10.2 0 21.3-21.6 51.2-51.7 74.7-6.5 0-13.2 0.1-19.9 0.2l1.2-63.8c0-4.6-1.2-6.3-11.5-6.3z"/>
  </svg>`;

const logoColor = (t) => (t.accent.toLowerCase() === "#ffffff" ? "#12b886" : "#20c997");

export const text = (x, y, cls, str, extra = "") =>
  `<text x="${x}" y="${y}" class="${cls}"${extra ? " " + extra : ""}>${escapeXml(str)}</text>`;

export const centeredText = (x, cy, cls, str, extra = "") =>
  `<text x="${x}" y="${cy}" dominant-baseline="central" class="${cls}"${extra ? " " + extra : ""}>${escapeXml(str)}</text>`;

export const fade = (delay, inner) => `<g class="fade" style="animation-delay:${delay}ms">${inner}</g>`;

export function pill(x, y, w, h, bg, cls, label, textColor = "") {
  const r = Math.round(h / 2);
  const fillAttr = textColor ? ` fill="${textColor}" style="fill:${textColor}"` : "";
  return (
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${bg}"/>` +
    centeredText(x + w / 2, y + h / 2, cls, label, `text-anchor="middle"${fillAttr}`)
  );
}

export function avatar(ctx, data, x, y, size) {
  const { t } = ctx;
  const cx = x + size / 2;
  const cy = y + size / 2;
  if (data.avatar) {
    const id = ctx.uid("av");
    return `<clipPath id="${id}"><circle cx="${cx}" cy="${cy}" r="${size / 2}"/></clipPath>
      <image href="${data.avatar}" x="${x}" y="${y}" width="${size}" height="${size}" clip-path="url(#${id})" preserveAspectRatio="xMidYMid slice"/>
      <circle cx="${cx}" cy="${cy}" r="${size / 2 - 0.5}" fill="none" stroke="${t.border}"/>`;
  }
  const initial = [...data.displayName][0]?.toUpperCase() || "V";
  return `<circle cx="${cx}" cy="${cy}" r="${size / 2}" fill="${t.chipBg}"/>
    <text x="${cx}" y="${cy}" dominant-baseline="central" text-anchor="middle" font-size="${size * 0.38}" font-weight="700" fill="${t.accent}">${escapeXml(initial)}</text>`;
}

export function thumbnail(ctx, uri, x, y, w, h, r = 6, { roundBottom = true, border = false } = {}) {
  const { t } = ctx;
  const id = ctx.uid("th");
  const shape = roundBottom
    ? `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}"/>`
    : `<path d="M${x},${y + h} V${y + r} Q${x},${y} ${x + r},${y} H${x + w - r} Q${x + w},${y} ${x + w},${y + r} V${y + h} Z"/>`;
  const clip = `<clipPath id="${id}">${shape}</clipPath>`;
  const stroke = border ? `<rect x="${x + 0.5}" y="${y + 0.5}" width="${w - 1}" height="${h - 1}" rx="${r}" fill="none" stroke="${t.border}"/>` : "";
  if (uri) {
    return `${clip}<image href="${uri}" x="${x}" y="${y}" width="${w}" height="${h}" clip-path="url(#${id})" preserveAspectRatio="xMidYMid slice"/>${stroke}`;
  }
  const gid = ctx.uid("pg");
  const logo = Math.min(w, h) * 0.32;
  return `${clip}
    <linearGradient id="${gid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${t.accent}" stop-opacity=".28"/><stop offset="1" stop-color="${t.accent}" stop-opacity=".08"/></linearGradient>
    <g clip-path="url(#${id})"><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${t.surface}"/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#${gid})"/></g>
    <g opacity=".88">${velogLogo(x + (w - logo) / 2, y + (h - logo) / 2, logo, logoColor(t))}</g>${stroke}`;
}

export function profileHeader(ctx, data, y, size = "lg") {
  const { t, width, pad, opts } = ctx;
  const showAvatar = !opts.hideAvatar;
  const lg = size === "lg";
  const av = lg ? 52 : 38;
  const textX = pad + (showAvatar ? av + (lg ? 14 : 12) : 0);
  const textW = width - textX - pad - 32;
  const bio = lg && !opts.hideBio ? truncate(data.bio, textW, 12) : "";

  let svg = showAvatar ? avatar(ctx, data, pad, y, av) : "";
  if (lg) {
    svg += centeredText(textX, y + 12, "name", truncate(data.displayName, textW, 18));
    svg += centeredText(textX, y + 31, "sub", truncate(`@${data.username} · ${data.blogTitle}`, textW, 12));
    if (bio) svg += centeredText(textX, y + 48, "bio", bio);
  } else {
    svg += centeredText(textX, y + 11, "name-sm", truncate(data.displayName, textW, 15));
    if (opts.hideStats) {
      svg += centeredText(textX, y + 29, "sub", truncate(`@${data.username}`, textW, 12));
    } else {
      const prefix = opts.hideFollow
        ? `@${data.username} · 게시글 ${kFormat(data.postsCount)}`
        : `@${data.username} · 게시글 ${kFormat(data.postsCount)} · 팔로워 ${kFormat(data.followers)} · 팔로잉 ${kFormat(data.followings)}`;
      const sep = " ·";
      const likesStr = kFormat(data.recentLikes ?? 0);
      const heartW = 12;
      const rightReserve = measureText(sep, 12) + 4 + heartW + 4 + measureText(likesStr, 12);
      const clipped = truncate(prefix, Math.max(80, textW - rightReserve), 12);
      const heartX = textX + measureText(clipped + sep, 12) + 4;
      svg += centeredText(textX, y + 29, "sub", clipped + sep);
      svg += icon("heart", heartX, y + 23, t.accent, heartW);
      svg += centeredText(heartX + heartW + 4, y + 29, "sub", likesStr);
    }
  }
  svg += velogLogo(width - pad - 24, y, 24, logoColor(t));
  const height = lg ? Math.max(showAvatar ? av : 0, bio ? 56 : 40) : Math.max(showAvatar ? av : 0, 38);
  return { svg: fade(0, svg), height };
}

export function statsRow(ctx, data, y) {
  const { t, width, pad, opts } = ctx;
  if (opts.hideStats && opts.hideTags) return { svg: "", height: 0 };
  let row = "";
  let curY = y;
  if (!opts.hideStats) {
    let x = pad;
    const cy = curY + 10;
    const stats = [["post", `게시글 ${kFormat(data.postsCount)}`]];
    if (!opts.hideFollow) stats.push(["users", `팔로워 ${kFormat(data.followers)} · 팔로잉 ${kFormat(data.followings)}`]);
    stats.push(["heart", `최근 좋아요 ${kFormat(data.recentLikes ?? 0)}`]);
    for (const [ic, label] of stats) {
      row += icon(ic, x, cy - 6.5, t.accent, 13) + centeredText(x + 18, cy, "stat", label);
      x += 18 + measureText(label, 12) + 16;
    }
    curY += 20;
  }
  const tagList = Array.isArray(opts.tags) ? opts.tags.map((name) => ({ name })) : data.topTags;
  if (!opts.hideTags && tagList.length) {
    if (!opts.hideStats) curY += 8;
    let x = pad;
    for (const tag of tagList) {
      const label = `#${tag.name}`;
      const w = Math.round(measureText(label, 11) + 18);
      if (x + w > width - pad) break;
      row += pill(x, curY, w, 20, t.chipBg, "chip", label);
      x += w + 6;
    }
    curY += 20;
  }
  return { svg: fade(160, row), height: curY - y };
}

export function reactions(ctx, p, right, cy, size = 12) {
  const { t } = ctx;
  const l = kFormat(p.likes);
  const c = kFormat(p.comments);
  const lw = measureText(l, 11);
  const cw = measureText(c, 11);
  const gap = 12;
  const w = size + 4 + lw + gap + size + 4 + cw;
  const x = right - w;
  const iy = cy - size / 2;
  const svg =
    icon("heart", x, iy, t.muted, size) +
    centeredText(x + size + 4, cy, "meta", l) +
    icon("comment", x + size + 4 + lw + gap, iy, t.muted, size) +
    centeredText(x + size + 4 + lw + gap + size + 4, cy, "meta", c);
  return { svg, width: w };
}

export function tagLine(p, maxWidth, size = 10.5) {
  return p.tags.length ? truncate(p.tags.slice(0, 4).map((x) => "#" + x).join(" "), maxWidth, size) : "";
}

export function dateLine(p) {
  return formatDate(p.releasedAt);
}

export const sectionTitle = (ctx, y, label) => {
  const { t, width, pad } = ctx;
  return fade(
    240,
    `<line x1="${pad}" y1="${y}" x2="${width - pad}" y2="${y}" stroke="${t.border}"/>` +
      centeredText(pad, y + 20, "section", label),
  );
};

function background(t, width, height, radius, hideBorder) {
  let defs = "";
  let fill = t.bg;
  if (typeof t.bg === "object") {
    const stops = t.bg.colors
      .map((c, i) => `<stop offset="${(i / (t.bg.colors.length - 1)) * 100}%" stop-color="${c}"/>`)
      .join("");
    defs = `<linearGradient id="bgGrad" gradientTransform="rotate(${(t.bg.angle ?? 90) - 90}, .5, .5)">${stops}</linearGradient>`;
    fill = "url(#bgGrad)";
  }
  const stroke = hideBorder ? "" : ` stroke="${t.border}"`;
  return `${defs}<rect x="0.5" y="0.5" width="${width - 1}" height="${height - 1}" rx="${radius}" fill="${fill}"${stroke}/>`;
}

export function frame(ctx, data, height, body) {
  const { t, width, opts } = ctx;
  const h = Math.ceil(height);
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${width}" height="${h}" viewBox="0 0 ${width} ${h}" role="img" aria-label="${escapeXml(data.displayName)}님의 velog 카드">
  <title>${escapeXml(data.displayName)} · velog</title>
  <style>
    text { font-family: ${FONT}; }
    .name { font-size: 18px; font-weight: 700; fill: ${t.title}; }
    .name-sm { font-size: 15px; font-weight: 700; fill: ${t.title}; }
    .sub { font-size: 12px; fill: ${t.muted}; }
    .bio { font-size: 12px; fill: ${t.text}; }
    .stat { font-size: 12px; font-weight: 600; fill: ${t.text}; }
    .chip { font-size: 11px; font-weight: 600; fill: ${t.chipText}; }
    .pill { font-size: 11px; font-weight: 700; }
    .section { font-size: 14px; font-weight: 700; fill: ${t.accent}; }
    .post { font-size: 13px; font-weight: 600; fill: ${t.title}; }
    .post-lg { font-size: 17px; font-weight: 700; fill: ${t.title}; }
    .post-md { font-size: 14px; font-weight: 700; fill: ${t.title}; }
    .desc { font-size: 12px; fill: ${t.text}; }
    .meta { font-size: 11px; fill: ${t.muted}; }
    .by { font-size: 11px; fill: ${t.muted}; }
    .fade { opacity: 0; animation: fadeIn .75s cubic-bezier(.22, 1, .36, 1) forwards; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
    ${opts.disableAnimations ? ".fade { animation: none; opacity: 1; }" : "@media (prefers-reduced-motion: reduce) { .fade { animation: none; opacity: 1; } }"}
  </style>
  ${background(t, width, h, opts.radius, opts.hideBorder)}
  ${body}
</svg>`;
}
