# Build Prompt: woowsignal.com — Next.js Website

Paste everything below into your AI coding tool (Claude Code, v0, Cursor, etc.) as the build brief.

---

## 1. Project Brief

Build the marketing website for **WoowSignal**, repositioning it from "a Shopify/D2C e-commerce agency" to **"a technology company that builds products, software, and commerce systems."**

One-sentence identity a visitor should get in 10 seconds:
> WoowSignal builds software products, business platforms, and commerce technology.

And in 30 seconds:
> They have their own products, they've built real businesses (Root Lifestyle and others), and they can build custom technology for my company.

E-commerce/Shopify expertise is real and should stay visible — but reframed as **one capability** ("Commerce is one of the systems we build"), not the whole identity.

---

## 2. Tech Stack

- **Next.js 14+, App Router, TypeScript**
- **Tailwind CSS** for styling, using CSS variables for all theme tokens (see §3) — no hardcoded hex values in components
- **Framer Motion** for component-level transitions and page/section reveals
- **GSAP + ScrollTrigger** for scroll-driven animation sequences
- **Three.js (via `@react-three/fiber`)** for the homepage hero — keep this isolated in a client component, lazy-loaded, with a static/CSS fallback for reduced-motion and low-power devices
- Content for products, case studies, and solutions should live in typed content files (`/content/*.ts` or MDX) rather than hardcoded in JSX, so pages can be extended without touching layout code
- Fully responsive; mobile-first build, test at 375px, 768px, 1440px
- `prefers-reduced-motion` must disable/simplify all Three.js and GSAP effects
- Lighthouse targets: 90+ performance, 95+ accessibility, 100 best practices

---

## 3. Brand & Design System

### Logo assets (provided, place in `/public/`)
- `logo-dark.svg` — white wordmark + gray dot-signal mark. Use on **dark backgrounds**.
- `logo-light.svg` — near-black (`#111111`) wordmark + gray dot-signal mark. Use on **light backgrounds**.
- The mark is a minimal grayscale dot/circle cluster (a "signal ping") next to the wordmark — this dot-grid/radar-ping motif is the brand's core visual signature and should recur throughout the site (loading states, list bullets, section markers, hover states) — not just in the logo.

### Color tokens (define as CSS variables, both themes)

**Light theme (default):**
| Token | Value | Use |
|---|---|---|
| `--bg` | `#FAFAF8` | page background |
| `--fg` | `#111111` | primary text |
| `--fg-muted` | `#6B6B6B` | secondary text |
| `--border` | `#E5E3DD` | hairline borders |
| `--surface` | `#FFFFFF` | cards |
| `--accent` | `#D9B84C` | signal accent (see note below) |

**Dark theme (secondary, user-toggleable):**
| Token | Value | Use |
|---|---|---|
| `--bg` | `#1D1D1F` | page background |
| `--fg` | `#F5F5F7` | primary text |
| `--fg-muted` | `#86868B` | secondary text |
| `--border` | `#2E2E30` | hairline borders |
| `--surface` | `#242426` | cards |
| `--accent` | `#D9B84C` | signal accent |

> **Note on accent color:** the logo itself is neutral grayscale, so the accent isn't locked in by the brand mark. `#D9B84C` (warm gold/amber) is used here as the "signal" color — it should read as *status/activity/importance* (used for `LIVE` tags, active nav states, key CTAs, the dot-signal motif) rather than as a luxury/jewelry cue. If a different accent (e.g. a purple/blue "signal" tone) is preferred, it's a single CSS variable to swap — don't hardcode it anywhere else.

### Typography
- Headline typeface: a clean geometric/grotesk sans (e.g. Inter, Geist, or Neue Montreal) — confident, technical, not decorative
- Body: same family or a highly compatible pairing, optimized for long-form case study copy
- Use a clear type scale (e.g. 14/16/20/28/40/56/72px) with generous line-height on body copy
- Small uppercase tracked labels (e.g. `PRODUCT`, `LIVE`, `CASE STUDY`) as recurring UI micro-pattern — set in `--accent` color, letter-spacing ~0.08em

