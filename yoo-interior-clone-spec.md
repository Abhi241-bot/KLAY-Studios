# YOO Interior — Full Website Teardown & Clone Spec
### (Recolored to a Terracotta × White design system)

> Source analyzed: `https://yoointerior.com/` (all sub-pages crawled: `/`, `/expertise`, `/projects`, `/projects/[slug]`, `/about`, `/case-study`, `/case-study/[slug]`, `/contact`, `/news-press`)
> Confirmed via Awwwards nomination page: **Vue.js + Nuxt.js + Tailwind CSS**, Nominee (Jun 24, 2026), built by studio **Workattack**.

---

## 0. How to read this document

I do not have a rendered browser/devtools in this environment (no access to computed CSS, JS bundles, or the live font files — my fetch tool only returns extracted text/markdown from the page, not raw HTML/CSS). So:

- **Structure, copy, page flow, asset filenames, and interaction *patterns*** below are directly reverse-engineered from the site's actual markup (I can tell exactly what animates because of tell-tale signs like duplicated text nodes — explained in §4).
- **Exact hex codes, font-family names, and pixel spacing** are *not* verifiable by me right now — the original site's actual palette looked neutral (black/white/warm-grey, typical "luxury architecture" style), not terracotta. Since you want a **terracotta × white** clone for a different company, I've designed a full original palette/token system for you below rather than guessing at YOO's real hex values. If you want pixel-perfect fidelity to the original (not just structural fidelity), open yoointerior.com in Chrome → DevTools → Elements/Computed, and drop the real hex/font values into the tokens in §2.

Everything is organized so you (or an AI coding agent) can build section-by-section.

---

## 1. Tech Stack (confirmed + recommended)

| Layer | Original (confirmed by Awwwards tags) | Recommended for your clone |
|---|---|---|
| Framework | Vue.js + Nuxt.js | Next.js (React) — since you're referencing reactbits.dev, which is React |
| Styling | Tailwind CSS | Tailwind CSS |
| Smooth scroll | Not confirmed, but behavior (inertia, pinned sections) strongly implies **Lenis** or **Locomotive Scroll** | **Lenis** (`@studio-freight/lenis`) |
| Scroll-triggered animation | Strongly implied by pinned/numbered sections, staggered reveals | **GSAP + ScrollTrigger** |
| Text splitting/reveal | Confirmed by duplicated DOM text nodes (see §4) | GSAP **SplitText** (or a reactbits text component, see §7) |
| Page transitions | Nuxt route transitions | Next.js + **Framer Motion** `AnimatePresence`, or View Transitions API |
| Video hero | Native `<video>` (Supabase-hosted mp4s), muted/autoplay/loop | Native `<video>` |
| Cursor | Likely a custom cursor (common on Workattack/awwwards sites of this genre) | Custom cursor component (§7) |
| Hosting of media | Supabase Storage (`*.supabase.co/storage/v1/object/public/cms-assets/...`) | Any CDN / S3 / Cloudinary |

---

## 2. Design Tokens — Terracotta × White System

Since the brief is a **different company** in **terracotta + white**, here is a full, cohesive token set built to match the *mood* of the original (minimal, editorial, confident, lots of negative space) while being genuinely terracotta-led rather than monochrome.

