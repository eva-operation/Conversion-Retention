# PRD: Brand & Operation Management (Brand View)

## 1. Product Summary
The Brand & Operation Management view is an action-oriented dashboard for operational team members (AMs, BMs, CSMs) to manage specific assigned projects, track risks, and handle weekly customer communication.

---

## 2. Dashboard Interface & Operational Layout

### 2.1. "Hero Metrics" Section (Vertical Layout)
*   **Purpose:** Deep dive into specific account/project performance.
*   **Layout:** Vertical stacking of detailed performance metrics.
*   **Focus:** Individual project MRR, WoW Change, and specific operational health.

### 2.2. Operational Sticky Header
When scrolling past filters, a concise summary is shown:
`Project Search | Active Risk Filters | Assigned Manager | Update Status`.

---

## 3. Risk Analysis & Project Health

### 3.1. Risk Levels (Operational Definitions)
*   **GREEN:** Relationship healthy, targets met.
*   **YELLOW:** Internal team dissatisfaction, early warning.
*   **RED:** Client dissatisfaction, critical escalation required.
*   **BLACK:** Cancellation request path.
*   **WHITE:** Pre-launch (One-way status; cannot return to White once started).

### 3.2. Weekly Performance (WoW)
*   **Positive Change:** Risk decreased.
*   **Negative Change:** Risk increased.
*   **No Change:** Risk level maintained.

---

## 4. Operational Workflows & Communication

### 4.1. Weekly Customer Update
*   **Status Tracking:** `Blank` (Not started), `Draft` (Prepared), `Sent` (Communicated).
*   **Template Integrated:** Use `generateEmailTemplate` to create data-driven reports.
*   **Editor:** Integrated rich-text editor for final refinements before sending.

### 4.2. Team Multiplicity Rules
*   **Escalation/Brand/Ad Manager:** strictly **one** person per role.
*   **Care Manager/Graphic Designer:** Multiple team members can be assigned.

---

## 5. Task & Ticket Velocity
*   **Metric:** Count of `Overdue`, `Upcoming`, `Open`, and `Newly Closed` items.
*   **Velocity Ratio:** `Newly Closed / Total Open`. High ratio signals operational excellence.
