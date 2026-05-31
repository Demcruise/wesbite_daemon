# Wireframe Template

A premium Next.js 15+ landing page template with a wireframe-stage aesthetic — neutral palette, hairline rails, and a signature ASCII dither shader. Designed for product teams that want a brand-ready scaffold on day one and a clean upgrade path as design and content land.

## Features

- ✅ **Next.js 15+** with App Router
- ✅ **TypeScript** (strict mode, `noUncheckedIndexedAccess`)
- ✅ **Tailwind CSS v4** with token-driven theming
- ✅ **Dark Mode** via next-themes (class-based)
- ✅ **Motion** via motion/react with reduced-motion support
- ✅ **WebGL Dither Shader** — interactive, theme-aware, transparent variant
- ✅ **Smooth Scroll** via Lenis with feature flag
- ✅ **SEO Ready** — metadata, Open Graph, Twitter cards
- ✅ **Accessibility** — skip links, focus rings, ARIA labels
- ✅ **Edge Compatible** — no Node-only APIs

## Sections Included

- **Header** — Sticky nav with corner ticks, mobile menu, animated entry
- **Hero** — Full-bleed dither shader with cursor-reactive shear
- **Value Prop** — Three-up benefit grid with hairline dividers
- **Logo Marquee** — Two-column vertical logo wall with edge-fade mask
- **How It Works** — Numbered step list with icon chips
- **Testimonials** — Dynamic headline + three-up cards (mobile carousel)
- **Showcase** — Horizontal card carousel with shared-layout morph overlay
- **Community** — Pinned scroll with shader backdrop and reduced-motion fallback
- **Pricing** — Three tiers, monthly/annual toggle, featured-card shader accent
- **FAQ** — Accessible accordion with measured-height transitions
- **Final CTA** — Inset shader plate with brand-toned headline
- **Footer** — Inverted card with link columns and back-to-top
- **Theme Switch** — Floating bottom-right toggle, hydration-safe

## Getting Started

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint errors |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |
| `npm run typecheck` | Run TypeScript type checking |

## Project Structure

```
├── app/
│   ├── globals.css         # Design tokens & base styles
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Home page
│   ├── robots.ts           # Dynamic robots.txt
│   ├── sitemap.ts          # Dynamic sitemap
│   ├── icon.svg            # Favicon
│   └── apple-icon.svg      # Apple touch icon
├── components/
│   ├── community.tsx       # Pinned scroll community section
│   ├── dither-shader.tsx   # WebGL ASCII dither shader (OGL)
│   ├── faq.tsx             # FAQ accordion
│   ├── final-cta.tsx       # Final CTA with shader plate
│   ├── footer.tsx          # Inverted footer card
│   ├── header.tsx          # Sticky header with mobile menu
│   ├── logo-marquee.tsx    # Vertical logo carousel
│   ├── pricing.tsx         # 3-tier pricing with billing toggle
│   ├── providers.tsx       # Theme & smooth-scroll providers
│   ├── section-corners.tsx # Decorative rail-corner ticks
│   ├── showcase.tsx        # Card carousel with morph overlay
│   ├── smooth-scroll.tsx   # Lenis smooth-scroll wrapper
│   ├── testimonials.tsx    # Testimonials with mobile carousel
│   └── theme-switch.tsx    # Floating theme toggle
├── lib/
│   ├── config.ts           # Feature flags
│   ├── metadata.ts         # SEO metadata utilities
│   └── motion.tsx          # Motion components & hooks
└── public/
    └── site.webmanifest    # PWA manifest
```

## Customization

### 1. Update Site Configuration

Edit `lib/metadata.ts` to update:
- Site name, description, and URL
- Social media handles
- Keywords and authors

Edit `lib/config.ts` to toggle features:

```typescript
export const features = {
  smoothScroll: true, // Lenis smooth scroll (auto-disabled on reduced motion)
} as const;
```

### 2. Replace Icons and Brand

Replace the following files with your brand assets:
- `app/icon.svg` — Favicon (32x32)
- `app/apple-icon.svg` — Apple touch icon (180x180)
- `public/og-image.png` — Open Graph image (1200x630)

The wordmark `Frame` and the 20px square logo glyph live in `components/header.tsx` and `components/footer.tsx` — search for `Frame` to update both.

### 3. Customize Design Tokens

Edit `app/globals.css` to modify the palette. Tokens are exposed through Tailwind v4's `@theme inline` mapping:

```css
:root {
  --background: #ffffff;
  --foreground: #0a0a0a;
  --muted: #f5f5f5;
  --muted-foreground: #737373;
  --border: #e5e5e5;
  --ring: #0066ff;
}

.dark {
  --background: #0a0a0a;
  --foreground: #fafafa;
  --muted: #171717;
  --muted-foreground: #a3a3a3;
  --border: #262626;
}
```

The neutral scale (`neutral-50` through `neutral-950`) is also re-declared inside `@theme inline` and is used by the always-inverted footer card.

### 4. Tune the Dither Shader

`components/dither-shader.tsx` accepts two optional props:

- `variant: "hero" | "cta"` — `cta` uses a denser grid and slower time scale, suited for smaller card-sized canvases.
- `tone: { r: number; g: number; b: number }` — switches the shader to transparent mode and renders glyphs in the supplied RGB color (each channel `0..1`). Use this when the shader sits on a non-default surface.

The hero uses the default theme palette; the pricing featured card and final CTA use the `cta` variant; the community section uses a transparent overlay over `bg-background`.

## Design System

### Colors

- `--background` / `--foreground` — Page background and text
- `--muted` / `--muted-foreground` — Subtle surfaces and secondary text
- `--border` — Hairline rails and dividers
- `--ring` — Focus rings (blue accent)
- `neutral-*` — Always-on greyscale, used by the inverted footer

### Typography

- **Sans:** Geist Sans
- **Mono:** Geist Mono (used for eyebrow labels and pill CTAs)

### Layout Conventions

- Outer shell: `border-x border-border` rails inside `max-w-[1440px]` container
- Section padding: `p-6 sm:p-10 lg:p-14`
- Card-style anchor padding (footer, final CTA): `p-3 sm:p-4 lg:p-6` outer
- Decorative `<SectionCorners />` ticks at major dividers

## Accessibility

The template includes:
- Skip-to-content link
- Visible focus rings on all interactive elements
- ARIA labels and roles on carousels, accordions, and toggles
- Reduced motion support (Lenis + CSS animations + Motion)
- Proper heading hierarchy
- WCAG 2.1 AA contrast compliance in both themes

## Performance

- Optimized images via Next.js Image component
- WebGL context cleanup on unmount (no leaked GL resources)
- Single mount-once shader effect; uniforms updated via refs
- Smooth scroll respects reduced-motion preferences
- Edge-compatible runtime

## License

This template is licensed for use in commercial projects. You may not resell or redistribute the template itself.
