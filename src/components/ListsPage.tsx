import React, { useState } from 'react';
import { Search, Plus, MoreHorizontal, ChevronDown, Download, FileText, Globe, X, Upload, Key, Settings, RefreshCcw, CheckCircle2, Check } from 'lucide-react';
import { cn } from '../lib/utils';

export function ListsPage({ onViewHistory }: { onViewHistory: () => void }) {
    const [isImportOpen, setIsImportOpen] = useState(false);
    const [isCSVModalOpen, setIsCSVModalOpen] = useState(false);
    const [isKlaviyoModalOpen, setIsKlaviyoModalOpen] = useState(false);
    const [isKlaviyoConfigured, setIsKlaviyoConfigured] = useState(false); // Mock state
    const [showKlaviyoConfig, setShowKlaviyoConfig] = useState(true);
    const [isListsLoaded, setIsListsLoaded] = useState(false);
    const [isLoadingLists, setIsLoadingLists] = useState(false);
    const [isListDropdownOpen, setIsListDropdownOpen] = useState(false);
    const [selectedLists, setSelectedLists] = useState<string[]>([]);

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

    const lists = [
        { name: 'Stage E2E Mailinator List 20260414', source: 'klaviyo', members: 1, created: 'Apr 14, 2026, 10:36 PM' },
        { name: 'sss', source: 'file', members: 0, created: 'Apr 20, 2026, 9:30 AM' },
        { name: 'zxczxc', source: 'file', members: 0, created: 'Apr 17, 2026, 4:55 PM' },
        { name: '14nisan-test', source: 'klaviyo', members: 1, created: 'Apr 14, 2026, 10:00 AM' },
        { name: 'test-9nisan', source: 'file', members: 0, created: 'Apr 9, 2026, 3:09 PM' },
        { name: 'Berkay test', source: 'klaviyo', members: 1, created: 'Apr 8, 2026, 4:40 PM' },
    ];

    return (
        <div className="flex flex-col gap-6 animate-in fade-in duration-500 relative">
            {/* Header Area */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Lists</h1>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <button 
                            onClick={() => setIsImportOpen(!isImportOpen)}
                            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 rounded-lg text-sm font-bold transition-all hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm"
                        >
                            <Download size={16} />
                            Import List
                            <ChevronDown size={14} className={cn("transition-transform", isImportOpen && "rotate-180")} />
                        </button>
                        
                        {isImportOpen && (
                            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                <button 
                                    onClick={() => { setIsCSVModalOpen(true); setIsImportOpen(false); }}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-left hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors"
                                >
                                    <FileText size={16} className="text-slate-400" />
                                    From File (.csv)
                                </button>
                                <button 
                                    onClick={() => { 
                                        setIsKlaviyoModalOpen(true); 
                                        setIsImportOpen(false); 
                                        setShowKlaviyoConfig(!isKlaviyoConfigured); // Collapse if already configured
                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-left hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors border-t border-slate-50 dark:border-slate-800"
                                >
                                    <Globe size={16} className="text-purple-500" />
                                    From Klaviyo
                                </button>
                            </div>
                        )}
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold transition-all shadow-md">
                        <Plus size={16} />
                        Create list
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard label="All lists" value="32" />
                <StatCard label="Total members" value="50042" />
                <StatCard label="Selected lists" value="0" />
            </div>

            {/* Filter Bar */}
            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                        type="text" 
                        placeholder="Search lists" 
                        className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                    />
                </div>
            </div>

            {/* Table Area */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                                <th className="px-6 py-4 w-12 text-center">
                                    <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                                </th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Name</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Members</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Created</th>
                                <th className="px-6 py-4 w-12"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {lists.map((list, idx) => (
                                <tr key={idx} className="border-b border-slate-50 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                                    <td className="px-6 py-5 text-center">
                                        <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-sm font-bold text-blue-600 hover:underline cursor-pointer">
                                                {list.name}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-right text-sm font-medium text-slate-600 dark:text-slate-400">
                                        {list.members}
                                    </td>
                                    <td className="px-6 py-5 text-right text-sm font-medium text-slate-500 dark:text-slate-500 whitespace-nowrap">
                                        {list.created}
                                    </td>
                                    <td className="px-6 py-5 text-center">
                                        <button className="p-1.5 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-slate-600 shadow-sm border border-transparent hover:border-slate-200">
                                            <MoreHorizontal size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* CSV Import Modal */}
            {isCSVModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setIsCSVModalOpen(false)} />
                    <div className="relative bg-white dark:bg-slate-950 w-full max-w-lg rounded-[32px] p-8 shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Import profiles to list</h2>
                            <button onClick={() => setIsCSVModalOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                                <X size={20} className="text-slate-400" />
                            </button>
                        </div>
                        
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
                            Upload your contacts via CSV file. This will create a new list or update an existing one.
                        </p>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">List Name</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g. Summer Campaign 2026" 
                                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                />
                            </div>

                            <div className="border-2 border-dashed border-blue-200 dark:border-blue-900/50 bg-blue-50/30 dark:bg-blue-900/10 rounded-2xl p-10 flex flex-col items-center justify-center text-center group hover:border-blue-400 transition-all cursor-pointer">
                                <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                                    <Upload size={32} />
                                </div>
                                <p className="text-sm font-bold text-blue-700 dark:text-blue-400">Drag & drop your CSV here</p>
                                <p className="text-xs text-blue-500/60 mt-1">or click to browse from your computer</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 mt-10">
                            <button 
                                onClick={() => setIsCSVModalOpen(false)}
                                className="px-6 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                            >
                                Cancel
                            </button>
                            <button className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 transition-all">
                                Start import
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Klaviyo Import Modal */}
            {isKlaviyoModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setIsKlaviyoModalOpen(false)} />
                    <div className="relative bg-white dark:bg-slate-950 w-full max-w-2xl rounded-[32px] overflow-hidden shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
                        <div className="flex items-center justify-between p-8 border-b border-slate-50 dark:border-slate-900">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-600">
                                    <Globe size={24} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black text-slate-900 dark:text-white leading-tight">Import from Klaviyo</h2>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest mt-0.5">Integrations</p>
                                </div>
                            </div>
                            <button onClick={() => setIsKlaviyoModalOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                                <X size={20} className="text-slate-400" />
                            </button>
                        </div>
                        
                        <div className="p-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
                            <div className="space-y-8">
                                {/* Configuration Section */}
                                <div className="space-y-4">
                                    <button 
                                        onClick={() => setShowKlaviyoConfig(!showKlaviyoConfig)}
                                        className="flex items-center justify-between w-full text-left group"
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">1. Configuration</span>
                                            {isKlaviyoConfigured && !showKlaviyoConfig && (
                                                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full">
                                                    <CheckCircle2 size={10} /> Connected
                                                </span>
                                            )}
                                        </div>
                                        <ChevronDown size={14} className={cn("text-slate-400 group-hover:text-slate-600 transition-transform", showKlaviyoConfig && "rotate-180")} />
                                    </button>

                                    {showKlaviyoConfig && (
                                        <div className="space-y-6 animate-in slide-in-from-top-2 duration-300">
                                            <div className="bg-slate-50/80 dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
                                                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                                    <div className="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-900/60 flex items-center justify-center text-purple-600">
                                                        <Key size={12} />
                                                    </div>
                                                    How to get your API Key:
                                                </h3>
                                                <ul className="space-y-3">
                                                    <Step>Log in to your <b>Klaviyo Dashboard</b>.</Step>
                                                    <Step>Click your <b>Profile Name</b> in the bottom left and go to <b>Settings</b>.</Step>
                                                    <Step>Select the <b>API Keys</b> tab.</Step>
                                                    <Step>Click the <b>Create Private API Key</b> button.</Step>
                                                    <Step>
                                                        Name your key and select <b>"Custom Key"</b> for permissions:
                                                        <div className="flex gap-2 mt-2">
                                                            <span className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded text-[10px] font-mono text-slate-700 dark:text-slate-300">Lists: Read</span>
                                                            <span className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded text-[10px] font-mono text-slate-700 dark:text-slate-300">Profiles: Read</span>
                                                        </div>
                                                    </Step>
                                                    <Step>Copy the generated key and paste it below.</Step>
                                                </ul>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-bold text-slate-900 dark:text-white">Private API Key</label>
                                                    <input 
                                                        type="text" 
                                                        placeholder="pk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                                                        className="w-full px-4 py-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all font-mono text-sm"
                                                    />
                                                </div>
                                                <button 
                                                    onClick={() => { setIsKlaviyoConfigured(true); setShowKlaviyoConfig(false); }}
                                                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 transition-all"
                                                >
                                                    Save Settings
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Sync Operations Area */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">2. Sync Operations</span>
                                        <button 
                                            onClick={() => { setIsKlaviyoModalOpen(false); onViewHistory(); }}
                                            className="text-xs font-bold text-[#8257e5] hover:underline flex items-center gap-1 transition-all"
                                        >
                                            <RefreshCcw size={12} />
                                            View Sync History
                                        </button>
                                    </div>
                                    
                                    <div className={cn(
                                        "p-8 rounded-3xl border transition-all space-y-6",
                                        isKlaviyoConfigured 
                                            ? "bg-[#fdfaff] dark:bg-purple-900/10 border-[#ede4ff] dark:border-purple-800/30" 
                                            : "bg-slate-50 dark:bg-slate-900/50 border-slate-100 dark:border-slate-800 opacity-50 grayscale pointer-events-none"
                                    )}>
                                        <div className="space-y-4 relative">
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
                                                                        {selectedLists.includes(list) && <Check strokeWidth={4} size={12} />}
                                                                    </div>
                                                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{list}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between gap-6 pt-6 border-t border-purple-100 dark:border-purple-800/20">
                                            <div className="flex-1">
                                                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Ready to update your data?</h4>
                                                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">This will fetch the latest profiles from the selected lists.</p>
                                            </div>
                                            <button 
                                                disabled={selectedLists.length === 0}
                                                className={cn(
                                                    "flex items-center gap-2 px-8 py-3 rounded-2xl text-sm font-black shadow-xl transition-all hover:-translate-y-0.5 active:translate-y-0",
                                                    selectedLists.length > 0
                                                        ? "bg-purple-600 hover:bg-purple-700 text-white shadow-purple-500/30"
                                                        : "bg-slate-200 text-slate-400 shadow-none pointer-events-none"
                                                )}
                                            >
                                                <RefreshCcw size={18} />
                                                Start New Sync
                                            </button>
                                        </div>
                                    </div>

                                    <div className="text-center">
                                        <p className="text-[13px] text-slate-500 dark:text-slate-400 font-medium">
                                            To see the full sync history, you can{' '}
                                            <button 
                                                onClick={() => { setIsKlaviyoModalOpen(false); onViewHistory(); }}
                                                className="text-[#8257e5] font-bold hover:underline"
                                            >
                                                click here.
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-50 dark:border-slate-900 flex justify-end">
                            <button 
                                onClick={() => setIsKlaviyoModalOpen(false)}
                                className="px-6 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function Step({ children }: { children: React.ReactNode }) {
    return (
        <li className="flex items-start gap-2.5 text-[12px] text-slate-600 dark:text-slate-400 leading-relaxed">
            <span className="text-purple-500 font-black mt-0.5">•</span>
            <div>{children}</div>
        </li>
    );
}

function StatCard({ label, value }: { label: string, value: string }) {
    return (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</span>
            <span className="text-3xl font-black text-slate-900 dark:text-white leading-none">{value}</span>
        </div>
    );
}

