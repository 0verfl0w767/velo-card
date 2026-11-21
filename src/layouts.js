import { escapeXml, truncate, wrapText, measureText, kFormat } from "./utils.js";
import {
  createCtx, frame, profileHeader, statsRow, sectionTitle, thumbnail, avatar, reactions,
  tagLine, dateLine, text, centeredText, pill, fade, icon,
} from "./svg.js";

const link = (url, inner) => `<a href="${escapeXml(url)}" target="_blank">${inner}</a>`;

function contrast(hex) {
  let h = hex.replace("#", "");
  if (h.length <= 4) h = [...h].map((c) => c + c).join("");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  return 0.299 * r + 0.587 * g + 0.114 * b > 160 ? "#1a1a1a" : "#ffffff";
}

const empty = (ctx, y) => centeredText(ctx.pad, y + 14, "meta", "아직 작성한 게시글이 없습니다.");

function topSection(ctx, data, parts) {
  let y = ctx.pad;
  if (ctx.opts.hideProfile) return y - 10;
  const h = profileHeader(ctx, data, y, "lg");
  parts.push(h.svg);
  y += h.height + 14;
  const s = statsRow(ctx, data, y);
  parts.push(s.svg);
  y += s.height;
  return y + (s.height ? 12 : 0);
}

export function list(data, opts) {
  const ctx = createCtx(opts.theme, opts.width, opts);
  const { t, width, pad } = ctx;
  const inner = width - pad * 2;
  const parts = [];
  let y = topSection(ctx, data, parts);
  parts.push(sectionTitle(ctx, y, opts.title || "최근 게시글"));
  y += 36;
  if (!data.posts.length) {
    parts.push(empty(ctx, y));
    y += 28;
  }

  const rowH = 44;
  data.posts.forEach((p, i) => {
    const top = y + i * rowH;
    const r = reactions(ctx, p, width - pad, top + 12);
    const tags = opts.hideTags ? "" : tagLine(p, inner - 110);
    const div = i > 0 ? `<line x1="${pad}" y1="${top - 2}" x2="${width - pad}" y2="${top - 2}" stroke="${t.border}" opacity=".55"/>` : "";
    parts.push(
      link(
        p.url,
        fade(
          120 + i * 50,
          div +
            `<rect x="${pad}" y="${top + 6}" width="3" height="26" rx="1.5" fill="${t.accent}"/>` +
            centeredText(pad + 12, top + 12, "post", truncate(p.title, inner - 14 - r.width - 14, 13)) +
            centeredText(pad + 12, top + 29, "meta", dateLine(p) + (tags ? ` · ${tags}` : "")) +
            r.svg,
        ),
      ),
    );
  });
  y += data.posts.length * rowH + pad - 10;
  return frame(ctx, data, y, parts.join(""));
}

export function thumbnailList(data, opts) {
  const ctx = createCtx(opts.theme, opts.width, opts);
  const { t, width, pad } = ctx;
  const parts = [];
  let y = topSection(ctx, data, parts);
  parts.push(sectionTitle(ctx, y, opts.title || "최근 게시글"));
  y += 40;
  if (!data.posts.length) {
    parts.push(empty(ctx, y - 6));
    y += 24;
  }

  const tw = 108;
  const th = 60;
  const rowH = th + 16;
  data.posts.forEach((p, i) => {
    const top = y + i * rowH;
    const x = pad + tw + 14;
    const w = width - pad - x;
    const descOrTag = (opts.hideDescription ? "" : p.description) || (opts.hideTags ? "" : tagLine(p, w));
    const metaY = descOrTag ? top + th - 7 : top + th - 14;
    const r = reactions(ctx, p, width - pad, metaY);
    const div = i > 0 ? `<line x1="${pad}" y1="${top - 8}" x2="${width - pad}" y2="${top - 8}" stroke="${t.border}" opacity=".55"/>` : "";
    parts.push(
      link(
        p.url,
        fade(
          120 + i * 50,
          div +
            thumbnail(ctx, p.thumbnail, pad, top, tw, th, 7, { border: true }) +
            centeredText(x, descOrTag ? top + 10 : top + 16, "post", truncate(p.title, w, 13)) +
            (descOrTag ? centeredText(x, top + 30, "meta", truncate(descOrTag, w, 11)) : "") +
            centeredText(x, metaY, "meta", dateLine(p)) +
            r.svg,
        ),
      ),
    );
  });
  y += data.posts.length * rowH + pad - 16;
  return frame(ctx, data, y, parts.join(""));
}

