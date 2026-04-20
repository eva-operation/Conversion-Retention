# Reimbursement Module: Technical Specification & Data Mapping

This document provides a comprehensive technical overview of the Reimbursement module, covering data structures, UI mapping, business logic, and restrictive policies.

## 1. Module Overview
The Reimbursement module is divided into two primary contexts:
- **Analytics Tab**: High-level visual representation of recovery performance, potential, and historical trends.
- **Cases Tab**: A granular management system for individual reimbursement claims, supporting documentation and export.

---

## 2. Global State & Contextual Filters
The module's behavior is influenced by several global and local selections:
- **Seller Selection**: (e.g., Seller A, B, C) Crucial distinction: This selection is at the **Seller level** (legal account entity), not just a Marketplace or individual store outlet. It serves as the primary data context for all recoveries and potential analysis.
- **Region Selection**: (e.g., North America, Europe) Local to the page, used for filtering marketplace-specific recoveries.
- **Currency Selection**: (USD, EUR, TRY, etc.) Triggers data re-fetching/re-simulation (`useEffect` dependency).
- **Platform Restriction**: Restricted to **Amazon** only. Shopify, TikTok are disabled with tooltips pointing to EVA Growth Page.
- **Account Type Restriction**: Restricted to **Seller** only. **Vendor** is disabled with a similar guidance tooltip.

---

## 3. Data Architecture (Types & Models)

### `TrendData`
Used for historical charting and period-based analysis.
- **`periodName`**: String (e.g., "Oct 25"). Maps to X-axis in charts.
- **`amountAmazon / amountEva / amountOther`**: Numerical values for financial recovery by source.
- **`quantityAmazon / quantityEva / quantityOther`**: Numerical values for item counts by source.
- **`reasons`**: Array of `ReasonBreakdown` for that specific period.

### `CaseItem`
The record model for the claims table.
- **`caseId`**: Primary identifier.
- **`totalAmount`**: Net financial value of the claim.
- **`status`**: Current state (Pending, Approved, Invoiced, Paid, Found).
- **`source`**: The entity that created the claim (EVA, Amazon, Auto-Amazon).
- **`isDocumentRequired`**: Boolean flag indicating if POD/POP is needed.

---

## 4. Overview Tab: UI Data Mapping

### A. Wasted Potential Card
- **Component**: `SemiCircleProgress`
- **Data Source**: `InventoryRecoveryData`
- **UI Mapping**:
  - `value`: Number of items currently reimbursed.
  - `total`: "Potential Inventory Recovery" (Target).
  - Calculated: `Recovery Rate %` displayed in the center.

### B. Financial Recovery Card
- **Component**: `FinancialRecovery`
- **UI Mapping**:
  - Main Display: `totalReimbursedAmount`.
  - Subtext: `estimatedMonthlyAmount`.
  - Icon: `DollarSign`.

### C. Stacked Trend Chart
- **Component**: `StackedTrendChart`
- **Visualization**:
  - **Bars (Y-Axis Left)**: Stacked sum of Amounts (Amazon - Orange, EVA - Cyan, Other - Purple).
  - **Lines (Y-Axis Right)**: Moving trend of quantities by source.
- **Interaction**: Clicking a bar updates the `selectedMonth` state, refreshing the "Top Items" and "Reason Breakdown" sections.

---

## 5. Cases Tab: Granular Management

### A. Advanced Filter System
The filters are dynamically populated from unique values in the current `cases` dataset:
- **Search**: Real-time filtering against `caseId`, `shipmentId`, `asin`, and `sku`.
- **Category Filters**: (Created By, Reason, Status, Doc Needed) Use multi-select dropdowns.

### B. Table & Action Controls
- **Column Selector**: Allows users to toggle visibility of any of the 17 tracked fields.
- **Requests Menu**: (Remeasurement, Other) Opens the create task dialog for selected task type.
- **FILES Action**: Opens `ManageCaseFilesDialog` to view/manage associated POD/POP documents.
- **DOC Action**: Enabled only for `Pending` cases; opens `UploadFileDialog`.

### C. Pagination
- **Requirement**: `totalItems` is hardcoded to `15,135` for simulation.
- **Logic**: 
  - `Showing (N) to (M) of 15,135 items`.
  - Page jump logic includes first, current, next, and last pages with ellipsis support.

---

## 6. Package Eligibility Logic (Reimbursement Access)
The module's interactive features are gated based on the user's subscription eligibility:
- **Eligible Status**: The user has a plan that includes "Reimbursement" (e.g., `reimbursement` or `eva_ai_reimbursement` packages).
- **Not Eligible Status**: Any plan that does **not** include the Reimbursement module.
- **Ineligible Behavior (Cases Tab)**:
  - All interactive buttons (Requests, Exports, Column selector, Row actions) are visually muted (`opacity-60`, `grayscale`).
  - **Glow Action**: If a user clicks any restricted button while ineligible, the **"Subscribe Now For Free"** button in the header banner will perform a 2-second glow animation (scaling and high-intensity shadow) to guide the user to the subscription flow.

