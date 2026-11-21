const LAYOUTS = {
  list: { label: "목록", width: 495, count: 5, icon: `<rect x="2" y="3" width="24" height="5" rx="1.5"/><rect x="2" y="10" width="24" height="3" rx="1"/><rect x="2" y="15" width="24" height="3" rx="1"/><rect x="2" y="20" width="18" height="3" rx="1"/>` },
  thumbnail: { label: "썸네일", width: 495, count: 4, icon: `<rect x="2" y="3" width="9" height="7" rx="1.5"/><rect x="13" y="4" width="13" height="2.5" rx="1"/><rect x="13" y="8" width="9" height="2" rx="1"/><rect x="2" y="13" width="9" height="7" rx="1.5"/><rect x="13" y="14" width="13" height="2.5" rx="1"/><rect x="13" y="18" width="9" height="2" rx="1"/>` },
  grid: { label: "미리보기", width: 640, count: 2, icon: `<rect x="2" y="3" width="11" height="19" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="3.5" y="4.5" width="8" height="6" rx="1"/><rect x="15" y="3" width="11" height="19" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="16.5" y="4.5" width="8" height="6" rx="1"/>` },
  featured: { label: "대표 글", width: 495, count: 1, icon: `<rect x="2" y="3" width="24" height="11" rx="2"/><rect x="2" y="16" width="20" height="3" rx="1"/><rect x="2" y="21" width="14" height="2" rx="1"/>` },
  compact: { label: "한 줄 배지", width: 495, count: 0, icon: `<circle cx="6" cy="9" r="3.5"/><rect x="12" y="6.5" width="14" height="2.5" rx="1"/><rect x="12" y="10.5" width="9" height="2" rx="1"/><rect x="2" y="17" width="24" height="3.5" rx="1"/>` },
};

