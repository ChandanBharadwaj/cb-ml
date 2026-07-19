/* =============================================================================
   cb-ml · shared behaviour for every page
   - Single source of truth for the site map (nav drawer + landing cards)
   - Nav drawer open/close, active-link highlighting
   - Theme toggle (persisted), copy-code buttons, scroll-spy TOC
   Pure vanilla JS. No build step. Loaded with `defer` on every page.
   ========================================================================== */

/* ---------------------------------------------------------------------------
   SITE MAP — the ONE place to edit when a page is built or added.
   Flip `soon:true` -> remove it when a page goes live; the drawer nav AND the
   landing-page cards both read from this array, so they stay in sync.
   --------------------------------------------------------------------------- */
window.CBML_NAV = [
  {
    part: "Part 1",
    label: "Foundations & Concepts",
    items: [
      { href: "p1-ml-deep-learning.html", title: "ML & Deep Learning",
        desc: "Classical baselines that still win (GBM on tabular) → neurons, backprop, optimizers. Where each sits on the ladder." },
      { href: "p1-transformers-nlp.html", title: "Transformers & NLP",
        desc: "Tokenization, embeddings, RoPE, and self-attention derived step by step — the table-stakes topic." },
      { href: "p1-genai-llm-slm.html", title: "GenAI · LLM · SLM",
        desc: "Autoregressive generation, decoding params, and the LLM-vs-SLM cost/latency trade-off." },
    ],
  },
  {
    part: "Part 2",
    label: "Building with LLMs",
    items: [
      { href: "p2-prompt-engineering.html", title: "Prompt Engineering",
        desc: "Few-shot, CoT/ReAct, structured output, and prompt-injection defence." },
      { href: "p2-rag.html", title: "RAG",
        desc: "Chunking, hybrid search, re-ranking, evaluation, and the real failure modes." },
      { href: "p2-vector-db-embeddings.html", title: "Vector DBs & Embeddings",
        desc: "Similarity metrics, ANN indexes (HNSW/IVF), hybrid + metadata filtering." },
      { href: "p2-agents.html", title: "Agents & Tool Use",
        desc: "ReAct loops, function calling, memory, MCP, and agent evaluation." },
    ],
  },
  {
    part: "Part 3",
    label: "Train · Tune · Optimize · Evaluate",
    items: [
      { href: "p3-fine-tuning.html", title: "Fine-tuning & PEFT",
        desc: "LoRA/QLoRA, RLHF vs DPO, and the decision: fine-tune vs RAG vs prompt." },
      { href: "p3-inference-optimization.html", title: "Inference Optimization",
        desc: "KV cache, quantization, batching, speculative decoding, latency SLAs." },
      { href: "p3-fitting-generalization.html", title: "Fitting & Generalization",
        desc: "Over/underfitting, bias-variance, regularization, double descent, leakage." },
      { href: "p3-metrics-evaluation.html", title: "Metrics & Evaluation",
        desc: "Precision/recall/threshold/calibration + LLM eval and LLM-as-judge." },
    ],
  },
  {
    part: "Part 4",
    label: "Production & Problem-Solving",
    items: [
      { href: "p4-mlops-production.html", title: "MLOps & Production",
        desc: "Drift/monitoring, canary/shadow deploys, guardrails, PII, responsible AI.", soon: true },
      { href: "p4-when-to-use-ml.html", title: "When to Use ML (the Ladder)",
        desc: "The escalation ladder: algorithm → classical ML → DL → LLM, with CPU/GPU & cost.", soon: true },
      { href: "p4-problem-solving.html", title: "Problem → Solution",
        desc: "Case studies mapping a problem to the right ML/GenAI combination.", soon: true },
      { href: "p4-multimodal.html", title: "Multimodal (Overview)",
        desc: "VLMs/CLIP, diffusion, VQA, and multimodal RAG.", soon: true },
    ],
  },
];

