import React from 'react';
import { 
    BarChart3, 
    CheckSquare, 
    MessageSquare, 
    Package, 
    ArrowUpRight, 
    Zap, 
    TrendingUp,
    ShieldAlert,
    Kanban,
    ChevronDown,
    Calendar,
    Clock,
    CheckCircle2,
    ListTodo
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '../lib/utils';

export function RoadmapPage() {
    return (
        <div className="flex flex-col gap-10 animate-in fade-in duration-700 max-w-[1100px] mx-auto p-4 md:p-8 font-sans">
            <header className="flex flex-col items-center mb-8">
                <div className="flex items-center gap-4 mb-6">
                    <img src="/cr_logo.png" alt="Eva Conversion & Retention" className="h-20 object-contain" />
                </div>
                <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">Modular Pricing Strategy V.0</h1>
                <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">Competitive Ala Carte Model for Amazon & Shopify Merchants</p>
            </header>

            <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                    <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">Base Plan Tiers</span>
                    <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                    <TierCard name="Free" price="$0" limits={['500 Emails', '150 SMS']} />
                    <TierCard name="Starter" price="$15" limits={['5,000 Emails', '250 SMS']} isMo />
                    <TierCard 
                        name="Growth" 
                        price="$49" 
                        limits={['20,000 Emails', '1,000 SMS']} 
                        isFeatured 
                        isMo 
                    />
                    <TierCard name="Scale S" price="$149" limits={['50k Emails']} isMo />
                    <TierCard name="Scale M" price="$249" limits={['100k Emails']} isMo />
                    <TierCard name="Scale L" price="$399" limits={['250k Emails']} isMo />
                    <TierCard name="Enterprise" price="Custom" limits={['Unlimited']} />
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                    <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">Klaviyo vs Eva Savings Analysis</span>
                    <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
                </div>
                
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
                                <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Active Profiles</th>
                                <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Klaviyo Price</th>
                                <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Eva Price</th>
                                <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest text-right">Actual Savings</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                            {[
                                { range: '251 – 500', klaviyo: '$20', eva: '$15', savings: '25% Saved' },
                                { range: '501 – 1,000', klaviyo: '$30', eva: '$15*', savings: '50% Saved', high: true },
                                { range: '1,001 – 1,500', klaviyo: '$45', eva: '$15*', savings: '66% Saved', high: true },
                                { range: '1,501 – 2,500', klaviyo: '$60', eva: '$49', savings: '18% Saved' },
                                { range: '3,501 – 5,000', klaviyo: '$100', eva: '$49', savings: '51% Saved', high: true }
                            ].map((row, idx) => (
                                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4 text-sm font-semibold text-slate-700 dark:text-slate-300">{row.range}</td>
                                    <td className="px-6 py-4 text-sm font-medium text-slate-500 dark:text-slate-500">{row.klaviyo}</td>
                                    <td className="px-6 py-4 text-sm font-black text-slate-900 dark:text-white">{row.eva}</td>
                                    <td className="px-6 py-4 text-right">
                                        <span className={cn(
                                            "inline-flex px-3 py-1 rounded-full text-[11px] font-black tracking-tight",
                                            row.high 
                                                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/20" 
                                                : "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 border border-emerald-100 dark:border-emerald-900/30"
                                        )}>
                                            {row.savings}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="px-6 py-3 bg-slate-50/30 dark:bg-slate-900/10 border-t border-slate-50 dark:border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">
                        * Eva Starter includes 5,000 sends. Exceeding limit moves user to Growth ($49) — still significant savings vs Klaviyo.
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">SMS Tiered Units</span>
                        <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
                    </div>
                    
                    <div className="flex h-12 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm relative group">
                        <div className="w-[40%] bg-indigo-600 flex items-center justify-center text-white text-[11px] font-black group-hover:w-[45%] transition-all duration-500">$0.012</div>
                        <div className="w-[30%] bg-indigo-500 flex items-center justify-center text-white text-[11px] font-black">$0.010</div>
                        <div className="w-[30%] bg-indigo-400 flex items-center justify-center text-white text-[11px] font-black group-hover:w-[25%] transition-all duration-500">$0.009</div>
                    </div>
                    <div className="flex justify-between px-2">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">0-1.3k</span>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">1.3k-2.2k</span>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">2.2k+</span>
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">Add-on Modules</span>
                        <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <ModuleCard 
                            title="Subs&Save" 
                            items={[{l:'Standard', p:'$49'}, {l:'Advanced', p:'$99'}]} 
                            color="bg-indigo-500"
                        />
                        <ModuleCard 
                            title="Bundle Booster" 
                            items={[{l:'Essential', p:'$39'}, {l:'AI-Powered', p:'$89'}]} 
                            color="bg-emerald-500"
                        />
                        <ModuleCard 
                            title="Review Sync" 
                            items={[{l:'Basic', p:'$29'}, {l:'Pro', p:'$59'}]} 
                            color="bg-orange-500"
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                    <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">Development Roadmap</span>
                    <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <RoadmapStep 
                        phase="BASE (MAY 15)" 
                        title="Essential Modules & Billing Infra" 
                        desc="⚠ Blocks all modules" 
                        color="border-rose-500" 
                        phaseColor="text-rose-500"
                        isCritical
                    />
                    <RoadmapStep 
                        phase="PHASE 2 (JUN 1)" 
                        title="Bundle & Sub" 
                        desc="Ala Carte Launch" 
                        color="border-amber-500" 
                        phaseColor="text-amber-500"
                    />
                    <RoadmapStep 
                        phase="PHASE 3 (JULY)" 
                        title="Review API" 
                        desc="AI Tiers" 
                        color="border-emerald-500" 
                        phaseColor="text-emerald-500"
                    />
                    <RoadmapStep 
                        phase="PHASE 4 (Q3)" 
                        title="LP Generator" 
                        desc="Conversion Pages" 
                        color="border-slate-300 dark:border-slate-700" 
                        phaseColor="text-slate-400"
                    />
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                    <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">Critical Actions</span>
                    <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-6 bg-rose-50/50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-900/30 rounded-2xl flex gap-5">
                        <div className="px-2 py-1 bg-rose-500 text-white text-[9px] font-black uppercase rounded shrink-0 h-fit">Critical</div>
                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                            <strong className="text-rose-600 block mb-1">Billing Toggle Infrastructure:</strong>
                            Support for modular add-ons must be live by <b className="font-black">May 15</b>.
                        </p>
                    </div>
                    <div className="p-6 bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-2xl flex gap-5">
                        <div className="px-2 py-1 bg-blue-500 text-white text-[9px] font-black uppercase rounded shrink-0 h-fit">Strategic</div>
                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                            <strong className="text-blue-600 block mb-1">LPM Decision:</strong>
                            Finalize "Funnel vs. Page Builder" scope by <b className="font-black">May 31</b> for Q3 planning.
                        </p>
                    </div>
                </div>
            </div>

            {/* Detailed Gantt-style Roadmap Expansion */}
            <DetailedRoadmapExpandable />
        </div>
    );
}

function DetailedRoadmapExpandable() {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="mt-8 border border-slate-200 dark:border-slate-800 rounded-[2rem] bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden transition-all duration-500">
            <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full p-8 flex items-center justify-between hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group"
            >
                <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600">
                        <Calendar size={24} />
                    </div>
                    <div className="text-left">
                        <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">High-level Project Roadmap</h3>
                        <p className="text-sm font-semibold text-slate-400">View strategic development milestones for April - June 2026</p>
                    </div>
                </div>
                <div className={cn(
                    "w-10 h-10 rounded-full border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-400 group-hover:text-slate-900 transition-all",
                    isExpanded && "rotate-180 bg-slate-900 text-white border-slate-900 shadow-lg"
                )}>
                    <ChevronDown size={20} />
                </div>
            </button>

            {isExpanded && (
                <div className="p-4 border-t border-slate-50 dark:border-slate-800/50 animate-in slide-in-from-top-4 duration-500">
                    <div className="bg-slate-50/50 dark:bg-slate-900/50 rounded-xl overflow-hidden shadow-inner border border-slate-100 dark:border-slate-800">
                        <img 
                            src="/detailed_roadmap.png" 
                            alt="Detailed Project Roadmap" 
                            className="w-full h-auto min-w-[1000px] object-cover"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

function GanttSection({ title, status, color, children }: any) {
    return (
        <div className="py-4">
            <div className="flex items-center gap-3 mb-4">
                <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">{title}</h4>
                <span className={cn("px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest", color)}>{status}</span>
            </div>
            <div className="space-y-3 pl-4 border-l-2 border-slate-50 dark:border-slate-800">
                {children}
            </div>
        </div>
    );
}

function GanttItem({ label, date, tag, progress, isCompleted }: any) {
    return (
        <div className="group/item">
            <div className="flex items-center gap-4 py-1">
                <div className="w-1/3 flex flex-col">
                    <div className="flex items-center gap-2">
                        {isCompleted ? <CheckCircle2 size={12} className="text-emerald-500" /> : <Clock size={12} className="text-slate-300" />}
                        <span className={cn("text-[13px] font-semibold", isCompleted ? "text-slate-500 line-through" : "text-slate-700 dark:text-slate-300")}>{label}</span>
                    </div>
                </div>
                <div className="flex-1 flex items-center gap-4">
                    <div className="flex-1 h-3 bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden relative shadow-inner">
                        <div 
                            className={cn(
                                "h-full transition-all duration-1000 ease-out flex items-center justify-end px-2",
                                isCompleted ? "bg-emerald-500" : "bg-indigo-500 bg-gradient-to-r from-blue-600 to-indigo-600"
                            )}
                            style={{ width: `${progress}%` }}
                        >
                            {progress > 10 && <span className="text-[8px] font-black text-white">{progress}%</span>}
                        </div>
                    </div>
                    <div className="w-32 text-right">
                        <span className="text-[10px] font-bold text-slate-400 whitespace-nowrap">{date}</span>
                    </div>
                    <div className="w-24 text-right">
                        <span className={cn(
                            "px-2 py-0.5 rounded text-[9px] font-black uppercase",
                            tag === 'Bundle' ? "bg-purple-50 text-purple-600" : 
                            tag === 'Product S&S' ? "bg-blue-50 text-blue-600" : "bg-slate-50 text-slate-500"
                        )}>{tag}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function TierCard({ name, price, limits, isFeatured, isMo }: any) {
    return (
        <div className={cn(
            "p-5 bg-white dark:bg-slate-900 border rounded-2xl transition-all relative overflow-hidden group",
            isFeatured 
                ? "border-indigo-500 shadow-xl shadow-indigo-500/10 scale-105 z-10" 
                : "border-slate-100 dark:border-slate-800 shadow-sm hover:border-slate-200"
        )}>
            {isFeatured && (
                <div className="absolute top-[12px] -right-[22px] px-8 py-1 bg-indigo-500 text-white text-[9px] font-black uppercase rotate-45 tracking-widest shadow-lg">
                    Best
                </div>
            )}
            <p className={cn("text-[11px] font-black uppercase tracking-widest mb-3", isFeatured ? "text-indigo-500" : "text-slate-400")}>{name}</p>
            <p className={cn("text-2xl font-black mb-4 flex items-baseline gap-1 tracking-tighter", isFeatured ? "text-indigo-600 dark:text-indigo-400" : "text-slate-900 dark:text-white")}>
                {price} {isMo && <span className="text-[12px] font-bold text-slate-400 tracking-normal italic">/mo</span>}
            </p>
            <div className="space-y-2">
                {limits.map((limit: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2 text-[11px] font-black text-slate-600 dark:text-slate-400">
                        <div className={cn("w-1 h-1 rounded-full", isFeatured ? "bg-indigo-500" : "bg-slate-300")} />
                        {limit}
                    </div>
                ))}
            </div>
        </div>
    );
}

function ModuleCard({ title, items, color }: any) {
    return (
        <div className="p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-2 mb-4">
                <div className={cn("w-2 h-2 rounded-full shadow-sm", color)} />
                <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">{title}</h3>
            </div>
            <div className="space-y-0.5">
                {items.map((item: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between py-2 border-t border-slate-50 dark:border-slate-800 first:border-0">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{item.l}</span>
                        <span className="text-sm font-black text-slate-900 dark:text-white">{item.p}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function RoadmapStep({ phase, title, desc, color, phaseColor, isCritical }: any) {
    return (
        <div className={cn(
            "p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl transition-all border-b-4 hover:-translate-y-1 hover:shadow-lg transition-all",
            color
        )}>
            <p className={cn("text-[10px] font-black uppercase tracking-[2px] mb-2", phaseColor)}>{phase}</p>
            <h4 className="text-sm font-black text-slate-900 dark:text-white mb-2 leading-tight">{title}</h4>
            <p className="text-[11px] font-semibold text-slate-400 leading-relaxed italic">{desc}</p>
        </div>
    );
}
