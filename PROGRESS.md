# Build tracker — cb-ml learning site

> This file is the single source of truth for build progress across sessions.
> It is **not** a learning plan or a study timeline — it just tracks which pages
> are built so any session can resume cleanly.
>
> **Resume protocol:** read this file → pick the next `[ ]` topic (top-down) →
> build it fully (explanation + animated SVG + interview Q&A + commented code) →
> commit + push to `main` → tick it here → also flip its `soon:true` flag in
> `assets/app.js` so the drawer nav + landing cards go live.

Legend: `[ ]` todo · `[~]` in progress · `[x]` done

---

## Phase 0 — Skeleton + deploy
- [x] `assets/styles.css` — mobile-first, dark default + light toggle, all components
- [x] `assets/app.js` — nav drawer, cards, theme, copy-code, scroll-spy (single SITE-map source)
- [x] `index.html` — landing + **interactive escalation-ladder hero SVG**
- [x] `p1-transformers-nlp.html` — **reference page** (locks the template)
- [x] `.nojekyll`, `PROGRESS.md`, `README.md` (branch-based Pages — no Actions workflow)
- [x] Commit + push to `main`; verified locally at 390px viewport
- [x] **Pages enabled** (Deploy from a branch → `main` / root); "pages build and deployment" succeeded → site live at https://chandanbharadwaj.github.io/cb-ml/

## Part 1 · Foundations & Concepts
- [x] `p1-ml-deep-learning.html` — classical baselines (GBM on tabular) → neurons, backprop, optimizers; GBM-vs-MLP side by side
- [x] `p1-transformers-nlp.html` — tokenization, embeddings, RoPE, self-attention, multi-head, blocks *(done in Phase 0)*
- [x] `p1-genai-llm-slm.html` — autoregressive generation, decoding params, LLM vs SLM tradeoffs

## Part 2 · Building with LLMs (FDE core)
- [x] `p2-prompt-engineering.html` — few-shot, CoT/ReAct, structured output, injection defense
- [x] `p2-rag.html` — chunking, hybrid search, re-ranking, eval, failure modes
- [x] `p2-vector-db-embeddings.html` — similarity metrics, ANN (HNSW/IVF), hybrid + metadata
- [x] `p2-agents.html` — ReAct loop, function calling, memory, MCP, agent eval

## Part 3 · Train · Tune · Optimize · Evaluate
- [x] `p3-fine-tuning.html` — LoRA/QLoRA, RLHF/DPO/GRPO, fine-tune vs RAG vs prompt
- [x] `p3-inference-optimization.html` — KV cache, quantization, batching, speculative decoding, latency SLAs
- [x] `p3-fitting-generalization.html` — over/underfit, bias-variance, regularization, double descent, leakage
- [x] `p3-metrics-evaluation.html` — precision/recall/threshold/calibration + LLM eval, LLM-as-judge (incl. live threshold slider)

## Part 4 · Production & Problem-Solving (FDE core)
- [ ] `p4-mlops-production.html` — drift/monitoring, canary/shadow, guardrails, PII
- [ ] `p4-when-to-use-ml.html` — **the escalation ladder** (centerpiece), CPU/GPU & cost at each rung
- [ ] `p4-problem-solving.html` — problem→approach case studies, ML/GenAI system design
- [ ] `p4-multimodal.html` — VLMs/CLIP, diffusion, VQA, multimodal RAG (overview)

---

### Per-page checklist (apply to every topic page)
- [ ] Standard head + topbar + drawer + scrim markup
- [ ] In-page TOC (scroll-spy)
- [ ] "Where it sits on the ladder" callout (CPU/GPU + cost chips)
- [ ] At least one animated / interactive SVG
- [ ] 4–6 interview Q&A accordions (badges: core / trap / senior)
- [ ] Fully-commented PyTorch / Hugging Face code (+ copy button)
- [ ] Prev / Next footer links
- [ ] Flip `soon:true` in `assets/app.js`

### Conventions (so pages stay consistent)
- Pure HTML/CSS/vanilla JS, no framework. highlight.js via CDN is the only external dep.
- Filenames: `pN-topic.html`. Nav + cards are generated from `window.CBML_NAV` in `assets/app.js`.
- Everything commits/pushes to **`main`** (GitHub Pages source).
- FDE lens on every concept: mechanism → when/why → how it fails → the tradeoff (cost/CPU-vs-GPU/latency).
