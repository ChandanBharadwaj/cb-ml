# cb-ml — Modern AI/ML &amp; GenAI, the pragmatic way

A hands-on, **mobile-friendly** learning site for modern AI/ML, Deep Learning, Transformers,
NLP, Gen AI, LLMs and SLMs — built for engineers who ship. Every topic comes with an
**animated diagram**, **interview Q&amp;A**, and **fully-commented PyTorch / Hugging Face code**.

The whole site is organized around one idea — the **escalation ladder**:

> Can a plain **algorithm / rules** solve it? → no → **classical ML**? (cheap, CPU, interpretable)
> → not enough → **deep learning**? → only then → **LLM / GenAI**?
> …and at every rung: **CPU or GPU? what's the cost &amp; latency?**

**Use the cheapest tool that actually works.**

## 🔗 Live site

Once GitHub Pages is enabled, it's here:

**https://chandanbharadwaj.github.io/cb-ml/**

## What's inside

- **Part 1 · Foundations** — What is ML? · Classical ML · Neural Networks &amp; Deep Learning · Tokenization, Embeddings &amp; NLP · Transformers &amp; Self-Attention · GenAI, LLMs &amp; SLMs
- **Part 2 · Building with LLMs** — Prompt Engineering · RAG · Vector DBs &amp; Embeddings · Agents
- **Part 3 · Train · Tune · Optimize · Evaluate** — Fine-tuning · Inference Optimization · Fitting &amp; Generalization · Metrics &amp; Evaluation
- **Part 4 · Production &amp; Problem-Solving** — MLOps &amp; Production · When to Use ML (the ladder) · Problem → Solution · Multimodal

Pages are added one at a time so each stays rich and complete — see
[`PROGRESS.md`](PROGRESS.md) for the current build status.

## Tech

Pure HTML + CSS + vanilla JavaScript. No build step, no framework. The only external
dependency is [highlight.js](https://highlightjs.org/) (via CDN) for code coloring; the site
stays readable even if that's blocked.

## Running locally

```bash
# from the repo root
python3 -m http.server 8000
# then open http://localhost:8000
```

## Enabling GitHub Pages (one-time, ~20 seconds)

The site is plain static files served straight from `main`, so no build/Action is needed
(a `.nojekyll` file tells GitHub to serve the files as-is). Turn Pages on once:

1. Go to the repo on GitHub → **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Set **Branch: `main`** and **folder: `/ (root)`**, then **Save**.
4. Wait ~1 minute, then open **https://chandanbharadwaj.github.io/cb-ml/**.

Every later `git push` to `main` updates the live site automatically. (GitHub can't enable
Pages via the API for a repo that never had it, which is why this one manual step is required.)

---

*A personal, open learning project. Built to be read on a phone.*