const THEMES = {
  light: { bg: "#ffffff", accent: "#12b886", title: "#212529", text: "#495057", muted: "#868e96", border: "#e9ecef", surface: "#f8f9fa", chipBg: "#f1f3f5", chipText: "#0ca678" },
  dark: { bg: "#121212", accent: "#63e6be", title: "#ececec", text: "#d9d9d9", muted: "#acacac", border: "#2a2a2a", surface: "#1e1e1e", chipBg: "#252525", chipText: "#96f2d7" },
  velog: { bg: "#20c997", accent: "#ffffff", title: "#ffffff", text: "#f8f9fa", muted: "#e6fcf5", border: "#12b886", surface: "#12b886", chipBg: "#0ca678", chipText: "#ffffff" },
  github: { bg: "#ffffff", accent: "#0969da", title: "#1f2328", text: "#424a53", muted: "#656d76", border: "#d0d7de", surface: "#f6f8fa", chipBg: "#ddf4ff", chipText: "#0969da" },
  github_dark: { bg: "#0d1117", accent: "#58a6ff", title: "#e6edf3", text: "#c9d1d9", muted: "#8b949e", border: "#30363d", surface: "#161b22", chipBg: "#1f2937", chipText: "#79c0ff" },
  dracula: { bg: "#282a36", accent: "#50fa7b", title: "#f8f8f2", text: "#f8f8f2", muted: "#6272a4", border: "#44475a", surface: "#343746", chipBg: "#44475a", chipText: "#8be9fd" },
  nord: { bg: "#2e3440", accent: "#88c0d0", title: "#eceff4", text: "#d8dee9", muted: "#81a1c1", border: "#434c5e", surface: "#3b4252", chipBg: "#3b4252", chipText: "#8fbcbb" },
  tokyonight: { bg: "#1a1b27", accent: "#7aa2f7", title: "#c0caf5", text: "#a9b1d6", muted: "#565f89", border: "#2f334d", surface: "#24283b", chipBg: "#24283b", chipText: "#bb9af7" },
  gruvbox: { bg: "#282828", accent: "#fe8019", title: "#fabd2f", text: "#ebdbb2", muted: "#a89984", border: "#3c3836", surface: "#32302f", chipBg: "#3c3836", chipText: "#b8bb26" },
  monokai: { bg: "#272822", accent: "#f92672", title: "#f8f8f2", text: "#e6db74", muted: "#75715e", border: "#3e3d32", surface: "#33342c", chipBg: "#3e3d32", chipText: "#a6e22e" },
  radical: { bg: "#141321", accent: "#f8d847", title: "#fe428e", text: "#a9fef7", muted: "#7f7a9c", border: "#2a2745", surface: "#1d1b30", chipBg: "#2a2745", chipText: "#fe428e" },
  solarized_light: { bg: "#fdf6e3", accent: "#268bd2", title: "#073642", text: "#586e75", muted: "#93a1a1", border: "#e4dcc3", surface: "#eee8d5", chipBg: "#eee8d5", chipText: "#2aa198" },
  solarized_dark: { bg: "#002b36", accent: "#2aa198", title: "#eee8d5", text: "#93a1a1", muted: "#657b83", border: "#0a4250", surface: "#073642", chipBg: "#073642", chipText: "#b58900" },
  catppuccin: { bg: "#1e1e2e", accent: "#cba6f7", title: "#cdd6f4", text: "#bac2de", muted: "#7f849c", border: "#45475a", surface: "#313244", chipBg: "#313244", chipText: "#f5c2e7" },
  rose_pine: { bg: "#191724", accent: "#ebbcba", title: "#e0def4", text: "#e0def4", muted: "#6e6a86", border: "#26233a", surface: "#1f1d2e", chipBg: "#26233a", chipText: "#c4a7e7" },
  catppuccin_latte: { bg: "#eff1f5", accent: "#8839ef", title: "#4c4f69", text: "#5c5f77", muted: "#8c8fa1", border: "#ccd0da", surface: "#e6e9ef", chipBg: "#dce0e8", chipText: "#8839ef" },
  rose_pine_dawn: { bg: "#faf4ed", accent: "#d7827e", title: "#575279", text: "#797593", muted: "#9893a5", border: "#f2e9e1", surface: "#fffaf3", chipBg: "#f2e9e1", chipText: "#907aa9" },
  gruvbox_light: { bg: "#fbf1c7", accent: "#d65d0e", title: "#3c3836", text: "#504945", muted: "#7c6f64", border: "#ebdbb2", surface: "#f2e5bc", chipBg: "#ebdbb2", chipText: "#af3a03" },
  notion: { bg: "#ffffff", accent: "#eb5757", title: "#37352f", text: "#5a5751", muted: "#9b9a97", border: "#e9e9e7", surface: "#f7f6f3", chipBg: "#f1f1ef", chipText: "#37352f" },
  mint: { bg: "#f2fbf8", accent: "#12b886", title: "#087f5b", text: "#0ca678", muted: "#38a88b", border: "#c3fae8", surface: "#ffffff", chipBg: "#e6fcf5", chipText: "#087f5b" },
  lavender: { bg: "#f8f5ff", accent: "#7950f2", title: "#3b2868", text: "#5f3dc4", muted: "#845ef7", border: "#e5dbff", surface: "#ffffff", chipBg: "#f3f0ff", chipText: "#6741d9" },
  one_dark: { bg: "#282c34", accent: "#61afef", title: "#abb2bf", text: "#9da5b4", muted: "#6b7280", border: "#3e4451", surface: "#21252b", chipBg: "#323842", chipText: "#98c379" },
  nightowl: { bg: "#011627", accent: "#82aaff", title: "#d6deeb", text: "#b2ccd6", muted: "#637777", border: "#1d3b53", surface: "#0b253a", chipBg: "#122d42", chipText: "#7fdbca" },
  synthwave: { bg: "#2b213a", accent: "#36f9f6", title: "#ff7edb", text: "#f4eee4", muted: "#848bbd", border: "#49375f", surface: "#34294f", chipBg: "#49375f", chipText: "#fede5d" },
  cobalt2: { bg: "#193549", accent: "#ffc600", title: "#ffffff", text: "#e1efff", muted: "#7c9db5", border: "#234e6d", surface: "#122738", chipBg: "#234e6d", chipText: "#80ffbb" },
  ayu_dark: { bg: "#0b0e14", accent: "#e6b450", title: "#bfbdb6", text: "#acb6bf", muted: "#6c7380", border: "#1c2431", surface: "#11151c", chipBg: "#171c26", chipText: "#59c2ff" },
  kanagawa: { bg: "#1f1f28", accent: "#7e9cd8", title: "#dcd7ba", text: "#c8c093", muted: "#727169", border: "#363646", surface: "#2a2a37", chipBg: "#2a2a37", chipText: "#98bb6c" },
  everforest: { bg: "#2d353b", accent: "#a7c080", title: "#d3c6aa", text: "#b9c0ab", muted: "#859289", border: "#475258", surface: "#343f44", chipBg: "#3d484d", chipText: "#83c092" },
  cyberpunk: { bg: "#0b0c10", accent: "#ff2a6d", title: "#66fcf1", text: "#c5c6c7", muted: "#7b848b", border: "#1f2833", surface: "#14161f", chipBg: "#1f2833", chipText: "#66fcf1" },
  sunset: { bg: ["#ff6b6b", "#845ef7"], angle: 135, accent: "#ffffff", title: "#ffffff", text: "#fff5f5", muted: "#ffe3e3", border: "#ffffff00", surface: "#ffffff22", chipBg: "#ffffff33", chipText: "#ffffff" },
  ocean: { bg: ["#1098ad", "#3b5bdb"], angle: 135, accent: "#ffffff", title: "#ffffff", text: "#e3fafc", muted: "#c5f6fa", border: "#ffffff00", surface: "#ffffff22", chipBg: "#ffffff33", chipText: "#ffffff" },
  aurora: { bg: ["#0b7285", "#20c997", "#94d82d"], angle: 120, accent: "#ffffff", title: "#ffffff", text: "#f8f9fa", muted: "#e6fcf5", border: "#ffffff00", surface: "#00000022", chipBg: "#00000026", chipText: "#ffffff" },
  peach: { bg: ["#ff9a9e", "#fecfef"], angle: 135, accent: "#c9184a", title: "#4a1942", text: "#5e2554", muted: "#7a3b6e", border: "#ffffff66", surface: "#ffffff55", chipBg: "#ffffff77", chipText: "#800f2f" },
  midnight: { bg: ["#0f2027", "#203a43", "#2c5364"], angle: 135, accent: "#38d9a9", title: "#ffffff", text: "#dee2e6", muted: "#adb5bd", border: "#ffffff22", surface: "#ffffff14", chipBg: "#ffffff1f", chipText: "#63e6be" },
  emerald: { bg: ["#087f5b", "#12b886", "#20c997"], angle: 135, accent: "#ffffff", title: "#ffffff", text: "#e6fcf5", muted: "#c3fae8", border: "#ffffff22", surface: "#00000022", chipBg: "#00000026", chipText: "#ffffff" },
  crimson: { bg: ["#5c0011", "#a61e4d", "#d6336c"], angle: 135, accent: "#fcc419", title: "#ffffff", text: "#fff0f6", muted: "#ffdeeb", border: "#ffffff22", surface: "#00000026", chipBg: "#0000002e", chipText: "#ffdeeb" },
  transparent: { bg: "#00000000", accent: "#20c997", title: "#2f80ed", text: "#6e7681", muted: "#8b949e", border: "#8b949e33", surface: "#8b949e1a", chipBg: "#8b949e26", chipText: "#20c997" },
};

