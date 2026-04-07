// ============================================================
// Penpaly — 主应用逻辑
// ============================================================

// ── State ──────────────────────────────────────────────────
let currentType = null;
let currentSectionId = null;
let seconds = 0;
let timerOn = false;
let timerInterval = null;

// ── Boot ───────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  buildHomeCards();
  document.getElementById("essay").addEventListener("input", () => {
    updateWordCount();
    if (!timerOn) startTimer();
  });
});

// ── Home ───────────────────────────────────────────────────
function buildHomeCards() {
  const grid = document.getElementById("cardGrid");
  grid.innerHTML = "";
  Object.entries(TEMPLATES).forEach(([key, t]) => {
    const card = document.createElement("div");
    card.className = "template-card";
    card.innerHTML = `
      <div class="card-label">邮件模板</div>
      <div class="card-title">${t.label}</div>
      <div class="card-desc">${t.desc}</div>
    `;
    card.addEventListener("click", () => openEditor(key));
    grid.appendChild(card);
  });
}

// ── Editor ─────────────────────────────────────────────────
function openEditor(type) {
  currentType = type;
  const t = TEMPLATES[type];

  document.getElementById("sidebarType").textContent = t.label;
  document.getElementById("scenarioHint").textContent = "场景：" + t.scenario.slice(0, 20) + "…";

  buildSidebarNav(t);
  showSection(t.sections[0].id);
  showPage("editorPage");
}

function buildSidebarNav(t) {
  const nav = document.getElementById("sidebarNav");
  nav.innerHTML = "";
  t.sections.forEach((s, i) => {
    const el = document.createElement("div");
    el.className = "nav-item" + (i === 0 ? " active" : "");
    el.dataset.sectionId = s.id;
    el.innerHTML = `<span class="nav-dot"></span>${s.title}`;
    el.addEventListener("click", () => showSection(s.id));
    nav.appendChild(el);
  });
}

function showSection(id) {
  currentSectionId = id;
  const t = TEMPLATES[currentType];
  const sec = t.sections.find(s => s.id === id);
  if (!sec) return;

  // Update nav highlight
  document.querySelectorAll(".nav-item").forEach(el => {
    el.classList.toggle("active", el.dataset.sectionId === id);
  });

  // Render template reference panel
  const ref = document.getElementById("templateRef");
  ref.innerHTML = `
    <div class="scenario-box">
      <strong>场景</strong>${t.scenario}
    </div>
    <div class="ref-section">
      <div class="ref-section-title">${sec.title}</div>
      ${sec.notes.map(n => `<div class="phrase-note">${n}</div>`).join("")}
      <div class="phrases-wrap">
        ${sec.phrases.map(p =>
          `<span class="phrase-chip" data-phrase="${escapeAttr(p)}">${p}</span>`
        ).join("")}
      </div>
    </div>
    <div class="all-sections">
      <div class="ref-section-title">全部结构</div>
      ${t.sections.map(s =>
        `<div class="all-section-item ${s.id === id ? 'current' : ''}" data-section="${s.id}">${s.title}</div>`
      ).join("")}
    </div>
  `;

  // Bind phrase chip clicks
  ref.querySelectorAll(".phrase-chip").forEach(chip => {
    chip.addEventListener("click", () => insertPhrase(chip.dataset.phrase));
  });

  // Bind all-section nav clicks
  ref.querySelectorAll(".all-section-item").forEach(el => {
    el.addEventListener("click", () => showSection(el.dataset.section));
  });
}

// ── Writing helpers ─────────────────────────────────────────
function insertPhrase(text) {
  const ta = document.getElementById("essay");
  ta.focus();
  const start = ta.selectionStart;
  const end = ta.selectionEnd;
  const before = ta.value.substring(0, start);
  const after = ta.value.substring(end);
  const needsSpace = before.length > 0 && !before.endsWith(" ") && !before.endsWith("\n");
  const insert = (needsSpace ? " " : "") + text;
  ta.value = before + insert + after;
  const cursor = start + insert.length;
  ta.selectionStart = ta.selectionEnd = cursor;
  updateWordCount();
  if (!timerOn) startTimer();
}

