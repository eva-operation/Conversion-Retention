# PRD: Strategic Oversight (CEO View)

## 1. Product Summary
The Strategic Oversight view is a high-level management dashboard designed for leadership (CEOs and Department Heads) to monitor the entire agency's portfolio health, financial performance, and global risk distribution.

---

## 2. Dashboard Interface & Layout

### 2.1. Global Summary Section
*   **Purpose:** Provide an at-a-glance health check of the business.   
*   **Layout:** Horizontal metric cards displayed at the top.
*   **Key Global Metrics:**
    *   **Active Accounts:** Total unique accounts with at least one active subscription.
    *   **Churned Accounts:** Calculation: `Total Accounts - Active Accounts`.
    *   **Total Active Subs:** Total count of active subscription lines across all accounts.
    *   **Global MRR/ARR:** Consolidated financial totals.

### 2.2. Sticky Header & KPI Summary
When the user scrolls, the Global Summary collapses into a sticky header showing:
`MRR | ARR | Accounts (Active/Churn) | Op. Revenue | Tasks (Overdue/Open) | Velocity`.

---

## 3. Financial Calculation Logic (Management Level)

### 3.1. MRR/ARR Definitions
*   **Net MRR:** Total monthly revenue **excluding** projects in "Black" (Cancellation Requested) risk status.
*   **Gross MRR (This Month):** Total verified revenue for the current month, including potential churn.
*   **Revenue at Risk:** Total revenue from projects in "Black" status.
*   **ARR:** Calculated as `MRR * 12`.

### 3.2. Pro-Rated Operational Revenue (Scaling Rule)
To maintain accurate performance tracking during filtering, fixed revenues (Reimbursements and Vendor Recovery targets) are scaled:
*   `filterRatioForReimb = (Reimbursement subs in visible projects) / (Total Active Reimbursement subs system-wide)`.
*   `Effective Reimbursement = monthlyReimbTarget * filterRatioForReimb`.
*   `Effective Recovery = monthlyRecoveryTarget * filterRatioForRecovery`.

---

## 4. Governance & Access Control

### 4.1. Role-Based Permissions (CEO/Admin Only)
*   **Orange (Suspension):** Only CEO/Admin can move a project into or out of this status.
*   **Blue (Confirmed Cancellation):** Final status. Only CEO/Admin can move a project out of this status back to an active color.

---

## 5. Global Search & Advanced Filtering
*   **Modular Filters:** The "Add Filter" dialog allows filtering across the entire organization.
*   **Criteria:** Filter by MRR range, Lifetime, Subscription Types, or Team Member performance.
