import React, { useState, useMemo } from 'react';
import { getEmailHTML } from './emailTemplate';
import {
    Building2,
    ExternalLink,
    MoreHorizontal,
    ChevronDown,
    Phone,
    Mail,
    Globe,
    Star,
    Plus,
    Search,
    GripVertical,
    Calendar,
    DollarSign,
    BarChart3,
    Box,
    Layout,
    Layers,
    CheckCircle2,
    Clock,
    ArrowUpRight,
    ArrowDownRight,
    X,
    FileText,
    MessageCircle,
    Video,
    ChevronLeft,
    ChevronRight,
    Ticket,
    User,
    Info,
    Edit,
    ArrowUp,
    ArrowDown,
    Minus,
    RotateCcw,
    Download,
    Trash2,
    ShieldAlert,
    AlertCircle,
    Upload,
    MessageSquare,
    HelpCircle,
    Paperclip,
} from 'lucide-react';
import { TASKS_DATA, Task } from './App';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./components/Tooltip";
import { TeamManagementDialog } from './components/TeamManagementDialog';
import { RiskManagementDialog } from './components/RiskManagementDialog';
import { ConnectionWizard } from './components/ConnectionWizard';

import { HelpLink } from './components/HelpLink';

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');
 
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

const RISKS: any[] = [
    { name: "Black", hex: "#000000", bg: "#000000", border: "#334155", desc: "Cancellation Requested: Formal request, long-term unresponsiveness, or unpaid invoices." },
    { name: "Red", hex: "#be123c", bg: "#fff1f2", border: "#ffe4e6", desc: "Critical Risk: The customer is dissatisfied, disengaged, or critical issues are at risk." },
    { name: "Orange", hex: "#f97316", bg: "#fff7ed", border: "#ffedd5", desc: "Service Suspension: Temporary pause (max 8 weeks) due to client or operational reasons." },
    { name: "Yellow", hex: "#eab308", bg: "#fefce8", border: "#fef08a", desc: "Early Warning: Internal team is dissatisfied with performance trends (Ad Spend/Sales) or payment issues." },
    { name: "Green", hex: "#10b981", bg: "#ecfdf5", border: "#ccfbf1", desc: "Strong Performance: Healthy relationship, growth targets met, and communicative client." },
    { name: "Blue", hex: "#3b82f6", bg: "#eff6ff", border: "#dbeafe", desc: "Cancellation Confirmed: Management confirmed cancellation after all save efforts failed." },
    { name: "White", hex: "#ffffff", bg: "#ffffff", border: "#e5e7eb", desc: "Not Yet Started: Client signed but meaningful launch activity has not yet commenced." },
    { name: "None", hex: "#9ca3af", bg: "rgba(156, 163, 175, 0.1)", border: "#f3f4f6", desc: "Not Updated: Status has not been set for the current reporting week." }
];