function updateWordCount() {
  const txt = document.getElementById("essay").value.trim();
  const count = txt ? txt.split(/\s+/).length : 0;
  document.getElementById("wordStat").textContent = count + " 词";
}

function startTimer() {
  timerOn = true;
  timerInterval = setInterval(() => {
    seconds++;
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    document.getElementById("timeStat").textContent = m + ":" + s;
  }, 1000);
}

function clearAll() {
  document.getElementById("essay").value = "";
  closeResult();
  seconds = 0;
  timerOn = false;
  clearInterval(timerInterval);
  document.getElementById("timeStat").textContent = "00:00";
  updateWordCount();
}

function goHome() {
  clearAll();
  showPage("homePage");
}

// ── AI Grading ─────────────────────────────────────────────
async function gradeEssay() {
  const essay = document.getElementById("essay").value.trim();
  if (essay.length < 20) {
    alert("请先写一些内容再点击批改。");
    return;
  }

  const btn = document.getElementById("gradeBtn");
  btn.disabled = true;
  btn.textContent = "批改中...";

  const panel = document.getElementById("resultPanel");
  const inner = document.getElementById("resultInner");
  panel.className = "result-panel open";
  inner.innerHTML = `
    <div style="display:flex;align-items:center;gap:10px;color:var(--text-secondary);font-size:13px;">
      AI 正在批改
      <div class="loading-dots"><span></span><span></span><span></span></div>
    </div>`;

  const t = TEMPLATES[currentType];
  const prompt = `你是一位专业的托福邮件写作评分老师，请对学生的作文评分并给出改进建议。

邮件类型：${t.label}
场景要求：${t.scenario}

学生作文：
${essay}

请严格按以下JSON格式返回，不要输出任何其他内容，不要加markdown代码块：
{
  "total": 整数(0-30),
  "content": 整数(0-10),
  "language": 整数(0-10),
  "organization": 整数(0-10),
  "strengths": ["优点1（一句话）", "优点2（一句话）"],
  "improvements": ["改进建议1（具体）", "改进建议2（具体）", "改进建议3（具体）"],
  "example": "原句（学生写的有问题的一句话） → 改句（你的改写版本）"
}`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }]
      })
    });

    if (!res.ok) throw new Error("API error " + res.status);

    const data = await res.json();
    const raw = data.content[0].text.replace(/```json|```/g, "").trim();
    const result = JSON.parse(raw);
    renderResult(result);

  } catch (err) {
    inner.innerHTML = `<div class="error-msg">批改失败，请检查网络后重试。<br><small>${err.message}</small></div>`;
  }

  btn.disabled = false;
  btn.textContent = "AI 批改";
}

function renderResult(r) {
  const sc = (n, max) => n / max >= 0.8 ? "good" : n / max >= 0.6 ? "ok" : "bad";
  const inner = document.getElementById("resultInner");
  inner.innerHTML = `
    <div class="score-row">
      <div class="score-card">
        <div class="sc-label">综合评分</div>
        <div class="sc-val ${sc(r.total, 30)}">${r.total}<span class="denom">/30</span></div>
      </div>
      <div class="score-card">
        <div class="sc-label">内容完整</div>
        <div class="sc-val ${sc(r.content, 10)}">${r.content}<span class="denom">/10</span></div>
      </div>
      <div class="score-card">
        <div class="sc-label">语言表达</div>
        <div class="sc-val ${sc(r.language, 10)}">${r.language}<span class="denom">/10</span></div>
      </div>
      <div class="score-card">
        <div class="sc-label">结构组织</div>
        <div class="sc-val ${sc(r.organization, 10)}">${r.organization}<span class="denom">/10</span></div>
      </div>
    </div>
    ${r.strengths.map(s => `<div class="fb-item"><span class="tag s">优点</span>${s}</div>`).join("")}
    ${r.improvements.map(s => `<div class="fb-item"><span class="tag i">改进</span>${s}</div>`).join("")}
    ${r.example ? `<div class="fb-item"><span class="tag e">示例</span>${r.example}</div>` : ""}
  `;
}

function closeResult() {
  document.getElementById("resultPanel").className = "result-panel";
}

// ── Utils ───────────────────────────────────────────────────
function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function escapeAttr(str) {
  return str.replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