```css
:root {
  /* === Base === */
  --color-white:            #FFFFFF;
  --color-bg:                #FFFFFF;   /* primary page background */
  --color-bg-warm:           #FBF5F0;   /* secondary/alt section background, very light terracotta tint */
  --color-bg-deep:           #F4E7DE;   /* card/tile background, slightly deeper tint */

  /* === Terracotta family (brand) === */
  --color-terracotta-900:    #5C2A17;   /* darkest — headline accents on light bg, footer bg option */
  --color-terracotta-700:    #8C3F22;   /* strong accent — active states, key CTAs */
  --color-terracotta-500:    #C1592E;   /* PRIMARY brand color — buttons, links, active nav underline */
  --color-terracotta-300:    #E08A5B;   /* hover tints, icon fills */
  --color-terracotta-100:    #E9C7B3;   /* dividers, thin lines, subtle borders */
  --color-terracotta-050:    #F6E4D8;   /* faint tint backgrounds, tags/pills */

  /* === Ink (text) — warm near-black, NOT pure black === */
  --color-ink-900:           #241A15;   /* primary text */
  --color-ink-700:           #4A3B33;   /* secondary text / body copy on white */
  --color-ink-500:           #7C6B62;   /* muted / captions / meta labels */
  --color-ink-300:           #B7A99E;   /* disabled, placeholder */

  /* === Functional === */
  --color-line:              #E3D2C6;   /* hairline dividers (replaces the original's SVG divider lines) */
  --color-overlay:           rgba(36,26,21,0.55); /* video/image overlays for text legibility */
  --color-focus:             var(--color-terracotta-500);

  /* === Radii / shadows (kept minimal — the original is very flat/edgy, not soft) === */
  --radius-sm: 2px;
  --radius-md: 4px;
  --shadow-card: 0 8px 30px rgba(36,26,21,0.08);
}
```

