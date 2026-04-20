import React from 'react';
import { X, Info, ArrowUp, ArrowDown } from 'lucide-react';

interface ProfitBreakdownDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ProfitBreakdownDialog: React.FC<ProfitBreakdownDialogProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose}></div>
            <div className="relative z-10 w-full max-w-[540px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/30 dark:bg-slate-900/50">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-5 bg-blue-600 rounded-full shadow-sm shadow-blue-500/20" />
                        <div>
                            <h3 className="text-sm font-black text-slate-900 dark:text-white tracking-tight tracking-wider">Net Profit Breakdown</h3>
                            <p className="text-[10px] text-slate-400 font-bold tracking-widest mt-0.5 opacity-80">Period Comparison Analysis</p>
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
                <div className="p-8 space-y-8">
                    {/* Table Headers */}
                    <div className="flex justify-between items-center px-2">
                        <div className="flex gap-10">
                            <span className="text-[10px] font-black text-slate-400 tracking-widest min-w-[130px]">Previous Period</span>
                            <span className="text-[10px] font-black text-slate-400 tracking-widest min-w-[130px]">Current Period</span>
                        </div>
                        <span className="text-[10px] font-black text-slate-400 tracking-widest pr-2">Delta</span>
                    </div>

                    {/* Overall Summary Row */}
                    <div className="flex items-center justify-between py-4 border-b border-slate-100 dark:border-slate-800/50 group hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-all rounded-xl px-2 -mx-2">
                        <div className="flex gap-10 items-center">
                            <div className="flex items-center gap-2.5 min-w-[130px]">
                                <div className="w-2 h-4 bg-emerald-500 rounded-sm shadow-sm" />
                                <span className="text-[14px] font-black text-slate-800 dark:text-slate-200 tabular-nums">$149,462.33</span>
                            </div>
                            <div className="flex items-center gap-2.5 min-w-[130px]">
                                <div className="w-2 h-4 bg-emerald-500 rounded-sm shadow-sm" />
                                <span className="text-[14px] font-black text-slate-800 dark:text-slate-200 tabular-nums">$428,849.33</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5 text-[12px] font-black text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-100/50 dark:border-emerald-500/20 shadow-sm">
                            <ArrowUp size={14} strokeWidth={3} />
                            186.93%
                        </div>
                    </div>

                    {/* Net Profit Detail */}
                    <div className="space-y-2.5">
                        <div className="flex items-center justify-between px-1">
                            <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 tracking-widest">Net Profit</span>
                        </div>
                        <div className="flex items-center justify-between py-4 border-b border-slate-100 dark:border-slate-800/50 bg-slate-50/30 dark:bg-slate-800/20 rounded-xl px-4 transition-all hover:bg-slate-50 dark:hover:bg-slate-800/40 border border-transparent hover:border-slate-200/50">
                            <div className="flex gap-10 items-center">
                                <div className="flex items-center gap-2.5 min-w-[130px]">
                                    <div className="w-2 h-4 bg-[#F08A50] rounded-sm" />
                                    <span className="text-[14px] font-black text-slate-800 dark:text-slate-200 tabular-nums">$149,462.33</span>
                                </div>
                                <div className="flex items-center gap-2.5 min-w-[130px]">
                                    <div className="w-2 h-4 bg-[#F08A50] rounded-sm" />
                                    <span className="text-[14px] font-black text-slate-800 dark:text-slate-200 tabular-nums">$428,849.33</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5 text-[12px] font-black text-emerald-500">
                                <ArrowUp size={14} strokeWidth={3} />
                                $279,387.00
                            </div>
                        </div>
                    </div>

                    {/* ROI Row */}
                    <div className="space-y-2.5">
                        <div className="flex items-center justify-between px-1">
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 tracking-widest">ROI (Return on Investment)</span>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Info size={12} className="text-slate-300 cursor-help" />
                                        </TooltipTrigger>
                                        <TooltipContent side="top">
                                            <p className="text-[10px] font-bold">Profit / Advertising Spend</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </div>
                        <div className="flex items-center justify-between py-4 border-b border-slate-100 dark:border-slate-800/50 bg-slate-50/30 dark:bg-slate-800/20 rounded-xl px-4 transition-all hover:bg-slate-50 dark:hover:bg-slate-800/40 border border-transparent hover:border-slate-200/50">
                            <div className="flex gap-10 items-center">
                                <div className="flex items-center gap-2.5 min-w-[130px]">
                                    <div className="w-2 h-4 bg-[#24A799] rounded-sm" />
                                    <span className="text-[14px] font-black text-slate-800 dark:text-slate-200 tabular-nums">62.94%</span>
                                </div>
                                <div className="flex items-center gap-2.5 min-w-[130px]">
                                    <div className="w-2 h-4 bg-[#24A799] rounded-sm" />
                                    <span className="text-[14px] font-black text-slate-800 dark:text-slate-200 tabular-nums">0.00%</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5 text-[12px] font-black text-rose-500 bg-rose-50/50 dark:bg-rose-500/10 px-2 py-0.5 rounded-lg border border-rose-100/50">
                                <ArrowDown size={14} strokeWidth={3} />
                                100.00%
                            </div>
                        </div>
                    </div>

                    {/* Margin Row */}
                    <div className="space-y-2.5">
                        <div className="flex items-center justify-between px-1">
                            <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 tracking-widest">Margin</span>
                        </div>
                        <div className="flex items-center justify-between py-4 bg-slate-50/30 dark:bg-slate-800/20 rounded-xl px-4 transition-all hover:bg-slate-50 dark:hover:bg-slate-800/40 border border-transparent hover:border-slate-200/50">
                            <div className="flex gap-10 items-center">
                                <div className="flex items-center gap-2.5 min-w-[130px]">
                                    <div className="w-2 h-4 bg-[#B6508A] rounded-sm" />
                                    <span className="text-[14px] font-black text-slate-800 dark:text-slate-200 tabular-nums">20.27%</span>
                                </div>
                                <div className="flex items-center gap-2.5 min-w-[130px]">
                                    <div className="w-2 h-4 bg-[#B6508A] rounded-sm" />
                                    <span className="text-[14px] font-black text-slate-800 dark:text-slate-200 tabular-nums">50.73%</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5 text-[12px] font-black text-emerald-500 bg-emerald-50/50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-100/50">
                                <ArrowUp size={14} strokeWidth={3} />
                                150.27%
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Add child components used but not correctly imported in the snippet if necessary, 
// though Tooltip components should be imported from project's own Tooltip file.
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './Tooltip';
