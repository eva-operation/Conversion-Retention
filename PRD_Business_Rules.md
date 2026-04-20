# PRD: Eva Brand Flow Dashboard - Business Rules & Calculation Logic

## 1. Product Summary
Eva Brand Flow is an internal management dashboard designed for agencies managing brands on Amazon and other marketplaces. It allows different personas (CEO, AM, CSM, BM) to track project performance, project risk statuses, and weekly customer communication.

---

## 2. Dashboard Interface & Views

### 2.1. Dual-View Architecture
The dashboard supports two primary modes of operation based on the user's persona or selected focus:

#### **Global / CEO View**
*   **Purpose:** High-level oversight for management and leadership (Admin level).
*   **Summary Components:** Displays horizontal metric cards (Active Accounts, Churned Accounts, Total Active Subscriptions).
*   **Behavior:** Filters apply across all accounts globally to provide a bird's-eye view of organizational health.

#### **Brand / Project View**
*   **Purpose:** Operational focus for AMs, BMs, and Care Managers.
*   **Summary Components:** Uses a vertical "Hero Metrics" layout providing deeper focus on specific account performance.
*   **Behavior:** Optimized for day-to-day management of assigned projects.

### 2.2. Sticky Headers & Collapse/Expand Rules
The dashboard uses a "Smart Sticky" system for the **Filters** and **Summary** sections.

#### **Appearance & Collapse Rules**
*   **Auto-Collapse:** When the user scrolls past the bottom of a section's content (detected via `getBoundingClientRect()`), the section automatically collapses to its header form.
*   **Auto-Expand:** When the user scrolls back to the very top (`window.scrollY < 50`), collapsed sections automatically expand back to their full detailed view.
*   **Manual Toggle:** Every section header has a chevron button to manually toggle between collapsed and expanded states.

#### **Sticky Header Content (The "Summary Sentence")**
When a section is collapsed or scrolled past, the header displays a concise summary sentence to maintain context:
*   **Filters Summary Sentence:** Lists all active filter criteria separated by `|` (e.g., `Search: "Acme" | Risk: Red, Black | Owner: Me`). If no filters are applied, it shows "All projects (no filters applied)".
*   **Summary Summary Sentence:** Displays key KPIs: `MRR` | `ARR` | `Accounts (Active/Churn)` | `Op. Revenue` | `Tasks (Overdue/Open)` | `Velocity`.

### 2.3. Advanced Filter System ("Add Filter")
The dashboard features a modular filtering system accessed via the "Add Filter" button.

#### **Dialog Architecture**
*   **Two-Pane Layout:** Controls are split between a Category Sidebar (left) and a Configuration Area (right).
*   **Contextual UI:** The configuration area adapts based on the data type:
    *   **Multi-Select:** Searchable list with checkboxes for categorical data (e.g., Team Members, Subscription Types).
    *   **Numeric/Ratio:** Uses comparison operators (`Equals`, `Greater than`, `Between`) for metrics like MRR, Lifetime, or Performance Ratios.
    *   **Date Range:** Allows filtering by specific date boundaries (Before, After, Between).
    *   **Text Search:** Direct keyword filtering for notes or project names.
*   **Single-Filter Mode:** Clicking an active filter badge opens the dialog directly on that specific criteria for rapid editing.
*   **Data Consistency:** Filters use "Draft" states; changes are only applied globally when the user confirms the selection.

### 2.4. Table Customization (Column Selector)
The project table is highly customizable to support different operational workflows.

#### **Management Modes**
*   **Column Visibility:** Users can toggle individual columns on/off via a searchable checkbox list.
*   **Dynamic Reordering:** Columns can be rearranged using a drag-and-drop interface within the settings dialog.
*   **Fixed Anchors:** To maintain context during horizontal scrolling, core columns (e.g., Account Name, Project Name) are fixed to the left and cannot be unpinned or reordered.

#### **Preset System**
*   **Default Presets:** Pre-configured sets of columns for specific roles (e.g., "Essential" for high-level monitoring, "Team Only" for operational manager views).
*   **Custom Presets:** Users can save their current column selection and order as a named preset for future one-click application.

---

## 3. Core Data Structures & Business Rules

### 3.1. Risk Levels & Governance
The application defines 8 risk levels. Each level represents the project's health and churn probability.

#### **GREEN — Strong Performance & Relationship**
*   **Criteria:** Repeat business, MoM/YoY growth, ACoS/TACoS targets met, highly communicative client.
*   **Action:** Maintain growth, share successes, identify upsell opportunities.
*   **Transition:** Can be moved to Yellow, Red, or Black by all users.

#### **YELLOW — Early Warning; Watchlist**
*   **Internal Sentiment:** "The Internal Team is dissatisfied."
*   **Criteria:** Declining sales trends for 2+ weeks, credit card failures, first expression of dissatisfaction, or missing meetings.
*   **Action:** Resolve underlying causes within 1-2 weeks; escalate if unresolved.
*   **Transition:** Can be moved to Green, Red, or Black by all users.