---

## 7. Lifecycle States (Trial & Expiration)
Beyond the direct module eligibility, the application supports two main global states which affect the Reimbursement module and overall navigation:

### A. Trial Period (`trial`)
- **UI Behavior**: A yellow notification bar is rendered at the top level.
- **Interaction**: Clicking the "Subscribe" call-to-action transitions the banner to a **Green "Subscription Requested"** state (providing immediate visual confirmation).

### B. Trial Expired (`no_package_after_trial`)
- **Global Header**: A specialized yellow banner is fixed at the absolute top of the application: *"Your free trial has expired. Start Your Monthly Plan"*.
- **Full Content Restriction**:
  - The dashboard content is fully hidden and replaced by a high-fidelity restricted access screen.
  - **UI Context**: A centered premium badge icon with the descriptive heading **"Get full access of Eva"**.
  - **Navigation Policy**: This state overrides all module views (Analytics, Cases, etc.). Any attempt to navigate via the sidebar or header while in this state will return the user to the restricted access view.

---

## 8. API Result Details (JSON Examples)

### A. `TrendData` Object
```json
{
  "periodName": "Oct 25",
  "amountAmazon": 12845.50,
  "amountEva": 1850.25,
  "amountOther": 2340.00,
  "quantityAmazon": 185,
  "quantityEva": 38,
  "quantityOther": 54,
  "reasons": [
    { "reasonKey": "Lost Warehouse", "amount": 4250.00, "color": "#0ea5e9" },
    { "reasonKey": "Warehouse Damaged", "amount": 1820.00, "color": "#eab308" },
    { "reasonKey": "Lost in Transit", "amount": 2940.00, "color": "#ef4444" }
  ]
}
```

### B. `CaseItem` Object
```json
{
  "caseId": "1200000384",
  "shipmentId": "FBA15Z9V7R2",
  "reimbursementId": "98000384",
  "asin": "B08XJ9K1L9",
  "sku": "SKU-PRO-MAX-BLUE",
  "fnsku": "X001Z9RV7X",
  "reasonDisplay": "Lost Warehouse",
  "status": "Pending",
  "isDocumentRequired": true,
  "documentNeededDisplay": "POP and POD", 
  "totalAmount": 425.50,
  "inventoryCashReimbursed": 385.00,
  "inventoryReimbursed": 2,
  "foundQuantity": 0,
  "source": "EVA",
  "creationDate": "Mar 12, 2026",
  "approvalDate": "Mar 15, 2026",
  "uploadedFiles": [
    {
      "id": "f3841",
      "fileName": "Invoice_92837.pdf",
      "category": "POP",
      "createdAt": "Mar 13, 2026, 11:58 PM"
    }
  ]
}
```

---

## 9. Summary mapping Table

| UI Element | API Field Source | UI Component |
| :--- | :--- | :--- |
| **Wasted Potential** | `reimbursedInventoryCount` / `potentialInventoryCount` | `SemiCircleProgress` |
| **Recovery Rate** | Calculated: `(Value / Total) * 100` | Center text of Semi-Circle |
| **Total Reimbursed Card** | `totalReimbursedAmount` | `FinancialRecovery` Header |
| **Cases Action Column** | `uploadedFiles` (length > 0 ? "FILES" : "") | Table row button logic |
| **Cases Status Badge** | `status` (Pending, Approved, Invoiced, etc.) | Table cell styling |
| **Historical Bars** | `amountAmazon`, `amountEva`, `amountOther` | `StackedTrendChart` Bars |
| **Trend Lines** | `quantityAmazon`, `quantityEva`, `quantityOther` | `StackedTrendChart` Lines |

---

## 10. Document Management: `ManageCaseFilesDialog`
This sub-module handles the inspection and retrieval of documents associated with a specific case.

### A. Action Controls
- **Download All Files (Header)**: A primary action button that triggers a bulk download of all items listed in the current case view. It only renders when the `files` array is non-empty.
- **Download (Row)**: Downloads the specific document on that row (maps to the `url` or `id` field in the `CaseFile` model).
- **Delete (Row)**: Removes the association of the document from the case. This is a destructive action that triggers a confirmation flow.
- **Close (Header X)**: Terminates the modal session and returns the user to the principal Cases table.

### B. Navigation & Pagination
- **Pagination Controls**: Includes "Previous", "Page Numbers", and "Next" buttons at the footer.
- **Logic**: Implemented to support high-volume cases (e.g., claims involving multiple PODs/Invoices), ensuring a performant and clean UI regardless of the number of attached files.

