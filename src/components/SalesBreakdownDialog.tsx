import React from 'react';
import { X, ArrowUp, ArrowDown } from 'lucide-react';

interface SalesBreakdownDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SalesBreakdownDialog: React.FC<SalesBreakdownDialogProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose}></div>
            <div className="relative z-10 w-full max-w-[560px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/30 dark:bg-slate-900/50">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-5 bg-[#24A799] rounded-full shadow-sm shadow-[#24A799]/20" />
                        <div>
                            <h3 className="text-sm font-black text-slate-900 dark:text-white tracking-tight tracking-wider">Total Sales Breakdown</h3>
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
                <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto no-scrollbar">
                    {/* Table Headers */}
                    <div className="flex justify-between items-center px-1 mb-2">
                        <div className="flex gap-12">
                            <span className="text-[10px] font-black text-slate-400 tracking-widest min-w-[130px]">Previous Period</span>
                            <span className="text-[10px] font-black text-slate-400 tracking-widest min-w-[130px]">Current Period</span>
                        </div>
                        <span className="text-[10px] font-black text-slate-400 tracking-widest pr-2">Delta</span>
                    </div>

                    {/* Total Summary Row */}
                    <div className="flex items-center justify-between py-4 border-b border-slate-100 dark:border-slate-800/50 group transition-all rounded-xl px-1">
                        <div className="flex gap-12 items-center">
                            <div className="flex items-center gap-2.5 min-w-[130px]">
                                <div className="w-2 h-4 bg-emerald-500 rounded-sm shadow-sm" />
                                <span className="text-[14px] font-black text-slate-800 dark:text-slate-200 tabular-nums">$737,194.61</span>
                            </div>
                            <div className="flex items-center gap-2.5 min-w-[130px]">
                                <div className="w-2 h-4 bg-emerald-500 rounded-sm shadow-sm" />
                                <span className="text-[14px] font-black text-slate-800 dark:text-slate-200 tabular-nums">$845,368.74</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 text-[12px] font-black text-emerald-500">
                            <ArrowUp size={14} strokeWidth={3} />
                            14.67%
                        </div>
                    </div>

                    {/* Progress Bar with Floating Label */}
                    <div className="space-y-4 pt-2">
                        <div className="relative">
                            <div className="absolute right-[1.94%] top-[-30px] flex flex-col items-center">
                                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-1 rounded shadow-sm text-[10px] font-bold text-slate-600 dark:text-slate-300 whitespace-nowrap">
                                    FBA Sales <span className="text-slate-400">(98.06%)</span>
                                </div>
                                <div className="w-px h-3 bg-slate-300 dark:bg-slate-600" />
                            </div>
                            <div className="relative h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
                                <div className="h-full bg-emerald-500 relative" style={{ width: '98.06%' }} />
                                <div className="h-full bg-indigo-500" style={{ width: '1.94%' }} />
                            </div>
                        </div>
                    </div>

                    {/* Rows */}
                    <div className="space-y-1">
                        {/* FBA Row */}
                        <div className="space-y-1 mt-6">
                             <div className="flex items-center gap-2 px-1">
                                <span className="text-[10px] font-black text-slate-500 tracking-widest">FBA Sales</span>
                                <span className="text-[10px] font-bold bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 px-1.5 py-0.5 rounded">98.06%</span>
                             </div>
                             <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all rounded-lg px-2">
                                <div className="flex gap-12 items-center">
                                    <div className="flex items-center gap-2.5 min-w-[130px]">
                                        <div className="w-1.5 h-3 bg-emerald-500/40 rounded-sm" />
                                        <span className="text-[13px] font-bold text-slate-700 dark:text-slate-300 tabular-nums">-$721,301.04</span>
                                    </div>
                                    <div className="flex items-center gap-2.5 min-w-[130px]">
                                        <div className="w-1.5 h-3 bg-emerald-500/40 rounded-sm" />
                                        <span className="text-[13px] font-black text-slate-800 dark:text-slate-200 tabular-nums">-$829,003.41</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 text-[11px] font-black text-emerald-500">
                                    <ArrowUp size={12} strokeWidth={3} />
                                    14.93%
                                </div>
                             </div>
                        </div>

                        {/* FBM Row */}
                        <div className="space-y-1 mt-4">
                             <div className="flex items-center gap-2 px-1">
                                <span className="text-[10px] font-black text-slate-500 tracking-widest">FBM Sales</span>
                                <span className="text-[10px] font-bold bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 px-1.5 py-0.5 rounded">1.94%</span>
                             </div>
                             <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all rounded-lg px-2">
                                <div className="flex gap-12 items-center">
                                    <div className="flex items-center gap-2.5 min-w-[130px]">
                                        <div className="w-1.5 h-3 bg-indigo-500/40 rounded-sm" />
                                        <span className="text-[13px] font-bold text-slate-700 dark:text-slate-300 tabular-nums">-$15,893.57</span>
                                    </div>
                                    <div className="flex items-center gap-2.5 min-w-[130px]">
                                        <div className="w-1.5 h-3 bg-indigo-500/40 rounded-sm" />
                                        <span className="text-[13px] font-black text-slate-800 dark:text-slate-200 tabular-nums">-$16,365.33</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 text-[11px] font-black text-emerald-500">
                                    <ArrowUp size={12} strokeWidth={3} />
                                    2.97%
                                </div>
                             </div>
                        </div>

                        {/* Organic Sales */}
                        <div className="space-y-1 mt-4">
                             <span className="text-[10px] font-black text-slate-500 tracking-widest px-1 leading-none">Organic Sales</span>
                             <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all rounded-lg px-2">
                                <div className="flex gap-12 items-center">
                                    <div className="flex items-center gap-2.5 min-w-[130px]">
                                        <div className="w-1.5 h-3 bg-sky-500/40 rounded-sm" />
                                        <span className="text-[13px] font-bold text-slate-700 dark:text-slate-300 tabular-nums">-$340,008.18</span>
                                    </div>
                                    <div className="flex items-center gap-2.5 min-w-[130px]">
                                        <div className="w-1.5 h-3 bg-sky-500/40 rounded-sm" />
                                        <span className="text-[13px] font-black text-slate-800 dark:text-slate-200 tabular-nums">-$357,929.44</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 text-[11px] font-black text-emerald-500">
                                    <ArrowUp size={12} strokeWidth={3} />
                                    5.27%
                                </div>
                             </div>
                        </div>

                        {/* Advertising Sales */}
                        <div className="space-y-1 mt-4">
                             <span className="text-[10px] font-black text-slate-500 tracking-widest px-1 leading-none">Advertising Sales</span>
                             <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all rounded-lg px-2">
                                <div className="flex gap-12 items-center">
                                    <div className="flex items-center gap-2.5 min-w-[130px]">
                                        <div className="w-1.5 h-3 bg-blue-500/40 rounded-sm" />
                                        <span className="text-[13px] font-bold text-slate-700 dark:text-slate-300 tabular-nums">-$397,186.43</span>
                                    </div>
                                    <div className="flex items-center gap-2.5 min-w-[130px]">
                                        <div className="w-1.5 h-3 bg-blue-500/40 rounded-sm" />
                                        <span className="text-[13px] font-black text-slate-800 dark:text-slate-200 tabular-nums">-$487,439.30</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 text-[11px] font-black text-emerald-500">
                                    <ArrowUp size={12} strokeWidth={3} />
                                    22.72%
                                </div>
                             </div>
                        </div>

                        {/* Orders */}
                        <div className="space-y-1 mt-4">
                             <span className="text-[10px] font-black text-slate-500 tracking-widest px-1 leading-none">Orders</span>
                             <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all rounded-lg px-2">
                                <div className="flex gap-12 items-center">
                                    <div className="flex items-center gap-2.5 min-w-[130px]">
                                        <div className="w-1.5 h-3 bg-slate-300 rounded-sm opacity-50" />
                                        <span className="text-[13px] font-bold text-slate-700 dark:text-slate-300 tabular-nums">-7,297</span>
                                    </div>
                                    <div className="flex items-center gap-2.5 min-w-[130px]">
                                        <div className="w-1.5 h-3 bg-slate-400 rounded-sm shadow-sm" />
                                        <span className="text-[13px] font-black text-slate-800 dark:text-slate-200 tabular-nums">-8,899</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 text-[11px] font-black text-emerald-500">
                                    <ArrowUp size={12} strokeWidth={3} />
                                    21.95%
                                </div>
                             </div>
                        </div>

                        {/* Units */}
                        <div className="space-y-1 mt-4">
                             <span className="text-[10px] font-black text-slate-500 tracking-widest px-1 leading-none">Units</span>
                             <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all rounded-lg px-2">
                                <div className="flex gap-12 items-center">
                                    <div className="flex items-center gap-2.5 min-w-[130px]">
                                        <div className="w-1.5 h-3 bg-slate-300 rounded-sm opacity-50" />
                                        <span className="text-[13px] font-bold text-slate-700 dark:text-slate-300 tabular-nums">-7,441</span>
                                    </div>
                                    <div className="flex items-center gap-2.5 min-w-[130px]">
                                        <div className="w-1.5 h-3 bg-slate-400 rounded-sm shadow-sm" />
                                        <span className="text-[13px] font-black text-slate-800 dark:text-slate-200 tabular-nums">-8,619</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 text-[11px] font-black text-emerald-500">
                                    <ArrowUp size={12} strokeWidth={3} />
                                    15.83%
                                </div>
                             </div>
                        </div>

                        {/* AOV Row */}
                        <div className="space-y-1 mt-4">
                             <span className="text-[10px] font-black text-slate-500 tracking-widest px-1 leading-none">Average Order Value (AOV)</span>
                             <div className="flex items-center justify-between py-3 transition-all rounded-lg px-2 hover:bg-slate-50 dark:hover:bg-slate-800/40">
                                <div className="flex gap-12 items-center">
                                    <div className="flex items-center gap-2.5 min-w-[130px]">
                                        <div className="w-1.5 h-3 bg-slate-300 rounded-sm opacity-50" />
                                        <span className="text-[13px] font-bold text-slate-700 dark:text-slate-300 tabular-nums">-$101.03</span>
                                    </div>
                                    <div className="flex items-center gap-2.5 min-w-[130px]">
                                        <div className="w-1.5 h-3 bg-slate-400 rounded-sm shadow-sm" />
                                        <span className="text-[13px] font-black text-slate-800 dark:text-slate-200 tabular-nums">-$95.00</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 text-[11px] font-black text-rose-500">
                                    <ArrowDown size={12} strokeWidth={3} />
                                    -5.97%
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

