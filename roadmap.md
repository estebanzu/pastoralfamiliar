# Layout Roadmap

This document outlines structural, responsiveness, consistency, and UX gaps in the layout of the Pastoral Familiar website, benchmarks these against modern community/church design standards, and tracks their completion.

---

## Current Gaps & Status

| Area | Issue | Severity | Section/File | Status |
|------|-------|----------|---------------|--------|
| **Navigation** | 10 links wrap onto multiple lines/logo on screens between 768px (md) and 1024px (lg). | **High** | `views/layout.ejs` (Header) | **Fixed** |
| **Navigation** | Mobile menu dropdown is missing "Quiénes Somos" and "Misa en Vivo" links. | **High** | `views/layout.ejs` (Header) | **Fixed** |
| **Navigation** | Mobile menu lacks top padding/gutters, squishing menu links against header. | **Medium** | `views/layout.ejs` (Header) | **Fixed** |
| **Hero Sections** | Fixed hero heights (`h-[50vh]`, `h-[40vh]`) risk text overflow/truncation when zoomed or on small viewports. | **Medium** | `index.ejs`, `retiro-de-parejas.ejs`, `inscripcion-*.ejs`, `quienes-somos.ejs`, `consejeria-matrimonial.ejs`, `evangelio.ejs`, `misa-en-vivo.ejs`, `recursos.ejs` | **Fixed** |
| **Grids** | Grids lack explicit mobile column definitions (`grid-cols-1`), relying on browser defaults. | **Low** | `index.ejs`, `quienes-somos.ejs`, `consejeria-matrimonial.ejs`, `recursos.ejs` | **Fixed** |
| **Content List** | "Santo del Día" uses row flex (`flex items-start`) on mobile, squishing the circular icon container. | **Medium** | `views/evangelio.ejs` (Santo Section) | **Fixed** |
| **Content List** | Eucaristías list uses row flex (`flex justify-between`) without mobile wrap, causing overlapping text columns on small viewports. | **Medium** | `views/misa-en-vivo.ejs` (Schedule) | **Fixed** |
| **Footer** | Contact info columns list layout wraps email address awkwardly on narrow screens. | **Low** | `views/layout.ejs` (Footer) | **Fixed** |
| **Consistency** | Section vertical padding fluctuates between `py-16` (64px), `py-12` (48px), and `py-8` (32px) without hierarchy. | **Low** | All views | **Fixed** |
| **Consistency** | `.badge` horizontal padding uses `0.625rem` (10px) and `@keyframes slideDown` uses `translateY(-10px)`, which deviate from the 4px scale. | **Low** | `views/layout.ejs` (CSS Styles) | **Fixed** |
| **UX/Accessibility** | Text link focus rings and skip-navigation links have inconsistent focus-visible offsets on focus states. | **Low** | `views/layout.ejs` | **Fixed** |

---

## Benchmark Insights

### 1. Bellevue Presbyterian Church (belpres.org)
- **Pattern observed**: The header layout uses a clean 2-step navigation. It triggers its mobile toggle breakpoint at `1024px` instead of `768px`.
- **Why it works**: By pushing the mobile menu breakpoint to `lg` (1024px), it ensures the navigation links never wrap or overlap the logo on tablet viewports.
- **How it applies**: Applied to layout navigation header.

### 2. Grace Church (grace.org)
- **Pattern observed**: Responsive content tables and schedule listings collapse to vertical stacks on mobile, using unified gaps and clear card borders.
- **Why it works**: Collapsing row listings into single-column vertical cards on mobile prevents horizontal scroll overflows and makes them easily readable.
- **How it applies**: Applied to Santo del Día card structure and Eucaristías list items.

### 3. Parish of St. Matthew (stmatthews.org)
- **Pattern observed**: Forms and details lists are constrained to narrow layout containers for readability.
- **Why it works**: A narrow form is significantly easier to scan and fill out on both desktop and mobile viewports.
- **How it applies**: Applied to registration forms layout.

---

## Proposed Improvements & Results

| Improvement | Rationale | Effort | Priority | Status |
|-------------|-----------|--------|----------|--------|
| **Responsive Nav Header Breakpoint** | Change nav show/hide and mobile toggle breakpoints from `md` (768px) to `lg` (1024px) to prevent wrapping links. | Small | **High** | **Completed** |
| **Complete Mobile Menu links** | Add missing "Quiénes Somos" and "Misa en Vivo" pages to the mobile menu list and add `pt-2` top spacing. | Small | **High** | **Completed** |
| **Overflow-Safe Heroes** | Convert fixed hero heights (`h-[40vh]`, `h-[50vh]`) to safe minimum height containers (`min-h-[40vh]`, `min-h-[50vh]`) with vertical padding. | Small | **High** | **Completed** |
| **Eucaristías Responsive Wrap** | Update list columns in `misa-en-vivo.ejs` to stack vertically (`flex-col`) on small screens and row-flex on `sm`. | Small | **Medium** | **Completed** |
| **Santo del Día Responsive Stacking** | Refactor Santo del día flex row to use `flex-col md:flex-row` and center align text/button on mobile. | Small | **Medium** | **Completed** |
| **Explicit Grid Mobile Columns** | Add explicit `grid-cols-1` to grids in all templates (`index.ejs`, `quienes-somos.ejs`, etc.) for robust cross-browser rendering. | Small | **Medium** | **Completed** |
| **Section Spacing Standardization** | Standardize vertical padding across sections using consistent spacing hierarchy (`py-16` / 64px for major, `py-8` / 32px for minor). | Medium | **Low** | **Completed** |
| **Standardize Custom CSS Spacing** | Replace non-standard spacing properties (`0.625rem`, `-10px`) in layout CSS with standard 4px multiples (`0.75rem`, `-8px`). | Small | **Low** | **Completed** |

---

## Completed Order of Execution

1. **Phase 1: Header Navigation & Mobile Menu**
   - Shifted breakpoint to `lg`.
   - Added missing links ("Quiénes Somos", "Misa en Vivo") to the mobile menu list.
   - Adjusted mobile menu container padding.
2. **Phase 2: Hero Sections**
   - Converted fixed `h-[X]` to `min-h-[X] py-12` across all views.
3. **Phase 3: Content List Responsiveness**
   - Refactored schedule lists in `misa-en-vivo.ejs` and Santo section in `evangelio.ejs`.
4. **Phase 4: Grids & Spacing Standardization**
   - Added explicit `grid-cols-1` to all content grids.
   - Standardized layout gutters and section standard paddings.
   - Resolved CSS spacing variables.
5. **Phase 5: Git Version Control**
   - Initialized Git, committed all enhancements, and pushed tracking branch `main` to GitHub origin.
