# Reusable Patterns Catalog

> Phase 1 (Top Page) implementation from which Phase 2 (12 internal pages) should draw.
> This document is the single reference for layout patterns, CSS variable conventions,
> and shared component APIs established during top-page development.

---

## Table of Contents

1. [ImgText / TextImg Pattern](#1-imgtext--textimg-pattern)
2. [Background Image Section Pattern](#2-background-image-section-pattern)
3. [Card Grid Pattern](#3-card-grid-pattern)
4. [SectionLabel + SectionTitle Pattern](#4-sectionlabel--sectiontitle-pattern)
5. [Two-Column Info Pattern](#5-two-column-info-pattern)
6. [CSS Variable Naming Conventions](#6-css-variable-naming-conventions)
7. [Shared Components Reference](#7-shared-components-reference)
8. [Typography Scale](#8-typography-scale)
9. [Color System](#9-color-system)

---

## 1. ImgText / TextImg Pattern

**Established in:** `RoomSection` (ImgText) / `OnsenSection` (TextImg)
**Source:** `src/components/top/RoomSection.tsx`, `src/components/top/OnsenSection.tsx`

### What it is

A full-width two-panel layout: one panel is an image, the other is text content.
The panels sit side by side on PC/Tablet and stack vertically on Mobile.

### Layout Classes

| Class | PC (>=1024) | Tablet (768-1023) | Mobile (<768) |
|---|---|---|---|
| `.r-imgtext-layout` | `flex-direction: row` | `row` | `column` |
| `.r-textimg-layout` | `flex-direction: row` | `row` | `column-reverse` |

The key difference: `.r-textimg-layout` uses `column-reverse` on mobile so the image
appears on top, preserving visual hierarchy even when source order is text-first.

### CSS Variables Used

```css
--r-imgtext-img-width    /* PC: 800px, Tablet: 450px, Mobile: 100% */
--r-imgtext-img-h        /* PC: auto, Tablet: auto, Mobile: 280px */
--r-imgtext-padding      /* PC: 80px, Tablet: 40px 36px, Mobile: 32px 32px 60px 32px */
--r-imgtext-gap          /* PC: 32px, Tablet: 24px, Mobile: 32px */
--r-imgtext-label-line-w /* PC: 30px, Tablet: 24px, Mobile: 30px */
--r-imgtext-label-gap    /* PC: 16px, Tablet: 12px, Mobile: 16px */
--r-imgtext-label-ls     /* PC: 5px, Tablet: 4px, Mobile: 5px */
--r-imgtext-link-gap     /* PC: 12px, Tablet: 10px, Mobile: 12px */
--r-imgtext-link-arrow   /* PC: 16px, Tablet: 14px, Mobile: 16px */
```

### Color Variants

| Variant | Background | Text Color | Label Color | Link Color |
|---|---|---|---|---|
| **Dark** (Room) | `--ryokan-dark` | `--ryokan-text-on-dark` | `--ryokan-gold` | `--ryokan-light-gold` |
| **Light** (Onsen) | `--ryokan-light-bg` | `--ryokan-dark` | `--ryokan-gold` | `--ryokan-gold` |

### Structure Template

```tsx
<section className="r-imgtext-layout w-full overflow-hidden">
  {/* Image Panel */}
  <div className="relative overflow-hidden"
    style={{
      width: 'var(--r-imgtext-img-width)',
      height: 'var(--r-imgtext-img-h)',
      flexShrink: 0,
      minHeight: 280,
    }}>
    <Image src="..." alt="..." fill className="object-cover"
      sizes="(max-width: 767px) 100vw, (max-width: 1023px) 450px, 800px" />
  </div>

  {/* Text Panel */}
  <div className="flex flex-col justify-center"
    style={{
      flex: 1,
      backgroundColor: 'var(--ryokan-dark)',  /* or --ryokan-light-bg */
      padding: 'var(--r-imgtext-padding)',
      gap: 'var(--r-imgtext-gap)',
    }}>
    {/* Section Label */}
    {/* Title (h2) */}
    {/* Description (p) */}
    {/* Link with ArrowRight icon */}
  </div>
</section>
```

### Phase 2 Reuse Targets

- **Rooms Detail Page** -- Room variants with dark background
- **Onsen Detail Page** -- Onsen variants with light background
- **Cuisine Detail Page** -- Chef/ingredient sections
- Any section that pairs a large image with descriptive text

---

## 2. Background Image Section Pattern

**Established in:** `CuisineSection`, `StaySection`, `ConceptSection`
**Source:** `src/components/top/CuisineSection.tsx`, `src/components/top/StaySection.tsx`

### What it is

A full-width section with a background image, overlay content centered vertically
and horizontally. Used for atmospheric, visually rich sections.

### CSS Variables Used

```css
--r-center-px   /* PC: 80px, Tablet: 40px, Mobile: 24px */
--r-center-py   /* PC: 100px, Tablet: 80px, Mobile: 60px */
--r-center-gap  /* PC: 60px, Tablet: 48px, Mobile: 40px */
```

### Structure Template

```tsx
<section
  className="flex w-full flex-col items-center"
  style={{
    padding: 'var(--r-center-py) var(--r-center-px)',
    gap: 'var(--r-center-gap)',
    backgroundImage: 'url(/images/section-bg.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}>
  {/* SectionLabel */}
  {/* SectionTitle (h2) */}
  {/* Description */}
  {/* Content (grid, cards, etc.) */}
</section>
```

### Key Points

- Background images are applied via inline `style` (not CSS classes) because each
  section uses a unique image.
- Content is centered with `items-center` on the flex column.
- Text color is typically `--ryokan-text-on-dark` or `--ryokan-dark` depending
  on background darkness.
- The `ConceptSection` uses a lighter background image with dark text; `CuisineSection`
  uses a darker background with light text.

### Phase 2 Reuse Targets

- **Experience Detail Page** -- Timeline with atmospheric background
- Any section needing a full-bleed image behind centered content

---

## 3. Card Grid Pattern

**Established in:** `CuisineSection` (dish cards), `StaySection` (timeline cards)
**Source:** `src/components/top/CuisineSection.tsx`, `src/components/top/StaySection.tsx`

### Cuisine Grid (`.r-cuisine-grid`)

| Viewport | Columns |
|---|---|
| PC (>=1024) | 3 columns |
| Tablet (768-1023) | 2 columns |
| Mobile (<768) | 1 column |

```css
.r-cuisine-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--r-grid-gap);      /* PC: 24px, Tablet: 16px, Mobile: 24px */
  width: 100%;
}
```

### Stay/Timeline Grid (`.stay-grid`)

Two variants for different column counts:

| Class | PC | Tablet | Mobile |
|---|---|---|---|
| `.stay-grid--4` | 4 columns | 2 columns | 1 column |
| `.stay-grid--3` | 3 columns | 2 columns | 1 column |

```css
.stay-grid {
  display: grid;
  width: 100%;
  gap: var(--r-timeline-gap);  /* PC: 32px, Tablet: 16px, Mobile: 32px */
}
```

### Card Item Pattern (`.stay-card`)

```css
.stay-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding-top: 8px;
  min-width: 0;
}
```

### Card Structure Template

```tsx
<div className="flex flex-col items-center" style={{ gap: 16, paddingBottom: 24 }}>
  {/* Image container with fixed height */}
  <div className="relative w-full overflow-hidden" style={{ height: 'var(--r-dish-h)' }}>
    <Image src="..." alt="..." fill className="object-cover"
      sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw" />
  </div>
  {/* Title (h3) */}
  {/* Description (p) */}
</div>
```

### Responsive Image Heights

| Variable | PC | Tablet | Mobile |
|---|---|---|---|
| `--r-dish-h` | 300px | 220px | 200px |
| `--r-timeline-img-h` | 200px | (inherited) | 160px |

### Phase 2 Reuse Targets

- **Rooms List Page** -- Room type cards (3-col grid)
- **Onsen Types Page** -- Different bath cards
- **Cuisine Menu Page** -- Seasonal dish cards
- **Experience Page** -- Activity cards

---

## 4. SectionLabel + SectionTitle Pattern

**Established in:** All sections (shared components)
**Source:** `src/components/shared/SectionLabel/`, `src/components/shared/SectionTitle/`

### SectionLabel

A centered label with decorative lines on both sides. Used above section titles.

```tsx
import { SectionLabel } from '@/components/shared/SectionLabel'

<SectionLabel english="ROOMS" />
<SectionLabel english="CUISINE" variant="gold" />
```

**Props:**

| Prop | Type | Default | Description |
|---|---|---|---|
| `english` | `string` | required | English section name (uppercase) |
| `variant` | `'default' \| 'gold'` | `'default'` | Color variant |

**Variant Colors:**

| Variant | Text Color | Line Color |
|---|---|---|
| `default` | `--ryokan-subtle` (#8B7D6B) | `--ryokan-light-gold` (#D4C5A0) |
| `gold` | `--ryokan-gold` (#8B6914) | `--ryokan-gold` (#8B6914) |

**CSS Variables:**

```css
--r-section-label-size    /* 13px (all viewports) */
--r-section-label-ls      /* 5px */
--r-section-label-line-w  /* 40px */
--r-section-label-gap     /* 20px */
```

### SectionTitle

A centered h2 heading. Decorative lines are composed per-section, not built into this component.

```tsx
import { SectionTitle } from '@/components/shared/SectionTitle'

<SectionTitle>月瀬庵での過ごし方</SectionTitle>
```

**Props:**

| Prop | Type | Description |
|---|---|---|
| `children` | `string` | Section title text |

**CSS Variables:**

```css
--r-section-title-size  /* PC: 32px */
--r-section-title-ls    /* PC: 6px */
```

### Usage Notes

- Some sections (Room, Onsen, Info) use inline label markup rather than the shared
  `SectionLabel` component, because they require a single-line variant (line on left only).
- When using the shared component, it always renders **two lines** (left and right).
- For sections that need only a left-side line, use inline markup following the
  Room/Onsen pattern.

---

## 5. Two-Column Info Pattern

**Established in:** `InfoSection`
**Source:** `src/components/top/InfoSection.tsx`

### What it is

A side-by-side layout with two content columns (e.g., News + Access).
Stacks to a single column on tablet and below.

### Layout Class

```css
.r-info-layout {
  display: flex;
  flex-direction: row;      /* PC */
}

/* Tablet & below: stack */
@media (max-width: 1023px) {
  .r-info-layout { flex-direction: column; }
}
```

### Column Width

```css
.r-info-access-col {
  width: 560px;       /* PC: fixed width */
  flex-shrink: 0;
}

@media (max-width: 1023px) {
  .r-info-access-col {
    width: 100%;       /* Tablet/Mobile: full width */
    flex-shrink: 1;
  }
}
```

### CSS Variables Used

```css
--r-info-padding  /* PC: 80px, Tablet: 48px, Mobile: 32px */
--r-info-gap      /* PC: 60px, Tablet: 40px, Mobile: 32px */
--r-map-h         /* PC: 200px, Mobile: 180px */
```

### Structure Template

```tsx
<section className="r-info-layout w-full"
  style={{
    backgroundColor: 'var(--ryokan-info-bg)',
    padding: 'var(--r-info-padding)',
    gap: 'var(--r-info-gap)',
  }}>
  {/* Column 1 (flex: 1) */}
  <div className="flex flex-1 flex-col" style={{ gap: 32 }}>
    {/* Content */}
  </div>

  {/* Column 2 (fixed width on PC) */}
  <div className="r-info-access-col flex flex-col" style={{ gap: 24 }}>
    {/* Content */}
  </div>
</section>
```

### Phase 2 Reuse Targets

- **Access Page** -- Map + transport details side by side
- **Contact Page** -- Form + contact info side by side
- Any page needing two balanced content columns

---

## 6. CSS Variable Naming Conventions

**Source:** `src/lib/css/ryokan-responsive.css`, `src/styles/design-tokens.css`

### Naming Pattern

```
--r-{scope}-{property}
```

| Prefix | Meaning | Example |
|---|---|---|
| `--r-` | Responsive variable (changes per breakpoint) | `--r-hero-height` |
| `--ryokan-` | Design token (constant across breakpoints) | `--ryokan-gold` |
| `--font-` | Font family variable | `--font-heading` |

### Scope Naming

| Scope | Used By | Example Variables |
|---|---|---|
| `hero` | HeroSection (top page only) | `--r-hero-height`, `--r-hero-title-size` |
| `subpage-hero` | PageHero (all internal pages) | `--r-subpage-hero-height` |
| `concept` | ConceptSection | `--r-concept-py`, `--r-concept-gap` |
| `imgtext` | RoomSection, OnsenSection | `--r-imgtext-img-width` |
| `center` | CuisineSection, StaySection | `--r-center-px`, `--r-center-py` |
| `cuisine` | CuisineSection-specific | `--r-cuisine-desc-size` |
| `stay` | StaySection-specific | `--r-stay-gap` |
| `info` | InfoSection | `--r-info-padding`, `--r-info-gap` |
| `cta` | CTASection | `--r-cta-height`, `--r-cta-gap` |
| `footer` | Footer | `--r-footer-py-top`, `--r-footer-px` |
| `nav` | Header navigation | `--r-nav-gap`, `--r-nav-size` |
| `title` | Shared title sizes | `--r-title-lg`, `--r-title-md` |
| `body` | Shared body text sizes | `--r-body-lg`, `--r-body-md` |
| `section-label` | SectionLabel component | `--r-section-label-size` |
| `section-title` | SectionTitle component | `--r-section-title-size` |
| `breadcrumb` | Breadcrumb | `--r-breadcrumb-py`, `--r-breadcrumb-px` |
| `content` | General content areas | `--r-content-gap`, `--r-content-padding` |

### Breakpoint System

| Name | Range | Media Query |
|---|---|---|
| **PC** | >= 1024px | `:root` (default) |
| **Tablet** | 768px - 1023px | `@media (max-width: 1023px)` |
| **Mobile** | < 768px | `@media (max-width: 767px)` |

**Convention:** PC values are the default in `:root`. Tablet and Mobile override
via max-width media queries in descending order.

### Adding New Variables for Phase 2

When creating new section-specific variables, follow this pattern:

```css
/* In ryokan-responsive.css */

/* PC (default) */
:root {
  --r-{newsection}-py: 100px;
  --r-{newsection}-px: 80px;
  --r-{newsection}-gap: 40px;
}

/* Tablet */
@media (max-width: 1023px) {
  :root {
    --r-{newsection}-py: 80px;
    --r-{newsection}-px: 40px;
    --r-{newsection}-gap: 32px;
  }
}

/* Mobile */
@media (max-width: 767px) {
  :root {
    --r-{newsection}-py: 60px;
    --r-{newsection}-px: 24px;
    --r-{newsection}-gap: 24px;
  }
}
```

---

## 7. Shared Components Reference

These components are used across all pages and imported from `src/components/shared/`.

### Header

```tsx
import { Header } from '@/components/shared/Header'
```

- Fixed-height navigation bar (`--r-header-height`)
- Desktop/Tablet: horizontal nav links + CTA button
- Mobile: hamburger menu triggering `MobileMenuOverlay`
- No props required

### Footer

```tsx
import { Footer } from '@/components/shared/Footer'
```

- Dark background (`--ryokan-darkest`)
- Three tiers: primary nav, secondary nav, legal + SNS
- Responsive: row on PC, wrapped/stacked on mobile
- No props required

### CTASection

```tsx
import { CTASection } from '@/components/shared/CTASection'
```

- Full-width call-to-action with background image + overlay
- Two buttons: primary (filled gold) and secondary (outline)
- Responsive button layout: row on PC/Tablet, column on Mobile (`.r-cta-btns`)
- No props required

### PageHero

```tsx
import { PageHero } from '@/components/shared/PageHero'

<PageHero
  title="客室"
  labelEn="ROOMS"
  subtitle="全八室の離れ"       // optional
  backgroundImage="/images/rooms-hero.png"  // optional, defaults to dark solid
/>
```

- Used as the hero section for all internal pages (not the top page)
- Centered layout with decorative label lines

### Breadcrumb

```tsx
import { Breadcrumb, type BreadcrumbItem } from '@/components/shared/Breadcrumb'

<Breadcrumb items={[
  { label: 'ホーム', href: '/' },
  { label: '客室' },
]} />
```

- Light background (`--ryokan-light-bg`)
- Last item rendered as plain text with `aria-current="page"`

### Standard Page Layout

Every internal page follows this composition:

```tsx
<div className="ryokan-page">
  <Header />
  <main>
    <PageHero title="..." labelEn="..." backgroundImage="..." />
    <Breadcrumb items={[...]} />
    {/* Page-specific sections */}
    <CTASection />
  </main>
  <Footer />
</div>
```

---

## 8. Typography Scale

**Source:** `src/styles/design-tokens.css`, `src/lib/css/ryokan-responsive.css`

### Font Families

| Variable | Font Stack | Usage |
|---|---|---|
| `--font-heading` | Noto Serif JP, serif | Section titles, h1-h3 |
| `--font-body` | Noto Sans JP, sans-serif | Body text, descriptions, links |
| `--font-accent` | Cormorant Garamond, serif | English labels (ROOMS, CUISINE, etc.), timestamps |

### Responsive Title Sizes

| Variable | PC | Tablet | Mobile | Usage |
|---|---|---|---|---|
| `--r-title-lg` | 38px | 28px | 24px | ImgText section titles |
| `--r-title-md` | 32px | 32px | 24px | Center section titles (Cuisine, Stay) |
| `--r-title-sm` | 28px | 24px | 22px | Smaller headings |
| `--r-title-xs` | 24px | -- | 22px | Info section headings |

### Responsive Body Sizes

| Variable | PC | Tablet | Mobile | Usage |
|---|---|---|---|---|
| `--r-body-lg` | 16px | -- | -- | Large body text |
| `--r-body-md` | 15px | 13px | 14px | Standard descriptions |
| `--r-body-sm` | 14px | -- | -- | Links, secondary text |
| `--r-body-xs` | 13px | -- | 12px | Timestamps, captions |

### Letter Spacing Conventions

| Element | Letter Spacing |
|---|---|
| Section labels (English) | 5px |
| Headings (Japanese) | 2-6px (varies by size) |
| Body text | 1-1.5px |
| Links / CTAs | 2-3px |

---

## 9. Color System

**Source:** `src/styles/design-tokens.css`

### Background Colors

| Token | Hex | Usage |
|---|---|---|
| `--ryokan-bg` | #FAF8F3 | Page background, header |
| `--ryokan-light-bg` | #EEEBE3 | Onsen text panel, breadcrumb |
| `--ryokan-light-bg-alt` | #F5F0E8 | Alternative light background |
| `--ryokan-dark` | #2C2418 | Room text panel, dark sections |
| `--ryokan-darkest` | #1A150E | Footer background |
| `--ryokan-info-bg` | #F0EBE0 | Info section background |
| `--ryokan-hero-overlay` | #1A150E77 | Hero image overlay |

### Text Colors

| Token | Hex | Usage |
|---|---|---|
| `--ryokan-text-on-dark` | #FAF8F3 | White text on dark backgrounds |
| `--ryokan-muted` | #4A4035 | Primary body text on light backgrounds |
| `--ryokan-subtle` | #8B7D6B | Secondary/muted text, labels |
| `--ryokan-secondary` | #6B5D4F | Tertiary text |
| `--ryokan-text-subtle` | #C4B89A | Light text on dark image backgrounds |

### Accent Colors

| Token | Hex | Usage |
|---|---|---|
| `--ryokan-gold` | #8B6914 | Primary accent, labels, buttons |
| `--ryokan-light-gold` | #D4C5A0 | Decorative lines, borders, secondary accent |
| `--ryokan-soft-line` | #D4C5A055 | Subtle decorative lines |

### Dark vs Light Section Quick Reference

| Background | Title Color | Body Color | Label Color | Link Color |
|---|---|---|---|---|
| `--ryokan-dark` | `--ryokan-text-on-dark` | `--ryokan-light-gold` | `--ryokan-gold` | `--ryokan-light-gold` |
| `--ryokan-light-bg` | `--ryokan-dark` | `--ryokan-muted` | `--ryokan-gold` | `--ryokan-gold` |
| `--ryokan-bg` (white) | `--ryokan-dark` | `--ryokan-muted` | `--ryokan-subtle` | `--ryokan-gold` |
| Background image (dark) | `--ryokan-text-on-dark` | `--ryokan-text-subtle` | `--ryokan-gold` | `--ryokan-light-gold` |
