import { escapeXml, truncate } from "./utils.js";
import { FONT } from "./svg.js";
import { layouts } from "./layouts.js";

export { layouts };

export function renderCard(data, opts) {
  const layout = layouts[opts.layout] || layouts.list;
  return layout.render(data, opts);
}

export function renderError(message, theme, width = 495, scale = 1) {
  const t = theme;
  const bg = typeof t.bg === "string" ? t.bg : t.bg.colors[0];
  const outW = Math.round(width * scale);
  const outH = Math.round(100 * scale);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${outW}" height="${outH}" viewBox="0 0 ${width} 100">
  <style>text{font-family:${FONT};}</style>
  <rect x="0.5" y="0.5" width="${width - 1}" height="99" rx="8" fill="${bg}" stroke="${t.border}"/>
  <text x="25" y="42" font-size="16" font-weight="700" fill="#fa5252">오류가 발생했습니다</text>
  <text x="25" y="68" font-size="12" fill="${t.muted}">${escapeXml(truncate(message, width - 50, 12))}</text>
</svg>`;
}