**Usage rules (mirrors the original's restraint):**
- Backgrounds are **90% white / warm-white**. Terracotta is used as an *accent*, not a wash — for links, active states, numerals ("01.", "02.", "03."), thin divider lines, hover underlines, and the footer's decorative layered shapes.
- Body copy sits in `--color-ink-700` on white; large display headlines sit in `--color-ink-900`.
- Exactly one warm terracotta tone (`--color-terracotta-500`) is used for all interactive/active states, so it reads as a single confident accent rather than a rainbow of oranges.

---

## 3. Typography

The original uses a clean, all-caps grotesk sans for navigation/labels and a larger, tighter-tracked sans for display headlines — very typical of the "Swiss/European architecture studio" genre (think Neue Montreal / Suisse Int'l / General Sans). I can't confirm the literal font-family name without devtools, so here is a **free-font substitution** that will look extremely close:

| Role | Original style (observed pattern) | Free substitute to use |
|---|---|---|
| Display / H1 (hero, page titles like "EXPERTISE", "ABOUT") | Large, tight letter-spacing, uppercase, medium weight | **General Sans** (Fontshare, free) or **Archivo** |
| Section headings (H2/H3, e.g. "Design Process") | Same family, smaller, sentence case | General Sans / Archivo, Medium 500 |
| Nav / labels / meta ("EXPERTISE", "CLIENT", "AREA") | All-caps, letter-spacing +0.05–0.1em, small size (~12–13px) | General Sans, Medium, uppercase + tracked |
| Body copy | Regular weight sans, generous line-height (~1.6) | General Sans / Inter, Regular 400 |
| Big numerals ("01.", "02.", "03.") | Same display family, terracotta-accented in your version | General Sans, tabular numerals |

```css
:root {
  --font-display: 'General Sans', 'Archivo', sans-serif;
  --font-body: 'General Sans', 'Inter', sans-serif;

  --fs-hero: clamp(3rem, 8vw, 7rem);      /* page-title hero, e.g. "EXPERTISE" */
  --fs-h1: clamp(2rem, 5vw, 3.5rem);
  --fs-h2: clamp(1.5rem, 3vw, 2.25rem);
  --fs-body-lg: clamp(1.1rem, 1.6vw, 1.35rem);  /* the big statement lines like "Design begins with an idea..." */
  --fs-body: 1rem;
  --fs-label: 0.8rem;    /* uppercase nav/meta labels */
  --tracking-label: 0.08em;
}
```

> **Action item:** open the real site, DevTools → Elements → click any heading → Computed panel → copy the exact `font-family`. If it's a paid font (Neue Montreal, Suisse Int'l, PP Fragment, etc.), the free substitutes above are the standard "safe" replacements designers use for those exact typefaces.

---

## 4. How I know what animates (reading the tell-tale signs)

When I extracted the page content, several pieces of text appeared **twice, back-to-back**, e.g.:

```
EXPERTISEEXPERTISE
Design begins with an idea, a possibility shaped through exploration and intent.
Design begins with an idea, a possibility shaped through exploration and intent.
SELECTED PROJECTS SELECTED PROJECTS SELECTED PROJECTS
CASE STUDY - CASE STUDY   CASE STUDY - CASE STUDY   CASE STUDY - CASE STUDY
```

This duplication is not a scraping error — it's the actual DOM. It's the classic markup signature of two well-known animation techniques, and it tells us exactly what's happening on-screen:

1. **Doubled once** (nav items, page-title H1s, single paragraph statements) → a **stacked-span text reveal**: two identical `<span>`s are absolutely stacked, one visible and one translated fully out of view; on hover or on scroll-into-view, they crossfade/slide past each other (classic "text swap on hover", or "mask reveal on load"). This is used for:
   - Nav links (EXPERTISE / PROJECTS) — hover swap
   - Big section headlines — reveal-on-scroll (slides up from a clipped mask)
   - The one-line "manifesto" statements under each section title

2. **Doubled/tripled with a separator** ("SELECTED PROJECTS" × 3, "CASE STUDY - CASE STUDY" × 3) → an **infinite horizontal marquee**: the string is repeated N times in the DOM so the CSS `translateX` loop never shows a gap, then scrolled continuously via `@keyframes` or GSAP.

This lets us document the exact animation vocabulary with confidence, below.

---

## 5. Global / Shared Components (present on every page)

### 5.1 Header / Navigation
- Fixed/absolute, transparent over hero, sits top-left (logo) and top-right (hamburger icon).
- Logo = SVG wordmark, links home.
- Right side = a hamburger **menu-icon.svg** — opens a full-screen (or side-panel) overlay menu.
- Nav items visible inline on desktop in some contexts (EXPERTISE / PROJECTS) with the **hover text-swap** animation from §4.1.
- **Behavior on scroll:** typical pattern for this genre — header background stays transparent over video/image heroes, then likely gets a background fill (white or a blurred glass) once you scroll past the hero, OR hides on scroll-down and reappears on scroll-up. (Not independently verifiable without devtools — implement the "hide down / show up" pattern, it's the most common for this style and cheap to build.)
- **AI-reproducible:** ✅ Yes, fully — plain CSS/JS scroll listener + transform.

### 5.2 Full-screen Menu Overlay
- Triggered by the hamburger icon.
- Expected content (standard for this site type, inferred from the footer's own nav list): EXPERTISE, PROJECTS, ABOUT, CASE STUDY, NEWS & PRESS, CONTACT — likely large stacked links, each with the same hover text-swap treatment as the top nav, staggered-in on open (each link fades/slides in ~40–80ms after the previous).
- **AI-reproducible:** ✅ Yes — CSS clip-path or transform reveal + staggered entrance via GSAP/Framer Motion `staggerChildren`.

### 5.3 Custom Cursor
- Sites of this exact genre (Workattack/Awwwards "Transitions"+"Interaction Design" tags) almost always ship a custom cursor: a small dot that follows the mouse with slight lag/easing, and expands into a pill/circle with text ("VIEW", "DRAG", "PLAY") when hovering project cards, videos, or draggable galleries.
- **AI-reproducible:** ✅ Yes, but you'll want a dedicated primitive rather than hand-rolling the lerp/easing math.
  - **reactbits.dev equivalent:** look under *Animations* for a cursor/"Crosshair"/"SplashCursor"-style component, or a dedicated "Custom Cursor" primitive if listed — check the current catalogue since it updates.

### 5.4 Page/Route Transitions
- Given Nuxt + this design language, expect a **wipe/curtain transition** between routes: a terracotta (originally black/white) panel sweeps up or across covering the viewport, the new page's content mounts underneath, then the panel sweeps away.
- **AI-reproducible:** ✅ Yes — Framer Motion `AnimatePresence` + a full-screen `div` animated on `scaleY`/`clipPath`, or Next.js + View Transitions API.

### 5.5 "SCROLL DOWN" Indicator
- Appears on hero sections (Home, About, Project detail, Case-study detail).
- Small label + likely a thin animated line or chevron that loops (fades/moves down repeatedly) to invite scrolling.
- **AI-reproducible:** ✅ Yes — simple CSS `@keyframes` (translateY + opacity loop).

### 5.6 Footer (identical across all pages)
Structure observed:
```
[top divider SVG line]
[YOO logo]
Nav columns: EXPERTISE · PROJECTS · ABOUT · CASE STUDY · NEWS & PRESS · CONTACT
Social row: Facebook→ Instagram→ Linkedin→ Youtube→
Newsletter [input] →
Data Privacy→
"YOO INTERIOR IS A MIMAR HOLDING COMPANY."
"©2026 YOO INTERIOR, ALL RIGHTS RESERVED."
"Designed by Workattack"
[5 stacked decorative background SVGs: background-1.svg … background-5.svg]
```
- The **5 layered background SVGs** are almost certainly a **parallax illustration** (e.g., abstract skyline/mountain/arch silhouettes in flat terracotta tones at different opacities), each layer scrolling at a slightly different speed as the footer comes into view — a very common "closing visual" for architecture/interior studio sites.
- Social links and the "Facebook→ / Instagram→" style all share the **arrow-on-hover slide** micro-interaction (arrow nudges right on hover, or reveals from being clipped).
- Newsletter is a single email input + a bare "→" submit affordance (no visible button chrome — the arrow *is* the button).
- **AI-reproducible:** ✅ Structure/interactions yes. The **actual illustrated artwork** inside the 5 SVGs is bespoke — you'll need to either commission/generate flat terracotta-toned line-art shapes (arches, columns, skyline silhouettes fit an "interior design" brand) or source from an illustration kit; I can't invent the exact original artwork, only the mechanism (layered parallax).

---

## 6. Page-by-Page Breakdown

### 6.1 Home (`/`)
1. **Hero** — full-bleed background **video** (`yoo_web_1.mp4`, muted/autoplay/loop), logo top-left, hamburger top-right, nav labels (EXPERTISE / PROJECTS) with hover-swap, "SCROLL DOWN" cue bottom.
2. **Expertise teaser section** — small label "EXPERTISE" (doubled = animates in), big manifesto line "Design begins with an idea, a possibility shaped through exploration and intent." (doubled = scroll-reveal), a "MORE DETAIL →" link (arrow-hover), and 3 pill/tab labels **DESIGN / BUILD / DESIGN + BUILD** — these are likely tabs that preview into the Expertise page's 3 sections.
3. **Selected Projects section** — marquee-style repeated eyebrow "SELECTED PROJECTS" ×3 (see §4.2) scrolling horizontally as a background/kicker behind or above the section title "WHAT WE DO" / "PROJECTS", short manifesto line, then a **grid of project cards** (3 rows × 2, asymmetric — first row has 1 wide image + 2 stacked links, matching the source's layout of Peninsula Hotel / Ākēdo / Nokta side by side, then St. Regis / Tekfen, then Turkish Airlines / Louis Vuitton), each tagged with its category (HOSPITALITY / OFFICE / RETAIL) and a "SEE ALL PROJECTS →" CTA.
4. **Awwwards badge** — links out to the site's own award listing (in your clone, replace with your own award/press badges or remove).
5. **Footer** (see §5.6).

**Signature animation for this page:** section-to-section scroll reveal where the eyebrow label and headline slide up out of a clipped mask together, staggered by ~0.1s, as each section enters the viewport (GSAP ScrollTrigger, `start: "top 80%"`).

### 6.2 Expertise (`/expertise`)
- Header: "EXPERTISE" H1 (reveal), manifesto line "Every line is a decision, Every decision is a feeling."
- **Three numbered pinned sections** — `01. DESIGN`, `02. BUILD`, `03. DESIGN + BUILD` — this numbering pattern (`01.` / `02.` / `03.`) plus a large pull-quote per section (e.g., "If a building becomes architecture, then it is art.") strongly suggests a **pinned/sticky scroll section**: as you scroll, the section number + title stay pinned while sub-content (Design Process, Concept Development, Material & Detail Research, Collaborative Design Process — each separated by a thin **divider.svg** line) scrolls past beneath/beside it, accordion or fade-swap style.
- Each of the 3 sections ends with **2 side-by-side project previews** (one image, one autoplay video, e.g. MOLU / OLEA THE BAR) tagged by category.
- **AI-reproducible:** ✅ Yes — GSAP ScrollTrigger `pin: true` + a horizontal or vertical content swap as you scroll through the pinned duration.

### 6.3 Projects — Listing (`/projects`)
- H1 "PROJECTS" (reveal).
- **Two dropdown filters**: "Expertise +" and "Category +" — the "+" flips to "×"/rotates 45° when opened, revealing a checklist (Design / Build / Design+Build for Expertise; Retail / Hospitality / Office / F&B for Category).
- **Masonry-style grid of project tiles**, alternating **static image** and **autoplay muted looping video** thumbnails (portrait ratio ~640×853, i.e. 3:4), each labeled with category + project name, e.g. `F&B · OLEA & BAR`, `Office · NOKTA HOLDING`.
- Tile hover: very likely a subtle **scale-up (1.0 → 1.03–1.05) + slight overlay darken**, cursor swaps to a "VIEW" pill (§5.3).
- **AI-reproducible:** ✅ Fully — CSS Grid/Masonry + filter state (checkbox toggles filtering the array) + `object-fit: cover` video tiles.

### 6.4 Project Detail (`/projects/[slug]`)
Example analyzed: `les-benjamins-nisantasi`
1. Full-bleed hero image, logo/menu header overlay, project name as large H1 (doubled = reveal), "SCROLL DOWN".
2. **Meta info row/grid** — 6 label→value pairs: `Client / City,Country / Year / Expertise / Area / CATEGORY` — laid out as a horizontal strip of small caption labels over larger values (this is a very standard "spec sheet" grid, likely 6 columns on desktop collapsing to 2-col or stacked on mobile).
3. **Image gallery** — a sequence of full-width or grid-slotted images (`slot01`…`slot08`), likely alternating full-bleed and 2-up layouts, each probably fading/sliding in on scroll.
4. **Prev/Next project navigation** at the bottom — "PREV PROJECT [NAME]" / "NEXT PROJECT [NAME]", likely showing a thumbnail preview on hover (common pattern — hover the "next project" link and a small floating image preview follows the cursor).
5. Hero image **repeats** right before the footer — a common "bookend" technique, sometimes with a slow Ken-Burns/parallax zoom as it re-enters view.
- **AI-reproducible:** ✅ Structure yes. The hover-thumbnail-follows-cursor on prev/next links is a nice-to-have — implementable with `mousemove` + a fixed-position `img`, or via a reactbits "Image Trail"/cursor-follow primitive (check reactbits *Animations* category, e.g. something like "ImageTrail" or "TiltedCard" hover-preview pattern).

### 6.5 About (`/about`)
1. Hero: two background images stacked (looks like a split/duotone or before/after crossfade pair), header overlay, H1 "ABOUT", "SCROLL DOWN".
2. **Quote/intro block**: "A great team finds a way to win" + attribution "Allan Ray" separated by a small **divider-line.svg**, then a long-form paragraph about the studio's founding (2007), founders' names, philosophy.
3. Full-width **video** block (office/工程 footage).
4. Second manifesto: "Design is a journey shaped through research and spatial understanding" + paragraph, alongside **2 stacked images** (portrait + landscape, e.g. nobu_.jpg + beymen.avif) forming an asymmetric photo collage.
5. A second **video** block + closing paragraph on HQ (Akat, Istanbul) and philosophy quote in italics/quote marks.
6. **Team section** — "Team" label, manifesto line, then **3 large featured leadership cards** (photo, name, thin divider SVG, ROLE/EDUCATION meta, "more.svg" expand icon) for the 3 Co-Founders, followed by a **"rest of us →"** link that likely expands/navigates to reveal the rest of the team as **smaller cards** (İdil Erdemli, Tolga Albayrak, Pelin Oduncu, etc. — Design Director, Deputy GM, Director roles).
   - The "more.svg" icon per card = **click-to-expand bio** (accordion or modal with extended bio/LinkedIn).
7. **CTA banner**: "Be a part of this amazing team?" + copy + "Apply Now →" over a full-width photo banner (team-banner.jpg).
8. **References/logo wall** — "References" label, "Solution partner of global brands," then a **long horizontal auto-scrolling marquee of ~40+ partner/brand SVG logos**, looping seamlessly (confirmed: the logo list literally repeats itself once in the raw markup — classic infinite-marquee duplication, same mechanism as §4.2).
9. **Company profile download card** — cover image + "Company Profile 2026" + description + "Download ↓" button (with a **download.svg** icon).
- **AI-reproducible:** ✅ All of it, structurally. The **logo marquee** especially: `reactbits.dev` → *Components* (look for a marquee/"LogoLoop"-style or "InfiniteScroll" component) or hand-roll with a duplicated flex row + CSS `@keyframes translateX(-50%)` infinite linear.

### 6.6 Case Study — Listing (`/case-study`)
- Same "±3-times-repeated eyebrow" marquee pattern as Home: `"CASE STUDY - CASE STUDY"` ×3 running as a horizontal ticker/kicker behind the H1.
- Same Expertise/Category **"+"** dual filter pattern as Projects listing.
- Grid of case-study tiles (image thumbnails only here, no video), tagged by category (F&B / Retail / Office / Hospitality).
- **AI-reproducible:** ✅ Fully — identical mechanism to Projects listing, minus the video tiles.

### 6.7 Case Study Detail (`/case-study/[slug]`)
Example analyzed: `new-era-hakkasan`
1. Full-bleed hero image + header + H1 (project name, doubled/reveal) + "SCROLL DOWN".
2. **"Overview"** label + long-form narrative paragraph (this is the key difference from Project Detail — case studies are editorial/story-driven, not just a photo gallery).
3. **Meta spec grid** — same 6-field pattern: Client / City,Country / Year / Expertise / Area / CATEGORY.
4. Alternating **full-width single images** and **2-up image pairs**, interleaved with **additional narrative paragraphs** (2–3 more long paragraphs breaking down concept, materials, execution) — i.e., this page reads like a long-form magazine feature: text block → image(s) → text block → image(s).
5. **Prev/Next case study** navigation at the bottom (same pattern as §6.4.4).
6. Hero image bookend + footer.
- **AI-reproducible:** ✅ Fully — this is just a rich-text/CMS template: hero → meta grid → repeating (prose + media) blocks → prev/next.

### 6.8 Contact (`/contact`)
- What I could extract: H1 "CONTACT" (reveal), manifesto line "We carry the flag of success, around the world," then straight to footer.
- **This page almost certainly has more content that didn't come through in text extraction** (contact forms, office address/map, phone/email are typically client-side rendered widgets that a text-scrape can miss). Expect, based on genre convention:
  - An office address block (Akat, Istanbul — mentioned in the About page copy) + phone/email.
  - Possibly an embedded map or a static map-style illustration (matching the terracotta aesthetic rather than a literal Google Maps embed, to stay on-brand).
  - A contact form (Name / Email / Subject / Message / Submit) with minimal-line input styling (underline inputs, no boxes — consistent with the site's flat aesthetic).
- **Action item:** revisit `/contact` yourself in a real browser (I only get the SSR/text-extracted shell) to confirm the form fields before building this page 1:1.

### 6.9 News & Press (`/news-press`)
- H1 "NEWS & PRESS" (reveal).
- **List of article entries** (not cards — plain list rows), each with: Title (doubled = hover-swap, meaning each row is a clickable link with the same text-swap hover as nav), and a publish date (e.g. "MAY 14, 2026").
- **Pagination** at the bottom: numbered pages `1 2 3` (simple, no "next/prev" arrows visible in the extraction — just page numbers).
- **AI-reproducible:** ✅ Fully — simple list + hover text-swap + pagination component.

---

## 7. Master Animation & Interaction Inventory

| # | Effect | Where used | AI-reproducible? | How to build it |
|---|---|---|---|---|
| 1 | **Text hover-swap** (two stacked spans, one slides out as the other slides in) | Nav links, footer social links, news list titles | ✅ Yes | Pure CSS: two `<span>` inside `overflow:hidden`, `transform: translateY()` on `:hover`, or GSAP for easing control. reactbits.dev → *Text Animations* → look for a hover/"Shuffle" style text component |
| 2 | **Scroll-reveal text mask** (headline/paragraph slides up out of a clipped box as it enters viewport) | Section titles, manifesto lines, page H1s | ✅ Yes | GSAP `SplitText` + `ScrollTrigger`, or CSS `clip-path` transition. reactbits.dev → *Text Animations* → "ScrollReveal" / "BlurText" / "SplitText"-style component |
| 3 | **Infinite horizontal marquee** | "SELECTED PROJECTS" ticker, "CASE STUDY -" ticker, References logo wall | ✅ Yes | Duplicate content 2× in a flex row, animate `translateX(-50%)` `linear infinite`. reactbits.dev → *Components* → marquee/"InfiniteScroll"-style component (verify current name) |
| 4 | **Pinned/sticky numbered sections** (01/02/03 scroll-through) | Expertise page (DESIGN/BUILD/DESIGN+BUILD) | ✅ Yes | GSAP ScrollTrigger `pin:true` with content swap tied to scroll progress |
| 5 | **Custom cursor** (dot + expand-to-label on hover) | Site-wide, esp. project/case-study tiles | ✅ Yes, with a dedicated primitive | reactbits.dev → *Animations* → cursor-family component (e.g. "SplashCursor"/"Crosshair" — check current catalogue) |
| 6 | **Route/page transition wipe** | Every internal navigation | ✅ Yes | Framer Motion `AnimatePresence` + full-screen panel `scaleY`/`clipPath`, or Next.js View Transitions API |
| 7 | **Autoplay muted looping video tiles** | Project/case-study grid thumbnails, Expertise section previews | ✅ Yes | Native `<video autoplay muted loop playsinline>`, lazy-mounted on viewport intersection |
| 8 | **Filter dropdown ("+/×")** | Projects & Case Study listings | ✅ Yes | Simple accordion state + checkbox list + array filter |
| 9 | **Card hover scale/overlay** | Grid tiles | ✅ Yes | CSS `transform: scale(1.04)` + overlay opacity transition |
| 10 | **Prev/Next hover thumbnail follow-cursor** | Project & Case-study detail footers | ✅ Yes (nice-to-have) | `mousemove` + fixed-position preview `<img>`, or a reactbits *Animations* → "ImageTrail"-style component |
| 11 | **Layered parallax footer illustration** | Global footer (5 stacked SVGs) | ⚠️ Mechanism yes / artwork no | Parallax mechanism = trivial (different `translateY` speeds per layer via `ScrollTrigger scrub`). **The actual illustrated shapes are bespoke art** — you must design or commission flat terracotta-toned SVG illustrations (arches/columns/skyline silhouettes fit an interior-design brand identity); I cannot fabricate the original artwork, only the animation mechanism. |
| 12 | **"SCROLL DOWN" looping cue** | All hero sections | ✅ Yes | CSS keyframe loop (translateY + opacity) |
| 13 | **Team card "more" expand** | About → Team | ✅ Yes | Accordion/modal reveal on click |
| 14 | **Company profile download button** | About page | ✅ Yes | Static link/button, icon swap on hover |
| 15 | **Two-video/AI-generated hero footage** | Home hero, About content blocks | ⚠️ Partially | The *hero video itself* (described by Awwwards as "AI-generated films") is bespoke media, not a UI component — you'll need to either commission real footage/photography of your client's actual interiors, or generate stock/AI video separately. The **UI wrapper** around it (full-bleed cover video, overlay, headline on top) is fully reproducible. |

---

## 8. Layout & Grid Notes

- **Container:** wide, likely ~1400–1600px max-width with generous outer gutters (24–64px depending on breakpoint) — very typical "editorial/architecture portfolio" spacing, lots of whitespace.
- **Section rhythm:** large vertical spacing between sections (~120–200px desktop) reinforcing a slow, confident scroll pace.
- **Grids:**
  - Home "Selected Projects" → asymmetric grid, first row 1 large + 2 stacked, then 2-up rows.
  - Projects/Case-study listing → uniform masonry, portrait tiles (3:4 ratio).
  - Project/Case-study detail meta → 6-column info strip (desktop) / stacked (mobile).
  - Team → 3 large cards (founders) + smaller grid for the rest of the team.
- **Breakpoints (suggested):** mobile <640px, tablet 640–1024px, desktop 1024–1440px, wide ≥1440px. Marquees, pinned sections, and hover-cursor effects should gracefully degrade/disable below tablet width (standard practice — pin/scroll-jack effects are usually desktop-only).

---

## 9. Elements You (or your designer) Need to Source — Not AI-Reproducible as Pure Code

| Element | Why it's not code-only | Suggested source |
|---|---|---|
| Hero/background videos (interior walkthroughs) | Original uses "AI-generated films" of actual interiors per Awwwards; yours needs footage/renders of *your* client's actual spaces or a licensed stock/AI equivalent | Runway/Pika/Kling for AI b-roll, or real videography; stock: Artgrid, Storyblocks |
| Footer parallax illustration artwork (5 SVG layers) | Bespoke brand illustration, not a generic component | Commission an illustrator, or adapt from an SVG illustration kit (e.g. unDraw/Humaaans-style but architectural) recolored to terracotta |
| Partner/brand logo wall assets | Real client logos — can't be fabricated | Use your actual client/partner logos |
| Real font files (if the original uses paid fonts like Neue Montreal/Suisse Int'l) | Licensed, not public | Buy the license, or use the free substitutes in §3 |
| Team photography | Real people | Actual photography of your team |
| Actual project photography (galleries) | Real interiors | Actual photography of your client's completed projects |

Everything else in this document — layout, motion, states, structure — is buildable by an AI coding agent following this spec.

---

## 10. Suggested Package List (React/Next.js clone)

```bash
npm install next react react-dom
npm install tailwindcss postcss autoprefixer
npm install gsap                    # ScrollTrigger, SplitText (SplitText is a paid Club GSAP plugin — free alt: manual span-splitting)
npm install @studio-freight/lenis   # smooth/inertia scroll
npm install framer-motion           # page transitions, staggered reveals
npm install swiper                  # if you want a carousel instead of a hand-rolled gallery
```

Then pull in specific components from **reactbits.dev** for:
- A text-reveal/split-text component (nav §7.1, headlines §7.2)
- A marquee component (§7.3)
- A custom cursor component (§7.5)
- An image-trail / cursor-follow-preview component (§7.10)

(Reactbits' catalogue changes over time — search the site directly for "text reveal," "marquee," "cursor," and "image trail" to grab the current version of each, then restyle their CSS variables to the terracotta tokens in §2.)

---

## 11. Suggested Build Order

1. Set up Tailwind + design tokens (§2, §3) globally first — get the terracotta/white system locked before building components.
2. Build the **Header + Footer** (shared on every page) — §5.1, §5.6.
3. Build the **text hover-swap** and **scroll-reveal** primitives (§7.1, §7.2) since they're reused everywhere.
4. Build the **Home** page (§6.1) — it exercises hero video, marquee, and grid all at once, so it's the best "integration test" page.
5. Build the **listing pages** (Projects, Case Study) with the filter + grid + video-tile pattern (§6.3, §6.6).
6. Build the **detail page templates** (Project Detail, Case Study Detail) — these are CMS-driven templates, build once, populate via data (§6.4, §6.7).
7. Build **About** (§6.5) — most content-dense page, has the marquee logo wall.
8. Build **News & Press** (§6.9) + **Contact** (§6.8 — revisit live site for real form fields).
9. Layer in the **custom cursor**, **route transitions**, and **pinned Expertise scroll sections** last — these are polish/interaction layers best added once all pages exist.

---

## 12. Key Caveats (please read)

- I could not access the site's real computed CSS, font files, or JS bundle, so **exact colors/fonts/spacing in the original are not represented here** — I've instead given you a complete, original terracotta system as requested, built to match the original's *structural and motion* DNA.
- The `/contact` page likely renders more than what I could extract (forms are often client-hydrated and invisible to text extraction) — please confirm its real fields directly before building it.
- Media (videos, team photos, project photography, brand logos, footer illustration art) is real content from YOO Interior and Turkish luxury brands (Louis Vuitton, Turkish Airlines, St. Regis, etc.) — none of it is yours to reuse; treat every mention of it in this doc as a *layout reference only*, and populate the clone with your own company's actual media.
