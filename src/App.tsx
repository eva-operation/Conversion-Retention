import React, { useState, useMemo, useEffect, useRef } from 'react';
import { PrototypeMenu } from './components/PrototypeMenu';
import { ProfitBreakdownDialog } from './components/ProfitBreakdownDialog';
import { SalesBreakdownDialog } from './components/SalesBreakdownDialog';
import { ExpenseBreakdownDialog } from './components/ExpenseBreakdownDialog';
import { generateEmailTemplate, getEmailHTML, renderEmailCharts } from '@/emailTemplate';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { RiskManagementDialog } from "./components/RiskManagementDialog";
import { TeamManagementDialog } from "./components/TeamManagementDialog";
import { ReimbursementAnalytics } from './components/ReimbursementAnalytics';
import { PricingPage } from './components/PricingPage';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { ListsPage } from './components/ListsPage';
import { SegmentsPage } from './components/SegmentsPage';
import { SegmentBuilderPage } from './components/SegmentBuilderPage';
import { SettingsPage } from './components/SettingsPage';
import {
    Plus,
    Building2,
    Search,
    RotateCcw,
    ChevronDown,
    Info,
    ArrowUpRight,
    ArrowDownRight,
    Minus,
    LayoutGrid,
    Table as TableIcon,
    Bell,
    HelpCircle,
    MoreHorizontal,
    LayoutDashboard,
    Users,
    User,
    CheckSquare,
    BarChart3,
    Box,
    MessageSquare,
    Settings,
    Store,
    LogOut,
    ChevronRight,
    History,
    Filter,
    X,
    Edit,
    Globe,
    PanelLeftClose,
    PanelLeft,
    Type,
    Hash,
    Calendar,
    DollarSign,
    Clock,
    TrendingUp,
    GripVertical,
    Bold,
    Italic,
    Strikethrough,
    Copy,
    List,
    ListOrdered,
    Quote,
    Heading1,
    Heading2,
    Heading3,
    ShieldAlert,
    ClipboardCheck,
    Check,
    Activity,
    Flag,
    Zap,
    AlertCircle,
    UserMinus,
    Receipt,
    Sun,
    Moon,
    Lock,
    ClipboardList,
    Kanban,
    Trello,
    Columns,
    Mail,
    ChevronLeft,
    ArrowUp,
    ArrowDown,
    ArrowUpDown,
    UserPlus,
    Tag,
    Ticket,
    MessageCircle,
    Paperclip,
    Eye,
    Crosshair,
    Download,
    Target,
    Package,
    Megaphone
} from 'lucide-react';
import { cn } from './lib/utils';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./components/Tooltip";
import { ConnectionWizard } from "./components/ConnectionWizard";

import { HelpLink } from './components/HelpLink';

const AmazonIcon = ({ className }: { className?: string }) => (
    <img
        src="https://bf.eva.guru/_next/image?url=%2F128px-Amazon_icon.svg.png&w=32&q=75"
        className={className}
        alt="Amazon"
    />
);

const ShopifyIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 109 124" className={className} aria-label="Shopify" role="img">
        <path fill="#95BF47" d="M95.9,23.9c-0.1-0.6-0.6-1-1.1-1c-0.5,0-9.3-0.2-9.3-0.2s-7.4-7.2-8.1-7.9c-0.7-0.7-2.2-0.5-2.7-0.3c0,0-1.4,0.4-3.7,1.1c-0.4-1.3-1-2.8-1.8-4.4c-2.6-5-6.5-7.7-11.1-7.7c0,0,0,0,0,0c-0.3,0-0.6,0-1,0.1c-0.1-0.2-0.3-0.3-0.4-0.5c-2-2.2-4.6-3.2-7.7-3.1c-6,0.2-12,4.5-16.8,12.2c-3.4,5.4-6,12.2-6.7,17.5c-6.9,2.1-11.7,3.6-11.8,3.7c-3.5,1.1-3.6,1.2-4,4.5c-0.3,2.5-9.5,73-9.5,73l76.4,13.2l33.1-8.2C109.5,115.8,96,24.5,95.9,23.9z M68.4,19.7c-1.8,0.5-3.8,1.2-5.9,1.8c0-3-0.3-7.2-1.4-10.8C64.5,11.8,67.1,16,68.4,19.7z M58.8,22.4c-3.9,1.2-8.2,2.5-12.4,3.8c1.2-4.7,3.6-9.4,6.4-12.5c1.1-1.1,2.6-2.4,4.3-3.2C58.6,14.2,58.9,19.2,58.8,22.4z M51.4,4.8c1.3,0,2.4,0.3,3.4,0.8c-1.6,0.9-3.2,2.1-4.7,3.6c-3.8,4.1-6.7,10.5-7.9,16.6c-3.6,1.1-7.2,2.2-10.5,3.2C33.7,18.9,42.6,5.2,51.4,4.8z"></path>
        <path fill="#5E8E3E" d="M94.8,22.9c-0.5,0-9.3-0.2-9.3-0.2s-7.4-7.2-8.1-7.9c-0.3-0.3-0.6-0.4-1-0.5l0,109.3l33.1-8.2c0,0-13.5-91.3-13.6-91.9C95.8,23,95.3,22.9,94.8,22.9z"></path>
        <path fill="#FFFFFF" d="M58,39.9l-3.8,14.4c0,0-4.3-2-9.4-1.6c-7.5,0.5-7.5,5.2-7.5,6.4c0.4,6.4,17.3,7.8,18.3,22.9c0.7,11.9-6.3,20-16.4,20.6c-12.2,0.8-18.9-6.4-18.9-6.4l2.6-11c0,0,6.7,5.1,12.1,4.7c3.5-0.2,4.8-3.1,4.7-5.1c-0.5-8.4-14.3-7.9-15.2-21.7C23.8,48.2,31.3,38.5,45.8,37.5C52.2,37.1,58,39.9,58,39.9z"></path>
    </svg>
);

const TikTokIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 448 512" fill="currentColor" className={className}>
        <path d="M448 209.9a210.1 210.1 0 0 1 -122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0l88 0a121.2 121.2 0 0 0 1.9 22.2h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z" />
    </svg>
);

// --- Types & Constants ---
type SubscriptionStatus = 'Active' | 'Suspended' | 'Cancelled';

interface Subscription {
    name: string;
    status: SubscriptionStatus;
    subscriptionType?: number;
    packageType?: string;
    evaAccountStatus?: number;
    amazonAccountStatus?: number;
    sellerApiTokenStatus?: number;
    marketplaceId?: string;
    isSelectedForStore?: boolean;
}

interface Risk {
    name: string;
    hex: string;
    bg: string;
    border: string;
    desc: string;
}

interface WowChange {
    type: string;
    label: string;
    desc: string;
    class: string;
}

type AdEngineStatus = 'Active' | 'Passive' | 'NA';

interface Project {
    id: string;
    name: string;
    subscriptions: Subscription[];
    mrr: number;
    salesL30: number;
    salesP30: number;
    salesL7: number;
    salesP7: number;
    risk: Risk;
    prevRisk: Risk;
    wow: WowChange;
    lifetime: number;
    am: string;
    csm: string;
    bm: string;
    cm: string;
    gd: string;
    createdAt: string;
    isMyProject: boolean;
    hasNote: boolean;
    contactEmail?: string;
    contactName?: string;
    customerUpdateContent?: string;
    notes: string;
    customerUpdateStatus: 'blank' | 'draft' | 'sent';
    customerUpdateSentAt?: string;
    overdueTasks: number;
    openTasks: number;
    overdueTickets: number;
    openTickets: number;
}

export interface Task {
    id: string;
    type: 'TASK' | 'TICKET';
    title: string;
    projectName: string;
    accountName: string;
    status: 'To Do' | 'Work In Progress' | 'Pending Reflection' | 'Pending Information - POC' | 'Pending Approval';
    priority: 'High' | 'Medium' | 'Low';
    dueDate: string;
    assignee: string;
    reporter: string;
    isWatchdog: boolean;
    labels: string[];
    messages?: number;
    attachments?: number;
    initials: string;
    secondaryInitials?: string[];
}

interface Account {
    id: number;
    name: string;
    initials: string;
    mrr: number;
    salesL30: number;
    salesP30: number;
    salesL7: number;
    salesP7: number;
    subs: number;
    hasNote: boolean;
    risk: Risk;
    prevRisk: Risk;
    wow: WowChange;
    lifetime: number;
    am: string;
    csm: string;
    bm: string;
    cm: string;
    gd: string;
    createdAt: string;
    projects: Project[];
    expanded: boolean;
    contactEmail?: string;
    contactName?: string;
    status: 'Customer' | 'Prospect' | 'Suspect' | 'Churn';
    adEngineStatus: AdEngineStatus;
    analytics?: {
        current: AccountAnalytics;
        previous: AccountAnalytics;
    };
}

interface AccountAnalytics {
    adImpressions: number;
    clicks: number;
    adOrders: number;
    adUnits: number;
    ctr: number;
    cvr: number;
    pageViews: number;
    sessions: number;
    orders: number;
    units: number;
    unitSessionPercent: number;
    roi: number;
    margin: number;
}

interface ProductAnalytic {
    id: string;
    evaProductId?: string;
    platform?: 'Amazon' | 'Shopify';
    image: string;
    title: string;
    skuAsin: string;
    variantName?: string;
    variantId?: string;
    tags: string[];
    vendor: string;
    productType: string;
    price: number;
    totalSales: number;
    totalSoldQty: number;
    totalOrderCount: number;
    totalRefundQty: number;
    totalDiscount: number;
    totalTax: number;
    totalDuty: number;
    netSales: number;
    cog: number;
    cogs: number;
    totalFee: number;
    totalExpenses: number;
    refundAmount: number;
    refundPercent: number;
    profit: number;
    margin: number;
    roi: number;
    aov: number;
    sessions: number;
    sessionPercent: number;
    availableQty: number;
}


const getAdEngineStatus = (account: Account): AdEngineStatus => {
    // Collect all subscriptions from all projects in the account
    const allSubs = account.projects.flatMap(p => p.subscriptions || []);

    const hasActivePPC = allSubs.some(sub => {
        if (sub.status !== 'Active') return false;
        const type = sub.subscriptionType;
        const pkg = sub.packageType;
        if (type === 3) {
            return ['1', '2', '3', '4', '32', '33', '36'].includes(pkg || '');
        } else if (type === 1) {
            return ['16', '12', '17', '18', '22', '23', '13'].includes(pkg || '');
        }
        return false;
    });

    if (!hasActivePPC) return 'NA';

    // For mock activity, we simulate based on account ID
    // If account has an even number of projects, let's say it's Active, else Passive (random but deterministic for mock)
    return account.id % 2 === 0 ? 'Active' : 'Passive';
};

const RISKS: Risk[] = [
    { name: "Black", hex: "#000000", bg: "#000000", border: "#334155", desc: "Cancellation Requested: Formal request, long-term unresponsiveness, or unpaid invoices." },
    { name: "Red", hex: "#be123c", bg: "#fff1f2", border: "#ffe4e6", desc: "Critical Risk: The customer is dissatisfied, disengaged, or critical issues are at risk." },
    { name: "Orange", hex: "#f97316", bg: "#fff7ed", border: "#ffedd5", desc: "Service Suspension: Temporary pause (max 8 weeks) due to client or operational reasons." },
    { name: "Yellow", hex: "#eab308", bg: "#fefce8", border: "#fef08a", desc: "Early Warning: Internal team is dissatisfied with performance trends (Ad Spend/Sales) or payment issues." },
    { name: "Green", hex: "#10b981", bg: "#ecfdf5", border: "#ccfbf1", desc: "Strong Performance: Healthy relationship, growth targets met, and communicative client." },
    { name: "Blue", hex: "#3b82f6", bg: "#eff6ff", border: "#dbeafe", desc: "Cancellation Confirmed: Management confirmed cancellation after all save efforts failed." },
    { name: "White", hex: "#ffffff", bg: "#ffffff", border: "#e5e7eb", desc: "Not Yet Started: Client signed but meaningful launch activity has not yet commenced." },
    { name: "None", hex: "#9ca3af", bg: "rgba(156, 163, 175, 0.1)", border: "#f3f4f6", desc: "Not Updated: Status has not been set for the current reporting week." }
];

const WOW_CHANGES: WowChange[] = [
    { type: "Positive", label: "Positive", desc: "Risk level decreased; the account moved to a better position compared to last week", class: "bg-emerald-600/15 text-emerald-700 border border-emerald-600/30" },
    { type: "Negative", label: "Negative", desc: "Risk level increased; the account moved to a higher risk position compared to last week", class: "bg-red-600/15 text-red-700 border border-red-600/30" },
    { type: "None", label: "No Change", desc: "Risk level remained the same as last week", class: "bg-slate-600/15 text-slate-700 border border-dashed border-slate-600/30" }
];

export const TASKS_DATA: Task[] = [
    {
        id: 'T1',
        type: 'TASK',
        title: 'Seo Reporting for Lipsticks',
        projectName: 'Living Eleven Brand...',
        accountName: 'Living Eleven Brand...',
        status: 'To Do',
        priority: 'Medium',
        dueDate: 'Feb 27',
        assignee: 'EM',
        reporter: 'NA',
        isWatchdog: false,
        labels: ['SEO - REPORTING'],
        messages: 2,
        attachments: 1,
        initials: 'EM',
        secondaryInitials: ['NA', 'EM']
    },
    {
        id: 'T2',
        type: 'TASK',
        title: 'EE TESTS E2E Due 1771845318111',
        projectName: 'ACCOUNT HEALTH AU',
        accountName: 'E2E description updated',
        status: 'Work In Progress',
        priority: 'High',
        dueDate: 'Feb 15',
        assignee: 'EB',
        reporter: 'NA',
        isWatchdog: true,
        labels: [],
        messages: 5,
        attachments: 2,
        initials: 'EB'
    },
    {
        id: 'T3',
        type: 'TASK',
        title: 'Create Good Design Awards logo bearing images for all Flippy ASINs',
        projectName: 'LISTING IMAGES DESK',
        accountName: 'Happy Products, Inc.',
        status: 'Pending Reflection',
        priority: 'Medium',
        dueDate: 'Feb 20',
        assignee: 'GD',
        reporter: 'NA',
        isWatchdog: false,
        labels: [],
        messages: 1,
        attachments: 3,
        initials: 'GD'
    },
    {
        id: 'T4',
        type: 'TICKET',
        title: 'Wrong Brand Name showing on ASIN B0XXXXXXXX',
        projectName: 'Valterra Power US, L...',
        accountName: 'Eyeking LLC',
        status: 'Pending Approval',
        priority: 'High',
        dueDate: 'Feb 23',
        assignee: 'CSM',
        reporter: 'NA',
        isWatchdog: false,
        labels: [],
        messages: 12,
        attachments: 0,
        initials: 'EB'
    }
];
const AM_NAMES = ["A. Johnson", "B. Smith", "C. Lee", "D. Brown", "E. Davis", "F. Wilson"];
const CSM_NAMES = ["G. Martinez", "H. Anderson", "I. Thomas", "J. Jackson", "K. White", "L. Harris"];
const BRAND_NAMES = ["S. Rogers", "B. Banner", "T. Stark", "N. Romanoff", "P. Quill"];
const CARE_NAMES = ["C. Danvers", "W. Maximoff", "S. Strange", "T. Challa", "O. Okoye"];
const DESIGNER_NAMES = ["P. Parker", "M. Morales", "G. Stacy", "B. Reilly", "K. Bishop"];
const CONTACT_NAMES = [
    "Cemil Karaca", "Ayşe Demir", "Mehmet Yıldız", "Fatma Şahin", "Ali Kaya",
    "Zeynep Çelik", "Mustafa Arslan", "Elif Koç", "İbrahim Aydın", "Hatice Kurt",
    "Hasan Yılmaz", "Merve Güneş", "Serkan Polat", "Büşra Erdoğan", "Emre Doğan",
    "Selin Acar", "Tolga Öztürk", "Deniz Şimşek", "Kemal Çetin", "Pınar Yurt"
];

const ACCOUNT_NAMES = [
    "Eastern Infants Wear Inc DBA Norty Footwear",
    "Thrive Five Consumer Products Holdings, LP",
    "Acme Corp",
    "Globex Inc.",
    "Soylent Corp",
    "Initech",
    "Umbrella Corp",
    "Stark Ind",
    "Wayne Ent",
    "Cyberdyne",
    "Massive Dynamic",
    "Hooli",
    "Pied Piper",
    "Aviato",
    "Vandelay Ind",
    "Dunder Mifflin",
    "Sabre",
    "Aperture Sci",
    "Black Mesa",
    "Tyrell Corp"
];
const PROJECT_TYPES = [
    { name: "Full Service", subs: ["TikTok Full Service", "Amazon Full Service", "Shopify Full Service"] },
    { name: "DSP Advertising", subs: ["Dedicated", "Amazon Advertising", "DSP Ads Free service"] },
    { name: "SEO Campaign", subs: ["On-Page SEO", "Backlink Growth", "Technical Audit"] },
    { name: "PPC Growth", subs: ["Google Ads", "Meta Ads", "Retargeting"] },
    { name: "Social Media", subs: ["Content Creation", "Community Mgmt", "Influencer"] },
    { name: "Content Mkt", subs: ["Blog Posts", "Whitepapers", "Video Content"] },
    { name: "Recovery", subs: ["Reimbursement", "Vendor Recovery"] }
];

const DIALOG_FACTORS = [
    { name: 'Sales Performance', desc: 'Recent sales declining or consistently below targets.' },
    { name: 'Client Satisfaction', desc: 'Client sentiment or feedback signals dissatisfaction.' },
    { name: 'Ad Performance', desc: 'Campaigns underperforming; budgets misaligned with goals.' },
    { name: 'Account Health', desc: 'Health metrics or policy compliance showing risk.' },
    { name: 'Communication', desc: 'Gaps or delays in communication causing escalations.' },
    { name: 'Product Quality', desc: 'Quality issues reported for one or more key products.' },
    { name: 'Financial Risk', desc: 'Payment issues or churn risk impacting revenue.' },
    { name: 'Other', desc: 'Risk factors not covered by the categories above.' },
];

// --- Mock Data Generator ---
const generateData = (): Account[] => {
    const accounts: Account[] = [];
    const totalAccounts = ACCOUNT_NAMES.length;

    for (let i = 0; i < totalAccounts; i++) {
        const accName = ACCOUNT_NAMES[i % ACCOUNT_NAMES.length];
        const numProjs = Math.floor(Math.random() * 3) + 1;
        const accProjects: Project[] = [];

        // Ensure the first 8 accounts cover all risk levels
        let worstRiskIdx = i < RISKS.length ? i : Math.floor(Math.random() * 8);

        for (let p = 0; p < numProjs; p++) {
            // For the guaranteed accounts, at least one project should have that risk
            let rIdx = (p === 0 && i < RISKS.length) ? i : Math.floor(Math.random() * 8);

            if (rIdx < worstRiskIdx) worstRiskIdx = rIdx;
            const riskObj = RISKS[rIdx];
            const prevRiskObj = RISKS[Math.floor(Math.random() * 8)];
            const wowIdx = rIdx < RISKS.indexOf(prevRiskObj) ? 1 : (rIdx > RISKS.indexOf(prevRiskObj) ? 0 : 2);
            const projectTemplate = PROJECT_TYPES[Math.floor(Math.random() * PROJECT_TYPES.length)];
            const pName = projectTemplate.name;
            const pSubs: Subscription[] = projectTemplate.subs.map(sName => {
                const isPPCRelevant = Math.random() < 0.6;
                return {
                    name: sName,
                    status: (['Active', 'Active', 'Active', 'Suspended', 'Cancelled'][Math.floor(Math.random() * 5)]) as SubscriptionStatus,
                    subscriptionType: isPPCRelevant ? (Math.random() < 0.5 ? 3 : 1) : 0,
                    packageType: isPPCRelevant ? (Math.random() < 0.5 ? '1' : '16') : '0',
                    evaAccountStatus: isPPCRelevant ? 1 : 0,
                    amazonAccountStatus: isPPCRelevant ? 1 : 0,
                    sellerApiTokenStatus: isPPCRelevant ? 0 : 1,
                    marketplaceId: 'ATVPDKIKX0DER',
                    isSelectedForStore: true
                };
            });
            const isProjectExpired = pSubs.every(s => s.status === 'Cancelled');
            const mrr = isProjectExpired ? 0 : Math.floor(Math.random() * 8000) + 2000;
            const salesL30 = isProjectExpired ? 0 : Math.floor(Math.random() * 50000) + 10000;
            const salesP30 = salesL30 * (0.6 + Math.random() * 0.8);
            const salesL7 = (salesL30 / 4) * (0.8 + Math.random() * 0.4);
            const salesP7 = (salesL30 / 4) * (0.8 + Math.random() * 0.4);

            const initialUpdateStatus: 'blank' | 'draft' | 'sent' = Math.random() < 0.3 ? 'sent' : (Math.random() < 0.5 ? 'draft' : 'blank');
            const pObj: Project = {
                id: `${i + 1}-${p + 1}`,
                name: pName,
                subscriptions: pSubs,
                mrr,
                salesL30,
                salesP30,
                salesL7,
                salesP7,
                risk: riskObj,
                prevRisk: prevRiskObj,
                wow: WOW_CHANGES[wowIdx],
                lifetime: Math.floor(Math.random() * 24),
                am: AM_NAMES[Math.floor(Math.random() * AM_NAMES.length)],
                csm: CSM_NAMES[Math.floor(Math.random() * CSM_NAMES.length)],
                bm: BRAND_NAMES[Math.floor(Math.random() * BRAND_NAMES.length)],
                cm: CARE_NAMES[Math.floor(Math.random() * CARE_NAMES.length)],
                gd: DESIGNER_NAMES[Math.floor(Math.random() * DESIGNER_NAMES.length)],
                createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toLocaleDateString(),
                isMyProject: Math.random() < 0.3,
                hasNote: Math.random() < 0.6,
                contactEmail: `contact@${accName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
                contactName: accName,
                customerUpdateContent: '',
                notes: Math.random() < 0.6 ? (Math.random() < 0.5 ? "Urgent: Project needs a complete audit before the next weekly escalation meeting to avoid further delays." : "Client requested a shift in strategy regarding PPC goals for the upcoming quarter, targeting a 15% growth.") : "",
                customerUpdateStatus: initialUpdateStatus,
                customerUpdateSentAt: initialUpdateStatus === 'sent' ? new Date(Date.now() - Math.floor(Math.random() * 500000000)).toLocaleString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : undefined,
                overdueTasks: Math.random() < 0.3 ? Math.floor(Math.random() * 3) : 0,
                openTasks: Math.floor(Math.random() * 8) + 1,
                overdueTickets: Math.random() < 0.2 ? Math.floor(Math.random() * 2) : 0,
                openTickets: Math.floor(Math.random() * 5),
            };

            accProjects.push(pObj);
        }

        const firstP = accProjects[0];
        const generateAnalytics = () => ({
            adImpressions: Math.floor(Math.random() * 1000000) + 500000,
            clicks: Math.floor(Math.random() * 50000) + 10000,
            adOrders: Math.floor(Math.random() * 2000) + 500,
            adUnits: Math.floor(Math.random() * 2500) + 600,
            ctr: 1.5 + Math.random() * 2,
            cvr: 2.5 + Math.random() * 5,
            pageViews: Math.floor(Math.random() * 200000) + 50000,
            sessions: Math.floor(Math.random() * 100000) + 20000,
            orders: Math.floor(Math.random() * 5000) + 1000,
            units: Math.floor(Math.random() * 6000) + 1200,
            unitSessionPercent: 3.5 + Math.random() * 4,
            roi: Math.random() * 100,
            margin: 15 + Math.random() * 40
        });

        const accObj: Account = {
            id: i + 1,
            name: accName,
            initials: accName.split(' ').map(n => n[0]).join('').substring(0, 2),
            mrr: accProjects.reduce((s, p) => s + p.mrr, 0),
            salesL30: accProjects.reduce((s, p) => s + p.salesL30, 0),
            salesP30: accProjects.reduce((s, p) => s + p.salesP30, 0),
            salesL7: accProjects.reduce((s, p) => s + p.salesL7, 0),
            salesP7: accProjects.reduce((s, p) => s + p.salesP7, 0),
            subs: numProjs,
            hasNote: accProjects.some(p => p.hasNote),
            risk: RISKS[worstRiskIdx],
            prevRisk: firstP.prevRisk,
            wow: WOW_CHANGES[worstRiskIdx < 4 ? 1 : 2],
            lifetime: 12,
            am: firstP.am,
            csm: firstP.csm,
            bm: firstP.bm,
            cm: firstP.cm,
            gd: firstP.gd,
            createdAt: firstP.createdAt,
            projects: accProjects,
            expanded: false,
            contactEmail: `${CONTACT_NAMES[i % CONTACT_NAMES.length].toLowerCase().replace(/[^a-z0-9]/g, '.')}@${accName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
            contactName: CONTACT_NAMES[i % CONTACT_NAMES.length],
            status: (['Customer', 'Prospect', 'Suspect', 'Churn'][Math.floor(Math.random() * 4)]) as any,
            adEngineStatus: 'NA',
            analytics: {
                current: generateAnalytics(),
                previous: generateAnalytics()
            }
        };
        accObj.adEngineStatus = getAdEngineStatus(accObj);
        accounts.push(accObj);
    }
    return accounts;
};

const MOCK_PRODUCTS: ProductAnalytic[] = [
    {
        id: 'P1',
        evaProductId: 'EVA-PROD-001',
        platform: 'Shopify',
        image: 'https://karaca.akinoncdn.com/products/2023/10/18/683525/4fc8d0eb-8e5c-4d8b-9d6c-6a7f8e3f9a7a_size224x224_quality100_cropCenter.jpg',
        title: 'Hanging Garden Shelves - Wall or Ceiling Mount',
        skuAsin: 'V-UHSAOSNFAIWENF',
        variantName: 'Coffee Brownn / 2 Shelves',
        variantId: '50562778136879',
        tags: ['Best Seller', 'Premium'],
        vendor: 'Karaca Home',
        productType: 'Dinnerware',
        price: 499.99,
        totalSales: 125400.50,
        totalSoldQty: 251,
        totalOrderCount: 230,
        totalRefundQty: 5,
        totalDiscount: 12500.00,
        totalTax: 10032.04,
        totalDuty: 0,
        netSales: 102868.46,
        cog: 120.00,
        cogs: 30120.00,
        totalFee: 14880.00,
        totalExpenses: 45000.00,
        refundAmount: 2499.95,
        refundPercent: 1.9,
        profit: 57868.46,
        margin: 46.1,
        roi: 128.6,
        aov: 545.22,
        sessions: 12500,
        sessionPercent: 2.01,
        availableQty: 45
    },
    {
        id: 'P1-V2',
        evaProductId: 'EVA-PROD-001',
        platform: 'Amazon',
        image: 'https://karaca.akinoncdn.com/products/2023/10/18/683525/4fc8d0eb-8e5c-4d8b-9d6c-6a7f8e3f9a7a_size224x224_quality100_cropCenter.jpg',
        title: 'Hanging Garden Shelves - Wall or Ceiling Mount',
        skuAsin: 'V-UHSAOSNFAIWENF-BLK',
        variantName: 'Matte Black / 2 Shelves',
        variantId: '50562778136882',
        tags: ['New Color'],
        vendor: 'Karaca Home',
        productType: 'Dinnerware',
        price: 449.99,
        totalSales: 45000.00,
        totalSoldQty: 100,
        totalOrderCount: 95,
        totalRefundQty: 2,
        totalDiscount: 4500.00,
        totalTax: 3600.00,
        totalDuty: 0,
        netSales: 36900.00,
        cog: 110.00,
        cogs: 11000.00,
        totalFee: 5000.00,
        totalExpenses: 16000.00,
        refundAmount: 899.98,
        refundPercent: 2.0,
        profit: 20900.00,
        margin: 46.4,
        roi: 130.6,
        aov: 473.68,
        sessions: 5000,
        sessionPercent: 2.0,
        availableQty: 30
    },
    {
        id: 'P2',
        evaProductId: 'EVA-PROD-002',
        platform: 'Amazon',
        image: 'https://karaca.akinoncdn.com/products/2023/10/18/683526/b3c2d1e0-a9b8-4c7d-9e6f-5a4b3c2d1e0f_size224x224_quality100_cropCenter.jpg',
        title: 'Karaca Bio Diamond Pro 7 Parça Tencere Seti',
        skuAsin: 'KRC-DIAM-PRO-7',
        variantName: 'Standard / Professional',
        variantId: '60562778136880',
        tags: ['New Arrival'],
        vendor: 'Karaca Cookware',
        productType: 'Cookware',
        price: 299.99,
        totalSales: 85000.00,
        totalSoldQty: 283,
        totalOrderCount: 270,
        totalRefundQty: 12,
        totalDiscount: 5000.00,
        totalTax: 6800.00,
        totalDuty: 0,
        netSales: 73200.00,
        cog: 80.00,
        cogs: 22640.00,
        totalFee: 9360.00,
        totalExpenses: 32000.00,
        refundAmount: 3599.88,
        refundPercent: 4.2,
        profit: 41200.00,
        margin: 48.5,
        roi: 128.8,
        aov: 314.81,
        sessions: 9800,
        sessionPercent: 2.89,
        availableQty: 120
    },
    {
        id: 'P3',
        evaProductId: 'EVA-PROD-003',
        platform: 'Shopify',
        image: 'https://karaca.akinoncdn.com/products/2023/10/18/683527/c4d3e2f1-b0a9-4d8e-af0d-6b5c4d3e2f10_size224x224_quality100_cropCenter.jpg',
        title: 'Karaca Hatır Hüps Sütlü Türk Kahve Makinesi',
        skuAsin: 'KRC-HTR-HPS-RED',
        variantName: 'Red / Latte Support',
        variantId: '70562778136881',
        tags: ['Flash Sale'],
        vendor: 'Karaca Appliances',
        productType: 'Electronics',
        price: 149.99,
        totalSales: 45000.00,
        totalSoldQty: 300,
        totalOrderCount: 295,
        totalRefundQty: 3,
        totalDiscount: 2000.00,
        totalTax: 3600.00,
        totalDuty: 0,
        netSales: 39400.00,
        cog: 45.00,
        cogs: 13500.00,
        totalFee: 5100.00,
        totalExpenses: 18600.00,
        refundAmount: 449.97,
        refundPercent: 1.0,
        profit: 20800.00,
        margin: 46.2,
        roi: 111.8,
        aov: 152.54,
        sessions: 15000,
        sessionPercent: 2.00,
        availableQty: 200
    }
];


// --- Components ---

const Badge = ({ children, className, style, ...props }: { children: React.ReactNode, className?: string, style?: React.CSSProperties } & React.HTMLAttributes<HTMLSpanElement>) => (
    <span
        className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold transition-all border", className)}
        style={style}
        {...props}
    >
        {children}
    </span>
);

const RiskBadge = ({ risk, onUpdate }: { risk: Risk, onUpdate?: () => void }) => {
    const isWhite = risk.name.toLowerCase() === 'white';
    const isBlack = risk.name.toLowerCase() === 'black';
    const isNone = risk.name.toLowerCase() === 'none';
    const borderColor = isWhite ? '#e5e7eb' : (isBlack ? 'rgba(255,255,255,0.1)' : (risk.border || 'rgba(0,0,0,0.1)'));
    const dotBorder = isWhite ? '#d1d5db' : (isBlack ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.08)');
    const textColor = isBlack ? '#ffffff' : (isWhite ? 'inherit' : risk.hex);
    const dotColor = isBlack ? '#ffffff' : risk.hex;
    const borderStyle = isNone ? 'dashed' : 'solid';

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <div className="relative group/risk inline-block">
                    <Badge
                        style={{
                            backgroundColor: risk.bg,
                            color: textColor,
                            borderColor: borderColor,
                            borderStyle: borderStyle,
                            borderWidth: '0.5px'
                        }}
                        className={cn(onUpdate && "cursor-pointer hover:shadow-sm")}
                        onClick={onUpdate}
                    >
                        <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: dotColor, border: `0.5px solid ${dotBorder} ` }}
                        />
                        {risk.name}
                        {onUpdate && (
                            <Edit size={10} className="ml-1 opacity-0 group-hover/risk:opacity-100 transition-opacity" />
                        )}
                    </Badge>
                </div>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-[240px] p-3 text-[11px] font-medium leading-relaxed bg-slate-900 text-white border-slate-800 shadow-xl">
                {risk.desc}
            </TooltipContent>
        </Tooltip>
    );
};

const WowBadge = ({ wow }: { wow: WowChange }) => {
    const Icon = wow.type === "Positive" ? ArrowUpRight : (wow.type === "Negative" ? ArrowDownRight : Minus);
    return (
        <Badge className={wow.class} style={{ borderWidth: '0.5px' }}>
            <Icon size={10} strokeWidth={3} className="opacity-80" />
            {wow.label}
        </Badge>
    );
};

const SubscriptionList = ({ subs }: { subs: Subscription[] }) => {
    const [expanded, setExpanded] = useState(false);

    const getStatusColor = (status: SubscriptionStatus) => {
        switch (status) {
            case 'Active': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
            case 'Suspended': return 'bg-amber-50 text-amber-700 border-amber-100';
            case 'Cancelled': return 'bg-slate-50 text-slate-500 border-slate-100';
            default: return 'bg-blue-50 text-blue-700 border-blue-100';
        }
    };

    if (!subs || subs.length === 0) return <span className="text-slate-300">-</span>;

    const renderBadge = (sub: Subscription) => (
        <Badge className={cn("px-2 py-0.5 rounded text-[10px] font-bold", getStatusColor(sub.status))}>
            {sub.name} <span className="opacity-60 ml-1 font-medium">({sub.status})</span>
        </Badge>
    );

    if (subs.length <= 1) {
        return (
            <div className="flex flex-wrap gap-1">
                {renderBadge(subs[0])}
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-1.5 py-1">
            <div className="flex items-center gap-1.5">
                {renderBadge(subs[0])}
            </div>
            {!expanded && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setExpanded(true);
                    }}
                    className="text-[10px] font-bold text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-1 py-0.5 rounded transition-colors whitespace-nowrap w-fit"
                >
                    +{subs.length - 1} more
                </button>
            )}
            {expanded && (
                <div className="flex flex-wrap gap-1 animate-in fade-in slide-in-from-top-1 duration-200">
                    {subs.slice(1).map((s, i) => (
                        <React.Fragment key={i}>
                            {renderBadge(s)}
                        </React.Fragment>
                    ))}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setExpanded(false);
                        }}
                        className="text-[10px] font-bold text-slate-400 hover:text-slate-600 hover:bg-slate-100 px-1.5 py-0.5 rounded transition-colors"
                    >
                        Show less
                    </button>
                </div>
            )}
        </div>
    );
};

const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: val % 1 === 0 ? 0 : 2 }).format(val);

const StatRow = ({ label, value, subValue, colorClass = "text-slate-600 dark:text-slate-400", tooltip }: { label: string, value: string, subValue?: string, colorClass?: string, tooltip?: React.ReactNode }) => (
    <div className="flex justify-between items-center py-2 border-b border-slate-50 dark:border-slate-800 last:border-0 last:pb-0 group">
        <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500 font-medium">{label}</span>
            {tooltip && (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Info size={11} className="text-slate-300 hover:text-slate-500 cursor-help transition-colors" />
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-80">
                        <div className="text-xs space-y-1.5 leading-relaxed">{tooltip}</div>
                    </TooltipContent>
                </Tooltip>
            )}
        </div>
        <div className="text-right">
            <span className={`block font-medium text-sm ${colorClass}`}>{value}</span>
            {subValue && <span className="text-[10px] text-slate-400 block">{subValue}</span>}
        </div>
    </div>
);

const EditableStatRow = ({ label, value, onSave, tooltip }: { label: string, value: number, onSave: (v: number) => void, tooltip?: React.ReactNode }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [tempValue, setTempValue] = useState(value.toString());

    const handleSave = () => {
        const numValue = parseFloat(tempValue);
        if (!isNaN(numValue)) {
            onSave(numValue);
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        setTempValue(value.toString());
        setIsEditing(false);
    };

    return (
        <div className="flex justify-between items-center py-2 border-b border-slate-50 dark:border-slate-800 last:border-0 last:pb-0 group">
            <div className="flex items-center gap-1.5 font-medium">
                <span className="text-xs text-slate-500">{label}</span>
                {tooltip && (
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Info size={11} className="text-slate-300 hover:text-slate-500 cursor-help transition-colors" />
                        </TooltipTrigger>
                        <TooltipContent side="right" className="max-w-80">
                            <div className="text-xs space-y-1.5 leading-relaxed">{tooltip}</div>
                        </TooltipContent>
                    </Tooltip>
                )}
            </div>
            <div className="text-right flex items-center gap-2">
                {isEditing ? (
                    <div className="flex items-center gap-1.5">
                        <input
                            type="text"
                            value={tempValue}
                            onChange={(e) => setTempValue(e.target.value)}
                            className="w-20 px-1.5 py-0.5 text-xs font-bold border rounded bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            autoFocus
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSave();
                                if (e.key === 'Escape') handleCancel();
                            }}
                        />
                        <button onClick={handleSave} className="p-1 rounded bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400">
                            <Check size={12} />
                        </button>
                        <button onClick={handleCancel} className="p-1 rounded bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-500/10 dark:text-rose-400">
                            <X size={12} />
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 group/val">
                        <span className="font-bold text-sm text-slate-700 dark:text-slate-300 tabular-nums">
                            {formatCurrency(value)}
                        </span>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="p-1 rounded text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-all"
                        >
                            <Edit size={12} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

interface DashboardStatsProps {
    projects: any[];
    monthlyReimRun: number;
    setMonthlyReimRun: (v: number) => void;
    monthlyVendorRecovery: number;
    setMonthlyVendorRecovery: (v: number) => void;
    persona: string;
    data: any[];
    includeExpired: boolean;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ projects, monthlyReimRun, setMonthlyReimRun, monthlyVendorRecovery, setMonthlyVendorRecovery, persona, data, includeExpired }) => {
    // --- DYNAMIC CALCULATIONS ---

    const isBrandAd = persona === 'brand_ad_management';

    const allProjects = useMemo(() => {
        let base = data.flatMap(acc => acc.projects);
        if (!includeExpired) {
            base = base.filter(p => !p.subscriptions.every((s: any) => s.status === 'Cancelled'));
        }
        return base;
    }, [data, includeExpired]);

    const globalReimbCount = useMemo(() =>
        allProjects.reduce((sum: number, p: any) => sum + p.subscriptions.filter((s: any) => s.name === "Reimbursement").length, 0),
        [allProjects]);

    const globalRecoveryCount = useMemo(() =>
        allProjects.reduce((sum: number, p: any) => sum + p.subscriptions.filter((s: any) => s.name === "Vendor Recovery").length, 0),
        [allProjects]);

    const visibleReimbCount = projects.reduce((sum, p) => sum + p.subscriptions.filter((s: any) => s.name === "Reimbursement").length, 0);
    const visibleRecoveryCount = projects.reduce((sum, p) => sum + p.subscriptions.filter((s: any) => s.name === "Vendor Recovery").length, 0);

    const filterRatioForReimb = globalReimbCount > 0 ? visibleReimbCount / globalReimbCount : 0;
    const filterRatioForRecovery = globalRecoveryCount > 0 ? visibleRecoveryCount / globalRecoveryCount : 0;

    // In Brand/Ad view, we exclude Reimbursement and Recovery from MRR
    // In CEO view, we scale them by the amount of data shown
    const effectiveReim = isBrandAd ? 0 : (monthlyReimRun * filterRatioForReimb);
    const effectiveRecovery = isBrandAd ? 0 : (monthlyVendorRecovery * filterRatioForRecovery);

    const totalMrrGross = projects.reduce((sum: number, p: any) => sum + p.mrr, 0) + effectiveReim + effectiveRecovery;

    // "To be cancelled" is MRR of projects with "Black" risk type
    const toBeCancelledMrr = projects.filter((p: any) => p.risk.name.toLowerCase() === 'black').reduce((sum: number, p: any) => sum + p.mrr, 0);

    const totalMrrNet = totalMrrGross - toBeCancelledMrr;

    // Simple simulation for history
    const prevMrr = totalMrrGross * 0.985;

    // ARR
    const totalArrNet = totalMrrNet * 12;
    const totalArrGross = totalMrrGross * 12;
    const prevArr = prevMrr * 12;
    const toBeCancelledArr = toBeCancelledMrr * 12;

    // Accounts calculation based on visible projects
    const uniqueAccountIds = new Set(projects.map((p: any) => p.accountId));
    const activeAccountsSet = projects.filter((p: any) =>
        p.subscriptions.some((s: any) => s.status === 'Active' || s.status === 'Suspended')
    ).reduce((acc: Set<number>, p: any) => {
        acc.add(p.accountId);
        return acc;
    }, new Set<number>());

    const activeAccounts = activeAccountsSet.size;
    const totalVisibleAccounts = uniqueAccountIds.size;
    const churnAccounts = totalVisibleAccounts - activeAccounts;

    // Total Records (subscriptions count in visible projects)
    const totalRecords = projects.reduce((sum: number, p: any) =>
        sum + p.subscriptions.filter((s: any) => s.status === 'Active' || s.status === 'Suspended').length, 0
    );

    const avgRevenue = activeAccounts > 0 ? totalMrrGross / activeAccounts : 0;

    // Fixed / Variable Ops Simulation
    const totalSubsVariableFee = projects.reduce((sum: number, p: any) => sum + p.mrr, 0) * 0.05; // 5% fee on subscription MRR
    const endOfMonthCancelMrr = toBeCancelledMrr * 0.15; // 15% of black risk this month
    const endOfMonthCancelArr = endOfMonthCancelMrr * 12;
    const totalOpsRevenue = monthlyReimRun + monthlyVendorRecovery + totalSubsVariableFee;




    // Task Calculations
    const totalOverdue = projects.reduce((sum: number, p: any) => sum + (p.overdueTasks || 0), 0);
    const totalOpen = projects.reduce((sum: number, p: any) => sum + (p.openTasks || 0), 0);
    const totalUpcoming = Math.ceil(totalOpen * 0.4); // Mocking upcoming as 40% of open
    const totalNewlyClosed = Math.ceil(totalOpen * 0.25); // Mocking newly closed as 25% of open
    const velocityRatio = totalOpen > 0 ? (totalNewlyClosed / totalOpen).toFixed(2) : "0.00";

    // Ticket Calculations (Simulated from projects to respond to filters)
    // We assume ticket volume is roughly relative to project activity
    const totalOpenTickets = Math.ceil(totalOpen * 1.5); // Tickets often > Tasks
    const totalOverdueTickets = Math.ceil(totalOverdue * 1.2);
    const totalUpcomingTickets = Math.ceil(totalUpcoming * 1.1);
    const totalNewlyClosedTickets = Math.ceil(totalNewlyClosed * 1.3);
    const ticketVelocityRatio = totalOpenTickets > 0 ? (totalNewlyClosedTickets / totalOpenTickets).toFixed(2) : "0.00";

    return (
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-6">

            {/* Card 1: MRR Metrics */}
            <div className={cn(
                "bg-white dark:bg-slate-900 rounded-xl border border-[#eef0f3] dark:border-slate-800 shadow-sm hover:shadow-md transition-all relative overflow-hidden flex flex-col",
                isBrandAd ? "lg:col-span-3" : "lg:col-span-4"
            )}>

                <div className="grid grid-cols-1 lg:grid-cols-2 h-full divide-y lg:divide-y-0 lg:divide-x divide-slate-100 dark:divide-slate-800">

                    {/* LEFT COLUMN: TOTAL MRR */}
                    <div className="p-5 flex flex-col h-full">
                        {/* Header */}
                        <div className="flex items-center gap-2 mb-3 h-10">
                            <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-600">
                                <Activity size={18} />
                            </div>
                            <h3 className="text-xs font-black text-slate-900 dark:text-white tracking-tighter">Total MRR</h3>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Info size={13} className="text-slate-300 hover:text-slate-500 cursor-help ml-auto" />
                                </TooltipTrigger>
                                <TooltipContent side="top" className="max-w-80">
                                    <div className="space-y-2">
                                        <p className="font-bold border-b pb-1">Total MRR</p>
                                        <p>The total annualized monthly revenue from all active and suspended subscriptions.</p>
                                        <div className="bg-slate-50 dark:bg-slate-900 p-2 rounded text-[10px] font-mono leading-normal">
                                            Sum of (Monthly Subscription Price + Variable Fees) + Reimbursements + Recoveries
                                        </div>
                                    </div>
                                </TooltipContent>
                            </Tooltip>
                        </div>

                        {/* Hero Metric */}
                        <div className="mb-4">
                            <span className="text-3xl font-black tracking-tight text-slate-900 dark:text-white block mb-0.5">
                                {formatCurrency(totalMrrNet)}
                            </span>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest opacity-80">Net MRR (Without Cancel)</span>
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-slate-100 dark:bg-slate-800 mb-5"></div>

                        {/* Details List */}
                        <div className="space-y-0.5 flex-1 flex flex-col justify-center">
                            <StatRow
                                label="This Month"
                                value={formatCurrency(totalMrrGross)}
                                tooltip={<><p className="font-bold">Total MRR (This month)</p><p>Total verified MRR for the current month, including cancellations scheduled for later.</p></>}
                            />
                            <StatRow
                                label="Previous Month"
                                value={formatCurrency(prevMrr)}
                                tooltip={<><p className="font-bold">Previous Month MRR</p><p>Closing MRR from the last day of the previous month.</p></>}
                            />
                            <StatRow
                                label="To Be Cancelled"
                                value={formatCurrency(toBeCancelledMrr)}
                                colorClass="text-rose-600 font-bold"
                                tooltip={<><p className="font-bold">To Replaced MRR (Cancellations)</p><p>Revenue from subscriptions that are currently active but scheduled to cancel.</p></>}
                            />
                            <StatRow
                                label="End Of This Month"
                                value={formatCurrency(endOfMonthCancelMrr)}
                                colorClass="text-rose-600 font-bold"
                                tooltip={<><p className="font-bold">Month-End Cancellations</p><p>Revenue lost due to cancellations effective by the end of this month.</p></>}
                            />
                        </div>
                    </div>


                    {/* RIGHT COLUMN: ACCOUNTS */}
                    <div className="p-5 flex flex-col h-full bg-slate-50/40 dark:bg-slate-900/10">
                        {/* Header */}
                        <div className="flex items-center gap-2 mb-3 h-10">
                            <div className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600">
                                <Users size={18} />
                            </div>
                            <h3 className="text-xs font-black text-slate-900 dark:text-white tracking-tighter leading-tight">Account<br />Numbers</h3>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Info size={13} className="text-slate-300 hover:text-slate-500 cursor-help ml-auto self-start mt-1" />
                                </TooltipTrigger>
                                <TooltipContent side="top" className="max-w-64">
                                    <div className="space-y-1.5">
                                        <p className="font-bold">Account Metrics</p>
                                        <p>Overview of active accounts, churn, and subscriptions.</p>
                                    </div>
                                </TooltipContent>
                            </Tooltip>
                        </div>

                        {isBrandAd ? (
                            <div className="flex flex-col flex-1">
                                {/* Vertical Hero Metrics (Brand View) */}
                                <div className="flex flex-col flex-1 divide-y divide-slate-100 dark:divide-slate-800">
                                    {/* Active */}
                                    <div className="flex-1 flex flex-col items-center justify-center p-4">
                                        <span className="text-3xl font-black text-slate-900 dark:text-white mb-0.5 tracking-tighter">{activeAccounts}</span>
                                        <span className="text-[10px] font-black text-slate-400 tracking-widest text-center">Active Accounts</span>
                                    </div>
                                    {/* Churn */}
                                    <div className="flex-1 flex flex-col items-center justify-center p-4">
                                        <div className="flex items-center gap-1.5 text-rose-600 font-black bg-rose-50/80 dark:bg-rose-500/10 px-3 py-1 rounded-lg text-sm mb-0.5 shadow-sm border border-rose-100/50">
                                            <UserMinus size={14} />
                                            <span>{churnAccounts}</span>
                                        </div>
                                        <span className="text-[10px] font-black text-slate-400 tracking-widest text-center">Churned Accounts</span>
                                    </div>
                                    {/* Subs */}
                                    <div className="flex-1 flex flex-col items-center justify-center p-4">
                                        <span className="text-3xl font-black text-slate-900 dark:text-white mb-0.5 tracking-tighter">{totalRecords}</span>
                                        <span className="text-[10px] font-black text-slate-400 tracking-widest text-center">Active Subs.</span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col flex-1 pt-1">
                                {/* Horizontal Hero Grid (CEO View) */}
                                <div className="grid grid-cols-3 gap-2 mb-4">
                                    <div className="flex flex-col items-center justify-center">
                                        <span className="text-3xl font-black text-slate-900 dark:text-white mb-0.5 tracking-tighter">{activeAccounts}</span>
                                        <span className="text-[9px] font-black text-slate-400 tracking-widest">ACTIVE</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-center">
                                        <div className="flex items-center gap-1.5 text-rose-600 font-bold bg-rose-50/80 dark:bg-rose-500/10 px-3 py-1 rounded-full text-xs mb-0.5 shadow-sm border border-rose-100/30">
                                            <UserMinus size={13} />
                                            <span>{churnAccounts}</span>
                                        </div>
                                        <span className="text-[9px] font-black text-slate-400 tracking-widest">CHURNED</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-center">
                                        <span className="text-3xl font-black text-slate-900 dark:text-white mb-0.5 tracking-tighter">{totalRecords}</span>
                                        <span className="text-[9px] font-black text-slate-400 tracking-widest">SUBS.</span>
                                    </div>
                                </div>

                                <div className="h-px bg-slate-100 dark:bg-slate-800 mb-5"></div>

                                {/* Details List */}
                                <div className="space-y-0.5 flex-1 flex flex-col justify-center">
                                    <EditableStatRow
                                        label="Monthly Reim. Run"
                                        value={monthlyReimRun}
                                        onSave={setMonthlyReimRun}
                                        tooltip={<><p className="font-bold">Monthly Reimbursement Run Rate</p><p>Estimated monthly revenue from reimbursements.</p></>}
                                    />
                                    <EditableStatRow
                                        label="Monthly Recovery Run"
                                        value={monthlyVendorRecovery}
                                        onSave={setMonthlyVendorRecovery}
                                        tooltip={<><p className="font-bold">Monthly Vendor Recovery Run Rate</p><p>Estimated monthly revenue from vendor recoveries.</p></>}
                                    />
                                    <StatRow
                                        label="Avg. Rev. / Customer"
                                        value={formatCurrency(avgRevenue)}
                                        tooltip={<><p className="font-bold">Average Revenue Per Customer</p><p>Average monthly revenue generated per client account.</p></>}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Card 2: ARR Metrics */}
            <div className={cn(
                "bg-white dark:bg-slate-900 rounded-xl p-5 border border-[#eef0f3] dark:border-slate-800 shadow-sm hover:shadow-md transition-all relative overflow-hidden flex flex-col",
                "lg:col-span-2" // Always 2 units wide to keep it consistent
            )}>

                {/* Hero Section (NET ARR) */}
                <div className="mb-5 relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600">
                            <BarChart3 size={18} />
                        </div>
                        <h3 className="text-xs font-black text-slate-900 dark:text-white tracking-tighter">Total ARR</h3>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Info size={13} className="text-slate-300 hover:text-slate-500 cursor-help ml-auto" />
                            </TooltipTrigger>
                            <TooltipContent side="top" className="max-w-72">
                                <div className="space-y-1.5">
                                    <p className="font-bold">Total ARR</p>
                                    <p>Annualized run rate based on the current month's MRR.</p>
                                    <p className="text-xs bg-slate-50 dark:bg-slate-900 p-1.5 rounded font-mono">Total MRR * 12</p>
                                </div>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <div>
                        <span className="text-3xl font-black tracking-tight text-slate-900 dark:text-white block mb-0.5">
                            {formatCurrency(totalArrNet)}
                        </span>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest opacity-80">Net ARR (Without Cancel)</span>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-slate-100 dark:bg-slate-800 mb-2"></div>

                {/* Details List */}
                <div className="space-y-0.5 flex-1" >
                    <StatRow
                        label="This Month"
                        value={formatCurrency(totalArrGross)}
                        tooltip={<><p className="font-bold">Total ARR (This month)</p><p className="font-mono text-[10px] mt-1">Projected annualized revenue based on this month's performance.</p></>}
                    />
                    <StatRow
                        label="Previous Month"
                        value={formatCurrency(prevArr)}
                        tooltip={<><p className="font-bold">Previous Month ARR</p><p className="font-mono text-[10px] mt-1">Annualized run rate based on the previous month's closing MRR.</p></>}
                    />
                    <StatRow
                        label="To Be Cancelled"
                        value={formatCurrency(toBeCancelledArr)}
                        colorClass="text-rose-600"
                        tooltip={<><p className="font-bold">Revenue at Risk (ARR)</p><p className="font-mono text-[10px] mt-1">Annualized revenue at risk due to scheduled cancellations.</p></>}
                    />
                </div>
            </div >

            {/* Card 3: Tasks Metrics */}
            <div className={cn(
                "bg-white dark:bg-slate-900 rounded-xl border border-[#eef0f3] dark:border-slate-800 shadow-sm hover:shadow-md transition-all relative overflow-hidden flex flex-col",
                isBrandAd ? "lg:col-span-3 p-0" : "lg:col-span-2 p-5"
            )}>

                {isBrandAd ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 h-full divide-y lg:divide-y-0 lg:divide-x divide-slate-100 dark:divide-slate-800">
                        {/* LEFT COLUMN: TASKS */}
                        <div className="p-5 flex flex-col h-full">
                            <div className="flex items-center gap-2 mb-3 h-10">
                                <div className="p-1.5 rounded-lg bg-purple-50 dark:bg-purple-500/10 text-purple-600">
                                    <CheckSquare size={18} />
                                </div>
                                <h3 className="text-xs font-black text-slate-900 dark:text-white tracking-tighter">Tasks</h3>
                            </div>

                            <div className="mb-4">
                                <span className="text-3xl font-black tracking-tight text-rose-600 dark:text-rose-400 block mb-0.5">
                                    {totalOverdue}
                                </span>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest opacity-80">Overdue Tasks</span>
                            </div>

                            <div className="h-px bg-slate-100 dark:bg-slate-800 mb-5"></div>

                            <div className="space-y-0.5 flex-1 flex flex-col justify-center">
                                <StatRow label="Upcoming" value={totalUpcoming.toString()} />
                                <StatRow label="Open" value={totalOpen.toString()} />
                                <StatRow label="Newly Closed" value={totalNewlyClosed.toString()} colorClass="text-emerald-600" />
                                <StatRow label="Velocity Ratio" value={velocityRatio} />
                            </div>
                        </div>

                        {/* RIGHT COLUMN: TICKETS */}
                        <div className="p-5 flex flex-col h-full bg-slate-50/40 dark:bg-slate-900/10">
                            <div className="flex items-center gap-2 mb-3 h-10">
                                <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600">
                                    <MessageSquare size={18} />
                                </div>
                                <h3 className="text-xs font-black text-slate-900 dark:text-white tracking-tighter">Tickets</h3>
                            </div>

                            <div className="mb-4">
                                <span className="text-3xl font-black tracking-tight text-rose-600 dark:text-rose-400 block mb-0.5">
                                    {totalOverdueTickets}
                                </span>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest opacity-80">Overdue Tickets</span>
                            </div>

                            <div className="h-px bg-slate-100 dark:bg-slate-800 mb-5"></div>

                            <div className="space-y-0.5 flex-1 flex flex-col justify-center">
                                <StatRow label="Upcoming" value={totalUpcomingTickets.toString()} />
                                <StatRow label="Open" value={totalOpenTickets.toString()} />
                                <StatRow label="Newly Closed" value={totalNewlyClosedTickets.toString()} colorClass="text-emerald-600" />
                                <StatRow label="Velocity Ratio" value={ticketVelocityRatio} />
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Hero Section */}
                        <div className="mb-5 relative z-10">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-500/10 text-slate-600">
                                    <Activity size={18} />
                                </div>
                                <h3 className="text-xs font-black text-slate-900 dark:text-white tracking-tighter">Oversight Metrics</h3>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Info size={13} className="text-slate-300 hover:text-slate-500 cursor-help ml-auto" />
                                    </TooltipTrigger>
                                    <TooltipContent side="top" className="max-w-64">
                                        <div className="space-y-1.5">
                                            <p className="font-bold">Operational Overview</p>
                                            <p>Combined metrics for Tasks and Support Tickets (Format: Task / Ticket).</p>
                                        </div>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                            <div>
                                <div className="flex items-baseline gap-4 mb-0.5">
                                    <span className="text-3xl font-black tracking-tight text-rose-600 dark:text-rose-400 block mb-0.5">
                                        {totalOverdue} / {totalOverdueTickets}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Overdue Tasks / Tickets</span>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Info size={11} className="text-slate-300 hover:text-slate-500 cursor-help" />
                                        </TooltipTrigger>
                                        <TooltipContent side="top" className="max-w-64">
                                            <p className="font-bold">Overdue Items</p>
                                            <p>Items (Tasks / Tickets) that have passed their target dates.</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-slate-100 dark:bg-slate-800 mb-2" ></div >

                        {/* Details List */}
                        <div className="space-y-0.5 flex-1 flex flex-col justify-center" >
                            <StatRow
                                label="Upcoming"
                                value={`${totalUpcoming} / ${totalUpcomingTickets}`}
                                tooltip={<><p className="font-bold">Upcoming Items</p><p>Items due within the next week (Tasks / Tickets).</p></>}
                            />
                            < StatRow label="Open" value={`${totalOpen} / ${totalOpenTickets}`} />
                            < StatRow
                                label="Newly Closed"
                                value={`${totalNewlyClosed} / ${totalNewlyClosedTickets}`}
                                colorClass="text-emerald-600"
                                tooltip={<><p className="font-bold">Newly Closed</p><p>Items closed in the last week (Tasks / Tickets).</p></>}
                            />
                            < StatRow
                                label="Velocity Ratio"
                                value={`${velocityRatio} / ${ticketVelocityRatio}`}
                                tooltip={<><p className="font-bold">Velocity Ratio</p><p>Operational efficiency (Tasks / Tickets).</p></>}
                            />
                        </div >

                        {/* Footer Link */}
                        < div className="mt-3 pt-2 text-right" >
                            <button className="text-[10px] font-bold text-blue-600 hover:text-blue-700 hover:underline flex items-center justify-end gap-1 ml-auto transition-colors">
                                View Details <ChevronRight size={10} />
                            </button>
                        </div >
                    </>
                )}
            </div >

        </div >
    );
};

const CompactDashboardStats: React.FC<{ accounts: Account[] }> = ({ accounts }) => {
    // --- MOCK DATA OVERRIDE (Same as DashboardStats) ---
    const totalMrrNet = 333509.27;
    const totalArrNet = 4002111.24;
    const activeAccounts = 422;
    const churnAccounts = 11;
    const totalOpsRevenue = 80000;

    const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    }).format(val);

    return (
        <div className="flex items-center justify-between px-6 py-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/60 dark:border-slate-800 rounded-b-xl shadow-lg animate-in fade-in slide-in-from-top-1 duration-300 ring-1 ring-black/5">
            <div className="flex items-center gap-4 overflow-x-auto no-scrollbar">
                <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 dark:bg-slate-800 rounded-full border border-slate-100 dark:border-slate-700">
                    <span className="text-[10px] font-black text-slate-400 tracking-tighter">Live Stats</span>
                </div>

                <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-1" />

                <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                        <p className="text-[9px] font-bold text-slate-400 leading-none mb-0.5">MRR</p>
                        <p className="text-xs font-bold text-slate-900 dark:text-white tabular-nums leading-none tracking-tight">{formatCurrency(totalMrrNet)}</p>
                    </div>
                    <div className="flex flex-col border-l border-slate-100 dark:border-slate-800 pl-3">
                        <p className="text-[9px] font-bold text-slate-400 leading-none mb-0.5">ARR</p>
                        <p className="text-xs font-bold text-slate-900 dark:text-white tabular-nums leading-none tracking-tight">{formatCurrency(totalArrNet)}</p>
                    </div>
                    <div className="flex flex-col border-l border-slate-100 dark:border-slate-800 pl-3">
                        <p className="text-[9px] font-bold text-slate-400 leading-none mb-0.5">Accounts</p>
                        <div className="flex items-center gap-1.5 leading-none">
                            <span className="text-xs font-bold text-slate-900 dark:text-white tabular-nums tracking-tight">{activeAccounts}</span>
                            <span className="text-[9px] text-rose-500 font-black flex items-center gap-0.5 bg-rose-50 px-1 rounded">
                                <UserMinus size={8} /> {churnAccounts}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2">
            </div>
        </div>
    );
};


const PERSONAS = [
    { id: 'ceo', label: 'Strategic Oversight', title: 'Strategic Oversight', description: 'Executive Portfolio Integrity View' },
    { id: 'brand_ad_management', label: 'Brand / Ad. Management View', title: 'Brand / Ad. Management View', description: 'Unified Brand & Advertising Strategy Workspace' },
];

import AccountDetail from './AccountDetail';

export default function App() {
    const [currentPage, setCurrentPage] = useState<'dashboard' | 'account-detail' | 'tasks' | 'analytics' | 'clients' | 'chats' | 'settings' | 'help' | 'reimbursement-analytics' | 'conversion-intelligence-landing' | 'lists' | 'segments' | 'segment-builder'>('dashboard');
    const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['Amazon', 'Shopify', 'TikTok']);
    const [isFetchingAmazonData, setIsFetchingAmazonData] = useState(false);
    const [amazonAccountType, setAmazonAccountType] = useState<'Seller' | 'Vendor'>('Seller');
    const [selectedAccountTypes, setSelectedAccountTypes] = useState<string[]>(['Vendor', 'Seller']);
    const [isPlatformFilterOpen, setIsPlatformFilterOpen] = useState(false);
    const [isAccountTypeFilterOpen, setIsAccountTypeFilterOpen] = useState(false);
    const platformFilterRef = useRef<HTMLDivElement>(null);
    const accountTypeFilterRef = useRef<HTMLDivElement>(null);

    const INITIAL_TREND_METRICS = ['Sales', 'Profit', 'Order Count', 'Ad Sales', 'Ad AOV', 'Organic Sales', 'CPC'];
    const [visibleTrendMetrics, setVisibleTrendMetrics] = useState<string[]>(INITIAL_TREND_METRICS);
    const [selectedTrendMetrics, setSelectedTrendMetrics] = useState<string[]>(INITIAL_TREND_METRICS);

    const [selectedStore, setSelectedStore] = useState('all');
    const [isStoreSelectorOpen, setIsStoreSelectorOpen] = useState(false);
    const storeSelectorRef = useRef<HTMLDivElement>(null);

    const [data, setData] = useState(() => generateData());
    const [search, setSearch] = useState('');
    const [smartFiltersVisible, setSmartFiltersVisible] = useState(true);
    const [isScrolledPastFilters, setIsScrolledPastFilters] = useState(false);
    const [isScrolledPastSummary, setIsScrolledPastSummary] = useState(false);
    const [isScrolledPastProjects, setIsScrolledPastProjects] = useState(false);
    const [isScrolledPastTaskFilters, setIsScrolledPastTaskFilters] = useState(false);
    const [smartTaskFiltersVisible, setSmartTaskFiltersVisible] = useState(true);
    const [smartTaskFiltersVisibleActual, setSmartTaskFiltersVisibleActual] = useState(true);

    const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
    const [activeFilterTab, setActiveFilterTab] = useState<string>('');
    const [activePersona, setActivePersona] = useState('ceo');
    const [globalSearch, setGlobalSearch] = useState('');
    const [isGlobalSearchFocused, setIsGlobalSearchFocused] = useState(false);
    const [isSearchAccountListExpanded, setIsSearchAccountListExpanded] = useState(false);
    const globalSearchRef = useRef<HTMLDivElement>(null);
    const [isAmazonPage, setIsAmazonPage] = useState(false);
    const [isAdConnectionWizardOpen, setIsAdConnectionWizardOpen] = useState(false);
    const [isPricingDialogOpen, setIsPricingDialogOpen] = useState(false);
    const [showAdBanner, setShowAdBanner] = useState(() => localStorage.getItem('hideAdBanner') !== 'true');

    // Routing Logic for Conversion Intelligence Landing
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('view') === 'conversion-intelligence') {
            setCurrentPage('conversion-intelligence-landing');
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (globalSearchRef.current && !globalSearchRef.current.contains(event.target as Node)) {
                setIsGlobalSearchFocused(false);
            }
            if (accountSelectorRef.current && !accountSelectorRef.current.contains(event.target as Node)) {
                setIsAccountSelectorOpen(false);
            }
            if (platformFilterRef.current && !platformFilterRef.current.contains(event.target as Node)) {
                setIsPlatformFilterOpen(false);
            }
            if (accountTypeFilterRef.current && !accountTypeFilterRef.current.contains(event.target as Node)) {
                setIsAccountTypeFilterOpen(false);
            }
            if (storeSelectorRef.current && !storeSelectorRef.current.contains(event.target as Node)) {
                setIsStoreSelectorOpen(false);
            }
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
                setIsProfileMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const globalSearchResults = useMemo(() => {
        if (!globalSearch) return {};
        const term = globalSearch.toLowerCase();

        const byName: { title: string; accountName: string; initial: string; account: Account }[] = [];
        const byProject: { title: string; accountName: string; initial: string; account: Account; match: string }[] = [];
        const byStore: { title: string; accountName: string; initial: string; account: Account; match: string }[] = [];
        const byContact: { title: string; accountName: string; initial: string; account: Account; match: string }[] = [];
        const byTeam: { title: string; accountName: string; initial: string; account: Account; role: string; projectCount: number }[] = [];

        data.forEach(acc => {
            // By name
            if (acc.name.toLowerCase().includes(term)) {
                byName.push({ title: acc.name, accountName: acc.name, initial: acc.initials, account: acc });
            }

            // By project
            acc.projects.forEach(proj => {
                if (proj.name.toLowerCase().includes(term)) {
                    byProject.push({ title: acc.name, accountName: acc.name, initial: acc.initials, account: acc, match: proj.name });
                }
            });

            // By store
            const storeTargets: string[] = [
                ...(Array.isArray((acc as any).stores) ? (acc as any).stores : []),
                (acc as any).storeUrl, (acc as any).shopifyUrl
            ].filter((s): s is string => typeof s === 'string' && s.length > 0);
            storeTargets.forEach((s: string) => {
                if (s.toLowerCase().includes(term)) {
                    byStore.push({ title: acc.name, accountName: acc.name, initial: acc.initials, account: acc, match: s });
                }
            });

            // By contact
            const contactHit = ([acc.contactName, acc.contactEmail] as (string | undefined)[]).filter((c): c is string => typeof c === 'string' && c.toLowerCase().includes(term))[0];
            if (contactHit) {
                byContact.push({ title: acc.name, accountName: acc.name, initial: acc.initials, account: acc, match: `${acc.contactName || ''} ${acc.contactEmail ? '·  ' + acc.contactEmail : ''}`.trim() });
            }

            // By team member — search across ALL projects, deduplicate by account
            const teamMatchMap = new Map<number, { roleSet: Set<string>; matchedName: string; count: number }>();
            acc.projects.forEach(proj => {
                const projRoles = [
                    { role: 'AM', name: proj.am },
                    { role: 'BM', name: proj.bm },
                    { role: 'CSM', name: proj.csm },
                    { role: 'CM', name: proj.cm },
                    { role: 'GD', name: proj.gd },
                ];
                projRoles.forEach(tm => {
                    if (tm.name && tm.name.toLowerCase().includes(term)) {
                        const existing = teamMatchMap.get(acc.id);
                        if (existing) {
                            existing.roleSet.add(tm.role);
                            existing.count++;
                        } else {
                            teamMatchMap.set(acc.id, { roleSet: new Set([tm.role]), matchedName: tm.name, count: 1 });
                        }
                    }
                });
            });
            teamMatchMap.forEach(({ roleSet, matchedName, count }) => {
                const roles = Array.from(roleSet).join(', ');
                byTeam.push({
                    title: acc.name,
                    accountName: acc.name,
                    initial: acc.initials,
                    account: acc,
                    role: `${matchedName} · ${roles}`,
                    projectCount: count,
                });
            });
        });

        return {
            byName: byName.slice(0, 10),
            byProject: byProject.slice(0, 10),
            byStore: byStore.slice(0, 10),
            byContact: byContact.slice(0, 10),
            byTeam: byTeam.slice(0, 30),
        };
    }, [globalSearch, data, selectedAccount]);

    const globalSearchHasResults = Object.values(globalSearchResults).some((g: any) => g?.length > 0);

    // User Role State
    const [userRole, setUserRole] = useState('eva_personel');

    // userRole değişince activePersona'yı uygun default'a getir
    useEffect(() => {
        if (userRole === 'eva_personel') {
            setActivePersona('brand_ad_management');
        } else if (userRole === 'eva_admin') {
            setActivePersona('ceo');
        }
    }, [userRole]);

    // Account Selector State
    const [isAccountSelectorOpen, setIsAccountSelectorOpen] = useState(false);
    const [accountSelectorSearch, setAccountSelectorSearch] = useState('');
    const accountSelectorRef = useRef<HTMLDivElement>(null);

    // Reimbursement Tab State
    const [reimbursementTab, setReimbursementTab] = useState('analytics');


    // Package State
    const [selectedPackage, setSelectedPackage] = useState('eva_ai');
    const [isSubscriptionRequested, setIsSubscriptionRequested] = useState(false);

    // Profile Menu State
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const profileMenuRef = useRef<HTMLDivElement>(null);

    // Theme State
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') === 'dark' ||
                (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
                ? 'dark'
                : 'light';
        }
        return 'light';
    });



    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);


    // Filter states
    const [selectedRisks, setSelectedRisks] = useState<string[]>(RISKS.map(r => r.name.toLowerCase()));
    const [selectedPrevRisks, setSelectedPrevRisks] = useState<string[]>(RISKS.map(r => r.name.toLowerCase()));
    const [riskViewMode, setRiskViewMode] = useState<'current' | 'previous'>('current');
    const [selectedWows, setSelectedWows] = useState<string[]>(['pos', 'neg', 'none']);
    const [selectedOwners, setSelectedOwners] = useState<string[]>(['my', 'other']);
    const [selectedUpdates, setSelectedUpdates] = useState<string[]>(['sent', 'draft', 'blank']);

    const allowFinancials = useMemo(() => {
        if (activePersona === 'ceo' || activePersona === 'brand_ad_management') return true;
        return selectedOwners.length === 1 && selectedOwners[0] === 'my';
    }, [selectedOwners, activePersona]);

    // Global simulation values for Operations
    const [monthlyReimRun, setMonthlyReimRun] = useState(40000);
    const [monthlyVendorRecovery, setMonthlyVendorRecovery] = useState(40000);


    // New Advanced Filters
    const [filterAccountName, setFilterAccountName] = useState('');

    const [filterSubs, setFilterSubs] = useState<number | ''>('');
    const [filterSubsOperator, setFilterSubsOperator] = useState<string>('>=');
    const [filterSubsEnd, setFilterSubsEnd] = useState<number | ''>('');

    const [filterMrr, setFilterMrr] = useState<number | ''>('');
    const [filterMrrOperator, setFilterMrrOperator] = useState<string>('>=');
    const [filterMrrEnd, setFilterMrrEnd] = useState<number | ''>('');

    const [filterLifetime, setFilterLifetime] = useState<number | ''>('');
    const [filterLifetimeOperator, setFilterLifetimeOperator] = useState<string>('>=');
    const [filterLifetimeEnd, setFilterLifetimeEnd] = useState<number | ''>('');

    const [filterL30Ratio, setFilterL30Ratio] = useState<number | ''>('');
    const [filterL30Operator, setFilterL30Operator] = useState<string>('>=');
    const [filterL30End, setFilterL30End] = useState<number | ''>('');

    const [filterL7Ratio, setFilterL7Ratio] = useState<number | ''>('');
    const [filterL7Operator, setFilterL7Operator] = useState<string>('>=');
    const [filterL7End, setFilterL7End] = useState<number | ''>('');

    const [filterManagers, setFilterManagers] = useState({
        am: [] as string[],
        bm: [] as string[],
        csm: [] as string[],
        cm: [] as string[],
        gd: [] as string[]
    });
    const [filterDateStart, setFilterDateStart] = useState('');
    const [filterDateEnd, setFilterDateEnd] = useState('');
    const [filterProjectName, setFilterProjectName] = useState('');
    const [filterSubsName, setFilterSubsName] = useState('');
    const [filterNotes, setFilterNotes] = useState('');
    const [filterIncludeExpired, setFilterIncludeExpired] = useState(false);
    const [filterRiskLevels, setFilterRiskLevels] = useState<string[]>([]);
    const [filterWowChanges, setFilterWowChanges] = useState<string[]>([]);
    const [filterUpdateStatus, setFilterUpdateStatus] = useState<string[]>([]);
    const [filterAccountStatus, setFilterAccountStatus] = useState<string[]>([]);
    const [filterAdEngineStatus, setFilterAdEngineStatus] = useState<string[]>([]);
    const [filterSubsTypes, setFilterSubsTypes] = useState<string[]>([]);

    const storedFilters = useRef<{ [key: string]: any }>({});

    const handlePersonaChange = (newPersona: string) => {
        // 1. Save current state
        storedFilters.current[activePersona] = {
            search,
            selectedRisks, selectedPrevRisks, riskViewMode, selectedWows, selectedOwners, selectedUpdates,
            filterAccountName,
            filterSubs, filterSubsOperator, filterSubsEnd,
            filterMrr, filterMrrOperator, filterMrrEnd,
            filterLifetime, filterLifetimeOperator, filterLifetimeEnd,
            filterL30Ratio, filterL30Operator, filterL30End,
            filterL7Ratio, filterL7Operator, filterL7End,
            filterManagers,
            filterDateStart, filterDateEnd,
            filterProjectName, filterSubsName, filterNotes,
            filterIncludeExpired,
            filterRiskLevels, filterWowChanges, filterUpdateStatus, filterSubsTypes, filterAccountStatus
        };

        // 2. Load next state (or defaults)
        const next = storedFilters.current[newPersona];

        if (next) {
            setSearch(next.search);
            setSelectedRisks(next.selectedRisks);
            setSelectedPrevRisks(next.selectedPrevRisks || RISKS.map(r => r.name.toLowerCase()));
            setRiskViewMode(next.riskViewMode || 'current');
            setSelectedWows(next.selectedWows);
            setSelectedOwners(next.selectedOwners);
            setSelectedUpdates(next.selectedUpdates);
            setFilterAccountName(next.filterAccountName);
            setFilterSubs(next.filterSubs); setFilterSubsOperator(next.filterSubsOperator); setFilterSubsEnd(next.filterSubsEnd);
            setFilterMrr(next.filterMrr); setFilterMrrOperator(next.filterMrrOperator); setFilterMrrEnd(next.filterMrrEnd);
            setFilterLifetime(next.filterLifetime); setFilterLifetimeOperator(next.filterLifetimeOperator); setFilterLifetimeEnd(next.filterLifetimeEnd);
            setFilterL30Ratio(next.filterL30Ratio); setFilterL30Operator(next.filterL30Operator); setFilterL30End(next.filterL30End);
            setFilterL7Ratio(next.filterL7Ratio); setFilterL7Operator(next.filterL7Operator); setFilterL7End(next.filterL7End);
            setFilterManagers(next.filterManagers);
            setFilterDateStart(next.filterDateStart); setFilterDateEnd(next.filterDateEnd);
            setFilterProjectName(next.filterProjectName); setFilterSubsName(next.filterSubsName); setFilterNotes(next.filterNotes);
            setFilterIncludeExpired(next.filterIncludeExpired);
            setFilterRiskLevels(next.filterRiskLevels); setFilterWowChanges(next.filterWowChanges); setFilterUpdateStatus(next.filterUpdateStatus); setFilterSubsTypes(next.filterSubsTypes);
            setFilterAccountStatus(next.filterAccountStatus || []);
        } else {
            // Defaults
            setSearch('');
            setSelectedRisks(RISKS.map(r => r.name.toLowerCase()));
            setSelectedPrevRisks(RISKS.map(r => r.name.toLowerCase()));
            setRiskViewMode('current');
            setSelectedWows(['pos', 'neg', 'none']);
            setSelectedUpdates(['sent', 'draft', 'blank']);

            // Advanced Filters Defaults
            setFilterAccountName('');
            setFilterSubs(''); setFilterSubsOperator('>='); setFilterSubsEnd('');
            setFilterMrr(''); setFilterMrrOperator('>='); setFilterMrrEnd('');
            setFilterLifetime(''); setFilterLifetimeOperator('>='); setFilterLifetimeEnd('');
            setFilterL30Ratio(''); setFilterL30Operator('>='); setFilterL30End('');
            setFilterL7Ratio(''); setFilterL7Operator('>='); setFilterL7End('');
            setFilterManagers({ am: [], bm: [], csm: [], cm: [], gd: [] });
            setFilterDateStart(''); setFilterDateEnd('');
            setFilterProjectName(''); setFilterSubsName(''); setFilterNotes('');
            setFilterIncludeExpired(false);
            setFilterRiskLevels([]); setFilterWowChanges([]); setFilterUpdateStatus([]); setFilterSubsTypes([]);
            setFilterAccountStatus([]);

            // Default Owners logic
            if (newPersona === 'brand_ad_management') {
                setSelectedOwners(['my']);
            } else {
                setSelectedOwners(['my', 'other']);
            }
        }

        setActivePersona(newPersona);
    };



    const [draftRisks, setDraftRisks] = useState<string[]>([]);
    const [draftWows, setDraftWows] = useState<string[]>([]);
    const [draftOwners, setDraftOwners] = useState<string[]>([]);
    const [draftAccountName, setDraftAccountName] = useState('');
    const [draftSubs, setDraftSubs] = useState<number | ''>('');
    const [draftSubsOperator, setDraftSubsOperator] = useState('>');
    const [draftSubsEnd, setDraftSubsEnd] = useState<number | ''>('');
    const [draftMrr, setDraftMrr] = useState<number | ''>('');
    const [draftMrrOperator, setDraftMrrOperator] = useState('>');
    const [draftMrrEnd, setDraftMrrEnd] = useState<number | ''>('');
    const [draftLifetime, setDraftLifetime] = useState<number | ''>('');
    const [draftLifetimeOperator, setDraftLifetimeOperator] = useState('>');
    const [draftLifetimeEnd, setDraftLifetimeEnd] = useState<number | ''>('');
    const [draftL30Ratio, setDraftL30Ratio] = useState<number | ''>('');
    const [draftL30Operator, setDraftL30Operator] = useState('>');
    const [draftL30End, setDraftL30End] = useState<number | ''>('');
    const [draftL7Ratio, setDraftL7Ratio] = useState<number | ''>('');
    const [draftL7Operator, setDraftL7Operator] = useState('>');
    const [draftL7End, setDraftL7End] = useState<number | ''>('');
    const [draftManagers, setDraftManagers] = useState<{ am: string[], bm: string[], csm: string[], cm: string[], gd: string[] }>({ am: [], bm: [], csm: [], cm: [], gd: [] });
    const [draftDateStart, setDraftDateStart] = useState('');
    const [draftDateEnd, setDraftDateEnd] = useState('');
    const [draftProjectName, setDraftProjectName] = useState('');
    const [draftSubsName, setDraftSubsName] = useState('');
    const [draftNotes, setDraftNotes] = useState('');
    const [draftIncludeExpired, setDraftIncludeExpired] = useState(false);
    const [draftRiskLevels, setDraftRiskLevels] = useState<string[]>([]);
    const [draftWowChanges, setDraftWowChanges] = useState<string[]>([]);
    const [draftUpdateStatus, setDraftUpdateStatus] = useState<string[]>([]);
    const [draftSubsTypes, setDraftSubsTypes] = useState<string[]>([]);
    const [draftAccountStatus, setDraftAccountStatus] = useState<string[]>([]);
    const [draftAdEngineStatus, setDraftAdEngineStatus] = useState<string[]>([]);




    // Filter states (Need to match what's used in handleApplyFilters)


    // Quick Filter Sentences (derived from stats usually, but if state is needed)
    // kept simple for now


    const getRoleMembers = (role: string | null) => {
        switch (role) {
            case 'am': return AM_NAMES;
            case 'bm': return BRAND_NAMES;
            case 'csm': return CSM_NAMES;
            case 'cm': return CARE_NAMES;
            case 'gd': return DESIGNER_NAMES;
            default: return [];
        }
    }

    const getRoleLabel = (role: string | null) => {
        switch (role) {
            case 'am': return 'Advertising Manager';
            case 'bm': return 'Brand Manager';
            case 'csm': return 'Care Manager';
            case 'cm': return 'Escalation Manager';
            case 'gd': return 'Graphic Designer';
            default: return 'Team Member';
        }
    }

    const [editingTeamProject, setEditingTeamProject] = useState<any>(null);
    const [editingTeamRole, setEditingTeamRole] = useState<'am' | 'bm' | 'csm' | 'cm' | 'gd' | null>(null);
    const [isTeamDialogOpen, setIsTeamDialogOpen] = useState(false);
    const [teamSearch, setTeamSearch] = useState('');
    const [tempSelectedMembers, setTempSelectedMembers] = useState<string[]>([]);
    const [draftFilterSearch, setDraftFilterSearch] = useState('');
    const [filterDialogSingleMode, setFilterDialogSingleMode] = useState(false);
    const [filterDialogPos, setFilterDialogPos] = useState<{ top: number, left: number } | null>(null);

    const [taskView, setTaskView] = useState<'kanban' | 'table'>('kanban');
    const [taskGroupBy, setTaskGroupBy] = useState<'status' | 'priority' | 'dueDate' | 'team'>('status');
    const [taskSearch, setTaskSearch] = useState('');
    const [analyticsTab, setAnalyticsTab] = useState<'account' | 'product' | 'campaign'>('account');
    const [showProfitBreakdown, setShowProfitBreakdown] = useState(false);
    const [showSalesBreakdown, setShowSalesBreakdown] = useState(false);
    const [showExpenseBreakdown, setShowExpenseBreakdown] = useState(false);
    const [acosDisplayType, setAcosDisplayType] = useState<'acos' | 'roas'>('acos');
    const [hoveredDonutSegment, setHoveredDonutSegment] = useState<{ label: string; value: string } | null>(null);

    const analyticsData = useMemo(() => {
        if (selectedAccount?.analytics) return selectedAccount.analytics;
        
        const aggregate = (period: 'current' | 'previous') => {
            const result: AccountAnalytics = {
                adImpressions: 0, clicks: 0, adOrders: 0, adUnits: 0, ctr: 0, cvr: 0,
                pageViews: 0, sessions: 0, orders: 0, units: 0, unitSessionPercent: 0,
                roi: 0, margin: 0
            };
            data.forEach(acc => {
                const a = acc.analytics?.[period];
                if (a) {
                    result.adImpressions += a.adImpressions;
                    result.clicks += a.clicks;
                    result.adOrders += a.adOrders;
                    result.adUnits += a.adUnits;
                    result.pageViews += a.pageViews;
                    result.sessions += a.sessions;
                    result.orders += a.orders;
                    result.units += a.units;
                }
            });
            result.ctr = (result.clicks / result.adImpressions) * 100 || 0;
            result.cvr = (result.adOrders / result.clicks) * 100 || 0;
            result.unitSessionPercent = (result.units / result.sessions) * 100 || 0;
            return result;
        };

        return {
            current: aggregate('current'),
            previous: aggregate('previous')
        };
    }, [selectedAccount, data]);
    const [analyticsPeriod, setAnalyticsPeriod] = useState<'Daily' | 'Weekly' | 'Monthly'>('Daily');
    const [analyticsSearch, setAnalyticsSearch] = useState('');
    const [analyticsSortField, setAnalyticsSortField] = useState<keyof ProductAnalytic>('totalSales');
    const [analyticsSortDirection, setAnalyticsSortDirection] = useState<'asc' | 'desc'>('desc');
    const [analyticsGroupBy, setAnalyticsGroupBy] = useState<'Product' | 'Variant'>('Variant');
    const [expandedAnalyticsProducts, setExpandedAnalyticsProducts] = useState<string[]>([]);
    const [selectedTaskStatuses, setSelectedTaskStatuses] = useState<string[]>(['Assigned to Me', 'Watchdog', 'Reported by Me']);
    const [selectedTaskTypes, setSelectedTaskTypes] = useState<string[]>(['Task', 'Ticket']);
    const [selectedTaskPriorities, setSelectedTaskPriorities] = useState<string[]>(['High', 'Medium']);
    const [selectedTaskTimelines, setSelectedTaskTimelines] = useState<string[]>(['On Track', 'Overdue', 'Other']);

    // Analytics Derived Data
    const isShopifySelected = selectedPlatforms.includes('Shopify');
    const isAmazonSelected = selectedPlatforms.includes('Amazon');
    const isUnified = isShopifySelected && isAmazonSelected;

    const PRODUCT_COLUMNS: { id: keyof ProductAnalytic | 'image' | 'product'; label: string; width: number; align?: 'right' | 'left'; shopifyOnly?: boolean; unifiedOnly?: boolean }[] = useMemo(() => [
        { id: 'image', label: '', width: 50 },
        { id: 'evaProductId', label: 'Eva Product ID', width: 140, unifiedOnly: true },
        { id: 'product', label: 'Product', width: 320 },
        { id: 'tags', label: 'Tags', width: 140 },
        { id: 'vendor', label: 'Vendor', width: 140, shopifyOnly: true },
        { id: 'productType', label: 'Product Type', width: 140, shopifyOnly: true },
        { id: 'price', label: 'Price', width: 100, align: 'right' },
        { id: 'totalSales', label: 'Sales', width: 120, align: 'right' },
        { id: 'totalSoldQty', label: 'Quantity', width: 100, align: 'right' },
        { id: 'totalOrderCount', label: 'Order Count', width: 110, align: 'right' },
        { id: 'totalRefundQty', label: 'Refund Quantity', width: 130, align: 'right' },
        { id: 'totalDiscount', label: 'Discount', width: 110, align: 'right', shopifyOnly: true },
        { id: 'totalTax', label: 'Tax', width: 100, align: 'right', shopifyOnly: true },
        { id: 'totalDuty', label: 'Duties', width: 100, align: 'right', shopifyOnly: true },
        { id: 'netSales', label: 'Net Sales', width: 120, align: 'right', shopifyOnly: true },
        { id: 'cog', label: 'COG', width: 100, align: 'right' },
        { id: 'cogs', label: 'COGS', width: 100, align: 'right' },
        { id: 'totalFee', label: 'Total Fee', width: 110, align: 'right' },
        { id: 'totalExpenses', label: 'Total Expenses', width: 130, align: 'right' },
        { id: 'refundAmount', label: 'Refund Amount', width: 130, align: 'right' },
        { id: 'refundPercent', label: 'Refund %', width: 100, align: 'right' },
        { id: 'profit', label: 'Profit', width: 110, align: 'right' },
        { id: 'margin', label: 'Margin', width: 100, align: 'right' },
        { id: 'roi', label: 'ROI', width: 100, align: 'right' },
        { id: 'aov', label: 'AOV', width: 100, align: 'right' },
        { id: 'sessions', label: 'Sessions', width: 110, align: 'right' },
        { id: 'sessionPercent', label: 'Session %', width: 100, align: 'right' },
        { id: 'availableQty', label: 'Available Quantity', width: 150, align: 'right' },
    ], []);

    const visibleAnalyticsCols = useMemo(() => PRODUCT_COLUMNS.filter(col => {
        if (col.unifiedOnly) return isUnified;
        if (col.shopifyOnly) return isShopifySelected && !isAmazonSelected;
        return true;
    }), [PRODUCT_COLUMNS, isUnified, isShopifySelected, isAmazonSelected]);

    const processedAnalyticsData = useMemo(() => {
        let baseData = [...MOCK_PRODUCTS];
        if (analyticsSearch) {
            const s = analyticsSearch.toLowerCase();
            baseData = baseData.filter(p => p.title.toLowerCase().includes(s) || p.skuAsin.toLowerCase().includes(s) || p.variantName?.toLowerCase().includes(s));
        }

        // Filter by platform
        baseData = baseData.filter(p => p.platform && selectedPlatforms.includes(p.platform));

        if (analyticsGroupBy === 'Variant' && !isUnified) {
            return baseData.sort((a, b) => {
                const aVal = a[analyticsSortField] ?? 0;
                const bVal = b[analyticsSortField] ?? 0;
                return analyticsSortDirection === 'asc' ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1);
            }).map(p => ({ ...p, isParent: false }));
        }

        // Group by Product
        const groups: Record<string, any> = {};
        baseData.forEach(p => {
            if (!groups[p.title]) {
                groups[p.title] = {
                    ...p,
                    id: `group-${p.id}`,
                    isParent: true,
                    variants: [],
                    totalSales: 0,
                    totalSoldQty: 0,
                    totalOrderCount: 0,
                    totalRefundQty: 0,
                    totalDiscount: 0,
                    totalTax: 0,
                    totalDuty: 0,
                    netSales: 0,
                    totalExpenses: 0,
                    refundAmount: 0,
                    profit: 0,
                    sessions: 0,
                    availableQty: 0,
                    cog: 0,
                    cogs: 0,
                    totalFee: 0,
                };
            }
            const g = groups[p.title];
            g.variants.push(p);
            g.totalSales += p.totalSales;
            g.totalSoldQty += p.totalSoldQty;
            g.totalOrderCount += p.totalOrderCount;
            g.totalRefundQty += p.totalRefundQty;
            g.totalDiscount += p.totalDiscount;
            g.totalTax += p.totalTax;
            g.totalDuty += p.totalDuty;
            g.netSales += p.netSales;
            g.totalExpenses += p.totalExpenses;
            g.refundAmount += p.refundAmount;
            g.profit += p.profit;
            g.sessions += p.sessions;
            g.availableQty += p.availableQty;
            g.cog = p.cog; // Assuming same for product group for simplicity
            g.cogs += p.cogs;
            g.totalFee += p.totalFee;
        });

        const processedGroups = Object.values(groups).map((g: any) => {
            const tagStats: Record<string, { count: number, hasShopify: boolean, hasAmazon: boolean }> = {};
            const numVariants = g.variants.length;
            g.variants.forEach((v: any) => {
                const vTags = v.tags || [];
                const isShopify = v.platform === 'Shopify';
                const isAmazon = v.platform === 'Amazon';
                vTags.forEach((t: string) => {
                    if (!tagStats[t]) {
                        tagStats[t] = { count: 0, hasShopify: false, hasAmazon: false };
                    }
                    tagStats[t].count++;
                    if (isShopify) tagStats[t].hasShopify = true;
                    if (isAmazon) tagStats[t].hasAmazon = true;
                });
            });
            g.enrichedTags = Object.entries(tagStats).map(([tag, stats]) => ({
                text: tag,
                isPartial: stats.count < numVariants,
                isShopifyTag: stats.hasShopify && !stats.hasAmazon
            }));
            return g;
        });

        return processedGroups.sort((a: any, b: any) => {
            const aVal = a[analyticsSortField] ?? 0;
            const bVal = b[analyticsSortField] ?? 0;
            return analyticsSortDirection === 'asc' ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1);
        });
    }, [analyticsGroupBy, analyticsSortField, analyticsSortDirection, analyticsSearch, isUnified, selectedPlatforms]);

    // Switch to product tab for shopify/multichannel customers since account tab is hidden
    // Switch to product tab for shopify/unified views since account tab is hidden/amazon-only
    useEffect(() => {
        const isShopifyActive = selectedPlatforms.includes('Shopify');
        const isAmazonOnly = selectedPlatforms.length === 1 && selectedPlatforms[0] === 'Amazon';
        
        if (isShopifyActive && !isAmazonOnly && analyticsTab === 'account') {
            setAnalyticsTab('product');
        }
    }, [selectedPlatforms, analyticsTab]);

    // Ensure Vendor is not selected and only Amazon is active on reimbursement analytics page
    useEffect(() => {
        if (currentPage === 'reimbursement-analytics') {
            if (selectedAccountTypes.includes('Vendor')) {
                setSelectedAccountTypes(prev => {
                    const filtered = prev.filter(t => t !== 'Vendor');
                    return filtered.length === 0 ? ['Seller'] : filtered;
                });
            }
            if (selectedPlatforms.includes('Shopify') || selectedPlatforms.includes('TikTok')) {
                setSelectedPlatforms(['Amazon']);
            }
        }
    }, [currentPage, selectedAccountTypes, selectedPlatforms]);

    // Reset fetching state after delay
    useEffect(() => {
        if (isFetchingAmazonData) {
            const timer = setTimeout(() => setIsFetchingAmazonData(false), 1500);
            return () => clearTimeout(timer);
        }
    }, [isFetchingAmazonData]);

    const handleTeamClick = (project: Project, role: 'am' | 'bm' | 'csm' | 'cm' | 'gd') => {
        setEditingTeamProject(project);
        setEditingTeamRole(role);
        setTeamSearch('');
        // Parse current value ("Name 1, Name 2") into array
        const currentVal = project[role];
        setTempSelectedMembers(currentVal ? currentVal.split(/,\s*/).filter(Boolean) : []);
        setIsTeamDialogOpen(true);
    };

    const handleSaveTeam = (newVal: string) => {
        if (!editingTeamProject || !editingTeamRole) return;

        setData(prevData => prevData.map(acc => ({
            ...acc,
            projects: acc.projects.map(p => {
                if (p.id === editingTeamProject.id) {
                    return { ...p, [editingTeamRole]: newVal };
                }
                return p;
            })
        })));

        setIsTeamDialogOpen(false);
        setEditingTeamProject(null);
        setEditingTeamRole(null);
    };

    const handleSaveRisk = (updates: any) => {
        if (!updatingProject) return;
        setData(prevData => prevData.map(acc => ({
            ...acc,
            projects: acc.projects.map(p => p.id === updatingProject.id ? { ...p, ...updates } : p)
        })));
        setIsRiskUpdateOpen(false);
    };




    const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false);
    const [expandedMenus, setExpandedMenus] = useState<string[]>(['reimbursement']);
    const [isColumnSettingsOpen, setIsColumnSettingsOpen] = useState(false);
    const [columnOrder, setColumnOrder] = useState<string[]>([
        'account', 'ad_engine_status', 'project', 'mrr', 'risk', 'prevRisk', 'wow', 'customerUpdateStatus', 'subscriptions',
        'lifetime', 'l30_p30', 'l7_p7', 'am', 'bm', 'csm', 'cm', 'gd', 'createdAt', 'notes'
    ]);
    const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
    const [visibleColumns, setVisibleColumns] = useState<string[]>([
        'account', 'ad_engine_status', 'project', 'mrr', 'risk', 'prevRisk', 'wow', 'customerUpdateStatus', 'subscriptions',
        'lifetime', 'l30_p30', 'l7_p7', 'am', 'bm', 'csm', 'cm', 'gd', 'createdAt', 'notes'
    ]);
    const [columnWidths, setColumnWidths] = useState<{ [key: string]: number }>({
        account: 240,
        project: 200
    });
    const resizingCol = useRef<string | null>(null);
    const startX = useRef<number>(0);
    const startWidth = useRef<number>(0);

    const handleResizeStart = (e: React.MouseEvent, colId: string) => {
        e.preventDefault();
        e.stopPropagation();
        resizingCol.current = colId;
        startX.current = e.pageX;
        startWidth.current = columnWidths[colId] || 200;
        document.addEventListener('mousemove', handleResizeMove);
        document.addEventListener('mouseup', handleResizeUp);
    };

    const handleResizeMove = (e: MouseEvent) => {
        if (!resizingCol.current) return;
        const diff = e.pageX - startX.current;
        const newWidth = Math.max(100, startWidth.current + diff);
        setColumnWidths(prev => ({
            ...prev,
            [resizingCol.current!]: newWidth
        }));
    };

    const handleResizeUp = () => {
        resizingCol.current = null;
        document.removeEventListener('mousemove', handleResizeMove);
        document.removeEventListener('mouseup', handleResizeUp);
    };

    const [columnSearch, setColumnSearch] = useState('');
    const [presetName, setPresetName] = useState('');
    const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' } | null>(null);

    // Risk Update Dialog State
    const [isRiskUpdateOpen, setIsRiskUpdateOpen] = useState(false);
    const [updatingProject, setUpdatingProject] = useState<any>(null);
    const [selectedNewRisk, setSelectedNewRisk] = useState<Risk | null>(null);
    const [riskGuideOpen, setRiskGuideOpen] = useState(false);
    const [factorGuideOpen, setFactorGuideOpen] = useState(false);
    const [selectedFactors, setSelectedFactors] = useState<Set<string>>(new Set());
    const [riskNotes, setRiskNotes] = useState('');
    const [dialogTab, setDialogTab] = useState<'internal' | 'customer'>('internal');
    const [customerUpdateContent, setCustomerUpdateContent] = useState('');
    const [customerUpdateStatus, setCustomerUpdateStatus] = useState<'blank' | 'draft' | 'sent'>('blank');
    const [customerUpdateSentAt, setCustomerUpdateSentAt] = useState('');
    const [toEmail, setToEmail] = useState('');
    const [contactName, setContactName] = useState('');

    const lastProjectIdRef = useRef<string | null>(null);

    useEffect(() => {
        if (updatingProject) {
            if (lastProjectIdRef.current !== updatingProject.id) {
                setToEmail(updatingProject.contactEmail || updatingProject.account?.contactEmail || '');
                setContactName(updatingProject.contactName || updatingProject.account?.contactName || '');
                setCustomerUpdateStatus(updatingProject.customerUpdateStatus || 'blank');
                setCustomerUpdateSentAt(updatingProject.customerUpdateSentAt || '');

                // Load from project data - if blank, open empty
                const initialContent = updatingProject.customerUpdateStatus === 'blank' ? '' : (updatingProject.customerUpdateContent || '');
                setCustomerUpdateContent(initialContent);
                lastProjectIdRef.current = updatingProject.id;
            }
        } else {
            lastProjectIdRef.current = null;
        }
    }, [updatingProject]);

    // Render charts when content changes OR tab changes (debounced)
    useEffect(() => {
        if (dialogTab === 'customer' && customerUpdateContent && (customerUpdateContent.includes('email-preview-wrapper') || customerUpdateContent.includes('canvas'))) {
            const timer = setTimeout(() => {
                renderEmailCharts();
            }, 600);
            return () => clearTimeout(timer);
        }
    }, [customerUpdateContent, dialogTab]);

    // Summary Section State
    const [summaryVisible, setSummaryVisible] = useState(true);

    // Segment Builder Data Persistence
    const [segments, setSegments] = useState([
        { 
            name: 'Hesitant shoppers', 
            description: 'Email subscribers who open and click emails frequently, but have never purchased.', 
            goal: 'Convert subscribers',
            members: '12,430', 
            lastComputed: 'Apr 20, 2026, 3:40 PM',
            created: 'Apr 20, 2026, 3:40 PM'
        },
        { 
            name: 'Previously engaged', 
            description: 'Email subscribers who have not recently opened or clicked an email from you, but used to do so frequently.', 
            goal: 'Re-engage subscribers',
            members: '8,120', 
            lastComputed: 'Apr 9, 2026, 10:00 PM',
            created: 'Apr 9, 2026, 10:00 PM'
        },
        { 
            name: 'Engaged 60 days (Email)', 
            description: 'Profiles who have engaged with your emails in the last 60 days.', 
            goal: 'Engagement',
            members: '45,600', 
            lastComputed: 'Apr 9, 2026, 9:50 PM',
            created: 'Apr 9, 2026, 9:49 PM'
        }
    ]);

    const handleSaveSegment = (newSegment: any) => {
        setSegments(prev => [
            {
                ...newSegment,
                members: '1,240', // Placeholder for simulation
                lastComputed: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true }),
                created: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true })
            },
            ...prev
        ]);
        setCurrentPage('segments');
    };

    // Scroll Observer for sticky summary
    useEffect(() => {
        const handleScroll = () => {
            const scroller = document.getElementById('main-content-scroll');
            if (!scroller) return;
            const scrollTop = scroller.scrollTop;

            // Filters check
            const fHeader = document.getElementById('filters-header');
            const fContent = document.getElementById('filter-cards-area-vessel');
            if (fHeader && fContent) {
                const rect = fContent.getBoundingClientRect();
                const headerRect = fHeader.getBoundingClientRect();
                setIsScrolledPastFilters(rect.bottom < headerRect.bottom);
            } else if (fHeader && !fContent) {
                setIsScrolledPastFilters(scrollTop > 20);
            }

            // Summary check
            const sHeader = document.getElementById('summary-header');
            const sContent = document.getElementById('summary-content-vessel');
            if (sHeader && sContent) {
                const rect = sContent.getBoundingClientRect();
                const headerRect = sHeader.getBoundingClientRect();
                // We consider it scrolled past when the content bottom is above the header
                setIsScrolledPastSummary(rect.bottom < headerRect.bottom + 10);
            } else if (sHeader && !sContent) {
                setIsScrolledPastSummary(scrollTop > 200); // Threshold for collapsed summary
            }

            // Projects check
            const pHeader = document.getElementById('projects-header');
            const pContent = document.getElementById('projects-list-vessel');
            if (pHeader && pContent) {
                const rect = pContent.getBoundingClientRect();
                const headerRect = pHeader.getBoundingClientRect();
                setIsScrolledPastProjects(rect.bottom < headerRect.bottom + 10);
            }

            // Task filters check
            const tfHeader = document.getElementById('task-filters-header');
            const tfContent = document.getElementById('task-filter-container-vessel');
            if (tfHeader && tfContent) {
                const rect = tfContent.getBoundingClientRect();
                const headerRect = tfHeader.getBoundingClientRect();
                setIsScrolledPastTaskFilters(rect.bottom < headerRect.bottom);
            } else if (tfHeader && !tfContent) {
                setIsScrolledPastTaskFilters(scrollTop > 20);
            }
        };

        const scroller = document.getElementById('main-content-scroll');
        if (scroller) {
            scroller.addEventListener('scroll', handleScroll, { passive: true });
            return () => scroller.removeEventListener('scroll', handleScroll);
        }
    }, []);

    // Auto-collapse/expand filters based on scroll
    useEffect(() => {
        if (isScrolledPastFilters && smartFiltersVisible) {
            setSmartFiltersVisible(false);
        } else if (!isScrolledPastFilters && !smartFiltersVisible) {
            setSmartFiltersVisible(true);
        }
    }, [isScrolledPastFilters]);

    // Auto-collapse/expand summary when scrolled past
    useEffect(() => {
        if (isScrolledPastSummary && summaryVisible) {
            setSummaryVisible(false);
        } else if (!isScrolledPastSummary && !summaryVisible) {
            setSummaryVisible(true);
        }
    }, [isScrolledPastSummary]);

    const COLUMN_LIST = [
        { id: 'account', label: 'Account', desc: 'Main account name and initials' },
        { id: 'ad_engine_status', label: 'Ad Engine Status', desc: 'PPC Activity Status (Active/Passive/NA) - Account Level' },
        { id: 'project', label: 'Project', desc: 'Primary service category' },
        { id: 'subscriptions', label: 'Subscriptions', desc: 'Active platform services' },
        { id: 'mrr', label: 'MRR', align: 'right', desc: 'Monthly Recurring Revenue' },
        { id: 'risk', label: 'Current Risk', desc: 'Present risk classification' },
        { id: 'prevRisk', label: 'Prev. Week', desc: 'Risk status from last week' },
        { id: 'wow', label: 'Wow Change', desc: 'Week over Week status change' },
        { id: 'lifetime', label: 'Lifetime', align: 'right', desc: 'Months since project start' },
        { id: 'l30_p30', label: 'L30D / P30D', align: 'right', desc: 'Last 30 days vs Previous 30 days' },
        { id: 'l7_p7', label: 'L7D / P7D', align: 'right', desc: 'Last 7 days vs Previous 7 days' },
        { id: 'am', label: 'Advertising Manager', desc: 'Assigned Ad Manager' },
        { id: 'bm', label: 'Brand Manager', desc: 'Assigned Brand Manager' },
        { id: 'csm', label: 'Care Manager', desc: 'Assigned Care Manager' },
        { id: 'cm', label: 'Escalation Manager', desc: 'Assigned Escalation Manager' },
        { id: 'gd', label: 'Graphic Designer', desc: 'Assigned Designer' },
        { id: 'createdAt', label: 'Created At', desc: 'Project initialization date' },
        { id: 'notes', label: 'Notes', desc: 'Internal project comments' },
        { id: 'customerUpdateStatus', label: 'Weekly Update', desc: 'Status of weekly customer report' },
    ];

    const handleDragStart = (idx: number) => setDraggedIdx(idx);
    const handleDragOver = (e: React.DragEvent, idx: number) => {
        e.preventDefault();
        if (draggedIdx === null || draggedIdx === idx) return;
        const newOrder = [...columnOrder];
        const draggedItem = newOrder[draggedIdx];
        newOrder.splice(draggedIdx, 1);
        newOrder.splice(idx, 0, draggedItem);
        setColumnOrder(newOrder);
        setDraggedIdx(idx);
    };

    const compareValues = (val: number, filterVal: number | '', operator: string, endVal: number | '') => {
        if (filterVal === '') return true;
        switch (operator) {
            case '>': return val > filterVal;
            case '<': return val < filterVal;
            case '>=': return val >= filterVal;
            case '<=': return val <= filterVal;
            case '=': return val === filterVal;
            case 'between':
                if (endVal === '') return val >= filterVal;
                return val >= filterVal && val <= endVal;
            default: return val >= filterVal;
        }
    };







    const stats = useMemo(() => {
        const filteredData: Account[] = [];
        const seenAccountIds = new Set<number>();
        const projectRows: any[] = []; // Define flattened rows here

        const rStats: Record<string, { count: number, mrr: number }> = {};
        RISKS.forEach(r => rStats[r.name.toLowerCase()] = { count: 0, mrr: 0 });

        const prStats: Record<string, { count: number, mrr: number }> = {};
        RISKS.forEach(r => prStats[r.name.toLowerCase()] = { count: 0, mrr: 0 });

        const wStats: Record<string, { count: number, mrr: number }> = {
            pos: { count: 0, mrr: 0 },
            neg: { count: 0, mrr: 0 },
            none: { count: 0, mrr: 0 }
        };

        const oStats: Record<string, { count: number, mrr: number }> = {
            my: { count: 0, mrr: 0 },
            other: { count: 0, mrr: 0 }
        };

        const updateStats: Record<string, { count: number, mrr: number }> = {
            sent: { count: 0, mrr: 0 },
            draft: { count: 0, mrr: 0 },
            blank: { count: 0, mrr: 0 }
        };

        data.forEach(acc => {
            // Pre-calculate Account Level Matches
            const searchLower = search.toLowerCase();
            const accSearchMatch = !search ||
                acc.name.toLowerCase().includes(searchLower) ||
                acc.am.toLowerCase().includes(searchLower) ||
                acc.bm.toLowerCase().includes(searchLower) ||
                acc.csm.toLowerCase().includes(searchLower) ||
                acc.cm.toLowerCase().includes(searchLower) ||
                acc.gd.toLowerCase().includes(searchLower) ||
                (acc.contactName && acc.contactName.toLowerCase().includes(searchLower)) ||
                (acc.contactEmail && acc.contactEmail.toLowerCase().includes(searchLower));

            const filterNameMatch = !filterAccountName || acc.name.toLowerCase().includes(filterAccountName.toLowerCase());
            const filterSubsMatch = compareValues(acc.subs, filterSubs, filterSubsOperator, filterSubsEnd);
            const filterMrrMatch = compareValues(acc.mrr, filterMrr, filterMrrOperator, filterMrrEnd);
            const filterLifetimeMatch = compareValues(acc.lifetime, filterLifetime, filterLifetimeOperator, filterLifetimeEnd);

            const l30Ratio = acc.salesP30 > 0 ? acc.salesL30 / acc.salesP30 : 1;
            const l30Match = compareValues(l30Ratio, filterL30Ratio, filterL30Operator, filterL30End);
            const l7Ratio = acc.salesP7 > 0 ? acc.salesL7 / acc.salesP7 : 1;
            const l7Match = compareValues(l7Ratio, filterL7Ratio, filterL7Operator, filterL7End);

            // Manager matches (Legacy, removed from here)
            // const amMatch = filterManagers.am.length === 0 || filterManagers.am.includes(acc.am);
            // ...

            // Date match
            const dateMatch = (!filterDateStart || new Date(acc.createdAt) >= new Date(filterDateStart)) &&
                (!filterDateEnd || new Date(acc.createdAt) <= new Date(filterDateEnd));
            const accStatusMatch = filterAccountStatus.length === 0 || filterAccountStatus.includes(acc.status.toLowerCase());

            const accountBaseMatch = filterNameMatch && filterSubsMatch && filterMrrMatch && filterLifetimeMatch && l30Match && l7Match && dateMatch && accStatusMatch;


            acc.projects.forEach(p => {
                // Expired Check
                const isProjectExpired = p.subscriptions.every(s => s.status === 'Cancelled');
                if (!filterIncludeExpired && isProjectExpired) return;

                // Project Specific Matches
                const projSearchMatch = accSearchMatch ||
                    p.name.toLowerCase().includes(searchLower) ||
                    p.am.toLowerCase().includes(searchLower) ||
                    p.bm.toLowerCase().includes(searchLower) ||
                    p.csm.toLowerCase().includes(searchLower) ||
                    p.cm.toLowerCase().includes(searchLower) ||
                    p.gd.toLowerCase().includes(searchLower) ||
                    p.subscriptions.some(s => s.name.toLowerCase().includes(searchLower));

                const projNameMatch = !filterProjectName || p.name.toLowerCase().includes(filterProjectName.toLowerCase());
                const subsNameMatch = !filterSubsName || p.subscriptions.some(s => s.name.toLowerCase().includes(filterSubsName.toLowerCase()));

                const notesMatch = !filterNotes || (p.notes && p.notes.toLowerCase().includes(filterNotes.toLowerCase()));
                const updateStatusMatch = filterUpdateStatus.length === 0 || filterUpdateStatus.includes(p.customerUpdateStatus);
                const subsTypeMatch = filterSubsTypes.length === 0 || p.subscriptions.some(s => filterSubsTypes.some(ft => s.name.toLowerCase().includes(ft.toLowerCase())));

                // Manager matches (Checking both project level and account level fallback)
                const checkManagerMatch = (filterList: string[], projVal: string, accVal: string) => {
                    if (filterList.length === 0) return true;
                    const pNames = projVal ? projVal.split(/,\s*/).map(n => n.trim()) : [];
                    const aNames = accVal ? accVal.split(/,\s*/).map(n => n.trim()) : [];
                    // Fallback to account names if project names are empty? 
                    // Or check both? Usually, project value overrides account value.
                    const targetNames = pNames.length > 0 ? pNames : aNames;
                    return targetNames.some(name => filterList.includes(name));
                };

                const amMatch = checkManagerMatch(filterManagers.am, p.am, acc.am);
                const bmMatch = checkManagerMatch(filterManagers.bm, p.bm, acc.bm);
                const csmMatch = checkManagerMatch(filterManagers.csm, p.csm, acc.csm);
                const cmMatch = checkManagerMatch(filterManagers.cm, p.cm, acc.cm);
                const gdMatch = checkManagerMatch(filterManagers.gd, p.gd, acc.gd);

                const adEngineMatch = filterAdEngineStatus.length === 0 || filterAdEngineStatus.includes(acc.adEngineStatus.toLowerCase());

                const projectBaseMatch = accountBaseMatch && projSearchMatch && projNameMatch && subsNameMatch && subsTypeMatch && notesMatch && updateStatusMatch && amMatch && bmMatch && csmMatch && cmMatch && gdMatch && adEngineMatch;

                // Current Filter Checks
                const riskMatch = selectedRisks.length === 0 || selectedRisks.includes(p.risk.name.toLowerCase());
                const prevRiskMatch = selectedPrevRisks.length === 0 || selectedPrevRisks.includes(p.prevRisk.name.toLowerCase());
                const wowMatch = selectedWows.length === 0 || selectedWows.includes(p.wow.type === "Positive" ? "pos" : (p.wow.type === "Negative" ? "neg" : "none"));
                const ownerMatch = (selectedOwners.length === 0 || selectedOwners.length === 2) || (p.isMyProject ? selectedOwners.includes('my') : selectedOwners.includes('other'));
                const quickUpdateMatch = selectedUpdates.length === 0 || selectedUpdates.includes(p.customerUpdateStatus);


                // 1. Risk Stats (Check all filters EXCEPT Risk)
                if (projectBaseMatch && prevRiskMatch && wowMatch && ownerMatch && quickUpdateMatch) {
                    const rKey = p.risk.name.toLowerCase();
                    if (rStats[rKey]) {
                        rStats[rKey].count++;
                        rStats[rKey].mrr += p.mrr;
                    }
                }

                // 1b. Prev Risk Stats (Check all filters EXCEPT Prev Risk)
                if (projectBaseMatch && riskMatch && wowMatch && ownerMatch && quickUpdateMatch) {
                    const prKey = p.prevRisk.name.toLowerCase();
                    if (prStats[prKey]) {
                        prStats[prKey].count++;
                        prStats[prKey].mrr += p.mrr;
                    }
                }

                // 2. WoW Stats (Check all filters EXCEPT WoW)
                if (projectBaseMatch && riskMatch && prevRiskMatch && ownerMatch && quickUpdateMatch) {
                    const wKey = p.wow.type === "Positive" ? "pos" : (p.wow.type === "Negative" ? "neg" : "none");
                    if (wStats[wKey]) {
                        wStats[wKey].count++;
                        wStats[wKey].mrr += p.mrr;
                    }
                }

                // 3. Owner Stats (Check all filters EXCEPT Owner)
                if (projectBaseMatch && riskMatch && prevRiskMatch && wowMatch && quickUpdateMatch) {
                    const oKey = p.isMyProject ? 'my' : 'other';
                    if (oStats[oKey]) {
                        oStats[oKey].count++;
                        oStats[oKey].mrr += p.mrr;
                    }
                }

                // 4. Update Stats (Check all filters EXCEPT Quick Update)
                if (projectBaseMatch && riskMatch && prevRiskMatch && wowMatch && ownerMatch) {
                    const uKey = p.customerUpdateStatus;
                    if (updateStats[uKey]) {
                        updateStats[uKey].count++;
                        updateStats[uKey].mrr += p.mrr;
                    }
                }

                // 5. Filtered Data Collection
                if (projectBaseMatch && riskMatch && prevRiskMatch && wowMatch && ownerMatch && quickUpdateMatch) {
                    if (!seenAccountIds.has(acc.id)) {
                        filteredData.push(acc);
                        seenAccountIds.add(acc.id);
                    }
                    // Flattened row data
                    projectRows.push({
                        ...p,
                        accountId: acc.id,
                        accountName: acc.name,
                        accountInitials: acc.initials,
                        adEngineStatus: acc.adEngineStatus,
                        projectName: p.name,
                        project: p, // Keep ref
                        lifetime: acc.lifetime, // using account lifetime? or project? usually project lifetime
                        l30_p30: l30Ratio,
                        l7_p7: l7Ratio,
                        am: p.am || acc.am,
                        bm: p.bm || acc.bm,
                        csm: p.csm || acc.csm,
                        cm: p.cm || acc.cm,
                        gd: p.gd || acc.gd,
                        createdAt: p.createdAt || acc.createdAt,
                        accountTotalMrr: acc.mrr,
                        accountAbsoluteTotalProjects: acc.projects.length,
                        account: acc
                    });
                }
            });
        });

        return { risks: rStats, prevRisks: prStats, wow: wStats, owners: oStats, updates: updateStats, filteredData, projectRows };
    }, [data, filterIncludeExpired, search, filterAccountName, filterSubs, filterSubsOperator, filterSubsEnd, filterMrr, filterMrrOperator, filterMrrEnd, filterLifetime, filterLifetimeOperator, filterLifetimeEnd, filterL30Ratio, filterL30Operator, filterL30End, filterL7Ratio, filterL7Operator, filterL7End, filterManagers, filterDateStart, filterDateEnd, filterProjectName, filterSubsName, filterSubsTypes, filterNotes, filterAdEngineStatus, selectedRisks, selectedPrevRisks, selectedWows, selectedOwners, selectedUpdates]);

    const { risks: rStats, prevRisks: prStats, wow: wStats, owners: oStats, updates: updateStats, projectRows: rawProjectRows, filteredData } = stats;

    const projectRows = useMemo(() => {
        let baseData = [...rawProjectRows];

        if (sortConfig) {
            const { key, direction } = sortConfig;

            // 1. Helper to get comparison value
            const getVal = (row: any) => {
                switch (key) {
                    case 'account': return (row.accountName || '').toLowerCase();
                    case 'project': return (row.name || '').toLowerCase();
                    case 'mrr': return row.mrr || 0;
                    case 'risk': return RISKS.findIndex(r => r.name === row.risk.name);
                    case 'prevRisk': return RISKS.findIndex(r => r.name === row.prevRisk.name);
                    case 'wow': return row.wow.type;
                    case 'customerUpdateStatus': return row.customerUpdateStatus;
                    case 'subscriptions': return (row.subscriptions || []).length;
                    case 'lifetime': return row.lifetime || 0;
                    case 'createdAt': {
                        const d = row.createdAt;
                        if (!d) return 0;
                        const parts = d.split('.');
                        if (parts.length === 3) return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`).getTime();
                        return new Date(d).getTime();
                    }
                    default: return row[key];
                }
            };

            // 2. Group rigidly by accountId
            const groupsMap = new Map<number, any[]>();
            baseData.forEach(row => {
                const list = groupsMap.get(row.accountId) || [];
                list.push(row);
                groupsMap.set(row.accountId, list);
            });

            // 3. Sort projects WITHIN each account group
            for (const projList of groupsMap.values()) {
                projList.sort((a, b) => {
                    const av = getVal(a);
                    const bv = getVal(b);
                    if (av === bv) return 0;
                    if (av < bv) return direction === 'asc' ? -1 : 1;
                    return direction === 'asc' ? 1 : -1;
                });
            }

            // 4. Sort GROUPS based on their "best" or "representative" value
            const sortedGroups = Array.from(groupsMap.values()).sort((groupA, groupB) => {
                // For account-level sorting, we use a representative value (e.g., account name or max MRR in group)
                const rowA = groupA[0];
                const rowB = groupB[0];
                let aVal: any;
                let bVal: any;

                if (key === 'account') {
                    aVal = (rowA.accountName || '').toLowerCase();
                    bVal = (rowB.accountName || '').toLowerCase();
                } else {
                    // Use the "best" value from the group for the criterion (e.g. highest MRR in the group)
                    // This keeps account with the most relevant project at the top
                    const groupAValues = groupA.map(getVal);
                    const groupBValues = groupB.map(getVal);

                    if (direction === 'asc') {
                        aVal = groupAValues.reduce((min, v) => (v < min ? v : min), groupAValues[0]);
                        bVal = groupBValues.reduce((min, v) => (v < min ? v : min), groupBValues[0]);
                    } else {
                        aVal = groupAValues.reduce((max, v) => (v > max ? v : max), groupAValues[0]);
                        bVal = groupBValues.reduce((max, v) => (v > max ? v : max), groupBValues[0]);
                    }
                }

                if (aVal === bVal) {
                    // Stable fallback by account name
                    return (rowA.accountName || '').localeCompare(rowB.accountName || '');
                }

                if (aVal < bVal) return direction === 'asc' ? -1 : 1;
                return direction === 'asc' ? 1 : -1;
            });

            // 5. Flatten back
            baseData = sortedGroups.flat();
        }

        // Calculate contiguous spans to prevent layout shifting when sorted/filtered
        const rowsWithSpans: any[] = [];
        let i = 0;
        while (i < baseData.length) {
            let j = i;
            // Find contiguous block of SAME accountId
            while (j < baseData.length && baseData[j].accountId === baseData[i].accountId) {
                j++;
            }
            const groupSize = j - i;
            for (let k = i; k < j; k++) {
                rowsWithSpans.push({
                    ...baseData[k],
                    isFirstInAccount: k === i,
                    accountVisibleCount: groupSize,
                });
            }
            i = j;
        }
        return rowsWithSpans;
    }, [rawProjectRows, sortConfig]);

    const sortedData = projectRows;

    const paginatedData = sortedData;

    const summarySentence = useMemo(() => {
        const totalProjects = projectRows.length;
        const uniqueAccountIds = new Set(projectRows.map(p => p.accountId));
        const totalAccounts = uniqueAccountIds.size;

        // Approx simple sum for now
        const totalMrr = projectRows.reduce((sum, p) => sum + p.mrr, 0);
        const totalArr = totalMrr * 12;

        const activeAccounts = projectRows.filter(p =>
            p.subscriptions.some((s: any) => s.status === 'Active' || s.status === 'Suspended')
        ).reduce((acc, p) => {
            acc.add(p.accountId);
            return acc;
        }, new Set<number>()).size;
        const churnAccounts = totalAccounts - activeAccounts;

        // Assuming fixed costs for now or restoring constants if available
        const monthlyReimRun = 125000;
        const monthlyVendorRecovery = 15000;
        const totalSubsVariableFee = totalMrr * 0.05;
        const totalOpsRevenue = monthlyReimRun + monthlyVendorRecovery + totalSubsVariableFee;

        return `MRR: $${totalMrr.toLocaleString()} • ARR: $${totalArr.toLocaleString()} • Accounts: ${activeAccounts} Active / ${churnAccounts} Churn • Op. Revenue: $${totalOpsRevenue.toLocaleString()}`;
    }, [projectRows]);

    const summarySentenceJSX = useMemo(() => {
        const uniqueAccountIds = new Set(projectRows.map(p => p.accountId));
        const totalAccounts = uniqueAccountIds.size;

        const isBrandAd = activePersona === 'brand_ad_management';
        const effectiveReim = isBrandAd ? 0 : 125000;
        const effectiveRecovery = isBrandAd ? 0 : 15000;

        const totalMrr = projectRows.reduce((sum, p) => sum + p.mrr, 0) + effectiveReim + effectiveRecovery;
        const totalArr = totalMrr * 12;

        const activeAccounts = projectRows.filter(p =>
            p.subscriptions.some((s: any) => s.status === 'Active' || s.status === 'Suspended')
        ).reduce((acc, p) => {
            acc.add(p.accountId);
            return acc;
        }, new Set<number>()).size;
        const churnAccounts = totalAccounts - activeAccounts;

        const totalSubsVariableFee = projectRows.reduce((sum, p) => sum + p.mrr, 0) * 0.05;
        const totalOpsRevenue = effectiveReim + effectiveRecovery + totalSubsVariableFee;

        const totalOverdue = projectRows.reduce((sum, p) => sum + p.overdueTasks, 0);
        const totalOpen = projectRows.reduce((sum, p) => sum + p.openTasks, 0);

        return (
            <>
                <span className="font-mono">MRR</span> ${totalMrr.toLocaleString()} <span className="mx-1.5 text-slate-300">|</span>{' '}
                <span className="font-mono">ARR</span> ${totalArr.toLocaleString()} <span className="mx-1.5 text-slate-300">|</span>{' '}
                <span className="font-mono">Accounts (Active/Churn)</span> {activeAccounts} / {churnAccounts} <span className="mx-1.5 text-slate-300">|</span>{' '}
                {!isBrandAd && (
                    <>
                        <span className="font-mono">Op. Revenue</span> ${totalOpsRevenue.toLocaleString()} <span className="mx-1.5 text-slate-300">|</span>{' '}
                    </>
                )}
                <span className="font-mono">Tasks (Overdue/Open)</span> {totalOverdue} / {totalOpen} <span className="mx-1.5 text-slate-300">|</span>{' '}
                <span className="font-mono">Velocity</span> 0.36
            </>
        );
    }, [projectRows, activePersona]);

    const quickFilterSentence = useMemo(() => {
        // Removed total === 0 check to always show filter summary

        const filters = [];
        if (search) filters.push(`Search: "${search}"`);
        if (selectedRisks.length > 0 && selectedRisks.length < RISKS.length) {
            const riskNames = selectedRisks.map(r => RISKS.find(risk => risk.name.toLowerCase() === r)?.name).filter(Boolean).join(', ');
            if (riskNames) filters.push(`Risk: ${riskNames}`);
        }
        if (selectedPrevRisks.length > 0 && selectedPrevRisks.length < RISKS.length) {
            const riskNames = selectedPrevRisks.map(r => RISKS.find(risk => risk.name.toLowerCase() === r)?.name).filter(Boolean).join(', ');
            if (riskNames) filters.push(`Prev. Risk: ${riskNames}`);
        }
        if (selectedWows.length > 0 && selectedWows.length < 3) {
            const wowNames = selectedWows.map(w => w === 'pos' ? 'Positive' : w === 'neg' ? 'Negative' : 'No Change').join(', ');
            filters.push(`Change: ${wowNames}`);
        }
        if (selectedOwners.length === 1) filters.push(`Owner: ${selectedOwners[0] === 'my' ? 'Me' : 'Others'}`);
        if (selectedUpdates.length < 3) {
            const updateLabels = selectedUpdates.length === 0 ? 'None' : selectedUpdates.map(u => u === 'sent' ? 'Sent' : u === 'draft' ? 'Draft' : 'Blank').join(', ');
            filters.push(`Updates: ${updateLabels}`);
        }
        if (filterSubsTypes.length > 0) filters.push(`Subs: ${filterSubsTypes.join(', ')}`);

        if (filterMrr !== '') {
            const val = filterMrrOperator === 'between' ? `${filterMrr} - ${filterMrrEnd}` : `${filterMrrOperator} ${filterMrr}`;
            filters.push(`MRR: ${val}`);
        }
        if (filterLifetime !== '') {
            const val = filterLifetimeOperator === 'between' ? `${filterLifetime} - ${filterLifetimeEnd}` : `${filterLifetimeOperator} ${filterLifetime}`;
            filters.push(`Lifetime: ${val}`);
        }
        if (filterL30Ratio !== '') {
            const val = filterL30Operator === 'between' ? `${filterL30Ratio} - ${filterL30End}` : `${filterL30Operator} ${filterL30Ratio}`;
            filters.push(`L30D: ${val}`);
        }
        if (filterL7Ratio !== '') {
            const val = filterL7Operator === 'between' ? `${filterL7Ratio} - ${filterL7End}` : `${filterL7Operator} ${filterL7Ratio}`;
            filters.push(`L7D: ${val}`);
        }

        if (filterAccountName) filters.push(`Account: "${filterAccountName}"`);
        if (filterProjectName) filters.push(`Project: "${filterProjectName}"`);
        if (filterAccountStatus.length > 0) filters.push(`Status: ${filterAccountStatus.join(', ')}`);
        if (filterAdEngineStatus.length > 0) filters.push(`Ad Status: ${filterAdEngineStatus.join(', ')}`);
        if (filterIncludeExpired) filters.push('Including expired');

        if (filters.length === 0) return "All projects (no filters applied)";

        return filters.map((filter, index) => (
            <React.Fragment key={index}>
                {filter}
                {index < filters.length - 1 && <span className="mx-1.5 text-slate-300">|</span>}
            </React.Fragment>
        ));
    }, [
        projectRows.length, selectedRisks, selectedPrevRisks, selectedWows, selectedOwners, selectedUpdates, search,
        filterSubsTypes, filterMrr, filterMrrOperator, filterMrrEnd,
        filterLifetime, filterLifetimeOperator, filterLifetimeEnd,
        filterL30Ratio, filterL30Operator, filterL30End,
        filterL7Ratio, filterL7Operator, filterL7End,
        filterAccountName, filterProjectName, filterIncludeExpired,
        filterAccountStatus,
        activePersona
    ]);

    const taskFilterSentence = useMemo(() => {
        const filters = [];
        if (taskSearch) filters.push(`Search: "${taskSearch}"`);
        if (selectedTaskStatuses.length > 0 && selectedTaskStatuses.length < 5) filters.push(`Responsibility: ${selectedTaskStatuses.join(', ')}`);
        if (selectedTaskTypes.length > 0 && selectedTaskTypes.length < 2) filters.push(`Type: ${selectedTaskTypes.join(', ')}`);
        if (selectedTaskPriorities.length > 0 && selectedTaskPriorities.length < 2) filters.push(`Priority: ${selectedTaskPriorities.join(', ')}`);
        if (selectedTaskTimelines.length > 0 && selectedTaskTimelines.length < 3) filters.push(`Timeline: ${selectedTaskTimelines.join(', ')}`);

        if (filters.length === 0) return "All tasks (no filters applied)";

        return filters.map((filter, index) => (
            <React.Fragment key={index}>
                {filter}
                {index < filters.length - 1 && <span className="mx-1.5 text-slate-300">|</span>}
            </React.Fragment>
        ));
    }, [taskSearch, selectedTaskStatuses, selectedTaskTypes, selectedTaskPriorities, selectedTaskTimelines]);

    const handleApplyFilters = () => {
        setSelectedRisks(draftRisks);
        setSelectedWows(draftWows);
        setSelectedOwners(draftOwners);
        setSelectedUpdates(draftUpdateStatus.length > 0 ? draftUpdateStatus : ['sent', 'draft', 'blank']);
        setFilterAccountName(draftAccountName);
        setFilterSubs(draftSubs);
        setFilterSubsOperator(draftSubsOperator);
        setFilterSubsEnd(draftSubsEnd);
        setFilterMrr(draftMrr);
        setFilterMrrOperator(draftMrrOperator);
        setFilterMrrEnd(draftMrrEnd);
        setFilterLifetime(draftLifetime);
        setFilterLifetimeOperator(draftLifetimeOperator);
        setFilterLifetimeEnd(draftLifetimeEnd);
        setFilterL30Ratio(draftL30Ratio);
        setFilterL30Operator(draftL30Operator);
        setFilterL30End(draftL30End);
        setFilterL7Ratio(draftL7Ratio);
        setFilterL7Operator(draftL7Operator);
        setFilterL7End(draftL7End);
        setFilterManagers(draftManagers);
        setFilterDateStart(draftDateStart);
        setFilterDateEnd(draftDateEnd);
        setFilterProjectName(draftProjectName);
        setFilterSubsName(draftSubsName);
        setFilterNotes(draftNotes);
        setFilterIncludeExpired(draftIncludeExpired);
        setFilterRiskLevels(draftRiskLevels);
        setFilterWowChanges(draftWowChanges);
        setFilterUpdateStatus(draftUpdateStatus);
        setFilterSubsTypes(draftSubsTypes);
        setFilterAccountStatus(draftAccountStatus);
        setFilterAdEngineStatus(draftAdEngineStatus);
        setIsFilterDialogOpen(false);
    };

    const handleClearAllFilters = () => {
        setSearch('');
        setSelectedRisks(RISKS.map(r => r.name.toLowerCase()));
        setSelectedWows(['pos', 'neg', 'none']);
        if (activePersona === 'brand_ad_management') {
            setSelectedOwners(['my']);
            setDraftOwners(['my']);
        } else {
            setSelectedOwners(['my', 'other']);
            setDraftOwners(['my', 'other']);
        }
        setSelectedUpdates(['sent', 'draft', 'blank']);
        setFilterAccountName('');
        setFilterSubs('');
        setFilterSubsOperator('>=');
        setFilterSubsEnd('');
        setFilterMrr('');
        setFilterMrrOperator('>=');
        setFilterMrrEnd('');
        setFilterLifetime('');
        setFilterLifetimeOperator('>=');
        setFilterLifetimeEnd('');
        setFilterL30Ratio('');
        setFilterL30Operator('>=');
        setFilterL30End('');
        setFilterL7Ratio('');
        setFilterL7Operator('>=');
        setFilterL7End('');
        setFilterManagers({ am: [], bm: [], csm: [], cm: [], gd: [] });
        setFilterDateStart('');
        setFilterDateEnd('');
        setFilterProjectName('');
        setFilterSubsName('');
        setFilterNotes('');
        setFilterIncludeExpired(false);
        setFilterRiskLevels([]);
        setFilterWowChanges([]);
        setFilterUpdateStatus([]);
        setFilterSubsTypes([]);
        setFilterAccountStatus([]);
        setFilterAdEngineStatus([]);

        // Also clear drafts
        setDraftRisks(RISKS.map(r => r.name.toLowerCase()));
        setDraftWows(['pos', 'neg', 'none']);
        setDraftAccountName('');
        setDraftSubs('');
        setDraftSubsOperator('>=');
        setDraftSubsEnd('');
        setDraftMrr('');
        setDraftMrrOperator('>=');
        setDraftMrrEnd('');
        setDraftLifetime('');
        setDraftLifetimeOperator('>=');
        setDraftLifetimeEnd('');
        setDraftL30Ratio('');
        setDraftL30Operator('>=');
        setDraftL30End('');
        setDraftL7Ratio('');
        setDraftL7Operator('>=');
        setDraftL7End('');
        setDraftManagers({ am: [], bm: [], csm: [], cm: [], gd: [] });
        setDraftDateStart('');
        setDraftDateEnd('');
        setDraftProjectName('');
        setDraftSubsName('');
        setDraftNotes('');
        setDraftIncludeExpired(false);
        setDraftRiskLevels([]);
        setDraftWowChanges([]);
        setDraftUpdateStatus([]);
        setDraftSubsTypes([]);
        setDraftAccountStatus([]);

        setIsFilterDialogOpen(false);
    };

    const toggleDraftRisk = (name: string) => {
        const key = name.toLowerCase();
        setDraftRisks(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
    };

    const toggleDraftWow = (key: string) => {
        setDraftWows(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
    };

    const toggleDraftOwner = (key: string) => {
        setDraftOwners(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
    };

    const toggleRisk = (name: string) => {
        const key = name.toLowerCase();
        setSelectedRisks(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
    };

    const toggleWow = (key: string) => {
        setSelectedWows(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
    };

    const toggleUpdate = (key: string) => {
        setSelectedUpdates(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
    };


    const toggleOwner = (key: string) => {
        setSelectedOwners(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
    };

    const handleOpenFilterDialog = (tabId?: string, singleMode = false, e?: React.MouseEvent) => {
        setActiveFilterTab(tabId || '');
        setFilterDialogSingleMode(singleMode);

        if (e) {
            const target = e.currentTarget as HTMLElement;
            const container = document.getElementById('filter-bar-container');
            if (container) {
                const targetRect = target.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();

                const dialogWidth = singleMode ? 400 : 640;

                // For the "Add Filter" button (multi-mode), we prefer right alignment with the button
                // since it's on the right side of the screen. For single-mode (badges), we prefer left alignment.
                let leftPos;
                if (singleMode) {
                    leftPos = targetRect.left - containerRect.left;
                } else {
                    // Right align to the button's right edge
                    leftPos = targetRect.right - containerRect.left - dialogWidth;
                }

                // Safety checks for both sides
                if (leftPos + dialogWidth > containerRect.width) {
                    leftPos = containerRect.width - dialogWidth;
                }
                if (leftPos < 0) {
                    leftPos = 0;
                }

                setFilterDialogPos({
                    top: targetRect.bottom - containerRect.top + 8,
                    left: leftPos
                });
            } else {
                setFilterDialogPos(null);
            }
        } else {
            setFilterDialogPos(null);
        }

        setDraftRisks([...selectedRisks]);
        setDraftWows([...selectedWows]);
        setDraftOwners([...selectedOwners]);
        setDraftAccountName(filterAccountName);
        setDraftSubs(filterSubs);
        setDraftMrr(filterMrr);
        setDraftMrrOperator(filterMrrOperator);
        setDraftMrrEnd(filterMrrEnd);
        setDraftLifetime(filterLifetime);
        setDraftLifetimeOperator(filterLifetimeOperator);
        setDraftLifetimeEnd(filterLifetimeEnd);
        setDraftL30Ratio(filterL30Ratio);
        setDraftL30Operator(filterL30Operator);
        setDraftL30End(filterL30End);
        setDraftL7Ratio(filterL7Ratio);
        setDraftL7Operator(filterL7Operator);
        setDraftL7End(filterL7End);
        setDraftManagers({ ...filterManagers });
        setDraftDateStart(filterDateStart);
        setDraftDateEnd(filterDateEnd);
        setDraftProjectName(filterProjectName);
        setDraftSubsName(filterSubsName);
        setDraftNotes(filterNotes);
        setDraftIncludeExpired(filterIncludeExpired);
        setDraftSubsTypes([...filterSubsTypes]);
        setDraftAccountStatus([...filterAccountStatus]);

        setIsFilterDialogOpen(true);
    };

    const handleToggleSmartFilters = (e?: React.MouseEvent) => {
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }

        const scroller = document.getElementById('main-content-scroll');
        if (smartFiltersVisible) {
            // Collapse logic with scroll preservation
            const scrollYBefore = scroller ? scroller.scrollTop : 0;
            const container = document.getElementById('filter-collapsible-content');
            const heightBefore = container ? container.offsetHeight : 0;

            setSmartFiltersVisible(false);

            if (scrollYBefore > 100 && heightBefore > 0 && scroller) {
                requestAnimationFrame(() => {
                    scroller.scrollBy({ top: -heightBefore, behavior: 'auto' });
                });
            }
        } else {
            setSmartFiltersVisible(true);
            if (scroller) {
                scroller.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    };

    const handleToggleSummary = () => {
        const scroller = document.getElementById('main-content-scroll');
        if (summaryVisible) {
            setSummaryVisible(false);
        } else {
            setSummaryVisible(true);
            if (scroller) {
                scroller.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    };


    const renderOverview = (showOwnership = true) => (
        <div className="flex flex-col overflow-visible">
            {/* ====================================== */}
            {/*         SECTION 1: FILTERS            */}
            {/* ====================================== */}

            {/* 1. STICKY TITLE HEADER - Styled like Projects Header */}
            <div id="filters-header"
                data-stuck={isScrolledPastFilters || !smartFiltersVisible}
                className={cn(
                    "flex items-center justify-between gap-3 sticky top-0 z-[60] bg-white dark:bg-slate-950 py-3 transition-all h-[48px]",
                    (isScrolledPastFilters || !smartFiltersVisible) ? "border-b border-slate-200 dark:border-slate-800 shadow-sm" : "border-b-transparent"
                )}
            >
                <div
                    className={cn(
                        "flex items-center gap-2.5 flex-1 min-w-0",
                        (isScrolledPastFilters || !smartFiltersVisible) ? "cursor-pointer" : ""
                    )}
                    onClick={() => {
                        if (isScrolledPastFilters || !smartFiltersVisible) {
                            handleToggleSmartFilters();
                        }
                    }}
                >
                    <div className="flex items-center gap-2 shrink-0">
                        <div className="w-1 h-5 rounded-full bg-violet-600 shadow-sm"></div>
                        <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">Filters</h2>
                    </div>

                    {(isScrolledPastFilters || !smartFiltersVisible) && (
                        <div className="mx-4 text-xs text-slate-500 truncate animate-in fade-in slide-in-from-left-2 duration-300">
                            <span className="font-medium text-slate-600 dark:text-slate-400">{quickFilterSentence}</span>
                        </div>
                    )}

                    <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800"></div>
                </div>
                <button
                    onClick={handleToggleSmartFilters}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200"
                >
                    <ChevronDown size={16} className={cn("transition-transform duration-200", smartFiltersVisible ? "rotate-180" : "")} />
                </button>
            </div>


            {/* Filter Content Card */}
            {smartFiltersVisible && (<div id="filter-cards-area-vessel" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm mt-2 mb-8 relative">

                {/* 2. Active Filter Buttons Row */}
                {(search || filterAccountName || filterSubs !== '' || filterMrr !== '' || filterLifetime !== '' ||
                    filterProjectName || filterSubsName || filterNotes || filterIncludeExpired ||
                    filterL30Ratio !== '' || filterL7Ratio !== '' || filterSubsTypes.length > 0 ||
                    filterManagers.am.length > 0 || filterManagers.bm.length > 0 ||
                    filterManagers.csm.length > 0 || filterManagers.cm.length > 0 ||
                    filterManagers.gd.length > 0 || filterDateStart || filterDateEnd ||
                    selectedRisks.length < RISKS.length ||
                    selectedWows.length < 3 || selectedOwners.length < 2 || selectedUpdates.length < 3 ||
                    filterAccountStatus.length > 0 || filterAdEngineStatus.length > 0) && (
                        <div id="active-filters" className="px-5 py-3 flex flex-wrap items-center gap-2 border-b animate-in fade-in duration-200">
                            {/* Search Badge */}
                            {search && (
                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-[10px] font-bold border border-blue-100 dark:border-blue-900/30 whitespace-nowrap animate-in zoom-in-95 duration-200">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                    <span>Search: {search}</span>
                                    <X size={10} className="ml-1 cursor-pointer hover:scale-110 transition-transform" onClick={() => setSearch('')} />
                                </div>
                            )}
                            {/* Account Badge */}
                            {filterAccountName && (
                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-[10px] font-bold border border-blue-100 dark:border-blue-900/30 whitespace-nowrap animate-in zoom-in-95 duration-200">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                    <span>Account: {filterAccountName}</span>
                                    <X size={10} className="ml-1 cursor-pointer hover:scale-110 transition-transform" onClick={() => setFilterAccountName('')} />
                                </div>
                            )}
                            {/* Project Badge */}
                            {filterProjectName && (
                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-[10px] font-bold border border-blue-100 dark:border-blue-900/30 whitespace-nowrap animate-in zoom-in-95 duration-200">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                    <span>Project: {filterProjectName}</span>
                                    <X size={10} className="ml-1 cursor-pointer hover:scale-110 transition-transform" onClick={() => setFilterProjectName('')} />
                                </div>
                            )}
                            {/* Financial Badges */}
                            {filterMrr !== '' && (
                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-[10px] font-bold border border-blue-100 dark:border-blue-900/30 whitespace-nowrap animate-in zoom-in-95 duration-200">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                    <button onClick={(e) => handleOpenFilterDialog('fin_mrr', true, e)} className="hover:text-blue-800 transition-colors">
                                        MRR: {filterMrrOperator === 'between'
                                            ? `$${filterMrr.toLocaleString()} - $${(filterMrrEnd || 0).toLocaleString()}`
                                            : `${filterMrrOperator} $${filterMrr.toLocaleString()}`}
                                    </button>
                                    <X size={10} className="ml-1 cursor-pointer hover:scale-110 transition-transform" onClick={() => { setFilterMrr(''); setFilterMrrEnd(''); }} />
                                </div>
                            )}
                            {filterLifetime !== '' && (
                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-[10px] font-bold border border-blue-100 dark:border-blue-900/30 whitespace-nowrap animate-in zoom-in-95 duration-200">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                    <button onClick={(e) => handleOpenFilterDialog('fin_lifetime', true, e)} className="hover:text-blue-800 transition-colors">
                                        Lifetime: {filterLifetimeOperator === 'between' ? `${filterLifetime} - ${filterLifetimeEnd} MO` : `${filterLifetimeOperator} ${filterLifetime} MO`}
                                    </button>
                                    <X size={10} className="ml-1 cursor-pointer hover:scale-110 transition-transform" onClick={() => { setFilterLifetime(''); setFilterLifetimeEnd(''); }} />
                                </div>
                            )}
                            {/* Attribute Badges */}
                            {filterSubs !== '' && (
                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-[10px] font-bold border border-blue-100 dark:border-blue-900/30 whitespace-nowrap animate-in zoom-in-95 duration-200">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                    <span>Min Subs: {filterSubs}</span>
                                    <X size={10} className="ml-1 cursor-pointer hover:scale-110 transition-transform" onClick={() => setFilterSubs('')} />
                                </div>
                            )}
                            {filterSubsName && (
                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-[10px] font-bold border border-blue-100 dark:border-blue-900/30 whitespace-nowrap animate-in zoom-in-95 duration-200">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                    <span>Subscription: {filterSubsName}</span>
                                    <X size={10} className="ml-1 cursor-pointer hover:scale-110 transition-transform" onClick={() => setFilterSubsName('')} />
                                </div>
                            )}
                            {filterSubsTypes.length > 0 && (
                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-[10px] font-bold border border-blue-100 dark:border-blue-900/30 whitespace-nowrap animate-in zoom-in-95 duration-200">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                    <button onClick={(e) => handleOpenFilterDialog('proj_subs_types', true, e)} className="hover:text-blue-800 transition-colors">
                                        Types: {filterSubsTypes.length > 2 ? `${filterSubsTypes.length} selected` : filterSubsTypes.join(', ')}
                                    </button>
                                    <X size={10} className="ml-1 cursor-pointer hover:scale-110 transition-transform" onClick={() => setFilterSubsTypes([])} />
                                </div>
                            )}
                            {filterNotes && (
                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-[10px] font-bold border border-blue-100 dark:border-blue-900/30 whitespace-nowrap animate-in zoom-in-95 duration-200">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                    <span>Notes: {filterNotes}</span>
                                    <X size={10} className="ml-1 cursor-pointer hover:scale-110 transition-transform" onClick={() => setFilterNotes('')} />
                                </div>
                            )}
                            {/* Ratio Badges */}
                            {filterL30Ratio !== '' && (
                                <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md text-[10px] font-bold transition-colors border border-slate-200 group">
                                    <button onClick={(e) => handleOpenFilterDialog('perf_l30', true, e)} className="flex items-center gap-1 hover:text-blue-600">
                                        <span className="text-slate-400 group-hover:text-slate-500">L30D Ratio:</span>
                                        {filterL30Operator === 'between' ? `${filterL30Ratio} - ${filterL30End}` : `${filterL30Operator} ${filterL30Ratio}`}
                                    </button>
                                    <button onClick={() => { setFilterL30Ratio(''); setFilterL30End(''); }} className="hover:text-red-500"><X size={10} className="text-slate-400 hover:text-red-500" /></button>
                                </div>
                            )}
                            {filterL7Ratio !== '' && (
                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-[10px] font-bold border border-blue-100 dark:border-blue-900/30 whitespace-nowrap animate-in zoom-in-95 duration-200">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                    <button onClick={(e) => handleOpenFilterDialog('perf_l7', true, e)} className="hover:text-blue-800 transition-colors">
                                        L7D Ratio: {filterL7Operator === 'between' ? `${filterL7Ratio} - ${filterL7End}` : `${filterL7Operator} ${filterL7Ratio}`}
                                    </button>
                                    <X size={10} className="ml-1 cursor-pointer hover:scale-110 transition-transform" onClick={() => { setFilterL7Ratio(''); setFilterL7End(''); }} />
                                </div>
                            )}
                            {/* Team Badges */}
                            {Object.entries(filterManagers).map(([key, names]) => {
                                if (names.length === 0) return null;
                                const label = key === 'am' ? 'AM' : key === 'bm' ? 'BM' : key === 'csm' ? 'Care' : key === 'cm' ? 'Esc' : 'GD';
                                return (
                                    <div key={key} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-[10px] font-bold border border-blue-100 dark:border-blue-900/30 whitespace-nowrap animate-in zoom-in-95 duration-200">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                        <button onClick={(e) => handleOpenFilterDialog(`team_${key}`, true, e)} className="hover:text-blue-800 transition-colors">
                                            {label}: {names.length > 1 ? `${names.length} selected` : names[0]}
                                        </button>
                                        <X size={10} className="ml-1 cursor-pointer hover:scale-110 transition-transform" onClick={() => setFilterManagers(prev => ({ ...prev, [key]: [] }))} />
                                    </div>
                                );
                            })}
                            {/* Date Badge */}
                            {(filterDateStart || filterDateEnd) && (
                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-[10px] font-bold border border-blue-100 dark:border-blue-900/30 whitespace-nowrap animate-in zoom-in-95 duration-200">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                    <button onClick={(e) => handleOpenFilterDialog('acc_date', true, e)} className="hover:text-blue-800 transition-colors flex items-center gap-1">
                                        <Calendar size={10} />
                                        {filterDateStart && filterDateEnd ? `${new Date(filterDateStart).toLocaleDateString()} - ${new Date(filterDateEnd).toLocaleDateString()}` : filterDateStart ? `After ${new Date(filterDateStart).toLocaleDateString()}` : `Before ${new Date(filterDateEnd).toLocaleDateString()}`}
                                    </button>
                                    <X size={10} className="ml-1 cursor-pointer hover:scale-110 transition-transform" onClick={() => { setFilterDateStart(''); setFilterDateEnd(''); }} />
                                </div>
                            )}
                            {/* Quick filter badges */}
                            {selectedRisks.length < RISKS.length && (
                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-[10px] font-bold border border-blue-100 dark:border-blue-900/30 whitespace-nowrap animate-in zoom-in-95 duration-200">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                    <span>Risks: {selectedRisks.length} selected</span>
                                    <X size={10} className="ml-1 cursor-pointer hover:scale-110 transition-transform" onClick={() => setSelectedRisks(RISKS.map(r => r.name.toLowerCase()))} />
                                </div>
                            )}
                            {selectedPrevRisks.length < RISKS.length && (
                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-[10px] font-bold border border-blue-100 dark:border-blue-900/30 whitespace-nowrap animate-in zoom-in-95 duration-200">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                    <span>Prev Risks: {selectedPrevRisks.length} selected</span>
                                    <X size={10} className="ml-1 cursor-pointer hover:scale-110 transition-transform" onClick={() => setSelectedPrevRisks(RISKS.map(r => r.name.toLowerCase()))} />
                                </div>
                            )}
                            {selectedWows.length < 3 && (
                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-[10px] font-bold border border-blue-100 dark:border-blue-900/30 whitespace-nowrap animate-in zoom-in-95 duration-200">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                    <span>WoW: {selectedWows.length} selected</span>
                                    <X size={10} className="ml-1 cursor-pointer hover:scale-110 transition-transform" onClick={() => setSelectedWows(['pos', 'neg', 'none'])} />
                                </div>
                            )}
                            {activePersona !== 'brand_ad_management' && selectedOwners.length < 2 && (
                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-[10px] font-bold border border-blue-100 dark:border-blue-900/30 whitespace-nowrap animate-in zoom-in-95 duration-200">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                    <span>Owner: {selectedOwners[0] === 'my' ? 'My projects' : 'Others'}</span>
                                    <X size={10} className="ml-1 cursor-pointer hover:scale-110 transition-transform" onClick={() => setSelectedOwners(['my', 'other'])} />
                                </div>
                            )}
                            {selectedUpdates.length < 3 && (
                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-[10px] font-bold border border-blue-100 dark:border-blue-900/30 whitespace-nowrap animate-in zoom-in-95 duration-200">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                    <span>Updates: {selectedUpdates.length} selected</span>
                                    <X size={10} className="ml-1 cursor-pointer hover:scale-110 transition-transform" onClick={() => setSelectedUpdates(['sent', 'draft', 'blank'])} />
                                </div>
                            )}
                            {filterAccountStatus.length > 0 && (
                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-[10px] font-bold border border-blue-100 dark:border-blue-900/30 whitespace-nowrap animate-in zoom-in-95 duration-200">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                    <button onClick={(e) => handleOpenFilterDialog('acc_status', true, e)} className="hover:text-blue-800 transition-colors">
                                        Status: {filterAccountStatus.length > 2 ? `${filterAccountStatus.length} selected` : filterAccountStatus.join(', ')}
                                    </button>
                                    <X size={10} className="ml-1 cursor-pointer hover:scale-110 transition-transform" onClick={() => setFilterAccountStatus([])} />
                                </div>
                            )}
                            {filterAdEngineStatus.length > 0 && (
                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-[10px] font-bold border border-blue-100 dark:border-blue-900/30 whitespace-nowrap animate-in zoom-in-95 duration-200">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                    <button onClick={(e) => handleOpenFilterDialog('ad_engine', true, e)} className="hover:text-blue-800 transition-colors">
                                        Ad Status: {filterAdEngineStatus.length > 2 ? `${filterAdEngineStatus.length} selected` : filterAdEngineStatus.join(', ')}
                                    </button>
                                    <X size={10} className="ml-1 cursor-pointer hover:scale-110 transition-transform" onClick={() => setFilterAdEngineStatus([])} />
                                </div>
                            )}
                            {filterIncludeExpired && (
                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-[10px] font-bold border border-blue-100 dark:border-blue-900/30 whitespace-nowrap animate-in zoom-in-95 duration-200">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                    <button onClick={(e) => handleOpenFilterDialog('proj_lifecycle', true, e)} className="hover:text-blue-800 transition-colors">Include Expired</button>
                                    <X size={10} className="ml-1 cursor-pointer hover:scale-110 transition-transform" onClick={() => setFilterIncludeExpired(false)} />
                                </div>
                            )}
                            {/* Clear All */}
                            <button onClick={handleClearAllFilters} className="text-[10px] font-bold text-slate-400 hover:text-red-500 px-2 flex items-center gap-1 ml-auto">
                                <RotateCcw size={10} /> Clear all active filters
                            </button>
                        </div>
                    )}

                {/* 3. Quick Filter Summary Row (Shown ONLY when collapsed) */}
                {/* FILTER VIEW (Always Expanded) */}
                <div className="bg-white dark:bg-slate-900 relative">
                    {/* Search Header */}
                    <div id="filter-bar-container" className="p-4 flex items-center gap-3 relative border-b">
                        <div className="relative flex-1 group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={16} />
                            <Input
                                type="text"
                                placeholder="Search by accounts, projects or people..."
                                className="pl-9 bg-background h-10"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={(e) => handleOpenFilterDialog('', false, e)}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors shrink-0"
                        >
                            <Plus size={16} />
                            Add filter
                        </button>
                    </div>


                    {/* Positioned Filter Dialog (Popover style) */}
                    {isFilterDialogOpen && (
                        <div
                            style={filterDialogPos ? {
                                top: `${filterDialogPos.top}px`,
                                left: `${filterDialogPos.left}px`,
                                position: 'absolute'
                            } : {
                                top: '100%',
                                right: '0',
                                position: 'absolute',
                                marginTop: '0.5rem'
                            }}
                            className={cn(
                                "z-[999] bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 flex overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 h-[480px]",
                                filterDialogSingleMode ? "w-[400px]" : "w-[640px]"
                            )}>
                            {/* Left Sidebar - Criteria list */}
                            {!filterDialogSingleMode && (
                                <div className="w-[240px] border-r border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col p-4">
                                    <p className="text-[10px] font-bold text-slate-400 tracking-widest mb-4 px-2">Filters</p>
                                    <div className="flex-1 overflow-y-auto space-y-1">
                                        {[
                                            { id: 'proj_subs_types', label: 'Subscriptions', icon: Hash },
                                            { id: 'fin_mrr', label: 'MRR', icon: DollarSign },
                                            { id: 'fin_lifetime', label: 'Lifetime (months)', icon: Clock },
                                            { id: 'perf_l30', label: 'L30D / P30D', icon: BarChart3 },
                                            { id: 'perf_l7', label: 'L7D / P7D', icon: BarChart3 },
                                            { id: 'proj_lifecycle', label: 'Expired Projects', icon: RotateCcw },
                                            { id: 'team_bm', label: 'Brand Manager', icon: User },
                                            { id: 'team_am', label: 'Ad Manager', icon: User },
                                            { id: 'team_csm', label: 'Care Manager', icon: User },
                                            { id: 'team_gd', label: 'Graphic Designer', icon: User },
                                            { id: 'acc_date', label: 'Created Date', icon: Calendar },
                                            { id: 'acc_status', label: 'Account Status', icon: Flag },
                                            { id: 'ad_engine', label: 'Ad Engine Status', icon: Zap },
                                        ].map(item => (
                                            <button
                                                key={item.id}
                                                onClick={() => {
                                                    setActiveFilterTab(item.id);
                                                    setDraftFilterSearch('');
                                                }}
                                                className={cn(
                                                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-bold transition-all",
                                                    activeFilterTab === item.id
                                                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                                                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                                                )}
                                            >
                                                <item.icon size={14} className={activeFilterTab === item.id ? "text-white" : "text-slate-400"} />
                                                {item.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Right Content - Edit area */}
                            <div className="flex-1 flex flex-col bg-white dark:bg-slate-900">
                                <div className="flex-1 flex flex-col overflow-hidden">
                                    {/* MULTI-SELECT LAYOUT */}
                                    {(['proj_subs_types', 'proj_update', 'proj_risk', 'proj_wow', 'team_am', 'team_bm', 'team_csm', 'team_cm', 'team_gd', 'acc_status', 'ad_engine'].includes(activeFilterTab)) && (() => {
                                        const isTeam = activeFilterTab.startsWith('team_');
                                        const isUpdate = activeFilterTab === 'proj_update';

                                        // Determine Items
                                        let items: { id: string, label: string }[] = [];
                                        if (activeFilterTab === 'proj_subs_types') {
                                            items = PROJECT_TYPES.flatMap(pt => pt.subs).map(s => ({ id: s.toLowerCase(), label: s }));
                                        } else if (isUpdate) {
                                            items = [
                                                { id: 'sent', label: 'Sent' },
                                                { id: 'draft', label: 'Drafted' },
                                                { id: 'blank', label: 'Not Started' }
                                            ];
                                        } else if (isTeam) {
                                            const key = activeFilterTab.replace('team_', '') as keyof typeof draftManagers;
                                            const names = key === 'am' ? AM_NAMES : key === 'bm' ? BRAND_NAMES : key === 'csm' ? CSM_NAMES : key === 'cm' ? CARE_NAMES : DESIGNER_NAMES;
                                            items = names.map(n => ({ id: n, label: n }));
                                        } else if (activeFilterTab === 'proj_risk') {
                                            items = RISKS.map(r => ({ id: r.name.toLowerCase(), label: r.name }));
                                        } else if (activeFilterTab === 'proj_wow') {
                                            items = [
                                                { id: 'pos', label: 'Positive' },
                                                { id: 'neg', label: 'Negative' },
                                                { id: 'none', label: 'No Change' }
                                            ];
                                        } else if (activeFilterTab === 'acc_status') {
                                            items = [
                                                { id: 'customer', label: 'Customer' },
                                                { id: 'prospect', label: 'Prospect' },
                                                { id: 'suspect', label: 'Suspect' },
                                                { id: 'churn', label: 'Churn' }
                                            ];
                                        } else if (activeFilterTab === 'ad_engine') {
                                            items = [
                                                { id: 'active', label: 'Active' },
                                                { id: 'passive', label: 'Passive' },
                                                { id: 'na', label: 'NA' }
                                            ];
                                        }

                                        // Filter Items
                                        const filteredItems = items.filter(i => i.label.toLowerCase().includes(draftFilterSearch.toLowerCase()));

                                        // Selection Logic
                                        const isSelected = (id: string) => {
                                            if (activeFilterTab === 'proj_subs_types') return draftSubsTypes.includes(id);
                                            if (isUpdate) return draftUpdateStatus.includes(id);
                                            if (isTeam) {
                                                const key = activeFilterTab.replace('team_', '') as keyof typeof draftManagers;
                                                return (draftManagers[key] as string[]).includes(id);
                                            }
                                            if (activeFilterTab === 'acc_status') return draftAccountStatus.includes(id);
                                            if (activeFilterTab === 'ad_engine') return draftAdEngineStatus.includes(id);
                                            return false;
                                        };

                                        const toggle = (id: string) => {
                                            if (activeFilterTab === 'proj_subs_types') {
                                                setDraftSubsTypes(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
                                            } else if (isUpdate) {
                                                setDraftUpdateStatus(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
                                            } else if (isTeam) {
                                                const key = activeFilterTab.replace('team_', '') as keyof typeof draftManagers;
                                                setDraftManagers(prev => ({
                                                    ...prev,
                                                    [key]: (prev[key] as string[]).includes(id) ? (prev[key] as string[]).filter(x => x !== id) : [...(prev[key] as string[]), id]
                                                }));
                                            } else if (activeFilterTab === 'acc_status') {
                                                setDraftAccountStatus((prev: string[]) => prev.includes(id) ? prev.filter((x: string) => x !== id) : [...prev, id]);
                                            } else if (activeFilterTab === 'ad_engine') {
                                                setDraftAdEngineStatus((prev: string[]) => prev.includes(id) ? prev.filter((x: string) => x !== id) : [...prev, id]);
                                            } else if (activeFilterTab === 'proj_risk') {
                                                setDraftRisks((prev: string[]) => prev.includes(id) ? prev.filter((x: string) => x !== id) : [...prev, id]);
                                            } else if (activeFilterTab === 'proj_wow') {
                                                setDraftWows((prev: string[]) => prev.includes(id) ? prev.filter((x: string) => x !== id) : [...prev, id]);
                                            }
                                        };

                                        const selectAll = () => {
                                            const allIds = filteredItems.map(i => i.id);
                                            if (activeFilterTab === 'proj_subs_types') setDraftSubsTypes(prev => Array.from(new Set([...prev, ...allIds])));
                                            else if (isUpdate) setDraftUpdateStatus(prev => Array.from(new Set([...prev, ...allIds])));
                                            else if (isTeam) {
                                                const key = activeFilterTab.replace('team_', '') as keyof typeof draftManagers;
                                                setDraftManagers(prev => ({ ...prev, [key]: Array.from(new Set([...(prev[key] as string[]), ...allIds])) }));
                                            } else if (activeFilterTab === 'proj_risk') {
                                                setDraftRisks((prev: string[]) => Array.from(new Set([...prev, ...allIds])));
                                            } else if (activeFilterTab === 'proj_wow') {
                                                setDraftWows((prev: string[]) => Array.from(new Set([...prev, ...allIds])));
                                            } else if (activeFilterTab === 'acc_status') {
                                                setDraftAccountStatus((prev: string[]) => Array.from(new Set([...prev, ...allIds])));
                                            } else if (activeFilterTab === 'ad_engine') {
                                                setDraftAdEngineStatus((prev: string[]) => Array.from(new Set([...prev, ...allIds])));
                                            }
                                        };

                                        const clearAll = () => {
                                            if (activeFilterTab === 'proj_subs_types') setDraftSubsTypes([]);
                                            else if (isUpdate) setDraftUpdateStatus([]);
                                            else if (isTeam) {
                                                const key = activeFilterTab.replace('team_', '') as keyof typeof draftManagers;
                                                setDraftManagers(prev => ({ ...prev, [key]: [] }));
                                            } else if (activeFilterTab === 'proj_risk') {
                                                setDraftRisks([]);
                                            } else if (activeFilterTab === 'proj_wow') {
                                                setDraftWows([]);
                                            } else if (activeFilterTab === 'acc_status') {
                                                setDraftAccountStatus([]);
                                            } else if (activeFilterTab === 'ad_engine') {
                                                setDraftAdEngineStatus([]);
                                            }
                                        };

                                        return (
                                            <div className="flex flex-col h-full">
                                                <div className="p-4 border-b border-slate-100 dark:border-slate-800 space-y-3 bg-slate-50/50 dark:bg-slate-950/20">
                                                    <div className="relative group">
                                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={14} />
                                                        <Input
                                                            autoFocus
                                                            placeholder="Search..."
                                                            className="pl-9 h-8 text-xs bg-background"
                                                            value={draftFilterSearch}
                                                            onChange={(e) => setDraftFilterSearch(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="flex items-center justify-between text-xs px-1">
                                                        <div className="flex gap-4">
                                                            <button onClick={selectAll} className="font-bold text-slate-600 hover:text-blue-600 transition-colors">Select All</button>
                                                            <button onClick={clearAll} className="font-bold text-slate-400 hover:text-red-500 transition-colors">Clear</button>
                                                        </div>
                                                        <span className="text-[10px] text-slate-400 font-medium">{filteredItems.length} items</span>
                                                    </div>
                                                </div>
                                                <div className="flex-1 overflow-y-auto p-2">
                                                    {filteredItems.map(item => (
                                                        <label key={item.id} className="flex items-center gap-3 p-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg cursor-pointer transition-colors group">
                                                            <input
                                                                type="checkbox"
                                                                checked={isSelected(item.id)}
                                                                onChange={() => toggle(item.id)}
                                                                className="w-4 h-4 rounded border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-blue-600 focus:ring-blue-500"
                                                            />
                                                            <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white font-medium transition-colors">{item.label}</span>
                                                        </label>
                                                    ))}
                                                    {filteredItems.length === 0 && (
                                                        <div className="p-8 text-center text-slate-400 text-xs">No items found</div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })()}


                                    {/* NUMBER LAYOUT */}
                                    {(['fin_mrr', 'fin_lifetime', 'perf_l30', 'perf_l7'].includes(activeFilterTab)) && (() => {
                                        const isL30 = activeFilterTab === 'perf_l30';
                                        const isL7 = activeFilterTab === 'perf_l7';
                                        const isMrr = activeFilterTab === 'fin_mrr';
                                        const isLifetime = activeFilterTab === 'fin_lifetime';

                                        const operator = isL30 ? draftL30Operator : isL7 ? draftL7Operator : isMrr ? draftMrrOperator : draftLifetimeOperator;
                                        const setOperator = isL30 ? setDraftL30Operator : isL7 ? setDraftL7Operator : isMrr ? setDraftMrrOperator : setDraftLifetimeOperator;

                                        const value = isL30 ? draftL30Ratio : isL7 ? draftL7Ratio : isMrr ? draftMrr : draftLifetime;
                                        const setValue = (val: any) => {
                                            if (isL30) setDraftL30Ratio(val);
                                            else if (isL7) setDraftL7Ratio(val);
                                            else if (isMrr) setDraftMrr(val);
                                            else setDraftLifetime(val);
                                        };

                                        const endValue = isL30 ? draftL30End : isL7 ? draftL7End : isMrr ? draftMrrEnd : draftLifetimeEnd;
                                        const setEndValue = (val: any) => {
                                            if (isL30) setDraftL30End(val);
                                            else if (isL7) setDraftL7End(val);
                                            else if (isMrr) setDraftMrrEnd(val);
                                            else setDraftLifetimeEnd(val);
                                        };

                                        return (
                                            <div className="p-6 space-y-4">
                                                <div className="space-y-2">
                                                    <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm ring-1 ring-slate-100 dark:ring-slate-900">
                                                        <select
                                                            value={operator}
                                                            onChange={(e) => setOperator(e.target.value)}
                                                            className="w-full p-3 bg-slate-50/50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300 outline-none hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                                                        >
                                                            <option value="=">Equals</option>
                                                            <option value=">">Greater than</option>
                                                            <option value=">=">Greater than or equals to</option>
                                                            <option value="<">Less than</option>
                                                            <option value="<=">Less than or equals to</option>
                                                            <option value="between">Between</option>
                                                        </select>
                                                        <input
                                                            type="number"
                                                            step={isL30 || isL7 ? "0.1" : "1"}
                                                            value={value}
                                                            onChange={(e) => setValue(e.target.value === '' ? '' : parseFloat(e.target.value))}
                                                            placeholder="Enter Value"
                                                            className="w-full p-3 text-sm text-slate-900 dark:text-white bg-transparent outline-none placeholder:text-slate-400"
                                                        />
                                                    </div>
                                                    {operator === 'between' && (
                                                        <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm ring-1 ring-slate-100 dark:ring-slate-900 animate-in fade-in slide-in-from-top-1">
                                                            <input
                                                                type="number"
                                                                step={isL30 || isL7 ? "0.1" : "1"}
                                                                value={endValue}
                                                                onChange={(e) => setEndValue(e.target.value === '' ? '' : parseFloat(e.target.value))}
                                                                placeholder="Max Value"
                                                                className="w-full p-3 text-sm text-slate-900 dark:text-white bg-transparent outline-none placeholder:text-slate-400"
                                                            />
                                                        </div>
                                                    )}
                                                    <p className="text-[10px] text-slate-400 px-1">
                                                        {isL30 || isL7 ? "Enter ratio (e.g. 1.2 for 120%)" : isMrr ? "Monthly Recurring Revenue in USD" : "Customer lifetime in months"}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })()}


                                    {/* DATE LAYOUT */}
                                    {(activeFilterTab === 'acc_date') && (
                                        <div className="p-6 space-y-4">
                                            <div className="space-y-2">
                                                <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm ring-1 ring-slate-100 dark:ring-slate-900">
                                                    <select
                                                        value={draftDateStart && draftDateEnd ? 'between' : draftDateEnd ? 'before' : 'after'}
                                                        onChange={(e) => {
                                                            const val = e.target.value;
                                                            if (val === 'after') { setDraftDateEnd(''); }
                                                            else if (val === 'before') { setDraftDateStart(''); }
                                                        }}
                                                        className="w-full p-3 bg-slate-50/50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300 outline-none hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                                                    >
                                                        <option value="before">Before</option>
                                                        <option value="after">After</option>
                                                        <option value="between">Between</option>
                                                    </select>
                                                    <div className="flex flex-col gap-2 p-3 bg-white dark:bg-slate-900">
                                                        <div className="flex flex-col gap-2">
                                                            <input
                                                                type="date"
                                                                value={draftDateStart}
                                                                onChange={(e) => setDraftDateStart(e.target.value)}
                                                                className="w-full p-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white rounded text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
                                                            />
                                                            <input
                                                                type="date"
                                                                value={draftDateEnd}
                                                                onChange={(e) => setDraftDateEnd(e.target.value)}
                                                                className="w-full p-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white rounded text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}



                                    {/* TEXT LAYOUT */}
                                    {(['proj_notes', 'proj_subs'].includes(activeFilterTab)) && (() => {
                                        const isNotes = activeFilterTab === 'proj_notes';
                                        const value = isNotes ? draftNotes : draftSubsName;
                                        const setValue = isNotes ? setDraftNotes : setDraftSubsName;

                                        return (
                                            <div className="p-6">
                                                <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm ring-1 ring-slate-100 dark:ring-slate-900">
                                                    <input
                                                        autoFocus
                                                        type="text"
                                                        value={value}
                                                        onChange={(e) => setValue(e.target.value)}
                                                        placeholder="Enter Text"
                                                        className="w-full p-3 text-sm text-slate-900 dark:text-white bg-transparent outline-none placeholder:text-slate-400"
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })()}

                                    {/* LIFECYCLE LAYOUT (Custom) */}
                                    {activeFilterTab === 'proj_lifecycle' && (
                                        <div className="p-6">
                                            <div
                                                onClick={() => setDraftIncludeExpired(!draftIncludeExpired)}
                                                className="flex items-center gap-4 p-5 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 cursor-pointer hover:border-blue-200 transition-all group/toggle"
                                            >
                                                <div className={cn(
                                                    "w-12 h-6 rounded-full relative transition-all duration-300 shadow-inner",
                                                    draftIncludeExpired ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-700"
                                                )}>
                                                    <div className={cn(
                                                        "absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-all duration-300 shadow-sm",
                                                        draftIncludeExpired ? "translate-x-6" : ""
                                                    )} />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200 group-hover/toggle:text-blue-600 transition-colors">Include expired projects</p>
                                                    <p className="text-[11px] text-slate-500 mt-0.5">When enabled, projects with only Cancelled subscriptions will be visible.</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Fallback for No Selection */}
                                    {!activeFilterTab && (
                                        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400">
                                            <Search size={48} className="mb-4 text-slate-200" />
                                            <p className="font-medium text-slate-600 dark:text-slate-300">Select a Filter</p>
                                            <p className="text-sm mt-1">Please select a filter from the left menu to configure.</p>
                                        </div>
                                    )}

                                </div>

                                {/* Footer */}
                                <div className="p-4 bg-slate-50/50 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between mt-auto">
                                    <button onClick={handleClearAllFilters} className="text-[10px] font-bold text-slate-400 hover:text-red-500 transition-colors">Reset All Filters</button>
                                    <div className="flex gap-2">
                                        <button onClick={() => setIsFilterDialogOpen(false)} className="px-4 py-1.5 text-xs font-bold text-slate-500 hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
                                        <button onClick={handleApplyFilters} className="px-4 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg shadow-md shadow-blue-500/10 transition-all hover:bg-blue-700 active:scale-95">Apply Filters</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* (Active Filter Buttons Row has been moved to sticky header stack) */}



                    {/* Collapsible Content - Cards View */}
                    <div id="filter-cards-area" className="relative z-0 bg-white dark:bg-slate-900 p-5 space-y-8 animate-in fade-in duration-300 rounded-xl">


                        {/* Combined Risk Cards with Transition Toggle */}
                        <div className="space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-fit border border-slate-200 dark:border-slate-700">
                                    <button
                                        onClick={() => setRiskViewMode('current')}
                                        className={cn(
                                            "flex items-center gap-2 px-4 py-1.5 text-xs font-bold rounded-lg transition-all",
                                            riskViewMode === 'current' ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm" : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
                                        )}
                                    >
                                        <Clock size={14} />
                                        <span>Current Risks</span>
                                    </button>
                                    <button
                                        onClick={() => setRiskViewMode('previous')}
                                        className={cn(
                                            "flex items-center gap-2 px-4 py-1.5 text-xs font-bold rounded-lg transition-all",
                                            riskViewMode === 'previous' ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm" : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
                                        )}
                                    >
                                        <RotateCcw size={14} />
                                        <span>Previous Week</span>
                                    </button>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="flex gap-3 text-[11px] font-bold">
                                        <button
                                            onClick={() => {
                                                if (riskViewMode === 'current') setSelectedRisks(RISKS.map(r => r.name.toLowerCase()));
                                                else setSelectedPrevRisks(RISKS.map(r => r.name.toLowerCase()));
                                            }}
                                            className="text-blue-600 hover:underline"
                                        >
                                            Select all
                                        </button>
                                        <span className="text-slate-300">|</span>
                                        <button
                                            onClick={() => {
                                                if (riskViewMode === 'current') setSelectedRisks([]);
                                                else setSelectedPrevRisks([]);
                                            }}
                                            className="text-slate-400 hover:underline"
                                        >
                                            Clear
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                                {RISKS.map(risk => {
                                    const key = risk.name.toLowerCase();
                                    const isCurrent = riskViewMode === 'current';
                                    const active = isCurrent ? selectedRisks.includes(key) : selectedPrevRisks.includes(key);
                                    const stat = isCurrent ? stats.risks[key] : stats.prevRisks[key];

                                    return (
                                        <div
                                            key={risk.name + (isCurrent ? "_curr" : "_prev")}
                                            onClick={() => {
                                                const lower = risk.name.toLowerCase();
                                                if (isCurrent) {
                                                    setSelectedRisks(prev => prev.includes(lower) ? prev.filter(x => x !== lower) : [...prev, lower]);
                                                } else {
                                                    setSelectedPrevRisks(prev => prev.includes(lower) ? prev.filter(x => x !== lower) : [...prev, lower]);
                                                }
                                            }}
                                            className={cn(
                                                "p-3 rounded-xl border cursor-pointer transition-all duration-300 hover:shadow-md group relative overflow-hidden",
                                                active
                                                    ? (isCurrent
                                                        ? "border-blue-500 bg-blue-50/50 dark:bg-blue-600/10 ring-1 ring-blue-500/10 dark:ring-blue-500/20 shadow-sm"
                                                        : "border-slate-400 bg-slate-50 dark:bg-slate-800/50 ring-1 ring-slate-400/20 shadow-sm")
                                                    : "bg-white dark:bg-slate-900 border-[#eef0f3] dark:border-slate-800"
                                            )}
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2 min-w-0">
                                                    <input
                                                        type="checkbox"
                                                        checked={active}
                                                        readOnly
                                                        className={cn(
                                                            "w-3.5 h-3.5 rounded border-slate-300 shrink-0",
                                                            isCurrent ? "text-blue-600" : "text-slate-500"
                                                        )}
                                                    />
                                                    <p className="text-xs font-bold leading-tight truncate">{risk.name}</p>
                                                    <div
                                                        className="w-2 h-2 rounded-full border shrink-0"
                                                        style={{
                                                            backgroundColor: risk.hex,
                                                            borderColor: risk.hex.toLowerCase() === '#ffffff' ? '#e2e8f0' : 'rgba(0,0,0,0.1)',
                                                            opacity: isCurrent ? 1 : 0.6
                                                        }}
                                                    />
                                                </div>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Info size={12} className="text-slate-300 group-hover:text-slate-500 flex-shrink-0 cursor-help" />
                                                    </TooltipTrigger>
                                                    <TooltipContent side="top" className="max-w-64 py-3">
                                                        <div className="space-y-1">
                                                            <div className="flex items-center gap-2">
                                                                <Info size={14} className="text-blue-500" />
                                                                <p className="text-sm font-bold text-slate-900">{risk.name}</p>
                                                            </div>
                                                            <p className="text-xs text-slate-500 leading-relaxed font-normal">{risk.desc}</p>
                                                        </div>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </div>
                                            {allowFinancials && <p className="text-[16px] font-bold mt-1 tabular-nums">${stat.mrr.toLocaleString()}</p>}
                                            <p className="text-[10px] text-slate-500 font-medium mt-1">{stat.count} projects</p>

                                            {/* Bottom Color Bar - Thinner and more subtle for previous mode */}
                                            <div
                                                className={cn(
                                                    "absolute bottom-0 left-0 right-0 h-1 opacity-80 border-t transition-all",
                                                    risk.hex.toLowerCase() === '#ffffff' ? "border-slate-200 dark:border-slate-700" : "border-black/5"
                                                )}
                                                style={{ backgroundColor: risk.hex }}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Secondary Filters */}
                        <div className={cn("grid grid-cols-1 gap-6 pt-4 border-t", (showOwnership || activePersona === 'brand_ad_management') ? (activePersona === 'brand_ad_management' ? "lg:grid-cols-[1.625fr_0.75fr_1.625fr]" : "lg:grid-cols-3") : "lg:grid-cols-2")}>
                            {/* WoW Risk Change */}
                            <div className="h-full flex flex-col gap-4">
                                <div className="flex items-center justify-between">
                                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">WoW risk change</p>
                                    <div className="flex gap-3 text-[11px] font-bold">
                                        <button onClick={() => setSelectedWows(['pos', 'neg', 'none'])} className="text-blue-600 hover:underline">Select all</button>
                                        <span className="text-slate-300">|</span>
                                        <button onClick={() => setSelectedWows([])} className="text-slate-400 hover:underline">Clear</button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 xl:grid-cols-3 gap-2 flex-1">
                                    {['Positive', 'Negative', 'No Change'].map((label, idx) => {
                                        const keys = ['pos', 'neg', 'none'];
                                        const key = keys[idx];
                                        const active = selectedWows.includes(key);
                                        const stat = stats.wow[key];
                                        const desc = WOW_CHANGES[idx].desc;
                                        return (
                                            <div
                                                key={label}
                                                onClick={() => toggleWow(key)}
                                                className={cn(
                                                    "p-2 rounded-xl border cursor-pointer transition-all hover:shadow-md group h-full flex flex-col justify-between",
                                                    active ? "border-blue-500 bg-blue-50/50 dark:bg-blue-600/10 ring-1 ring-blue-500/10 dark:ring-blue-500/20 shadow-sm" : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 grayscale-[0.5] opacity-80"
                                                )}
                                            >
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="flex items-center gap-2 min-w-0">
                                                        <input type="checkbox" checked={active} readOnly className="w-3.5 h-3.5 rounded border-slate-300 text-blue-600 shrink-0" />
                                                        {idx === 0 ? <ArrowUpRight size={16} className="text-emerald-500 shrink-0" /> : idx === 1 ? <ArrowDownRight size={16} className="text-red-500 shrink-0" /> : <Minus size={16} className="text-slate-400 shrink-0" />}
                                                        <span className="text-xs font-bold leading-tight truncate">{label}</span>
                                                    </div>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Info size={12} className="text-slate-300 group-hover:text-slate-500 flex-shrink-0 cursor-help" />
                                                        </TooltipTrigger>
                                                        <TooltipContent side="top" className="max-w-64 py-3">
                                                            <div className="space-y-1">
                                                                <div className="flex items-center gap-2">
                                                                    <Info size={14} className="text-blue-500" />
                                                                    <p className="text-sm font-bold text-slate-900">{label}</p>
                                                                </div>
                                                                <p className="text-xs text-slate-500 leading-relaxed font-normal">{desc}</p>
                                                            </div>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </div>
                                                {allowFinancials && <p className="text-[15px] font-bold tabular-nums mt-3">${stat.mrr.toLocaleString()}</p>}
                                                <p className="text-[10px] text-slate-500 font-medium mt-0.5">{stat.count} projects</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Project Ownership */}
                            {(showOwnership || activePersona === 'brand_ad_management') && (
                                <div className="h-full flex flex-col gap-4 lg:pl-4 lg:border-l">
                                    <div className="flex items-center justify-between">
                                        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Ownership</p>
                                        <div className="flex gap-3 text-[11px] font-bold">
                                            <button onClick={() => setSelectedOwners(['my', 'other'])} className="text-blue-600 hover:underline">Select all</button>
                                            <span className="text-slate-300">|</span>
                                            <button onClick={() => setSelectedOwners([])} className="text-slate-400 hover:underline">Clear</button>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 flex-1">
                                        {[
                                            { id: 'my', label: 'My Projects', icon: User, desc: 'View projects where you are assigned as part of the team.' },
                                            { id: 'other', label: 'Other Projects', icon: Users, desc: 'View projects managed by other team members.' }
                                        ].map((item) => {
                                            const active = selectedOwners.includes(item.id);
                                            const stat = stats.owners[item.id as 'my' | 'other'];
                                            const isCompact = activePersona === 'brand_ad_management';
                                            const displayLabel = isCompact ? (item.id === 'my' ? 'My' : 'Other') : item.label;

                                            return (
                                                <div
                                                    key={item.id}
                                                    onClick={() => toggleOwner(item.id)}
                                                    className={cn(
                                                        "rounded-xl border cursor-pointer transition-all hover:shadow-md group h-full flex flex-col justify-between",
                                                        isCompact ? "p-3" : "p-2",
                                                        active ? "border-blue-500 bg-blue-50/50 dark:bg-blue-600/10 ring-1 ring-blue-500/10 dark:ring-blue-500/20 shadow-sm" : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 grayscale-[0.5] opacity-80"
                                                    )}
                                                >
                                                    <div className={cn("flex items-center justify-between", isCompact ? "" : "mb-2")}>
                                                        <div className="flex items-center gap-2 min-w-0">
                                                            <input type="checkbox" checked={active} readOnly className="w-3.5 h-3.5 rounded border-slate-300 text-blue-600 shrink-0" />
                                                            {!isCompact && <item.icon size={16} className="text-blue-500 shrink-0" />}
                                                            <span className="text-xs font-bold leading-tight truncate">{displayLabel}</span>
                                                        </div>
                                                        {!isCompact && (
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <Info size={12} className="text-slate-300 group-hover:text-slate-500 flex-shrink-0 cursor-help" />
                                                                </TooltipTrigger>
                                                                <TooltipContent side="top" className="max-w-64 py-3">
                                                                    <div className="space-y-1">
                                                                        <div className="flex items-center gap-2">
                                                                            <Info size={14} className="text-blue-500" />
                                                                            <p className="text-sm font-bold text-slate-900">{item.label}</p>
                                                                        </div>
                                                                        <p className="text-xs text-slate-500 leading-relaxed font-normal">{item.desc}</p>
                                                                    </div>
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        )}
                                                    </div>
                                                    {!isCompact ? (
                                                        <>
                                                            {allowFinancials && <p className="text-[15px] font-bold tabular-nums mt-3">${stat.mrr.toLocaleString()}</p>}
                                                            <p className="text-[10px] text-slate-500 font-medium mt-0.5">{stat.count} projects</p>
                                                        </>
                                                    ) : (
                                                        <p className="text-[10px] text-slate-500 font-medium mt-1 ml-6">{stat.count} projects</p>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Weekly Update Status */}
                            <div className="h-full flex flex-col gap-4 lg:pl-4 lg:border-l">
                                <div className="flex items-center justify-between">
                                    <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Weekly Update Status</p>
                                    <div className="flex gap-3 text-[11px] font-bold">
                                        <button onClick={() => setSelectedUpdates(['sent', 'draft', 'blank'])} className="text-blue-600 hover:underline">Select all</button>
                                        <span className="text-slate-300">|</span>
                                        <button onClick={() => setSelectedUpdates([])} className="text-slate-400 hover:underline">Clear</button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 xl:grid-cols-3 gap-2 flex-1">
                                    {['Sent', 'Draft', 'Missing'].map((label, idx) => {
                                        const keys = ['sent', 'draft', 'blank'];
                                        const key = keys[idx];
                                        const active = selectedUpdates.includes(key);
                                        const stat = stats.updates[key];
                                        const desc = [
                                            'Updates sent to client.',
                                            'Updates drafted but not sent.',
                                            'No update created yet.'
                                        ][idx];

                                        return (
                                            <div
                                                key={label}
                                                onClick={() => toggleUpdate(key)}
                                                className={cn(
                                                    "p-2 rounded-xl border cursor-pointer transition-all hover:shadow-md group h-full flex flex-col justify-between",
                                                    active ? "border-blue-500 bg-blue-50/50 dark:bg-blue-600/10 ring-1 ring-blue-500/10 dark:ring-blue-500/20 shadow-sm" : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 grayscale-[0.5] opacity-80"
                                                )}
                                            >
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="flex items-center gap-2 min-w-0">
                                                        <input type="checkbox" checked={active} readOnly className="w-3.5 h-3.5 rounded border-slate-300 text-blue-600 shrink-0" />
                                                        {idx === 0 ? <Check size={16} className="text-emerald-500 shrink-0" /> : idx === 1 ? <Edit size={16} className="text-amber-500 shrink-0" /> : <ShieldAlert size={16} className="text-red-500 shrink-0" />}
                                                        <span className="text-xs font-bold leading-tight truncate">{label}</span>
                                                    </div>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Info size={12} className="text-slate-300 group-hover:text-slate-500 flex-shrink-0 cursor-help" />
                                                        </TooltipTrigger>
                                                        <TooltipContent side="top" className="max-w-64 py-3">
                                                            <div className="space-y-1">
                                                                <div className="flex items-center gap-2">
                                                                    <Info size={14} className="text-blue-500" />
                                                                    <p className="text-sm font-bold text-slate-900">{label}</p>
                                                                </div>
                                                                <p className="text-xs text-slate-500 leading-relaxed font-normal">{desc}</p>
                                                            </div>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </div>
                                                {allowFinancials && <p className="text-[15px] font-bold tabular-nums mt-3">${stat.mrr.toLocaleString()}</p>}
                                                <p className="text-[10px] text-slate-500 font-medium mt-0.5">{stat.count} projects</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )}

            {/* ====================================== */}
            {/*         SECTION 2: SUMMARY            */}
            {/* ====================================== */}
            {allowFinancials && <div className="h-4" />}
            {/* 1. SUMMARY HEADER - Styled like Projects Header */}
            <div id="summary-header"
                data-stuck={isScrolledPastSummary || !summaryVisible}
                className={cn(
                    "flex items-center justify-between gap-3 sticky z-[55] bg-white dark:bg-slate-950 py-3 transition-all h-[48px]",
                    "top-12",
                    (isScrolledPastSummary || !summaryVisible) ? "border-b border-slate-200 dark:border-slate-800 shadow-sm" : "border-b-transparent",
                    !allowFinancials && "hidden"
                )}
            >
                <div
                    className={cn(
                        "flex items-center gap-2.5 flex-1 min-w-0",
                        (isScrolledPastSummary || !summaryVisible) ? "cursor-pointer" : ""
                    )}
                    onClick={() => {
                        if (isScrolledPastSummary || !summaryVisible) {
                            handleToggleSummary();
                        }
                    }}
                >
                    <div className="flex items-center gap-2 shrink-0">
                        <div className="w-1 h-5 rounded-full bg-violet-600 shadow-sm"></div>
                        <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">Summary</h2>
                    </div>

                    {(isScrolledPastSummary || !summaryVisible) && (
                        <div className="mx-4 text-xs text-slate-500 truncate animate-in fade-in slide-in-from-left-2 duration-300">
                            <span className="font-medium text-slate-600 dark:text-slate-400">{summarySentenceJSX}</span>
                        </div>
                    )}

                    <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800"></div>
                </div>
                <button
                    onClick={handleToggleSummary}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200"
                >
                    <ChevronDown size={16} className={cn("transition-transform duration-200", summaryVisible ? "rotate-180" : "")} />
                </button>
            </div>

            {/* 2. SUMMARY CONTENT (Detailed Cards) */}
            {
                allowFinancials && summaryVisible && (
                    <div id="summary-content-vessel" className="relative mt-2 z-20">
                        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                            <DashboardStats
                                projects={projectRows}
                                monthlyReimRun={monthlyReimRun}
                                setMonthlyReimRun={setMonthlyReimRun}
                                monthlyVendorRecovery={monthlyVendorRecovery}
                                setMonthlyVendorRecovery={setMonthlyVendorRecovery}
                                persona={activePersona}
                                data={data}
                                includeExpired={filterIncludeExpired}
                            />
                        </div>
                    </div>
                )
            }

            {/* ====================================== */}
            {/*         SECTION 3: PROJECTS           */}
            {/* ====================================== */}

            <div className="h-4" />
            {/* Sticky Projects Header */}
            <div id="projects-header"
                data-stuck={isScrolledPastProjects}
                className={cn(
                    "flex items-center justify-between gap-3 mb-4 sticky z-[50] bg-white dark:bg-slate-950 py-3 transition-all h-[48px]",
                    allowFinancials ? "top-24" : "top-12",
                    isScrolledPastProjects ? "border-b border-slate-200 dark:border-slate-800 shadow-sm" : "border-b-transparent"
                )}
            >
                <div className="flex items-center gap-2.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2 shrink-0">
                        <div className="w-1 h-5 rounded-full bg-emerald-600 shadow-sm"></div>
                        <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">Projects</h2>
                    </div>

                    {isScrolledPastProjects && (
                        <div className="mx-4 text-xs text-slate-500 truncate animate-in fade-in slide-in-from-left-2 duration-300">
                            <span className="font-semibold text-slate-700 dark:text-slate-300">{projectRows.length} projects</span>
                            <span className="mx-1.5 text-slate-300">|</span>
                            <span className="font-semibold text-slate-700 dark:text-slate-300">{filteredData.length} accounts</span>
                        </div>
                    )}

                    <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800"></div>
                </div>
            </div>

            {/* Table Toolbar */}
            <div className="flex flex-col gap-3">
                {!isScrolledPastProjects && (
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-slate-500">
                                <span className="font-semibold text-slate-700 dark:text-slate-300">{quickFilterSentence}</span>
                                <span className="ml-2 opacity-50 italic">({filteredData.length} accounts)</span>
                            </p>
                        </div>
                    </div>
                )}
            </div>

            <div id="projects-list-vessel" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden mt-2 mb-12 relative z-10">
                <div className="flex items-center justify-between p-1 bg-slate-100 dark:bg-slate-800 border-b">
                    <div className="flex-1 px-4">
                        {/* Left side space */}
                    </div>
                    <div className="flex items-center gap-2 p-1">
                        <div className="relative">
                            <button
                                onClick={() => setIsColumnSettingsOpen(!isColumnSettingsOpen)}
                                className={cn(
                                    "p-2 px-3 rounded-lg transition-all flex items-center gap-2",
                                    isColumnSettingsOpen ? "bg-white shadow text-blue-600" : "text-slate-400 hover:text-slate-600"
                                )}
                                title="Columns"
                            >
                                <Settings size={18} />
                                <span className="text-xs font-bold">Columns</span>
                            </button>

                            {isColumnSettingsOpen && (
                                <div className="absolute right-0 top-full mt-2 z-50 w-[540px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 h-[600px]">
                                    {/* Presets Sidebar */}
                                    <div className="w-[180px] border-r bg-slate-50/50 dark:bg-slate-900/50 flex flex-col p-4">
                                        <h4 className="text-[11px] font-black text-slate-900 dark:text-white tracking-tighter mb-6">Presets</h4>

                                        <div className="space-y-6 flex-1">
                                            <div>
                                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3">Default Presets</p>
                                                <div className="space-y-1">
                                                    {[
                                                        { label: 'All Columns', ids: COLUMN_LIST.map(c => c.id) },
                                                        { label: 'Essential', ids: ['account', 'project', 'mrr', 'risk', 'wow'] },
                                                        { label: 'Team Only', ids: ['account', 'project', 'am', 'bm', 'csm', 'cm', 'gd'] },
                                                        { label: 'Performance', ids: ['account', 'project', 'mrr', 'l30_p30', 'l7_p7', 'wow'] }
                                                    ].map(p => (
                                                        <button
                                                            key={p.label}
                                                            onClick={() => setVisibleColumns(p.ids)}
                                                            className="w-full text-left p-2.5 rounded-xl hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm transition-all group"
                                                        >
                                                            <p className="text-[11px] font-bold text-slate-700 dark:text-slate-200 group-hover:text-blue-600">{p.label}</p>
                                                            <p className="text-[9px] text-slate-400 dark:text-slate-500 mt-0.5">{p.ids.length} columns</p>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t mt-auto">
                                            <div className="bg-white dark:bg-slate-800 p-3 rounded-xl shadow-inner border border-slate-100">
                                                <input
                                                    type="text"
                                                    placeholder="Preset name"
                                                    value={presetName}
                                                    onChange={(e) => setPresetName(e.target.value)}
                                                    className="w-full bg-transparent text-[10px] font-bold text-slate-900 dark:text-slate-100 outline-none mb-2"
                                                />
                                                <button className="w-full py-1.5 bg-indigo-600 text-white text-[10px] font-bold rounded-lg shadow-md shadow-indigo-500/20 active:scale-95 transition-transform">
                                                    Save Current
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Main Content */}
                                    <div className="flex-1 flex flex-col bg-white dark:bg-slate-900">
                                        <div className="p-4 border-b flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Columns</h4>
                                                <div className="flex items-center gap-2">
                                                    <button onClick={() => setVisibleColumns(COLUMN_LIST.map(c => c.id))} className="text-[10px] font-bold text-blue-600 hover:underline">Select all</button>
                                                    <span className="text-slate-300">|</span>
                                                    <button onClick={() => setVisibleColumns([])} className="text-[10px] font-bold text-slate-400 hover:underline">Clear all</button>
                                                </div>
                                            </div>
                                            <button onClick={() => setIsColumnSettingsOpen(false)} className="text-slate-400 hover:text-slate-600 p-1"><X size={16} /></button>
                                        </div>

                                        <div className="p-4 border-b">
                                            <div className="relative group">
                                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={14} />
                                                <Input
                                                    type="text"
                                                    placeholder="Search columns..."
                                                    value={columnSearch}
                                                    onChange={(e) => setColumnSearch(e.target.value)}
                                                    className="pl-9 h-8 text-xs bg-background"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                                            {/* Checkbox List */}
                                            <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-8">
                                                {COLUMN_LIST.filter((c: any) => c.label.toLowerCase().includes(columnSearch.toLowerCase())).map((col: any) => {
                                                    const isVisible = visibleColumns.includes(col.id);
                                                    return (
                                                        <label key={col.id} className="flex items-center gap-2.5 cursor-pointer group">
                                                            <div className={cn(
                                                                "w-4 h-4 rounded border flex items-center justify-center transition-all",
                                                                isVisible ? "bg-blue-600 border-blue-600 shadow-sm" : "border-slate-200 group-hover:border-blue-300"
                                                            )}>
                                                                <input
                                                                    type="checkbox"
                                                                    className="hidden"
                                                                    checked={isVisible}
                                                                    onChange={() => {
                                                                        setVisibleColumns((prev: string[]) =>
                                                                            isVisible ? prev.filter(id => id !== col.id) : [...prev, col.id]
                                                                        );
                                                                    }}
                                                                />
                                                                {isVisible && <Plus size={10} className="text-white rotate-45 scale-125" />}
                                                            </div>
                                                            <span className={cn("text-xs font-bold transition-colors", isVisible ? "text-slate-900 dark:text-slate-100" : "text-slate-400 dark:text-slate-500")}>{col.label}</span>
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <Info size={12} className="text-slate-300 hover:text-slate-500 cursor-help" />
                                                                </TooltipTrigger>
                                                                <TooltipContent side="right">
                                                                    <p className="text-[10px] font-medium">{col.desc}</p>
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </label>
                                                    );
                                                })}
                                            </div>

                                            {/* Visible Order Section */}
                                            <div className="pt-6 border-t">
                                                <div className="flex items-center justify-between mb-4">
                                                    <p className="text-[10px] font-bold text-slate-400 tracking-widest">Visible Order</p>
                                                    <p className="text-[9px] font-bold text-slate-400 italic">Drag to reorder</p>
                                                </div>
                                                <div className="space-y-1.5">
                                                    {columnOrder.filter((id: string) => visibleColumns.includes(id)).map((colId: string, idx: number) => {
                                                        const col = COLUMN_LIST.find((c: any) => c.id === colId);
                                                        const isFixed = idx < 2 && (colId === 'account' || colId === 'project');
                                                        return (
                                                            <div
                                                                key={colId}
                                                                draggable={!isFixed}
                                                                onDragStart={() => !isFixed && handleDragStart(idx)}
                                                                onDragOver={(e) => !isFixed && handleDragOver(e, idx)}
                                                                onDragEnd={() => setDraggedIdx(null)}
                                                                className={cn(
                                                                    "flex items-center gap-3 px-3 py-2.5 rounded-xl border text-[11px] font-bold transition-all",
                                                                    isFixed ? "bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500 cursor-default opacity-80" : "bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-200 shadow-sm border-slate-100 dark:border-slate-800 cursor-grab active:cursor-grabbing hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-md",
                                                                    draggedIdx === idx ? "opacity-30 border-blue-500 scale-95" : ""
                                                                )}
                                                            >
                                                                {isFixed ? <div className="w-3.5 h-3.5" /> : <GripVertical size={14} className="text-slate-300" />}
                                                                <span className="flex-1 truncate">{col?.label}</span>
                                                                {isFixed && <span className="text-[9px] font-black uppercase opacity-60">Fixed</span>}
                                                            </div>
                                                        );
                                                    })}
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <button className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-[11px] font-bold text-slate-600 dark:text-slate-300 shadow-sm hover:bg-slate-50 transition-all ml-auto">
                                        <Columns size={14} className="text-blue-500" />
                                        <span>Columns</span>
                                        <ChevronDown size={12} className="opacity-40" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Main Table */}
                <div className="bg-white dark:bg-slate-900 border rounded-xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[2200px]">
                            <thead>
                                <tr className="border-b bg-slate-50/50 dark:bg-slate-800/50">
                                    {(() => {
                                        let currentLeft = 0;
                                        return columnOrder.filter((id: string) => visibleColumns.includes(id)).map((colId: string) => {
                                            const col = COLUMN_LIST.find((c: any) => c.id === colId);
                                            if (!col) return null;

                                            const isSticky = colId === 'account' || colId === 'project';
                                            const leftPos = currentLeft;
                                            const width = columnWidths[colId] || (colId === 'account' ? 240 : (colId === 'project' ? 200 : 150));
                                            if (isSticky || columnWidths[colId]) currentLeft += width;

                                            return (
                                                <th
                                                    key={colId}
                                                    style={isSticky ? { '--left-pos': `${leftPos}px`, minWidth: `${width}px`, maxWidth: `${width}px` } as React.CSSProperties : { minWidth: `${width}px` }}
                                                    className={cn(
                                                        "p-4 text-[11px] font-bold text-slate-800 dark:text-slate-200 tracking-wide transition-colors whitespace-nowrap cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 group/th relative",
                                                        isSticky ? "sticky left-[var(--left-pos)] bg-white dark:bg-slate-800 z-30 border-r dark:border-slate-700" : "",
                                                        colId === 'subscriptions' ? "border-l border-slate-100 dark:border-slate-800" : "",
                                                        col.align === 'right' ? "text-right" : "",
                                                        isSticky && colId === 'project' ? "shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]" : "",
                                                        isSticky && colId === 'account' && !visibleColumns.includes('project') ? "shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]" : "",
                                                        sortConfig?.key === colId ? "bg-blue-50/50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400" : ""
                                                    )}
                                                    onClick={() => {
                                                        setSortConfig(prev => {
                                                            if (prev?.key === colId) {
                                                                if (prev.direction === 'asc') return { key: colId, direction: 'desc' };
                                                                return null;
                                                            }
                                                            return { key: colId, direction: 'asc' };
                                                        });
                                                    }}
                                                >
                                                    <div className={cn("flex items-center gap-1.5", col.align === 'right' ? "flex-row-reverse" : "flex-row")}>
                                                        <span>{col.label}</span>
                                                        <div className="flex flex-col opacity-0 group-hover/th:opacity-100 transition-opacity">
                                                            {sortConfig?.key === colId ? (
                                                                sortConfig.direction === 'asc' ? <ArrowUp size={10} strokeWidth={3} /> : <ArrowDown size={10} strokeWidth={3} />
                                                            ) : (
                                                                <ArrowUp size={10} strokeWidth={3} className="text-slate-300" />
                                                            )}
                                                        </div>
                                                    </div>

                                                    {(colId === 'account' || colId === 'ad_engine_status' || colId === 'project') && (
                                                        <div
                                                            className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-500/50 active:bg-blue-500 transition-colors z-40"
                                                            onMouseDown={(e) => handleResizeStart(e, colId)}
                                                            onClick={(e) => e.stopPropagation()}
                                                        />
                                                    )}
                                                </th>
                                            );
                                        });
                                    })()}
                                    <th className="p-4 w-16"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y text-slate-700 dark:text-slate-200">
                                {projectRows.map((row: any, _idx: number) => {
                                    let currentLeft = 0;
                                    return (
                                        <tr key={`${row.account.id}-${row.id || _idx}`} className="hover:bg-blue-50/10 transition-colors group">
                                            {columnOrder.filter((id: string) => visibleColumns.includes(id)).map((colId: string) => {
                                                const isAccountCol = colId === 'account' || colId === 'ad_engine_status';
                                                const isProjectCol = colId === 'project';
                                                const isSticky = isAccountCol || isProjectCol;
                                                const leftPos = currentLeft;
                                                const width = columnWidths[colId] || (colId === 'account' ? 240 : (colId === 'ad_engine_status' ? 140 : (isProjectCol ? 200 : 150)));

                                                if (isSticky || columnWidths[colId]) currentLeft += width;

                                                if (isAccountCol && !row.isFirstInAccount) return null;

                                                const style = isSticky
                                                    ? { '--left-pos': `${leftPos}px`, minWidth: `${width}px`, maxWidth: `${width}px` } as React.CSSProperties
                                                    : { minWidth: `${width}px` };

                                                const cellContent = () => {
                                                    switch (colId) {
                                                        case 'account':
                                                            return (
                                                                <div className="flex items-center gap-3">
                                                                    <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-slate-800 border border-indigo-100 dark:border-slate-700 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-[10px] shrink-0">
                                                                        {row.account.initials}
                                                                    </div>
                                                                    <TooltipProvider>
                                                                        <Tooltip delayDuration={200}>
                                                                            <TooltipTrigger asChild>
                                                                                <div
                                                                                    className="flex-1 min-w-0 group/acc relative cursor-pointer"
                                                                                    onClick={() => {
                                                                                        setSelectedAccount(row.account);
                                                                                        setCurrentPage('account-detail');
                                                                                    }}
                                                                                >
                                                                                    <div className="flex items-center gap-1">
                                                                                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate leading-snug group-hover/acc:text-blue-600 transition-colors">
                                                                                            {row.account.name}
                                                                                        </p>
                                                                                        <ArrowUpRight size={14} className="text-blue-600 dark:text-blue-400 opacity-0 group-hover/acc:opacity-100 transition-all -translate-x-1 group-hover/acc:translate-x-0" />
                                                                                    </div>
                                                                                    <div className="flex flex-col gap-0 mt-0.5">
                                                                                        <p className="text-[10px] font-bold text-blue-600/70 dark:text-blue-400/70 tracking-tight whitespace-nowrap">Total MRR: ${row.accountTotalMrr?.toLocaleString()}</p>
                                                                                        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-tight whitespace-nowrap">{row.accountAbsoluteTotalProjects} {row.accountAbsoluteTotalProjects === 1 ? 'Project' : 'Projects'}</p>
                                                                                    </div>
                                                                                </div>
                                                                            </TooltipTrigger>
                                                                            <TooltipContent side="right">
                                                                                <div className="flex items-center gap-1.5 p-0.5">
                                                                                    <TrendingUp size={12} className="text-blue-500" />
                                                                                    <span className="text-[10px] font-black uppercase tracking-widest">Explore Account Intelligence</span>
                                                                                </div>
                                                                            </TooltipContent>
                                                                        </Tooltip>
                                                                    </TooltipProvider>
                                                                </div>
                                                            );
                                                        case 'project':
                                                            return (
                                                                <TooltipProvider>
                                                                    <Tooltip delayDuration={200}>
                                                                        <TooltipTrigger asChild>
                                                                            <div
                                                                                className="flex flex-col gap-1 cursor-pointer group/proj"
                                                                                onClick={() => {
                                                                                    setSelectedAccount(row.account);
                                                                                    setCurrentPage('account-detail');
                                                                                }}
                                                                            >
                                                                                <div className="flex items-center gap-2">
                                                                                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate group-hover/proj:text-blue-600 hover:underline transition-all">
                                                                                        {row.name}
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </TooltipTrigger>
                                                                        <TooltipContent side="right">
                                                                            <div className="flex items-center gap-1.5 p-0.5">
                                                                                <Search size={12} className="text-blue-500" />
                                                                                <span className="text-[10px] font-black uppercase tracking-widest">Inspect Project Details</span>
                                                                            </div>
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                </TooltipProvider>
                                                            );
                                                        case 'subscriptions':
                                                            return <SubscriptionList subs={row.subscriptions} />;
                                                        case 'ad_engine_status':
                                                            return (
                                                                <Badge className={cn(
                                                                    "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border whitespace-nowrap",
                                                                    row.adEngineStatus === 'Active'
                                                                        ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800/50"
                                                                        : row.adEngineStatus === 'Passive'
                                                                            ? "bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-800/50"
                                                                            : "bg-slate-50 dark:bg-slate-900/40 text-slate-500 dark:text-slate-400 border-slate-100 dark:border-slate-800/50"
                                                                )}>
                                                                    {row.adEngineStatus || 'NA'}
                                                                </Badge>
                                                            );
                                                        case 'mrr':
                                                            return <span className="text-sm font-bold font-mono tracking-tighter text-slate-900 dark:text-slate-100">${row.mrr.toLocaleString()}</span>;
                                                        case 'risk':
                                                            return (
                                                                <RiskBadge
                                                                    risk={row.risk}
                                                                    onUpdate={() => {
                                                                        setUpdatingProject(row);
                                                                        setSelectedNewRisk(row.risk);
                                                                        setIsRiskUpdateOpen(true);
                                                                    }}
                                                                />
                                                            );
                                                        case 'prevRisk':
                                                            return <RiskBadge risk={row.prevRisk} />;
                                                        case 'wow':
                                                            return <WowBadge wow={row.wow} />;
                                                        case 'lifetime':
                                                            return <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">{row.lifetime}mo</span>;
                                                        case 'l30_p30':
                                                            return <span className="text-xs font-bold font-mono text-slate-600 dark:text-slate-400">%{row.salesP30 > 0 ? ((row.salesL30 / row.salesP30) * 100).toFixed(0) : '0'}</span>;
                                                        case 'l7_p7':
                                                            return <span className="text-xs font-bold font-mono text-slate-600 dark:text-slate-200">%{row.salesP7 > 0 ? ((row.salesL7 / row.salesP7) * 100).toFixed(0) : '0'}</span>;
                                                        case 'am':
                                                            const ams = row.am ? row.am.split(', ') : [];
                                                            return (
                                                                <div
                                                                    onClick={() => handleTeamClick(row, 'am')}
                                                                    className="text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-800 p-1.5 -m-1.5 rounded-lg cursor-pointer flex items-center gap-2 group/edit transition-colors"
                                                                >
                                                                    <div className="flex -space-x-2 overflow-hidden shrink-0">
                                                                        {ams.length > 0 ? ams.slice(0, 3).map((name: string, i: number) => (
                                                                            <div key={i} className="w-6 h-6 rounded-full bg-indigo-100 ring-2 ring-white dark:ring-slate-900 text-indigo-600 flex items-center justify-center text-[9px] font-bold shrink-0" title={name}>
                                                                                {name.charAt(0)}
                                                                            </div>
                                                                        )) : (
                                                                            <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-[9px] font-bold shrink-0">-</div>
                                                                        )}
                                                                        {ams.length > 3 && (
                                                                            <div className="w-6 h-6 rounded-full bg-slate-100 ring-2 ring-white dark:ring-slate-900 text-slate-500 flex items-center justify-center text-[8px] font-bold shrink-0">
                                                                                +{ams.length - 3}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    <span className="truncate flex-1 text-slate-700 dark:text-slate-200">
                                                                        {ams.length > 0
                                                                            ? (ams.length === 1 ? ams[0] : `${ams[0]} +${ams.length - 1}`)
                                                                            : <span className="text-slate-400 italic">Assign</span>
                                                                        }
                                                                    </span>
                                                                    <Edit size={12} className="text-slate-400 opacity-0 group-hover/edit:opacity-100 transition-opacity" />
                                                                </div>
                                                            );
                                                        case 'bm':
                                                            const bms = row.bm ? row.bm.split(', ') : [];
                                                            return (
                                                                <div
                                                                    onClick={() => handleTeamClick(row, 'bm')}
                                                                    className="text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-800 p-1.5 -m-1.5 rounded-lg cursor-pointer flex items-center gap-2 group/edit transition-colors"
                                                                >
                                                                    <div className="flex -space-x-2 overflow-hidden shrink-0">
                                                                        {bms.length > 0 ? bms.slice(0, 3).map((name: string, i: number) => (
                                                                            <div key={i} className="w-6 h-6 rounded-full bg-purple-100 ring-2 ring-white dark:ring-slate-900 text-purple-600 flex items-center justify-center text-[9px] font-bold shrink-0" title={name}>
                                                                                {name.charAt(0)}
                                                                            </div>
                                                                        )) : (
                                                                            <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-[9px] font-bold shrink-0">-</div>
                                                                        )}
                                                                        {bms.length > 3 && (
                                                                            <div className="w-6 h-6 rounded-full bg-slate-100 ring-2 ring-white dark:ring-slate-900 text-slate-500 flex items-center justify-center text-[8px] font-bold shrink-0">
                                                                                +{bms.length - 3}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    <span className="truncate flex-1 text-slate-700 dark:text-slate-200">
                                                                        {bms.length > 0
                                                                            ? (bms.length === 1 ? bms[0] : `${bms[0]} +${bms.length - 1}`)
                                                                            : <span className="text-slate-400 italic">Assign</span>
                                                                        }
                                                                    </span>
                                                                    <Edit size={12} className="text-slate-400 opacity-0 group-hover/edit:opacity-100 transition-opacity" />
                                                                </div>
                                                            );
                                                        case 'csm':
                                                            const csms = row.csm ? row.csm.split(', ') : [];
                                                            return (
                                                                <div
                                                                    onClick={() => handleTeamClick(row, 'csm')}
                                                                    className="text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-800 p-1.5 -m-1.5 rounded-lg cursor-pointer flex items-center gap-2 group/edit transition-colors"
                                                                >
                                                                    <div className="flex -space-x-2 overflow-hidden shrink-0">
                                                                        {csms.length > 0 ? csms.slice(0, 3).map((name: string, i: number) => (
                                                                            <div key={i} className="w-6 h-6 rounded-full bg-emerald-100 ring-2 ring-white dark:ring-slate-900 text-emerald-600 flex items-center justify-center text-[9px] font-bold shrink-0" title={name}>
                                                                                {name.charAt(0)}
                                                                            </div>
                                                                        )) : (
                                                                            <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-[9px] font-bold shrink-0">-</div>
                                                                        )}
                                                                        {csms.length > 3 && (
                                                                            <div className="w-6 h-6 rounded-full bg-slate-100 ring-2 ring-white dark:ring-slate-900 text-slate-500 flex items-center justify-center text-[8px] font-bold shrink-0">
                                                                                +{csms.length - 3}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    <span className="truncate flex-1 text-slate-700 dark:text-slate-200">
                                                                        {csms.length > 0
                                                                            ? (csms.length === 1 ? csms[0] : `${csms[0]} +${csms.length - 1}`)
                                                                            : <span className="text-slate-400 italic">Assign</span>
                                                                        }
                                                                    </span>
                                                                    <Edit size={12} className="text-slate-400 opacity-0 group-hover/edit:opacity-100 transition-opacity" />
                                                                </div>
                                                            );
                                                        case 'cm':
                                                            const cms = row.cm ? row.cm.split(', ') : [];
                                                            return (
                                                                <div
                                                                    onClick={() => handleTeamClick(row, 'cm')}
                                                                    className="text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-800 p-1.5 -m-1.5 rounded-lg cursor-pointer flex items-center gap-2 group/edit transition-colors"
                                                                >
                                                                    <div className="flex -space-x-2 overflow-hidden shrink-0">
                                                                        {cms.length > 0 ? cms.slice(0, 3).map((name: string, i: number) => (
                                                                            <div key={i} className="w-6 h-6 rounded-full bg-rose-100 ring-2 ring-white dark:ring-slate-900 text-rose-600 flex items-center justify-center text-[9px] font-bold shrink-0" title={name}>
                                                                                {name.charAt(0)}
                                                                            </div>
                                                                        )) : (
                                                                            <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-[9px] font-bold shrink-0">-</div>
                                                                        )}
                                                                        {cms.length > 3 && (
                                                                            <div className="w-6 h-6 rounded-full bg-slate-100 ring-2 ring-white dark:ring-slate-900 text-slate-500 flex items-center justify-center text-[8px] font-bold shrink-0">
                                                                                +{cms.length - 3}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    <span className="truncate flex-1 text-slate-700 dark:text-slate-200">
                                                                        {cms.length > 0
                                                                            ? (cms.length === 1 ? cms[0] : `${cms[0]} +${cms.length - 1}`)
                                                                            : <span className="text-slate-400 italic">Assign</span>
                                                                        }
                                                                    </span>
                                                                    <Edit size={12} className="text-slate-400 opacity-0 group-hover/edit:opacity-100 transition-opacity" />
                                                                </div>
                                                            );
                                                        case 'gd':
                                                            const gds = row.gd ? row.gd.split(', ') : [];
                                                            return (
                                                                <div
                                                                    onClick={() => handleTeamClick(row, 'gd')}
                                                                    className="text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-800 p-1.5 -m-1.5 rounded-lg cursor-pointer flex items-center gap-2 group/edit transition-colors"
                                                                >
                                                                    <div className="flex -space-x-2 overflow-hidden shrink-0">
                                                                        {gds.length > 0 ? gds.slice(0, 3).map((name: string, i: number) => (
                                                                            <div key={i} className="w-6 h-6 rounded-full bg-orange-100 ring-2 ring-white dark:ring-slate-900 text-orange-600 flex items-center justify-center text-[9px] font-bold shrink-0" title={name}>
                                                                                {name.charAt(0)}
                                                                            </div>
                                                                        )) : (
                                                                            <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-[9px] font-bold shrink-0">-</div>
                                                                        )}
                                                                        {gds.length > 3 && (
                                                                            <div className="w-6 h-6 rounded-full bg-slate-100 ring-2 ring-white dark:ring-slate-900 text-slate-500 flex items-center justify-center text-[8px] font-bold shrink-0">
                                                                                +{gds.length - 3}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    <span className="truncate flex-1 text-slate-700 dark:text-slate-200">
                                                                        {gds.length > 0
                                                                            ? (gds.length === 1 ? gds[0] : `${gds[0]} +${gds.length - 1}`)
                                                                            : <span className="text-slate-400 italic">Assign</span>
                                                                        }
                                                                    </span>
                                                                    <Edit size={12} className="text-slate-400 opacity-0 group-hover/edit:opacity-100 transition-opacity" />
                                                                </div>
                                                            );
                                                        case 'createdAt':
                                                            return <span className="text-xs font-medium whitespace-nowrap">{row.createdAt}</span>;
                                                        case 'notes':
                                                            return row.notes ? (
                                                                <TooltipProvider>
                                                                    <Tooltip>
                                                                        <TooltipTrigger asChild>
                                                                            <p
                                                                                className="text-xs text-slate-400 truncate max-w-[150px] cursor-help italic"
                                                                                dangerouslySetInnerHTML={{ __html: row.notes.replace(/<[^>]*>?/gm, '').substring(0, 50) + (row.notes.replace(/<[^>]*>?/gm, '').length > 50 ? '...' : '') }}
                                                                            ></p>
                                                                        </TooltipTrigger>
                                                                        <TooltipContent side="top" className="max-w-xs shadow-xl border-blue-100 p-3">
                                                                            <div
                                                                                className="text-xs leading-relaxed rich-text-content"
                                                                                dangerouslySetInnerHTML={{ __html: row.notes }}
                                                                            />
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                </TooltipProvider>
                                                            ) : null;
                                                        case 'customerUpdateStatus':
                                                            return (
                                                                <div className="flex items-center justify-center gap-2 group/status">
                                                                    {row.customerUpdateStatus === 'sent' ? (
                                                                        <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100 px-2 py-0.5 rounded-full text-[10px] font-bold">
                                                                            SENT
                                                                        </Badge>
                                                                    ) : row.customerUpdateStatus === 'draft' ? (
                                                                        <Badge className="bg-amber-50 text-amber-600 border-amber-100 px-2 py-0.5 rounded-full text-[10px] font-bold">
                                                                            DRAFT
                                                                        </Badge>
                                                                    ) : (
                                                                        <Badge className="bg-slate-50 text-slate-400 border-slate-100 px-2 py-0.5 rounded-full text-[10px] font-bold">
                                                                            BLANK
                                                                        </Badge>
                                                                    )}
                                                                    <button
                                                                        onClick={() => {
                                                                            setUpdatingProject(row);
                                                                            setSelectedNewRisk(row.risk);
                                                                            setDialogTab('customer');
                                                                            setIsRiskUpdateOpen(true);
                                                                        }}
                                                                        className="p-1 rounded-md hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-all opacity-0 group-hover/status:opacity-100"
                                                                        title="Edit Customer Update"
                                                                    >
                                                                        <Edit size={12} />
                                                                    </button>
                                                                </div>
                                                            );
                                                        default:
                                                            return null;
                                                    }
                                                };

                                                const col = COLUMN_LIST.find(c => c.id === colId);

                                                return (
                                                    <td
                                                        key={colId}
                                                        rowSpan={isAccountCol ? row.accountVisibleCount : 1}
                                                        style={isSticky ? { '--left-pos': `${leftPos}px`, minWidth: `${width}px`, maxWidth: `${width}px` } as React.CSSProperties : {}}
                                                        className={cn(
                                                            "p-4 border-slate-100 dark:border-slate-800 transition-colors",
                                                            isSticky ? "sticky left-[var(--left-pos)] z-20 bg-white dark:bg-slate-900 group-hover:bg-slate-50 dark:group-hover:bg-slate-800 border-r" : "border-l border-slate-50 dark:border-slate-800/50",
                                                            isAccountCol ? "align-top" : "align-middle",
                                                            col?.align === 'right' ? "text-right" : "text-left",
                                                            isSticky && colId === 'project' ? "shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]" : "",
                                                            isSticky && colId === 'account' && !visibleColumns.includes('project') ? "shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]" : ""
                                                        )}
                                                    >
                                                        {cellContent()}
                                                    </td>
                                                );
                                            })}
                                            <td className="p-4 text-right opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                <button className="p-1 hover:bg-slate-200 rounded text-slate-400 hover:text-slate-600"><MoreHorizontal size={16} /></button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer */}
                    <div className="p-4 bg-slate-50/50 border-t flex items-center justify-between">
                        <p className="text-xs font-bold text-slate-500">Showing {projectRows.length} of {data.reduce((acc, curr) => acc + curr.projects.length, 0)} projects</p>
                        <div className="flex gap-2">
                            <button className="px-4 py-1.5 border rounded-lg text-xs font-bold hover:bg-white transition-all disabled:opacity-30" disabled>Previous</button>
                            <div className="flex gap-1">
                                <button className="w-8 h-8 rounded-lg bg-blue-600 text-white text-xs font-bold ring-2 ring-blue-600/20 shadow-sm">1</button>
                                <button className="w-8 h-8 rounded-lg border text-xs font-bold hover:bg-white text-slate-500">2</button>
                                <button className="w-8 h-8 rounded-lg border text-xs font-bold hover:bg-white text-slate-500">3</button>
                            </div>
                            <button className="px-4 py-1.5 border rounded-lg text-xs font-bold hover:bg-white transition-all">Next</button>
                        </div>
                    </div>
                </div>
            </div>


            {/* --- Risk Update Dialog --- */}
            <RiskManagementDialog
                isOpen={isRiskUpdateOpen}
                onClose={() => setIsRiskUpdateOpen(false)}
                project={updatingProject}
                activePersona={activePersona}
                userRole={userRole}
                theme={theme}
                onSave={handleSaveRisk}
                risks={RISKS}
                factors={DIALOG_FACTORS}
            />



            {/* --- Team Member Dialog --- */}
            <TeamManagementDialog
                isOpen={isTeamDialogOpen}
                onClose={() => setIsTeamDialogOpen(false)}
                project={editingTeamProject}
                role={editingTeamRole}
                onSave={handleSaveTeam}
                memberList={getRoleMembers(editingTeamRole)}
            />
        </div >
    );



    const renderTasks = () => {
        const statuses = ['To Do', 'Work In Progress', 'Pending Reflection', 'Pending Information - POC', 'Pending Approval'];

        return (
            <div className="flex flex-col gap-6">
                {/* Page Title */}
                <div className="flex flex-col gap-1 px-1">
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Tasks</h1>
                        <HelpLink showInternal />
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 text-[14px] font-medium">Manage and track tasks across accounts and projects</p>
                </div>

                {/* Sticky Filters Header */}
                <div id="task-filters-header" className={cn(
                    "flex items-center justify-between gap-3 sticky top-0 z-[60] py-4 transition-all bg-white dark:bg-slate-950",
                    (isScrolledPastTaskFilters || !smartTaskFiltersVisibleActual) ? "border-b border-slate-200 dark:border-slate-800 shadow-md bg-white/95 backdrop-blur-sm" : "border-b-transparent"
                )}>
                    <div
                        className={cn(
                            "flex items-center gap-2.5 flex-1 min-w-0",
                            (isScrolledPastTaskFilters || !smartTaskFiltersVisibleActual) ? "cursor-pointer" : ""
                        )}
                        onClick={() => {
                            if (isScrolledPastTaskFilters || !smartTaskFiltersVisibleActual) {
                                setSmartTaskFiltersVisibleActual(true);
                                setIsScrolledPastTaskFilters(false);
                            }
                        }}
                    >
                        <div className="flex items-center gap-2 shrink-0">
                            <div className="w-1.5 h-5 rounded-full bg-blue-600 shadow-sm"></div>
                            <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">Filters</h2>
                        </div>

                        {(isScrolledPastTaskFilters || !smartTaskFiltersVisibleActual) && (
                            <div className="mx-4 text-xs text-slate-500 animate-in fade-in slide-in-from-left-2 duration-300 overflow-hidden">
                                <span className="font-medium text-slate-600 dark:text-slate-400">{taskFilterSentence}</span>
                            </div>
                        )}

                        <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800 opacity-50"></div>
                    </div>
                    <button
                        onClick={() => setSmartTaskFiltersVisibleActual(!smartTaskFiltersVisibleActual)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200 bg-slate-50/50"
                    >
                        <ChevronDown size={16} className={cn("transition-transform duration-200", smartTaskFiltersVisibleActual ? "rotate-180" : "")} />
                    </button>
                </div>

                {/* Consolidated Filter Container */}
                {smartTaskFiltersVisibleActual && (
                    <div id="task-filter-container-vessel" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden mb-2 transition-all hover:shadow-md animate-in fade-in slide-in-from-top-2 duration-300">
                        {/* Search & Badges Row */}
                        <div className="p-4 flex flex-wrap items-center gap-x-4 gap-y-3 border-b">
                            <div className="relative flex-1 min-w-[240px] max-w-sm group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={16} />
                                <Input
                                    type="text"
                                    placeholder="Search tasks..."
                                    value={taskSearch}
                                    onChange={(e) => setTaskSearch(e.target.value)}
                                    className="pl-9 h-9 bg-background"
                                />
                            </div>
                            <button className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all shrink-0">
                                <Plus size={14} /> Add Filter {(selectedTaskStatuses.length + selectedTaskTypes.length + selectedTaskPriorities.length + selectedTaskTimelines.length) > 0 && <span className="bg-blue-600 text-white w-4 h-4 rounded-full flex items-center justify-center text-[10px]">{selectedTaskStatuses.length + selectedTaskTypes.length + selectedTaskPriorities.length + selectedTaskTimelines.length}</span>}
                            </button>
                            <div className="flex flex-wrap items-center gap-2 py-1">
                                {selectedAccount && (
                                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 rounded-full text-[10px] font-bold shadow-sm whitespace-nowrap cursor-default">
                                        <Building2 size={12} /> Account: {selectedAccount.name}
                                    </div>
                                )}
                                {selectedTaskStatuses.length > 0 && selectedTaskStatuses.length < 5 && (
                                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-[10px] font-bold border border-blue-100 dark:border-blue-900/30 whitespace-nowrap">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Responsibility: {selectedTaskStatuses.join(', ')} <X size={10} className="ml-1 cursor-pointer hover:scale-110 transition-transform" onClick={() => setSelectedTaskStatuses([])} />
                                    </div>
                                )}
                                {selectedTaskTypes.length > 0 && selectedTaskTypes.length < 2 && (
                                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-[10px] font-bold border border-blue-100 dark:border-blue-900/30 whitespace-nowrap">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Type: {selectedTaskTypes.join(', ')} <X size={10} className="ml-1 cursor-pointer hover:scale-110 transition-transform" onClick={() => setSelectedTaskTypes([])} />
                                    </div>
                                )}
                                {selectedTaskPriorities.length > 0 && selectedTaskPriorities.length < 2 && (
                                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-[10px] font-bold border border-blue-100 dark:border-blue-900/30 whitespace-nowrap">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Priority: {selectedTaskPriorities.join(', ')} <X size={10} className="ml-1 cursor-pointer hover:scale-110 transition-transform" onClick={() => setSelectedTaskPriorities([])} />
                                    </div>
                                )}
                                {selectedTaskTimelines.length > 0 && selectedTaskTimelines.length < 3 && (
                                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-[10px] font-bold border border-blue-100 dark:border-blue-900/30 whitespace-nowrap">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Timeline: {selectedTaskTimelines.join(', ')} <X size={10} className="ml-1 cursor-pointer hover:scale-110 transition-transform" onClick={() => setSelectedTaskTimelines([])} />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Quick Selection Grid Row */}
                        <div className="p-5 flex flex-col gap-8 animate-in fade-in duration-300">
                            {/* Row 1: Responsibility & Type */}
                            <div className="grid grid-cols-1 lg:grid-cols-10 gap-4">
                                <div className="lg:col-span-7 space-y-3">
                                    <div className="flex items-center justify-between px-1">
                                        <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Responsibility</p>
                                        <div className="flex gap-2 text-[10px] font-bold">
                                            <button onClick={() => setSelectedTaskStatuses(['Assigned to Me', 'Watchdog', 'Reported by Me', 'My Team', 'Other'])} className="text-blue-600 hover:underline">Select all</button>
                                            <span className="text-slate-300">|</span>
                                            <button onClick={() => setSelectedTaskStatuses([])} className="text-slate-400 hover:underline">Clear</button>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-5 gap-2">
                                        {[
                                            { id: 'Assigned to Me', label: 'Assigned to Me', count: 6, icon: User, color: 'text-emerald-500', desc: 'Tasks currently assigned specifically to you.' },
                                            { id: 'Watchdog', label: 'Watchdog', count: 19, icon: Eye, color: 'text-blue-500', desc: 'Tasks you are monitoring as a watcher.' },
                                            { id: 'Reported by Me', label: 'Reported by Me', count: 23, icon: UserPlus, color: 'text-slate-400', desc: 'Tasks that were created/reported by you.' },
                                            { id: 'My Team', label: 'My Team', count: 11, icon: Users, color: 'text-amber-500', desc: 'Tasks assigned to members of your direct team.' },
                                            { id: 'Other', label: 'Other', count: 4, icon: MoreHorizontal, color: 'text-slate-400', desc: 'Other tasks involving you indirectly.' },
                                        ].map((card) => {
                                            const active = selectedTaskStatuses.includes(card.id);
                                            return (
                                                <div
                                                    key={card.id}
                                                    onClick={() => {
                                                        setSelectedTaskStatuses(prev => prev.includes(card.id) ? prev.filter(v => v !== card.id) : [...prev, card.id]);
                                                    }}
                                                    className={cn(
                                                        "p-2.5 rounded-xl border cursor-pointer transition-all hover:shadow-md group flex flex-col justify-between h-24",
                                                        active ? "border-blue-500 bg-blue-50/50 dark:bg-blue-600/10 ring-1 ring-blue-500/10 dark:ring-blue-500/20 shadow-sm" : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 grayscale-[0.05] opacity-90"
                                                    )}
                                                >
                                                    <div className="flex items-center justify-between mb-2">
                                                        <div className="flex items-center gap-2 min-w-0">
                                                            <input type="checkbox" checked={active} readOnly className="w-3 h-3 rounded border-slate-300 text-blue-600 shrink-0" />
                                                            <card.icon size={13} className={cn(card.color, "shrink-0")} />
                                                            <span className="text-[10px] font-bold leading-tight truncate">{card.label}</span>
                                                        </div>
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <Info size={11} className="text-slate-300 group-hover:text-slate-500 flex-shrink-0 cursor-help" />
                                                            </TooltipTrigger>
                                                            <TooltipContent side="top" className="max-w-64 py-2">
                                                                <p className="text-[10px] text-slate-500">{card.desc}</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </div>
                                                    <div className="mt-auto">
                                                        <p className="text-lg font-bold tabular-nums leading-none tracking-tight">{card.count}</p>
                                                        <p className="text-[9px] text-slate-500 font-medium mt-0.5 tracking-tight">tasks</p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="lg:col-span-3 space-y-3">
                                    <div className="flex items-center justify-between px-1">
                                        <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Type</p>
                                        <div className="flex gap-2 text-[10px] font-bold">
                                            <button onClick={() => setSelectedTaskTypes(['Task', 'Ticket'])} className="text-blue-600 hover:underline">All</button>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        {[
                                            { id: 'Task', label: 'Task', count: 6, icon: ClipboardList, color: 'text-blue-500', desc: 'Standard operational tasks.' },
                                            { id: 'Ticket', label: 'Ticket', count: 19, icon: Ticket, color: 'text-rose-500', desc: 'Support or technical tickets.' },
                                        ].map((card) => {
                                            const active = selectedTaskTypes.includes(card.id);
                                            return (
                                                <div
                                                    key={card.id}
                                                    onClick={() => {
                                                        setSelectedTaskTypes(prev => prev.includes(card.id) ? prev.filter(v => v !== card.id) : [...prev, card.id]);
                                                    }}
                                                    className={cn(
                                                        "p-2.5 rounded-xl border cursor-pointer transition-all hover:shadow-md group flex flex-col justify-between h-24",
                                                        active ? "border-blue-500 bg-blue-50/50 dark:bg-blue-600/10 ring-1 ring-blue-500/10 dark:ring-blue-500/20 shadow-sm" : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 grayscale-[0.05] opacity-90"
                                                    )}
                                                >
                                                    <div className="flex items-center justify-between mb-2">
                                                        <div className="flex items-center gap-2 min-w-0">
                                                            <input type="checkbox" checked={active} readOnly className="w-3 h-3 rounded border-slate-300 text-blue-600 shrink-0" />
                                                            <card.icon size={13} className={cn(card.color, "shrink-0")} />
                                                            <span className="text-[10px] font-bold leading-tight truncate">{card.label}</span>
                                                        </div>
                                                    </div>
                                                    <div className="mt-auto">
                                                        <p className="text-lg font-bold tabular-nums leading-none tracking-tight">{card.count}</p>
                                                        <p className="text-[9px] text-slate-500 font-medium mt-0.5 tracking-tight">tasks</p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Row 2: Priority & Timeline */}
                            <div className="grid grid-cols-1 lg:grid-cols-10 gap-4">
                                <div className="lg:col-span-4 space-y-3">
                                    <div className="flex items-center justify-between px-1">
                                        <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Priority</p>
                                        <div className="flex gap-2 text-[10px] font-bold">
                                            <button onClick={() => setSelectedTaskPriorities(['High', 'Medium'])} className="text-blue-600 hover:underline">All</button>
                                            <span className="text-slate-300">|</span>
                                            <button onClick={() => setSelectedTaskPriorities([])} className="text-slate-400 hover:underline">Clear</button>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        {[
                                            { id: 'High', label: 'High', count: 6, icon: AlertCircle, color: 'text-red-500' },
                                            { id: 'Medium', label: 'Medium', count: 19, icon: Activity, color: 'text-amber-500' },
                                        ].map((card) => {
                                            const active = selectedTaskPriorities.includes(card.id);
                                            return (
                                                <div
                                                    key={card.id}
                                                    onClick={() => {
                                                        setSelectedTaskPriorities(prev => prev.includes(card.id) ? prev.filter(v => v !== card.id) : [...prev, card.id]);
                                                    }}
                                                    className={cn(
                                                        "p-2.5 rounded-xl border cursor-pointer transition-all hover:shadow-md group flex flex-col justify-between h-24",
                                                        active ? "border-blue-500 bg-blue-50/50 dark:bg-blue-600/10 ring-1 ring-blue-500/10 dark:ring-blue-500/20 shadow-sm" : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 grayscale-[0.05] opacity-90"
                                                    )}
                                                >
                                                    <div className="flex items-center justify-between mb-2">
                                                        <div className="flex items-center gap-2 min-w-0">
                                                            <input type="checkbox" checked={active} readOnly className="w-3 h-3 rounded border-slate-300 text-blue-600 shrink-0" />
                                                            <card.icon size={13} className={cn(card.color, "shrink-0")} />
                                                            <span className="text-[10px] font-bold leading-tight truncate">{card.label}</span>
                                                        </div>
                                                    </div>
                                                    <div className="mt-auto">
                                                        <p className="text-lg font-bold tabular-nums leading-none tracking-tight">{card.count}</p>
                                                        <p className="text-[9px] text-slate-500 font-medium mt-0.5 tracking-tight">tasks</p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="lg:col-span-6 space-y-3">
                                    <div className="flex items-center justify-between px-1">
                                        <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Timeline</p>
                                        <div className="flex gap-2 text-[10px] font-bold">
                                            <button onClick={() => setSelectedTaskTimelines(['On Track', 'Overdue', 'Other'])} className="text-blue-600 hover:underline">All</button>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                        {[
                                            { id: 'On Track', label: 'On Track', count: 6, icon: Calendar, color: 'text-emerald-500', desc: 'Tasks with upcoming deadlines or those delivered within the projected schedule.' },
                                            { id: 'Overdue', label: 'Overdue', count: 3, icon: Clock, color: 'text-rose-500', desc: 'Ongoing tasks that have exceeded their due dates or late deliveries.' },
                                            { id: 'Other', label: 'Other', count: 12, icon: MoreHorizontal, color: 'text-slate-400', desc: 'Operational tasks or backlog items currently without a defined deadline.' },
                                        ].map((card) => {
                                            const active = selectedTaskTimelines.includes(card.id);
                                            return (
                                                <div
                                                    key={card.id}
                                                    onClick={() => {
                                                        setSelectedTaskTimelines(prev => prev.includes(card.id) ? prev.filter(v => v !== card.id) : [...prev, card.id]);
                                                    }}
                                                    className={cn(
                                                        "p-2.5 rounded-xl border cursor-pointer transition-all hover:shadow-md group flex flex-col justify-between h-24",
                                                        active ? "border-blue-500 bg-blue-50/50 dark:bg-blue-600/10 ring-1 ring-blue-500/10 dark:ring-blue-500/20 shadow-sm" : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 grayscale-[0.05] opacity-90"
                                                    )}
                                                >
                                                    <div className="flex items-center justify-between mb-2">
                                                        <div className="flex items-center gap-2 min-w-0">
                                                            <input type="checkbox" checked={active} readOnly className="w-3 h-3 rounded border-slate-300 text-blue-600 shrink-0" />
                                                            <card.icon size={13} className={cn(card.color, "shrink-0")} />
                                                            <span className="text-[10px] font-bold leading-tight truncate">{card.label}</span>
                                                        </div>
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <Info size={11} className="text-slate-300 group-hover:text-slate-500 flex-shrink-0 cursor-help" />
                                                            </TooltipTrigger>
                                                            <TooltipContent side="top" className="max-w-64 py-2">
                                                                <p className="text-[10px] text-slate-500">{card.desc}</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </div>
                                                    <div className="mt-auto">
                                                        <p className="text-lg font-bold tabular-nums leading-none tracking-tight">{card.count}</p>
                                                        <p className="text-[9px] text-slate-500 font-medium mt-0.5 tracking-tight">tasks</p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Actions Row */}
                <div className="flex items-center justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2.5 rounded-xl shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center bg-slate-50 dark:bg-slate-950 p-1 rounded-lg border border-slate-100 dark:border-slate-800">
                            <button
                                onClick={() => setTaskView('kanban')}
                                className={cn("px-4 py-1.5 rounded-md flex items-center gap-2 text-[11px] font-bold transition-all", taskView === 'kanban' ? "bg-white dark:bg-slate-800 text-blue-600 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700" : "text-slate-500 hover:text-slate-700")}
                            >
                                <Kanban size={13} /> Kanban
                            </button>
                            <button
                                onClick={() => setTaskView('table')}
                                className={cn("px-4 py-1.5 rounded-md flex items-center gap-2 text-[11px] font-bold transition-all", taskView === 'table' ? "bg-white dark:bg-slate-800 text-blue-600 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700" : "text-slate-500 hover:text-slate-700")}
                            >
                                <TableIcon size={13} /> Table
                            </button>
                        </div>
                        <div className="h-6 w-px bg-slate-200 dark:bg-slate-800" />
                        <div className="flex items-center gap-2">
                            <span className="text-[11px] font-bold text-slate-400 px-1">Group By:</span>
                            <div className="flex items-center gap-1.5">
                                {['Status', 'Priority', 'Due Date', 'Team'].map((label) => (
                                    <button
                                        key={label}
                                        onClick={() => setTaskGroupBy(label.toLowerCase() as any)}
                                        className={cn("px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all border", taskGroupBy === label.toLowerCase() ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20" : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-50")}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition-all">
                            <Mail size={14} className="text-slate-400" /> Notifications
                        </button>
                        <button className="flex items-center gap-2 px-4 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition-all">
                            <Columns size={14} className="text-slate-400" /> Columns
                        </button>
                        <button className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all active:scale-95">
                            <Plus size={14} /> Create New
                        </button>
                    </div>
                </div>

                {/* Kanban Board */}
                <div className="flex gap-6 overflow-x-auto pb-6 -mx-2 px-2 custom-scrollbar">
                    {statuses.map(status => {
                        const activeTasksData = selectedAccount ? TASKS_DATA.filter(t => t.id === 'T' + (selectedAccount.id % 3 + 1)) : TASKS_DATA;
                        const filteredTasks = activeTasksData.filter(t => t.status === status);
                        return (
                            <div key={status} className="flex-shrink-0 w-[340px] flex flex-col gap-4">
                                <div className="flex items-center justify-between px-3 h-8">
                                    <div className="flex items-center gap-2">
                                        <GripVertical size={14} className="text-slate-300 cursor-grab active:cursor-grabbing" />
                                        <h3 className="text-[13px] font-black tracking-wider text-slate-400 dark:text-slate-500">{status}</h3>
                                        <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-0.5 rounded-full text-[10px] font-bold">{filteredTasks.length + (selectedAccount ? 0 : 5)}</span>
                                    </div>
                                    <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors">
                                        <MoreHorizontal size={14} className="text-slate-400" />
                                    </button>
                                </div>
                                <div className="flex flex-col gap-4 min-h-[600px] p-1 bg-slate-50/50 dark:bg-slate-950/20 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800/50">
                                    {filteredTasks.map(task => (
                                        <div key={task.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm hover:shadow-xl hover:translate-y-[-4px] transition-all group cursor-pointer border-l-4 border-l-blue-500 relative">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex flex-wrap gap-1.5">
                                                    <span className={cn(
                                                        "px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest",
                                                        task.type === 'TASK' ? "bg-blue-600 text-white" : "bg-rose-600 text-white"
                                                    )}>
                                                        {task.type}
                                                    </span>
                                                    {task.labels.map(l => (
                                                        <span key={l} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded text-[9px] font-black uppercase tracking-widest border border-slate-200/50 dark:border-slate-700/50">{l}</span>
                                                    ))}
                                                </div>
                                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="p-1 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md"><Edit size={12} className="text-slate-400" /></button>
                                                </div>
                                            </div>
                                            <h4 className="text-[13px] font-bold text-slate-900 dark:text-white mb-4 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors tracking-tight">{task.title}</h4>

                                            <div className="flex flex-col gap-1.5 mb-5 bg-slate-50 dark:bg-slate-950/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-1 h-1 rounded-full bg-blue-500" />
                                                    <p className="text-[10px] font-bold text-slate-600 dark:text-slate-300 truncate">{task.projectName}</p>
                                                </div>
                                                <p className="text-[9px] font-bold text-slate-400 truncate pl-3 opacity-60">{task.accountName}</p>
                                            </div>

                                            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                                                        <Calendar size={12} className="text-blue-500" /> {task.dueDate}
                                                    </div>
                                                    {(task.messages || task.attachments) && (
                                                        <div className="flex items-center gap-3">
                                                            {task.messages && <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400"><MessageSquare size={12} /> {task.messages}</div>}
                                                            {task.attachments && <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400"><Paperclip size={12} /> {task.attachments}</div>}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex -space-x-2">
                                                    {task.secondaryInitials?.map((init, idx) => (
                                                        <div key={idx} className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[9px] font-black text-slate-500 ring-2 ring-transparent group-hover:ring-blue-500/10 transition-all">{init}</div>
                                                    ))}
                                                    <div className="w-7 h-7 rounded-full bg-blue-600 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[9px] font-black text-white shadow-md">{task.initials}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {/* Placeholder card */}
                                    <button className="bg-white/30 dark:bg-slate-900/10 border border-dashed border-slate-200 dark:border-slate-800/50 p-6 rounded-xl flex flex-col items-center justify-center gap-2 group transition-all hover:bg-white dark:hover:bg-slate-900 hover:border-blue-500/50">
                                        <Plus size={20} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 group-hover:text-blue-500">Add Task</span>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    const renderAccountAnalytics = () => {
        const renderFunnelMetricColumn = (label: string, value: number, prevValue: number, isPercent = false, color?: string, secondaryValue?: number, secondaryPrevValue?: number) => {
            const change = prevValue === 0 ? 0 : ((value - prevValue) / prevValue) * 100;
            return (
                <div className="flex flex-col gap-1 p-5 border-r border-slate-100 dark:border-slate-800/60 last:border-r-0 h-full relative group hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 tracking-tight">{label}</span>
                        <Info size={11} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="flex items-baseline gap-2">
                        <div className="flex items-center gap-2.5">
                            {color && <div className="w-1 h-4 rounded-full" style={{ backgroundColor: color }} />}
                            <span className="text-2xl font-black text-slate-900 dark:text-white tabular-nums tracking-tighter">
                                {isPercent ? value.toFixed(2) + '%' : value.toLocaleString()}
                            </span>
                        </div>
                        <div className={cn(
                            "flex items-center text-[10px] font-bold gap-1",
                            change >= 0 ? "text-emerald-500" : "text-rose-500"
                        )}>
                            {change >= 0 ? <ArrowUpRight size={11} strokeWidth={3} /> : <ArrowDownRight size={11} strokeWidth={3} />}
                            {Math.abs(change).toFixed(1)}%
                        </div>
                    </div>
                    {secondaryValue !== undefined && (
                        <div className="flex items-baseline gap-1 mt-0.5">
                            <span className="text-sm font-bold text-slate-500 dark:text-slate-400 tabular-nums">/ {secondaryValue.toLocaleString()}</span>
                            <span className="text-[10px] text-slate-400 font-medium">units</span>
                        </div>
                    )}
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 mt-2">
                         <span className="opacity-60">Prev:</span>
                         <span className="tabular-nums">{isPercent ? prevValue.toFixed(2) + '%' : prevValue.toLocaleString()}</span>
                         {secondaryPrevValue !== undefined && (
                             <span className="tabular-nums">/ {secondaryPrevValue.toLocaleString()}</span>
                         )}
                    </div>
                </div>
            );
        };

        const renderNestedFunnelMetric = (label: string, value: number, prevValue: number, isPercent = false) => {
            const change = prevValue === 0 ? 0 : ((value - prevValue) / prevValue) * 100;
            return (
                <div className="flex flex-col gap-1 group">
                    <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 tracking-tight">{label}</span>
                        <Info size={10} className="text-slate-300" />
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-lg font-black text-slate-900 dark:text-white tabular-nums">
                            {isPercent ? value.toFixed(2) + '%' : value.toLocaleString()}
                        </span>
                        <div className={cn(
                            "flex items-center text-[10px] font-bold gap-1",
                            change >= 0 ? "text-emerald-500" : "text-rose-500"
                        )}>
                            {change >= 0 ? <ArrowUpRight size={10} strokeWidth={3} /> : <ArrowDownRight size={10} strokeWidth={3} />}
                            {Math.abs(change).toFixed(1)}%
                        </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                         <span className="opacity-60">Prev:</span>
                         <span className="tabular-nums">{isPercent ? prevValue.toFixed(2) + '%' : prevValue.toLocaleString()}</span>
                    </div>
                </div>
            );
        };

        return (
            <div className="flex flex-col gap-6 animate-in fade-in duration-700">
                {/* Analytics Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-1">
                    <div className="flex items-center gap-2.5">
                        <div className="w-1 h-5 bg-emerald-500 rounded-full" />
                        <div className="flex flex-col gap-0.5">
                            <h3 className="text-base font-bold text-slate-800 dark:text-white tracking-tight">General Overview</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400">You can overview your account here</p>
                        </div>
                    </div>
                    {selectedAccount && (
                        <button
                            onClick={() => setCurrentPage('account-detail')}
                            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-900 transition-all shadow-sm active:scale-95 group"
                        >
                            <span>Go to Account Details</span>
                            <ArrowUpRight size={14} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    {/* Main Profit Donut Card */}
                    <div className="lg:col-span-1 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center relative min-h-[320px] shadow-sm">

                        <div className="relative w-48 h-48 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90 overflow-visible group/donut">
                                {/* Outer Ring: Total Sales */}
                                <circle 
                                    cx="96" cy="96" r="88" fill="transparent" stroke="currentColor" strokeWidth="6" 
                                    className="text-[#24A799]/20" 
                                />
                                <circle 
                                    cx="96" cy="96" r="88" fill="transparent" stroke="#24A799" strokeWidth="6" 
                                    strokeDasharray="553" strokeDashoffset="0" strokeLinecap="round" 
                                    className="cursor-pointer transition-all duration-300 hover:stroke-[8px]"
                                    onMouseEnter={() => setHoveredDonutSegment({ label: 'Total Sales', value: '$27,684.65' })}
                                    onMouseLeave={() => setHoveredDonutSegment(null)}
                                />
                                
                                {/* Middle Ring: Total Expense + Net Profit */}
                                <circle cx="96" cy="96" r="78" fill="transparent" stroke="currentColor" strokeWidth="10" className="text-slate-100 dark:text-slate-800/40" />
                                {/* Expense Arc */}
                                <circle 
                                    cx="96" cy="96" r="78" fill="transparent" stroke="#248AC5" strokeWidth="10" 
                                    strokeDasharray="490" strokeDashoffset={490 * (1 - 0.867)} strokeLinecap="butt" 
                                    className="cursor-pointer transition-all duration-300 hover:opacity-80"
                                    onMouseEnter={() => setHoveredDonutSegment({ label: 'Total Expense', value: '$24,015.11' })}
                                    onMouseLeave={() => setHoveredDonutSegment(null)}
                                />
                                {/* Profit Arc */}
                                <circle 
                                    cx="96" cy="96" r="78" fill="transparent" stroke="#F08A50" strokeWidth="10" 
                                    strokeDasharray="490" strokeDashoffset={490 * (1 - 0.133)} transform="rotate(312.12 96 96)" strokeLinecap="butt" 
                                    className="cursor-pointer transition-all duration-300 hover:opacity-80"
                                    onMouseEnter={() => setHoveredDonutSegment({ label: 'Net Profit', value: '$3,669.54' })}
                                    onMouseLeave={() => setHoveredDonutSegment(null)}
                                />

                                {/* Inner Ring: Expense Breakdowns */}
                                {/* Ad Cost */}
                                <circle 
                                    cx="96" cy="96" r="66" fill="transparent" stroke="#5E8AB6" strokeWidth="10" 
                                    strokeDasharray="415" strokeDashoffset={415 * (1 - 0.346)} strokeLinecap="butt" 
                                    className="cursor-pointer transition-all duration-300 hover:opacity-80"
                                    onMouseEnter={() => setHoveredDonutSegment({ label: 'Advertising Cost', value: '$9,578.89' })}
                                    onMouseLeave={() => setHoveredDonutSegment(null)}
                                />
                                {/* Amazon Fees */}
                                <circle 
                                    cx="96" cy="96" r="66" fill="transparent" stroke="#328A50" strokeWidth="10" 
                                    strokeDasharray="415" strokeDashoffset={415 * (1 - 0.260)} transform="rotate(124.56 96 96)" strokeLinecap="butt" 
                                    className="cursor-pointer transition-all duration-300 hover:opacity-80"
                                    onMouseEnter={() => setHoveredDonutSegment({ label: 'Amazon Fees', value: '$7,194.88' })}
                                    onMouseLeave={() => setHoveredDonutSegment(null)}
                                />
                                {/* Refund */}
                                <circle 
                                    cx="96" cy="96" r="66" fill="transparent" stroke="#f43f5e" strokeWidth="10" 
                                    strokeDasharray="415" strokeDashoffset={415 * (1 - 0.130)} transform="rotate(218.16 96 96)" strokeLinecap="butt" 
                                    className="cursor-pointer transition-all duration-300 hover:opacity-80"
                                    onMouseEnter={() => setHoveredDonutSegment({ label: 'Refund', value: '$3,597.44' })}
                                    onMouseLeave={() => setHoveredDonutSegment(null)}
                                />
                                {/* Other */}
                                <circle 
                                    cx="96" cy="96" r="66" fill="transparent" stroke="#94a3b8" strokeWidth="10" 
                                    strokeDasharray="415" strokeDashoffset={415 * (1 - 0.131)} transform="rotate(264.96 96 96)" strokeLinecap="butt" 
                                    className="cursor-pointer transition-all duration-300 hover:opacity-80"
                                    onMouseEnter={() => setHoveredDonutSegment({ label: 'Other Expenses', value: '$3,643.90' })}
                                    onMouseLeave={() => setHoveredDonutSegment(null)}
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 pointer-events-none animate-in fade-in duration-300">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 transition-all">
                                    {hoveredDonutSegment ? hoveredDonutSegment.label : 'Total Sales'}
                                </span>
                                <span className="text-xl font-black text-slate-900 dark:text-white tabular-nums tracking-tighter transition-all">
                                    {hoveredDonutSegment ? hoveredDonutSegment.value : '$27,684.65'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Vertical Mini Dashboard Grid */}
                    <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Net Profit Detail */}
                        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col relative overflow-hidden">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-1 h-4 bg-[#F08A50] rounded-full" />
                                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200 tracking-tight">Net Profit</span>
                                    <Info size={12} className="text-slate-400" />
                                </div>
                                <button
                                    onClick={() => setShowProfitBreakdown(!showProfitBreakdown)}
                                    className="text-[10px] font-semibold text-slate-400 hover:text-blue-500 transition-colors"
                                >
                                    See Details
                                </button>
                            </div>
                            <div className="flex flex-col mb-2">
                                <div className="flex items-center gap-3">
                                    <span className="text-xl font-black text-slate-900 dark:text-white">-$3,669.54</span>
                                    <div className="flex items-center text-[10px] font-bold text-emerald-500">
                                        <ArrowUpRight size={11} strokeWidth={3} />
                                        694.4%
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400">
                                     <span className="opacity-60">Prev:</span>
                                     <span className="tabular-nums">-$4,131.45</span>
                                </div>
                            </div>
                            <div className="flex-1 mt-4 flex items-end gap-2 h-20">
                                <div className="flex-1 bg-[#F08A50]/40 rounded-t-lg border-x border-t border-[#F08A50]/10 min-h-[40%]" />
                                <div className="flex-1 bg-[#F08A50] rounded-t-lg min-h-[90%]" />
                            </div>
                            <div className="flex justify-between mt-2 text-[10px] font-medium text-slate-400 tracking-tight">
                                <span>Previous Period</span>
                                <span>Current Period</span>
                            </div>
                        </div>

                        {/* Total Sales */}
                        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-1 h-4 bg-[#24A799] rounded-full" />
                                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200 tracking-tight">Total Sales</span>
                                    <Info size={12} className="text-slate-400" />
                                </div>
                                <button 
                                    onClick={() => setShowSalesBreakdown(true)}
                                    className="text-[10px] font-semibold text-slate-400 hover:text-blue-500 transition-colors"
                                >
                                    See Details
                                </button>
                            </div>
                            <div className="flex flex-col mb-2">
                                <div className="flex items-center gap-3">
                                    <span className="text-xl font-black text-slate-900 dark:text-white">$27,684.65</span>
                                    <div className="flex items-center text-[10px] font-bold text-emerald-500">
                                        <ArrowUpRight size={11} strokeWidth={3} />
                                        8.6%
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400">
                                     <span className="opacity-60">Prev:</span>
                                     <span className="tabular-nums">$25,363.82</span>
                                </div>
                            </div>
                            <div className="flex-1 mt-4 flex items-end gap-2 h-20">
                                <div className="flex-1 bg-[#24A799]/40 rounded-t-lg min-h-[75%]" />
                                <div className="flex-1 bg-[#24A799] rounded-t-lg min-h-[85%]" />
                            </div>
                            <div className="flex justify-between mt-2 text-[10px] font-medium text-slate-400 tracking-tight">
                                <span>Previous Period</span>
                                <span>Current Period</span>
                            </div>
                        </div>

                        {/* Total Expense */}
                        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-1 h-4 bg-[#248AC5] rounded-full" />
                                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200 tracking-tight">Total Expense</span>
                                    <Info size={12} className="text-slate-400" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <button 
                                    onClick={() => setShowExpenseBreakdown(true)}
                                    className="text-[10px] font-semibold text-slate-400 hover:text-blue-500 transition-colors"
                                >
                                    See Details
                                </button>
                                </div>
                            </div>
                            <div className="flex flex-col mb-2">
                                <div className="flex items-center gap-3">
                                    <span className="text-xl font-black text-slate-900 dark:text-white">$24,015.11</span>
                                    <div className="flex items-center text-[10px] font-bold text-rose-500">
                                        <ArrowDownRight size={11} strokeWidth={3} />
                                        4.1%
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400">
                                     <span className="opacity-60">Prev:</span>
                                     <span className="tabular-nums">$25,042.08</span>
                                </div>
                            </div>
                            <div className="flex-1 mt-4 flex items-end gap-2 h-20">
                                <div className="flex-1 bg-[#248AC5]/40 rounded-t-lg min-h-[80%]" />
                                <div className="flex-1 bg-[#248AC5] rounded-t-lg min-h-[70%]" />
                            </div>
                            <div className="flex justify-between mt-2 text-[10px] font-medium text-slate-400 tracking-tight">
                                <span>Previous Period</span>
                                <span>Current Period</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Organic Sales */}
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col relative overflow-hidden">
                        <div className="flex items-center justify-between mb-3 z-20">
                            <div className="flex items-center gap-2">
                                <div className="w-1 h-4 bg-[#50C5F0] rounded-full" />
                                <span className="text-xs font-bold text-slate-700 dark:text-slate-200 tracking-tight">Organic Sales</span>
                            </div>
                            <Info size={12} className="text-slate-400" />
                        </div>
                        {userRole === 'amazon_missing_ad' && (
                            <div 
                                onClick={() => setIsAdConnectionWizardOpen(true)}
                                className="absolute inset-x-0 bottom-0 top-12 z-30 flex flex-col items-center justify-center bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm cursor-pointer hover:bg-white/50 dark:hover:bg-slate-900/50 transition-colors"
                            >
                                <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-lg border border-slate-200 dark:border-slate-700 mb-2">
                                    <Lock size={18} className="text-slate-400" />
                                </div>
                                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Connect Ad Account to View Data</span>
                            </div>
                        )}
                        <div className={cn("flex flex-col flex-1", userRole === 'amazon_missing_ad' && "opacity-20 blur-[3px] select-none pointer-events-none")}>
                            <div className="flex items-center gap-3 mb-1">
                                <span className="text-xl font-black text-slate-900 dark:text-white">$15,311.70</span>
                                <div className="flex items-center text-[10px] font-bold text-emerald-500">
                                    <ArrowUpRight size={10} strokeWidth={3} />
                                    12.8%
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400 mb-4">
                                 <span className="opacity-60">Prev:</span>
                                 <span className="tabular-nums">$13,572.21</span>
                            </div>
                            <div className="flex items-end gap-2 h-16">
                                <div className="flex-1 bg-[#50C5F0]/40 rounded-t-md min-h-[60%]" />
                                <div className="flex-1 bg-[#50C5F0] rounded-t-md min-h-[85%]" />
                            </div>
                            <div className="flex justify-between mt-2 text-[10px] font-medium text-slate-400 tracking-tight">
                                <span>Previous Period</span>
                                <span>Current Period</span>
                            </div>
                        </div>
                    </div>

                    {/* Advertising Sales */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col overflow-hidden group">
                        <div className="p-5 pb-0 relative z-20">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-1 h-4 bg-[#5E8AB6] rounded-full" />
                                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200 tracking-tight">Advertising Sales</span>
                                </div>
                                <Info size={12} className="text-slate-400" />
                            </div>
                        </div>
                        <div className="px-5 pb-5 flex flex-col flex-1 relative">
                            {userRole === 'amazon_missing_ad' && (
                                <div 
                                    onClick={() => setIsAdConnectionWizardOpen(true)}
                                    className="absolute inset-x-0 -top-3 bottom-0 z-10 bg-white/60 dark:bg-slate-900/60 backdrop-blur-[4px] flex flex-col items-center justify-center gap-2 transition-colors hover:bg-white/50 dark:hover:bg-slate-900/50 cursor-pointer"
                                >
                                    <Lock size={20} className="text-slate-500" />
                                    <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 text-center px-4 leading-tight">Connect Ad Account to View Data</span>
                                </div>
                            )}
                            <div className={cn("flex flex-col flex-1", userRole === 'amazon_missing_ad' && "opacity-20 blur-[3px] select-none pointer-events-none")}>
                                <div className="flex items-center gap-3 mb-1">
                                    <span className="text-xl font-black text-slate-900 dark:text-white">$12,372.95</span>
                                    <div className="flex items-center text-[10px] font-bold text-emerald-500">
                                        <ArrowUpRight size={10} strokeWidth={3} />
                                        3.7%
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400 mb-4">
                                     <span className="opacity-60">Prev:</span>
                                     <span className="tabular-nums">$11,931.78</span>
                                </div>
                                <div className="flex items-end gap-2 h-16">
                                    <div className="flex-1 bg-[#5E8AB6]/40 rounded-t-md min-h-[70%]" />
                                    <div className="flex-1 bg-[#5E8AB6] rounded-t-md min-h-[75%]" />
                                </div>
                                <div className="flex justify-between mt-2 text-[10px] font-medium text-slate-400 tracking-tight">
                                    <span>Previous Period</span>
                                    <span>Current Period</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col overflow-hidden group">
                        <div className="p-5 pb-0 relative z-20">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-1 h-4 bg-[#328A50] rounded-full" />
                                    <select 
                                        value={acosDisplayType}
                                        onChange={(e) => setAcosDisplayType(e.target.value as 'acos' | 'roas')}
                                        className="bg-transparent text-xs font-bold text-slate-700 dark:text-slate-200 tracking-tight outline-none cursor-pointer hover:text-blue-500 transition-colors"
                                    >
                                        <option value="acos">ACoS</option>
                                        <option value="roas">ROAS</option>
                                    </select>
                                </div>
                                <Info size={12} className="text-slate-400" />
                            </div>
                        </div>
                        <div className="px-5 pb-5 flex flex-col flex-1 relative">
                            {userRole === 'amazon_missing_ad' && (
                                <div 
                                    onClick={() => setIsAdConnectionWizardOpen(true)}
                                    className="absolute inset-x-0 -top-3 bottom-0 z-10 bg-white/60 dark:bg-slate-900/60 backdrop-blur-[4px] flex flex-col items-center justify-center gap-2 transition-colors hover:bg-white/50 dark:hover:bg-slate-900/50 cursor-pointer"
                                >
                                    <Lock size={20} className="text-slate-500" />
                                    <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 text-center px-4 leading-tight">Connect Ad Account to View Data</span>
                                </div>
                            )}
                            <div className={cn("flex flex-col flex-1", userRole === 'amazon_missing_ad' && "opacity-20 blur-[3px] select-none pointer-events-none")}>
                                <div className="flex items-center gap-3 mb-1">
                                    <span className="text-xl font-black text-slate-900 dark:text-white">
                                        {acosDisplayType === 'acos' ? '56.65%' : '1.77'}
                                    </span>
                                    <div className="flex items-center text-[10px] font-bold text-emerald-500">
                                        <ArrowDownRight size={10} strokeWidth={3} />
                                        {acosDisplayType === 'acos' ? '23.3%' : '30.8%'}
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400 mb-4">
                                     <span className="opacity-60">Prev:</span>
                                     <span className="tabular-nums">
                                        {acosDisplayType === 'acos' ? '73.87%' : '1.35'}
                                     </span>
                                </div>
                                <div className="flex items-end gap-2 h-16">
                                    <div className={cn(
                                        "flex-1 rounded-t-md transition-all duration-500",
                                        acosDisplayType === 'acos' ? "bg-[#328A50]/40 min-h-[90%]" : "bg-emerald-600/40 min-h-[70%]"
                                    )} />
                                    <div className={cn(
                                        "flex-1 rounded-t-md transition-all duration-500",
                                        acosDisplayType === 'acos' ? "bg-[#328A50] min-h-[70%]" : "bg-emerald-500 min-h-[90%]"
                                    )} />
                                </div>
                                <div className="flex justify-between mt-2 text-[10px] font-medium text-slate-400 tracking-tight">
                                    <span>Previous Period</span>
                                    <span>Current Period</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* TACoS */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col overflow-hidden group">
                        <div className="p-5 pb-0 relative z-20">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-1 h-4 bg-[#6EBFEC] rounded-full" />
                                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200 tracking-tight">TACoS</span>
                                </div>
                                <Info size={12} className="text-slate-400" />
                            </div>
                        </div>
                        <div className="px-5 pb-5 flex flex-col flex-1 relative">
                            {userRole === 'amazon_missing_ad' && (
                                <div 
                                    onClick={() => setIsAdConnectionWizardOpen(true)}
                                    className="absolute inset-x-0 -top-3 bottom-0 z-10 bg-white/60 dark:bg-slate-900/60 backdrop-blur-[4px] flex flex-col items-center justify-center gap-2 transition-colors hover:bg-white/50 dark:hover:bg-slate-900/50 cursor-pointer"
                                >
                                    <Lock size={20} className="text-slate-500" />
                                    <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 text-center px-4 leading-tight">Connect Ad Account to View Data</span>
                                </div>
                            )}
                            <div className={cn("flex flex-col flex-1", userRole === 'amazon_missing_ad' && "opacity-20 blur-[3px] select-none pointer-events-none")}>
                                <div className="flex items-center gap-3 mb-1">
                                    <span className="text-xl font-black text-slate-900 dark:text-white">25.32%</span>
                                    <div className="flex items-center text-[10px] font-bold text-emerald-500">
                                        <ArrowDownRight size={10} strokeWidth={3} />
                                        26.7%
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400 mb-4">
                                     <span className="opacity-60">Prev:</span>
                                     <span className="tabular-nums">34.56%</span>
                                </div>
                                <div className="flex items-end gap-2 h-16">
                                    <div className="flex-1 bg-[#6EBFEC]/40 rounded-t-md min-h-[85%]" />
                                    <div className="flex-1 bg-[#6EBFEC] rounded-t-md min-h-[60%]" />
                                </div>
                                <div className="flex justify-between mt-2 text-[10px] font-medium text-slate-400 tracking-tight">
                                    <span>Previous Period</span>
                                    <span>Current Period</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- FUNNEL SECTIONS --- */}
                <div className="flex flex-col gap-6">

                    {/* TOTAL SALES FUNNEL */}
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2.5 px-1">
                            <div className="w-1 h-5 bg-blue-500 rounded-full" />
                            <h3 className="text-base font-bold text-slate-800 dark:text-white tracking-tight">Total Sales Funnel</h3>
                        </div>
                        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                            <div className="flex">
                                {/* Left: 3 metric columns + funnel */}
                                <div className="flex-1 flex flex-col min-w-0 border-r border-slate-100 dark:border-slate-800">
                                    <div className="grid grid-cols-3 border-b border-slate-100 dark:border-slate-800">
                                        {renderFunnelMetricColumn("Page View", analyticsData.current.pageViews, analyticsData.previous.pageViews, false, "#B6508A")}
                                        {renderFunnelMetricColumn("Session", analyticsData.current.sessions, analyticsData.previous.sessions, false, "#6EBFEC")}
                                        {renderFunnelMetricColumn("Order", analyticsData.current.orders, analyticsData.previous.orders, false, "#5E8AB6")}
                                    </div>
                                    <div className="flex-1 bg-slate-50/30 dark:bg-slate-800/10">
                                        <div className="px-5 pt-4 pb-3">
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">Current Period</span>
                                            </div>
                                            <div className="h-8 w-full">
                                                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 300 100">
                                                    <polygon points="0,12 100,28 100,72 0,88" fill="#B6508A" className="opacity-90" />
                                                    <polygon points="100,28 200,42 200,58 100,72" fill="#6EBFEC" className="opacity-90" />
                                                    <polygon points="200,42 300,42 300,58 200,58" fill="#5E8AB6" className="opacity-90" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="px-5 pt-3 pb-4 border-t border-slate-100 dark:border-slate-800">
                                            <div className="flex items-center gap-2 mb-2.5">
                                                <span className="text-[10px] font-semibold text-slate-400">Previous Period</span>
                                            </div>
                                            <div className="h-5 w-full opacity-30">
                                                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 300 100">
                                                    <polygon points="0,22 100,35 100,65 0,78" fill="#854d0e" />
                                                    <polygon points="100,35 200,44 200,56 100,65" fill="#9d174d" />
                                                    <polygon points="200,44 300,44 300,56 200,56" fill="#9a3412" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Right: stacked secondary metrics */}
                                <div className="w-44 flex flex-col divide-y divide-slate-100 dark:divide-slate-800">
                                    <div className="p-5 flex flex-col gap-1 flex-1">
                                        <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-0.5">Unit</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xl font-black text-slate-900 dark:text-white tabular-nums">{analyticsData.current.units.toLocaleString()}</span>
                                            {(() => { const ch = analyticsData.previous.units === 0 ? 0 : ((analyticsData.current.units - analyticsData.previous.units) / analyticsData.previous.units) * 100; return (<div className={cn("flex items-center text-[10px] font-bold gap-1", ch >= 0 ? "text-emerald-500" : "text-rose-500")}>{ch >= 0 ? <ArrowUpRight size={10} strokeWidth={3} /> : <ArrowDownRight size={10} strokeWidth={3} />}{Math.abs(ch).toFixed(1)}%</div>); })()}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400 mt-0.5">
                                            <span className="opacity-60">Prev:</span>
                                            <span className="tabular-nums">{analyticsData.previous.units.toLocaleString()}</span>
                                        </div>
                                    </div>
                                    <div className="p-5 flex flex-col gap-1 flex-1">
                                        <div className="flex items-center gap-1.5 mb-0.5">
                                            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Unit Session %</span>
                                            <Info size={10} className="text-slate-300" />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xl font-black text-slate-900 dark:text-white tabular-nums">{analyticsData.current.unitSessionPercent.toFixed(2)}%</span>
                                            {(() => { const ch = analyticsData.previous.unitSessionPercent === 0 ? 0 : ((analyticsData.current.unitSessionPercent - analyticsData.previous.unitSessionPercent) / analyticsData.previous.unitSessionPercent) * 100; return (<div className={cn("flex items-center text-[10px] font-bold gap-1", ch >= 0 ? "text-emerald-500" : "text-rose-500")}>{ch >= 0 ? <ArrowUpRight size={10} strokeWidth={3} /> : <ArrowDownRight size={10} strokeWidth={3} />}{Math.abs(ch).toFixed(1)}%</div>); })()}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400 mt-0.5">
                                            <span className="opacity-60">Prev:</span>
                                            <span className="tabular-nums">{analyticsData.previous.unitSessionPercent.toFixed(2)}%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ADVERTISING FUNNEL */}
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2.5 px-1">
                            <div className="w-1 h-5 bg-cyan-500 rounded-full" />
                            <h3 className="text-base font-bold text-slate-800 dark:text-white tracking-tight">Advertising Funnel</h3>
                        </div>
                        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden relative group">
                            {userRole === 'amazon_missing_ad' && (
                                <div 
                                    onClick={() => setIsAdConnectionWizardOpen(true)}
                                    className="absolute inset-0 z-10 bg-white/60 dark:bg-slate-900/60 backdrop-blur-[4px] flex flex-col items-center justify-center gap-2 transition-colors hover:bg-white/50 dark:hover:bg-slate-900/50 cursor-pointer"
                                >
                                    <Lock size={20} className="text-slate-500" />
                                    <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 text-center px-4 leading-tight">Connect Ad Account to View Data</span>
                                </div>
                            )}
                            <div className={cn("flex", userRole === 'amazon_missing_ad' && "opacity-20 blur-sm select-none pointer-events-none")}>
                                {/* Left: 3 metric columns + funnel */}
                                <div className="flex-1 flex flex-col min-w-0 border-r border-slate-100 dark:border-slate-800">
                                    <div className="grid grid-cols-3 border-b border-slate-100 dark:border-slate-800">
                                        {renderFunnelMetricColumn("Ad Impressions", analyticsData.current.adImpressions, analyticsData.previous.adImpressions, false, "#F08A50")}
                                        {renderFunnelMetricColumn("Clicks", analyticsData.current.clicks, analyticsData.previous.clicks, false, "#24A799")}
                                        {renderFunnelMetricColumn("Ad Orders", analyticsData.current.adOrders, analyticsData.previous.adOrders, false, "#5E8AB6")}
                                    </div>
                                    <div className="flex-1 bg-slate-50/30 dark:bg-slate-800/10">
                                        <div className="px-5 pt-4 pb-3">
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">Current Period</span>
                                            </div>
                                            <div className="h-8 w-full">
                                                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 300 100">
                                                    <polygon points="0,12 100,28 100,72 0,88" fill="#F08A50" className="opacity-90" />
                                                    <polygon points="100,28 200,42 200,58 100,72" fill="#24A799" className="opacity-90" />
                                                    <polygon points="200,42 300,42 300,58 200,58" fill="#5E8AB6" className="opacity-90" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="px-5 pt-3 pb-4 border-t border-slate-100 dark:border-slate-800">
                                            <div className="flex items-center gap-2 mb-2.5">
                                                <span className="text-[10px] font-semibold text-slate-400">Previous Period</span>
                                            </div>
                                            <div className="h-5 w-full opacity-30">
                                                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 300 100">
                                                    <polygon points="0,22 100,35 100,65 0,78" fill="#451a03" />
                                                    <polygon points="100,35 200,44 200,56 100,65" fill="#831843" />
                                                    <polygon points="200,44 300,44 300,56 200,56" fill="#164e63" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Right: Ad Unit + CTR + CVR */}
                                <div className="w-44 flex flex-col divide-y divide-slate-100 dark:divide-slate-800">
                                    <div className="p-5 flex flex-col gap-1 flex-1">
                                        <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-0.5">Ad Unit</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xl font-black text-slate-900 dark:text-white tabular-nums">{analyticsData.current.adUnits.toLocaleString()}</span>
                                            {(() => { const ch = analyticsData.previous.adUnits === 0 ? 0 : ((analyticsData.current.adUnits - analyticsData.previous.adUnits) / analyticsData.previous.adUnits) * 100; return (<div className={cn("flex items-center text-[10px] font-bold gap-1", ch >= 0 ? "text-emerald-500" : "text-rose-500")}>{ch >= 0 ? <ArrowUpRight size={10} strokeWidth={3} /> : <ArrowDownRight size={10} strokeWidth={3} />}{Math.abs(ch).toFixed(1)}%</div>); })()}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400 mt-0.5">
                                            <span className="opacity-60">Prev:</span>
                                            <span className="tabular-nums">{analyticsData.previous.adUnits.toLocaleString()}</span>
                                        </div>
                                    </div>
                                    <div className="p-5 flex flex-col gap-1 flex-1">
                                        <div className="flex items-center gap-1.5 mb-0.5">
                                            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">CTR</span>
                                            <Info size={10} className="text-slate-300" />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xl font-black text-slate-900 dark:text-white tabular-nums">{analyticsData.current.ctr.toFixed(2)}%</span>
                                            {(() => { const ch = analyticsData.previous.ctr === 0 ? 0 : ((analyticsData.current.ctr - analyticsData.previous.ctr) / analyticsData.previous.ctr) * 100; return (<div className={cn("flex items-center text-[10px] font-bold gap-1", ch >= 0 ? "text-emerald-500" : "text-rose-500")}>{ch >= 0 ? <ArrowUpRight size={10} strokeWidth={3} /> : <ArrowDownRight size={10} strokeWidth={3} />}{Math.abs(ch).toFixed(1)}%</div>); })()}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400 mt-0.5">
                                            <span className="opacity-60">Prev:</span>
                                            <span className="tabular-nums">{analyticsData.previous.ctr.toFixed(2)}%</span>
                                        </div>
                                    </div>
                                    <div className="p-5 flex flex-col gap-1 flex-1">
                                        <div className="flex items-center gap-1.5 mb-0.5">
                                            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">CVR</span>
                                            <Info size={10} className="text-slate-300" />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xl font-black text-slate-900 dark:text-white tabular-nums">{analyticsData.current.cvr.toFixed(2)}%</span>
                                            {(() => { const ch = analyticsData.previous.cvr === 0 ? 0 : ((analyticsData.current.cvr - analyticsData.previous.cvr) / analyticsData.previous.cvr) * 100; return (<div className={cn("flex items-center text-[10px] font-bold gap-1", ch >= 0 ? "text-emerald-500" : "text-rose-500")}>{ch >= 0 ? <ArrowUpRight size={10} strokeWidth={3} /> : <ArrowDownRight size={10} strokeWidth={3} />}{Math.abs(ch).toFixed(1)}%</div>); })()}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400 mt-0.5">
                                            <span className="opacity-60">Prev:</span>
                                            <span className="tabular-nums">{analyticsData.previous.cvr.toFixed(2)}%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    };


    const renderPlaceholder = (message: string, Icon: any) => (
        <div className="flex items-center justify-center min-h-[500px] border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900/50 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-900/5 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="text-center space-y-6 max-w-sm px-6 relative z-10 transition-all duration-500 group-hover:scale-105">
                <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-500 shadow-sm border border-blue-100 dark:border-blue-800/50">
                    <Icon size={32} />
                </div>
                <p className="text-lg font-bold text-slate-900 dark:text-white tracking-tight leading-snug">
                    {message}
                </p>
                <div className="flex items-center justify-center gap-2 py-1 px-3 bg-slate-100 dark:bg-slate-800 rounded-full w-fit mx-auto border border-slate-200 dark:border-slate-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    <span className="text-[10px] font-black text-slate-500 dark:text-slate-400">Section Active</span>
                </div>
            </div>
        </div>
    );


    const renderProductAnalytics = () => {
        const getTagClasses = (tagText: string, isPartial: boolean, forceShopify: boolean) => {
            const isShopify = forceShopify || (isShopifySelected && !isAmazonSelected);
            const baseClasses = "px-2.5 py-0.5 rounded-full text-[10.5px] font-bold capitalize whitespace-nowrap leading-tight flex items-center shadow-[0_1px_1.5px_rgba(0,0,0,0.05)]";

            if (isShopify) {
                if (isPartial && isUnified) {
                    return cn(baseClasses, "border-[1.5px] border-dashed border-slate-500 text-slate-500 dark:text-slate-400 bg-transparent shadow-none");
                }
                return cn(baseClasses, "bg-slate-500 border border-slate-500 dark:border-slate-600 dark:bg-slate-600 text-white");
            }

            const text = tagText.toLowerCase();
            let theme = 'blue';
            if (text.includes('best seller')) theme = 'red';
            else if (text.includes('multi-pack')) theme = 'purple';
            else if (text.includes('discounted')) theme = 'emerald';
            else if (text.includes('new arrival')) theme = 'blue';
            else if (text.includes('organic')) theme = 'pink';
            else if (text.includes('premium')) theme = 'indigo';
            else if (text.includes('flash sale')) theme = 'orange';
            else if (text.includes('new color')) theme = 'cyan';

            const solidClasses: Record<string, string> = {
                red: "bg-red-500 border-red-500 text-white",
                purple: "bg-purple-500 border-purple-500 text-white",
                emerald: "bg-[#10b981] border-[#10b981] text-white", // specific emerald for discounted as shown in image
                blue: "bg-blue-500 border-blue-500 text-white",
                pink: "bg-pink-500 border-pink-500 text-white",
                indigo: "bg-indigo-500 border-indigo-500 text-white",
                orange: "bg-orange-500 border-orange-500 text-white",
                cyan: "bg-cyan-500 border-cyan-500 text-white"
            };

            const partialClasses: Record<string, string> = {
                red: "border-dashed border-[1.5px] border-red-500 text-red-500 dark:text-red-400 bg-transparent shadow-none",
                purple: "border-dashed border-[1.5px] border-purple-500 text-purple-500 dark:text-purple-400 bg-transparent shadow-none",
                emerald: "border-dashed border-[1.5px] border-[#10b981] text-[#10b981] dark:text-[#10b981] bg-transparent shadow-none",
                blue: "border-dashed border-[1.5px] border-blue-500 text-blue-500 dark:text-blue-400 bg-transparent shadow-none",
                pink: "border-dashed border-[1.5px] border-pink-500 text-pink-500 dark:text-pink-400 bg-transparent shadow-none",
                indigo: "border-dashed border-[1.5px] border-indigo-500 text-indigo-500 dark:text-indigo-400 bg-transparent shadow-none",
                orange: "border-dashed border-[1.5px] border-orange-500 text-orange-500 dark:text-orange-400 bg-transparent shadow-none",
                cyan: "border-dashed border-[1.5px] border-cyan-500 text-cyan-500 dark:text-cyan-400 bg-transparent shadow-none"
            };

            const colorClass = isPartial && isUnified ? partialClasses[theme] : solidClasses[theme];
            return cn(baseClasses, !isPartial && "border", colorClass);
        };

        const handleSort = (field: keyof ProductAnalytic) => {
            if (analyticsSortField === field) {
                setAnalyticsSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
            } else {
                setAnalyticsSortField(field);
                setAnalyticsSortDirection('desc');
            }
        };

        const toggleProductExpanded = (title: string) => {
            setExpandedAnalyticsProducts(prev =>
                prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
            );
        };

        return (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden animate-in fade-in duration-700">
                <div className="overflow-x-auto overflow-y-visible">
                    <table className="w-full text-sm border-separate border-spacing-0">
                        <thead className="bg-slate-50 dark:bg-slate-900/50 sticky top-0 z-10">
                            <tr className="bg-slate-50/50 dark:bg-slate-800/20 border-b border-slate-100 dark:border-slate-800">
                                {visibleAnalyticsCols.map(col => (
                                    <th
                                        key={col.id}
                                        className={cn(
                                            "p-4 text-[11px] font-black text-slate-400 whitespace-nowrap group/header",
                                            col.align === 'right' ? "text-right" : "text-left",
                                            col.id === 'product' ? "sticky left-0 bg-slate-50 dark:bg-slate-900 shadow-[1px_0_0_0_rgb(226,232,240)] dark:shadow-[1px_0_0_0_rgb(30,41,59)] z-[2]" : "",
                                            col.id !== 'image' && col.id !== 'product' && col.id !== 'tags' && "cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/40 transition-colors"
                                        )}
                                        style={{ minWidth: col.width, width: col.width }}
                                        onClick={() => {
                                            if (col.id !== 'image' && col.id !== 'product' && col.id !== 'tags') {
                                                handleSort(col.id as keyof ProductAnalytic);
                                            }
                                        }}
                                    >
                                        <div className={cn(
                                            "flex items-center gap-1.5",
                                            col.align === 'right' ? "justify-end" : "justify-start"
                                        )}>
                                            {col.label}
                                            {col.id !== 'image' && col.id !== 'product' && col.id !== 'tags' && (
                                                <div className="flex flex-col">
                                                    {analyticsSortField === col.id ? (
                                                        analyticsSortDirection === 'asc' ? <ArrowUp size={10} className="text-blue-500" /> : <ArrowDown size={10} className="text-blue-500" />
                                                    ) : (
                                                        <ArrowUpDown size={10} className="opacity-0 group-hover/header:opacity-50 transition-opacity" />
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {processedAnalyticsData.map((prod: any) => {
                                const isExpanded = expandedAnalyticsProducts.includes(prod.title);
                                return (
                                    <React.Fragment key={prod.id}>
                                        <tr className={cn(
                                            "hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors group/row",
                                            isExpanded && "bg-slate-50/50 dark:bg-slate-800/30"
                                        )}>
                                            {visibleAnalyticsCols.map((col) => (
                                                <td
                                                    key={col.id}
                                                    className={cn(
                                                        "px-4 py-3 border-b border-slate-100 dark:border-slate-800 whitespace-nowrap",
                                                        col.id === 'product' ? "sticky left-0 bg-white dark:bg-slate-900 group-hover/row:bg-slate-50 dark:group-hover/row:bg-slate-800/50 transition-colors shadow-[1px_0_0_0_rgb(226,232,240)] dark:shadow-[1px_0_0_0_rgb(30,41,59)] z-[1]" : "",
                                                        col.align === 'right' ? "text-right tabular-nums text-slate-700 dark:text-slate-300" : "text-left"
                                                    )}
                                                >
                                                    {col.id === 'image' && (
                                                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 p-0.5">
                                                            <img src={prod.image} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                                                        </div>
                                                    )}
                                                    {col.id === 'evaProductId' && (
                                                        <span className="font-mono text-[10px] tracking-tighter opacity-70">{prod.evaProductId}</span>
                                                    )}
                                                    {col.id === 'product' && (
                                                        <div className="flex flex-col gap-0.5 min-w-[300px]">
                                                            <span className="font-bold text-slate-900 dark:text-white text-[13px] leading-tight mb-0.5">{prod.title}</span>
                                                            {!isUnified ? (
                                                                <>
                                                                    {analyticsGroupBy === 'Variant' ? (
                                                                        <div className="flex flex-col gap-0">
                                                                            <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                                                                                <span className="opacity-70">Variant:</span>
                                                                                <span className="font-medium">{prod.variantName}</span>
                                                                            </div>
                                                                            <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                                                                                <span className="opacity-70">Variant ID:</span>
                                                                                <span className="font-medium font-mono">{prod.variantId}</span>
                                                                            </div>
                                                                            <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                                                                                <span className="opacity-70">SKU:</span>
                                                                                <span className="font-medium font-mono tracking-tighter uppercase">{prod.skuAsin}</span>
                                                                            </div>
                                                                        </div>
                                                                    ) : (
                                                                        <button
                                                                            onClick={() => toggleProductExpanded(prod.title)}
                                                                            className="text-blue-600 dark:text-blue-400 text-[11px] font-bold hover:underline w-fit mt-1 flex items-center gap-1"
                                                                        >
                                                                            {isExpanded ? 'Hide variants' : 'View variants'}
                                                                            <ChevronDown size={12} className={cn("transition-transform", isExpanded && "rotate-180")} />
                                                                        </button>
                                                                    )}
                                                                </>
                                                            ) : (
                                                                <button
                                                                    onClick={() => toggleProductExpanded(prod.title)}
                                                                    className="text-blue-600 dark:text-blue-400 text-[11px] font-bold hover:underline w-fit mt-1 flex items-center gap-1"
                                                                >
                                                                    {isExpanded ? 'Hide ASINs/Variants' : 'View ASINs/Variants'}
                                                                    <ChevronDown size={12} className={cn("transition-transform", isExpanded && "rotate-180")} />
                                                                </button>
                                                            )}
                                                        </div>
                                                    )}
                                                    {col.id === 'tags' && (
                                                        <div className="flex flex-wrap gap-1.5">
                                                            {(prod.enrichedTags || (prod.tags || []).map((t: string) => ({ text: t, isPartial: false, isShopifyTag: false }))).map((tag: any) => (
                                                                <span key={tag.text} className={getTagClasses(tag.text, tag.isPartial, tag.isShopifyTag)}>
                                                                    {tag.text}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}
                                                    {col.id === 'vendor' && prod.vendor}
                                                    {col.id === 'productType' && prod.productType}
                                                    {['price', 'totalSales', 'totalDiscount', 'totalTax', 'totalDuty', 'netSales', 'cog', 'cogs', 'totalFee', 'totalExpenses', 'refundAmount', 'profit', 'aov'].includes(col.id) && (
                                                        formatCurrency((prod as any)[col.id])
                                                    )}
                                                    {['totalSoldQty', 'totalOrderCount', 'totalRefundQty', 'sessions', 'availableQty'].includes(col.id) && (
                                                        (prod as any)[col.id].toLocaleString()
                                                    )}
                                                    {col.id === 'margin' && `${prod.margin}%`}
                                                    {col.id === 'roi' && `${prod.roi}%`}
                                                    {col.id === 'refundPercent' && `${prod.refundPercent}%`}
                                                    {col.id === 'sessionPercent' && `${prod.sessionPercent}%`}
                                                </td>
                                            ))}
                                        </tr>
                                        {prod.isParent && isExpanded && prod.variants.map((variant: any) => (
                                            <tr key={variant.id} className="bg-slate-50/40 dark:bg-slate-900/40 border-l-2 border-l-blue-500 text-slate-500 dark:text-slate-400 text-[12px]">
                                                {visibleAnalyticsCols.map((col) => (
                                                    <td
                                                        key={col.id}
                                                        className={cn(
                                                            "px-4 py-2.5 border-b border-slate-100 dark:border-slate-800 whitespace-nowrap",
                                                            col.id === 'product' ? "sticky left-0 bg-slate-50 dark:bg-slate-900/90 z-[1] shadow-[1px_0_0_0_rgb(226,232,240)] dark:shadow-[1px_0_0_0_rgb(30,41,59)]" : "",
                                                            col.align === 'right' ? "text-right tabular-nums" : "text-left"
                                                        )}
                                                    >
                                                        {col.id === 'product' && (
                                                            <div className="flex flex-col gap-0.5 ml-2">
                                                                <div className="flex items-center gap-1.5">
                                                                    {isUnified && variant.platform && (
                                                                        <span className="flex-shrink-0 flex items-center justify-center p-0.5 rounded bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 transition-colors" title={variant.platform}>
                                                                            {variant.platform === 'Amazon' ? <AmazonIcon className="w-3 h-3" /> : <ShopifyIcon className="w-3 h-3" />}
                                                                        </span>
                                                                    )}
                                                                    <span className="opacity-70 italic text-[11px] font-medium">{isUnified ? (variant.platform === 'Amazon' ? 'ASIN:' : 'Variant:') : 'Variant:'}</span>
                                                                    <span className="font-bold text-slate-700 dark:text-slate-300 text-[12px]">
                                                                        {isUnified && variant.platform === 'Amazon' ? variant.skuAsin : (variant.variantName || variant.skuAsin)}
                                                                    </span>
                                                                </div>
                                                                <div className={cn("flex items-center gap-1 opacity-60 text-[10px]", isUnified && variant.platform ? "ml-[22px]" : "")}>
                                                                    <span>SKU:</span>
                                                                    <span className="font-mono tracking-tighter uppercase">{variant.skuAsin}</span>
                                                                </div>
                                                            </div>
                                                        )}
                                                        {col.id === 'image' && null}
                                                        {col.id === 'evaProductId' && (
                                                            <span className="font-mono text-[10px] tracking-tighter opacity-70">{variant.evaProductId}</span>
                                                        )}
                                                        {col.id === 'tags' && (
                                                            <div className="flex flex-wrap gap-1.5">
                                                                {(!isUnified ? (prod.enrichedTags || []).map((t: any) => t.text) : (variant.tags || [])).map((tag: string) => {
                                                                    const isShopifyTag = variant.platform === 'Shopify';
                                                                    return (
                                                                        <span key={tag} className={getTagClasses(tag, false, isShopifyTag)}>
                                                                            {tag}
                                                                        </span>
                                                                    );
                                                                })}
                                                            </div>
                                                        )}
                                                        {!['product', 'image', 'tags', 'evaProductId'].includes(col.id) && (
                                                            ['price', 'totalSales', 'totalDiscount', 'totalTax', 'totalDuty', 'netSales', 'cog', 'cogs', 'totalFee', 'totalExpenses', 'refundAmount', 'profit', 'aov'].includes(col.id) ? formatCurrency((variant as any)[col.id]) :
                                                                ['totalSoldQty', 'totalOrderCount', 'totalRefundQty', 'sessions', 'availableQty'].includes(col.id) ? (variant as any)[col.id].toLocaleString() :
                                                                    col.id === 'margin' ? `${variant.margin}%` :
                                                                        col.id === 'roi' ? `${variant.roi}%` :
                                                                            (variant as any)[col.id]
                                                        )}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </React.Fragment>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    const renderTrendsOverview = () => {
        const metrics = [
            { label: 'Sales', value: '$910,837.30', prev: '$1,487,286.91', change: '↓ 38.8%', type: 'negative', color: '#24A799' },
            { label: 'Profit', value: '$676,932.42', prev: '$1,076,172.00', change: '↓ 37.1%', type: 'negative', color: '#F08A50' },
            { label: 'Order Count', value: '15,034', prev: '20,604', change: '↓ 27.0%', type: 'negative', color: '#5E8AB6' },
            { label: 'Ad Sales', value: '$0.00', prev: '$0.00', change: '→ 0.0%', type: 'neutral', color: '#5E8AB6' },
            { label: 'Ad AOV', value: '$0.00', prev: '$0.00', change: '→ 0.0%', type: 'neutral', color: '#D35032' },
            { label: 'Organic Sales', value: '$910,837.30', prev: '$1,487,286.91', change: '↓ 38.8%', type: 'negative', color: '#50C5F0' },
            { label: 'CPC', value: '$0.00', prev: '$0.00', change: '→ 0.0%', type: 'neutral', color: '#DB7524' },
        ];

        return (
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-top-4 duration-1000 w-full mb-6">
                {/* Trends Container */}
                <div className="rounded-xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-950 p-4 lg:p-6" data-testid="trends-section">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6" data-testid="trends-header">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Trends Overview</h2>
                        <div className="flex items-center gap-2">
                            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 h-9 w-9 cursor-pointer text-slate-700 dark:text-slate-300">
                                <Copy size={16} />
                            </button>
                        </div>
                    </div>

                    <div className="mb-6 w-full">
                        <div className="flex flex-wrap gap-2 w-full">
                            {metrics.filter(m => visibleTrendMetrics.includes(m.label)).map((m) => {
                                const active = selectedTrendMetrics.includes(m.label);
                                const isAdRelated = ['Ad Sales', 'Ad AOV', 'Organic Sales', 'CPC'].includes(m.label);
                                const isLocked = userRole === 'amazon_missing_ad' && isAdRelated;

                                return (
                                    <div
                                        key={m.label}
                                        onClick={() => !isLocked && setSelectedTrendMetrics(prev => prev.includes(m.label) ? prev.filter(x => x !== m.label) : [...prev, m.label])}
                                        className={cn(
                                            "flex-1 min-w-[160px]",
                                            isLocked && "pointer-events-none"
                                        )}
                                    >
                                        <div className={cn(
                                            "relative overflow-hidden rounded-xl border transition-[border-color,background-color,box-shadow,transform,opacity] duration-200 p-3 h-full flex flex-col justify-between gap-2",
                                            active && !isLocked ? "border-blue-400/95 bg-blue-100/62 dark:border-blue-700/85 dark:bg-blue-950/28 hover:border-blue-500/95 dark:hover:border-blue-600/90 cursor-pointer" : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 opacity-80 hover:opacity-100 cursor-pointer",
                                            isLocked && "cursor-default hover:border-slate-200 dark:hover:border-slate-800"
                                        )}>
                                            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px]" style={{ backgroundColor: m.color }}></div>
                                            
                                            <div className="flex items-center justify-between pl-6 pr-10 relative z-20">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="text-[12px] text-slate-500 dark:text-slate-400 font-medium">{m.label}</span>
                                                    <button type="button" className="text-slate-400 dark:text-slate-500 transition hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer pointer-events-auto">
                                                        <Info size={14} />
                                                    </button>
                                                </div>
                                            </div>

                                            {isLocked && (
                                                <div 
                                                    onClick={() => setIsAdConnectionWizardOpen(true)}
                                                    className="absolute inset-x-0 top-8 bottom-0 z-10 bg-white/60 dark:bg-slate-900/60 backdrop-blur-[2px] flex flex-col items-center justify-center gap-1 hover:bg-white/50 dark:hover:bg-slate-900/50 transition-colors cursor-pointer group/lock"
                                                >
                                                    <Lock size={16} className="text-slate-400 group-hover/lock:scale-110 transition-transform" />
                                                </div>
                                            )}

                                            <div className={cn("flex flex-col flex-1", isLocked && "opacity-20 blur-sm select-none")}>
                                                <div className="absolute top-2 left-2">
                                                    <button
                                                        type="button"
                                                        role="checkbox"
                                                        aria-checked={active}
                                                        className={cn(
                                                            "grid place-content-center peer shrink-0 rounded-sm border shadow-xs h-4 w-4 pointer-events-none transition-colors",
                                                            active ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-800 text-transparent"
                                                        )}
                                                    >
                                                        <Check size={12} strokeWidth={3} />
                                                    </button>
                                                </div>

                                                <div className="absolute top-2 right-2 flex items-end gap-1">
                                                    <div className={cn("h-3 w-3 rounded-full transition-opacity mb-1.5", active ? "opacity-100" : "opacity-30")} style={{ backgroundColor: m.color }}></div>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setVisibleTrendMetrics(prev => prev.filter(x => x !== m.label));
                                                        }}
                                                        className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-sm text-slate-400 dark:text-slate-500 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-red-500 dark:hover:text-red-400 z-10 pointer-events-auto"
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                </div>

                                                <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">{m.value}</div>
                                                
                                                <div className="flex items-center justify-between text-xs mt-1">
                                                    <span className="text-slate-500 dark:text-slate-400 font-medium">{m.prev}</span>
                                                    <span className={cn(
                                                        "font-bold",
                                                        m.type === 'negative' ? "text-red-500" : (m.change.includes('→') ? "text-slate-400" : "text-emerald-500")
                                                    )}>
                                                        {m.change}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            
                            {visibleTrendMetrics.length < INITIAL_TREND_METRICS.length && (
                                <div className="flex-none aspect-square h-auto min-w-[100px]">
                                    <div
                                        onClick={() => setVisibleTrendMetrics(INITIAL_TREND_METRICS)}
                                        className="h-full w-full bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer flex flex-col items-center justify-center gap-1.5 transition-colors"
                                    >
                                        <Plus size={20} className="text-slate-400" />
                                        <span className="text-xs font-medium text-slate-500 whitespace-nowrap">Restore</span>
                                    </div>
                                </div>
                            )}

                            <div className="flex-none aspect-square h-auto min-w-[100px]">
                                <div className="h-full w-full bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer flex flex-col items-center justify-center gap-1.5 transition-colors">
                                    <Settings size={20} className="text-slate-400" />
                                    <span className="text-xs font-medium text-slate-500 whitespace-nowrap">Manage</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Chart Area */}
                <div className="border border-slate-200/50 dark:border-slate-800/50 rounded-lg p-4 bg-slate-50/50 dark:bg-slate-900/50" data-testid="chart-container">
                    <div className="relative w-full h-[360px]" data-testid="dynamic-chart">
                        {/* Grid lines */}
                        <div className="absolute inset-0 flex flex-col justify-between py-2 overflow-hidden pointer-events-none pr-10 pl-8">
                            {[0, 1, 2, 3, 4].map(i => (
                                <div key={i} className="w-full h-px bg-slate-200 dark:bg-slate-800/50 relative border-dashed border-b border-0">
                                    <span className="absolute -left-8 -top-2 text-[10px] font-medium text-slate-500">${(26.0 - i * 6.5).toFixed(1)}K</span>
                                    <span className="absolute -right-8 -top-2 text-[10px] font-medium text-slate-500">{600 - i * 150}</span>
                                </div>
                            ))}
                        </div>

                        {/* Bars & Lines SVG */}
                        <svg viewBox="0 0 1000 300" className="absolute inset-0 w-full h-full pb-8 pr-12 pl-12 overflow-visible" preserveAspectRatio="none">
                            {/* Line: Sales */}
                            {selectedTrendMetrics.includes('Sales') && (
                                <path
                                    d="M 0 120 Q 50 150 100 120 T 200 180 T 300 140 T 400 100 T 500 140 T 600 80 T 700 120 T 800 60 T 900 100 T 1000 40"
                                    fill="none" stroke="#24A799" strokeWidth="3" vectorEffect="non-scaling-stroke"
                                />
                            )}
                            {/* Line: Profit */}
                            {selectedTrendMetrics.includes('Profit') && (
                                <path
                                    d="M 0 180 Q 50 160 100 180 T 200 220 T 300 190 T 400 160 T 500 190 T 600 140 T 700 170 T 800 120 T 900 150 T 1000 100"
                                    fill="none" stroke="#F08A50" strokeWidth="3" vectorEffect="non-scaling-stroke"
                                />
                            )}
                            {/* Line: Order Count */}
                            {selectedTrendMetrics.includes('Order Count') && (
                                <path
                                    d="M 0 200 Q 50 180 100 210 T 200 180 T 300 220 T 400 150 T 500 190 T 600 150 T 700 180 T 800 130 T 900 160 T 1000 120"
                                    fill="none" stroke="#5E8AB6" strokeWidth="3" vectorEffect="non-scaling-stroke"
                                />
                            )}
                            {/* Line: Organic Sales */}
                            {selectedTrendMetrics.includes('Organic Sales') && (
                                <path
                                    d="M 0 140 Q 50 160 100 130 T 200 190 T 300 150 T 400 110 T 500 150 T 600 90 T 700 130 T 800 70 T 900 110 T 1000 50"
                                    fill="none" stroke="#50C5F0" strokeWidth="3" vectorEffect="non-scaling-stroke" strokeDasharray="6,6"
                                />
                            )}
                            
                            {/* X-Axis Base Line */}
                            <path d="M 0 300 L 1000 300" fill="none" stroke="currentColor" className="text-slate-300 dark:text-slate-700" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                            
                            </svg>

                        {/* X-Axis Labels */}
                        <div className="absolute bottom-2 left-12 right-12 flex justify-between px-2">
                            {['01/29', '01/31', '02/02', '02/04', '02/06', '02/08', '02/10', '02/12', '02/14', '02/16', '02/18', '02/20', '02/22', '02/24', '02/26', '02/28', '03/02', '03/04', '03/06', '03/08', '03/10', '03/12', '03/14', '03/16', '03/18', '03/20', '03/22', '03/24', '03/26'].filter((_, i) => i % 2 === 0).map((d, i) => (
                                <span key={i} className="text-[10px] font-medium text-slate-500">{d}</span>
                            ))}
                        </div>
                    </div>

                    {/* Footer Legend */}
                    <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
                        {metrics.map(m => (
                            <div key={m.label} className="flex items-center gap-1.5 opacity-80 hover:opacity-100 cursor-pointer transition-opacity">
                                <svg width="14" height="14" viewBox="0 0 32 32">
                                    <path strokeWidth="4" fill="none" stroke={m.color} d="M0,16h10.666666666666666 A5.333333333333333,5.333333333333333,0,1,1,21.333333333333332,16 H32M21.333333333333332,16 A5.333333333333333,5.333333333333333,0,1,1,10.666666666666666,16"></path>
                                </svg>
                                <span className="text-[11px] font-medium" style={{ color: m.color }}>{m.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    const renderAnalytics = () => {
        const isShopifySelected = selectedPlatforms.includes('Shopify');
        const isAmazonSelected = selectedPlatforms.includes('Amazon');
        const isOnlyAmazon = isAmazonSelected && !isShopifySelected && selectedPlatforms.length === 1;
        const isSpecialCustomer = (userRole === 'shopify_customer' || userRole === 'multichannel_customer') && !isOnlyAmazon;

        let pageTitle = "Analytics";
        if (isShopifySelected && !isAmazonSelected) {
            pageTitle = "Shopify Product Analytics";
        } else if (isShopifySelected && isAmazonSelected) {
            pageTitle = "Eva Unified Product Analytics";
        } else if (isAmazonSelected && !isShopifySelected) {
            if (analyticsTab === 'account') pageTitle = "General Overview";
            else if (analyticsTab === 'product') pageTitle = "Trends Overview";
            else if (analyticsTab === 'campaign') pageTitle = "Advertising Overview";
        }

        return (
            <div className="flex flex-1 flex-col gap-3 md:gap-4 h-full min-h-0">
                <div className="flex items-start justify-between gap-4 px-1">
                    <div className="min-w-0">
                        <h1 className="text-xl font-semibold mb-1 text-slate-900 dark:text-white flex items-center gap-2">
                            {pageTitle}
                            <HelpLink />
                        </h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Track product-level performance trends over time.</p>
                    </div>
                </div>

                {isFetchingAmazonData && (
                    <div className="mx-1 p-4 bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/50 rounded-2xl flex items-center gap-4 animate-pulse">
                        <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                            <RotateCcw className="animate-spin-slow" size={20} />
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <span className="text-sm font-bold text-slate-900 dark:text-white">Preparing Data</span>
                            <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">We are preparing your account by downloading data from Amazon, please wait...</span>
                        </div>
                    </div>
                )}

                {userRole === 'amazon_missing_ad' && showAdBanner && (
                    <div className="mx-1 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/95 to-indigo-600/95 backdrop-blur-md"></div>
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                        <div className="relative p-4 md:p-5 flex flex-col md:flex-row items-center gap-4 md:gap-6 rounded-2xl border border-blue-400/30 shadow-xl shadow-blue-500/20">
                            <div className="w-12 h-12 md:w-14 md:h-14 bg-white/20 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-500">
                                <Target size={28} strokeWidth={2.5} className="drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
                            </div>
                            <div className="flex-1 text-center md:text-left space-y-1">
                                <h4 className="text-base md:text-lg font-black text-white tracking-tight">Missing Advertising Connection</h4>
                                <p className="text-xs md:text-sm font-bold text-blue-100 opacity-90 leading-tight">Your Amazon Ad account is not connected yet. Connect it now to unlock complete performance insights and organic sales data.</p>
                            </div>
                            <div className="flex flex-wrap items-center justify-center gap-3 w-full md:w-auto">
                                <button 
                                    onClick={() => setIsAdConnectionWizardOpen(true)}
                                    className="px-6 py-2.5 bg-white text-blue-600 text-sm font-black rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all active:scale-95 flex items-center gap-2 group/btn"
                                >
                                    <span>Connect Now</span>
                                    <ArrowUpRight size={18} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                </button>
                                <div className="flex items-center gap-2">
                                    <button 
                                        onClick={() => setShowAdBanner(false)}
                                        className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                        title="Dismiss"
                                    >
                                        <X size={18} />
                                    </button>
                                    <button 
                                        onClick={() => {
                                            localStorage.setItem('hideAdBanner', 'true');
                                            setShowAdBanner(false);
                                        }}
                                        className="text-[10px] font-black text-white/50 hover:text-white/90 uppercase tracking-widest transition-colors underline underline-offset-4"
                                    >
                                        Don't show again
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <Tabs value={analyticsTab} onValueChange={(v) => setAnalyticsTab(v as any)} className="w-full flex flex-col flex-1 min-h-0">
                    <div className="flex flex-col gap-6" data-testid="analytics-header">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-1">
                            <div className="max-w-full overflow-x-auto">
                                <TabsList className="inline-flex h-auto w-max items-center gap-1 rounded-md border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 p-1">
                                    {isAmazonSelected && !isShopifySelected && (
                                        <TabsTrigger
                                            value="account"
                                            className="inline-flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-all border border-transparent text-slate-500 hover:bg-white/70 hover:text-slate-900 dark:hover:bg-slate-800/70 dark:hover:text-white data-[state=active]:border-slate-200 dark:data-[state=active]:border-slate-700 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:text-slate-900 dark:data-[state=active]:text-white data-[state=active]:shadow-sm"
                                        >
                                            <LayoutDashboard size={20} />
                                            <span>General Overview</span>
                                        </TabsTrigger>
                                    )}
                                    <TabsTrigger
                                        value="product"
                                        className="inline-flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-all border border-transparent text-slate-500 hover:bg-white/70 hover:text-slate-900 dark:hover:bg-slate-800/70 dark:hover:text-white data-[state=active]:border-slate-200 dark:data-[state=active]:border-slate-700 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:text-slate-900 dark:data-[state=active]:text-white data-[state=active]:shadow-sm"
                                    >
                                        <Box size={20} />
                                        <span>Trends Overview</span>
                                    </TabsTrigger>
                                    {isAmazonSelected && !isShopifySelected && (
                                        <TabsTrigger
                                            value="campaign"
                                            className="inline-flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-all border border-transparent text-slate-500 hover:bg-white/70 hover:text-slate-900 dark:hover:bg-slate-800/70 dark:hover:text-white data-[state=active]:border-slate-200 dark:data-[state=active]:border-slate-700 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:text-slate-900 dark:data-[state=active]:text-white data-[state=active]:shadow-sm"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="tabler-icon tabler-icon-ad"><path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10"></path><path d="M7 15v-4a2 2 0 0 1 4 0v4"></path><path d="M7 13l4 0"></path><path d="M17 9v6h-1.5a1.5 1.5 0 1 1 1.5 -1.5"></path></svg>
                                            <span>Advertising Overview</span>
                                        </TabsTrigger>
                                    )}
                                </TabsList>
                            </div>

                            <div className="flex items-center gap-2" data-testid="analytics-controls">
                                <div data-testid="granularity-selector">
                                    <div className="flex items-center gap-2">
                                        <div className="inline-flex items-center rounded-md border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 overflow-hidden">
                                            {['Daily', 'Weekly', 'Monthly'].map((p) => (
                                                <button
                                                    key={p}
                                                    onClick={() => setAnalyticsPeriod(p as any)}
                                                    className={cn(
                                                        "inline-flex items-center justify-center whitespace-nowrap py-1.5 text-xs font-semibold ring-offset-background transition-all h-8 px-3 border-0 border-r last:border-r-0 border-slate-200 dark:border-slate-800",
                                                        analyticsPeriod === p
                                                            ? "bg-white dark:bg-slate-950 text-slate-900 dark:text-white shadow-sm border-l"
                                                            : "bg-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800/50"
                                                    )}
                                                >
                                                    {p}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <button className="inline-flex items-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md px-3 text-xs justify-start text-left font-normal cursor-pointer h-9 text-slate-900 dark:text-gray-200">
                                    <Calendar size={16} />
                                    Jan 30, 2026 - Mar 27, 2026
                                </button>
                            </div>
                        </div>

                        {analyticsTab === 'product' && (
                            <div className="flex items-center gap-3 px-1" data-testid="analytics-filters">
                                <div className="relative">
                                    <div className="flex flex-wrap items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-2 shadow-sm">
                                        <div className="inline-flex items-center gap-2">
                                            <div className="flex-1 relative w-[min(720px,calc(100vw-48px))] min-w-[240px]">
                                                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                                <input
                                                    className="flex h-8 w-full rounded-md border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-slate-400 focus-visible:outline-none focus:border-blue-500 focus:ring-0 md:text-sm pl-9 pr-8"
                                                    placeholder="Search by product name, ASIN, SKU, Parent ASIN..."
                                                    value={analyticsSearch}
                                                    onChange={(e) => setAnalyticsSearch(e.target.value)}
                                                />
                                            </div>
                                            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 h-8 rounded-md px-3 text-xs cursor-pointer flex-shrink-0 text-slate-900 dark:text-gray-200">
                                                <Plus size={16} />
                                                Add Filter
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>



                    {isFetchingAmazonData ? (
                        <div className="mt-4">
                            {renderPlaceholder("Please wait while your account is being prepared...", Activity)}
                            <div className="flex flex-col gap-6 mt-8 animate-pulse opacity-50 pointer-events-none grayscale">
                                <div className="grid grid-cols-4 gap-4">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="h-32 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-800" />
                                    ))}
                                </div>
                                <div className="h-96 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-800" />
                            </div>
                        </div>
                    ) : (
                        <>
                            {isAmazonSelected && !isShopifySelected && (
                                <TabsContent value="account" className="mt-0">
                                    {renderAccountAnalytics()}
                                </TabsContent>
                            )}

                            <TabsContent value="product" className="mt-0">
                                <>
                                    {renderTrendsOverview()}

                                    <div className="w-full flex flex-col pt-0 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-both" data-testid="products-table">
                                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between pb-1">
                                            <div className="flex flex-col gap-1 pr-6 flex-1 min-w-0">
                                                <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Products</h2>
                                                <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Track your product's performance and manage their goals.</p>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-2">
                                                <button className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 h-9 px-4 py-2 cursor-pointer">
                                                    <Crosshair size={16} className="opacity-70" />
                                                    Store Goals
                                                </button>
                                                <button className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 h-9 px-4 py-2 cursor-pointer">
                                                    <Download size={16} className="opacity-70" />
                                                    Export
                                                </button>
                                                <button className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 h-9 px-4 py-2 cursor-pointer">
                                                    <DollarSign size={16} className="opacity-70" />
                                                    Update Product Cost
                                                </button>
                                                <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-1"></div>
                                                <button className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 h-9 px-4 py-2 cursor-pointer">
                                                    <Columns size={16} className="opacity-70" />
                                                    Columns
                                                    <ChevronDown size={14} className="opacity-50" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4.5 mb-2">
                                            <div className="inline-flex items-center justify-center rounded-md border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 p-1">
                                                {['Variant', 'Product'].map((g) => (
                                                    <button
                                                        key={g}
                                                        onClick={() => {
                                                            setAnalyticsGroupBy(g as any);
                                                            setExpandedAnalyticsProducts([]);
                                                        }}
                                                        className={cn(
                                                            "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1 text-sm font-medium transition-all cursor-pointer",
                                                            analyticsGroupBy === g
                                                                ? "bg-white dark:bg-slate-950 text-slate-900 dark:text-white shadow-sm ring-1 ring-slate-200 dark:ring-slate-800"
                                                                : "text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800/50"
                                                        )}
                                                    >
                                                        {g}
                                                    </button>
                                                ))}
                                            </div>
                                            <div className="h-6 w-px bg-slate-200 dark:bg-slate-800"></div>
                                            <div className="flex items-center gap-1 border border-slate-200 dark:border-slate-800 p-1 rounded-md bg-white dark:bg-slate-900 shadow-sm">
                                                <button className="p-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white transition-colors cursor-pointer"><List size={16} /></button>
                                                <button className="p-1 rounded text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"><LayoutGrid size={16} /></button>
                                            </div>
                                        </div>

                                        {renderProductAnalytics()}
                                    </div>
                                </>
                            </TabsContent>

                            {!isSpecialCustomer && (
                                <TabsContent value="campaign" className="mt-0 relative">
                                    {userRole === 'amazon_missing_ad' && (
                                        <div 
                                            onClick={() => setIsAdConnectionWizardOpen(true)}
                                            className="absolute inset-x-0 -top-4 -bottom-4 z-[40] bg-white/60 dark:bg-slate-900/60 backdrop-blur-[4px] flex flex-col items-center justify-center gap-4 transition-colors hover:bg-white/50 dark:hover:bg-slate-900/50 cursor-pointer rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800"
                                        >
                                            <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-lg border border-slate-200 dark:border-slate-700">
                                                <Lock size={28} className="text-slate-500" />
                                            </div>
                                            <div className="text-center space-y-1">
                                                <h3 className="text-lg font-black text-slate-800 dark:text-slate-200">Advertising Data Locked</h3>
                                                <p className="text-[14px] font-black text-slate-800 dark:text-slate-200 leading-tight">Connect Ad Account to View Data</p>
                                            </div>
                                        </div>
                                    )}
                                    <div className={cn(userRole === 'amazon_missing_ad' && "opacity-20 blur-sm pointer-events-none select-none")}>
                                        {renderPlaceholder(analyticsSearch ? `Current Advertising View (Searching: ${analyticsSearch})` : "Current Advertising View will be here", Activity)}
                                    </div>
                                </TabsContent>
                            )}
                        </>
                    )}
                </Tabs>

            </div>
        );
    };

    const renderClients = () => (
        <div className="flex flex-col gap-6 animate-in fade-in duration-500">
            <div className="flex flex-col gap-1 px-1">
                <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Clients</h1>
                    <HelpLink />
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-[14px] font-medium">Manage and monitor your client relationships</p>
            </div>
            {renderPlaceholder("Current Client page will be here", Users)}
        </div>
    );

    const renderChats = () => (
        <div className="flex flex-col gap-6 animate-in fade-in duration-500">
            <div className="flex flex-col gap-1 px-1">
                <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Chats</h1>
                    <HelpLink showInternal />
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-[14px] font-medium">Instant communication and collaboration</p>
            </div>

            {/* Chats Filter Badge */}
            {selectedAccount && (
                <div id="chat-filters-header" className="flex items-center gap-3 py-4 border-b-transparent">
                    <div className="flex items-center gap-2.5 flex-1 min-w-0">
                        <div className="flex items-center gap-2 shrink-0">
                            <div className="w-1.5 h-5 rounded-full bg-blue-600 shadow-sm"></div>
                            <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">Filters</h2>
                        </div>
                        <div className="mx-4 text-xs text-slate-500 flex items-center gap-2">
                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 rounded-full text-[10px] font-bold shadow-sm whitespace-nowrap cursor-default">
                                <Building2 size={12} /> Account: {selectedAccount.name}
                            </div>
                        </div>
                        <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800 opacity-50"></div>
                    </div>
                </div>
            )}

            {renderPlaceholder(selectedAccount ? `Chat history for ${selectedAccount.name}` : "Current chat will be here", MessageSquare)}
        </div>
    );

    return (
        <TooltipProvider>
            {currentPage === 'conversion-intelligence-landing' ? (
                <div className="min-h-screen w-full bg-[#f8fafc] dark:bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden transition-all duration-500">
                    {/* Abstract Background Accents */}
                    <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/5 blur-[120px] rounded-full" />
                    
                    <div className="w-full max-w-[480px] bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200/60 dark:border-slate-800/80 shadow-[0_20px_70px_rgba(0,0,0,0.06)] dark:shadow-[0_40px_100px_rgba(0,0,0,0.4)] p-12 relative z-10 animate-in fade-in zoom-in-95 duration-1000">
                        <div className="flex flex-col items-center text-center space-y-8">
                            {/* Logo / Icon Area */}
                            <div className="w-24 h-24 rounded-[32px] bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center shadow-inner border border-blue-100/50 dark:border-blue-500/20 mb-2 group-hover:scale-105 transition-transform duration-500">
                                 <img 
                                    src="https://auth.eva.guru/_next/image?url=%2Fci-logo.webp&w=256&q=75" 
                                    alt="Conversion Intelligence" 
                                    className="w-14 h-14 object-contain brightness-110"
                                />
                            </div>
                            
                            <div className="space-y-3">
                                <h1 className="text-[32px] font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                                    Welcome to <span className="text-blue-600 dark:text-blue-500">Conversion Intelligence</span>
                                </h1>
                                <p className="text-slate-500 dark:text-slate-400 font-bold text-[16px]">
                                    Connect your Shopify store to get started
                                </p>
                            </div>

                            <div className="w-full space-y-6 pt-4">
                                <div className="space-y-2.5 text-left">
                                    <label className="text-[14px] font-black text-slate-900 dark:text-slate-200 block pl-1 uppercase tracking-widest opacity-80">
                                        Store Domain
                                    </label>
                                    <div className="relative group">
                                        <input 
                                            type="text" 
                                            placeholder="mystore.myshopify.com"
                                            className="w-full px-6 py-4.5 bg-slate-50/50 dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800/50 rounded-2xl text-[15px] font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all shadow-sm"
                                        />
                                        <div className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-500 rounded-b-2xl scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500" />
                                    </div>
                                    <p className="text-[12px] text-slate-400 font-medium pl-1">
                                        Example: <span className="text-slate-600 dark:text-slate-300 font-bold">mystore.myshopify.com</span> or just <span className="text-slate-600 dark:text-slate-300 font-bold">mystore</span>
                                    </p>
                                </div>

                                <button className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-500/25 transition-all active:scale-[0.98] flex items-center justify-center gap-3 relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                    Connect Shopify Store
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    {/* Footer decoration */}
                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3 opacity-20">
                        <div className="w-2 h-2 rounded-full bg-slate-400 animate-pulse" />
                        <div className="w-2 h-2 rounded-full bg-slate-400 animate-pulse delay-75" />
                        <div className="w-2 h-2 rounded-full bg-slate-400 animate-pulse delay-150" />
                    </div>
                </div>
            ) : (
                <>
            {isAdConnectionWizardOpen && (
                <div className="fixed inset-0 z-[99999] bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center overflow-auto p-6 animate-in fade-in duration-300">
                    <ConnectionWizard 
                        initialStep={4}
                        onClose={() => setIsAdConnectionWizardOpen(false)} 
                        onComplete={() => setIsAdConnectionWizardOpen(false)}
                        onAmazonPage={setIsAmazonPage}
                    />
                </div>
            )}
            
            {/* Global Trial Banner */}
            <div className={cn("flex flex-col h-screen overflow-hidden transition-colors duration-300", theme === 'dark' ? "bg-slate-950 text-slate-100" : "bg-slate-50/50 text-slate-900")}>
                {selectedPackage === 'no_package_after_trial' && userRole !== 'eva_personel' && userRole !== 'eva_admin' && (
                    <div className="h-11 w-full bg-[#f6cf5d] flex items-center justify-center gap-4 relative top-0 left-0 z-[10000] border-b border-black/5 shadow-sm shrink-0">
                        <span className="text-[13px] font-black text-slate-900 tracking-tight">Your free trial has <span className="underline decoration-2 underline-offset-4 decoration-black/30">expired.</span></span>
                        <button 
                            onClick={() => setIsPricingDialogOpen(true)} 
                            className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-[11px] font-black px-4 py-1.5 rounded-lg transition-all shadow-lg active:scale-95"
                        >
                            Start Your Monthly Plan
                        </button>
                    </div>
                )}
                {selectedPackage === 'trial' && userRole !== 'eva_personel' && userRole !== 'eva_admin' && (
                    <div className={cn(
                        "w-full h-11 flex items-center justify-center relative z-[100] border-b border-black/5 transition-all duration-500 select-none shrink-0",
                        isSubscriptionRequested ? "bg-[#2dd48f] text-slate-950 shadow-sm" : "bg-[#f5d547] text-slate-900 shadow-inner"
                    )}>
                        <div className="flex items-center gap-6 px-6 w-full max-w-7xl mx-auto">
                            <div className="flex items-center gap-2 flex-grow justify-center translate-x-4">
                                {isSubscriptionRequested ? (
                                    <div className="flex items-center gap-3 font-bold text-[13px] animate-in zoom-in-95 duration-300">
                                        <div className="w-5 h-5 rounded-full bg-slate-900 flex items-center justify-center shrink-0">
                                            <Check size={12} className="text-[#2dd48f]" strokeWidth={4} />
                                        </div>
                                        <span>Thank you for your interest, our sales team will reach out to you shortly.</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-3 text-[13px] animate-in slide-in-from-top-1 duration-300">
                                        <History size={16} className="text-slate-800 opacity-60" />
                                        <span className="font-semibold text-slate-800/80">Your free trial ends in</span>
                                        <span className="font-black bg-black/10 px-2 py-0.5 rounded shadow-sm text-slate-900 flex items-center gap-1">
                                            25 days
                                        </span>
                                    </div>
                                )}
                            </div>
                            {!isSubscriptionRequested && (
                                <button 
                                    onClick={() => setIsPricingDialogOpen(true)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-[11px] font-black uppercase tracking-widest shadow-lg shadow-blue-600/30 active:scale-95 transition-all flex items-center gap-2 group"
                                >
                                    Start Your Monthly Plan
                                    <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                                </button>
                            )}
                        </div>
                    </div>
                )}

                <div className="flex flex-1 overflow-hidden relative">
                    <Sidebar 
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        sidebarCollapsed={sidebarCollapsed}
                        setSidebarCollapsed={setSidebarCollapsed}
                    />

                {/* --- Main Content --- */}
                <main className="flex-1 flex flex-col min-w-0 relative">

                    {/* Header */}
                    {!isAmazonPage && <header className={cn(
                        "bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-800/60 z-[100] flex flex-col justify-center px-4 sm:px-6 md:px-8 w-full transition-all duration-300 sticky top-0 h-[60px]"
                    )}>
                        <div className="flex items-center justify-between w-full h-full gap-2 sm:gap-4">
                            <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0 py-1">

                                {/* Global Search Bar */}
                                {/* Global Search Bar */}
                                {userRole !== 'new_customer' && <div className="relative group transition-all duration-300 w-48 xl:w-72 focus-within:w-64 xl:focus-within:w-80 hidden md:block shrink-0" ref={globalSearchRef}>
                                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-blue-500 transition-colors z-10" size={14} />
                                    <Input
                                        type="text"
                                        placeholder={selectedAccount ? "Search" : "Search account, store or contact..."}
                                        value={globalSearch}
                                        onChange={(e) => setGlobalSearch(e.target.value)}
                                        onFocus={() => setIsGlobalSearchFocused(true)}
                                        className="pl-8 pr-10 rounded-lg h-8 bg-slate-50 border border-slate-200/80 hover:bg-slate-100/50 dark:bg-slate-900 focus-visible:bg-white dark:focus-visible:bg-slate-800 dark:border-slate-800 transition-all shadow-sm focus-visible:shadow-md focus-visible:ring-2 focus-visible:ring-blue-500/20 text-[13px] font-medium placeholder:text-slate-400"
                                    />
                                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-70 group-focus-within:opacity-0 transition-opacity">
                                        <kbd className="pointer-events-none inline-flex h-4 select-none items-center gap-1 rounded bg-white dark:bg-slate-800 px-1 font-sans text-[9px] font-bold text-slate-400 border border-slate-200 dark:border-slate-700 shadow-sm">
                                            ⌘K
                                        </kbd>
                                    </div>

                                    {selectedAccount && isGlobalSearchFocused ? (
                                        (userRole === 'eva_personel' || userRole === 'eva_admin') ? (
                                            <div className="absolute top-full left-0 mt-2 w-[680px] bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl z-[120] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                                <div className="max-h-[700px] overflow-y-auto custom-scrollbar p-5 flex flex-col gap-6">
                                                    {/* Module Search Section */}
                                                    <div className="flex flex-col gap-3">
                                                        {[
                                                            { id: 'analytics-product', label: 'Search in Products', icon: Package, onClick: () => { setCurrentPage('analytics'); setAnalyticsTab('product'); setAnalyticsSearch(globalSearch); } },
                                                            { id: 'analytics-campaign', label: 'Search in Advertising Overview', icon: Megaphone, onClick: () => { setCurrentPage('analytics'); setAnalyticsTab('campaign'); setAnalyticsSearch(globalSearch); } },
                                                            { id: 'tasks', label: 'Search in Tasks', icon: ClipboardList, onClick: () => { setCurrentPage('tasks'); setTaskSearch(globalSearch); } },
                                                        ].map(item => (
                                                            <button
                                                                key={item.id}
                                                                onMouseDown={(e) => {
                                                                    e.preventDefault();
                                                                    item.onClick();
                                                                    setGlobalSearch('');
                                                                    setIsGlobalSearchFocused(false);
                                                                }}
                                                                className="flex items-center gap-4 p-2 rounded-2xl hover:bg-slate-50/80 dark:hover:bg-slate-900 group transition-all"
                                                            >
                                                                <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center shrink-0 transition-transform group-hover:scale-105">
                                                                    <item.icon size={22} className="text-slate-700 dark:text-slate-300" />
                                                                </div>
                                                                <div className="flex-1 text-left min-w-0">
                                                                    <p className="text-[16px] font-black text-slate-900 dark:text-white leading-tight">{item.label}</p>
                                                                    <p className="text-[14px] text-slate-400 font-bold mt-0.5 truncate tracking-tight">"{globalSearch}"</p>
                                                                </div>
                                                                <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-500 group-hover:translate-x-1 transition-all mr-2" />
                                                            </button>
                                                        ))}
                                                    </div>

                                                    {/* Quick Actions / Transitions */}
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <button 
                                                            onMouseDown={(e) => {
                                                                e.preventDefault();
                                                                setIsSearchAccountListExpanded(!isSearchAccountListExpanded);
                                                            }}
                                                            className={cn(
                                                                "flex items-center gap-4 p-5 rounded-2xl bg-[#f8fafc] dark:bg-slate-900/50 border border-transparent transition-all group",
                                                                isSearchAccountListExpanded && "ring-2 ring-blue-500/20 bg-blue-50/30"
                                                            )}
                                                        >
                                                            <div className={cn(
                                                                "w-10 h-10 rounded-full shadow-sm flex items-center justify-center shrink-0 border transition-all duration-300 bg-white dark:bg-slate-800",
                                                                isSearchAccountListExpanded ? "rotate-180 border-blue-200" : "border-slate-100 dark:border-slate-800"
                                                            )}>
                                                                <ChevronDown size={18} className="text-blue-600" />
                                                            </div>
                                                            <div className="text-left min-w-0">
                                                                <p className="text-[14px] font-black text-blue-600 tracking-tight leading-tight">Switch to Another Account</p>
                                                                <p className="text-[11px] text-slate-400 font-black mt-1 uppercase tracking-widest">SEARCH "{globalSearch || 'ACCOUNT'}"</p>
                                                            </div>
                                                        </button>

                                                        <button 
                                                            onMouseDown={(e) => {
                                                                e.preventDefault();
                                                                setSelectedAccount(null);
                                                                setCurrentPage('dashboard');
                                                                setGlobalSearch('');
                                                                setIsGlobalSearchFocused(false);
                                                            }}
                                                            className="flex items-center gap-4 p-5 rounded-2xl bg-[#f8fafc] dark:bg-slate-900/50 border border-transparent hover:bg-slate-100/50 dark:hover:bg-slate-800/80 transition-all group text-left"
                                                        >
                                                            <div className="w-10 h-10 rounded-full bg-[#9333ea] flex items-center justify-center shrink-0 shadow-lg shadow-purple-500/30">
                                                                <span className="text-[10px] font-black text-white tracking-widest">EVA</span>
                                                            </div>
                                                            <div className="min-w-0">
                                                                <p className="text-[14px] font-black text-purple-600 tracking-tight leading-tight">Eva Internal</p>
                                                                <p className="text-[11px] text-slate-400 font-bold mt-1 leading-snug">Click here to switch Eva Internal</p>
                                                            </div>
                                                        </button>
                                                    </div>

                                                    {/* Other Matching Accounts */}
                                                    {isSearchAccountListExpanded && globalSearch && Object.keys(globalSearchResults).some(k => (globalSearchResults as any)[k]?.length > 0) && (
                                                        <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
                                                            {([
                                                                { key: 'byName', label: 'Accounts by Name', icon: Building2 },
                                                                { key: 'byProject', label: 'Accounts by Project', icon: LayoutDashboard },
                                                                { key: 'byStore', label: 'Accounts by Store', icon: Store },
                                                                { key: 'byContact', label: 'Accounts by Contact', icon: User },
                                                            ] as const).filter(g => (globalSearchResults as any)[g.key] && (globalSearchResults as any)[g.key].length > 0).map(group => (
                                                                <div key={group.key}>
                                                                    <div className="flex items-center gap-2 px-2 mb-3">
                                                                        <group.icon size={12} className="text-slate-400" />
                                                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{group.label}</span>
                                                                        <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800" />
                                                                        <span className="text-[10px] font-black text-slate-300 dark:text-slate-600 tabular-nums">{(globalSearchResults as any)[group.key].length}</span>
                                                                    </div>
                                                                    <div className="grid grid-cols-1 gap-1">
                                                                        {(globalSearchResults as any)[group.key].map((res: any, i: number) => (
                                                                            <button
                                                                                key={i}
                                                                                onMouseDown={(e) => {
                                                                                    e.preventDefault();
                                                                                    setSelectedAccount(res.account);
                                                                                    setCurrentPage('account-detail');
                                                                                    setGlobalSearch('');
                                                                                    setIsGlobalSearchFocused(false);
                                                                                }}
                                                                                className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-all group"
                                                                            >
                                                                                <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[12px] font-black text-slate-500 transition-all group-hover:scale-105 group-hover:bg-blue-100 dark:group-hover:bg-blue-900 group-hover:text-blue-600">
                                                                                    {res.initial}
                                                                                </div>
                                                                                <div className="flex-1 text-left min-w-0">
                                                                                    <p className="text-[13px] font-black text-slate-700 dark:text-slate-300 truncate group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{res.title}</p>
                                                                                    {res.match && <p className="text-[11px] text-slate-400 truncate opacity-80">{res.match}</p>}
                                                                                </div>
                                                                                <ChevronRight size={14} className="text-slate-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                                                                            </button>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ) : globalSearch ? (
                                            <div className="absolute top-full left-0 mt-2 w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl z-[120] overflow-hidden animate-in fade-in zoom-in-95 duration-200 p-2 flex flex-col gap-1">
                                                <button
                                                    className="flex items-center gap-3 px-3 py-2 text-left text-[13px] font-medium hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-700 dark:text-slate-200"
                                                    onMouseDown={(e) => {
                                                        e.preventDefault();
                                                        setCurrentPage('analytics');
                                                        setAnalyticsTab('product');
                                                        setAnalyticsSearch(globalSearch);
                                                        setGlobalSearch('');
                                                        setIsGlobalSearchFocused(false);
                                                    }}
                                                >
                                                    <Search size={14} className="text-slate-400" />
                                                    <span>Search <span className="font-bold text-slate-900 dark:text-white">"{globalSearch}"</span> in Products</span>
                                                </button>
                                                <button
                                                    className="flex items-center gap-3 px-3 py-2 text-left text-[13px] font-medium hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-700 dark:text-slate-200"
                                                    onMouseDown={(e) => {
                                                        e.preventDefault();
                                                        setCurrentPage('analytics');
                                                        setAnalyticsTab('campaign');
                                                        setAnalyticsSearch(globalSearch);
                                                        setGlobalSearch('');
                                                        setIsGlobalSearchFocused(false);
                                                    }}
                                                >
                                                    <Search size={14} className="text-slate-400" />
                                                    <span>Search <span className="font-bold text-slate-900 dark:text-white">"{globalSearch}"</span> in Advertising Overview</span>
                                                </button>
                                                <button
                                                    className="flex items-center gap-3 px-3 py-2 text-left text-[13px] font-medium hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-700 dark:text-slate-200"
                                                    onMouseDown={(e) => {
                                                        e.preventDefault();
                                                        setCurrentPage('tasks');
                                                        setTaskSearch(globalSearch);
                                                        setGlobalSearch('');
                                                        setIsGlobalSearchFocused(false);
                                                    }}
                                                >
                                                    <Search size={14} className="text-slate-400" />
                                                    <span>Search <span className="font-bold text-slate-900 dark:text-white">"{globalSearch}"</span> in Tasks</span>
                                                </button>
                                            </div>
                                        ) : null
                                    ) : !selectedAccount && globalSearch && isGlobalSearchFocused && (
                                        <div className="absolute top-full left-0 mt-2 w-[680px] bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl z-[120] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                            <div className="max-h-[520px] overflow-y-auto custom-scrollbar">
                                                {globalSearchHasResults ? (
                                                    <div className="p-3 flex flex-col gap-4">
                                                        {([
                                                            { key: 'byName', label: 'Accounts by Name', icon: '🏢', items: globalSearchResults.byName, renderSub: (r: any) => null },
                                                            { key: 'byProject', label: 'Accounts by Project', icon: '📁', items: globalSearchResults.byProject, renderSub: (r: any) => r.match },
                                                            { key: 'byStore', label: 'Accounts by Store', icon: '🛍️', items: globalSearchResults.byStore, renderSub: (r: any) => r.match },
                                                            { key: 'byContact', label: 'Accounts by Contact', icon: '👤', items: globalSearchResults.byContact, renderSub: (r: any) => r.match },
                                                            { key: 'byTeam', label: 'Accounts by Team Member', icon: '👥', items: globalSearchResults.byTeam, renderSub: (r: any) => r.role ? `${r.role}${r.projectCount > 1 ? ` (${r.projectCount} projects)` : ''}` : null },
                                                        ] as const).filter(g => g.items && g.items.length > 0).map(group => (
                                                            <div key={group.key}>
                                                                {/* Group Header */}
                                                                <div className="flex items-center gap-2 px-2 mb-1.5">
                                                                    <span className="text-[10px]">{group.icon}</span>
                                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{group.label}</span>
                                                                    <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800" />
                                                                    <span className="text-[9px] font-bold text-slate-300 dark:text-slate-600 tabular-nums mr-1">{(group.items ?? []).length}</span>
                                                                    {/* See All button */}
                                                                    <button
                                                                        onMouseDown={(e) => {
                                                                            e.preventDefault();
                                                                            // Navigate to projects page with appropriate persona tab
                                                                            const targetPersona = userRole === 'eva_admin' ? 'ceo' : 'brand_ad_management';
                                                                            setActivePersona(targetPersona);
                                                                            setCurrentPage('dashboard');
                                                                            setSearch(globalSearch);
                                                                            setGlobalSearch('');
                                                                            setIsGlobalSearchFocused(false);
                                                                        }}
                                                                        className="flex items-center gap-0.5 text-[9px] font-bold text-blue-500 hover:text-blue-700 hover:underline transition-colors shrink-0"
                                                                    >
                                                                        See all <ChevronRight size={9} strokeWidth={2.5} />
                                                                    </button>
                                                                </div>
                                                                {/* Items */}
                                                                <div className="flex flex-col gap-0.5">
                                                                    {(group.items ?? []).map((res: any, i: number) => (
                                                                        <div
                                                                            key={i}
                                                                            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-900 transition-colors group/row group/item"
                                                                        >
                                                                            <button
                                                                                className="flex items-center gap-3 flex-1 min-w-0 text-left outline-none"
                                                                                onClick={() => {
                                                                                    setSelectedAccount(res.account);
                                                                                    setCurrentPage('account-detail');
                                                                                    setGlobalSearch('');
                                                                                    setIsGlobalSearchFocused(false);
                                                                                }}
                                                                            >
                                                                                {/* Avatar */}
                                                                                <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold flex flex-shrink-0 items-center justify-center text-[12px] group-hover/item:bg-blue-100 dark:group-hover/item:bg-blue-900/40 group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 transition-colors border border-slate-200/60 dark:border-slate-700/60">
                                                                                    {res.initial}
                                                                                </div>
                                                                                {/* Content */}
                                                                                <div className="flex flex-col flex-1 min-w-0 gap-0.5">
                                                                                    <span className="text-[13px] font-bold text-slate-700 dark:text-slate-200 truncate group-hover/item:text-blue-700 dark:group-hover/item:text-blue-300 transition-colors">
                                                                                        {res.title}
                                                                                    </span>
                                                                                    {group.renderSub(res) && (
                                                                                        <span className="text-[11px] text-slate-400 dark:text-slate-500 truncate font-medium">
                                                                                            {group.renderSub(res)}
                                                                                        </span>
                                                                                    )}
                                                                                </div>
                                                                            </button>

                                                                            {/* Actions */}
                                                                            {(!selectedAccount && (currentPage === 'tasks' || currentPage === 'chats')) ? (
                                                                                <div className="hidden group-hover/row:flex items-center gap-1.5 shrink-0">
                                                                                    <button
                                                                                        onClick={(e) => {
                                                                                            e.stopPropagation();
                                                                                            setSelectedAccount(res.account);
                                                                                            setGlobalSearch('');
                                                                                            setIsGlobalSearchFocused(false);
                                                                                        }}
                                                                                        className="px-2 py-1 text-[10px] font-bold bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-blue-700 hover:border-blue-300 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-md border border-slate-200 dark:border-slate-700 transition-all whitespace-nowrap shadow-sm"
                                                                                    >
                                                                                        Select Account
                                                                                    </button>
                                                                                    <button
                                                                                        onClick={(e) => {
                                                                                            e.stopPropagation();
                                                                                            setSelectedAccount(res.account);
                                                                                            setCurrentPage('account-detail');
                                                                                            setGlobalSearch('');
                                                                                            setIsGlobalSearchFocused(false);
                                                                                        }}
                                                                                        className="px-2 py-1 text-[10px] font-bold bg-blue-100/50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/40 dark:text-blue-400 dark:hover:bg-blue-900/70 rounded-md transition-all whitespace-nowrap shadow-sm"
                                                                                    >
                                                                                        Go to Account
                                                                                    </button>
                                                                                </div>
                                                                            ) : (
                                                                                <ChevronRight size={14} className="text-slate-300 group-hover/item:text-blue-400 transition-colors shrink-0 pointer-events-none" />
                                                                            )}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="text-center py-10">
                                                        <Search size={28} className="mx-auto text-slate-300 dark:text-slate-700 mb-3" />
                                                        <p className="text-[13px] font-semibold text-slate-700 dark:text-slate-300">No results found</p>
                                                        <p className="text-[11px] text-slate-400 mt-1">Try adapting your search term.</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>}

                                {(currentPage === 'analytics' || currentPage === 'reimbursement-analytics') && (
                                    <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                                        {/* Platform Toggle Group (Kanal) */}
                                        <div className="flex items-center p-0.5 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200/80 dark:border-slate-800">
                                            <TooltipProvider delayDuration={0}>
                                                {[
                                                    { id: 'Amazon', icon: AmazonIcon, brandColor: 'text-[#FF9900]' },
                                                    { id: 'Shopify', icon: ShopifyIcon, brandColor: 'text-[#95BF47]' },
                                                    { id: 'TikTok', icon: TikTokIcon, brandColor: 'text-[#000000] dark:text-white' }
                                                ].filter(p => {
                                                    if (userRole === 'amazon_customer') return p.id === 'Amazon';
                                                    if (userRole === 'shopify_customer') return p.id === 'Shopify';
                                                    return true;
                                                }).map(p => {
                                                    const isRestricted = currentPage === 'reimbursement-analytics' && p.id !== 'Amazon';
                                                    const isActive = selectedPlatforms.includes(p.id);
                                                    const Icon = p.icon;
                                                    
                                                    const button = (
                                                        <button
                                                            key={p.id}
                                                            onClick={() => {
                                                                if (isRestricted) {
                                                                    window.open('https://eva.guru/grow-my-brand-now/', '_blank');
                                                                    return;
                                                                }
                                                                setSelectedPlatforms(prev => {
                                                                    if (prev.includes(p.id)) {
                                                                        return prev.length > 1 ? prev.filter(x => x !== p.id) : prev;
                                                                    }
                                                                    return [...prev, p.id];
                                                                });
                                                            }}
                                                            className={cn(
                                                                "w-7 h-7 rounded-md flex items-center justify-center transition-all outline-none group relative",
                                                                isActive
                                                                    ? "bg-white dark:bg-slate-700 shadow-sm border border-slate-200/60 dark:border-slate-600/50"
                                                                    : "border border-transparent hover:bg-slate-200/50 dark:hover:bg-slate-800 text-slate-400",
                                                                isRestricted && "opacity-40 grayscale cursor-pointer"
                                                            )}
                                                            title={isRestricted ? "" : p.id}
                                                        >
                                                            <Icon className={cn("w-[14px] h-[14px] transition-colors", isActive ? p.brandColor : "opacity-60 group-hover:opacity-100")} />
                                                            {isRestricted && <Lock size={8} className="absolute bottom-0.5 right-0.5 text-slate-400" />}
                                                        </button>
                                                    );

                                                    if (isRestricted) {
                                                        return (
                                                            <Tooltip key={p.id}>
                                                                <TooltipTrigger asChild>
                                                                    {button}
                                                                </TooltipTrigger>
                                                                <TooltipContent side="bottom" className="bg-slate-900 border-slate-800 text-white p-2 rounded-lg text-[10px] font-bold max-w-[150px] text-center shadow-xl z-[200]">
                                                                    Please contact us for recovery options
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        );
                                                    }

                                                    return button;
                                                })}
                                            </TooltipProvider>
                                        </div>

                                        {/* Account Type Toggle Group (Type) */}
                                        {(!((userRole === 'shopify_customer' || userRole === 'multichannel_customer') && !(selectedPlatforms.length === 1 && selectedPlatforms[0] === 'Amazon'))) && (
                                            <div className="flex items-center p-0.5 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200/80 dark:border-slate-800">
                                                <TooltipProvider delayDuration={0}>
                                                    {[
                                                        { id: 'Vendor', label: 'Vendor', activeClass: 'text-indigo-600 dark:text-indigo-400' },
                                                        { id: 'Seller', label: 'Seller', activeClass: 'text-emerald-600 dark:text-emerald-400' }
                                                    ].filter(t => isFetchingAmazonData ? t.id === amazonAccountType : true).map(t => {
                                                        const isRestricted = currentPage === 'reimbursement-analytics' && t.id === 'Vendor';
                                                        const isActive = selectedAccountTypes.includes(t.id);
                                                        
                                                        const button = (
                                                            <button
                                                                key={t.id}
                                                                onClick={() => {
                                                                    if (isRestricted) {
                                                                        window.open('https://eva.guru/grow-my-brand-now/', '_blank');
                                                                        return;
                                                                    }
                                                                    setSelectedAccountTypes(prev => prev.includes(t.id) ? prev.filter(x => x !== t.id) : [...prev, t.id]);
                                                                }}
                                                                className={cn(
                                                                    "px-3 h-7 rounded-md flex items-center justify-center transition-all outline-none text-[11px] font-bold relative group",
                                                                    isActive
                                                                        ? "bg-white dark:bg-slate-700 shadow-sm border border-slate-200/60 dark:border-slate-600/50"
                                                                        : "border border-transparent hover:bg-slate-200/50 dark:hover:bg-slate-800 text-slate-400",
                                                                    isRestricted && "opacity-40 grayscale cursor-pointer"
                                                                )}
                                                                title={isRestricted ? "" : t.id}
                                                            >
                                                                <span className={cn("transition-colors", isActive ? t.activeClass : "opacity-60 group-hover:opacity-100")}>{t.label}</span>
                                                                {isRestricted && <Lock size={8} className="absolute top-0.5 right-0.5 text-slate-400 opacity-60" />}
                                                            </button>
                                                        );

                                                        if (isRestricted) {
                                                            return (
                                                                <Tooltip key={t.id}>
                                                                    <TooltipTrigger asChild>
                                                                        {button}
                                                                    </TooltipTrigger>
                                                                    <TooltipContent side="bottom" className="bg-slate-900 border-slate-800 text-white p-2 rounded-lg text-[10px] font-bold max-w-[150px] text-center shadow-xl z-[200]">
                                                                        Please contact us for recovery options
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            );
                                                        }

                                                        return button;
                                                    })}
                                                </TooltipProvider>
                                            </div>
                                        )}

                                        {currentPage === 'analytics' && (
                                            <div className="relative shrink-0" ref={storeSelectorRef}>
                                                <button
                                                    onClick={() => setIsStoreSelectorOpen(!isStoreSelectorOpen)}
                                                    className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 h-8 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-semibold shadow-sm hover:border-slate-300 transition-all group"
                                                >
                                                    <Store size={14} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                                                    <span className="text-slate-700 dark:text-slate-200 truncate max-w-[60px] sm:max-w-[120px]">
                                                        {selectedStore === 'all' ? 'All Stores' :
                                                            selectedStore === 'shopify' ? 'foxty-dev-store-3.myshopify.com' :
                                                                selectedStore === 'amazon' ? 'Amazon Store' : 'Tiktok Store'}
                                                    </span>
                                                    <span className="text-blue-600 dark:text-blue-500 font-bold ml-0.5 whitespace-nowrap bg-blue-50 dark:bg-blue-900/40 px-1 rounded-sm text-[10px]">(3/3)</span>
                                                    <ChevronDown size={14} className={cn("text-slate-400 transition-transform duration-200", isStoreSelectorOpen ? "rotate-180" : "")} />
                                                </button>

                                                {isStoreSelectorOpen && (
                                                    <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-[110] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                                        <div className="p-2">
                                                            {[
                                                                { id: 'all', label: 'All Stores' },
                                                                { id: 'shopify', label: 'foxty-dev-store-3.myshopify.com' },
                                                                { id: 'amazon', label: 'Amazon Store' },
                                                                { id: 'tiktok', label: 'Tiktok Store' },
                                                            ].map((store) => (
                                                                <button
                                                                    key={store.id}
                                                                    onClick={() => {
                                                                        setSelectedStore(store.id);
                                                                        setIsStoreSelectorOpen(false);
                                                                    }}
                                                                    className={cn(
                                                                        "w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all",
                                                                        selectedStore === store.id
                                                                            ? "bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 font-bold"
                                                                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                                                    )}
                                                                >
                                                                    <span>{store.label}</span>
                                                                    {selectedStore === store.id && <Check size={14} className="text-blue-600" />}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0 ml-auto">
                                <button className="hidden sm:flex items-center gap-1 px-1.5 py-1 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md text-[11px] font-semibold transition-all h-7 shrink-0">
                                    <Globe size={13} />
                                    <span>EN</span>
                                </button>
                                <div className="hidden sm:block h-3 w-px bg-slate-200 dark:bg-slate-800 mx-0.5 shrink-0" />

                                {/* Theme Toggle */}
                                <button
                                    onClick={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
                                    className="w-7 h-7 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors shrink-0"
                                    title={theme === 'light' ? "Switch to Dark Mode" : "Switch to Light Mode"}
                                >
                                    {theme === 'light' ? <Moon size={13} /> : <Sun size={13} />}
                                </button>

                                <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block mx-0.5 shrink-0" />
                                <button className="w-7 h-7 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full relative shrink-0">
                                    <Bell size={13} />
                                    <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-950" />
                                </button>
                                <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-0.5 sm:mx-1 shrink-0" />

                                {/* Profile Menu */}
                                <div className="relative" ref={profileMenuRef}>
                                    <button
                                        onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                                        className="p-0.5 rounded-full hover:ring-2 hover:ring-slate-200 dark:hover:ring-slate-800 transition-all outline-none focus-visible:ring-2 focus-visible:ring-blue-500 shrink-0"
                                    >
                                        <div className="w-[30px] h-[30px] rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold text-xs ring-1 ring-slate-200 dark:ring-slate-700">
                                            AB
                                        </div>
                                    </button>

                                    {isProfileMenuOpen && (
                                        <div className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg z-[110] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                            <div className="p-4 border-b border-slate-100 dark:border-slate-800/50 flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold text-sm ring-1 ring-slate-200 dark:ring-slate-700">
                                                    AB
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">Atil Bilge</p>
                                                    <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate">atil.bilge@eva.guru</p>
                                                </div>
                                            </div>
                                            <div className="p-1.5 flex flex-col gap-0.5">
                                                <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                                                    <Settings size={15} className="text-slate-400" />
                                                    Settings
                                                </button>
                                                <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 dark:hover:text-red-400 transition-colors group">
                                                    <LogOut size={15} className="text-slate-400 group-hover:text-red-500" />
                                                    Logout
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </header>}

                    <div id="main-content-scroll" className={cn(
                        "flex-1 overflow-y-auto w-full custom-scrollbar relative overflow-x-hidden",
                        userRole === 'new_customer' ? "p-0 flex items-center justify-center bg-white dark:bg-slate-950" : "px-8"
                    )}>
                        <div className={cn("w-full pt-8 pb-12 overflow-visible", userRole === 'new_customer' ? "max-w-4xl" : "max-w-7xl mx-auto")}>
                            <div className="flex flex-col gap-8 overflow-visible">
                                 {selectedPackage === 'no_package_after_trial' ? (
                                    <div className="flex-1 flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-700">
                                        <div className="w-28 h-28 rounded-[2rem] bg-white dark:bg-slate-900 flex items-center justify-center mb-10 shadow-2xl border border-slate-100 dark:border-slate-800 relative group">
                                            <div className="absolute inset-0 bg-blue-500/5 rounded-[2rem] blur-2xl group-hover:bg-blue-500/10 transition-colors" />
                                            <div className="w-20 h-20 rounded-3xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center shadow-inner relative z-10 border border-white dark:border-slate-700">
                                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 1L14.5 3.5H18.5V7.5L21 10L19.5 12L21 14L18.5 16.5V20.5H14.5L12 23L9.5 20.5H5.5V16.5L3 14L4.5 12L3 10L5.5 7.5V3.5H9.5L12 1Z" fill="#94a3b8" />
                                                    <path d="M9 12L11 14L15 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                        </div>
                                        <h1 className="text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">Get full access of Eva</h1>
                                        <p className="text-xl text-slate-500 dark:text-slate-400 max-w-lg font-medium leading-relaxed px-4">
                                            Unlock the complete Eva experience for enhanced insights and powerful capabilities.
                                        </p>
                                        <button 
                                            onClick={() => setIsPricingDialogOpen(true)}
                                            className="mt-12 group relative flex items-center gap-3 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-lg transition-all hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-10 transition-opacity" />
                                            <Package size={20} />
                                            Upgrade Now
                                            <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </button>
                                    </div>
                                 ) : currentPage === 'account-detail' ? (
                                    <AccountDetail
                                        account={selectedAccount}
                                        onBack={() => {
                                            setSelectedAccount(null);
                                            setCurrentPage('dashboard');
                                        }}
                                        onNavigateTasks={() => setCurrentPage('tasks')}
                                        onNavigateAnalytics={(model) => {
                                            // Transition from new_customer wizard to amazon_customer analytics
                                            const acme = data.find((a: any) => a.name === 'Acme Corp');
                                            if (acme) setSelectedAccount(acme);
                                            setUserRole('amazon_customer');
                                            setSelectedPlatforms(['Amazon']);
                                            setAmazonAccountType(model);
                                            setSelectedAccountTypes([model]);
                                            setIsFetchingAmazonData(true);
                                            setCurrentPage('analytics');
                                            setIsAmazonPage(false);
                                        }}
                                        userRole={userRole}
                                        onAmazonPage={setIsAmazonPage}
                                    />
                                ) : currentPage === 'tasks' ? (
                                    renderTasks()
                                ) : currentPage === 'analytics' ? (
                                    renderAnalytics()
                                ) : currentPage === 'clients' ? (
                                    renderClients()
                                ) : currentPage === 'chats' ? (
                                    renderChats()
                                ) : currentPage === 'reimbursement-analytics' ? (
                                    <ReimbursementAnalytics 
                                        onTabChange={(tab) => setReimbursementTab(tab)} 
                                        selectedPackage={selectedPackage}
                                    />
                                ) : currentPage === 'lists' ? (
                                    <ListsPage onViewHistory={() => setCurrentPage('settings')} />
                                ) : currentPage === 'segments' ? (
                                    <SegmentsPage 
                                        segments={segments}
                                        onOpenBuilder={() => setCurrentPage('segment-builder')} 
                                    />
                                ) : currentPage === 'segment-builder' ? (
                                    <SegmentBuilderPage 
                                        onBack={() => setCurrentPage('segments')} 
                                        onSave={handleSaveSegment}
                                    />
                                ) : currentPage === 'settings' ? (
                                    <SettingsPage onBack={() => setCurrentPage('dashboard')} />
                                ) : (
                                    <Dashboard />
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <PrototypeMenu 
                onPackageChange={(pkg) => setSelectedPackage(pkg)}
                onRoleChange={(roleId) => {
                setUserRole(roleId);
                if (roleId === 'eva_personel' || roleId === 'eva_admin') {
                    setSelectedAccount(null);
                    setCurrentPage('dashboard');
                    setSelectedPlatforms(['Amazon', 'Shopify', 'TikTok']);
                } else if (roleId === 'new_customer') {
                    const acme = data.find(a => a.name === 'Acme Corp');
                    if (acme) {
                        // Create a simulated NEW customer version with no projects/stores
                        const newAcme = {
                            ...acme,
                            projects: [],
                            mrr: 0,
                            salesL30: 0,
                            salesP30: 0,
                            salesL7: 0,
                            salesP7: 0,
                            subs: 0,
                            adEngineStatus: 'NA' as AdEngineStatus
                        };
                        setSelectedAccount(newAcme);
                        setCurrentPage('account-detail');
                        setIsAccountSelectorOpen(false);
                    }
                } else {
                    if (data && data.length > 0) {
                        setSelectedAccount(data[0]);
                        setCurrentPage('analytics');
                        setIsAccountSelectorOpen(false);
                    }
                    if (roleId === 'amazon_customer') {
                        setSelectedPlatforms(['Amazon']);
                    } else if (roleId === 'shopify_customer') {
                        setSelectedPlatforms(['Shopify']);
                    } else if (roleId === 'multichannel_customer') {
                        setSelectedPlatforms(['Amazon', 'Shopify']);
                    } else {
                        setSelectedPlatforms(['Amazon', 'Shopify', 'Tiktok']);
                    }
                    if (roleId === 'shopify_customer' || roleId === 'multichannel_customer') {
                        setAnalyticsTab('product');
                    }
                }
            }} />
            <ProfitBreakdownDialog 
                isOpen={showProfitBreakdown} 
                onClose={() => setShowProfitBreakdown(false)} 
            />
            <SalesBreakdownDialog 
                isOpen={showSalesBreakdown} 
                onClose={() => setShowSalesBreakdown(false)} 
            />
                    <ExpenseBreakdownDialog 
                        isOpen={showExpenseBreakdown} 
                        onClose={() => setShowExpenseBreakdown(false)} 
                    />

                    {/* Pricing Dialog */}
                    {isPricingDialogOpen && (
                        <div className="fixed inset-0 z-[99999] bg-[#0A0A0F] overflow-auto animate-in fade-in duration-300">
                            <PricingPage onClose={() => setIsPricingDialogOpen(false)} />
                        </div>
                    )}
                </div> {/* flex flex-col */}
            </>
        )}
        </TooltipProvider>
    );
}