const OVERRIDE_FIELDS = [
  { param: "title_color", key: "title", label: "제목 색" },
  { param: "text_color", key: "text", label: "본문 색" },
  { param: "muted_color", key: "muted", label: "보조 색" },
  { param: "accent_color", key: "accent", label: "포인트 색" },
  { param: "surface_color", key: "surface", label: "카드 배경" },
  { param: "border_color", key: "border", label: "테두리 색" },
  { param: "chip_color", key: "chipBg", label: "태그 배경" },
  { param: "chip_text_color", key: "chipText", label: "태그 글자" },
];

const state = {
  name: "velopert",
  layout: "list",
  theme: "light",
  themePage: 0,
  count: 5,
  width: 495,
  columns: 2,
  index: 0,
  thumbRatio: "0.52",
  radius: 10,
  tag: "",
  tags: null,
  allTags: [],
  title: "",
  bgMode: "theme",
  bgSolid: "ffffff",
  gradAngle: 135,
  grad1: "ff6b6b",
  grad2: "845ef7",
  grad3: "",
  colors: {},
  flags: {},
  codeTab: "markdown",
  stageBg: "light",
};

const STORAGE_KEY = "velo_card_state_v1";
const $ = (id) => document.getElementById(id);
const HEX = /^([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;
const isLocal = ["localhost", "127.0.0.1", "::1"].includes(location.hostname);

function saveState() {
  try {
    const { allTags, ...saved } = state;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  } catch {}
}

function restoreState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return;
    if (typeof parsed.name === "string" && parsed.name.trim()) state.name = parsed.name.trim().replace(/^@/, "");
    if (LAYOUTS[parsed.layout]) state.layout = parsed.layout;
    if (THEMES[parsed.theme]) {
      state.theme = parsed.theme;
      const idx = Object.keys(THEMES).indexOf(parsed.theme);
      state.themePage = typeof parsed.themePage === "number" ? parsed.themePage : Math.floor(idx / 16);
    }
    if (parsed.count !== undefined) state.count = Number(parsed.count);
    if (parsed.width !== undefined) state.width = Number(parsed.width);
    if (parsed.columns !== undefined) state.columns = Number(parsed.columns);
    if (parsed.index !== undefined) state.index = Number(parsed.index);
    if (typeof parsed.thumbRatio === "string") state.thumbRatio = parsed.thumbRatio;
    if (parsed.radius !== undefined) state.radius = Number(parsed.radius);
    if (typeof parsed.tag === "string") state.tag = parsed.tag;
    if (Array.isArray(parsed.tags) || parsed.tags === null) state.tags = parsed.tags;
    if (typeof parsed.title === "string") state.title = parsed.title;
    if (["theme", "solid", "gradient", "transparent"].includes(parsed.bgMode)) state.bgMode = parsed.bgMode;
    if (typeof parsed.bgSolid === "string") state.bgSolid = parsed.bgSolid;
    if (parsed.gradAngle !== undefined) state.gradAngle = Number(parsed.gradAngle);
    if (typeof parsed.grad1 === "string") state.grad1 = parsed.grad1;
    if (typeof parsed.grad2 === "string") state.grad2 = parsed.grad2;
    if (typeof parsed.grad3 === "string") state.grad3 = parsed.grad3;
    if (parsed.colors && typeof parsed.colors === "object") state.colors = parsed.colors;
    if (parsed.flags && typeof parsed.flags === "object") state.flags = parsed.flags;
    if (["markdown", "html", "url", "auto"].includes(parsed.codeTab)) state.codeTab = parsed.codeTab;
    if (["light", "dark", "checker"].includes(parsed.stageBg)) state.stageBg = parsed.stageBg;
  } catch {}
}

