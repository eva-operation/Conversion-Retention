import React, { useState } from 'react';
import { 
    LayoutDashboard, 
    Megaphone, 
    RotateCcw, 
    Mail, 
    MessageSquare, 
    Users, 
    TrendingUp, 
    Calendar, 
    BarChart3,
    ChevronRight,
    ChevronDown,
    Settings,
    LogOut,
    User,
    Kanban
} from 'lucide-react';
import { cn } from '../lib/utils';

interface NavItem {
    id: string;
    label: string;
    icon: React.ElementType;
    hasSubmenu?: boolean;
    children?: { id: string; label: string }[];
}

const NAV_ITEMS: NavItem[] = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'campaigns', label: 'Campaigns', icon: Megaphone },
    { id: 'flows', label: 'Flows', icon: RotateCcw },
    { id: 'email-builder', label: 'Email Builder', icon: Mail },
    { 
        id: 'sms-builder', 
        label: 'SMS Builder', 
        icon: MessageSquare, 
        hasSubmenu: true,
        children: [{ id: 'sms-overview', label: 'Overview' }] 
    },
    { 
        id: 'audience', 
        label: 'Audience', 
        icon: Users, 
        hasSubmenu: true,
        children: [
            { id: 'profiles', label: 'Profiles' },
            { id: 'lists', label: 'Lists' },
            { id: 'segments', label: 'Segments' }
        ] 
    },
    { 
        id: 'growth', 
        label: 'Growth', 
        icon: TrendingUp, 
        hasSubmenu: true,
        children: [{ id: 'referrals', label: 'Referrals' }] 
    },
    { 
        id: 'subscriptions', 
        label: 'Subscriptions', 
        icon: Calendar, 
        hasSubmenu: true,
        children: [{ id: 'plans', label: 'Plans' }] 
    },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'roadmap', label: 'Roadmap', icon: Kanban },
    { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ 
    currentPage, 
    setCurrentPage, 
    sidebarCollapsed, 
    setSidebarCollapsed 
}: any) {
    const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

    const toggleMenu = (id: string) => {
        setExpandedMenus(prev => 
            prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
        );
    };

    return (
        <aside className={cn(
            "border-r bg-white dark:bg-slate-900 flex flex-col transition-all duration-300 h-full",
            sidebarCollapsed ? "w-20" : "w-64"
        )}>
            <div className={cn("p-6 flex items-center justify-between", sidebarCollapsed && "p-4 justify-center")}>
                {!sidebarCollapsed ? (
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-[#8257e5] flex items-center justify-center shrink-0">
                            <span className="text-white font-black text-lg">e</span>
                        </div>
                        <div className="flex flex-col leading-tight">
                            <span className="text-[#8257e5] font-black text-lg tracking-tighter">eva</span>
                            <span className="text-[#00c9b7] text-[10px] font-bold uppercase tracking-widest mt-[-4px]">conversion & retention</span>
                        </div>
                    </div>
                ) : (
                    <div className="w-10 h-10 rounded-xl bg-[#8257e5] flex items-center justify-center shadow-lg shadow-purple-500/20">
                        <span className="text-white font-black text-xl">e</span>
                    </div>
                )}
            </div>

            <nav className="flex-1 px-3 space-y-1 mt-4 overflow-y-auto no-scrollbar">
                {NAV_ITEMS.map((item) => {
                    const isActive = currentPage === item.id || (item.id === 'dashboard' && currentPage === 'dashboard');
                    const isExpanded = expandedMenus.includes(item.id);
                    const Icon = item.icon;

                    return (
                        <div key={item.id} className="flex flex-col">
                            <button
                                onClick={() => {
                                    if (item.hasSubmenu) {
                                        toggleMenu(item.id);
                                    } else {
                                        setCurrentPage(item.id);
                                    }
                                }}
                                className={cn(
                                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 group relative",
                                    isActive 
                                        ? "bg-[#8257e5] text-white shadow-lg shadow-purple-500/30" 
                                        : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                                )}
                            >
                                <Icon 
                                    size={18} 
                                    className={cn(
                                        "transition-colors",
                                        isActive ? "text-white" : "text-slate-400 group-hover:text-slate-600"
                                    )} 
                                />
                                {!sidebarCollapsed && (
                                    <>
                                        <span className="flex-1 text-left">{item.label}</span>
                                        {item.hasSubmenu && (
                                            isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />
                                        )}
                                    </>
                                )}
                            </button>
                            
                            {!sidebarCollapsed && item.hasSubmenu && isExpanded && (
                                <div className="mt-1 ml-4 space-y-1 border-l-2 border-slate-100 dark:border-slate-800 pl-4 animate-in slide-in-from-top-1 duration-200">
                                    {item.children?.map(child => (
                                        <button
                                            key={child.id}
                                            onClick={() => setCurrentPage(child.id)}
                                            className={cn(
                                                "w-full text-left px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors",
                                                currentPage === child.id 
                                                    ? "text-[#8257e5] bg-purple-50 dark:bg-purple-900/20 font-bold" 
                                                    : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                            )}
                                        >
                                            {child.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </nav>

            <div className="mt-auto border-t border-slate-100 dark:border-slate-800 p-4">
                <div className={cn(
                    "flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer group",
                    sidebarCollapsed && "justify-center"
                )}>
                    <div className="w-8 h-8 rounded-full bg-[#8257e5] flex items-center justify-center text-white text-xs font-bold shrink-0">
                        FO
                    </div>
                    {!sidebarCollapsed && (
                        <div className="flex-1 min-w-0">
                            <p className="text-[13px] font-bold text-slate-900 dark:text-white truncate">
                                foxty-dev-store
                            </p>
                        </div>
                    )}
                    {!sidebarCollapsed && <ChevronDown size={14} className="text-slate-400 group-hover:text-slate-600" />}
                </div>
            </div>
        </aside>
    );
}
