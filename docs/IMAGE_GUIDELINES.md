# Image Asset Guidelines - 月瀬庵 (Tsukise-an)

## Naming Convention

All images in `public/images/` follow the pattern:

```
{page}-{section}-{descriptor}.{ext}
```

### Examples

| File | Page | Section | Descriptor |
|------|------|---------|------------|
| `top-hero-main.png` | top | hero | main |
| `top-room-main.png` | top | room | main |
| `top-cuisine-hassun.png` | top | cuisine | hassun |
| `top-stay-1500.png` | top | stay | 1500 (time) |
| `shared-cta-bg.png` | shared | cta | bg |
| `rooms-tsukimi-exterior.jpg` | rooms | tsukimi | exterior |

### Page Prefixes

| Prefix | Description |
|--------|------------|
| `top-` | Top page (/) |
| `rooms-` | Rooms page (/rooms) |
| `onsen-` | Onsen page (/onsen) |
| `cuisine-` | Cuisine page (/cuisine) |
| `experience-` | Experience page (/experience) |
| `access-` | Access page (/access) |
| `reservation-` | Reservation page (/reservation) |
| `news-` | News page (/news) |
| `shared-` | Shared across multiple pages |

### Section Names

Use the component/section name in lowercase:
- `hero` - Hero/banner images
- `concept` - Concept section backgrounds
- `room` / `onsen` / `cuisine` / `stay` - Section-specific
- `info` - Information/access section
- `cta` - Call-to-action section

### Descriptors

- `main` - Primary image for a section
- `bg` - Background/texture image
- `{time}` - Timeline images by hour (e.g., `1500` for 15:00)
- `{name}` - Named item (e.g., `hassun`, `yakimono`, `mizugashi`)
- `exterior` / `interior` - Room/facility views

---

## next/image Usage Patterns

### Import

```tsx
import Image from 'next/image'
```

### Above-the-fold (Hero Images)

```tsx
<Image
  src="/images/top-hero-main.png"
  alt="descriptive alt text"
  fill
  className="object-cover"
  priority          // LCP optimization
  quality={85}
  sizes="100vw"
/>
```

### Section Images (below-fold)

```tsx
<Image
  src="/images/top-room-main.png"
  alt="descriptive alt text"
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 768px, 1440px"
/>
```

### Grid/Card Images

```tsx
<Image
  src="/images/top-cuisine-hassun.png"
  alt="descriptive alt text"
  fill
  className="object-cover"
  sizes="(max-width: 767px) 100vw, 33vw"
/>
```

### Key Props Reference

| Prop | When to Use | Value |
|------|------------|-------|
| `priority` | Above-fold images only (Hero) | `true` |
| `quality` | Default for all images | `{85}` |
| `sizes` | Always specify for `fill` images | Responsive breakpoints |
| `placeholder` | Large hero/background images | `"blur"` (requires `blurDataURL`) |
| `fill` | When parent has relative positioning | `true` |

### `sizes` Patterns by Component Type

| Component | sizes |
|-----------|-------|
| Full-width hero | `100vw` |
| ImgText section image | `(max-width: 767px) 100vw, (max-width: 1023px) 450px, 58.6vw` |
| 3-column grid | `(max-width: 767px) 100vw, 33vw` |
| 4-column timeline | `(max-width: 767px) 100vw, 25vw` |
| Map/info image | `560px` |

---

## Recommended Formats

- **Source**: Any format (PNG, JPEG)
- **Served**: WebP (Next.js automatically converts via `next/image`)
- **No manual conversion needed**: `next/image` handles format negotiation

---

## Size Guidelines

| Usage | Max Dimensions | Notes |
|-------|---------------|-------|
| PC hero background | 1440 x 780 px | Full viewport width |
| Section images (ImgText) | 800 x 600 px | Responsive scaling |
| Grid card images | 480 x 360 px | 3-4 column layouts |
| Timeline images | 340 x 240 px | Small thumbnails |
| Background textures | 1024 x 1024 px | Tiling/cover patterns |
| Page hero backgrounds | 1440 x 400 px | Inner page banners |
| Map images | 560 x 400 px | Static map display |

### File Size Targets

- Hero images: < 200 KB (after WebP conversion)
- Section images: < 150 KB
- Card/thumbnail images: < 80 KB
- Background textures: < 100 KB

---

## Current Asset Inventory

### Existing Images (public/images/)

