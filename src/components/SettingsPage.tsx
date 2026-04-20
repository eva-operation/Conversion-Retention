import React, { useState } from 'react';
import { Mail, MessageSquare, Target, Globe, ArrowLeft, Key, Check, AlertCircle, ChevronDown, RefreshCcw, Download } from 'lucide-react';
import { cn } from '../lib/utils';

export function SettingsPage({ onBack }: { onBack: () => void }) {
    const [activeTab, setActiveTab] = useState('integrations');
    const [apiKey, setApiKey] = useState('');
    const [isApiKeySaved, setIsApiKeySaved] = useState(false);
    const [isListDropdownOpen, setIsListDropdownOpen] = useState(false);
    const [selectedLists, setSelectedLists] = useState<string[]>([]);
    const [isListsLoaded, setIsListsLoaded] = useState(false);
    const [isLoadingLists, setIsLoadingLists] = useState(false);

    const availableLists = [
        "Newsletter | 1,240 profiles",
        "VIP Customers | 320 profiles",
        "Abandoned Cart | 580 profiles"
    ];

    const loadLists = () => {
        setIsLoadingLists(true);
        setTimeout(() => {
            setIsListsLoaded(true);
            setIsLoadingLists(false);
        }, 1200);
    };

    const toggleList = (list: string) => {
        setSelectedLists(prev => 
            prev.includes(list) ? prev.filter(l => l !== list) : [...prev, list]
        );
    };

    const menuItems = [
        { id: 'email', label: 'Email', icon: Mail },
        { id: 'text', label: 'Text message', icon: MessageSquare },
        { id: 'popup', label: 'Popup', icon: Target },
        { id: 'integrations', label: 'Integrations', icon: Globe },
    ];

    return (
        <div className="flex flex-col h-full bg-[#f8fafc] dark:bg-slate-950 animate-in fade-in duration-500">
            {/* Top Bar */}
            <div className="flex items-center justify-between p-6 bg-transparent">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Settings</h1>
                <button 
                    onClick={onBack}
                    className="flex items-center gap-2 px-3.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm"
                >
                    <ArrowLeft size={16} />
                    Back to Home
                </button>
            </div>

            {/* Layout */}
            <div className="flex flex-1 gap-6 px-6 pb-6 overflow-hidden">
                {/* Sidebar */}
                <div className="w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 h-fit shadow-sm">
                    <div className="space-y-1">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={cn(
                                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all",
                                    activeTab === item.id
                                        ? "bg-[#8257e5] text-white shadow-lg shadow-purple-500/20"
                                        : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-slate-400"
                                )}
                            >
                                <item.icon size={18} />
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-10 overflow-y-auto shadow-sm custom-scrollbar relative">
                    <div className="mb-10">
                        <h2 className="text-2xl font-bold text-[#8257e5] border-b-2 border-slate-50 dark:border-slate-800 pb-3 mb-8">
                            Klaviyo Integration
                        </h2>

                        {/* Configuration Section */}
                        <div className="space-y-6">
                            <div>
                                <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4 block">
                                    1. Configuration
                                </span>
                                
                                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-100 dark:border-slate-800">
                                    <h3 className="text-[15px] font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                        <InfoIcon /> How to get your API Key:
                                    </h3>
                                    <ul className="space-y-3">
                                        <Step>Log in to your <b>Klaviyo Dashboard</b>.</Step>
                                        <Step>Click your <b>Profile Name</b> in the bottom left and go to <b>Settings</b>.</Step>
                                        <Step>Select the <b>API Keys</b> tab.</Step>
                                        <Step>Click the <b>Create Private API Key</b> button.</Step>
                                        <Step>
                                            Name your key and select <b>"Custom Key"</b> to set the following permissions:
                                            <div className="flex gap-2 mt-2">
                                                <Badge text="Lists: Read" />
                                                <Badge text="Profiles: Read" />
                                            </div>
                                        </Step>
                                        <Step>Copy the generated key and paste it below.</Step>
                                    </ul>
                                </div>
                            </div>

                            <div className="max-w-2xl">
                                <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">Private API Key</label>
                                <input 
                                    type="text" 
                                    value={apiKey}
                                    onChange={(e) => setApiKey(e.target.value)}
                                    placeholder="pk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                                    className="w-full px-4 py-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-[#8257e5]/20 focus:border-[#8257e5] transition-all font-mono text-sm"
                                />
                                <button 
                                    onClick={() => apiKey.length > 5 && setIsApiKeySaved(true)}
                                    className="mt-4 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[14px] font-bold transition-all shadow-md active:scale-95"
                                >
                                    Save Settings
                                </button>
                                {isApiKeySaved && (
                                    <span className="ml-4 text-emerald-500 font-bold text-sm inline-flex items-center gap-1">
                                        <Check size={16} /> Key Saved
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Sync Area */}
                        <div className="mt-12 pt-10 border-t border-slate-100 dark:border-slate-800">
                            <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-6 block">
                                2. Sync Operations & History
                            </span>

                            <div className={cn(
                                "bg-[#fdfaff] dark:bg-purple-900/10 border border-[#ede4ff] dark:border-purple-800/30 p-8 rounded-3xl mb-8 transition-all relative overflow-visible",
                                !isApiKeySaved && "opacity-40 grayscale pointer-events-none"
                            )}>
                                {!isApiKeySaved && (
                                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/10 backdrop-blur-[1px] rounded-3xl">
                                        <div className="bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2">
                                            <AlertCircle size={14} /> Enter API Key to enable sync
                                        </div>
                                    </div>
                                )}

                                <div className="max-w-md mb-8 relative">
                                    <label className="text-[14px] font-bold text-slate-900 dark:text-white block mb-2">Select Klaviyo list to sync</label>
                                    
                                    {!isListsLoaded ? (
                                        <button 
                                            onClick={loadLists}
                                            className={cn(
                                                "w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl font-bold text-sm transition-all border-2",
                                                isLoadingLists 
                                                    ? "bg-slate-50 dark:bg-slate-950 border-slate-100 dark:border-slate-800 text-slate-400"
                                                    : "bg-white dark:bg-slate-950 border-[#8257e5] text-[#8257e5] hover:bg-purple-50 dark:hover:bg-purple-900/10"
                                            )}
                                        >
                                            {isLoadingLists ? (
                                                <>
                                                    <RefreshCcw size={18} className="animate-spin" />
                                                    Fetching lists from Klaviyo...
                                                </>
                                            ) : (
                                                <>
                                                    <Download size={18} />
                                                    Fetch available lists
                                                </>
                                            )}
                                        </button>
                                    ) : (
                                        <div className="relative group animate-in zoom-in-95 duration-300">
                                            <button 
                                                onClick={() => setIsListDropdownOpen(!isListDropdownOpen)}
                                                className="w-full flex items-center justify-between pl-4 pr-4 py-3.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 transition-all font-medium text-sm text-left text-slate-700 dark:text-slate-200 shadow-sm"
                                            >
                                                <span className="truncate">
                                                    {selectedLists.length === 0 
                                                        ? "Select lists to sync" 
                                                        : selectedLists.length === 1 
                                                            ? selectedLists[0] 
                                                            : `${selectedLists.length} lists selected`}
                                                </span>
                                                <ChevronDown size={18} className={cn("text-slate-400 transition-transform", isListDropdownOpen && "rotate-180")} />
                                            </button>

                                            {isListDropdownOpen && (
                                                <div className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl z-[50] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                                    {availableLists.map((list) => (
                                                        <div 
                                                            key={list}
                                                            onClick={() => toggleList(list)}
                                                            className="flex items-center gap-3 px-4 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer border-b last:border-b-0 border-slate-50 dark:border-slate-900 transition-colors"
                                                        >
                                                            <div className={cn(
                                                                "w-5 h-5 rounded flex items-center justify-center border-2 transition-all",
                                                                selectedLists.includes(list) 
                                                                    ? "bg-[#8257e5] border-[#8257e5] text-white" 
                                                                    : "border-slate-200 dark:border-slate-700"
                                                            )}>
                                                                {selectedLists.includes(list) && <Check size={12} strokeWidth={4} />}
                                                            </div>
                                                            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{list}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-purple-100 dark:border-purple-800/20">
                                    <div className="flex-1 min-w-[300px]">
                                        <p className="text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                                            Ready to update your data? This will fetch the latest profiles from the selected lists.
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <button 
                                            disabled={selectedLists.length === 0}
                                            className={cn(
                                                "flex items-center gap-2 px-8 py-3 rounded-2xl text-[14px] font-black transition-all shadow-xl hover:-translate-y-0.5 active:translate-y-0",
                                                selectedLists.length > 0 
                                                    ? "bg-[#8257e5] text-white shadow-purple-500/30 hover:bg-[#7248d5]" 
                                                    : "bg-slate-200 text-slate-400 shadow-none pointer-events-none"
                                            )}
                                        >
                                            <RefreshCcw size={18} />
                                            Start New Sync
                                        </button>
                                        <span className="text-[12px] text-slate-400 font-bold uppercase tracking-wider whitespace-nowrap">
                                            Last synced: 2 hours ago
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="overflow-hidden border border-slate-100 dark:border-slate-800 rounded-xl">
                                <table className="w-full text-left bg-white dark:bg-slate-900">
                                    <thead>
                                        <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Date</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Total Items</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Imported</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Failed</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                                        <HistoryRow 
                                            date="Apr 20, 2026 - 09:45" 
                                            status="Success" 
                                            total="1,250" 
                                            imported="1,180" 
                                            failed="70" 
                                        />
                                        <HistoryRow 
                                            date="Apr 18, 2026 - 14:20" 
                                            status="Success" 
                                            total="800" 
                                            imported="800" 
                                            failed="0" 
                                        />
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Step({ children }: { children: React.ReactNode }) {
    return (
        <li className="flex items-start gap-2.5 text-[13.5px] text-slate-600 dark:text-slate-400 leading-relaxed">
            <span className="text-[#8257e5] font-black mt-0.5">•</span>
            <div>{children}</div>
        </li>
    );
}

function Badge({ text }: { text: string }) {
    return (
        <span className="bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded text-[11px] font-mono text-slate-700 dark:text-slate-300">
            {text}
        </span>
    );
}

function HistoryRow({ date, status, total, imported, failed }: any) {
    return (
        <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
            <td className="px-6 py-4 text-[13.5px] font-medium text-slate-600 dark:text-slate-400">{date}</td>
            <td className="px-6 py-4">
                <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold uppercase">
                    {status}
                </span>
            </td>
            <td className="px-6 py-4 text-[13.5px] font-medium text-slate-600 dark:text-slate-400">{total}</td>
            <td className="px-6 py-4 text-[13.5px] font-bold text-emerald-500">{imported}</td>
            <td className="px-6 py-4 text-[13.5px] font-bold text-red-500">{failed}</td>
        </tr>
    );
}

function InfoIcon() {
    return (
        <div className="w-5 h-5 rounded-full bg-[#8257e5]/10 flex items-center justify-center text-[#8257e5]">
            <Key size={12} />
        </div>
    );
}