function syncControlsFromState() {
  $("username").value = state.name;
  $("count").value = state.count;
  $("width").value = state.width;
  $("columns").value = state.columns;
  $("index").value = state.index;
  $("radius").value = state.radius;
  $("thumbRatio").value = state.thumbRatio;
  $("tag").value = state.tag;
  $("title").value = state.title;
  $("bgSolidHex").value = state.bgSolid;
  if (HEX.test(state.bgSolid)) $("bgSolidPicker").value = "#" + state.bgSolid.slice(0, 6);
  $("gradAngle").value = state.gradAngle;
  $("grad1Hex").value = state.grad1;
  if (HEX.test(state.grad1)) $("grad1Picker").value = "#" + state.grad1.slice(0, 6);
  $("grad2Hex").value = state.grad2;
  if (HEX.test(state.grad2)) $("grad2Picker").value = "#" + state.grad2.slice(0, 6);
  $("grad3Hex").value = state.grad3;
  if (HEX.test(state.grad3)) $("grad3Picker").value = "#" + state.grad3.slice(0, 6);
  document.querySelectorAll("[data-flag]").forEach((cb) => {
    cb.checked = Boolean(state.flags[cb.dataset.flag]);
  });
  [...$("bgModeSeg").children].forEach((b) => b.classList.toggle("active", b.dataset.mode === state.bgMode));
  [...$("codeTabSeg").children].forEach((b) => b.classList.toggle("active", b.dataset.tab === state.codeTab));
  [...$("stageBgSeg").children].forEach((b) => b.classList.toggle("active", b.dataset.bg === state.stageBg));
  $("stage").className = `stage bg-${state.stageBg}` + ($("stage").classList.contains("loading") ? " loading" : "");
}