| File | Dimensions | Size | Used In |
|------|-----------|------|---------|
| `top-hero-main.png` | 1024x1024 | 1.4 MB | HeroSection |
| `top-concept-bg.png` | 1024x1024 | 1.3 MB | ConceptSection (bg) |
| `top-room-main.png` | 1024x1024 | 1.5 MB | RoomSection |
| `top-onsen-main.png` | 1024x1024 | 1.7 MB | OnsenSection |
| `top-cuisine-bg.png` | 1024x1024 | 1.6 MB | CuisineSection (bg) |
| `top-cuisine-hassun.png` | 1024x1024 | 1.6 MB | CuisineSection |
| `top-cuisine-yakimono.png` | 1024x1024 | 1.5 MB | CuisineSection |
| `top-cuisine-mizugashi.png` | 1024x1024 | 1.3 MB | CuisineSection |
| `top-stay-bg.png` | 1024x1024 | 1.4 MB | StaySection (bg) |
| `top-stay-0800.png` | 1024x1024 | 1.4 MB | StaySection |
| `top-stay-1000.jpg` | 800x1200 | 76 KB | StaySection |
| `top-stay-1100.png` | 1024x1024 | 1.9 MB | StaySection |
| `top-stay-1500.png` | 1024x1024 | 1.4 MB | StaySection |
| `top-stay-1530.jpg` | 800x530 | 136 KB | StaySection |
| `top-stay-1600.jpg` | 800x533 | 96 KB | StaySection |
| `top-stay-1700.jpg` | 1080x720 | 220 KB | StaySection |
| `top-stay-1830.png` | 1024x1024 | 1.5 MB | StaySection |
| `top-stay-2000.jpg` | 800x1200 | 100 KB | StaySection |
| `top-stay-2100.png` | 1024x1024 | 1.4 MB | StaySection |
| `shared-cta-bg.png` | 1024x1024 | 1.2 MB | CTASection |
| `top-info-map.png` | 1024x1024 | 1.3 MB | InfoSection |

### Observation

All AI-generated PNG images are 1024x1024. These are larger than needed for most use cases. When production images are sourced, they should be sized to the recommended dimensions above.

---

## Missing Images (Placeholder / Not Yet Created)

### Page Hero Backgrounds

None of the inner pages currently pass a `backgroundImage` prop to `PageHero`. The following are needed:

| Page | Proposed File | Status |
|------|--------------|--------|
| /rooms | `rooms-hero-bg.jpg` | Missing |
| /onsen | `onsen-hero-bg.jpg` | Missing |
| /cuisine | `cuisine-hero-bg.jpg` | Missing |
| /experience | `experience-hero-bg.jpg` | Missing |
| /access | `access-hero-bg.jpg` | Missing |
| /reservation | `reservation-hero-bg.jpg` | Missing |
| /news | `news-hero-bg.jpg` | Missing |
| /contact | `contact-hero-bg.jpg` | Missing |
| /faq | `faq-hero-bg.jpg` | Missing |

### Experience Page Section Backgrounds

CSS variables referenced but undefined:
- `--experience-activities-bg`
- `--experience-seasons-bg`
- `--experience-timeline-bg`

### Reservation Page Images

Referenced in code but files do not exist:
- `/images/plans/standard.jpg`
- `/images/plans/anniversary.jpg`
- `/images/plans/consecutive.jpg`
- `/images/rooms/tsukimi.jpg`
- `/images/rooms/kacho.jpg`
- `/images/rooms/fuga.jpg`
- `/images/rooms/mikagami.jpg`

### Design (.pen) Images Not Yet Exported

The .pen design file references 70 unique images stored in `design/images/` as `generated-*.png`. These need to be exported and renamed per convention for pages that are not yet implemented:
- Rooms page: 8 room grid card images, amenities, facilities
- Onsen page: water quality section, concept image
- Cuisine page: 6 kaiseki menu items, concept image
- Experience page: 4 season images, facilities intro, activities, timeline
- Access page: map section
- News page: article cards, eyecatch, related articles
- Reservation page: room selection cards, plan cards

---

## Future Optimization Steps

1. **Replace AI placeholders with production photography** - Source professional photos at recommended dimensions
2. **Generate blurDataURL** for hero images - Use `plaiceholder` or similar library
3. **Resize source images** - Crop/resize to recommended dimensions before committing
4. **Consider responsive image variants** - Only if above-the-fold metrics require it
5. **Add OG images** for social sharing - `og-image.jpg` at 1200x630