(function () {
  "use strict";
  var doc = document;

  /* ---- current page filename (for active-link highlighting) --------------- */
  var current = location.pathname.split("/").pop() || "index.html";

  /* ---- Build the drawer navigation from CBML_NAV -------------------------- */
  function buildDrawerNav() {
    var nav = doc.getElementById("drawerNav");
    if (!nav) return;
    var html = '<a class="navlink' + (current === "index.html" ? " active" : "") +
               '" href="index.html">⌂ &nbsp;Home</a>';
    window.CBML_NAV.forEach(function (group) {
      html += '<div class="navgroup"><div class="navgroup__label">' +
              group.part + " · " + group.label + "</div>";
      group.items.forEach(function (it) {
        var isActive = it.href === current;
        html += '<a class="navlink' + (isActive ? " active" : "") + (it.soon ? " soon" : "") +
                '" href="' + it.href + '">' + it.title +
                (it.soon ? '<span class="tag">soon</span>' : "") + "</a>";
      });
      html += "</div>";
    });
    nav.innerHTML = html;
  }

  /* ---- Build landing-page cards from CBML_NAV (index only) ---------------- */
  function buildCards() {
    window.CBML_NAV.forEach(function (group) {
      var host = doc.querySelector('.cardgrid[data-part="' + group.part + '"]');
      if (!host) return;
      var html = "";
      group.items.forEach(function (it) {
        html += '<a class="card' + (it.soon ? " soon" : "") + '" href="' + it.href + '">' +
                  '<div class="card__part">' + group.part + "</div>" +
                  '<div class="card__title">' + it.title + "</div>" +
                  '<p class="card__desc">' + (it.desc || "") + "</p>" +
                  (it.soon ? '<span class="card__soon">Coming soon</span>' : "") +
                "</a>";
      });
      host.innerHTML = html;
    });
  }

  /* ---- Auto-wire prev/next from the site map (built pages only) ----------
     A page opts in with <nav class="pagenav" id="pageNav"></nav>. We link only
     to NON-soon (built) neighbours, so forward links are never broken; when the
     next page is flipped live, the link appears automatically. */
  function buildPageNav() {
    var host = doc.getElementById("pageNav");
    if (!host) return;
    var flat = [];
    window.CBML_NAV.forEach(function (g) { g.items.forEach(function (it) { flat.push(it); }); });
    var built = flat.filter(function (it) { return !it.soon; });
    var idx = built.findIndex(function (it) { return it.href === current; });
    if (idx === -1) return;                       // current page not in the built list
    var prev = idx > 0 ? built[idx - 1] : { href: "index.html", title: "Home", dir: "← Home" };
    var next = idx < built.length - 1 ? built[idx + 1] : { href: "index.html", title: "All topics", dir: "Home →" };
    host.innerHTML =
      '<a class="prev" href="' + prev.href + '"><div class="dir">' + (prev.dir || "← Previous") +
        '</div><div class="ttl">' + prev.title + "</div></a>" +
      '<a class="next" href="' + next.href + '"><div class="dir">' + (next.dir || "Next →") +
        '</div><div class="ttl">' + next.title + "</div></a>";
  }

  /* ---- Nav drawer open / close ------------------------------------------- */
  function setupDrawer() {
    var drawer = doc.getElementById("drawer");
    var scrim  = doc.getElementById("scrim");
    var openBtn = doc.getElementById("menuBtn");
    if (!drawer || !scrim || !openBtn) return;
    function open()  { drawer.classList.add("open"); scrim.classList.add("show"); openBtn.setAttribute("aria-expanded", "true"); }
    function close() { drawer.classList.remove("open"); scrim.classList.remove("show"); openBtn.setAttribute("aria-expanded", "false"); }
    openBtn.addEventListener("click", open);
    scrim.addEventListener("click", close);
    doc.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
    drawer.addEventListener("click", function (e) { if (e.target.closest("a")) close(); });
  }

  /* ---- Theme toggle (persisted) ------------------------------------------ */
  function setupTheme() {
    var btn = doc.getElementById("themeBtn");
    var root = doc.documentElement;
    function label() {
      if (!btn) return;
      var dark = root.getAttribute("data-theme") !== "light";
      btn.textContent = dark ? "☼" : "☾";       /* sun / moon */
      btn.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
    }
    label();
    if (btn) btn.addEventListener("click", function () {
      var light = root.getAttribute("data-theme") === "light";
      root.setAttribute("data-theme", light ? "dark" : "light");
      try { localStorage.setItem("cbml-theme", light ? "dark" : "light"); } catch (e) {}
      label();
    });
  }

  /* ---- Copy-code buttons -------------------------------------------------- */
  function setupCopy() {
    doc.querySelectorAll(".copybtn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var code = btn.closest(".codewrap").querySelector("code");
        var text = code ? code.innerText : "";
        navigator.clipboard.writeText(text).then(function () {
          var old = btn.textContent;
          btn.textContent = "Copied!"; btn.classList.add("copied");
          setTimeout(function () { btn.textContent = old; btn.classList.remove("copied"); }, 1400);
        });
      });
    });
  }

  /* ---- Scroll-spy: highlight the active TOC entry ------------------------- */
  function setupScrollSpy() {
    var links = Array.prototype.slice.call(doc.querySelectorAll(".toc a[href^='#']"));
    if (!links.length || !("IntersectionObserver" in window)) return;
    var map = {};
    links.forEach(function (l) {
      var id = l.getAttribute("href").slice(1);
      var el = doc.getElementById(id);
      if (el) map[id] = l;
    });
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (l) { l.classList.remove("active"); });
          if (map[en.target.id]) map[en.target.id].classList.add("active");
        }
      });
    }, { rootMargin: "-64px 0px -70% 0px" });
    Object.keys(map).forEach(function (id) { obs.observe(doc.getElementById(id)); });
  }

  /* ---- Syntax highlighting (if highlight.js loaded from CDN) -------------- */
  function highlight() {
    if (window.hljs && typeof window.hljs.highlightAll === "function") {
      try { window.hljs.highlightAll(); } catch (e) {}
    }
  }

  /* ---- init --------------------------------------------------------------- */
  function init() {
    buildDrawerNav();
    buildCards();
    buildPageNav();
    setupDrawer();
    setupTheme();
    setupCopy();
    setupScrollSpy();
    highlight();
  }
  if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", init);
  else init();
})();