function showToast(msg) {
  const el = $("toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(showToast.t);
  showToast.t = setTimeout(() => el.classList.remove("show"), 1800);
}

function renderLayoutButtons() {
  $("layoutGrid").innerHTML = Object.entries(LAYOUTS)
    .map(([k, v]) => `
      <button type="button" class="layout-btn${state.layout === k ? " active" : ""}" data-layout="${k}">
        <svg width="24" height="22" viewBox="0 0 28 26" fill="currentColor">${v.icon}</svg>
        <span>${v.label}</span>
      </button>`)
    .join("");
}

function renderThemeButtons() {
  const entries = Object.entries(THEMES);
  const perPage = 16;
  const totalPages = Math.ceil(entries.length / perPage);
  state.themePage = Math.max(0, Math.min(state.themePage, totalPages - 1));
  const slice = entries.slice(state.themePage * perPage, (state.themePage + 1) * perPage);
  $("themePageInfo").textContent = `${state.themePage + 1} / ${totalPages}`;
  $("themePrevBtn").disabled = state.themePage === 0;
  $("themeNextBtn").disabled = state.themePage >= totalPages - 1;
  $("themeGrid").innerHTML = slice
    .map(([k, v]) => {
      const bg = Array.isArray(v.bg)
        ? `linear-gradient(${v.angle}deg, ${v.bg.join(",")})`
        : v.bg === "#00000000"
        ? "repeating-conic-gradient(#ddd 0% 25%, #fff 0% 50%) 50%/8px 8px"
        : v.bg;
      return `
        <button type="button" class="theme-btn${state.theme === k ? " active" : ""}" data-theme="${k}" title="${k}">
          <span class="swatch" style="background:${bg}"><span class="swatch-dot" style="background:${v.accent}"></span></span>
          <span class="t-name">${k}</span>
        </button>`;
    })
    .join("");
}

function syncOverrideInputs() {
  const t = THEMES[state.theme] || THEMES.light;
  const box = $("colorOverrides");
  box.innerHTML = OVERRIDE_FIELDS.map((f) => {
    const val = state.colors[f.param] || "";
    const baseHex = t[f.key].slice(0, 7);
    const pickerVal = HEX.test(val) ? "#" + val.slice(0, 6) : baseHex;
    return `
      <div class="color-item">
        <label>${f.label}<button type="button" class="color-clear${val ? "" : " hidden"}" data-clear="${f.param}">초기화</button></label>
        <div class="color-input">
          <input type="color" data-cp="${f.param}" value="${pickerVal}" />
          <input type="text" data-ct="${f.param}" value="${val}" placeholder="${t[f.key].slice(1)}" />
        </div>
      </div>`;
  }).join("");
}

function getDisabledFlags() {
  const l = state.layout;
  const cnt = Number(state.count);
  const hp = Boolean(state.flags.hide_profile) && !(l === "compact" && cnt === 0);
  const hs = Boolean(state.flags.hide_stats);
  const hasStatsRow = l === "list" || l === "thumbnail" || l === "compact";
  const off = new Set();
  if (l === "compact" && cnt === 0) off.add("hide_profile");
  if (hp && l !== "grid") off.add("hide_avatar");
  if (hp || !hasStatsRow) {
    off.add("hide_bio");
    off.add("hide_stats");
  }
  if (hp || (hasStatsRow && hs)) off.add("hide_follow");
  if (
    l === "grid" ||
    (l === "compact" && hp) ||
    (l === "thumbnail" && hp && !state.flags.hide_description)
  ) {
    off.add("hide_tags");
  }
  if (l === "list" || l === "compact") off.add("hide_description");
  return off;
}

function updateVisibility() {
  const l = state.layout;
  $("count").min = l === "compact" ? "0" : "1";
  if (l !== "compact" && l !== "featured" && Number(state.count) < 1) {
    state.count = 1;
    $("count").value = 1;
  }
  const cnt = Number(state.count);
  const noPosts = l === "compact" && cnt === 0;
  $("countWrap").classList.toggle("hidden", l === "featured");
  $("columnsWrap").classList.toggle("hidden", l !== "grid" || cnt <= 1);
  if (l === "grid" && cnt > 1) {
    $("columns").max = String(Math.min(4, cnt));
    if (Number(state.columns) > Math.min(4, cnt)) {
      state.columns = Math.min(4, cnt);
      $("columns").value = state.columns;
    }
  }
  $("ratioWrap").classList.toggle("hidden", l !== "grid" && l !== "featured");
  $("indexWrap").classList.toggle("hidden", noPosts);
  $("tag").disabled = noPosts;
  $("tag").placeholder = noPosts ? "게시글 수 1 이상에서 사용" : "특정 태그만 (예: React)";
  $("bgSolidBox").classList.toggle("hidden", state.bgMode !== "solid");
  $("bgGradBox").classList.toggle("hidden", state.bgMode !== "gradient");
  const titleOff = l === "grid" || noPosts;
  $("title").disabled = titleOff;
  $("titleLabel").textContent = l === "featured" || l === "compact" ? "배지 문구" : "목록 제목";
  $("title").placeholder = titleOff
    ? "이 레이아웃에선 미사용"
    : l === "featured" || l === "compact"
    ? "기본: 최신 글"
    : "기본: 최근 게시글";
  $("countVal").textContent = state.count;
  $("widthVal").textContent = state.width;
  $("columnsVal").textContent = state.columns;
  $("indexVal").textContent = state.index;
  $("radiusVal").textContent = state.radius;
  $("gradAngleVal").textContent = state.gradAngle;

  const offFlags = getDisabledFlags();
  let activeFlags = 0;
  document.querySelectorAll("[data-flag]").forEach((cb) => {
    const disabled = offFlags.has(cb.dataset.flag);
    cb.disabled = disabled;
    cb.closest(".toggle").classList.toggle("disabled", disabled);
    if (!disabled && cb.checked) activeFlags++;
  });
  $("activeFlagCount").textContent = activeFlags ? `${activeFlags}개 적용됨` : "";

  const hp = Boolean(state.flags.hide_profile) && !noPosts;
  const tagsDisabled = l === "grid" || l === "featured" || hp || Boolean(state.flags.hide_tags);
  $("tagPanel").classList.toggle("muted", tagsDisabled);
  $("tagPanelHint").textContent =
    l === "grid" || l === "featured"
      ? "목록·썸네일·한 줄 배지에서만 표시"
      : hp
      ? "프로필 숨김이 켜져 있음"
      : state.flags.hide_tags
      ? "태그 숨김이 켜져 있음"
      : "클릭해서 추가 / 제외";
}

function renderProfileTags() {
  const box = $("profileTagChips");
  if (!state.allTags.length) {
    box.innerHTML = '<span class="section-sub">표시할 태그가 없습니다.</span>';
    return;
  }
  const activeSet = new Set(
    state.tags !== null ? state.tags : state.allTags.slice(0, 6).map((t) => t.name),
  );
  box.innerHTML = state.allTags
    .slice(0, 18)
    .map(
      (t) =>
        `<button type="button" class="tag-chip${activeSet.has(t.name) ? " active" : ""}" data-ptag="${t.name.replace(/"/g, "&quot;")}">#${t.name.replace(/</g, "&lt;")}<span class="cnt">${t.count}</span></button>`,
    )
    .join("");
}

async function loadUserTags(username) {
  const clean = (username || "velopert").trim().replace(/^@/, "") || "velopert";
  try {
    const res = await fetch(`${location.origin}/api?name=${encodeURIComponent(clean)}&meta=tags`);
    if (!res.ok) return;
    const json = await res.json();
    state.allTags = json.tags || [];
    renderProfileTags();
  } catch {}
}

function buildQuery(extra = {}) {
  const p = new URLSearchParams();
  const cleanName = (state.name || "velopert").trim().replace(/^@/, "") || "velopert";
  p.set("name", cleanName);

  const layoutDef = LAYOUTS[state.layout];
  if (state.layout !== "list") p.set("layout", state.layout);

  const theme = extra.theme || state.theme;
  if (theme !== "light") p.set("theme", theme);

  if (state.layout !== "featured" && Number(state.count) !== layoutDef.count) {
    p.set("count", state.count);
  }
  if (Number(state.width) !== layoutDef.width) p.set("width", state.width);
  if (state.layout === "grid" && Number(state.count) > 1 && Number(state.columns) !== Math.min(2, Math.max(Number(state.count), 1))) {
    p.set("columns", state.columns);
  }
  const noPosts = state.layout === "compact" && Number(state.count) === 0;
  if (!noPosts && Number(state.index) !== 0) p.set("index", state.index);
  if ((state.layout === "grid" || state.layout === "featured") && state.thumbRatio !== "0.52") {
    p.set("thumb_ratio", state.thumbRatio);
  }
  if (Number(state.radius) !== 10) p.set("border_radius", state.radius);
  if (!noPosts && state.tag.trim()) p.set("tag", state.tag.trim());
  const hp = Boolean(state.flags.hide_profile) && !noPosts;
  const tagsDisabled = state.layout === "grid" || state.layout === "featured" || hp || Boolean(state.flags.hide_tags);
  if (state.tags !== null && !tagsDisabled) {
    const def = state.allTags.slice(0, 6).map((t) => t.name);
    const sameAsDefault = state.tags.length === def.length && state.tags.every((v, i) => v === def[i]);
    if (!sameAsDefault) p.set("tags", state.tags.join(","));
  }
  const titleOff = state.layout === "grid" || noPosts;
  if (!titleOff && state.title.trim()) p.set("title", state.title.trim());

  if (state.bgMode === "solid" && HEX.test(state.bgSolid)) {
    p.set("bg_color", state.bgSolid.toLowerCase());
  } else if (state.bgMode === "gradient" && HEX.test(state.grad1) && HEX.test(state.grad2)) {
    const stops = [state.gradAngle, state.grad1, state.grad2];
    if (HEX.test(state.grad3)) stops.push(state.grad3);
    p.set("bg_color", stops.join(",").toLowerCase());
  } else if (state.bgMode === "transparent" && state.theme !== "transparent") {
    p.set("bg_color", "00000000");
  }

  for (const [k, v] of Object.entries(state.colors)) {
    if (HEX.test(v)) p.set(k, v.toLowerCase());
  }
  const offFlags = getDisabledFlags();
  for (const [k, v] of Object.entries(state.flags)) {
    if (v && !offFlags.has(k)) p.set(k, "true");
  }
  return p.toString();
}

function renderCode() {
  const origin = location.origin;
  const qs = buildQuery();
  const cleanName = (state.name || "velopert").trim().replace(/^@/, "") || "velopert";
  const imgUrl = `${origin}/api?${qs}`;
  const profileUrl = `https://velog.io/@${encodeURIComponent(cleanName)}`;

  $("openTabBtn").href = imgUrl;

  let out = "";
  if (state.codeTab === "markdown") {
    out = `[![velog](${imgUrl})](${profileUrl})`;
  } else if (state.codeTab === "html") {
    out = `<a href="${profileUrl}">\n  <img src="${imgUrl}" alt="${cleanName} velog" />\n</a>`;
  } else if (state.codeTab === "url") {
    out = imgUrl;
  } else {
    const darkUrl = `${origin}/api?${buildQuery({ theme: "github_dark" })}`;
    const lightUrl = `${origin}/api?${buildQuery({ theme: "github" })}`;
    out = `<a href="${profileUrl}">\n  <picture>\n    <source media="(prefers-color-scheme: dark)" srcset="${darkUrl}" />\n    <img src="${lightUrl}" alt="${cleanName} velog" />\n  </picture>\n</a>`;
  }
  $("codeOutput").textContent = out;
}

let loadTimer;
let lastPreviewUrl = "";
function refreshPreview(immediate = false, force = false) {
  updateVisibility();
  renderCode();
  saveState();
  const qs = buildQuery();
  const bust = isLocal || force ? `&_=${Date.now()}` : "";
  const localUrl = `${location.origin}/api?${qs}${bust}`;
  clearTimeout(loadTimer);
  const run = () => {
    if (!force && qs === lastPreviewUrl) return;
    lastPreviewUrl = qs;
    $("stage").classList.add("loading");
    $("previewImg").src = localUrl;
  };
  if (immediate) run();
  else loadTimer = setTimeout(run, 400);
}

$("previewImg").addEventListener("load", () => $("stage").classList.remove("loading"));
$("previewImg").addEventListener("error", () => $("stage").classList.remove("loading"));

$("layoutGrid").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-layout]");
  if (!btn) return;
  const next = btn.dataset.layout;
  state.layout = next;
  state.width = LAYOUTS[next].width;
  state.count = LAYOUTS[next].count;
  if (next === "grid") state.columns = Math.min(2, state.count);
  $("width").value = state.width;
  $("count").value = state.count;
  $("columns").value = state.columns;
  renderLayoutButtons();
  refreshPreview(true);
});