### Motifs to reuse throughout
- Dot-grid / pixel-block patterns as decorative and functional UI (status dots, loading states, background texture)
- "Pixel-block text reveal" as the signature reveal animation for hero headlines and section titles (text resolves in from a block/pixel state rather than a simple fade)
- Thin hairline borders and generous whitespace over heavy drop shadows

---

## 4. Global Layout

**Header (sticky, transparent-to-solid on scroll):**
- Logo (swap light/dark variant based on theme + section background)
- Nav: `Products` `Solutions` `Work` `Technology` `About`
- CTA button, right-aligned: `Let's Build →`
- `Products` and `Solutions` have dropdown mega-menus (see §5 for contents)
- Mobile: full-screen nav overlay, animated open/close

**Footer:**
- Logo + one-line tagline
- Column: Products (links to each product)
- Column: Company (About, Work, Contact)
- Column: Connect (email, social if applicable)
- Bottom bar: © WoowSignal, year; light/dark toggle

---

## 5. Site Map (build these routes for v1)

```
/                     Home
/products             Products index
/products/[slug]      Product detail (teaboy, milkman, woowchat, crm, erp)
/solutions            Solutions index
/work                 Work index (filterable grid)
/case-studies/[slug]  Case study detail (root-lifestyle, + placeholder(s))
/technology           Technology / stack page
/about                About
/contact              Contact
```

Solutions can be sections on one `/solutions` page for v1 (no need for 5 separate solution subpages yet) — but structure the content data so subpages can be split out later without a rewrite.

---

## 6. Homepage — Section by Section

**1. Hero**
- Headline (pixel-block reveal animation): **"Technology for businesses that want to move faster."**
- Subhead: "We design and build software, digital products, and commerce platforms for businesses ready to grow."
- Two CTAs: `Explore Our Work →` (primary) and `Build With Us →` (secondary, links to /contact)
- **Hero visual — "Wave Signal Field."** Chosen direction: an instanced dot terrain that gently undulates and pulses brighter toward a central signal source, with `PRODUCTS` `PLATFORMS` `SOFTWARE` `COMMERCE` as floating labels anchored into the field. Closest literal match to the brand's dot-signal motif — atmosphere without losing clarity. Build to the full technical spec in **§6a** below, in both light and dark theme variants.

**2. What We Build** — 3-up icon grid: Products / Business Software / E-Commerce, each with one line and a link into the relevant page.

**3. Our Products** — one of the largest sections. Intro: "We don't just build software for clients. We build products of our own." Cards for TeaBoy, MilkMan, WoowChat, CRM, ERP (content in §7), each with a status tag (`LIVE` / `IN DEVELOPMENT` / `BETA` / `COMING SOON`) rendered in the accent color. CTA: `Explore Products →`

**4. Selected Work** — 2–3 featured client project cards (Root Lifestyle + placeholder slots for others), each linking to a case study. CTA: `View All Work →`

**5. Process** — "From Idea to Production": 6-step horizontal/vertical timeline — `01 Discover` `02 Design` `03 Build` `04 Integrate` `05 Launch` `06 Scale`, each with a one-line description. GSAP scroll-triggered reveal, one step at a time.

**6. Case Studies preview** — 2 cards with challenge → outcome framing (see §9), linking to full case studies.

**7. Technology** — condensed strip of the stack categories from §11, framed by the line: "We choose technology based on the product, scale, and business requirements — not trends."

**8. Why WoowSignal** — 4 short pillars: Product thinking / Engineering / Business understanding / Long-term partnership.

**9. Closing CTA** — "Let's build something." + `Start a Project →` button linking to /contact.

Use GSAP ScrollTrigger to pin/reveal each section as it enters the viewport; stagger card grids in on scroll.

---

## 6a. Hero Unit — Technical Spec ("Wave Signal Field")

Rated 8/10 against the brand direction: closest literal match to the dot-signal motif, best balance of atmosphere vs. clarity, safest premium-reading option of the concepts explored. Build this as the v1 hero.

**Component:** `HeroSignalField` — isolated client component, dynamically imported with `next/dynamic({ ssr: false })` behind a lightweight gradient placeholder so it never blocks first paint or LCP.

