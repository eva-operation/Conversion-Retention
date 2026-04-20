import React, { useState } from 'react';
import { 
    Search, 
    Plus, 
    Filter, 
    MoreHorizontal, 
    Users, 
    Target, 
    ArrowRight, 
    ChevronDown, 
    Clock, 
    Database,
    Zap,
    X,
    Settings2,
    Library
} from 'lucide-react';
import { cn } from '../lib/utils';
import { 
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./Tooltip";

export function SegmentsPage({ onOpenBuilder }: { onOpenBuilder: () => void }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const segments = [
        { 
            name: 'Hesitant shoppers', 
            description: 'Email subscribers who open and click emails frequently, but have never purchased.', 
            goal: 'Convert subscribers',
            members: '0', 
            lastComputed: 'Apr 20, 2026, 3:40 PM',
            created: 'Apr 20, 2026, 3:40 PM'
        },
        { 
            name: 'Previously engaged', 
            description: 'Email subscribers who have not recently opened or clicked an email from you, but used to do so frequently.', 
            goal: 'Re-engage subscribers',
            members: '0', 
            lastComputed: 'Apr 9, 2026, 10:00 PM',
            created: 'Apr 9, 2026, 10:00 PM'
        },
        { 
            name: 'Engaged 60 days (Email)', 
            description: 'Profiles who have engaged with your emails in the last 60 days.', 
            goal: 'Engagement',
            members: '0', 
            lastComputed: 'Apr 9, 2026, 9:50 PM',
            created: 'Apr 9, 2026, 9:49 PM'
        },
        { name: 'Engaged (90 Days)', goal: '-', members: '0', lastComputed: '-', created: 'Apr 3, 2026, 5:04 PM' },
        { name: 'Engaged (60 Days)', goal: '-', members: '0', lastComputed: '-', created: 'Apr 3, 2026, 5:04 PM' },
        { name: 'Engaged (30 Days)', goal: '-', members: '0', lastComputed: '-', created: 'Apr 3, 2026, 5:04 PM' },
        { name: 'New Subscribers', goal: '-', members: '0', lastComputed: '-', created: 'Apr 3, 2026, 5:04 PM' }
    ];

    return (
        <div className="flex flex-col gap-6 animate-in fade-in duration-500 max-w-[1200px] mx-auto p-4 md:p-8">
            {/* Header Section */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Segments</h1>
                
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition-all flex items-center gap-2">
                        Segment Library
                    </button>
                    
                    <button 
                        onClick={() => setIsCreateModalOpen(true)}
                        className="px-4 py-2 bg-[#0066FF] hover:bg-[#0052CC] text-white rounded-lg text-sm font-bold shadow-sm transition-all"
                    >
                        Create segment
                    </button>
                </div>
            </div>

            {/* Simple Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <p className="text-[13px] font-medium text-slate-500 dark:text-slate-400 mb-2">All segments</p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">7</p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <p className="text-[13px] font-medium text-slate-500 dark:text-slate-400 mb-2">Total members</p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">0</p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <p className="text-[13px] font-medium text-slate-500 dark:text-slate-400 mb-2">Computed segments</p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">3</p>
                </div>
            </div>

            {/* Explore Section */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden mt-2">
                <div className="p-4 border-b border-slate-100 dark:border-slate-800">
                    <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Explore segments</h2>
                    <div className="flex items-center gap-3">
                        <div className="relative w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input 
                                type="text" 
                                placeholder="Search segments" 
                                className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-[13px] outline-none"
                            />
                        </div>
                        <div className="relative">
                            <select className="appearance-none pl-4 pr-10 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-[13px] outline-none font-medium cursor-pointer">
                                <option>All Goals</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-tight">NAME</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-tight">GOAL</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-tight">
                                    <div className="flex items-center gap-1">Members <ChevronDown size={14} /></div>
                                </th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-tight">
                                    <div className="flex items-center gap-1">Last Computed <ChevronDown size={14} /></div>
                                </th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-tight">
                                    <div className="flex items-center gap-1">Created <ChevronDown size={14} /></div>
                                </th>
                                <th className="px-6 py-4 w-16"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                            {segments.map((segment, idx) => (
                                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all">
                                    <td className="px-6 py-4 max-w-[400px]">
                                        <div className="flex flex-col">
                                            <span className="text-[13px] font-bold text-[#0066FF] hover:underline cursor-pointer">{segment.name}</span>
                                            {segment.description && (
                                                <span className="text-[12px] text-slate-500 dark:text-slate-400 mt-1 leading-normal line-clamp-2">
                                                    {segment.description}
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-[13px] text-slate-600 dark:text-slate-300 font-medium">{segment.goal}</td>
                                    <td className="px-6 py-4 text-[13px] text-slate-600 dark:text-slate-300">{segment.members}</td>
                                    <td className="px-6 py-4 text-[13px] text-slate-400 font-medium">{segment.lastComputed}</td>
                                    <td className="px-6 py-4 text-[13px] text-slate-400 font-medium">{segment.created}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-300 transition-colors border border-slate-200/50">
                                            <MoreHorizontal size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create Segment Modal */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsCreateModalOpen(false)} />
                    
                    <div className="bg-white dark:bg-slate-900 w-full max-w-[1000px] h-[85vh] rounded-2xl shadow-2xl relative flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
                        {/* Modal Header */}
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-none">Create New Segment</h2>
                            <button 
                                onClick={() => setIsCreateModalOpen(false)}
                                className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Content - Split Layout */}
                        <div className="flex-1 flex overflow-hidden">
                            {/* Left Side: Template Library */}
                            <div className="w-[340px] border-r border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/30 flex flex-col pt-6">
                                <div className="px-4 space-y-4 mb-6">
                                    {/* Segment Builder CTA */}
                                    <button 
                                        onClick={onOpenBuilder}
                                        className="w-full flex items-center justify-between p-4 bg-gradient-to-br from-[#0066FF] to-[#0052CC] rounded-xl text-white shadow-lg shadow-blue-500/20 group hover:-translate-y-0.5 transition-all"
                                    >
                                        <div className="flex flex-col items-start gap-0.5">
                                            <span className="text-[11px] font-black uppercase tracking-widest opacity-80">PRO FEATURE</span>
                                            <span className="text-[13px] font-black">Build from scratch</span>
                                        </div>
                                        <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                                            <ArrowRight size={16} />
                                        </div>
                                    </button>

                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                        <input 
                                            type="text" 
                                            placeholder="Search templates" 
                                            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm outline-none shadow-sm focus:border-[#0066FF] transition-all"
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="relative flex-1">
                                            <select className="w-full pl-3 pr-8 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs outline-none font-semibold cursor-pointer appearance-none shadow-sm capitalize">
                                                <option>All Goals</option>
                                            </select>
                                            <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                        </div>
                                        <div className="relative flex-1">
                                            <select className="w-full pl-3 pr-8 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs outline-none font-semibold cursor-pointer appearance-none shadow-sm capitalize">
                                                <option>All Channels</option>
                                            </select>
                                            <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-3 thin-scrollbar">
                                    <TemplateItem title="Engaged 30 days (Email)" description="Profiles who have engaged with your emails in the last 30 days." active />
                                    <TemplateItem title="Engaged 60 days (Email)" description="Profiles who have engaged with your emails in the last 60 days." />
                                    <TemplateItem title="Engaged 90 days (Email)" description="Profiles who have engaged with your emails in the last 90 days." />
                                    <TemplateItem title="Engaged 180 days (Email)" description="Profiles who have engaged with your emails in the last 180 days." />
                                    <TemplateItem title="Engaged 365 days (Email)" description="Profiles who have engaged with your emails in the last 365 days." />
                                </div>
                            </div>

                            {/* Right Side: Configuration */}
                            <div className="flex-1 bg-white dark:bg-slate-900 overflow-y-auto p-12 space-y-10">
                                <p className="text-[15px] text-slate-500 dark:text-slate-400">
                                    Set segment name and tune template settings before creating.
                                </p>

                                <div className="space-y-8 max-w-[650px]">
                                    <div className="space-y-2">
                                        <label className="text-[13px] font-bold text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-1">
                                            Segment Name <span className="text-red-500">*</span>
                                        </label>
                                        <input 
                                            type="text" 
                                            defaultValue="Engaged 30 days (Email)"
                                            className="w-full px-4 py-3.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-[15px] outline-none shadow-sm focus:border-[#0066FF] transition-all"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[13px] font-bold text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-1">
                                            Description
                                        </label>
                                        <textarea 
                                            rows={4}
                                            defaultValue="Profiles who have engaged with your emails in the last 30 days."
                                            className="w-full px-4 py-3.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-[15px] outline-none shadow-sm focus:border-[#0066FF] transition-all resize-none"
                                        />
                                    </div>

                                    {/* Selected Template Badge */}
                                    <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1 relative">
                                        <div className="flex flex-col gap-0.5">
                                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Selected template</span>
                                            <span className="text-[15px] font-bold text-slate-900 dark:text-white leading-tight">Engaged 30 days (Email)</span>
                                            <div className="flex items-center gap-1.5 mt-1">
                                                <span className="text-[12px] text-slate-500 font-medium">Goal: Engagement - Channel: Email</span>
                                            </div>
                                            <span className="text-[12px] text-slate-500 font-medium mt-1">Estimated members: 0</span>
                                        </div>
                                    </div>

                                    {/* Template Parameters */}
                                    <div className="space-y-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">Template Parameters</h3>
                                        
                                        <div className="space-y-2">
                                            <label className="text-[13px] font-bold text-slate-700 dark:text-slate-300">Engagement lookback days</label>
                                            <input 
                                                type="number" 
                                                defaultValue="30"
                                                className="w-full px-4 py-3.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-[15px] outline-none shadow-sm focus:border-[#0066FF] transition-all"
                                            />
                                            <p className="text-[12px] text-slate-400 mt-1">Lookback window for opened/clicked email engagement.</p>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[13px] font-bold text-slate-700 dark:text-slate-300">New subscriber grace days</label>
                                            <input 
                                                type="number" 
                                                defaultValue="15"
                                                className="w-full px-4 py-3.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-[15px] outline-none shadow-sm focus:border-[#0066FF] transition-all"
                                            />
                                            <p className="text-[12px] text-slate-400 mt-1">Grace period window for newly subscribed profiles.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3 shrink-0 bg-slate-50/50 dark:bg-slate-900/50">
                            <button 
                                onClick={() => setIsCreateModalOpen(false)}
                                className="px-6 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition-all shadow-sm"
                            >
                                Cancel
                            </button>
                            <button className="px-6 py-2.5 bg-[#0066FF] hover:bg-[#0052CC] text-white rounded-lg text-sm font-bold shadow-sm transition-all">
                                Create Segment
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function TemplateItem({ title, description, active = false }: any) {
    return (
        <div className={cn(
            "p-4 rounded-xl border transition-all cursor-pointer group shadow-sm",
            active 
                ? "bg-white dark:bg-slate-800 border-2 border-[#0066FF] ring-4 ring-[#0066FF]/5" 
                : "bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-slate-300"
        )}>
            <div className="flex flex-col gap-1.5">
                <span className={cn(
                    "text-[13px] font-black leading-tight",
                    active ? "text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-300"
                )}>{title}</span>
                <p className="text-[12px] text-slate-500 dark:text-slate-400 leading-normal line-clamp-2 font-medium">
                    {description}
                </p>
            </div>
        </div>
    );
}

function StatCard({ label, value, icon: Icon, color, bg, darkBg }: any) {
    return (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-purple-500/5 transition-all group">
            <div className="flex items-center justify-between mb-4">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110", bg, darkBg, color)}>
                    <Icon size={24} />
                </div>
                <button className="p-1 hover:bg-slate-50 rounded-lg text-slate-300 transition-colors">
                    <Plus size={16} />
                </button>
            </div>
            <div className="flex flex-col gap-0.5">
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
                <span className="text-2xl font-black text-slate-900 dark:text-white">{value}</span>
            </div>
        </div>
    );
}

function TrendingUpIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
            <polyline points="16 7 22 7 22 13" />
        </svg>
    )
}
