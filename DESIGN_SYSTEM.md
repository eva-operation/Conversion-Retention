# Design System Standards

This document outlines the design standards for the application, ensuring consistency in typography, color usage, and component styling. It reflects the modern, premium aesthetic inspired by platforms like Stripe.

## 1. Typography

**Font Family:** `Poppins`, sans-serif

We prioritize readability and a clean, modern look. The hierarchy is established through font weight and color rather than excessive size differences.

### Type Scale

| Element | Size Class | Font Size | Weight | Line Height | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Page Title** | `text-2xl` | 24px | Bold (700) | 32px | Main page headings (e.g., "Strategic Oversight") |
| **Section Header** | `text-lg` | 18px | Bold (700) | 28px | Section dividers (Summary, Filters, Liste) |
| **Tabs** | `text-[13px]` | 13px | Semibold (600) | 20px | Navigation tabs |
| **Body (Primary)** | `text-sm` | 14px | Normal (400) | 20px | Standard content text |
| **Body (Secondary)** | `text-[13px]` | 13px | Medium (500) | 20px | Secondary descriptions, list items |
| **Small / Label** | `text-xs` | 12px | Medium (500) | 16px | Badges, meta-data, hints |
| **Table Header** | `text-[11px]` | 11px | Semibold (600) | 16px | **UPPERCASE**, `tracking-wide` (letter-spacing: 0.025em) |

### Text Colors (Light Mode)

*   **Primary Text:** `text-slate-900` (#0F172A) - Headings, strong emphasis
*   **Secondary Text:** `text-slate-500` (#64748B) - Descriptions, table headers, icons
*   **Muted Text:** `text-slate-400` (#94A3B8) - Placeholders, inactive states

---

## 2. Color Palette

The interface uses a refined Slate color scale for neutrals and specific vibrant colors for semantic meaning.

### Neutrals (Slate)
Used for backgrounds, borders, and text to create a crisp "technical" look.

*   **Background:** `bg-white` (#FFFFFF) or `bg-slate-50` (#F8FAFC)
*   **Surface:** `bg-white` with `shadow-sm`
*   **Border:** `border-slate-200` (#E2E8F0)

### Primary Brand Colors
Used for actions, active states, and emphasis.

*   **Primary Blue:** `bg-blue-600` (#2563EB)
*   **Primary Gradient:** `from-blue-600 to-indigo-600` (Used in brand accents/visual separators)

### Semantic Colors (Status & Risk)
*   **Success / Low Risk:** `text-emerald-600`, `bg-emerald-50`, `border-emerald-200`
*   **Warning / Medium Risk:** `text-amber-600`, `bg-amber-50`, `border-amber-200`
*   **Critical / High Risk:** `text-red-600`, `bg-red-50`, `border-red-200`
*   **Neutral / Info:** `text-blue-600`, `bg-blue-50`, `border-blue-200`

---

## 3. UI Components & Elements

### Visual Separators (Section Headers)
To distinguish main sections without overwhelming the UI:
*   **Structure:** Icon/Bar + Title + Divider Line
*   **Bar:** `w-1 h-5 rounded-full` (Gradient color matching section theme)
*   **Divider:** `h-px bg-slate-100` (Subtle horizontal line)

### Tables
Designed for high data density but high readability.
*   **Container:** `bg-white`, `rounded-xl`, `border`, `shadow-sm`
*   **Header Row (thead):** 
    *   Background: `bg-slate-50/50`
    *   Text: `text-[11px]`, `uppercase`, `text-slate-500`, `font-semibold`, `tracking-wide`
*   **Rows:** Minimal borders (`border-b border-slate-100`), hover effects (`hover:bg-slate-50/50`).

### Buttons
*   **Primary:** `bg-blue-600 text-white rounded-lg font-bold shadow-sm hover:bg-blue-700`
*   **Secondary/Outline:** `border border-slate-200 bg-white text-slate-700 hover:bg-slate-50`
*   **Ghost:** `text-slate-500 hover:bg-slate-100`

### Shadows & Radius
*   **Border Radius:** `rounded-xl` (12px) for cards/containers, `rounded-lg` (8px) for buttons/inputs.
*   **Shadows:** `shadow-sm` for cards, `shadow-md` for dropdowns/modals.

---

## 4. Implementation Rules (CSS/Tailwind)

*   **Avoid Pure Black:** Never use `#000000`. Use `slate-900` or `slate-950` for the darkest elements.
*   **Whitespaces:** Use comfortable spacing. Sections are separated by `space-y-6` or `gap-6`.
*   **Consistent Iconography:** Icons should be sized `16px` (small) to `20px` (standard). Color usually matches text (`text-slate-400` or `text-slate-500`).