$("themeGrid").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-theme]");
  if (!btn) return;
  state.theme = btn.dataset.theme;
  renderThemeButtons();
  syncOverrideInputs();
  refreshPreview(true);
});

$("themePrevBtn").addEventListener("click", () => {
  if (state.themePage > 0) {
    state.themePage--;
    renderThemeButtons();
  }
});

$("themeNextBtn").addEventListener("click", () => {
  state.themePage++;
  renderThemeButtons();
});

$("bgModeSeg").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-mode]");
  if (!btn) return;
  state.bgMode = btn.dataset.mode;
  [...$("bgModeSeg").children].forEach((b) => b.classList.toggle("active", b === btn));
  refreshPreview(true);
});

$("stageBgSeg").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-bg]");
  if (!btn) return;
  state.stageBg = btn.dataset.bg;
  [...$("stageBgSeg").children].forEach((b) => b.classList.toggle("active", b === btn));
  $("stage").className = `stage bg-${state.stageBg}` + ($("stage").classList.contains("loading") ? " loading" : "");
  saveState();
});

$("codeTabSeg").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-tab]");
  if (!btn) return;
  state.codeTab = btn.dataset.tab;
  [...$("codeTabSeg").children].forEach((b) => b.classList.toggle("active", b === btn));
  renderCode();
  saveState();
});