export function grid(data, opts) {
  const ctx = createCtx(opts.theme, opts.width, opts);
  const { t, width, pad } = ctx;
  const parts = [];
  let y = pad;
  if (!opts.hideProfile) {
    const h = profileHeader(ctx, data, y, "sm");
    parts.push(h.svg);
    y += h.height + 16;
  }
  if (!data.posts.length) {
    parts.push(empty(ctx, y - 4));
    return frame(ctx, data, y + 32, parts.join(""));
  }

  const cols = Math.min(opts.columns, data.posts.length);
  const gap = 16;
  const cw = (width - pad * 2 - gap * (cols - 1)) / cols;
  const th = Math.round(cw * opts.thumbRatio);
  const ip = 14;
  const descLines = opts.hideDescription ? 0 : 3;
  const ch = th + ip + 22 + descLines * 17 + 28 + 10 + 36;
  const r = Math.min(opts.radius, 14);

  data.posts.forEach((p, i) => {
    const x = pad + (i % cols) * (cw + gap);
    const top = y + Math.floor(i / cols) * (ch + gap);
    const tx = x + ip;
    const tw = cw - ip * 2;
    let yy = top + th + ip + 10;
    let s = `<rect x="${x + 0.5}" y="${top + 0.5}" width="${cw - 1}" height="${ch - 1}" rx="${r}" fill="${t.surface}" stroke="${t.border}"/>`;
    s += thumbnail(ctx, p.thumbnail, x, top, cw, th, r, { roundBottom: false });
    s += `<line x1="${x}" y1="${top + th}" x2="${x + cw}" y2="${top + th}" stroke="${t.border}" opacity=".6"/>`;
    s += centeredText(tx, yy, "post-md", truncate(p.title, tw, 14));
    yy += 16;
    if (descLines) {
      wrapText(p.description, tw, 12, descLines).forEach((line, li) => {
        s += centeredText(tx, yy + 6 + li * 17, "desc", line);
      });
      yy += descLines * 17 + 6;
    }
    yy += 12;
    s += centeredText(tx, yy, "meta", `${dateLine(p)} · ${p.comments}개의 댓글`);
    yy += 16;
    s += `<line x1="${x}" y1="${yy}" x2="${x + cw}" y2="${yy}" stroke="${t.border}"/>`;
    const fy = yy + 18;
    const avSize = 20;
    if (!opts.hideAvatar) {
      s += avatar(ctx, data, tx, fy - avSize / 2, avSize);
      s += `<text x="${tx + avSize + 7}" y="${fy}" dominant-baseline="central" class="by">by <tspan font-weight="700" fill="${t.title}">${escapeXml(truncate(data.displayName, tw - 100, 11))}</tspan></text>`;
    } else {
      s += `<text x="${tx}" y="${fy}" dominant-baseline="central" class="by">by <tspan font-weight="700" fill="${t.title}">${escapeXml(truncate(data.displayName, tw - 70, 11))}</tspan></text>`;
    }
    const lk = kFormat(p.likes);
    const lw = measureText(lk, 11);
    const lx = x + cw - ip - lw;
    s += icon("heart", lx - 16, fy - 6, t.title, 12) + centeredText(lx, fy, "meta", lk, `fill="${t.title}" style="fill:${t.title};font-weight:600"`);
    parts.push(link(p.url, fade(100 + i * 70, s)));
  });

  const rows = Math.ceil(data.posts.length / cols);
  y += rows * ch + (rows - 1) * gap + pad;
  return frame(ctx, data, y, parts.join(""));
}

