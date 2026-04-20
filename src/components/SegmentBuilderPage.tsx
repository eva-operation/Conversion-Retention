import React, { useState } from 'react';
import { 
    ChevronLeft, 
    Save, 
    Plus, 
    Minus, 
    Play, 
    Users, 
    Trash2, 
    GripVertical, 
    ArrowRight,
    Search,
    Filter,
    ChevronDown,
    Settings2,
    Database,
    Zap,
    MousePointer2
} from 'lucide-react';
import { cn } from '../lib/utils';

export function SegmentBuilderPage({ onBack }: { onBack: () => void }) {
    return (
        <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header / Toolbar */}
            <div className="flex items-center justify-between px-8 py-4 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 shrink-0">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={onBack}
                        className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <div className="h-6 w-px bg-slate-100 dark:bg-slate-800" />
                    <div>
                        <h1 className="text-lg font-black text-slate-900 dark:text-white leading-tight">Advanced Segment Builder</h1>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Creating: New Custom Segment</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 text-slate-600 dark:text-slate-300 font-bold text-[13px] hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all">
                        <Play size={16} className="text-emerald-500 fill-emerald-500" />
                        Preview Results
                    </button>
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-[#0066FF] hover:bg-[#0052CC] text-white rounded-xl text-[13px] font-black shadow-lg shadow-blue-500/20 transition-all active:scale-95">
                        <Save size={16} />
                        Save Segment
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex overflow-hidden">
                {/* Left Sidebar: Components / Toolboxes */}
                <div className="w-80 border-r border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col pt-6 overflow-y-auto no-scrollbar">
                    <div className="px-6 mb-8">
                        <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">DRAG COMPONENTS</h2>
                        <div className="relative mb-4">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                            <input 
                                type="text" 
                                placeholder="Search filters..." 
                                className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs outline-none shadow-sm"
                            />
                        </div>
                        
                        <div className="space-y-3">
                            <ComponentItem icon={MousePointer2} label="Behavioral" items={['Clicked Email', 'Opened Email', 'Visited Site']} color="text-purple-500" />
                            <ComponentItem icon={Database} label="Properties" items={['City', 'Country', 'LTV', 'Join Date']} color="text-blue-500" />
                            <ComponentItem icon={Zap} label="Predictive" items={['Predicted LTV', 'Churn Risk', 'Gender']} color="text-amber-500" />
                            <ComponentItem icon={Users} label="Membership" items={['In List', 'In Segment']} color="text-emerald-500" />
                        </div>
                    </div>

                    <div className="mt-auto p-6 bg-slate-100/50 dark:bg-slate-800/30">
                        <div className="flex items-center gap-2 text-[#0066FF] font-black text-xs">
                            <Plus size={14} />
                            Add custom property
                        </div>
                    </div>
                </div>

                {/* Workspace / Canvas */}
                <div className="flex-1 bg-slate-50/30 dark:bg-slate-950/20 p-12 overflow-y-auto">
                    <div className="max-w-[800px] mx-auto space-y-4">
                        {/* Segment Logic Blocks */}
                        <div className="space-y-4">
                            <LogicBlock 
                                condition="What someone has done (or not done)"
                                action="Clicked Email"
                                frequency="at least once"
                                date="in the last 30 days"
                            />
                            
                            <div className="flex justify-center -my-2 relative z-10">
                                <span className="bg-slate-100 dark:bg-slate-800 px-4 py-1.5 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest border border-slate-200 dark:border-slate-700 shadow-sm">AND</span>
                            </div>

                            <LogicBlock 
                                condition="Properties about someone"
                                action="LTV (Life Time Value)"
                                frequency="is greater than"
                                date="$500"
                            />

                            <div className="flex justify-center -my-2 relative z-10">
                                <span className="bg-slate-100 dark:bg-slate-800 px-4 py-1.5 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest border border-slate-200 dark:border-slate-700 shadow-sm">AND</span>
                            </div>

                            <button className="w-full py-8 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl flex flex-col items-center justify-center gap-2 text-slate-400 hover:text-[#0066FF] hover:border-[#0066FF]/50 transition-all group bg-white/50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-900">
                                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-all">
                                    <Plus size={24} />
                                </div>
                                <span className="text-sm font-black uppercase tracking-widest">Add New Condition</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar: Quick Look / Stats */}
                <div className="w-80 border-l border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col">
                    <div className="p-8 space-y-8">
                        <div>
                            <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">SEGMENT SUMMARY</h2>
                            <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-[13px] font-bold text-slate-500">Profiles Match</span>
                                    <span className="text-2xl font-black text-slate-900 dark:text-white">1,240</span>
                                </div>
                                <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                    <div className="h-full bg-[#0066FF] w-[45%]" />
                                </div>
                                <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                                    This represents <span className="text-[#0066FF] font-bold">45.2%</span> of your total audience.
                                </p>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">QUICK SETTINGS</h2>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 transition-all cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-600">
                                            <Zap size={16} />
                                        </div>
                                        <span className="text-[13px] font-bold">Auto-Sync</span>
                                    </div>
                                    <div className="w-8 h-4 bg-emerald-500 rounded-full relative">
                                        <div className="absolute right-1 top-1 w-2 h-2 bg-white rounded-full" />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 transition-all cursor-pointer opacity-50 grayscale">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
                                            <Database size={16} />
                                        </div>
                                        <span className="text-[13px] font-bold">Snapshots</span>
                                    </div>
                                    <Plus size={16} className="text-slate-400" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto p-8 border-t border-slate-100 dark:border-slate-800">
                        <button className="w-full flex items-center justify-between px-6 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-[13px] group shadow-xl">
                            Export to CSV
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ComponentItem({ icon: Icon, label, items, color }: any) {
    return (
        <div className="space-y-2">
            <div className="flex items-center gap-2 px-1">
                <Icon size={14} className={color} />
                <span className="text-[12px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider">{label}</span>
            </div>
            <div className="grid grid-cols-1 gap-1.5 focus-within:z-10">
                {items.map((item: string) => (
                    <div 
                        key={item}
                        className="group flex items-center gap-2 p-2.5 rounded-xl border border-white dark:border-slate-900 bg-white dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-slate-200 dark:hover:border-slate-700 transition-all shadow-sm cursor-grab active:cursor-grabbing"
                    >
                        <GripVertical size={14} className="text-slate-200 group-hover:text-slate-400 transition-colors" />
                        <span className="text-[13px] text-slate-500 dark:text-slate-400 font-bold leading-none">{item}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function LogicBlock({ condition, action, frequency, date }: any) {
    return (
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none relative group">
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">{condition}</span>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl text-rose-500">
                        <Trash2 size={16} />
                    </button>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <button className="px-5 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-2xl text-[15px] font-black text-slate-900 dark:text-white border-2 border-transparent hover:border-[#0066FF] transition-all flex items-center gap-2 group/btn">
                        {action}
                        <ChevronDown size={16} className="text-slate-400 group-hover/btn:text-[#0066FF]" />
                    </button>
                    
                    <button className="px-5 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-2xl text-[15px] font-black text-slate-900 dark:text-white border-2 border-transparent hover:border-[#0066FF] transition-all flex items-center gap-2 group/btn">
                        {frequency}
                        <ChevronDown size={16} className="text-slate-400 group-hover/btn:text-[#0066FF]" />
                    </button>

                    <button className="px-5 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-2xl text-[15px] font-black text-slate-900 dark:text-white border-2 border-transparent hover:border-[#0066FF] transition-all flex items-center gap-2 group/btn">
                        {date}
                        <ChevronDown size={16} className="text-slate-400 group-hover/btn:text-[#0066FF]" />
                    </button>
                </div>
            </div>
            {/* Index Pin */}
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 flex items-center justify-center text-[10px] font-black text-slate-400 shadow-sm">
                +
            </div>
        </div>
    );
}