$("colorOverrides").addEventListener("input", (e) => {
  const cp = e.target.dataset.cp;
  const ct = e.target.dataset.ct;
  if (cp) {
    const hex = e.target.value.slice(1);
    state.colors[cp] = hex;
    const txt = $("colorOverrides").querySelector(`[data-ct="${cp}"]`);
    if (txt) txt.value = hex;
    const clr = $("colorOverrides").querySelector(`[data-clear="${cp}"]`);
    if (clr) clr.classList.remove("hidden");
    renderCode();
  } else if (ct) {
    const clean = e.target.value.trim().replace(/^#/, "");
    if (clean === "") delete state.colors[ct];
    else state.colors[ct] = clean;
    const pic = $("colorOverrides").querySelector(`[data-cp="${ct}"]`);
    if (pic && HEX.test(clean)) pic.value = "#" + clean.slice(0, 6);
    const clr = $("colorOverrides").querySelector(`[data-clear="${ct}"]`);
    if (clr) clr.classList.toggle("hidden", !clean);
    refreshPreview();
  }
});
$("colorOverrides").addEventListener("change", (e) => {
  if (e.target.dataset.cp) refreshPreview(true);
});

$("colorOverrides").addEventListener("click", (e) => {
  const key = e.target.dataset.clear;
  if (!key) return;
  delete state.colors[key];
  syncOverrideInputs();
  refreshPreview(true);
});

function bindHexPair(pickerId, textId, stateKey) {
  $(pickerId).addEventListener("input", (e) => {
    const hex = e.target.value.slice(1);
    state[stateKey] = hex;
    $(textId).value = hex;
    renderCode();
  });
  $(pickerId).addEventListener("change", () => refreshPreview(true));
  $(textId).addEventListener("input", (e) => {
    const clean = e.target.value.trim().replace(/^#/, "");
    state[stateKey] = clean;
    if (HEX.test(clean)) $(pickerId).value = "#" + clean.slice(0, 6);
    refreshPreview();
  });
}
bindHexPair("bgSolidPicker", "bgSolidHex", "bgSolid");
bindHexPair("grad1Picker", "grad1Hex", "grad1");
bindHexPair("grad2Picker", "grad2Hex", "grad2");
bindHexPair("grad3Picker", "grad3Hex", "grad3");

function bindRange(id, stateKey) {
  $(id).addEventListener("input", (e) => {
    state[stateKey] = e.target.value;
    updateVisibility();
    renderCode();
  });
  $(id).addEventListener("change", () => refreshPreview(true));
}
bindRange("gradAngle", "gradAngle");
bindRange("count", "count");
bindRange("width", "width");
bindRange("columns", "columns");
bindRange("index", "index");
bindRange("radius", "radius");

$("thumbRatio").addEventListener("change", (e) => { state.thumbRatio = e.target.value; refreshPreview(true); });

function applyTextInputs(force = false) {
  const rawName = $("username").value.trim().replace(/^@/, "");
  if (!rawName) {
    showToast("velog 아이디를 입력해 주세요");
    $("username").focus();
    return;
  }
  const changedUser = rawName !== state.name;
  state.name = rawName;
  state.tag = $("tag").value.trim();
  state.title = $("title").value.trim();
  if (changedUser) {
    state.tags = null;
    loadUserTags(rawName);
  }
  refreshPreview(true, force);
}

$("profileTagChips").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-ptag]");
  if (!btn) return;
  const tag = btn.dataset.ptag;
  const cur = state.tags !== null ? [...state.tags] : state.allTags.slice(0, 6).map((t) => t.name);
  const idx = cur.indexOf(tag);
  if (idx >= 0) cur.splice(idx, 1);
  else cur.push(tag);
  state.tags = cur;
  renderProfileTags();
  refreshPreview(true);
});

