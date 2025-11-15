# Jai Hind Store — Copilot Instructions

## Project Overview
**Jai Hind Store** is a React + Vite e-commerce SPA selling NCC (National Cadet Corps) uniforms, badges, belts, and parade accessories. Deployed on Firebase Hosting (`jaihindstore-daa10`). Built with React Router for multi-page navigation.

## Architecture & Key Patterns

### Project Structure
- **`src/pages/`** — Route components (Home, About, Contact, Services, Product_details)
- **`src/styles/`** — CSS modules for each page (NOT scoped—use class naming convention)
- **`src/Components/`** — Reusable UI (Card.jsx, Navbar.jsx, Footer.jsx)
- **`src/Product_data/`** — Static product catalog (Products_data.js with dynamic Vite glob imports)
- **`src/Authentication_Page/`** — Login page stub (not integrated into main flow)
- **`src/Firebase_data_base/`** — Firestore initialization (contacts collection only)
- **`src/Assets/`** — Images with Vite glob imports for dynamic image loading

### Component Patterns
- **Page components** have `useEffect` scroll-to-top on mount: `window.scrollTo({ top: 0, behavior: 'smooth' })`
- **Card.jsx** is the reusable product card used in Home, Premium Collection, and elsewhere
  - Accepts `productIndex` prop to link to `/product-details/:id`
  - WhatsApp CTA button hardcoded to phone `919968362118`
- **Product_details.jsx** fetches product from `Products_data[id]` by URL param, supports multi-image galleries via `All_images` prop
- All pages use CSS modules (except global footer/navbar which use className strings)

### Styling Conventions
- **No Tailwind/CSS-in-JS** — vanilla CSS only
- **Color scheme**: Primary `#ff9900` (orange), Dark `#0F1111`, Light backgrounds `#f9fafb`
- **Responsive breakpoints**: 1024px, 768px, 480px, 360px (mobile-first approach with media queries)
- **CSS modules** for scoped styles (e.g., `Login_page.module.css`, `Card_style.css`)
  - Import as: `import style from './Login_page.module.css'` and use `className={style.className}`
- **Global styles scattered** across `/styles/` (Header_style, Home_style, Card_style, etc.)
  - Use dash-separated class names: `.products-row`, `.card-badge`, `.premium-collection-section`

### Firebase Integration
- **Firestore**: contacts collection (write-only for public, no auth required)
- **Config stored** in `src/Firebase_data_base/Firebase.js` (deployed publicly—API key visible in code)
- **Security**: Current rules allow public read/write to contacts (⚠️ insecure; see FIRESTORE_RULES.md for recommended rules)
- **Contact form** (Contact.jsx) validates input, then `addDoc(collection(db, "contacts"), { name, email, message, timestamp })`

### Routing Structure
```javascript
// src/main.jsx
{
  path: '/',
  element: <App />,
  children: [
    { path: '', element: <Home /> },
    { path: '/about', element: <About /> },
    { path: '/contact', element: <Contact /> },
    { path: '/services', element: <Services /> },
    { path: '/product-details/:id', element: <Product_details /> },
    { path: '/Login_page', element: <Login_page /> }
  ]
}
```
- Root layout wraps Navbar + Outlet + Footer (App.jsx)

### Dynamic Image Loading
**Products_data.js** uses Vite's `import.meta.glob()` for batch image imports:
```javascript
const dmsModules = import.meta.glob("../Assets/DMS_Images/*.{jpg,png,jpeg,svg}", { eager: true });
const toUrlArray = (mods) => Object.values(mods || {}).map((m) => m?.default || m).filter(Boolean);
const Dms_images = toUrlArray(dmsModules);
```
- Each product can have `All_images` array for multi-image galleries (see Product_details.jsx)

## Development Workflow

### Local Development
```bash
npm install
npm run dev  # Starts Vite dev server on port 3000
```

### Build & Deploy
```bash
npm run build  # Outputs to /dist
firebase deploy  # Deploys to Firebase Hosting
```

### Build Configuration
- **Vite config** (vite.config.js): React plugin enabled, dev server port 3000
- **Firebase rewrites** (firebase.json): All routes → `/index.html` (SPA mode)

## Common Tasks & Conventions

### Adding a New Product
1. Add to `Products_data.js` array with fields: `imageUrl`, `title`, `subtitle`, `price`, `mrp`, `rating`, `reviews`, `badge`, `All_images` (optional)
2. Use `toUrlArray()` helper if adding new multi-image categories
3. Products auto-render in Home via map over `card_data`

### Styling a New Page
1. Create `NewPage_style.css` in `src/styles/`
2. Use dash-separated class names for consistency
3. Add responsive breakpoints: 768px, 480px, 360px media queries
4. Link colors always `#ff9900` (orange hover/active states)

### Firestore Queries
- Contact form only writes to `contacts` collection
- All documents auto-timestamped and store `{ id, name, email, message, timestamp }`
- No read queries in UI (data retrieved server-side or admin console only)

### Error Handling
- Contact form shows inline `.error-message` / `.success-message` divs
- Firebase errors logged to console; user sees generic message + specific error codes
- WhatsApp CTA never fails (opens external URL)

### State Management
- **No Redux/Context** — all state local to component (useState)
- Scroll position reset on page navigation via useEffect
- Form state cleared on success

## Accessibility & Mobile
- **Semantic HTML**: `<section>`, `<nav>`, `<footer>`, `<article>` roles where appropriate
- **ARIA attributes**: `role="list"`, `aria-label`, `aria-pressed` on interactive elements
- **Mobile nav**: Hidden on desktop, visible on 768px and below (mobile-nav class)
- **Touch-friendly**: Min 44px buttons on mobile, overscroll behavior optimized
- **Responsive images**: `loading="lazy"` on product images, no hardcoded aspect ratios (use flexbox)

## Known Issues & Notes
- Login page not integrated (Authentication_Page stub exists but no auth flow)
- Firebase API key exposed (OK for public read-only, but apply security rules in FIRESTORE_RULES.md for production)
- CSS modules not scoped—relies on naming conventions to avoid conflicts
- Product images stored locally in Assets, not CDN (may need optimization for production)
- Typo in Home.jsx: "Services" nav link shows "Serumvices" (should be "Services")

## Tips for Productivity
- **Reuse Card.jsx** for product displays (Home featured, premium collection, new arrivals all use it)
- **Copy responsive breakpoints** from existing styles (Home_style.css is comprehensive reference)
- **Test contact form** with Firebase emulator: `firebase emulators:start` (requires setup)
- **Check CSS class naming** before adding—avoid `.product-card` if `.product-card` exists elsewhere
- **Scroll behavior** is always smooth (`behavior: 'smooth'`) and top-aligned on route change

