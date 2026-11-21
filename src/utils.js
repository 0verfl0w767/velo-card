export function escapeXml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "");
}

function charWidth(ch) {
  const code = ch.codePointAt(0);
  if (
    (code >= 0x1100 && code <= 0x11ff) ||
    (code >= 0x2e80 && code <= 0xa4cf) ||
    (code >= 0xac00 && code <= 0xd7a3) ||
    (code >= 0xf900 && code <= 0xfaff) ||
    (code >= 0xfe30 && code <= 0xfe4f) ||
    (code >= 0xff00 && code <= 0xff60) ||
    (code >= 0xffe0 && code <= 0xffe6) ||
    code >= 0x1f000
  )
    return 1;
  if (/[A-Z]/.test(ch)) return 0.65;
  if (/[mwMW@]/.test(ch)) return 0.8;
  if (/[iljtf.,:;'|!\s]/.test(ch)) return 0.3;
  return 0.55;
}

export function measureText(str, fontSize) {
  let w = 0;
  for (const ch of String(str)) w += charWidth(ch);
  return w * fontSize;
}

export function truncate(str = "", maxWidth, fontSize) {
  const s = String(str).replace(/\s+/g, " ").trim();
  if (measureText(s, fontSize) <= maxWidth) return s;
  const ellipsis = "…";
  const limit = maxWidth - measureText(ellipsis, fontSize);
  let w = 0;
  let out = "";
  for (const ch of s) {
    const cw = charWidth(ch) * fontSize;
    if (w + cw > limit) break;
    w += cw;
    out += ch;
  }
  return out.trimEnd() + ellipsis;
}

export function wrapText(str = "", maxWidth, fontSize, maxLines = 2) {
  const s = String(str).replace(/\s+/g, " ").trim();
  if (!s) return [];
  const lines = [];
  let line = "";
  let w = 0;
  let lineStart = 0;
  const chars = [...s];
  for (let i = 0; i < chars.length; i++) {
    const ch = chars[i];
    const cw = charWidth(ch) * fontSize;
    if (w + cw > maxWidth) {
      if (lines.length === maxLines - 1) {
        lines.push(truncate(chars.slice(lineStart).join(""), maxWidth, fontSize));
        return lines;
      }
      const sp = line.lastIndexOf(" ");
      let rest = "";
      if (sp > line.length * 0.5) {
        rest = line.slice(sp + 1);
        line = line.slice(0, sp);
      }
      lines.push(line);
      line = rest;
      lineStart = i - [...rest].length;
      w = measureText(rest, fontSize);
      if (ch === " " && !line) {
        lineStart = i + 1;
        continue;
      }
    }
    line += ch;
    w += cw;
  }
  if (line) lines.push(line);
  return lines;
}

export function formatDate(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
}

export function kFormat(n = 0) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "m";
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  return String(n);
}

export function clampInt(value, min, max, fallback) {
  const n = parseInt(value, 10);
  if (Number.isNaN(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

export function parseBool(v) {
  return v === "" || v === "true" || v === "1";
}
