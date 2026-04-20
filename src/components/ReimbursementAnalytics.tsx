import React, { useState, useEffect } from 'react';
import { 
  Receipt, 
  ArrowUpRight, 
  ArrowDownRight, 
  Search, 
  MoreHorizontal, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  History, 
  Settings,
  ShieldCheck, 
  HelpCircle, 
  Clock, 
  Box, 
  ChevronDown, 
  ShoppingCart, 
  LayoutGrid, 
  Upload, 
  X,
  Filter,
  TrendingUp,
  DollarSign,
  Info,
  Download,
  Columns,
  FolderOpen,
  ShieldAlert,
  Check,
  Globe,
  Users,
  Plus,
  MessageSquare
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './Tooltip';
import { ManageCaseFilesDialog, CaseFile } from './ManageCaseFilesDialog';
import { UploadFileDialog } from './UploadFileDialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";

import { HelpLink } from './HelpLink';

// --- Types ---
interface InventoryRecoveryData {
  reimbursedInventoryCount: number;
  potentialInventoryCount: number;
}

interface FinancialRecoveryData {
  totalReimbursedAmount: number;
  estimatedMonthlyAmount: number;
  withEva: boolean;
}

interface TrendData {
  periodName: string;
  amountAmazon: number;
  amountEva: number;
  amountOther: number;
  quantityAmazon: number;
  quantityEva: number;
  quantityOther: number;
  reasons: ReasonBreakdown[];
}

interface ReasonBreakdown {
  reasonKey: string;
  amount: number;
  color: string;
}

interface CaseItem {
  caseId: string;
  shipmentId: string;
  reimbursementId: string;
  asin: string;
  sku: string;
  fnsku: string;
  reasonDisplay: string;
  status: string;
  isDocumentRequired: boolean;
  documentNeededDisplay: string;
  totalAmount: number;
  inventoryCashReimbursed: number;
  inventoryReimbursed: number;
  foundQuantity: number;
  source: string;
  creationDate: string;
  approvalDate: string;
  uploadedFiles?: CaseFile[];
}

const ALL_CASE_COLUMNS = [
  { id: 'caseId', label: 'Case ID #', sticky: true },
  { id: 'shipmentId', label: 'Shipment ID' },
  { id: 'reimbursementId', label: 'Reimb. ID #' },
  { id: 'asin', label: 'ASIN' },
  { id: 'sku', label: 'SKU' },
  { id: 'fnsku', label: 'FNSKU' },
  { id: 'reasonDisplay', label: 'Reason' },
  { id: 'status', label: 'Status' },
  { id: 'documentNeededDisplay', label: 'Doc Needed' },
  { id: 'totalAmount', label: 'Amount' },
  { id: 'inventoryCashReimbursed', label: 'Cash Reimb.' },
  { id: 'inventoryReimbursed', label: 'Inv. Reimb.' },
  { id: 'foundQuantity', label: 'Found Qty' },
  { id: 'source', label: 'Created By' },
  { id: 'creationDate', label: 'Creation Date' },
  { id: 'approvalDate', label: 'Approval Date' },
  { id: 'action', label: 'Action' },
];

interface TopItem {
  sku: string;
  quantity: number;
  amount: number;
}

// --- Mock Data Generators ---
const generateTrendData = (): TrendData[] => {
  const months = ['Oct 24', 'Nov 24', 'Dec 24', 'Jan 25', 'Feb 25', 'Mar 25', 'Apr 25', 'May 25', 'Jun 25', 'Jul 25', 'Aug 25', 'Sep 25', 'Oct 25', 'Nov 25', 'Dec 25', 'Jan 26', 'Feb 26', 'Mar 26'];
  const reasonKeys = ['Customer Return', 'Warehouse Damaged', 'Lost in Transit', 'Inventory Adjustment', 'Reim. Reversal'];
  const reasonColors = ['#0ea5e9', '#eab308', '#ef4444', '#10b981', '#64748b'];

  return months.map(m => ({
    periodName: m,
    amountAmazon: Math.random() * 12000 + 4000,
    amountEva: Math.random() * 2000 + 500,
    amountOther: Math.random() * 3000 + 1000,
    quantityAmazon: Math.floor(Math.random() * 200 + 80),
    quantityEva: Math.floor(Math.random() * 40 + 10),
    quantityOther: Math.floor(Math.random() * 60 + 20),
    reasons: reasonKeys.map((k, i) => ({
      reasonKey: k,
      amount: (Math.random() * 2000 + 500) * (k === 'Reimbursement Reversal' ? -0.2 : 1),
      color: reasonColors[i]
    }))
  }));
};

const generateCases = (count: number): CaseItem[] => {
  const reasons = [
    'Lost Warehouse', 'Damaged Warehouse', 'Lost Inbound', 'Damaged Inbound', 
    'Customer Service Issue', 'Customer Return', 'Reim. Reversal', 'Fee Correction'
  ];
  const statuses = ['Pending', 'Invoiced', 'Approved', 'Paid', 'Found'];
  const docs = ['POP', 'POD', 'POP or POD', 'POP and POD'];
  const sources = ['Amazon', 'Auto-Amazon', 'EVA', 'Other'];
  
  const currentD = new Date();
  
  return Array.from({ length: count }).map((_, i) => {
    const cDate = new Date(currentD.getFullYear(), currentD.getMonth(), currentD.getDate() - Math.floor(Math.random() * 60));
    const aDate = new Date(cDate.getFullYear(), cDate.getMonth(), cDate.getDate() + Math.floor(Math.random() * 10));
    
    const isPending = statuses[Math.floor(Math.random() * statuses.length)] === 'Pending';
    const status = isPending ? 'Pending' : statuses[Math.floor(Math.random() * statuses.length)];
    const hasFiles = Math.random() > 0.6;
    const catOptions = ['POP', 'POD', 'Other Files'];
    const uploadedFiles: CaseFile[] = hasFiles ? [
      {
        id: `f${i}1`,
        createdBy: 'YjP4HPjGyXbZa8h',
        createdAt: cDate.toLocaleDateString('en-US') + ', 11:58 PM',
        fileName: `Invoice_${Math.random().toString(36).substring(2, 8).toUpperCase()}.pdf`,
        category: catOptions[Math.floor(Math.random() * catOptions.length)],
      }
    ] : [];
    
    return {
      caseId: `${1200000000 + i}`,
      shipmentId: `FBA${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      reimbursementId: `${98000000 + i}`,
      asin: `B0${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      sku: `SKU-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
      fnsku: `X00${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
      reasonDisplay: reasons[Math.floor(Math.random() * reasons.length)],
      status: status,
      isDocumentRequired: Math.random() > 0.8,
      documentNeededDisplay: docs[Math.floor(Math.random() * docs.length)],
      totalAmount: (Math.random() * 500) * (Math.random() > 0.1 ? 1 : -1),
      inventoryCashReimbursed: Math.floor(Math.random() * 100),
      inventoryReimbursed: Math.floor(Math.random() * 20),
      foundQuantity: Math.floor(Math.random() * 5),
      source: sources[Math.floor(Math.random() * sources.length)],
      creationDate: cDate.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      approvalDate: aDate.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      uploadedFiles
    };
  });
};

const topItemsValue: TopItem[] = Array.from({ length: 5 }).map((_, i) => ({
  sku: `SKU-VAL-${i}`,
  quantity: Math.floor(Math.random() * 50 + 10),
  amount: Math.random() * 2000 + 500
})).sort((a, b) => b.amount - a.amount);

const topItemsQuantity: TopItem[] = Array.from({ length: 5 }).map((_, i) => ({
  sku: `SKU-QTY-${i}`,
  quantity: Math.floor(Math.random() * 100 + 50),
  amount: Math.random() * 1000 + 200
})).sort((a, b) => b.quantity - a.quantity);

// --- Sub-Components ---

const SkeletonLoader = () => (
  <div className="animate-pulse flex flex-col gap-4 w-full h-full p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
    <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-1/3"></div>
    <div className="flex-1 bg-slate-50/50 dark:bg-slate-800/50 rounded-xl"></div>
  </div>
);

const SemiCircleProgress: React.FC<{ value: number; total: number }> = ({ value, total }) => {
  const percentage = Math.min((value / total) * 100, 100);
  const radius = 80;
  const stroke = 12;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-48 h-24 overflow-hidden">
        <svg height="100%" width="100%" viewBox="0 0 160 80">
          <path
            d="M 10 80 A 70 70 0 0 1 150 80"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth={stroke}
            strokeLinecap="round"
            className="dark:stroke-slate-800"
          />
          <path
            d="M 10 80 A 70 70 0 0 1 150 80"
            fill="none"
            stroke="#3b82f6"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`}
            style={{ strokeDashoffset, transition: 'stroke-dashoffset 1s ease-in-out' }}
          />
        </svg>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
          <span className="text-3xl font-bold text-slate-900 dark:text-white tabular-nums">{value}</span>
          <p className="text-[10px] font-bold text-slate-400  tracking-widest mt-1">Reimbursed</p>
        </div>
      </div>
      <div className="mt-4 flex flex-col items-center gap-1">
         <span className="text-sm font-bold text-slate-600 dark:text-slate-300 whitespace-nowrap">Potential Inventory Recovery: <span className="text-blue-500">{total}</span></span>
         <div className="text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
           {percentage.toFixed(1)}% Recovery Rate
         </div>
      </div>
    </div>
  );
};

const FinancialRecovery: React.FC<{ data: FinancialRecoveryData }> = ({ data }) => {
  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
             <DollarSign size={18} />
           </div>
           <span className="text-sm font-bold text-slate-600 dark:text-slate-400">Total Financial Recovery</span>
        </div>
        {data.withEva && (
          <div className="px-2 py-1 bg-blue-600 text-white text-[9px] font-bold tracking-widest  rounded shadow-[0_2px_10px_-3px_rgba(37,99,235,0.4)]">
            WITH EVA
          </div>
        )}
      </div>

      <div className="space-y-1">
        <h2 className="text-4xl font-bold text-slate-900 dark:text-white tabular-nums tracking-tight">
          ${data.totalReimbursedAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </h2>
        <div className="flex items-center gap-2 text-[12px] font-semibold text-slate-500">
          <TrendingUp size={14} className="text-emerald-500" />
          <span>Estimated Monthly: ${data.estimatedMonthlyAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
        </div>
      </div>
    </div>
  );
};

const StackedTrendChart: React.FC<{ 
  data: TrendData[]; 
  selectedMonth: string | null;
  onSelect: (month: string) => void;
}> = ({ data, selectedMonth, onSelect }) => {
  const maxAmount = Math.max(...data.map(d => d.amountAmazon + d.amountEva + d.amountOther)) * 1.2;
  const maxQty = Math.max(...data.map(d => Math.max(d.quantityAmazon, d.quantityEva, d.quantityOther))) * 1.5;

  return (
    <div className="relative h-72 w-full flex items-end gap-1 px-10 pt-10 pb-10">
      {/* SVG Layer for Lines */}
      <div className="absolute inset-0 z-20 pointer-events-none" style={{ paddingLeft: '40px', paddingRight: '40px', paddingTop: '40px', paddingBottom: '70px' }}>
        <svg className="h-full w-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
          {(() => {
            const getSmoothPath = (values: number[]) => {
              if (values.length === 0) return "";
              const points = values.map((v, i) => ({
                x: (i + 0.5) * (100 / data.length),
                y: 100 - (v / maxQty) * 100
              }));
              
              let d = `M ${points[0].x},${points[0].y}`;
              for (let i = 0; i < points.length - 1; i++) {
                const curr = points[i];
                const next = points[i + 1];
                const cp1x = curr.x + (next.x - curr.x) / 2;
                const cp1y = curr.y;
                const cp2x = curr.x + (next.x - curr.x) / 2;
                const cp2y = next.y;
                d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${next.x},${next.y}`;
              }
              return d;
            };

            return (
              <>
                <path
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={getSmoothPath(data.map(d => d.quantityAmazon))}
                  style={{ vectorEffect: 'non-scaling-stroke' }}
                />
                <path
                  fill="none"
                  stroke="#0ea5e9"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={getSmoothPath(data.map(d => d.quantityEva))}
                  style={{ vectorEffect: 'non-scaling-stroke' }}
                />
                <path
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={getSmoothPath(data.map(d => d.quantityOther))}
                  style={{ vectorEffect: 'non-scaling-stroke' }}
                />
              </>
            );
          })()}
        </svg>
      </div>

      {/* Y-Axis Left (Amount) */}
      <div className="absolute left-0 top-10 bottom-20 flex flex-col justify-between text-[9px] font-bold text-slate-400 pr-2 border-r border-slate-100 dark:border-slate-800/50">
        <span>${(maxAmount/1000).toFixed(0)}k</span>
        <span>${(maxAmount/2000).toFixed(0)}k</span>
        <span>0</span>
        <div className="absolute -left-8 top-1/2 -rotate-90 origin-center text-[8px]  tracking-widest text-slate-400">Amount ($)</div>
      </div>

      {/* Y-Axis Right (Quantity) */}
      <div className="absolute right-0 top-10 bottom-20 flex flex-col justify-between text-[9px] font-bold text-slate-400 pl-2 border-l border-slate-100 dark:border-slate-800/50">
        <span>{maxQty.toFixed(0)}</span>
        <span>{(maxQty/2).toFixed(0)}</span>
        <span>0</span>
        <div className="absolute -right-8 top-1/2 rotate-90 origin-center text-[8px]  tracking-widest text-slate-400">Quantity</div>
      </div>
      
      {data.map((d, i) => {
        const isSelected = selectedMonth === d.periodName;
        const totalAmount = d.amountAmazon + d.amountEva + d.amountOther;
        const hAmazon = (d.amountAmazon / maxAmount) * 100;
        const hEva = (d.amountEva / maxAmount) * 100;
        const hOther = (d.amountOther / maxAmount) * 100;
        
        const lineYAmazon = 100 - (d.quantityAmazon / maxQty) * 100;
        const lineYEva = 100 - (d.quantityEva / maxQty) * 100;
        const lineYOther = 100 - (d.quantityOther / maxQty) * 100;

        return (
          <div 
            key={i} 
            onClick={() => onSelect(d.periodName)}
            className={cn(
              "flex-1 flex flex-col items-center group relative h-[80%] justify-end cursor-pointer transition-all",
              isSelected ? "bg-blue-500/5 ring-1 ring-blue-500/20 rounded-xl" : "hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl"
            )}
          >
            <div className={cn(
              "w-full h-full max-w-[32px] flex flex-col-reverse relative z-10 transition-all group-hover:scale-x-110",
              isSelected && "scale-x-110"
            )}>
               {/* Amazon Bar (Orange) */}
               <div className="w-full bg-[#f97316] transition-all duration-500 shadow-[0_-2px_4px_rgba(249,115,22,0.1)]" style={{ height: `${hAmazon}%` }} />
               {/* Other Bar (Purple) */}
               <div className="w-full bg-[#8b5cf6] border-b border-white/10 transition-all duration-500" style={{ height: `${hOther}%` }} />
               {/* Eva Bar (Cyan) */}
               <div className="w-full bg-[#0ea5e9] border-b border-white/10 transition-all duration-500" style={{ height: `${hEva}%` }} />
            </div>

            {/* Line Dots (Quantity) */}
            <div className="absolute z-20 w-1.5 h-1.5 bg-[#f97316] border border-white dark:border-slate-900 rounded-full shadow-sm" style={{ top: `${lineYAmazon}%` }} />
            <div className="absolute z-20 w-1.5 h-1.5 bg-[#0ea5e9] border border-white dark:border-slate-900 rounded-full shadow-sm" style={{ top: `${lineYEva}%` }} />
            <div className="absolute z-20 w-1.5 h-1.5 bg-[#8b5cf6] border border-white dark:border-slate-900 rounded-full shadow-sm" style={{ top: `${lineYOther}%` }} />

            <span className="text-[8px] font-bold text-slate-400 mt-2 rotate-45 origin-left whitespace-nowrap">{d.periodName}</span>
            
            {/* Tooltip */}
            <div className="absolute bottom-full mb-4 hidden group-hover:flex flex-col gap-1 bg-[#00B5E2] border border-white/20 rounded-lg p-3 shadow-2xl z-50 min-w-[200px] animate-in fade-in zoom-in-95 backdrop-blur-md">
                 <span className="text-[10px] font-bold text-white/80  tracking-widest border-b border-white/20 pb-1 mb-1">Period: {d.periodName}</span>
                 
                 <div className="flex justify-between items-center text-[11px] font-bold text-white">
                   <div className="flex items-center gap-1.5">Total Reimbursed Amount</div>
                   <span className="tabular-nums">${totalAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                 </div>
                 <div className="flex justify-between items-center text-[11px] font-bold text-white mb-2">
                   <div className="flex items-center gap-1.5">Total Reimbursed Quantity</div>
                   <span className="tabular-nums">{d.quantityAmazon + d.quantityEva + d.quantityOther}</span>
                 </div>

                 <div className="space-y-0.5">
                   <div className="flex justify-between items-center text-[10px] text-white/90">
                     <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-white" /> Reimburse Amount By Eva</div>
                     <span>${d.amountEva.toFixed(0)}</span>
                   </div>
                   <div className="flex justify-between items-center text-[10px] text-white/90">
                     <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-white opacity-60" /> Reimburse Quantity By Eva</div>
                     <span>{d.quantityEva}</span>
                   </div>
                   <div className="h-px bg-white/10 my-1" />
                   <div className="flex justify-between items-center text-[10px] text-white/90">
                     <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6]" /> Reimburse Amount By Other</div>
                     <span>${d.amountOther.toFixed(0)}</span>
                   </div>
                   <div className="flex justify-between items-center text-[10px] text-white/90">
                     <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6] opacity-60" /> Reimburse Quantity By Other</div>
                     <span>{d.quantityOther}</span>
                   </div>
                   <div className="h-px bg-white/10 my-1" />
                   <div className="flex justify-between items-center text-[10px] text-white/90">
                     <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-[#f97316]" /> Reimburse Amount By Amazon</div>
                     <span>${d.amountAmazon.toFixed(0)}</span>
                   </div>
                   <div className="flex justify-between items-center text-[10px] text-white/90">
                     <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-[#f97316] opacity-60" /> Reimburse Quantity By Amazon</div>
                     <span>{d.quantityAmazon}</span>
                   </div>
                 </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// --- Main Component ---

export const ReimbursementAnalytics: React.FC<{ 
  onTabChange?: (tab: string) => void,
  selectedPackage?: string
}> = ({ onTabChange, selectedPackage }) => {
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState('USD');
  const [selectedRegion, setSelectedRegion] = useState('NA'); // NA, EU, FE
  const [isRegionSelectorOpen, setIsRegionSelectorOpen] = useState(false);
  const regionSelectorRef = React.useRef<HTMLDivElement>(null);

  const [selectedSeller, setSelectedSeller] = useState('Seller A');
  const [isSellerSelectorOpen, setIsSellerSelectorOpen] = useState(false);
  const sellerSelectorRef = React.useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState('analytics'); // analytics, cases
  const [hasSubscribed, setHasSubscribed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const totalItems = 15135;

  const [search, setSearch] = useState('');
  const [trendData, setTrendData] = useState<TrendData[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [totalCases, setTotalCases] = useState(0);

  const [isRequestsOpen, setIsRequestsOpen] = useState(false);
  const requestsRef = React.useRef<HTMLDivElement>(null);
  const [isTaskPopupOpen, setIsTaskPopupOpen] = useState(false);
  const [taskPopupType, setTaskPopupType] = useState<string | null>(null);

  const isPremiumPackage = selectedPackage === 'reimbursement' || selectedPackage === 'eva_ai_reimbursement';
  const [shouldGlow, setShouldGlow] = useState(false);

  const triggerGlow = () => {
    if (hasSubscribed) return;
    setShouldGlow(true);
    setTimeout(() => setShouldGlow(false), 2000);
  };



  // Advanced Multi-Select Filter States
  const [filterCreatedBy, setFilterCreatedBy] = useState<string[]>([]);
  const [filterReason, setFilterReason] = useState<string[]>([]);
  const [filterStatus, setFilterStatus] = useState<string[]>([]);
  const [filterDoc, setFilterDoc] = useState<string[]>([]);
  const [filterDate, setFilterDate] = useState<string[]>([]);
  const [filterSearch, setFilterSearch] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  // Column Selection State
  const [visibleColumns, setVisibleColumns] = useState<string[]>(ALL_CASE_COLUMNS.map(c => c.id));
  const [isColumnSelectorOpen, setIsColumnSelectorOpen] = useState(false);
  const [columnSearch, setColumnSearch] = useState('');

  const [sortConfig, setSortConfig] = useState<{ key: keyof CaseItem | null, direction: 'asc' | 'desc' | null }>({ key: null, direction: null });
  const [manageFilesForCase, setManageFilesForCase] = useState<CaseItem | null>(null);
  const [uploadFileForCase, setUploadFileForCase] = useState<string | null>(null);

  const monthsList = Array.from({ length: 18 }).map((_, i) => {
    const d = new Date();
    const m = new Date(d.getFullYear(), d.getMonth() - i, 1);
    return m.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  });

  const filterOptions = {
    'Created by': ['Amazon', 'Auto-Amazon', 'EVA', 'Other'],
    'Reason': ['Lost Warehouse', 'Damaged Warehouse', 'Lost Inbound', 'Damaged Inbound', 'Customer Service Issue', 'Customer Return', 'Reim. Reversal', 'Fee Correction'],
    'Case Status': ['Pending', 'Invoiced', 'Approved', 'Paid', 'Found'],
    'Document Needed': ['POP', 'POD', 'POP or POD', 'POP and POD'],
    'Date': monthsList
  };

  const toggleFilter = (label: string, item: string, current: string[], setter: (v: string[]) => void) => {
    if (current.includes(item)) setter(current.filter(i => i !== item));
    else setter([...current, item]);
  };

  const filteredCases = React.useMemo(() => {
    let result = cases.filter(item => {
      // Search
      const s = search.toLowerCase();
      const matchesSearch = !search || 
        item.caseId.toLowerCase().includes(s) || 
        item.sku.toLowerCase().includes(s) || 
        item.asin.toLowerCase().includes(s) ||
        item.shipmentId.toLowerCase().includes(s) ||
        item.fnsku.toLowerCase().includes(s) ||
        item.reasonDisplay.toLowerCase().includes(s);

      if (!matchesSearch) return false;

      // Other Multi-Select Filters
      if (filterCreatedBy.length > 0 && !filterCreatedBy.includes(item.source)) return false;
      if (filterStatus.length > 0 && !filterStatus.includes(item.status)) return false;
      if (filterReason.length > 0 && !filterReason.includes(item.reasonDisplay)) return false;
      
      // Date filter check against creationDate
      if (filterDate.length > 0) {
        const itemDate = new Date(item.creationDate);
        const itemMonthYear = itemDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        if (!filterDate.includes(itemMonthYear)) return false;
      }
      
      // Doc Needed logic
      if (filterDoc.length > 0 && !filterDoc.includes(item.documentNeededDisplay)) return false;

      return true;
    });

    if (sortConfig.key && sortConfig.direction) {
      result.sort((a, b) => {
        const key = sortConfig.key!;
        // @ts-ignore
        const aVal = a[key] ?? '';
        // @ts-ignore
        const bVal = b[key] ?? '';
        if (aVal === bVal) return 0;
        const multiplier = sortConfig.direction === 'asc' ? 1 : -1;
        return aVal < bVal ? -1 * multiplier : 1 * multiplier;
      });
    }

    return result;
  }, [cases, search, filterCreatedBy, filterStatus, filterReason, filterDoc, filterDate, sortConfig]);

  const handleTabChange = (val: string) => {
    setActiveTab(val);
    if (onTabChange) onTabChange(val);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (regionSelectorRef.current && !regionSelectorRef.current.contains(event.target as Node)) {
        setIsRegionSelectorOpen(false);
      }
      if (sellerSelectorRef.current && !sellerSelectorRef.current.contains(event.target as Node)) {
        setIsSellerSelectorOpen(false);
      }
      if (requestsRef.current && !requestsRef.current.contains(event.target as Node)) {
        setIsRequestsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    // Initial data load simulation
    console.log(`Fetching analytical data for ${currency}...`);
    setLoading(true);
    setTimeout(() => {
      const data = generateTrendData();
      setTrendData(data);
      // Set default selected month to the latest one
      setSelectedMonth(data[data.length - 1].periodName);
      setCases(generateCases(pageSize));
      setTotalCases(3842);
      setLoading(false);
    }, 1200);
  }, [currency]);

  const activePeriodData = trendData.find(d => d.periodName === selectedMonth);
  const reasonsData = activePeriodData?.reasons || [];

  const totalReasonAmount = reasonsData.reduce((acc, curr) => acc + curr.amount, 0);

  const pageTitle = activeTab === 'analytics' ? 'Reimbursement Overview' : 'Case List';
  const pageSubtitle = activeTab === 'analytics' 
    ? 'Comprehensive analysis of financial and inventory recoveries' 
    : 'Detailed tracking and management of individual reimbursement claims';

  return (
    <div className="flex flex-col gap-8 pb-12 animate-in fade-in duration-500">
      {(selectedPackage === 'eva_ai') && (
        <div className={cn(
          "w-full rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 animate-in slide-in-from-top-4 duration-500 shadow-sm transition-all",
          hasSubscribed 
            ? "bg-[#2dd48f] text-slate-900 font-medium" 
            : "bg-blue-600 text-white shadow-lg shadow-blue-500/10",
          shouldGlow && "scale-[1.02] shadow-[0_0_40px_rgba(37,99,235,0.4)] dark:shadow-[0_0_40px_rgba(37,99,235,0.2)]"
        )}>
          {hasSubscribed ? (
            <div className="flex items-center gap-3 w-full">
              <div className="w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center shrink-0">
                <Check size={14} className="text-[#2dd48f]" strokeWidth={3} />
              </div>
              <p className="text-[13px] leading-tight">
                Thank you for your interest. <span className="underline cursor-pointer">An email will be sent to you within a couple of hours</span>, please check your inbox for further instructions.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                  <ShieldAlert size={20} className="text-white" />
                </div>
                <div className="flex flex-col">
                  <p className="text-[14px] font-bold leading-tight">Don’t let the 60-day window close.</p>
                  <p className="text-[12px] opacity-90 font-medium">We track, audit, and recover your FBA reimbursements before they expire forever.</p>
                </div>
              </div>
              <button 
                onClick={() => setHasSubscribed(true)}
                className={cn(
                  "px-6 py-2.5 bg-white text-blue-600 rounded-xl font-bold text-[13px] hover:bg-blue-50 transition-all active:scale-95 shadow-sm shrink-0",
                  shouldGlow && "ring-8 ring-white/50 scale-105 shadow-[0_0_50px_rgba(255,255,255,1)]"
                )}
              >
                Subscribe Now For Free
              </button>
            </>
          )}
        </div>
      )}
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 backdrop-blur-md">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {pageTitle}
            </h1>
            <HelpLink />
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-[14px] font-medium">{pageSubtitle}</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          {/* Seller Selector */}
          <div className="relative shrink-0" ref={sellerSelectorRef}>
            <button 
              onClick={() => setIsSellerSelectorOpen(!isSellerSelectorOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 h-8 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-200 shadow-sm hover:border-slate-300 transition-all group"
            >
              <Users size={14} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
              <span className="truncate max-w-[100px]">{selectedSeller}</span>
              <ChevronDown size={14} className={cn("text-slate-400 transition-transform duration-200", isSellerSelectorOpen ? "rotate-180" : "")} />
            </button>

            {isSellerSelectorOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-[110] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="p-1.5 flex flex-col gap-0.5">
                  {['Seller A', 'Seller B', 'Seller C', 'Seller D'].map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setSelectedSeller(s);
                        setIsSellerSelectorOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold transition-all",
                        selectedSeller === s
                          ? "bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                      )}
                    >
                      <span>{s}</span>
                      {selectedSeller === s && <Check size={12} className="text-blue-600" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Region Selector */}
          <div className="relative shrink-0" ref={regionSelectorRef}>
            <button 
              onClick={() => setIsRegionSelectorOpen(!isRegionSelectorOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 h-8 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-200 shadow-sm hover:border-slate-300 transition-all group"
            >
              <Globe size={14} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
              <span className="truncate max-w-[100px]">
                {selectedRegion === 'NA' ? 'North America' : 
                 selectedRegion === 'EU' ? 'Europe' : 'Far East'}
              </span>
              <ChevronDown size={14} className={cn("text-slate-400 transition-transform duration-200", isRegionSelectorOpen ? "rotate-180" : "")} />
            </button>

            {isRegionSelectorOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-[110] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="p-1.5 flex flex-col gap-0.5">
                  {[
                    { id: 'NA', label: 'North America (NA)' },
                    { id: 'EU', label: 'Europe (EU)' },
                    { id: 'FE', label: 'Far East (FE)' },
                  ].map((reg) => (
                    <button
                      key={reg.id}
                      onClick={() => {
                        setSelectedRegion(reg.id);
                        setIsRegionSelectorOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold transition-all",
                        selectedRegion === reg.id
                          ? "bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                      )}
                    >
                      <span>{reg.label}</span>
                      {selectedRegion === reg.id && <Check size={12} className="text-blue-600" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <select 
            value={currency} 
            onChange={(e) => setCurrency(e.target.value)}
            className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 h-8 text-xs font-bold text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-blue-500/20 shadow-sm cursor-pointer"
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="TRY">TRY (₺)</option>
          </select>
        </div>

      </div>

      {/* Tabs System */}
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full focus:outline-none">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 dark:border-slate-800 mb-8 pb-2 gap-4">
          <TabsList className="justify-start rounded-none border-0 bg-transparent p-0 flex gap-2">
            <TabsTrigger 
              value="analytics" 
              className="data-[state=active]:border-blue-600 dark:data-[state=active]:border-blue-400 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 relative h-10 rounded-none border-b-2 border-b-transparent bg-transparent px-8 pb-3 pt-2 font-bold text-[13px] shadow-none transition-none data-[state=active]:shadow-none text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="cases" 
              className="data-[state=active]:border-blue-600 dark:data-[state=active]:border-blue-400 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 relative h-10 rounded-none border-b-2 border-b-transparent bg-transparent px-8 pb-3 pt-2 font-bold text-[13px] shadow-none transition-none data-[state=active]:shadow-none text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
            >
              Cases
            </TabsTrigger>

          </TabsList>

          <div className="flex items-center gap-3 ml-auto pr-1"></div>
        </div>

        <TabsContent value="analytics" className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-2 duration-500 outline-none">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {loading ? <SkeletonLoader /> : (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col items-center sm:flex-row sm:justify-around gap-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-700">
                   <Box size={80} className="text-blue-500" />
                </div>
                <div className="flex flex-col gap-1 z-10">
                   <h3 className="text-sm font-bold text-slate-400 tracking-wide">Inventory Recovery</h3>
                   <p className="text-[11px] font-bold text-slate-500 max-w-[150px]">Physical items regained from Amazon warehouse discrepancies</p>
                </div>
                <div className="z-10">
                  <SemiCircleProgress value={162} total={184} />
                </div>
              </div>
            )}

            {loading ? <SkeletonLoader /> : (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-700">
                   <DollarSign size={80} className="text-emerald-500" />
                </div>
                <FinancialRecovery data={{
                  totalReimbursedAmount: 6084.58,
                  estimatedMonthlyAmount: 3721.29,
                  withEva: true
                }} />
              </div>
            )}
          </div>

          {/* Trend & Reasons Section */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            <div className="xl:col-span-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <h3 className="text-[13px] font-bold text-slate-900 dark:text-white tracking-wide">18 Month Reimbursement Trend</h3>
                  <p className="text-[11px] text-slate-400 font-bold tracking-widest flex items-center gap-1">
                    <LayoutGrid size={12} className="text-blue-500" /> Amount vs Quantity Correlation
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 max-w-[400px] justify-end text-[9px] font-bold  tracking-tighter">
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#0ea5e9]" /> Amount By Eva</div>
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#8b5cf6]" /> Amount By Other</div>
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#f97316]" /> Amount By Amazon</div>
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-0.5 bg-[#f97316]" /> Qty By Amazon</div>
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-0.5 bg-[#0ea5e9]" /> Qty By Eva</div>
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-0.5 bg-[#8b5cf6]" /> Qty By Other</div>
                </div>
              </div>
              {loading ? (
                <div className="flex-1 min-h-[250px] flex items-end justify-center gap-2">
                  {Array.from({ length: 18 }).map((_, i) => (
                    <div key={i} className="flex-1 bg-slate-50 dark:bg-slate-800/50 rounded-md animate-pulse" style={{ height: `${20 + Math.random() * 60}%` }} />
                  ))}
                </div>
              ) : (
                <StackedTrendChart data={trendData} selectedMonth={selectedMonth} onSelect={setSelectedMonth} />
              )}
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-0.5">
                  <h3 className="text-[13px] font-bold text-slate-900 dark:text-white tracking-wide">Reason Breakdown</h3>
                  <span className="text-[10px] font-bold text-blue-500  tracking-widest">{selectedMonth} Details</span>
                </div>
                <Info size={14} className="text-slate-300 cursor-help" />
              </div>

              <div className="flex-1 flex flex-col items-center justify-center relative">
                <div className="relative w-40 h-40 rounded-full border-[18px] border-slate-50 dark:border-slate-800/50 flex items-center justify-center mb-6">
                   <div className="absolute inset-[-18px] rounded-full border-[18px] border-blue-500 border-r-transparent border-b-transparent rotate-[20deg]" />
                   <div className="absolute inset-[-18px] rounded-full border-[18px] border-emerald-500 border-l-transparent border-t-transparent -rotate-12 opacity-80" />
                   <div className="text-center">
                      <span className="text-xl font-bold text-slate-900 dark:text-white">${(totalReasonAmount / 1000).toFixed(1)}k</span>
                      <p className="text-[9px] font-bold text-slate-400  tracking-widest">Total</p>
                   </div>
                </div>

                <div className="w-full flex flex-col gap-3">
                   {reasonsData.map((r, i) => (
                     <div key={i} className="flex items-center justify-between group cursor-pointer">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: r.color }} />
                          <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 truncate group-hover:text-blue-500 transition-colors  tracking-tight">{r.reasonKey}</span>
                        </div>
                        <div className="flex items-center gap-3">
                           <span className={cn("text-[11px] font-bold tabular-nums", r.amount < 0 ? "text-rose-500" : "text-slate-900 dark:text-white")}>
                             ${Math.abs(r.amount).toLocaleString(undefined, { minimumFractionDigits: 1 })}
                           </span>
                           <span className="text-[10px] font-bold text-slate-400 min-w-[30px] text-right">{Math.abs((r.amount / totalReasonAmount) * 100).toFixed(1)}%</span>
                        </div>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Lists */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 px-2">
                   <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
                   <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-wide">Most Reimbursed Items by Value</h3>
                </div>
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                   <div className="divide-y divide-slate-100 dark:divide-slate-800">
                      {topItemsValue.map((item, i) => (
                        <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-blue-600/5 transition-all group">
                           <div className="flex items-center gap-4 min-w-0">
                              <span className="text-[10px] font-bold text-slate-300 dark:text-slate-700 w-4">0{i+1}</span>
                              <div className="w-8 h-8 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
                                 <LayoutGrid size={14} className="text-slate-400" />
                              </div>
                              <div className="flex flex-col gap-0.5 truncate">
                                 <span className="text-[12px] font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-500 transition-colors  truncate max-w-[120px]">{item.sku}</span>
                                 <span className="text-[10px] font-bold text-slate-400  tracking-tighter">{item.quantity} Units Total</span>
                              </div>
                           </div>
                           <span className="text-[14px] font-bold text-slate-900 dark:text-white tabular-nums">${item.amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                        </div>
                      ))}
                   </div>
                </div>
             </div>

             <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 px-2">
                   <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                   <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-wide">Most Reimbursed Items by Quantity</h3>
                </div>
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                   <div className="divide-y divide-slate-100 dark:divide-slate-800">
                      {topItemsQuantity.map((item, i) => (
                        <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-emerald-600/5 transition-all group">
                           <div className="flex items-center gap-4 min-w-0">
                              <span className="text-[10px] font-bold text-slate-300 dark:text-slate-700 w-4">0{i+1}</span>
                              <div className="w-8 h-8 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
                                 <ShoppingCart size={14} className="text-slate-400" />
                              </div>
                              <div className="flex flex-col gap-0.5 truncate">
                                 <span className="text-[12px] font-bold text-slate-800 dark:text-slate-200 group-hover:text-emerald-500 transition-colors  truncate max-w-[120px]">{item.sku}</span>
                                 <span className="text-[10px] font-bold text-slate-400  tracking-tighter">${item.amount.toLocaleString(undefined, { maximumFractionDigits: 0 })} Value</span>
                              </div>
                           </div>
                           <span className="text-[14px] font-bold text-emerald-500 tabular-nums">{item.quantity} units</span>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        </TabsContent>

        <TabsContent value="cases" className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-2 duration-500 outline-none">

          {/* Filter Row */}
          <div className="flex flex-wrap items-center gap-3 bg-slate-50/50 dark:bg-slate-900/40 p-2 rounded-2xl border border-slate-200/50 dark:border-slate-800/50">
            <div className="relative group w-80">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={15} />
               <input 
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
                 placeholder="Search cases, shipments, ASINs..." 
                 className="w-full pl-11 pr-4 py-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-[13.5px] font-bold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all shadow-sm font-mono"
               />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {[
                { label: 'Created by', options: filterOptions['Created by'] },
                { label: 'Case Status', options: filterOptions['Case Status'] },
                { label: 'Reason', options: filterOptions['Reason'] },
                { label: 'Document Needed', options: filterOptions['Document Needed'] },
                { label: 'Date', options: filterOptions['Date'] }
              ].map(({ label, options }) => {
                const current = 
                  label === 'Created by' ? filterCreatedBy :
                  label === 'Case Status' ? filterStatus :
                  label === 'Reason' ? filterReason :
                  label === 'Document Needed' ? filterDoc : filterDate;
                
                const setter = 
                  label === 'Created by' ? setFilterCreatedBy :
                  label === 'Case Status' ? setFilterStatus :
                  label === 'Reason' ? setFilterReason :
                  label === 'Document Needed' ? setFilterDoc : setFilterDate;

                const isOpen = activeDropdown === label;
                const filteredOptions = options.filter(opt => opt.toLowerCase().includes(filterSearch.toLowerCase()));

                return (
                  <div key={label} className="relative">
                    <div 
                      onClick={() => {
                        setActiveDropdown(isOpen ? null : label);
                        setFilterSearch('');
                      }}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-900 border rounded-lg shadow-sm hover:border-slate-300 transition-all cursor-pointer",
                        isOpen ? "border-blue-400 ring-2 ring-blue-500/5" : "border-slate-200 dark:border-slate-800"
                      )}
                    >
                      <div className="w-2 h-2 rounded-full bg-violet-600 shadow-[0_0_8px_rgba(124,58,237,0.3)]" />
                      <span className="text-[12px] font-bold text-slate-500 dark:text-slate-400">
                        {label}: <span className={cn("transition-colors", current.length > 0 ? "text-indigo-600 opacity-100" : "text-slate-400 dark:text-slate-500 font-medium")}>
                          {current.length > 1 ? `${current.length} selected` : (current.length === 0 ? 'All' : current[0])}
                        </span>
                      </span>
                      
                      <div className="flex items-center gap-1.5 ml-1">
                        <ChevronDown size={12} className={cn("text-slate-300 transition-transform duration-300", isOpen && "rotate-180 text-blue-500")} />
                        {current.length > 0 && (
                          <X 
                            size={12} 
                            onClick={(e) => {
                              e.stopPropagation();
                              setter([]);
                            }}
                            className="text-slate-300 hover:text-rose-500 transition-colors" 
                          />
                        )}
                      </div>
                    </div>

                    {isOpen && (
                      <>
                        <div className="fixed inset-0 z-[40]" onClick={() => setActiveDropdown(null)} />
                        <div className="absolute top-[calc(100%+8px)] left-0 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-[0_15px_50px_-12px_rgba(0,0,0,0.18)] z-[50] animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
                          <div className="p-4 border-b border-slate-100 dark:border-slate-800">
                             <div className="relative group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={14} />
                                <input 
                                  value={filterSearch}
                                  onChange={(e) => setFilterSearch(e.target.value)}
                                  placeholder="Search..." 
                                  autoFocus
                                  className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-[13px] font-medium outline-none focus:border-blue-500 transition-all placeholder:text-slate-300"
                                />
                             </div>
                          </div>
                          <div className="max-h-[300px] overflow-y-auto p-1 custom-scrollbar">
                             {filteredOptions.length > 0 ? (
                               filteredOptions.map((opt) => (
                                 <div 
                                   key={opt} 
                                   onClick={() => toggleFilter(label, opt, current, setter)}
                                   className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg cursor-pointer group transition-colors"
                                 >
                                    <div className={cn(
                                      "w-[18px] h-[18px] rounded border flex items-center justify-center transition-all",
                                      current.includes(opt) 
                                        ? "bg-blue-600 border-blue-600 text-white" 
                                        : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 group-hover:border-blue-400"
                                    )}>
                                       {current.includes(opt) && <Receipt size={12} strokeWidth={4} />}
                                    </div>
                                    <span className={cn("text-[13px] font-bold", current.includes(opt) ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400")}>{opt}</span>
                                 </div>
                               ))
                             ) : (
                               <div className="px-4 py-10 text-center text-[12px] font-bold text-slate-400">No results found</div>
                             )}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section Header */}
          <div className="flex items-center gap-4">
            <h2 className="text-[13px] font-bold text-slate-900 dark:text-white tracking-wide">
              Cases
            </h2>
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
          </div>

          {/* Main Data Container */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none overflow-hidden flex flex-col">
            {/* Action Bar */}
            <div className="flex items-center justify-end px-6 py-4 gap-3 bg-slate-50/30 dark:bg-slate-800/20 border-b border-slate-100 dark:border-slate-800">
               {/* Requests Button */}
               <div className="relative" ref={requestsRef}>
                  <button 
                    onClick={() => {
                        if (!isPremiumPackage) {
                            triggerGlow();
                            return;
                        }
                        setIsRequestsOpen(!isRequestsOpen);
                    }}
                    className={cn(
                        "flex items-center gap-2 px-4 py-2 bg-blue-600 border border-blue-500 rounded-xl text-[12px] font-black text-white hover:bg-blue-700 transition-all shadow-sm group",
                        !isPremiumPackage && "opacity-60 cursor-pointer grayscale-[0.5]"
                    )}
                  >
                    <Plus size={14} className={cn("transition-transform", (isRequestsOpen && isPremiumPackage) ? "rotate-90" : "")} />
                    <span className="tracking-wide text-white">Requests</span>
                  </button>

                  {isRequestsOpen && (
                    <>
                      <div className="fixed inset-0 z-[40]" onClick={() => setIsRequestsOpen(false)} />
                      <div className="absolute top-[calc(100%+8px)] right-0 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-[50] overflow-hidden animate-in fade-in zoom-in-95 duration-200 ring-1 ring-slate-900/5">
                        <div className="p-1.5 flex flex-col gap-0.5">
                           <div className="px-3 py-2">
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Available Actions</p>
                           </div>
                           <button 
                             onClick={() => {
                               setTaskPopupType("Remeasurement Request");
                               setIsTaskPopupOpen(true);
                               setIsRequestsOpen(false);
                             }}
                             className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/30 hover:text-blue-600 transition-all text-left"
                           >
                             <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-900/40 flex items-center justify-center text-blue-600">
                               <History size={14} />
                             </div>
                             Remeasurement Request
                           </button>
                           <button 
                             onClick={() => {
                               setTaskPopupType("Other Reimb. Requests");
                               setIsTaskPopupOpen(true);
                               setIsRequestsOpen(false);
                             }}
                             className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/30 hover:text-emerald-600 transition-all text-left"
                           >
                             <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-600">
                               <MessageSquare size={14} />
                             </div>
                             Other Reimb. Requests
                           </button>
                        </div>
                      </div>
                    </>
                  )}
               </div>

               <button 
                 onClick={() => !isPremiumPackage && triggerGlow()}
                 className={cn(
                   "flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-[12px] font-black text-slate-500 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm group",
                   !isPremiumPackage && "opacity-60 grayscale-[0.5]"
                 )}
               >
                  <Download size={14} className="group-hover:-translate-y-0.5 transition-transform" />
                  <span className="tracking-wide">Account Level Export</span>
               </button>
               <button 
                 onClick={() => !isPremiumPackage && triggerGlow()}
                 className={cn(
                   "flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-[12px] font-black text-slate-500 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm group",
                   !isPremiumPackage && "opacity-60 grayscale-[0.5]"
                 )}
               >
                  <Download size={14} className="group-hover:-translate-y-0.5 transition-transform" />
                  <span className="tracking-wide">Export</span>
               </button>

               {/* Column Selector */}
               <div className="relative">
                  <button 
                    onClick={() => {
                        if (!isPremiumPackage) {
                            triggerGlow();
                            return;
                        }
                        setIsColumnSelectorOpen(!isColumnSelectorOpen);
                    }}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border rounded-xl shadow-sm transition-all hover:border-blue-400 group h-full",
                      isColumnSelectorOpen ? "border-blue-500 text-blue-600" : "border-slate-200 dark:border-slate-800 text-slate-500",
                      !isPremiumPackage && "opacity-60 grayscale-[0.5]"
                    )}
                  >
                    <Columns size={14} />
                    <span className="text-[12px] font-black tracking-wide">Columns</span>
                    <div className="ml-1 px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[10px] font-black">{visibleColumns.length}</div>
                  </button>

                  {isColumnSelectorOpen && (
                    <>
                      <div className="fixed inset-0 z-[40]" onClick={() => setIsColumnSelectorOpen(false)} />
                      <div className="absolute top-[calc(100%+8px)] right-0 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-[50] overflow-hidden flex flex-col">
                         <div className="p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50">
                            <h4 className="text-[12px] font-black tracking-wide text-slate-400 mb-4">Column Management</h4>
                            <div className="relative">
                               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={13} />
                               <input 
                                 value={columnSearch}
                                 onChange={(e) => setColumnSearch(e.target.value)}
                                 placeholder="Search columns..." 
                                 className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-950 border border-slate-200 rounded-xl text-[12px] font-bold outline-none"
                               />
                            </div>
                         </div>
                         <div className="max-h-[400px] overflow-y-auto p-2">
                            {ALL_CASE_COLUMNS.filter(c => c.label.toLowerCase().includes(columnSearch.toLowerCase())).map((col) => {
                              const isVisible = visibleColumns.includes(col.id);
                              return (
                                <div 
                                  key={col.id} 
                                  onClick={() => col.id !== 'caseId' && setVisibleColumns(prev => isVisible ? prev.filter(id => id !== col.id) : [...prev, col.id])}
                                  className={cn("flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-slate-50", isVisible && "bg-blue-50/50")}
                                >
                                  <div className={cn("w-[18px] h-[18px] rounded-lg border-2 flex items-center justify-center", isVisible ? "bg-blue-600 border-blue-600 text-white" : "border-slate-300 bg-white")}>
                                     {isVisible && <Receipt size={10} strokeWidth={4} />}
                                  </div>
                                  <span className={cn("text-[12.5px] font-bold", isVisible ? "text-slate-900" : "text-slate-500")}>{col.label}</span>
                                </div>
                              );
                            })}
                         </div>
                      </div>
                    </>
                  )}
               </div>
            </div>

            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-sm border-separate border-spacing-0">
                <thead className="bg-slate-50 dark:bg-slate-900/50 sticky top-0 z-20">
                   <tr className="bg-slate-50/50 dark:bg-slate-800/20">
                     {ALL_CASE_COLUMNS.filter(c => visibleColumns.includes(c.id)).map((col, i) => (
                       <th 
                         key={col.id} 
                         onClick={() => {
                           if (col.id === 'action') return;
                           setSortConfig(prev => ({
                             key: col.id as keyof CaseItem,
                             direction: prev.key === col.id && prev.direction === 'asc' ? 'desc' : 'asc'
                           }));
                         }}
                         className={cn(
                           "p-4 text-[11px] font-black text-slate-400 whitespace-nowrap text-left border-b border-slate-100 dark:border-slate-800 transition-colors tracking-tight",
                           col.id !== 'action' ? "cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-blue-500" : "",
                           col.id === 'caseId' ? "sticky left-0 bg-slate-50 dark:bg-slate-900 shadow-[1px_0_0_0_rgb(226,232,240)] dark:shadow-[1px_0_0_0_rgb(30,41,59)] z-[2]" : "",
                           sortConfig.key === col.id && "text-blue-600 dark:text-blue-400"
                         )}
                       >
                         <div className="flex items-center gap-1.5">
                           {col.label}
                           {col.id !== 'action' && sortConfig.key === col.id && (
                             <span className="text-[10px] opacity-70">
                               {sortConfig.direction === 'asc' ? '↑' : '↓'}
                             </span>
                           )}
                         </div>
                       </th>
                     ))}
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                   {loading ? (
                     Array.from({ length: 10 }).map((_, i) => (
                       <tr key={i}>
                         {Array.from({ length: visibleColumns.length }).map((_, j) => (
                           <td key={j} className="px-4 py-3 border-b border-slate-100 dark:border-slate-800"><div className="h-4 bg-slate-50 dark:bg-slate-800/50 rounded animate-pulse" /></td>
                         ))}
                       </tr>
                     ))
                   ) : filteredCases.length > 0 ? (
                     filteredCases.map((c) => (
                       <tr key={c.caseId} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors group/row text-[12px]">
                          {visibleColumns.includes('caseId') && (
                            <td className={cn(
                               "px-4 py-3 border-b border-slate-100 dark:border-slate-800 sticky left-0 bg-white dark:bg-slate-900 group-hover/row:bg-slate-50 dark:group-hover/row:bg-slate-800/50 transition-colors shadow-[1px_0_0_0_rgb(226,232,240)] dark:shadow-[1px_0_0_0_rgb(30,41,59)] z-[1]"
                            )}>
                               <button className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-bold tracking-tight text-[12px] group/link whitespace-nowrap">
                                 {c.caseId}
                                 <ExternalLink size={10} className="opacity-0 group-hover/link:opacity-100 transition-opacity" />
                               </button>
                            </td>
                          )}
                          {visibleColumns.includes('shipmentId') && (
                            <td className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 whitespace-nowrap font-medium text-slate-500">
                               {c.shipmentId}
                            </td>
                          )}
                          {visibleColumns.includes('reimbursementId') && (
                            <td className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 whitespace-nowrap font-medium text-slate-500 tabular-nums">
                               {c.reimbursementId}
                            </td>
                          )}
                          {visibleColumns.includes('asin') && (
                            <td className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 whitespace-nowrap font-bold text-slate-900 dark:text-white">
                               {c.asin}
                            </td>
                          )}
                          {visibleColumns.includes('sku') && (
                            <td className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 whitespace-nowrap font-bold text-slate-900 dark:text-white">
                               {c.sku}
                            </td>
                          )}
                          {visibleColumns.includes('fnsku') && (
                            <td className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 whitespace-nowrap font-medium text-slate-500">
                               {c.fnsku}
                            </td>
                          )}
                          {visibleColumns.includes('reasonDisplay') && (
                            <td className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 whitespace-nowrap text-slate-600 dark:text-slate-300 font-bold">
                               {c.reasonDisplay}
                            </td>
                          )}
                          {visibleColumns.includes('status') && (
                            <td className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 whitespace-nowrap">
                               <div className={cn(
                                 "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-tight shadow-sm border",
                                 c.status === 'Approved' || c.status === 'Paid'
                                   ? "bg-emerald-50 text-emerald-600 border-emerald-100/50 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20" 
                                   : "bg-amber-50 text-amber-600 border-amber-100/50 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20"
                               )}>
                                  {c.status}
                               </div>
                            </td>
                          )}
                          {visibleColumns.includes('documentNeededDisplay') && (
                            <td className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 whitespace-nowrap text-slate-500 font-medium">
                               {c.documentNeededDisplay}
                            </td>
                          )}
                          {visibleColumns.includes('totalAmount') && (
                            <td className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 whitespace-nowrap text-right font-black text-slate-900 dark:text-white tabular-nums">
                               ${Math.abs(c.totalAmount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </td>
                          )}
                          {visibleColumns.includes('inventoryCashReimbursed') && (
                            <td className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 whitespace-nowrap text-right font-bold text-emerald-600 dark:text-emerald-500 tabular-nums">
                               {c.inventoryCashReimbursed}
                            </td>
                          )}
                          {visibleColumns.includes('inventoryReimbursed') && (
                            <td className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 whitespace-nowrap text-right font-bold text-blue-600 tabular-nums">
                               {c.inventoryReimbursed}
                            </td>
                          )}
                          {visibleColumns.includes('foundQuantity') && (
                            <td className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 whitespace-nowrap text-right font-bold text-slate-600 tabular-nums">
                               {c.foundQuantity}
                            </td>
                          )}
                          {visibleColumns.includes('source') && (
                            <td className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 whitespace-nowrap">
                               <div className="flex items-center gap-1.5">
                                  <div className={cn("w-1.5 h-1.5 rounded-full", c.source === 'EVA' ? "bg-blue-600" : "bg-orange-500")} />
                                  <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400">{c.source}</span>
                               </div>
                            </td>
                          )}
                          {visibleColumns.includes('creationDate') && (
                            <td className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 whitespace-nowrap text-slate-500 font-medium tracking-tighter">
                               {c.creationDate}
                            </td>
                          )}
                          {visibleColumns.includes('approvalDate') && (
                            <td className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 whitespace-nowrap text-slate-500 font-medium tracking-tighter">
                               {c.approvalDate}
                            </td>
                          )}
                          {visibleColumns.includes('action') && (
                            <td className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 whitespace-nowrap">
                               <div className="flex items-center justify-end gap-2">
                                  {c.uploadedFiles && c.uploadedFiles.length > 0 ? (
                                    <button 
                                      onClick={() => {
                                          if (!isPremiumPackage) {
                                              triggerGlow();
                                              return;
                                          }
                                          setManageFilesForCase(c);
                                      }}
                                      className={cn(
                                          "flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 dark:text-blue-400 rounded-lg text-[10px] font-black transition-all shadow-sm border border-blue-100 dark:border-blue-800 group/btn",
                                          !isPremiumPackage && "opacity-60 grayscale-[0.5]"
                                      )}
                                    >
                                      <FolderOpen size={12} className="group-hover:scale-110 transition-transform" />
                                      FILES
                                    </button>
                                  ) : (
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <button disabled className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 text-slate-400 border border-slate-200 dark:bg-slate-800/50 dark:border-slate-800 dark:text-slate-500 rounded-lg text-[10px] font-black cursor-not-allowed opacity-60">
                                            <FolderOpen size={12} />
                                            FILES
                                          </button>
                                        </TooltipTrigger>
                                        <TooltipContent>No files uploaded</TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  )}

                                  <button 
                                    onClick={() => {
                                        if (!isPremiumPackage) {
                                            triggerGlow();
                                            return;
                                        }
                                        c.status === 'Pending' && setUploadFileForCase(c.caseId);
                                    }}
                                    disabled={c.status !== 'Pending' && isPremiumPackage}
                                    className={cn(
                                      "flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-black transition-all shadow-sm border group/btn",
                                      (c.status === 'Pending' || !isPremiumPackage) 
                                        ? "bg-indigo-50 hover:bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 dark:text-indigo-400 border-indigo-100 dark:border-indigo-800 cursor-pointer" 
                                        : "bg-slate-50 text-slate-400 border-slate-200 dark:bg-slate-800/50 dark:border-slate-800 dark:text-slate-500 cursor-not-allowed opacity-60",
                                      !isPremiumPackage && "opacity-60 grayscale-[0.5]"
                                    )}
                                  >
                                    <Upload size={12} className={cn((c.status === 'Pending' || !isPremiumPackage) && "group-hover:scale-110 transition-transform")} />
                                    DOC
                                  </button>
                               </div>
                            </td>
                          )}
                       </tr>
                     ))
                   ) : (
                      <tr>
                         <td colSpan={visibleColumns.length} className="px-6 py-20 text-center">
                            <div className="flex flex-col items-center gap-2">
                                <Search className="text-slate-200 dark:text-slate-800" size={40} />
                                <p className="text-sm font-bold text-slate-400">No cases found matching your criteria</p>
                            </div>
                         </td>
                      </tr>
                    )}
                 </tbody>
               </table>
            </div>

            {/* Pagination Controls */}
            <div className="px-6 py-5 bg-slate-50/30 dark:bg-slate-800/20 border-t border-slate-100 dark:border-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
               <div className="text-[12px] font-bold text-slate-500">
                  Showing <span className="text-slate-900 dark:text-white">{(currentPage - 1) * pageSize + 1}</span> to <span className="text-slate-900 dark:text-white">{Math.min(currentPage * pageSize, totalItems)}</span> of <span className="text-slate-900 dark:text-white">{totalItems.toLocaleString()}</span> items
               </div>
               
               <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-1 shadow-sm">
                     <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Show</span>
                     <select 
                        value={pageSize}
                        onChange={(e) => {
                          setPageSize(Number(e.target.value));
                          setCurrentPage(1);
                        }}
                        className="bg-transparent border-none py-1 text-[12px] font-black text-blue-600 outline-none cursor-pointer min-w-[40px]"
                     >
                        <option value={20}>20</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                     </select>
                     <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">per page</span>
                  </div>

                  <div className="flex items-center gap-1">
                     <button 
                       disabled={currentPage === 1}
                       onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                       className="w-9 h-9 rounded-xl flex items-center justify-center border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 disabled:opacity-30 disabled:cursor-not-allowed hover:border-blue-300 hover:text-blue-600 transition-all shadow-sm group active:scale-90"
                     >
                        <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                     </button>
                     <div className="flex items-center gap-1 border border-slate-100 dark:border-slate-800/50 rounded-xl px-1 bg-white/50 dark:bg-slate-950/50">
                        {[1, 2, 3, '...', Math.ceil(totalItems / pageSize)].map((p, idx) => (
                           <button 
                             key={idx}
                             onClick={() => typeof p === 'number' && setCurrentPage(p)}
                             className={cn(
                               "w-9 h-9 rounded-lg text-[12px] font-black transition-all",
                               currentPage === p 
                                 ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" 
                                 : "bg-transparent text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                             )}
                           >
                              {p}
                           </button>
                        ))}
                     </div>
                     <button 
                       disabled={currentPage === Math.ceil(totalItems / pageSize)}
                       onClick={() => setCurrentPage(prev => Math.min(Math.ceil(totalItems / pageSize), prev + 1))}
                       className="w-9 h-9 rounded-xl flex items-center justify-center border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 disabled:opacity-30 disabled:cursor-not-allowed hover:border-blue-300 hover:text-blue-600 transition-all shadow-sm group active:scale-90"
                     >
                        <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                     </button>
                  </div>
               </div>
            </div>
          </div>
        </TabsContent>


      </Tabs>

      {manageFilesForCase && (
        <ManageCaseFilesDialog 
          files={manageFilesForCase.uploadedFiles || []} 
          onClose={() => setManageFilesForCase(null)} 
        />
      )}

      {uploadFileForCase && (
        <UploadFileDialog
          caseId={uploadFileForCase}
          onClose={() => setUploadFileForCase(null)}
        />
      )}

      {/* Task Creation Popup Placeholder */}
      {isTaskPopupOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-[2px] animate-in fade-in duration-300" onClick={() => setIsTaskPopupOpen(false)} />
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[32px] shadow-2xl z-[210] overflow-hidden animate-in zoom-in-95 fade-in duration-300">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/50 flex items-center justify-center text-blue-600">
                    <Plus size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white leading-tight">Create Task</h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{taskPopupType}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsTaskPopupOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2.5">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Task Subtitle</label>
                  <input 
                    type="text"
                    defaultValue={taskPopupType || ""}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-[13px] font-bold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all"
                    placeholder="Enter task title..."
                  />
                </div>
                <div className="flex flex-col gap-2.5">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Description</label>
                  <textarea 
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-[13px] font-bold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all resize-none"
                    placeholder="Provide details for this reimbursement request..."
                  />
                </div>
              </div>

              <div className="mt-10 flex items-center gap-3">
                <button 
                  onClick={() => setIsTaskPopupOpen(false)}
                  className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-2xl font-black text-[13px] hover:bg-slate-200 transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setIsTaskPopupOpen(false)}
                  className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-black text-[13px] hover:bg-blue-700 shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
                >
                  Create Task
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