const WOW_CHANGES: any[] = [
    { type: "Positive", label: "Positive", desc: "Risk level decreased; the account moved to a better position compared to last week", class: "bg-emerald-600/15 text-emerald-700 border border-emerald-600/30 font-bold" },
    { type: "Negative", label: "Negative", desc: "Risk level increased; the account moved to a higher risk position compared to last week", class: "bg-red-600/15 text-red-700 border border-red-600/30 font-bold" },
    { type: "None", label: "No Change", desc: "Risk level remained the same as last week", class: "bg-slate-600/15 text-slate-700 border border-dashed border-slate-600/30 font-bold" }
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

const AM_NAMES = ["A. Johnson", "B. Smith", "C. Lee", "D. Brown", "E. Davis", "F. Wilson"];
const CSM_NAMES = ["G. Martinez", "H. Anderson", "I. Thomas", "J. Jackson", "K. White", "L. Harris"];
const BRAND_NAMES = ["S. Rogers", "B. Banner", "T. Stark", "N. Romanoff", "P. Quill"];
const CARE_NAMES = ["C. Danvers", "W. Maximoff", "S. Strange", "T. Challa", "O. Okoye"];
const DESIGNER_NAMES = ["P. Parker", "M. Morales", "G. Stacy", "B. Reilly", "K. Bishop"];

const COLUMN_LIST = [
    { id: 'project', label: 'Project / Name', desc: 'Primary service category' },
    { id: 'ad_engine_status', label: 'Ad Engine Status', desc: 'PPC Activity Status (Active/Passive/NA)' },
    { id: 'subscriptions', label: 'Subscriptions', desc: 'Active platform services' },
    { id: 'mrr', label: 'MRR', align: 'right', desc: 'Monthly Recurring Revenue' },
    { id: 'risk', label: 'Current Risk', desc: 'Present risk classification' },
    { id: 'wow', label: 'Wow Change', desc: 'Week over Week status change' },
    { id: 'lifetime', label: 'Lifetime', align: 'right', desc: 'Months since project start' },
    { id: 'l30_p30', label: 'L30D / P30D', align: 'right', desc: 'Last 30 days vs Previous 30 days' },
    { id: 'l7_p7', label: 'L7D / P7D', align: 'right', desc: 'Last 7 days vs Previous 7 days' },
    { id: 'am', label: 'Advertising Manager', desc: 'Assigned Ad Manager' },
    { id: 'bm', label: 'Brand Manager', desc: 'Assigned Brand Manager' },
    { id: 'csm', label: 'Care Manager', desc: 'Assigned Care Manager' },
    { id: 'cm', label: 'Escalation Manager', desc: 'Assigned Escalation Manager' },
    { id: 'gd', label: 'Graphic Designer', desc: 'Assigned Graphic Designer' },
    { id: 'createdAt', label: 'Created At', desc: 'Project initialization date' },
    { id: 'customerUpdateStatus', label: 'Weekly Update', desc: 'Status of weekly customer report' },
];

// --- Sub-components for Table ---

const Badge = ({ children, className, style, ...props }: { children: React.ReactNode, className?: string, style?: React.CSSProperties } & React.HTMLAttributes<HTMLSpanElement>) => (
    <span
        className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold transition-all border", className)}
        style={style}
        {...props}
    >
        {children}
    </span>
);

const RiskBadge = ({ risk, onUpdate }: { risk: any, onUpdate?: () => void }) => {
    const isWhite = risk.name.toLowerCase() === 'white';
    const isBlack = risk.name.toLowerCase() === 'black';
    const isNone = risk.name.toLowerCase() === 'none';
    const borderColor = isWhite ? '#e5e7eb' : (isBlack ? 'rgba(255,255,255,0.1)' : (risk.border || 'rgba(0,0,0,0.1)'));
    const dotBorder = isWhite ? '#d1d5db' : (isBlack ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.08)');
    const textColor = isBlack ? '#ffffff' : (isWhite ? 'inherit' : risk.hex);
    const dotColor = isBlack ? '#ffffff' : risk.hex;
    const borderStyle = isNone ? 'dashed' : 'solid';

    return (
        <TooltipProvider>
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
        </TooltipProvider>
    );
};

const WowBadge = ({ wow }: { wow: any }) => {
    const Icon = wow.type === "Positive" ? ArrowUpRight : (wow.type === "Negative" ? ArrowDownRight : Minus);
    return (
        <Badge className={wow.class} style={{ borderWidth: '0.5px' }}>
            <Icon size={10} strokeWidth={3} className="opacity-80" />
            {wow.label}
        </Badge>
    );
};

const SubscriptionList = ({ subs }: { subs: any[] }) => {
    const [expanded, setExpanded] = useState(false);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Active': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
            case 'Suspended': return 'bg-amber-50 text-amber-700 border-amber-100';
            case 'Cancelled': return 'bg-slate-50 text-slate-500 border-slate-100';
            default: return 'bg-blue-50 text-blue-700 border-blue-100';
        }
    };

    if (!subs || subs.length === 0) return <span className="text-slate-300">-</span>;

    const renderBadge = (sub: any) => (
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


export default function AccountDetail({ onBack, account, onNavigateTasks, onNavigateAnalytics, userRole = 'eva_personel', onAmazonPage }: { onBack?: () => void, account: any, onNavigateTasks?: () => void, onNavigateAnalytics?: (model: 'Seller' | 'Vendor') => void, userRole?: string, onAmazonPage?: (showing: boolean) => void }) {
    const [localProjects, setLocalProjects] = useState<any[]>(account.projects || []);
    const [activeMainTab, setActiveMainTab] = useState('Projects');
    const [activeTab, setActiveTab] = useState('Tasks/Meetings');
    const [projectSubTab, setProjectSubTab] = useState<'projects' | 'subscriptions'>('projects');
    const [isWizardOpen, setIsWizardOpen] = useState(false);

    // Risk Update Dialog States
    const [isRiskUpdateOpen, setIsRiskUpdateOpen] = useState(false);
    const [updatingProject, setUpdatingProject] = useState<any>(null);
    const [selectedNewRisk, setSelectedNewRisk] = useState<any>(null);
    const [riskNotes, setRiskNotes] = useState('');
    const [dialogTab, setDialogTab] = useState<'internal' | 'customer'>('internal');
    const [selectedFactors, setSelectedFactors] = useState<Set<string>>(new Set());
    const [riskGuideOpen, setRiskGuideOpen] = useState(false);

    const [customerUpdateContent, setCustomerUpdateContent] = useState('');
    const [customerUpdateStatus, setCustomerUpdateStatus] = useState<'blank' | 'draft' | 'sent'>('blank');
    const [customerUpdateSentAt, setCustomerUpdateSentAt] = useState<string | undefined>();
    const [toEmail, setToEmail] = useState('');
    const [contactName, setContactName] = useState('');

    // Team Dialog States
    const [editingTeamProject, setEditingTeamProject] = useState<any>(null);
    const [editingTeamRole, setEditingTeamRole] = useState<'am' | 'bm' | 'csm' | 'cm' | 'gd' | null>(null);
    const [isTeamDialogOpen, setIsTeamDialogOpen] = useState(false);
    const [teamSearch, setTeamSearch] = useState('');
    const [tempSelectedMembers, setTempSelectedMembers] = useState<string[]>([]);

    const handleRiskUpdate = (project: any) => {
        setUpdatingProject(project);
        setSelectedNewRisk(project.risk);
        setRiskNotes(project.notes || '');
        setCustomerUpdateStatus(project.customerUpdateStatus || 'blank');
        setCustomerUpdateContent(project.customerUpdateContent || '');
        setCustomerUpdateSentAt(project.customerUpdateSentAt);
        setToEmail(project.contactEmail || '');
        setContactName(project.contactName || '');
        setSelectedFactors(new Set());
        setDialogTab('internal');
        setIsRiskUpdateOpen(true);
    };

    const handleTeamClick = (project: any, role: 'am' | 'bm' | 'csm' | 'cm' | 'gd') => {
        setEditingTeamProject(project);
        setEditingTeamRole(role);
        setTeamSearch('');
        const currentVal = project[role];
        setTempSelectedMembers(currentVal ? currentVal.split(/,\s*/).filter(Boolean) : []);
        setIsTeamDialogOpen(true);
    };

    const handleSaveTeam = () => {
        if (!editingTeamProject || !editingTeamRole) return;
        const newVal = tempSelectedMembers.join(', ');
        setLocalProjects(prev => prev.map(p => p.id === editingTeamProject.id ? { ...p, [editingTeamRole]: newVal } : p));
        setIsTeamDialogOpen(false);
    };

    const toggleTeamMember = (name: string) => {
        const isSingleOnly = editingTeamRole === 'am' || editingTeamRole === 'bm' || editingTeamRole === 'cm';
        setTempSelectedMembers(prev => {
            if (prev.includes(name)) return prev.filter(n => n !== name);
            if (isSingleOnly) return [name];
            return [...prev, name];
        });
    };

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

    const handleSaveRisk = () => {
        if (!updatingProject || !selectedNewRisk) return;
        setLocalProjects(prev => prev.map(p => p.id === updatingProject.id ? { ...p, risk: selectedNewRisk, notes: riskNotes } : p));
        setIsRiskUpdateOpen(false);
    };

    const handleSendUpdate = () => {
        if (!updatingProject) return;
        // Mock sending
        console.log("Sending weekly update for", updatingProject.name);
        setCustomerUpdateStatus('sent');
        setCustomerUpdateSentAt(new Date().toLocaleString());
        setLocalProjects(prev => prev.map(p => p.id === updatingProject.id ? { ...p, customerUpdateStatus: 'sent', customerUpdateSentAt: new Date().toLocaleString(), customerUpdateContent } : p));
        setIsRiskUpdateOpen(false);
    };

    const handleGetTemplate = () => {
        if (!updatingProject) return;
        const html = getEmailHTML(updatingProject.name, 'Week');
        setCustomerUpdateContent(html);
        setCustomerUpdateStatus('draft');
    };

    if (!account) return <div className="p-20 text-center font-bold text-slate-400">No account selected.</div>;

    const totalOpenTasks = account.projects?.reduce((sum: number, p: any) => sum + (p.openTasks || 0), 0) || 0;
    const totalOpenTickets = account.projects?.reduce((sum: number, p: any) => sum + (p.openTickets || 0), 0) || 0;
    const totalOverdueTasks = account.projects?.reduce((sum: number, p: any) => sum + (p.overdueTasks || 0), 0) || 0;
    const totalOverdueTickets = account.projects?.reduce((sum: number, p: any) => sum + (p.overdueTickets || 0), 0) || 0;
    const contacts = [
        { firstName: 'Cemil', lastName: 'Karaca', primary: true, email: 'cemil.karaca@karaca.com', altEmail: '-', phone: '-', callCode: '-', countryCode: '-', timezone: '-', altPhone: '-', altCallCode: '-', verified: true, admin: false, type: 'Platform User', linkedin: '-', noContact: false, noContactReason: '-', desc: '-', updated: '02/26/2026' },
        { firstName: 'Ayşe', lastName: 'Yılmaz', primary: false, email: 'ayse.yilmaz@karaca.com', altEmail: '-', phone: '-', callCode: '-', countryCode: '-', timezone: '-', altPhone: '-', altCallCode: '-', verified: false, admin: false, type: 'Platform User', linkedin: '-', noContact: false, noContactReason: '-', desc: '-', updated: '02/24/2026' },
        { firstName: 'Kerem', lastName: 'Atar', primary: false, email: 'kerem.atar@karaca.com', altEmail: '-', phone: '5351234567', callCode: '+90', countryCode: 'TR', timezone: 'GMT+3', altPhone: '-', altCallCode: '-', verified: true, admin: false, type: 'Platform User', linkedin: '-', noContact: false, noContactReason: '-', desc: '-', updated: '02/20/2026' },
        { firstName: 'Zeynep', lastName: 'Günay', primary: false, email: 'zeynep.gunay@karaca.com', altEmail: '-', phone: '-', callCode: '-', countryCode: '-', timezone: '-', altPhone: '-', altCallCode: '-', verified: true, admin: true, type: 'admin', linkedin: '-', noContact: true, noContactReason: 'Left company', desc: '-', updated: '01/15/2026' },
        { firstName: 'Burak', lastName: 'Yılmaz', primary: false, email: 'burak.yilmaz@karaca.com', altEmail: '-', phone: '-', callCode: '-', countryCode: '-', timezone: '-', altPhone: '-', altCallCode: '-', verified: true, admin: false, type: 'Platform User', linkedin: '-', noContact: false, noContactReason: '-', desc: '-', updated: '02/10/2026' }
    ];

    const primaryContact = contacts.find((c: any) => c.primary) || contacts[0];
    const mainContactName = primaryContact ? `${primaryContact.firstName} ${primaryContact.lastName}` : 'Main Contact';

    if (userRole === 'new_customer') {
        if (isWizardOpen) {
            return (
                <div className="flex flex-col items-center justify-center min-h-screen w-full bg-slate-50 dark:bg-slate-950 p-6">
                    <ConnectionWizard 
                        onClose={() => setIsWizardOpen(false)} 
                        onComplete={() => {
                            setIsWizardOpen(false);
                            if (onBack) onBack();
                        }}
                        onAmazonPage={onAmazonPage}
                        onNavigateAnalytics={(type) => {
                            setIsWizardOpen(false);
                            if (onNavigateAnalytics) onNavigateAnalytics(type);
                        }}
                        needsAccountName={!account.name || account.name === 'Acme Corp'} // Simulating requirement
                    />
                </div>
            );
        }

        return (
            <div className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-4xl mx-auto p-6 animate-in fade-in zoom-in-95 duration-700">
                <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[40px] p-16 shadow-2xl shadow-blue-500/5 flex flex-col items-center text-center gap-10 relative overflow-hidden">
                    {/* Background Decorative Elements */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-blue-600 to-indigo-600"></div>
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-50 dark:bg-blue-900/10 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-50 dark:bg-indigo-900/10 rounded-full blur-3xl"></div>

                    <div className="w-32 h-32 rounded-[40px] bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 relative shadow-inner">
                        <div className="absolute inset-4 bg-blue-600/10 rounded-[24px] animate-pulse"></div>
                        <AmazonIcon className="w-16 h-16 relative z-10" />
                        <div className="absolute -bottom-3 -right-3 w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-white flex items-center justify-center border-4 border-white dark:border-slate-900 shadow-xl rotate-12">
                            <Plus size={24} strokeWidth={4} />
                        </div>
                    </div>

                    <div className="space-y-4 max-w-lg">
                        <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Connect your Amazon Store</h3>
                        <p className="text-lg font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                            Welcome to Eva! To start managing your brand and optimizing your sales performance, please connect your primary marketplace.
                        </p>
                    </div>

                    <div className="flex flex-col gap-6 w-full max-w-sm">
                        <button 
                            onClick={() => setIsWizardOpen(true)}
                            className="flex items-center justify-center gap-3 w-full py-5 bg-[#0084FF] hover:bg-[#0076E5] text-white text-lg font-black rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,132,255,0.4)] transition-all hover:scale-[1.02] active:scale-95 group"
                        >
                            <span>Connect Now</span>
                            <ArrowUpRight size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                        
                        <div className="flex items-center gap-4 py-2">
                            <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800"></div>
                            <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Other Platforms</span>
                            <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800"></div>
                        </div>

                        <div className="flex items-center justify-center gap-8">
                            <div className="flex flex-col items-center gap-2 group cursor-pointer">
                                <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:border-blue-200 transition-all shadow-sm">
                                    <ShopifyIcon className="w-7 h-7" />
                                </div>
                                <span className="text-[10px] font-bold text-slate-400 group-hover:text-slate-600 uppercase tracking-widest transition-colors">Shopify</span>
                            </div>
                            <div className="flex flex-col items-center gap-2 group cursor-pointer">
                                <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:border-blue-200 transition-all shadow-sm">
                                    <TikTokIcon className="w-7 h-7" />
                                </div>
                                <span className="text-[10px] font-bold text-slate-400 group-hover:text-slate-600 uppercase tracking-widest transition-colors">TikTok</span>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 mt-4 border-t border-slate-50 dark:border-slate-800/50 w-full">
                        <p className="text-xs text-slate-400 font-medium italic">
                            Secure connection via official Amazon SP-API. Eva does not store your password.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 -mt-8">
            {/* 1) STICKY PAGE HEADER */}
            <header className="sticky top-0 z-[50] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 -mx-8 px-8 py-3 mb-0 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 space-y-4">
                    {/* ROW 1: Meta & Actions */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 min-w-0">
                            <button
                                onClick={onBack}
                                className="p-1.5 -ml-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-all shrink-0"
                                title="Back to Dashboard"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-2">
                                        <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight truncate">{account.name}</h1>
                                        <HelpLink />
                                    </div>
                                    <span className={cn(
                                        "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border shrink-0",
                                        account.status === 'Customer' ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800/50" :
                                            account.status === 'Prospect' ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-800/50" :
                                                account.status === 'Suspect' ? "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-800/50" :
                                                    "bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700"
                                    )}>
                                        {account.status || 'Customer'}
                                    </span>
                                    <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase border border-slate-200 dark:border-slate-700 shrink-0">
                                        Home & Kitchen
                                    </span>
                                    {account.adEngineStatus && (
                                        <Badge className={cn(
                                            "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border whitespace-nowrap drop-shadow-sm",
                                            account.adEngineStatus === 'Active'
                                                ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800/50"
                                                : account.adEngineStatus === 'Passive'
                                                    ? "bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-800/50"
                                                    : "bg-slate-50 dark:bg-slate-900/40 text-slate-500 dark:text-slate-400 border-slate-100 dark:border-slate-800/50"
                                        )}>
                                            Ad Engine: {account.adEngineStatus}
                                        </Badge>
                                    )}
                                </div>
                                <div className="flex items-center gap-4 mt-0.5">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <div className="flex items-center gap-1.5 group cursor-pointer shrink-0">
                                                    <div className="w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-[8px] font-bold text-blue-600 dark:text-blue-400">SJ</div>
                                                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium group-hover:text-slate-900 dark:group-hover:text-white">Sarah Jenkins</span>
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent side="bottom" className="text-[10px] font-medium p-2 bg-slate-900 text-white border-none">
                                                <p className="font-bold">Sales & eCommerce Director</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>

                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <div
                                                    onClick={() => setActiveMainTab('Contacts')}
                                                    className="flex items-center gap-1.5 group cursor-pointer shrink-0 border-l border-slate-200 dark:border-slate-800 pl-4 ml-0"
                                                >
                                                    <div className="w-4 h-4 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                                        <User size={11} />
                                                    </div>
                                                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                        {mainContactName}
                                                    </span>
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent side="bottom" className="text-[10px] font-medium p-2 bg-slate-900 text-white border-none">
                                                <p className="font-bold">Main Contact</p>
                                                <p className="opacity-70 mt-0.5">Click to see all contacts</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>

                                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors cursor-pointer shrink-0 border-l border-slate-200 dark:border-slate-800 pl-4 ml-0">
                                        <Globe size={11} />
                                        <span className="font-medium">{account.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button className="px-5 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-95">Edit</button>
                            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"><MoreHorizontal size={20} /></button>
                        </div>
                    </div>

                    {/* ROW 2: KPI Strip */}
                    <div className="flex items-center gap-6 overflow-x-auto no-scrollbar py-0.5 mt-2 border-t border-slate-100 dark:border-slate-800 pt-3">
                        <TooltipProvider>
                            {/* MRR BLOCK */}
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg border border-blue-100 dark:border-blue-800/50 shrink-0 shadow-sm cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
                                <DollarSign size={14} className="opacity-70" />
                                <div className="flex flex-col -gap-0.5">
                                    <span className="text-xs font-black tabular-nums leading-none">${account.mrr?.toLocaleString()}</span>
                                    <span className="text-[8px] font-bold uppercase tracking-widest opacity-60">Account MRR</span>
                                </div>
                            </div>

                            <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 shrink-0 mx-1" />

                            {/* COMPACT PROJECTS & SUBS */}
                            <div
                                onClick={() => setActiveMainTab('Projects')}
                                className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/50 px-3 py-1.5 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group shrink-0"
                            >
                                <div className="flex items-center gap-2.5">
                                    <Layers size={13} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                                    <div className="flex flex-col">
                                        <span className="text-xs font-black leading-none text-slate-900 dark:text-white">{account.projects?.length || 0} <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Projects</span></span>
                                    </div>
                                </div>
                                <div className="w-px h-6 bg-slate-200 dark:bg-slate-700" />
                                <div className="flex items-center gap-2.5">
                                    <Box size={13} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                                    <div className="flex flex-col">
                                        <span className="text-xs font-black leading-none text-slate-900 dark:text-white">{account.subs || 0} <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Subs</span></span>
                                    </div>
                                </div>
                            </div>

                            {/* COMPACT TASKS & TICKETS */}
                            <div
                                onClick={onNavigateTasks}
                                className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/50 px-3 py-1.5 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all cursor-pointer group shrink-0"
                            >
                                <div className="flex items-center gap-2.5">
                                    <CheckCircle2 size={13} className={cn("transition-colors", totalOverdueTasks > 0 ? "text-rose-500" : "text-slate-400 group-hover:text-emerald-500")} />
                                    <div className="flex flex-col">
                                        <span className={cn("text-xs font-black leading-none text-slate-900 dark:text-white", totalOverdueTasks > 0 && "text-rose-600")}>{totalOpenTasks} <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Tasks</span></span>
                                    </div>
                                </div>
                                <div className="w-px h-6 bg-slate-200 dark:bg-slate-700" />
                                <div className="flex items-center gap-2.5">
                                    <Ticket size={13} className={cn("transition-colors", totalOverdueTickets > 0 ? "text-rose-500" : "text-slate-400 group-hover:text-blue-500")} />
                                    <div className="flex flex-col">
                                        <span className={cn("text-xs font-black leading-none text-slate-900 dark:text-white", totalOverdueTickets > 0 && "text-rose-600")}>{totalOpenTickets} <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Tickets</span></span>
                                    </div>
                                </div>
                            </div>

                            <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 shrink-0 mx-1" />

                            {[
                                { icon: Clock, label: 'Lifetime', value: `${account.lifetime}mo`, sub: `Customer since ${account.createdAt}`, color: 'text-slate-700 dark:text-slate-200' },
                                { icon: BarChart3, label: 'Amazon Product', value: '1.2k', sub: 'Total Catalog (Amazon)', color: 'text-orange-600 dark:text-orange-400', onClick: () => onNavigateAnalytics?.('Seller') },
                                { icon: BarChart3, label: 'Shopify Product', value: '1.2k', sub: 'Total Catalog (Shopify)', color: 'text-emerald-600 dark:text-emerald-400', onClick: () => onNavigateAnalytics?.('Seller') },
                            ].map((kpi, i) => (
                                <Tooltip key={i}>
                                    <TooltipTrigger asChild>
                                        <div
                                            onClick={kpi.onClick}
                                            className={cn(
                                                "flex items-center gap-3 shrink-0 group/kpi cursor-help transition-all",
                                                kpi.onClick && "hover:bg-slate-50 dark:hover:bg-slate-800/50 px-2 py-1 -mx-2 rounded-xl"
                                            )}
                                        >
                                            <div className={cn("p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 shadow-sm transition-colors group-hover/kpi:bg-white dark:group-hover/kpi:bg-slate-800", kpi.color)}>
                                                {/* @ts-ignore */}
                                                <kpi.icon size={13} />
                                            </div>
                                            <div className="flex flex-col -gap-1">
                                                <div className="flex items-center gap-1.5">
                                                    <span className={cn("text-xs font-black leading-none", kpi.color)}>{kpi.value}</span>
                                                </div>
                                                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{kpi.label}</span>
                                            </div>
                                            {i < 2 && <div className="h-4 w-px bg-slate-100 dark:bg-slate-800 ml-3" />}
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent side="bottom" className="text-[10px] font-bold">
                                        {kpi.sub}
                                        {kpi.onClick && <span className="block mt-1 text-blue-500 opacity-80">Click to View Details</span>}
                                    </TooltipContent>
                                </Tooltip>
                            ))}
                        </TooltipProvider>
                    </div>

                    {/* ROW 3: Main Navigation Tabs */}
                    <div className="flex items-center gap-8 mt-4 border-t border-slate-100 dark:border-slate-800 pt-3">
                        {[
                            { id: 'Projects', label: 'Projects & Subscriptions' },
                            { id: 'Contacts', label: 'Contacts' },
                            { id: 'Stores', label: 'Stores' },
                            { id: 'Invoices', label: 'Invoices' },
                            { id: 'Activities', label: 'Activities' },
                            { id: 'Misc', label: 'Misc' },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveMainTab(tab.id)}
                                className={cn(
                                    "pb-3 text-xs font-bold tracking-tight transition-all relative",
                                    activeMainTab === tab.id
                                        ? "text-blue-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600"
                                        : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                                )}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                <div className="flex flex-col gap-8">
                    {activeMainTab === 'Projects' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <section className="space-y-6">
                                <div className="flex items-center justify-between py-3 -mx-2 px-2">
                                    <div className="flex items-center gap-4">
                                        <div className="w-1.5 h-6 rounded-full bg-gradient-to-b from-blue-600 to-indigo-600 shadow-sm shadow-blue-500/50" />
                                        <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">Projects & Subscriptions</h2>
                                    </div>
                                    <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl w-fit">
                                        <button
                                            onClick={() => setProjectSubTab('projects')}
                                            className={cn(
                                                "px-4 py-1.5 text-xs font-bold rounded-lg transition-all",
                                                projectSubTab === 'projects' ? "bg-white dark:bg-slate-700 text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700 dark:text-slate-400"
                                            )}
                                        >
                                            Projects
                                        </button>
                                        <button
                                            onClick={() => setProjectSubTab('subscriptions')}
                                            className={cn(
                                                "px-4 py-1.5 text-xs font-bold rounded-lg transition-all",
                                                projectSubTab === 'subscriptions' ? "bg-white dark:bg-slate-700 text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700 dark:text-slate-400"
                                            )}
                                        >
                                            Subscriptions
                                        </button>
                                    </div>
                                </div>
                                
                                {localProjects.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center p-12 bg-white dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl gap-6 animate-in fade-in zoom-in-95 duration-500">
                                        <div className="w-24 h-24 rounded-3xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 relative">
                                            <div className="absolute inset-0 bg-blue-600/10 rounded-3xl animate-pulse"></div>
                                            <AmazonIcon className="w-12 h-12 relative z-10" />
                                            <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center border-4 border-white dark:border-slate-900 shadow-lg">
                                                <Plus size={16} strokeWidth={3} />
                                            </div>
                                        </div>
                                        <div className="text-center space-y-2 max-w-sm">
                                            <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Connect your Amazon Store</h3>
                                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                                                To start managing your brand and optimizing your sales, you need to connect your primary marketplace.
                                            </p>
                                        </div>
                                        <button className="flex items-center gap-2 px-8 py-4 bg-[#0084FF] hover:bg-[#0076E5] text-white font-black rounded-2xl shadow-[0_10px_25px_-5px_rgba(0,132,255,0.4)] transition-all hover:scale-[1.02] active:scale-95 group">
                                            <span>Connect Now</span>
                                            <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </button>
                                        <div className="flex items-center gap-8 mt-4 pt-6 border-t border-slate-100 dark:border-slate-800 w-full justify-center">
                                            <div className="flex flex-col items-center gap-1 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
                                                <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
                                                    <ShopifyIcon className="w-6 h-6" />
                                                </div>
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Shopify</span>
                                            </div>
                                            <div className="flex flex-col items-center gap-1 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
                                                <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
                                                    <TikTokIcon className="w-6 h-6" />
                                                </div>
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">TikTok</span>
                                            </div>
                                        </div>
                                    </div>
                                ) : projectSubTab === 'projects' ? (
                                    <div className="bg-white dark:bg-slate-900 border rounded-xl shadow-sm overflow-hidden">
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left border-collapse min-w-[1800px]">
                                                <thead>
                                                    <tr className="border-b bg-slate-50/50 dark:bg-slate-800/50">
                                                        {COLUMN_LIST.map((col, i) => (
                                                            <th key={col.id} className={cn(
                                                                "p-4 text-[11px] font-bold text-slate-800 dark:text-slate-200 tracking-wide",
                                                                i === 0 ? "sticky left-0 bg-white dark:bg-slate-800 z-30 border-r dark:border-slate-700 min-w-[200px]" : "min-w-[150px]",
                                                                col.align === 'right' ? "text-right" : "text-left"
                                                            )}>
                                                                <div className={cn("flex items-center gap-1.5", col.align === 'right' ? "justify-end" : "justify-start")}>
                                                                    {col.label}
                                                                    <TooltipProvider>
                                                                        <Tooltip>
                                                                            <TooltipTrigger asChild>
                                                                                <Info size={11} className="text-slate-300 hover:text-slate-400 cursor-help transition-colors" />
                                                                            </TooltipTrigger>
                                                                            <TooltipContent side="top" className="bg-slate-900 text-white border-none p-2 text-[10px] font-medium">
                                                                                {col.desc}
                                                                            </TooltipContent>
                                                                        </Tooltip>
                                                                    </TooltipProvider>
                                                                </div>
                                                            </th>
                                                        ))}
                                                        <th className="p-4 w-16 sticky right-0 bg-slate-50/50 dark:bg-slate-800/50 z-20"></th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y text-slate-700 dark:text-slate-200">
                                                    {(() => {
                                                        const rows: any[] = [];
                                                        localProjects?.forEach((p: any) => rows.push({ ...p, kind: 'project' }));

                                                        // Add Standalone row
                                                        rows.push({
                                                            id: 'standalone-1',
                                                            name: 'Conversion Intelligence',
                                                            kind: 'standalone',
                                                            mrr: 1000,
                                                            risk: { name: 'None', bg: 'rgba(156, 163, 175, 0.1)', hex: '#9ca3af', desc: 'Not Updated' },
                                                            wow: { type: 'None', label: 'No Change', class: 'bg-slate-600/15 text-slate-700 border border-dashed border-slate-600/30 font-bold' },
                                                            subscriptions: [{ name: 'Conversion Intelligence', status: 'Active' }],
                                                            adEngineStatus: account.adEngineStatus || 'NA',
                                                            lifetime: 12,
                                                            createdAt: account.createdAt,
                                                            salesL30: 15000, salesP30: 14000, salesL7: 3500, salesP7: 3200,
                                                            am: 'Sarah Jenkins', bm: 'Ayse Yilmaz', csm: 'Cemil Karaca',
                                                            customerUpdateStatus: 'blank'
                                                        });

                                                        return rows.map((row: any, rIdx: number) => (
                                                            <tr key={row.id || rIdx} className="hover:bg-blue-50/10 transition-colors group">
                                                                {COLUMN_LIST.map((col, cIdx) => {
                                                                    const isSticky = cIdx === 0;
                                                                    const isProjectCol = col.id === 'project';
                                                                    const isStandalone = row.kind === 'standalone';

                                                                    const renderCell = () => {
                                                                        switch (col.id) {
                                                                            case 'project':
                                                                                return (
                                                                                    <div className="flex flex-col">
                                                                                        <div className="flex items-center gap-2">
                                                                                            <span className={cn("text-xs font-bold", isStandalone ? "text-slate-400 italic" : "text-slate-800 dark:text-slate-200")}>
                                                                                                {isStandalone && <span className="mr-2 not-italic text-[9px] uppercase bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">Standalone</span>}
                                                                                                {row.name}
                                                                                            </span>
                                                                                        </div>
                                                                                        {isStandalone && <p className="text-[9px] text-slate-400 mt-0.5 font-medium">No Project Assignment</p>}
                                                                                    </div>
                                                                                );
                                                                            case 'ad_engine_status':
                                                                                return (
                                                                                    <Badge className={cn(
                                                                                        "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border whitespace-nowrap",
                                                                                        (isStandalone ? row.adEngineStatus : account.adEngineStatus) === 'Active'
                                                                                            ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800/50"
                                                                                            : (isStandalone ? row.adEngineStatus : account.adEngineStatus) === 'Passive'
                                                                                                ? "bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-800/50"
                                                                                                : "bg-slate-50 dark:bg-slate-900/40 text-slate-500 dark:text-slate-400 border-slate-100 dark:border-slate-800/50"
                                                                                    )}>
                                                                                        {(isStandalone ? row.adEngineStatus : account.adEngineStatus) || 'NA'}
                                                                                    </Badge>
                                                                                );
                                                                            case 'subscriptions':
                                                                                return <SubscriptionList subs={row.subscriptions} />;
                                                                            case 'mrr':
                                                                                return (
                                                                                    <span className="text-sm font-bold font-mono tracking-tighter text-slate-900 dark:text-slate-100">
                                                                                        ${row.mrr?.toLocaleString()}
                                                                                    </span>
                                                                                );
                                                                            case 'risk':
                                                                                return <RiskBadge risk={row.risk} onUpdate={!isStandalone ? () => handleRiskUpdate(row) : undefined} />;
                                                                            case 'wow':
                                                                                return <WowBadge wow={row.wow} />;
                                                                            case 'lifetime':
                                                                                return <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">{row.lifetime}mo</span>;
                                                                            case 'l30_p30':
                                                                                return <span className="text-xs font-bold font-mono text-slate-600 dark:text-slate-400">%{row.salesP30 > 0 ? ((row.salesL30 / row.salesP30) * 100).toFixed(0) : '0'}</span>;
                                                                            case 'l7_p7':
                                                                                return <span className="text-xs font-bold font-mono text-slate-600 dark:text-slate-200">%{row.salesP7 > 0 ? ((row.salesL7 / row.salesP7) * 100).toFixed(0) : '0'}</span>;
                                                                            case 'am': {
                                                                                const ams = row.am ? row.am.split(', ') : [];
                                                                                return (
                                                                                    <div
                                                                                        onClick={() => !isStandalone && handleTeamClick(row, 'am')}
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
                                                                            }
                                                                            case 'bm': {
                                                                                const bms = row.bm ? row.bm.split(', ') : [];
                                                                                return (
                                                                                    <div
                                                                                        onClick={() => !isStandalone && handleTeamClick(row, 'bm')}
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
                                                                            }
                                                                            case 'csm': {
                                                                                const csms = row.csm ? row.csm.split(', ') : [];
                                                                                return (
                                                                                    <div
                                                                                        onClick={() => !isStandalone && handleTeamClick(row, 'csm')}
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
                                                                            }
                                                                            case 'cm': {
                                                                                const cms = row.cm ? row.cm.split(', ') : [];
                                                                                return (
                                                                                    <div
                                                                                        onClick={() => !isStandalone && handleTeamClick(row, 'cm')}
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
                                                                            }
                                                                            case 'gd': {
                                                                                const gds = row.gd ? row.gd.split(', ') : [];
                                                                                return (
                                                                                    <div
                                                                                        onClick={() => !isStandalone && handleTeamClick(row, 'gd')}
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
                                                                            }
                                                                            case 'createdAt':
                                                                                return <span className="text-xs font-medium whitespace-nowrap">{row.createdAt}</span>;
                                                                            case 'customerUpdateStatus': {
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
                                                                                        {!isStandalone && (
                                                                                            <button
                                                                                                onClick={() => handleRiskUpdate(row)}
                                                                                                className="p-1 rounded-md hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-all opacity-0 group-hover/status:opacity-100"
                                                                                                title="Edit Customer Update"
                                                                                            >
                                                                                                <Edit size={12} />
                                                                                            </button>
                                                                                        )}
                                                                                    </div>
                                                                                );
                                                                            }
                                                                            default:
                                                                                return null;
                                                                        }
                                                                    };

                                                                    return (
                                                                        <td
                                                                            key={col.id}
                                                                            className={cn(
                                                                                "p-4 border-slate-100 dark:border-slate-800 transition-colors",
                                                                                isSticky ? "sticky left-0 z-20 bg-white dark:bg-slate-900 group-hover:bg-slate-50 dark:group-hover:bg-slate-800 border-r" : "border-l border-slate-50 dark:border-slate-800/50",
                                                                                col.align === 'right' ? "text-right" : "text-left"
                                                                            )}
                                                                        >
                                                                            {renderCell()}
                                                                        </td>
                                                                    );
                                                                })}
                                                                <td className="p-4 text-right opacity-0 group-hover:opacity-100 transition-opacity sticky right-0 bg-white dark:bg-slate-900 z-10">
                                                                    <button className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded text-slate-400 hover:text-slate-600"><MoreHorizontal size={16} /></button>
                                                                </td>
                                                            </tr>
                                                        ));
                                                    })()}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="p-4 bg-slate-50/50 dark:bg-slate-800/20 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Revenue Focus • Strategic Performance</p>
                                            <button className="text-xs font-bold text-blue-600 hover:underline">Download Performance Report</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bg-white dark:bg-slate-900 border rounded-xl shadow-sm overflow-hidden">
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left border-collapse min-w-[5000px]">
                                                <thead>
                                                    <tr className="border-b bg-slate-50/50 dark:bg-slate-800/50">
                                                        {[
                                                            "Package Type", "Subscription Type", "Subscription Status", "Subscription Start Date", "Subscription End Date",
                                                            "Status End Date", "Subscription Price", "Subscription Variable Fee", "Retainer Fee", "Commission Rate",
                                                            "Processing Fee Percentage", "Processing Fee Amount", "Free Credit", "Auto Calculate Variable Fee", "Manual Invoiced",
                                                            "Payment Method", "Payment Term", "Bill Day Of Month", "Initial Term", "Subsequent Term", "Is Annual",
                                                            "Renewal Notice Deadline", "Cancellation Notice Period Month", "Cancellation Type", "Cancellation Reason", "Subscription Note",
                                                            "Kickoff Date", "Estimated Contract End Date", "Stripe Connection Status", "Stripe Connection Check Update Date", "Selected Stores", "Updated At"
                                                        ].map((h, i) => (
                                                            <th key={i} className={cn(
                                                                "p-4 text-[11px] font-bold text-slate-800 dark:text-slate-200 tracking-wide",
                                                                i === 0 ? "sticky left-0 bg-white dark:bg-slate-800 z-30 border-r min-w-[240px]" : "min-w-[150px]"
                                                            )}>
                                                                {h}
                                                            </th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y text-slate-700 dark:text-slate-200">
                                                    {[
                                                        {
                                                            packageType: "Amazon - Reimbursements", subType: "Reimbursement", status: "Active", start: "05/06/2022", end: "03/15/2026",
                                                            statusEnd: "-", price: "$0", varFee: "$0", retFee: "$0", commRate: "13", procFeePct: "0", procFeeAmt: "$0",
                                                            freeCredit: "$0", autoCalc: "No", manualInv: "Yes", paymentMethod: "International Wire", paymentTerm: "0", billDay: "-",
                                                            initTerm: "3", subTerm: "3", isAnnual: "No", renewalDeadline: "-", cancelPeriod: "0", cancelType: "Voluntary",
                                                            cancelReason: "Dissatisfaction", note: "-", kickoff: "05/06/2022", estEnd: "03/15/2026", stripeStatus: "Missing Data On CRM",
                                                            stripeCheck: "02/26/2026", stores: "-", updated: "02/26/2026 19:05"
                                                        },
                                                        {
                                                            packageType: "Amazon - Full Service", subType: "Managed Service", status: "Active", start: "06/05/2022", end: "03/15/2026",
                                                            statusEnd: "-", price: "$3,500", varFee: "$0", retFee: "$0", commRate: "0", procFeePct: "0", procFeeAmt: "$0",
                                                            freeCredit: "$0", autoCalc: "No", manualInv: "Yes", paymentMethod: "International Wire", paymentTerm: "0", billDay: "-",
                                                            initTerm: "6", subTerm: "4", isAnnual: "No", renewalDeadline: "-", cancelPeriod: "1", cancelType: "Voluntary",
                                                            cancelReason: "Dissatisfaction", note: "US Store - KARACA ZUCCACIYE TICARET SAN. A.S.", kickoff: "06/05/2022", estEnd: "03/15/2026", stripeStatus: "Missing Data On CRM",
                                                            stripeCheck: "02/26/2026", stores: "A1PM59EP9QEK4B/ATVPDKIKX0DER", updated: "02/26/2026 19:05"
                                                        },
                                                        {
                                                            packageType: "Scale", subType: "Managed Service", status: "Cancelled", start: "01/19/2023", end: "02/02/2025",
                                                            statusEnd: "-", price: "$1,200", varFee: "$0", retFee: "$0", commRate: "0", procFeePct: "0", procFeeAmt: "$0",
                                                            freeCredit: "$0", autoCalc: "No", manualInv: "Yes", paymentMethod: "International Wire", paymentTerm: "0", billDay: "-",
                                                            initTerm: "-", subTerm: "-", isAnnual: "No", renewalDeadline: "-", cancelPeriod: "1", cancelType: "Voluntary",
                                                            cancelReason: "Package Upgrade", note: "Karaca Porzellan Deutschland GMBH - FR Store", kickoff: "01/19/2023", estEnd: "02/02/2025", stripeStatus: "Missing Data On CRM",
                                                            stripeCheck: "02/26/2026", stores: "AWU6IUPLARFM6/A13V1IB3VIYZZH", updated: "02/26/2026 19:05"
                                                        }
                                                    ].map((row, i) => (
                                                        <tr key={i} className="hover:bg-blue-50/10 transition-colors">
                                                            <td className="p-4 border-slate-100 dark:border-slate-800 sticky left-0 z-20 bg-white dark:bg-slate-900 font-bold border-r text-xs">{row.packageType}</td>
                                                            <td className="p-4 text-xs">{row.subType}</td>
                                                            <td className="p-4">
                                                                <span className={cn(
                                                                    "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase",
                                                                    row.status === 'Active' ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-slate-50 text-slate-500 border border-slate-100"
                                                                )}>
                                                                    {row.status}
                                                                </span>
                                                            </td>
                                                            <td className="p-4 text-xs font-medium text-slate-500">{row.start}</td>
                                                            <td className="p-4 text-xs font-medium text-slate-500">{row.end}</td>
                                                            <td className="p-4 text-xs text-slate-400">{row.statusEnd}</td>
                                                            <td className="p-4 text-xs font-bold text-slate-900 dark:text-white font-mono">{row.price}</td>
                                                            <td className="p-4 text-xs font-mono">{row.varFee}</td>
                                                            <td className="p-4 text-xs font-mono">{row.retFee}</td>
                                                            <td className="p-4 text-xs font-mono">{row.commRate}</td>
                                                            <td className="p-4 text-xs font-mono">{row.procFeePct}%</td>
                                                            <td className="p-4 text-xs font-mono">{row.procFeeAmt}</td>
                                                            <td className="p-4 text-xs font-mono">{row.freeCredit}</td>
                                                            <td className="p-4 text-xs">{row.autoCalc}</td>
                                                            <td className="p-4 text-xs">{row.manualInv}</td>
                                                            <td className="p-4 text-xs">{row.paymentMethod}</td>
                                                            <td className="p-4 text-xs">{row.paymentTerm}</td>
                                                            <td className="p-4 text-xs">{row.billDay}</td>
                                                            <td className="p-4 text-xs">{row.initTerm}</td>
                                                            <td className="p-4 text-xs">{row.subTerm}</td>
                                                            <td className="p-4 text-xs">{row.isAnnual}</td>
                                                            <td className="p-4 text-xs">{row.renewalDeadline}</td>
                                                            <td className="p-4 text-xs">{row.cancelPeriod}</td>
                                                            <td className="p-4 text-xs">{row.cancelType}</td>
                                                            <td className="p-4 text-xs">{row.cancelReason}</td>
                                                            <td className="p-4 text-xs max-w-[200px] truncate" title={row.note}>{row.note}</td>
                                                            <td className="p-4 text-xs text-slate-500">{row.kickoff}</td>
                                                            <td className="p-4 text-xs text-slate-500">{row.estEnd}</td>
                                                            <td className="p-4 text-xs">
                                                                <span className="px-1.5 py-0.5 rounded bg-slate-100 text-[10px] text-slate-500 font-bold uppercase">{row.stripeStatus}</span>
                                                            </td>
                                                            <td className="p-4 text-xs text-slate-400">{row.stripeCheck}</td>
                                                            <td className="p-4 text-[10px] font-mono whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]" title={row.stores}>{row.stores}</td>
                                                            <td className="p-4 text-[10px] text-slate-400 font-mono">{row.updated}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="p-4 bg-slate-50/50 dark:bg-slate-800/20 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Subscription Ledger • Real-time Data</p>
                                        </div>
                                    </div>
                                )}
                            </section>
                        </div>
                    )}

                    {activeMainTab === 'Contacts' && (
                        <section className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="flex items-center gap-4 py-3 -mx-2 px-2">
                                <div className="w-1.5 h-6 rounded-full bg-gradient-to-b from-purple-500 to-indigo-500 shadow-sm" />
                                <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">Contacts</h2>
                                <div className="h-px bg-slate-200 dark:border-slate-800 flex-1" />
                                <div className="flex items-center gap-2">
                                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white py-1.5 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                                        <Upload size={14} /> Upload Contacts
                                        <input type="file" className="hidden" accept=".csv,.xlsx,.xls" />
                                    </label>
                                    <button className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 py-1.5 px-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors border border-transparent hover:border-blue-100">
                                        <Plus size={14} /> Add Contact
                                    </button>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse min-w-[2500px]">
                                        <thead>
                                            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                                                {[
                                                    { id: 'primary', label: '', width: 'w-10' },
                                                    { id: 'firstName', label: 'First Name' },
                                                    { id: 'lastName', label: 'Last Name' },
                                                    { id: 'email', label: 'Email' },
                                                    { id: 'altEmail', label: 'Alternative Email' },
                                                    { id: 'phone', label: 'Telephone Number' },
                                                    { id: 'callCode', label: 'Calling Code' },
                                                    { id: 'countryCode', label: 'Country Code' },
                                                    { id: 'timezone', label: 'Phone Number Timezone' },
                                                    { id: 'altPhone', label: 'Alternative Telephone Number' },
                                                    { id: 'altCallCode', label: 'Alternative Calling Code' },
                                                    { id: 'verified', label: 'Is Verified' },
                                                    { id: 'admin', label: 'Is Admin' },
                                                    { id: 'type', label: 'Contact Type Status' },
                                                    { id: 'linkedin', label: 'Linkedin Profile' },
                                                    { id: 'noContact', label: 'No Contact' },
                                                    { id: 'noContactReason', label: 'No Contact Reason' },
                                                    { id: 'desc', label: 'Description' },
                                                    { id: 'updated', label: 'Updated At' }
                                                ].map((col, i) => (
                                                    <th key={col.id} className={cn(
                                                        "p-4 text-[11px] font-bold text-slate-800 dark:text-slate-200 tracking-wide",
                                                        i === 0 ? "sticky left-0 bg-white dark:bg-slate-800 z-30 border-r dark:border-slate-700 min-w-[40px] px-2 text-center" : "min-w-[120px]",
                                                        col.width
                                                    )}>
                                                        {col.label}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                                            {contacts.map((row: any, i) => (
                                                <tr key={i} className="hover:bg-blue-50/10 dark:hover:bg-slate-800/50 transition-colors group">
                                                    <td className="p-4 border-slate-100 dark:border-slate-800 sticky left-0 z-20 bg-white dark:bg-slate-900 group-hover:bg-slate-50 dark:group-hover:bg-slate-800 font-bold border-r dark:border-slate-700 text-center">
                                                        <button className="text-slate-400 hover:text-amber-500 transition-colors outline-none focus:text-amber-500">
                                                            <Star size={14} className={row.primary ? "fill-amber-500 text-amber-500" : ""} />
                                                        </button>
                                                    </td>
                                                    <td className="p-4 text-xs font-semibold">{row.firstName}</td>
                                                    <td className="p-4 text-xs font-semibold">{row.lastName}</td>
                                                    <td className="p-4 text-xs">{row.email}</td>
                                                    <td className="p-4 text-xs text-slate-500">{row.altEmail}</td>
                                                    <td className="p-4 text-xs tabular-nums">{row.phone}</td>
                                                    <td className="p-4 text-xs">{row.callCode}</td>
                                                    <td className="p-4 text-xs">{row.countryCode}</td>
                                                    <td className="p-4 text-xs text-slate-500">{row.timezone}</td>
                                                    <td className="p-4 text-xs text-slate-500">{row.altPhone}</td>
                                                    <td className="p-4 text-xs text-slate-500">{row.altCallCode}</td>
                                                    <td className="p-4">
                                                        {row.verified ? <CheckCircle2 size={14} className="text-emerald-500" /> : <X size={14} className="text-slate-300 dark:text-slate-600" />}
                                                    </td>
                                                    <td className="p-4">
                                                        {row.admin ? <CheckCircle2 size={14} className="text-blue-500" /> : <X size={14} className="text-slate-300 dark:text-slate-600" />}
                                                    </td>
                                                    <td className="p-4 text-xs font-medium">
                                                        {row.type}
                                                    </td>
                                                    <td className="p-4 text-xs text-slate-500">{row.linkedin}</td>
                                                    <td className="p-4">
                                                        {row.noContact ? <CheckCircle2 size={14} className="text-rose-500" /> : <X size={14} className="text-slate-300 dark:text-slate-600" />}
                                                    </td>
                                                    <td className="p-4 text-xs text-slate-500">{row.noContactReason}</td>
                                                    <td className="p-4 text-xs text-slate-500">{row.desc}</td>
                                                    <td className="p-4 text-[10px] text-slate-400 font-mono tracking-wider">{row.updated}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="p-4 bg-slate-50/50 dark:bg-slate-800/20 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">All Contacts Overview</p>
                                </div>
                            </div>
                        </section>
                    )}

                    {activeMainTab === 'Stores' && (
                        <section className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="flex items-center gap-4 py-3 -mx-2 px-2">
                                <div className="w-1.5 h-6 rounded-full bg-gradient-to-b from-blue-400 to-indigo-400 shadow-sm" />
                                <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">Stores</h2>
                                <div className="h-px bg-slate-200 dark:border-slate-800 flex-1" />
                            </div>
                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse min-w-[3500px]">
                                        <thead>
                                            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                                                {[
                                                    "Store Name", "Seller Central Name", "Account Email", "Marketplace", "Marketplace Code",
                                                    "Store Type", "Connection Status", "Reimbursement Status", "Is Vendor", "Is Walmart",
                                                    "Trial End Time", "Store Create Date", "Currency", "Last Month Revenue", "Last 3 Month Avg Rev",
                                                    "Total SKU Count", "Total ASIN Count", "Total Sales 30d", "Total Profit 30d", "Organic Sales 30d",
                                                    "Ad Sales 30d", "Ad Spend 30d", "ACOS 30d", "Total Sales 14d",
                                                    "Total Profit 14d", "Organic Sales 14d", "Ad Sales 14d", "Ad Spend 14d",
                                                    "ACOS 14d", "Total Sales 7d", "Total Profit 7d", "Organic Sales 7d", "Ad Sales 7d",
                                                    "Ad Spend 7d", "ACOS 7d", "Note"
                                                ].map((col, i) => (
                                                    <th key={i} className={cn(
                                                        "p-4 text-[11px] font-bold text-slate-800 dark:text-slate-200 tracking-wide",
                                                        i === 0 ? "sticky left-0 bg-white dark:bg-slate-800 z-30 border-r dark:border-slate-700 min-w-[150px]" : "min-w-[120px]"
                                                    )}>
                                                        {col}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                                            {[
                                                {
                                                    name: "Karaca US", scName: "Karaca Zuccaciye", email: "amazon@karaca.com", mkt: "United States", code: "US", type: "Amazon",
                                                    conn: "Connected", reimb: "Inactive", isVendor: false, isWalmart: false, trial: "-", created: "10/12/2023", curr: "USD",
                                                    lmRev: "$125,400", l3mRev: "$118,200", sku: "1250", asin: "1100",
                                                    ts30: "$120k", tp30: "$35k", os30: "$80k", as30: "$40k", asp30: "$8k", acos30: "20%",
                                                    ts14: "$65k", tp14: "$18k", os14: "$45k", as14: "$20k", asp14: "$4k", acos14: "20%",
                                                    ts7: "$30k", tp7: "$8k", os7: "$20k", as7: "$10k", asp7: "$2k", acos7: "20%", note: "-"
                                                },
                                                {
                                                    name: "Karaca UK", scName: "Karaca Porzellan", email: "amazon.uk@karaca.com", mkt: "United Kingdom", code: "UK", type: "Amazon",
                                                    conn: "Connected", reimb: "Active", isVendor: true, isWalmart: false, trial: "10/01/2026", created: "05/15/2022", curr: "GBP",
                                                    lmRev: "£85,200", l3mRev: "£82,000", sku: "950", asin: "800",
                                                    ts30: "£80k", tp30: "£22k", os30: "£55k", as30: "£25k", asp30: "£4k", acos30: "16%",
                                                    ts14: "£42k", tp14: "£11k", os14: "£28k", as14: "£14k", asp14: "£2.5k", acos14: "17%",
                                                    ts7: "£20k", tp7: "£5k", os7: "£13k", as7: "£7k", asp7: "£1k", acos7: "14%", note: "Vendor Central Account"
                                                },
                                                {
                                                    name: "Karaca WMT", scName: "Karaca Home", email: "walmart@karaca.com", mkt: "United States", code: "US", type: "Walmart WFS",
                                                    conn: "Error", reimb: "-", isVendor: false, isWalmart: true, trial: "-", created: "01/10/2024", curr: "USD",
                                                    lmRev: "$45,000", l3mRev: "$40,500", sku: "400", asin: "-",
                                                    ts30: "$42k", tp30: "$10k", os30: "$20k", as30: "$22k", asp30: "$5k", acos30: "22.7%",
                                                    ts14: "$20k", tp14: "$4.5k", os14: "$9k", as14: "$11k", asp14: "$2.5k", acos14: "22.7%",
                                                    ts7: "$10k", tp7: "$2.2k", os7: "$4.5k", as7: "$5.5k", asp7: "$1.2k", acos7: "21%", note: "API Token Expired"
                                                }
                                            ].map((row, i) => (
                                                <tr key={i} className="hover:bg-blue-50/10 dark:hover:bg-slate-800/50 transition-colors group">
                                                    <td className="p-4 border-slate-100 dark:border-slate-800 sticky left-0 z-20 bg-white dark:bg-slate-900 group-hover:bg-slate-50 dark:group-hover:bg-slate-800 font-bold border-r dark:border-slate-700 text-[11px]">
                                                        {row.name}
                                                    </td>
                                                    <td className="p-4 text-[11px] font-medium">{row.scName}</td>
                                                    <td className="p-4 text-[11px]">{row.email}</td>
                                                    <td className="p-4 text-[11px]">{row.mkt}</td>
                                                    <td className="p-4 text-[11px] font-bold">{row.code}</td>
                                                    <td className="p-4 text-[11px] font-medium">{row.type}</td>
                                                    <td className="p-4">
                                                        <Badge className={cn("px-2 py-0.5", row.conn === 'Connected' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-rose-50 text-rose-600 border-rose-100")}>{row.conn}</Badge>
                                                    </td>
                                                    <td className="p-4 text-[11px]">
                                                        {row.reimb === 'Active' ? <Badge className="bg-blue-50 text-blue-600 border-blue-100">{row.reimb}</Badge> : <span className="text-slate-400">{row.reimb}</span>}
                                                    </td>
                                                    <td className="p-4">{row.isVendor ? <CheckCircle2 size={13} className="text-emerald-500" /> : <X size={13} className="text-slate-300" />}</td>
                                                    <td className="p-4">{row.isWalmart ? <CheckCircle2 size={13} className="text-emerald-500" /> : <X size={13} className="text-slate-300" />}</td>
                                                    <td className="p-4 text-[11px] tabular-nums font-mono text-slate-500">{row.trial}</td>
                                                    <td className="p-4 text-[11px] tabular-nums font-mono text-slate-500">{row.created}</td>
                                                    <td className="p-4 text-[11px] font-bold">{row.curr}</td>
                                                    <td className="p-4 text-[11px] font-bold text-emerald-600">{row.lmRev}</td>
                                                    <td className="p-4 text-[11px] font-semibold text-emerald-700/70">{row.l3mRev}</td>
                                                    <td className="p-4 text-[11px] tabular-nums font-mono">{row.sku}</td>
                                                    <td className="p-4 text-[11px] tabular-nums font-mono">{row.asin}</td>

                                                    {/* 30 Days */}
                                                    <td className="p-4 text-[11px] font-bold text-slate-900 border-l border-slate-100 dark:border-slate-800">{row.ts30}</td>
                                                    <td className="p-4 text-[11px] font-bold text-emerald-600">{row.tp30}</td>
                                                    <td className="p-4 text-[11px] text-slate-500">{row.os30}</td>
                                                    <td className="p-4 text-[11px] text-slate-500">{row.as30}</td>
                                                    <td className="p-4 text-[11px] text-rose-600">{row.asp30}</td>
                                                    <td className="p-4 text-[11px] font-mono font-bold">{row.acos30}</td>

                                                    {/* 14 Days */}
                                                    <td className="p-4 text-[11px] font-bold text-slate-900 border-l border-slate-100 dark:border-slate-800">{row.ts14}</td>
                                                    <td className="p-4 text-[11px] font-bold text-emerald-600">{row.tp14}</td>
                                                    <td className="p-4 text-[11px] text-slate-500">{row.os14}</td>
                                                    <td className="p-4 text-[11px] text-slate-500">{row.as14}</td>
                                                    <td className="p-4 text-[11px] text-rose-600">{row.asp14}</td>
                                                    <td className="p-4 text-[11px] font-mono font-bold">{row.acos14}</td>

                                                    {/* 7 Days */}
                                                    <td className="p-4 text-[11px] font-bold text-slate-900 border-l border-slate-100 dark:border-slate-800">{row.ts7}</td>
                                                    <td className="p-4 text-[11px] font-bold text-emerald-600">{row.tp7}</td>
                                                    <td className="p-4 text-[11px] text-slate-500">{row.os7}</td>
                                                    <td className="p-4 text-[11px] text-slate-500">{row.as7}</td>
                                                    <td className="p-4 text-[11px] text-rose-600">{row.asp7}</td>
                                                    <td className="p-4 text-[11px] font-mono font-bold">{row.acos7}</td>

                                                    <td className="p-4 text-[11px] text-slate-500 max-w-[200px] truncate">{row.note}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>
                    )}

                    {activeMainTab === 'Invoices' && (
                        <section className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="flex items-center justify-between py-3 -mx-2 px-2">
                                <div className="flex items-center gap-4 flex-1">
                                    <div className="w-1.5 h-6 rounded-full bg-indigo-600 shadow-sm" />
                                    <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">Financial Ledger</h2>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <Search size={14} className="text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                        <input className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs outline-none focus:ring-1 focus:ring-blue-500 w-64 transition-all placeholder:text-slate-400" placeholder="Search Invoices..." />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse min-w-[1400px]">
                                        <thead>
                                            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                                                {[
                                                    { id: 'doc', label: 'Doc Number', width: 'min-w-[120px]' },
                                                    { id: 'status', label: 'Paid Status', width: 'min-w-[150px]' },
                                                    { id: 'amount', label: 'Amount', width: 'min-w-[120px] text-right' },
                                                    { id: 'balance', label: 'Balance', width: 'min-w-[120px] text-right' },
                                                    { id: 'due', label: 'Due Date', width: 'min-w-[140px]' },
                                                    { id: 'create', label: 'Invoice Create Time', width: 'min-w-[160px]' },
                                                    { id: 'line', label: 'Line Number', width: 'min-w-[120px] text-right' },
                                                    { id: 'name', label: 'Display Name', width: 'min-w-[200px]' },
                                                    { id: 'type', label: 'Subscription Type', width: 'min-w-[160px]' }
                                                ].map((col, i) => (
                                                    <th key={col.id} className={cn(
                                                        "p-4 text-[11px] font-bold text-slate-800 dark:text-slate-200 tracking-wide",
                                                        i === 0 ? "sticky left-0 bg-white dark:bg-slate-800 z-30 border-r dark:border-slate-700 px-4" : "",
                                                        col.width
                                                    )}>
                                                        {col.label}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                                            {[
                                                { doc: '1122', status: 'unpaid', amount: '$40', balance: '$40', due: '04/23/2023', created: '03/24/2023', line: '1', name: 'Abazor Marbelan', type: 'reimbursement' },
                                                { doc: '1121', status: 'partially_paid', amount: '$33', balance: '$10', due: '04/07/2023', created: '03/08/2023', line: '1', name: 'Abazor Marbelan', type: 'service' },
                                                { doc: '1119', status: 'paid', amount: '$0', balance: '$0', due: '03/10/2023', created: '02/28/2023', line: '1', name: 'Simran Mahon', type: 'service' },
                                                { doc: '1118', status: 'paid', amount: '$10', balance: '$0', due: '03/20/2023', created: '02/20/2023', line: '1', name: 'Simran Mahon', type: 'service' },
                                                { doc: '1118', status: 'paid', amount: '$5', balance: '$0', due: '03/20/2023', created: '02/20/2023', line: '2', name: 'Simran Mahon', type: 'service' },
                                                { doc: '1117', status: 'unpaid', amount: '$75', balance: '$75', due: '03/20/2023', created: '02/28/2023', line: '1', name: 'Simran Mahon', type: 'service' },
                                                { doc: '1116', status: 'partially_paid', amount: '$20', balance: '$45', due: '03/30/2023', created: '02/28/2023', line: '1', name: 'Simran Mahon', type: 'service' },
                                                { doc: '1116', status: 'partially_paid', amount: '$50', balance: '$45', due: '03/20/2023', created: '02/20/2023', line: '2', name: 'Simran Mahon', type: 'service' },
                                                { doc: '1115', status: 'partially_paid', amount: '$75', balance: '$45', due: '03/28/2023', created: '02/24/2023', line: '2', name: 'Abdul Rakin', type: 'service' },
                                                { doc: '1115', status: 'partially_paid', amount: '$30', balance: '$45', due: '03/28/2023', created: '02/24/2023', line: '1', name: 'Abdul Rakin', type: 'service' },
                                                { doc: '1113', status: 'paid', amount: '$10', balance: '$0', due: '03/22/2023', created: '02/20/2023', line: '1', name: 'Ali Rizwan', type: 'service' },
                                                { doc: '1111', status: 'paid', amount: '$12', balance: '$0', due: '03/09/2023', created: '02/07/2023', line: '1', name: 'Abdul Rakin', type: 'service' },
                                                { doc: '1110', status: 'paid', amount: '$12', balance: '$0', due: '03/03/2023', created: '01/21/2023', line: '1', name: 'Abdul Rakin', type: 'service' },
                                                { doc: '1108', status: 'paid', amount: '$75', balance: '$0', due: '03/22/2023', created: '01/20/2023', line: '1', name: 'Abazor Marbelan', type: 'service' },
                                                { doc: '1107', status: 'paid', amount: '$20', balance: '$0', due: '03/22/2023', created: '01/20/2023', line: '1', name: 'Abazor Marbelan', type: 'service' },
                                                { doc: '1106', status: 'paid', amount: '$50', balance: '$0', due: '03/22/2023', created: '01/20/2023', line: '1', name: 'Abazor Marbelan', type: 'service' },
                                                { doc: '1105', status: 'paid', amount: '$13', balance: '$0', due: '03/22/2023', created: '01/20/2023', line: '1', name: 'Abazor Marbelan', type: 'service' },
                                                { doc: '1104', status: 'paid', amount: '$22', balance: '$0', due: '03/22/2023', created: '01/20/2023', line: '1', name: 'Aaron Martinez', type: 'service' },
                                                { doc: '1102', status: 'paid', amount: '$4', balance: '$0', due: '03/22/2023', created: '01/20/2023', line: '1', name: 'Aaron Martinez', type: 'service' },
                                            ].map((row, i) => {
                                                const getStatusColor = (s: string) => {
                                                    if (s === 'paid') return 'text-emerald-500 font-bold';
                                                    if (s === 'unpaid') return 'text-rose-500 font-bold';
                                                    return 'text-amber-500 font-bold'; // partially_paid
                                                };

                                                return (
                                                    <tr key={i} className="hover:bg-blue-50/10 dark:hover:bg-slate-800/50 transition-colors group">
                                                        <td className="p-4 border-slate-100 dark:border-slate-800 sticky left-0 z-20 bg-white dark:bg-slate-900 group-hover:bg-slate-50 dark:group-hover:bg-slate-800 font-bold border-r dark:border-slate-700 text-[11px] tabular-nums">
                                                            {row.doc}
                                                        </td>
                                                        <td className={cn("p-4 text-[11px]", getStatusColor(row.status))}>{row.status}</td>
                                                        <td className="p-4 text-[11px] tabular-nums font-bold text-slate-900 dark:text-white text-right">{row.amount}</td>
                                                        <td className="p-4 text-[11px] tabular-nums font-bold text-slate-900 dark:text-white text-right">{row.balance}</td>
                                                        <td className="p-4 text-[11px] tabular-nums font-mono text-slate-500">{row.due}</td>
                                                        <td className="p-4 text-[11px] tabular-nums font-mono text-slate-500">{row.created}</td>
                                                        <td className="p-4 text-[11px] tabular-nums font-mono text-right">{row.line}</td>
                                                        <td className="p-4 text-[11px] font-medium">{row.name}</td>
                                                        <td className="p-4 text-[11px] text-slate-500">{row.type}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="p-4 bg-slate-50/50 dark:bg-slate-800/20 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Invoices Overview</p>
                                </div>
                            </div>
                        </section>
                    )}

                    {activeMainTab === 'Activities' && (
                        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="flex border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                                {['Tasks/Meetings', 'Chats'].map(item => (
                                    <button
                                        key={item}
                                        onClick={() => setActiveTab(item)}
                                        className={cn(
                                            "px-8 py-4 text-xs font-black tracking-widest transition-all uppercase relative",
                                            activeTab === item ? "text-blue-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600" : "text-slate-400 hover:text-slate-600"
                                        )}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>

                            {activeTab === 'Tasks/Meetings' && (
                                <div className="p-6">
                                    <div className="flex gap-6 overflow-x-auto pb-6 custom-scrollbar">
                                        {['To Do', 'Work In Progress', 'Pending Reflection', 'Pending Approval'].map(status => {
                                            const filteredTasks = TASKS_DATA.filter(t => t.id === 'T' + (account.id % 3 + 1)).filter(t => t.status === status);
                                            return (
                                                <div key={status} className="flex-shrink-0 w-[340px] flex flex-col gap-4">
                                                    <div className="flex items-center justify-between px-3 h-8">
                                                        <div className="flex items-center gap-2">
                                                            <GripVertical size={14} className="text-slate-300 cursor-grab active:cursor-grabbing" />
                                                            <h3 className="text-[13px] font-black tracking-wider text-slate-400 dark:text-slate-500">{status}</h3>
                                                            <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-0.5 rounded-full text-[10px] font-bold">{filteredTasks.length}</span>
                                                        </div>
                                                        <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors">
                                                            <MoreHorizontal size={14} className="text-slate-400" />
                                                        </button>
                                                    </div>
                                                    <div className="flex flex-col gap-4 min-h-[400px] p-1 bg-slate-50/50 dark:bg-slate-950/20 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800/50">
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
                            )}

                            {activeTab === 'Chats' && (
                                <div className="p-8 flex flex-col items-center justify-center text-center text-slate-400 h-[400px]">
                                    <MessageCircle size={48} className="text-slate-200 dark:text-slate-800 mb-4" />
                                    <p className="text-sm font-medium">No recent chats available for this account.</p>
                                </div>
                            )}
                        </div>
                    )}

                    {activeMainTab === 'Misc' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Informational Card */}
                                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 overflow-hidden relative">
                                    <div className="absolute top-0 right-0 p-4 opacity-5">
                                        <Info size={120} />
                                    </div>
                                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                        <Calendar size={16} className="text-blue-600" />
                                        Important Dates & Source
                                    </h3>
                                    <div className="space-y-5">
                                        <div className="flex justify-between items-center pb-3 border-b border-slate-50 dark:border-slate-800">
                                            <span className="text-xs font-medium text-slate-400">Creation Date</span>
                                            <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{account.createdAt || 'Jan 12, 2024'}</span>
                                        </div>
                                        <div className="flex justify-between items-center pb-3 border-b border-slate-50 dark:border-slate-800">
                                            <span className="text-xs font-medium text-slate-400">Trial End Time</span>
                                            <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Feb 12, 2024</span>
                                        </div>
                                        <div className="flex justify-between items-center pb-3 border-b border-slate-50 dark:border-slate-800">
                                            <span className="text-xs font-medium text-slate-400">Source</span>
                                            <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Marketing Campaign</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs font-medium text-slate-400">Source Detail</span>
                                            <span className="text-sm font-bold text-slate-700 dark:text-slate-200 text-right max-w-[200px] truncate">Google Ads - Q1 Performance</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Context Card */}
                                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 overflow-hidden relative">
                                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                        <MessageCircle size={16} className="text-indigo-600" />
                                        Contact Status & Notes
                                    </h3>
                                    <div className="space-y-5">
                                        <div className="flex justify-between items-center pb-3 border-b border-slate-50 dark:border-slate-800">
                                            <span className="text-xs font-medium text-slate-400">No Contact (Y/N)</span>
                                            <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-black">N</span>
                                        </div>
                                        <div className="flex justify-between items-center pb-3 border-b border-slate-50 dark:border-slate-800">
                                            <span className="text-xs font-medium text-slate-400">No Contact Reason</span>
                                            <span className="text-sm font-bold text-slate-700 dark:text-slate-200">-</span>
                                        </div>
                                        <div className="space-y-2">
                                            <span className="text-xs font-medium text-slate-400 block">Contact Note</span>
                                            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 leading-relaxed italic">
                                                "Customer prefers communication via email for weekly status updates. Bi-weekly Zoom meeting is scheduled for strategic reviews."
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Contract Documents Panel */}
                            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden relative col-span-1 md:col-span-2 mt-6">
                                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                    <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                        <FileText size={16} className="text-emerald-600" />
                                        Contract Documents
                                    </h3>
                                    <label className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 py-1.5 px-3 rounded-lg bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors cursor-pointer border border-blue-100 dark:border-blue-800">
                                        <Plus size={14} /> Upload New Document
                                        <input type="file" className="hidden" />
                                    </label>
                                </div>
                                <div className="p-0">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                                                <th className="px-6 py-3 text-[10px] font-black text-slate-400 tracking-widest uppercase">Document Name</th>
                                                <th className="px-6 py-3 text-[10px] font-black text-slate-400 tracking-widest uppercase">Uploaded By</th>
                                                <th className="px-6 py-3 text-[10px] font-black text-slate-400 tracking-widest uppercase">Upload Date</th>
                                                <th className="px-6 py-3 text-[10px] font-black text-slate-400 tracking-widest uppercase text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                            <tr className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded bg-rose-50 dark:bg-rose-900/30 text-rose-600 flex items-center justify-center flex-shrink-0">
                                                            <FileText size={14} />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">Master_Service_Agreement_v2.pdf</span>
                                                            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wide">2.4 MB • PDF</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-xs font-medium text-slate-600 dark:text-slate-300">Sarah Jenkins</td>
                                                <td className="px-6 py-4 text-xs font-medium text-slate-500 tabular-nums">Jan 12, 2024</td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors" title="Download Document">
                                                            <Download size={15} />
                                                        </button>
                                                        <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-lg transition-colors" title="Delete Document">
                                                            <Trash2 size={15} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded bg-blue-50 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center flex-shrink-0">
                                                            <FileText size={14} />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">SOW_Q1_Campaigns.docx</span>
                                                            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wide">1.1 MB • DOCX</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-xs font-medium text-slate-600 dark:text-slate-300">Michael Scott</td>
                                                <td className="px-6 py-4 text-xs font-medium text-slate-500 tabular-nums">Feb 4, 2024</td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors" title="Download Document">
                                                            <Download size={15} />
                                                        </button>
                                                        <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-lg transition-colors" title="Delete Document">
                                                            <Trash2 size={15} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <div className="h-20" />

            {/* Common Dialogs */}
            <RiskManagementDialog
                isOpen={isRiskUpdateOpen}
                onClose={() => setIsRiskUpdateOpen(false)}
                project={updatingProject}
                activePersona="ceo"
                userRole={userRole}
                theme="light"
                onSave={handleSaveRisk}
                risks={RISKS}
                factors={DIALOG_FACTORS}
            />

            <TeamManagementDialog
                isOpen={isTeamDialogOpen}
                onClose={() => setIsTeamDialogOpen(false)}
                project={editingTeamProject}
                role={editingTeamRole}
                onSave={handleSaveTeam}
                memberList={
                    editingTeamRole === 'am' ? AM_NAMES :
                        editingTeamRole === 'csm' ? CSM_NAMES :
                            editingTeamRole === 'bm' ? BRAND_NAMES :
                                editingTeamRole === 'cm' ? CARE_NAMES :
                                    editingTeamRole === 'gd' ? DESIGNER_NAMES : []
                }
            />
        </div>
    );
}