**Stack:**
- `@react-three/fiber` for the scene, `@react-three/drei` for camera/orbit helpers and the `Html` overlay primitive
- `@react-three/postprocessing` (`<EffectComposer>` + `<Bloom>`) for the glow — this is what turns flat dots into the "premium/alive" look in the reference mockups, don't skip it
- Simplex/Perlin noise (e.g. `simplex-noise` package) to drive the terrain undulation, not a canned sine wave — should feel organic, not mechanical

**Geometry & motion:**
- `InstancedMesh` of small spheres/circles arranged in a loose grid (not a rigid lattice — jitter each instance's base X/Z slightly for organic scatter), roughly 2,500–4,000 instances on desktop
- Per-instance Y position driven by 2D simplex noise sampled at (x, z, time) each frame → produces the slow rolling wave-terrain look, not a static plane
- Define one focal point (roughly center-right of frame, where the headline's positive space is). Per-instance color/scale/emissive intensity is a function of distance-from-focal-point combined with a slow radial pulse (sine wave with a ~4–6s period) — instances near the focal point brighten toward the accent gold (`--accent`) on each pulse; the rest stay a cooler, dimmer neutral tone
- Bloom pass tuned to threshold on the brightest/gold instances only — keep the dim background dots crisp and un-glowing so the effect reads as "signal" not "haze"

**Floating labels (`PRODUCTS` `PLATFORMS` `SOFTWARE` `COMMERCE`):**
- Four anchor points positioned in 3D space around/above the terrain, each rendered via drei's `Html` (screen-space projected, so it tracks the 3D anchor as camera/scene moves) or manually projected coordinates if `Html` performance is a concern
- Small bordered pill/tag styling matching the mockups — uppercase, accent-colored text, thin border, subtle backdrop blur if over dense dot areas
- Staggered fade/rise-in on load (~150ms apart), then idle with a very slow independent vertical bob (2–3px amplitude) so they read as "floating," not static UI
- Each links into its corresponding nav destination (Products, Solutions/Platforms, Solutions/Software, Solutions/Commerce)

**Interaction:**
- Subtle camera parallax on mouse move (small rotation/offset, not a full orbit — should feel like depth, not a toy)
- On label hover, boost brightness/pulse-scale of the nearest node cluster to reinforce the label→field connection

**Light / dark theme variants** (must share the same geometry, noise, and motion logic — only color/bloom tuning differs, driven by CSS variables / theme context, not a second component):

| | Dark (secondary theme) | Light (default theme) |
|---|---|---|
| Background | `--bg` `#1D1D1F` | `--bg` `#FAFAF8` |
| Base dot color | cool white/blue-gray, low emissive | near-black `#111111`, matte, **no bloom** on these |
| Focal/pulse color | `--accent` `#D9B84C`, strong bloom | `--accent` `#D9B84C`, bloom present but softer/tighter radius |
| Connecting lines (optional, if added) | faint white/blue, low opacity | pale gray, lower opacity than dark version |
| Overall feel | atmospheric, moody, glow-forward | airy, minimal, glow reserved for the gold focal cluster only |

Light mode is the easier one to get wrong — the temptation is to bloom everything the way the dark version does, which just looks washed out on a light background. Keep dark dots crisp/matte in light mode; let gold carry all the glow.

**Performance & fallbacks:**
- Detect low-power/mobile (viewport width, `navigator.hardwareConcurrency`, or a simple UA check) and drop instance count to ~800–1,200, disable mouse parallax, cap `dpr` at 1.5
- `prefers-reduced-motion`: freeze the time uniform on a single representative frame (mid-pulse, focal cluster lit) instead of a blank scene, skip parallax and label bob — the field should look intentional, not broken
- Provide a static gradient/SVG poster frame shown during the dynamic import + first WebGL context creation, so there's never a blank flash

---

## 7. Products (`/products`, `/products/[slug]`)

Intro: **"Products"** — "Software we're building for the real world."

Seed content (placeholder copy — replace with real specifics before launch):

| Product | One-liner | Status |
|---|---|---|
| **TeaBoy** | Tea & beverage subscription and ordering platform | `LIVE` |
| **MilkMan** | Milk subscription and delivery management platform | `IN DEVELOPMENT` |
| **WoowChat** | Communication meets commerce platform | `BETA` |
| **Business CRM** | Customer management built for modern businesses | `COMING SOON` |
| **Business ERP** | Operations, inventory, and commerce in one system | `COMING SOON` |

Detail page template per product: hero (name, one-liner, status, primary link/CTA if live), problem it solves, key features (3–5 bullets), and — where applicable — a link out to the live product.

---

## 8. Solutions (`/solutions`)

Organize around problems, not technologies. Five sections, each with a short description and 3–5 capability bullets:

1. **Build a Digital Product** — mobile apps, SaaS, platforms
2. **Build Business Software** — CRM, ERP, inventory, operations
3. **Build an E-Commerce Business** — Shopify, custom commerce, marketplace, headless commerce
4. **Connect Your Business** — APIs, payments, shipping, WhatsApp, integrations
5. **Automate Your Operations** — workflows, notifications, data sync, automation

This page is the commercial/services page — end with a CTA into `/contact`.

---

## 9. Work (`/work`) & Case Studies (`/case-studies/[slug]`)

`/work` is a filterable grid: `All | E-commerce | Software | Platforms | Branding | Mobile`. Each card: project image, category tag, tech used, short description, `View Case Study →`.

Known project to seed:

**Root Lifestyle** — Indian D2C luxury fragrance brand. Category: D2C / Shopify / Commerce.
Case study structure (use this template for every case study):
- **Challenge** — what problem the brand had
- **Approach** — what WoowSignal did
- **Technology** — stack used (e.g. Shopify, payments, shipping, marketing/analytics tooling)
- **Solution** — the architecture/build, explained plainly
- **Outcome** — results (sales, conversion, performance, automation — use real numbers when available, otherwise keep qualitative)

Leave one additional case-study slot as a clearly-marked placeholder (`[Add project]`) rather than inventing details for projects not confirmed.

---

## 10. Technology (`/technology`)

Hero: **"Built on modern technology."** Framing line: "We choose technology based on the product, scale, and business requirements — not trends." Group logos/labels by category (don't list 50 tools — keep it curated):

- **Frontend:** Next.js, React, Flutter
- **Backend:** Node.js, Laravel, Express, Phoenix
- **Cloud:** AWS, Cloudflare, Docker
- **Data:** PostgreSQL, MongoDB, Supabase
- **Commerce:** Shopify, Razorpay, Shiprocket

---

## 11. About & Contact

**About** — founder-led technology company narrative (decade of software engineering experience, agency-to-product-company journey), team/values, no invented history — leave founder bio as an editable placeholder block.

**Contact** — simple form (name, email, project type dropdown [Product / Software / Commerce / Other], message), plus direct email link. No fake live-chat widgets.

---

## 12. Component Checklist

`Header`, `MobileNav`, `Footer`, `ThemeToggle`, `HeroSignalField` (Three.js), `PixelRevealText`, `ProductCard`, `WorkCard`, `CaseStudySection`, `ProcessTimeline`, `SolutionBlock`, `TechStackGrid`, `StatusTag`, `SectionLabel` (the small uppercase accent-colored label pattern), `ContactForm`, `Button` (primary/secondary variants).

---

## 13. Acceptance Checklist

- [ ] Light theme default, dark theme fully functional and toggleable, no unstyled flash on load
- [ ] Both logo variants wired to the correct backgrounds automatically
- [ ] Hero Three.js scene loads lazily, has a static fallback, and respects `prefers-reduced-motion`
- [ ] All 9 routes in §5 exist and are linked from nav/footer
- [ ] Product/case-study data is in typed content files, not hardcoded per-page
- [ ] Mobile nav, mobile hero, and mobile product/work grids all tested at 375px
- [ ] No placeholder Lorem ipsum left in shipped copy — use the seed content in this doc, marked `[TBD]` wherever real detail is still needed
- [ ] Lighthouse: 90+ perf / 95+ a11y / 100 best practices on the homepage