#### **RED — Critical Risk; Churn & Escalation**
*   **Customer Sentiment:** "The Client is dissatisfied."
*   **Criteria:** Multiple weeks of increasing costs without revenue growth, unresponsiveness for >1 week, missed calls twice.
*   **Action:** Immediate leadership escalation; recover trust via remediation plan.
*   **Transition:** Can be moved to Green, Yellow, or Black by all users.

#### **BLACK — Cancellation Requested**
*   **Criteria:** Formal cancellation request, unresponsiveness for >14 days, or invoice unpaid for >21 days.
*   **Action:** Halt activities, escalate to Head of Client Services, rapid save attempt.
*   **Transition:** Can be moved back to active status (Green, Yellow, Red) by anyone if saved; conversion to Blue requires Admin approval.

#### **ORANGE — Service Suspension**
*   **Criteria:** Temporary pause in service (max 8 weeks).
*   **Governance:** Entry and exit from this status are **locked** to Admin users only.

#### **BLUE — Cancellation Confirmed**
*   **Criteria:** Finalized departure; save efforts exhausted.
*   **Governance:** Moving back to any other color from Blue is restricted to **Admin** users only.

#### **WHITE — Not Yet Started**
*   **Criteria:** Signed but not yet launched.
*   **Transition:** One-way only. Once a project leaves White, it can never return to it. Authority: All users.

### 3.2. Team Member Assignment Rules
*   **Strict Multiplicity:** **Escalation Manager**, **Brand Manager**, and **Advertising Manager** are limited to **one** person per project. Selecting a new person will replace the previous assignment.
*   **Flexible Assignment:** **Care Manager** and **Graphic Designer** roles allow multiple members per project.

---

## 4. Calculation Formulas & Metrics

### 4.1. MRR (Monthly Recurring Revenue) Metrics
The MRR is calculated dynamically based on the active project set and subscription-specific ratios.

*   **Net MRR (Main Hero):** Total annualized monthly revenue excluding projects with **Black** risk status.
*   **This Month (Gross MRR):** Total verified revenue for the current month, including cancellations scheduled for later.
*   **Previous Month:** Closing revenue from the last day of the previous calendar month.
*   **To Be Cancelled / Revenue at Risk:** Total revenue from projects currently in **Black** risk status.
*   **Month-End Cancellations:** Specifically projects where the service end-date falls within the current month.

#### **Subscription-Based Scaling Rule**
To maintain data consistency when filtering, fixed revenues (Reimbursements and Vendor Recovery) are scaled based on the presence of those specific subscriptions in the filtered view:
*   `filterRatioForReimb = (Reimbursement subs in visible projects) / (Total Active Reimbursement subs in system)`.
*   `filterRatioForRecovery = (Vendor Recovery subs in visible projects) / (Total Active Vendor Recovery subs in system)`.
*   `Effective Reimbursement = monthlyReimRun * filterRatioForReimb`.
*   `Effective Recovery = monthlyVendorRecovery * filterRatioForRecovery`.

### 4.2. ARR (Annualized Run Rate) Metrics
*   **Net ARR:** `Net MRR * 12`.
*   **This Month (Gross ARR):** `Gross MRR * 12`.
*   **Previous Month ARR:** `Previous Month MRR * 12`.

### 4.3. Account Health & Operational Metrics
*   **Active Accounts:** Unique accounts where at least one project has an "Active" or "Suspended" subscription.
*   **Churned Accounts:** Total visible accounts minus Active accounts.
*   **Active Subs:** Total count of non-cancelled subscriptions across the visible project list.
*   **Avg. Rev. / Customer:** `Gross MRR / Active Accounts`.
*   **Monthly Reim. Run:** (Editable Input) Globally defined revenue target for Reimbursement services.
*   **Monthly Recovery Run:** (Editable Input) Globally defined revenue target for Vendor Recovery services.

### 4.4. Task & Support Ticket Metrics (Oversight)
Displayed as `Task / Ticket` ratios in CEO view or separate columns in Brand view.
*   **Overdue:** Items that have passed their target deadline.
*   **Upcoming:** Items due within the next 7 days.
*   **Open:** All currently active/unresolved items.
*   **Newly Closed:** Items resolved within the last 7 days.
*   **Velocity Ratio:** `Newly Closed / Total Open`. High ratio indicates efficient delivery.

---

## 5. Workflows
1.  **Weekly Assessment:** Update risk status and internal factors.
2.  **Manager Alignment:** Assign responsible team members following multiplicity rules.
3.  **Customer Communication:** Generate data-driven "Weekly Digest" using templates and send via the integrated editor.