export function featured(data, opts) {
  const ctx = createCtx(opts.theme, opts.width, opts);
  const { t, width, pad } = ctx;
  const inner = width - pad * 2;
  const parts = [];
  let y = pad;
  if (!opts.hideProfile) {
    const h = profileHeader(ctx, data, y, "sm");
    parts.push(h.svg);
    y += h.height + 16;
  }
  const p = data.posts[0];
  if (!p) {
    parts.push(empty(ctx, y - 4));
    return frame(ctx, data, y + 32, parts.join(""));
  }

  const th = Math.round(inner * opts.thumbRatio);
  const r = Math.min(opts.radius, 14);
  let s = thumbnail(ctx, p.thumbnail, pad, y, inner, th, r, { border: true });
  const label = opts.title || (opts.index ? "게시글" : "최신 글");
  const lw = Math.round(measureText(label, 11) + 20);
  const badgeBg = t.accent.toLowerCase() === "#ffffff" ? "#12b886" : t.accent;
  s += pill(pad + 12, y + 12, lw, 22, badgeBg, "pill", label, contrast(badgeBg));
  y += th + 24;

  const titleLines = wrapText(p.title, inner, 17, 2);
  titleLines.forEach((line, i) => {
    s += centeredText(pad, y + i * 24, "post-lg", line);
  });
  y += (titleLines.length - 1) * 24 + 20;

  if (!opts.hideDescription) {
    const lines = wrapText(p.description, inner, 12, 3);
    lines.forEach((line, i) => {
      s += centeredText(pad, y + 4 + i * 18, "desc", line);
    });
    y += lines.length * 18 + 10;
  }

  if (p.tags.length && !opts.hideTags) {
    y += 4;
    let x = pad;
    for (const tag of p.tags) {
      const w = Math.round(measureText(tag, 11) + 20);
      if (x + w > width - pad) break;
      s += pill(x, y, w, 22, t.chipBg, "chip", tag);
      x += w + 6;
    }
    y += 30;
  } else {
    y += 4;
  }

  s += `<line x1="${pad}" y1="${y}" x2="${width - pad}" y2="${y}" stroke="${t.border}"/>`;
  y += 18;
  const r2 = reactions(ctx, p, width - pad, y, 13);
  s += centeredText(pad, y, "meta", dateLine(p)) + r2.svg;
  parts.push(link(p.url, fade(80, s)));
  y += pad - 6;
  return frame(ctx, data, y, parts.join(""));
}

export function compact(data, opts) {
  const showProfile = !(opts.hideProfile && data.posts.length);
  const ctx = createCtx(opts.theme, opts.width, { ...opts, hideProfile: !showProfile });
  const { t, width, pad } = ctx;
  const parts = [];
  let y = showProfile ? topSection(ctx, data, parts) : pad - 6;
  const posts = data.posts;
  if (posts.length) {
    if (showProfile) {
      y += 6;
      parts.push(`<line x1="${pad}" y1="${y}" x2="${width - pad}" y2="${y}" stroke="${t.border}"/>`);
      y += 12;
    } else {
      y = pad - 4;
    }

    if (posts.length === 1) {
      const p = posts[0];
      const label = opts.title || (opts.index ? "게시글" : "최신 글");
      const lw = Math.round(measureText(label, 11) + 18);
      const dl = dateLine(p);
      const dw = measureText(dl, 11);
      const cy = y + 11;
      parts.push(
        link(
          p.url,
          fade(
            100,
            pill(pad, y, lw, 22, t.chipBg, "chip", label) +
              centeredText(pad + lw + 10, cy, "post", truncate(p.title, width - pad * 2 - lw - dw - 22, 13)) +
              centeredText(width - pad, cy, "meta", dl, 'text-anchor="end"'),
          ),
        ),
      );
      y += 22;
    } else {
      if (opts.title) {
        parts.push(centeredText(pad, y + 7, "section", opts.title));
        y += 22;
      }
      const rowH = 28;
      posts.forEach((p, i) => {
        const top = y + i * rowH;
        const cy = top + 11;
        const dl = dateLine(p);
        const dw = measureText(dl, 11);
        const num = String(opts.index + i + 1).padStart(2, "0");
        const pw = 26;
        parts.push(
          link(
            p.url,
            fade(
              100 + i * 40,
              pill(pad, top + 1, pw, 20, t.chipBg, "chip", num) +
                centeredText(pad + pw + 10, cy, "post", truncate(p.title, width - pad * 2 - pw - dw - 22, 13)) +
                centeredText(width - pad, cy, "meta", dl, 'text-anchor="end"'),
            ),
          ),
        );
      });
      y += posts.length * rowH - 6;
    }
  }
  y += pad - 4;
  return frame(ctx, data, y, parts.join(""));
}

export const layouts = {
  list: { render: list, width: 495, count: 5, thumbs: null },
  thumbnail: { render: thumbnailList, width: 495, count: 4, thumbs: () => ({ w: 108, h: 60 }) },
  grid: {
    render: grid,
    width: 640,
    count: 2,
    thumbs: (o) => {
      const cols = Math.min(o.columns, o.count) || 1;
      const w = Math.round((o.width - 48 - 16 * (cols - 1)) / cols);
      return { w, h: Math.round(w * o.thumbRatio) };
    },
  },
  featured: {
    render: featured,
    width: 495,
    count: 1,
    thumbs: (o) => ({ w: o.width - 48, h: Math.round((o.width - 48) * o.thumbRatio) }),
  },
  compact: { render: compact, width: 495, count: 0, thumbs: null },
};
