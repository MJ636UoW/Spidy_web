# Spider-Man × Venom — Dual-Theme Interactive Site

An interactive, high-fidelity fan platform built with **React**, **Vite**, **Tailwind CSS v4**, and **Framer Motion**. Visitors can choose between two completely customized dashboards dedicated to either Spider-Man or Venom, each loaded with details, specs, and animations.

Live URL: [https://mj636uow.github.io/Spidy_web/](https://mj636uow.github.io/Spidy_web/)

## Signature Features

- **Split-Screen Entrance**: A full-viewport vertical split choice screen (`/`) separating Spider-Man (left) and Venom (right). Hovering/focusing expands and brightens the chosen side while dimming the other.
- **Wipe Route Transitions**: Navigation is connected by solid-color full-screen wipes (Web-Red for Spider-Man, Symbiote-Bone for Venom) that sweep across the screen during route changes.
- **Spring-Smooth Mask Reveal**: The centerpiece header unmasks the hero's portrait to reveal the face underneath (Peter Parker under Spider-Man, Eddie Brock under Venom) inside a soft circular mask.
  - Smooth mouse movement is driven by custom Framer Motion spring values directly updating CSS custom properties (`--x`, `--y`, `--r`) in the DOM for 60fps+ rendering.
  - On touch devices, mouse hover falls back to drag-to-reveal gestures.
  - An inactivity timer launches a slow figure-8 Lissajous path drift if the screen is idle for 3 seconds.
- **Responsive Spec Sheet Cards**: Grid cards displaying stats and taglines in the IBM Plex Mono utility font. Cards lift and glow (`theme-glow`) dynamically.
- **Holographic Clip Modals**: Modals opening with scale/fade animations, backdrop blur, background scroll-locking, Escape closures, and a full accessibility focus-trap. Features looping vector animations.
- **Interactive Cursor Trails**: Custom canvas-based trails on dashboards. Draws thin connecting spider-web lines for Spider-Man and dripping symbiote blobs for Venom.
- **Accessibility & Motion Compliance**: Fully supports keyboard navigation (Tab/Enter focus states) and respects OS-level `prefers-reduced-motion` settings.

---

## Tech Stack

- **Core**: React 19, Vite 8, JavaScript
- **Styling**: Tailwind CSS v4, Vanilla CSS variables
- **Animations**: Framer Motion
- **Hosting**: GitHub Pages

---

## Local Development

### 1. Clone & Install
```bash
git clone https://github.com/MJ636UoW/Spidy_web.git
cd Spidy_web
npm install
```

### 2. Start Dev Server
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your web browser.

### 3. Build & Local Preview
```bash
npm run build
npm run preview
```

---

## Customizing Assets
The site is built to run out-of-the-box with custom, high-fidelity vector illustrations. To add official artwork, place files in the following folders:
- **Spider-Man suit**: `src/assets/spiderman/suit.png`
- **Peter Parker face**: `src/assets/spiderman/face.png`
- **Venom suit**: `src/assets/venom/suit.png`
- **Eddie Brock face**: `src/assets/venom/face.png`
The code will automatically prioritize and load these images if they are present.
