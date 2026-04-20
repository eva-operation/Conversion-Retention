import React from 'react';
import { 
    Store, 
    ChevronRight, 
    ExternalLink, 
    Package, 
    Globe, 
    MapPin, 
    Clock, 
    AlertCircle,
    Info,
    TrendingUp,
    Megaphone,
    RotateCcw,
    Users
} from 'lucide-react';
import { cn } from '../lib/utils';

export function Dashboard() {
    return (
        <div className="flex flex-col gap-8 animate-in fade-in duration-500">
            {/* Welcome Banner */}
            <div className="relative overflow-hidden bg-[#8257e5] rounded-[32px] p-10 text-white shadow-2xl shadow-purple-500/20">
                <div className="relative z-10 flex flex-col gap-4">
                    <h1 className="text-4xl font-black tracking-tight">
                        Welcome to Your Dashboard!
                    </h1>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                            <Store size={20} className="text-white" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-white/60 text-[11px] font-bold uppercase tracking-widest leading-none">Connected Store</span>
                            <div className="flex items-center gap-2">
                                <span className="text-lg font-bold">foxty-dev-store-3.myshopify.com</span>
                                <ExternalLink size={14} className="text-white/60" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute top-[-10%] right-[-5%] w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-[-20%] left-[10%] w-48 h-48 bg-purple-400/20 rounded-full blur-2xl" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 p-8 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center">
                                <div className="w-4 h-4 rounded-full bg-amber-400 animate-pulse shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
                            </div>
                            <h2 className="text-xl font-black text-slate-900 dark:text-white">Store Information</h2>
                        </div>
                        <button className="text-[13px] font-bold text-[#8257e5] hover:underline flex items-center gap-1">
                            Edit Store <ChevronRight size={14} />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InfoItem icon={Package} label="Plan" value="Eva Marketing & Retention" color="bg-blue-50 text-blue-600 dark:bg-blue-500/10" />
                        <InfoItem icon={Globe} label="Industry" value="Not specified" color="bg-slate-50 text-slate-600 dark:bg-slate-500/10" />
                        <InfoItem icon={MapPin} label="Location" value="Turkey" color="bg-red-50 text-red-600 dark:bg-red-500/10" />
                        <InfoItem icon={Clock} label="Timezone" value="(UTC+03:00) Istanbul" color="bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10" />
                    </div>

                    <div className="mt-8 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-start gap-3">
                        <AlertCircle size={18} className="text-slate-400 mt-0.5 shrink-0" />
                        <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed">
                            Completing your store profile helps us provide better marketing recommendations and accurate analytics for your region.
                        </p>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center">
                            <TrendingUp size={20} className="text-[#8257e5]" />
                        </div>
                        <h2 className="text-xl font-black text-slate-900 dark:text-white">Quick Start</h2>
                    </div>

                    <div className="space-y-4">
                        <QuickAction title="Create Campaign" desc="Reach your customers today" icon={Megaphone} />
                        <QuickAction title="Setup Flows" desc="Automate your marketing" icon={RotateCcw} />
                        <QuickAction title="Import Audience" desc="Sync from Shopify" icon={Users} />
                    </div>
                </div>
            </div>
        </div>
    );
}

function InfoItem({ icon: Icon, label, value, color }: any) {
    return (
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-50 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 transition-all cursor-default group">
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform", color)}>
                <Icon size={22} />
            </div>
            <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
                <span className="text-[15px] font-bold text-slate-900 dark:text-white truncate">{value}</span>
            </div>
        </div>
    );
}

function QuickAction({ title, desc, icon: Icon }: any) {
    return (
        <button className="w-full flex items-center gap-4 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:border-purple-200 dark:hover:border-purple-900/50 transition-all group text-left">
            <div className="w-10 h-10 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-[#8257e5] group-hover:text-white transition-all shrink-0">
                <Icon size={18} />
            </div>
            <div className="flex flex-col">
                <span className="text-[14px] font-bold text-slate-900 dark:text-white">{title}</span>
                <span className="text-[12px] text-slate-500 dark:text-slate-400">{desc}</span>
            </div>
        </button>
    );
}
