---
name: framer-motion
description: Motion (formerly Framer Motion) patterns for React / Next.js App Router. Use when adding entrance animations, scroll-linked effects, layout/shared-element transitions, gestures, page transitions, or any animated UI in this project.
---

# Motion (Framer Motion) for Next.js

Package: `motion` — import from `motion/react`. (`framer-motion` is the legacy alias; don't add both.)

## Ground rules

1. **Client leaves only.** Any file that imports `motion/react` starts with `"use client"`. Keep pages/sections as Server Components and wrap only the animated leaf.
2. **Reduced motion is mandatory.** Wrap the app in `<MotionConfig reducedMotion="user">`. For scroll-linked/parallax values, also check `useReducedMotion()` and return static values.
3. **Animate only `transform` and `opacity`** (x, y, scale, rotate, opacity, clipPath sparingly). Never animate width/height/top/left — use `layout` instead.
4. **Continuous values never go in `useState`.** Use `useMotionValue`, `useTransform`, `useSpring`, `useScroll`.
5. **One orchestrated moment per view.** A hero load sequence or one signature reveal beats fade-up on every section. Motion that responds to user action (open, expand, select, confirm) is always welcome.
6. **Timing:** micro-interactions 150–250ms; panels/menus 250–400ms; hero sequences ≤ 1.2s total. Exits ~70% of the enter duration.
7. **Easing:** default `[0.22, 1, 0.36, 1]` (ease-out-quint) for entrances; springs (`{ type: "spring", stiffness: 380, damping: 32 }`) for interactive/gesture feedback.

## Recipes

### Staggered entrance (hero)
```tsx
"use client";
import { motion, stagger } from "motion/react";
const container = { hidden: {}, show: { transition: { delayChildren: stagger(0.08) } } };
const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } };
<motion.div variants={container} initial="hidden" animate="show">
  <motion.h1 variants={item} /> <motion.p variants={item} />
</motion.div>
```

### Reveal on scroll (use sparingly)
```tsx
<motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }} />
```

### Scroll-linked parallax
```tsx
const ref = useRef(null);
const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
const reduce = useReducedMotion();
const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-40, 40]);
<motion.div ref={ref} style={{ y }} />
```

### Shared-element / tab indicator
```tsx
{active === id && <motion.span layoutId="tab-pill" className="absolute inset-0 rounded-full bg-..." transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
```

### Presence (menus, modals, toasts)
```tsx
<AnimatePresence mode="wait">{open && <motion.div key="menu" initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-6}} />}</AnimatePresence>
```

### Number / text swap (split-flap, counters)
Key the element by its value inside `AnimatePresence mode="popLayout"` and animate `y`/`rotateX` in and out.

### Gestures
`whileHover={{ y: -2 }}`, `whileTap={{ scale: 0.97 }}` on buttons; `drag="x"` with `dragConstraints` for carousels.

## Checklist before shipping
- [ ] `"use client"` on every Motion file; server sections stay server
- [ ] `MotionConfig reducedMotion="user"` at root; parallax disabled under reduced motion
- [ ] No layout-thrashing properties animated
- [ ] No infinite decorative loops except one deliberate ambient element
- [ ] Content is readable with JS disabled / before hydration (no permanently `opacity: 0` SSR without fallback above the fold)
