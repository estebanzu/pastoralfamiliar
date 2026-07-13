# Layout Roadmap

This document outlines structural, responsiveness, consistency, and UX gaps in the current layout of the Pastoral Familiar website, benchmarks these against modern community/church design standards, and outlines proposed improvements.

---

## Current Gaps

| Area | Issue | Severity | Section/File |
|------|-------|----------|---------------|
| **Navigation** | 10 links wrap onto multiple lines/logo on screens between 768px (md) and 1024px (lg). | **High** | `views/layout.ejs` (Header) |
| **Navigation** | Mobile menu dropdown is missing "Quiénes Somos" and "Misa en Vivo" links. | **High** | `views/layout.ejs` (Header) |
| **Navigation** | Mobile menu lacks top padding/gutters, squishing menu links against header. | **Medium** | `views/layout.ejs` (Header) |
| **Hero Sections** | Fixed hero heights (`h-[50vh]`, `h-[40vh]`) risk text overflow/truncation when zoomed or on small viewports. | **Medium** | `index.ejs`, `retiro-de-parejas.ejs`, `inscripcion-*.ejs`, `quienes-somos.ejs`, `consejeria-matrimonial.ejs`, `evangelio.ejs`, `misa-en-vivo.ejs`, `recursos.ejs` |
| **Grids** | Grids lack explicit mobile column definitions (`grid-cols-1`), relying on browser defaults. | **Low** | `index.ejs`, `quienes-somos.ejs`, `consejeria-matrimonial.ejs`, `recursos.ejs` |
| **Content List** | "Santo del Día" uses row flex (`flex items-start`) on mobile, squishing the circular icon container. | **Medium** | `views/evangelio.ejs` (Santo Section) |
| **Content List** | Eucaristías list uses row flex (`flex justify-between`) without mobile wrap, causing overlapping text columns on small viewports. | **Medium** | `views/misa-en-vivo.ejs` (Schedule) |
| **Footer** | Contact info columns list layout wraps email address awkwardly on narrow screens. | **Low** | `views/layout.ejs` (Footer) |
| **Consistency** | Section vertical padding fluctuates between `py-16` (64px), `py-12` (48px), and `py-8` (32px) without hierarchy. | **Low** | All views |
| **Consistency** | `.badge` horizontal padding uses `0.625rem` (10px) and `@keyframes slideDown` uses `translateY(-10px)`, which deviate from the 4px scale. | **Low** | `views/layout.ejs` (CSS Styles) |
| **UX/Accessibility** | Text link focus rings and skip-navigation links have inconsistent focus-visible offsets on focus states. | **Low** | `views/layout.ejs` |

---

## Benchmark Insights

### 1. Bellevue Presbyterian Church (belpres.org)
- **Pattern observed**: The header layout uses a clean 2-step navigation: primary dropdowns/directories on a secondary bar, and core actions prominent. It triggers its mobile toggle breakpoint at `1024px` instead of `768px`. Section layouts use `96px` (Tailwind `py-24`) vertical padding for major landings.
- **Why it works**: By pushing the mobile menu breakpoint to `lg` (1024px), it ensures the navigation links never wrap or overlap the logo on tablet viewports. The generous vertical padding (`96px` vs our standard `64px`) allows content to breathe and gives a premium community feel.
- **How it applies to us**: We should shift our navigation breakpoint from `md` (768px) to `lg` (1024px) to accommodate the 10 menu items and increase whitespace on main landing pages.

### 2. Grace Church (grace.org)
- **Pattern observed**: Responsive content tables and schedule listings collapse to vertical stacks on mobile, using unified gaps (like `gap-4`) and clear card borders. The layout container grid defaults to a standard container width of `1152px` (`max-w-6xl`) with consistent mobile gutters (`px-6` on tablet/mobile).
- **Why it works**: Collapsing row listings (like schedules or bios) into single-column vertical cards on mobile prevents horizontal scroll overflows and makes them easily readable.
- **How it applies to us**: Our schedule listings (Eucaristías) and bio boxes (Santo del día) should collapse cleanly to single-column flex configurations on small screens.

### 3. Parish of St. Matthew (stmatthews.org)
- **Pattern observed**: Forms and details lists are constrained to narrow layout containers (`max-w-2xl` / `672px`) for readability, using standard vertical spacings (`space-y-6`).
- **Why it works**: A narrow form is significantly easier to scan and fill out on both desktop and mobile viewports.
- **How it applies to us**: Ensure form views (like `inscripcion-retiro.ejs` and `inscripcion-catequesis.ejs`) stay constrained to a maximum width of `max-w-2xl` with a consistent gutter.

---

## Proposed Improvements

| Improvement | Rationale | Effort | Priority |
|-------------|-----------|--------|----------|
| **Responsive Nav Header Breakpoint** | Change nav show/hide and mobile toggle breakpoints from `md` (768px) to `lg` (1024px) to prevent wrapping links. | Small | **High** |
| **Complete Mobile Menu links** | Add missing "Quiénes Somos" and "Misa en Vivo" pages to the mobile menu list and add `pt-2` top spacing. | Small | **High** |
| **Overflow-Safe Heroes** | Convert fixed hero heights (`h-[40vh]`, `h-[50vh]`) to safe minimum height containers (`min-h-[40vh]`, `min-h-[50vh]`) with vertical padding. | Small | **High** |
| **Eucaristías Responsive Wrap** | Update list columns in `misa-en-vivo.ejs` to stack vertically (`flex-col`) on small screens and row-flex on `sm`. | Small | **Medium** |
| **Santo del Día Responsive Stacking** | Refactor Santo del día flex row to use `flex-col md:flex-row` and center align text/button on mobile. | Small | **Medium** |
| **Explicit Grid Mobile Columns** | Add explicit `grid-cols-1` to grids in all templates (`index.ejs`, `quienes-somos.ejs`, etc.) for robust cross-browser rendering. | Small | **Medium** |
| **Section Spacing Standardization** | Standardize vertical padding across sections using consistent spacing hierarchy (`py-16` / 64px for major, `py-8` / 32px for minor). | Medium | **Low** |
| **Standardize Custom CSS Spacing** | Replace non-standard spacing properties (`0.625rem`, `-10px`) in layout CSS with standard 4px multiples (`0.75rem`, `-8px`). | Small | **Low** |

---

## Suggested Order of Execution

1. **Phase 1: Header Navigation & Mobile Menu (High Priority / Small Effort)**
   - Shift breakpoint to `lg`.
   - Add missing links ("Quiénes Somos", "Misa en Vivo") to the mobile menu list.
   - Adjust top padding for the mobile dropdown container.
2. **Phase 2: Hero Sections (High Priority / Small Effort)**
   - Convert fixed `h-[X]` to `min-h-[X] py-12` across all views.
3. **Phase 3: Content List Responsiveness (Medium Priority / Small Effort)**
   - Refactor schedule lists in `misa-en-vivo.ejs` and Santo section in `evangelio.ejs`.
4. **Phase 4: Grids & Spacing Standardization (Medium/Low Priority / Medium Effort)**
   - Add explicit `grid-cols-1` to all content grids.
   - Standardize layout gutters and section standard paddings.
   - Resolve CSS spacing variables.