$("tagsDefaultBtn").addEventListener("click", () => {
  state.tags = null;
  renderProfileTags();
  refreshPreview(true);
});

$("tagsClearBtn").addEventListener("click", () => {
  state.tags = [];
  renderProfileTags();
  refreshPreview(true);
});

["username", "tag", "title"].forEach((id) => {
  $(id).addEventListener("keydown", (e) => {
    if (e.key === "Enter") applyTextInputs(true);
  });
});
$("applyBtn").addEventListener("click", () => applyTextInputs(true));

document.querySelectorAll("[data-flag]").forEach((cb) => {
  cb.addEventListener("change", (e) => {
    state.flags[e.target.dataset.flag] = e.target.checked;
    refreshPreview(true);
  });
});

async function copyText(text, msg) {
  try {
    await navigator.clipboard.writeText(text);
    showToast(msg);
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
    showToast(msg);
  }
}

$("copyCodeBtn").addEventListener("click", () => copyText($("codeOutput").textContent, "코드가 복사되었습니다"));

$("resetBtn").addEventListener("click", () => {
  try { localStorage.removeItem(STORAGE_KEY); } catch {}
  Object.assign(state, {
    name: "velopert", layout: "list", theme: "light", themePage: 0, count: 5, width: 495, columns: 2,
    index: 0, thumbRatio: "0.52", radius: 10, tag: "", tags: null, title: "", bgMode: "theme",
    bgSolid: "ffffff", gradAngle: 135, grad1: "ff6b6b", grad2: "845ef7", grad3: "",
    colors: {}, flags: {}, codeTab: "markdown", stageBg: "light",
  });
  syncControlsFromState();
  renderLayoutButtons();
  renderThemeButtons();
  syncOverrideInputs();
  loadUserTags("velopert");
  refreshPreview(true);
  showToast("설정이 초기화되었습니다");
});

restoreState();
syncControlsFromState();
renderLayoutButtons();
renderThemeButtons();
syncOverrideInputs();
loadUserTags(state.name);
refreshPreview(true);
