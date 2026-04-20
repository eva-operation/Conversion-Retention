import React from 'react';
import { X, ArrowUp, ArrowDown, Info, Plus } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './Tooltip';

interface ExpenseBreakdownDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ExpenseBreakdownDialog: React.FC<ExpenseBreakdownDialogProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose}></div>
            <div className="relative z-10 w-full max-w-[560px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/30 dark:bg-slate-900/50">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-5 bg-rose-500 rounded-full shadow-sm shadow-rose-500/20" />
                        <div>
                            <h3 className="text-sm font-black text-slate-900 dark:text-white tracking-tight tracking-wider">Total Expense Breakdown</h3>
                            <p className="text-[10px] text-slate-400 font-bold tracking-widest mt-0.5 opacity-80">Operational Cost Analysis</p>
                        </div>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-400 hover:text-rose-500 transition-all active:scale-95"
                    >
                        <X size={20} strokeWidth={2.5} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-8 space-y-6 max-h-[75vh] overflow-y-auto no-scrollbar">
                    {/* Summary Row */}
                    <div className="flex items-center justify-between py-4 border-b border-slate-100 dark:border-slate-800/50 rounded-xl px-1">
                        <div className="flex gap-12 items-center">
                            <div className="flex items-center gap-2.5 min-w-[130px]">
                                <span className="text-[14px] font-black text-slate-800 dark:text-slate-200 tabular-nums">$587,732.28</span>
                            </div>
                            <div className="flex items-center gap-2.5 min-w-[130px]">
                                <div className="w-2 h-4 bg-rose-500 rounded-sm shadow-sm" />
                                <span className="text-[14px] font-black text-slate-800 dark:text-slate-200 tabular-nums"> $416,519.41</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 text-[12px] font-black text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-100/50">
                            <ArrowDown size={14} strokeWidth={3} />
                            29.13%
                        </div>
                    </div>

                    {/* Segmented Progress Bar */}
                    <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex shadow-inner">
                        <div className="h-full bg-rose-500 border-r border-white/20" style={{ width: '27.72%' }} />
                        <div className="h-full bg-rose-500/80 border-r border-white/20" style={{ width: '7.67%' }} />
                        <div className="h-full bg-rose-500/60 border-r border-white/20" style={{ width: '29.25%' }} />
                        <div className="h-full bg-rose-500/40 border-r border-white/20" style={{ width: '5.03%' }} />
                        <div className="h-full bg-rose-500/20 border-r border-white/20" style={{ width: '28.22%' }} />
                        <div className="h-full bg-slate-200 dark:bg-slate-700" style={{ width: '2.11%' }} />
                    </div>

                    <button className="w-full py-2.5 border border-dashed border-slate-300 dark:border-slate-700 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black text-slate-400 hover:text-blue-500 hover:border-blue-500/50 transition-all tracking-widest bg-slate-50/50 dark:bg-slate-800/20 mt-2">
                        <Plus size={14} />
                        Add business expense
                    </button>

                    {/* Expense Rows */}
                    <div className="space-y-4">
                        {/* FBA Fee */}
                        <div className="space-y-1.5">
                            <div className="flex items-center gap-2 px-1">
                                <span className="text-[10px] font-black text-slate-500 tracking-widest leading-none">FBA Fee</span>
                                <span className="text-[10px] font-black bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 px-1.5 py-0.5 rounded">27.72%</span>
                            </div>
                            <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all rounded-lg px-2 group">
                                <div className="flex gap-12 items-center">
                                    <span className="text-[13px] font-bold text-slate-500 tabular-nums min-w-[130px] opacity-70 cursor-default group-hover:opacity-100 transition-opacity">-$102,695.03</span>
                                    <span className="text-[13px] font-black text-slate-800 dark:text-slate-200 tabular-nums min-w-[130px]">-$115,447.34</span>
                                </div>
                                <div className="text-[11px] font-black text-rose-500 flex items-center gap-1">
                                    <ArrowUp size={12} strokeWidth={3} />
                                    12.42%
                                </div>
                            </div>
                        </div>

                        {/* Refund */}
                        <div className="space-y-1.5">
                            <div className="flex items-center gap-2 px-1">
                                <span className="text-[10px] font-black text-slate-500 tracking-widest leading-none">Refund</span>
                                <span className="text-[10px] font-black bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 px-1.5 py-0.5 rounded">7.67%</span>
                            </div>
                            <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all rounded-lg px-2 group">
                                <div className="flex gap-12 items-center">
                                    <span className="text-[13px] font-bold text-slate-500 tabular-nums min-w-[130px] opacity-70 group-hover:opacity-100">-$32,452.76</span>
                                    <span className="text-[13px] font-black text-slate-800 dark:text-slate-200 tabular-nums min-w-[130px]">-$31,950.74</span>
                                </div>
                                <div className="text-[11px] font-black text-emerald-500 flex items-center gap-1">
                                    <ArrowDown size={12} strokeWidth={3} />
                                    1.55%
                                </div>
                            </div>
                        </div>

                        {/* Referral Fee */}
                        <div className="space-y-1.5">
                            <div className="flex items-center gap-2 px-1">
                                <span className="text-[10px] font-black text-slate-500 tracking-widest leading-none">Referral Fee</span>
                                <span className="text-[10px] font-black bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 px-1.5 py-0.5 rounded">29.25%</span>
                            </div>
                            <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all rounded-lg px-2 group">
                                <div className="flex gap-12 items-center">
                                    <span className="text-[13px] font-bold text-slate-500 tabular-nums min-w-[130px] opacity-70 group-hover:opacity-100">-$109,040.35</span>
                                    <span className="text-[13px] font-black text-slate-800 dark:text-slate-200 tabular-nums min-w-[130px]">-$121,827.34</span>
                                </div>
                                <div className="text-[11px] font-black text-rose-500 flex items-center gap-1">
                                    <ArrowUp size={12} strokeWidth={3} />
                                    11.73%
                                </div>
                            </div>
                        </div>

                        {/* Storage Fees Section */}
                        <div className="space-y-3 pt-2">
                             {/* Storage Fee */}
                             <div className="space-y-1">
                                <span className="text-[10px] font-black text-slate-500 tracking-widest px-1">Storage Fee</span>
                                <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all rounded-lg px-2">
                                    <div className="flex gap-12 items-center">
                                        <span className="text-[13px] font-bold text-slate-500 tabular-nums min-w-[130px]">-$15,221.74</span>
                                        <span className="text-[13px] font-black text-slate-800 dark:text-slate-200 tabular-nums min-w-[130px]">-$20,940.30</span>
                                    </div>
                                    <div className="text-[11px] font-black text-rose-500">
                                        <ArrowUp size={12} strokeWidth={3} />
                                        37.57%
                                    </div>
                                </div>
                             </div>

                             {/* LT Storage Fee */}
                             <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800/20 px-2 opacity-60">
                                <div className="flex gap-12">
                                    <span className="text-[10px] font-black text-slate-400 tracking-widest min-w-[130px]">Long Term Storage</span>
                                    <span className="text-[13px] font-bold text-slate-600 tabular-nums">-$1,865.70</span>
                                </div>
                                <span className="text-[10px] font-black text-slate-400">0.00%</span>
                             </div>
                        </div>

                        {/* COGS Section */}
                        <div className="space-y-2 pt-4">
                             <div className="flex items-center justify-between px-1">
                                <div className="flex items-center gap-1.5">
                                    <span className="text-[10px] font-black text-slate-500 tracking-widest">COGS</span>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Info size={12} className="text-slate-300" />
                                            </TooltipTrigger>
                                            <TooltipContent>Cost of Goods Sold</TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                                <div className="text-[11px] font-black text-emerald-500 flex items-center gap-1">
                                    <ArrowDown size={14} />
                                    100.00%
                                </div>
                             </div>
                             <div className="bg-slate-50 dark:bg-slate-800/30 rounded-xl p-4 space-y-3">
                                <div className="flex justify-between items-center text-[12px]">
                                    <span className="font-bold text-slate-500 flex items-center gap-2">
                                        <div className="w-4 h-4 rounded-bl-lg border-b-2 border-l-2 border-slate-200 dark:border-slate-700" />
                                        Product Cost
                                    </span>
                                    <div className="flex gap-12 tabular-nums">
                                        <span className="text-slate-400 min-w-[100px] text-right">-$210,908.35</span>
                                        <span className="text-slate-800 dark:text-slate-200 font-black min-w-[100px] text-right">$0.00</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center text-[12px]">
                                    <span className="font-bold text-slate-500 flex items-center gap-2">
                                        <div className="w-4 h-4 rounded-bl-lg border-b-2 border-l-2 border-slate-200 dark:border-slate-700" />
                                        Shipping to FBA
                                    </span>
                                    <div className="flex gap-12 tabular-nums">
                                        <span className="text-slate-400 min-w-[100px] text-right">-$26,543.10</span>
                                        <span className="text-emerald-500 font-black min-w-[100px] text-right">-$3,186.95</span>
                                    </div>
                                </div>
                             </div>
                        </div>

                        {/* Advertising Section */}
                        <div className="space-y-1 mt-6">
                             <div className="flex items-center gap-2 px-1">
                                <span className="text-[10px] font-black text-slate-500 tracking-widest">Advertising Cost</span>
                                <span className="text-[10px] font-black bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 px-1.5 py-0.5 rounded">28.22%</span>
                             </div>
                             <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 border border-slate-100 dark:border-slate-800">
                                <div className="flex items-center justify-between py-1">
                                    <span className="text-[12px] font-bold text-slate-700 dark:text-slate-300">PPC Cost</span>
                                    <div className="flex gap-12 tabular-nums items-center">
                                        <span className="text-slate-400 text-xs">-$109,040.35</span>
                                        <span className="text-slate-800 dark:text-slate-200 font-black text-xs">-$117,538.48</span>
                                        <span className="text-[11px] font-black text-rose-500 ml-4">+7.79%</span>
                                    </div>
                                </div>
                             </div>
                        </div>

                        {/* Inbound Placement Fee */}
                        <div className="flex items-center justify-between py-4 border-t border-slate-100 dark:border-slate-800/50 mt-4 h-12">
                            <span className="text-[10px] font-black text-slate-500 tracking-widest px-1">Inbound Placement Fee</span>
                            <div className="flex gap-12 tabular-nums items-center pr-2">
                                <span className="text-slate-400 text-xs">-$6,470.33</span>
                                <span className="text-slate-800 dark:text-slate-200 font-black text-xs">-$10,051.94</span>
                                <span className="text-[11px] font-black text-rose-500 ml-4">+55.35%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
