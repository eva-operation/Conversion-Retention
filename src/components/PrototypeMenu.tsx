import React, { useState } from 'react';
import { Settings, Users, Key, ChevronUp, ChevronDown, Check, Zap, Package, Info } from 'lucide-react';
import { cn } from '../lib/utils';

const PROTOTYPE_ROLES = [
    { id: 'eva_personel', label: 'Eva Personnel', icon: Users },
    { id: 'eva_admin', label: 'Eva Admin', icon: Users },
    { id: 'amazon_customer', label: 'Amazon Account Customer User', icon: Users },
    { id: 'amazon_missing_ad', label: 'Missing Ad Connection Amazon Account', icon: Users },
    { id: 'multichannel_customer', label: 'Multi-channel Customer User', icon: Users },
    { id: 'shopify_customer', label: 'Shopify Account Customer User', icon: Users },
    { id: 'new_customer', label: 'New Customer (Acme Corp)', icon: Users },
];

const PROTOTYPE_PACKAGES = [
    { id: 'no_package_after_trial', label: 'No Package after Trial', icon: Info },
    { id: 'trial', label: 'In Trial Period', icon: Zap },
    { id: 'reimbursement', label: 'Reimbursement', icon: Package },
    { id: 'eva_ai', label: 'Eva AI', icon: Zap },
    { id: 'reimbursement_eva_ai', label: 'Reimbursement + Eva AI', icon: Package },
];

export function PrototypeMenu({ onRoleChange, onPackageChange }: { 
    onRoleChange?: (roleId: string) => void,
    onPackageChange?: (packageId: string) => void
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeRole, setActiveRole] = useState(PROTOTYPE_ROLES[0].id);
    const [activePackage, setActivePackage] = useState('eva_ai');

    const isInternalRole = activeRole === 'eva_personel' || activeRole === 'eva_admin';
    const isNewCustomer = activeRole === 'new_customer';

    // Handle New Customer automatic package selection
    React.useEffect(() => {
        if (isNewCustomer && activePackage !== 'trial') {
            setActivePackage('trial');
            if (onPackageChange) onPackageChange('trial');
        }
    }, [isNewCustomer, activePackage, onPackageChange]);

    return (
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end animate-in fade-in duration-500">
            {isOpen && (
                <div className="mb-4 w-[360px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-blue-500/30 rounded-3xl shadow-[0_20px_60px_-15px_rgba(37,99,235,0.3)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden animate-in slide-in-from-bottom-2 zoom-in-95 duration-200">
                    <div className="px-5 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
                        <h3 className="font-bold text-sm tracking-tight relative z-10 flex items-center gap-2">
                            <Key size={16} className="opacity-90" />
                            Prototype Simulator
                        </h3>
                        <p className="text-[10px] text-blue-100 mt-0.5 relative z-10 opacity-80 uppercase tracking-widest font-black">Configuration Panel</p>
                    </div>
                    
                    <div className="flex flex-col items-center justify-center p-12 text-center">
                        <div className="w-16 h-16 rounded-3xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-4 text-slate-300 dark:text-slate-700">
                            <Settings size={32} />
                        </div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">Simulator Empty</p>
                        <p className="text-[11px] text-slate-500 mt-1">Selectable roles and packages removed</p>
                    </div>
                </div>
            )}

            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "flex items-center gap-3 pl-4 pr-2 py-2 rounded-full font-bold text-sm text-white shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-95 group border relative overflow-hidden",
                    isOpen
                        ? "bg-slate-900 dark:bg-slate-800 border-slate-700 shadow-slate-900/20 hover:bg-slate-800 dark:hover:bg-slate-700"
                        : "bg-gradient-to-r from-blue-600 to-indigo-600 border-blue-400/30 shadow-blue-500/30 hover:from-blue-500 hover:to-indigo-500 hover:shadow-blue-500/40"
                )}
            >
                {!isOpen && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] skew-x-[-15deg] group-hover:translate-x-[150%] transition-transform duration-700"></div>}
                <div className="flex items-center gap-2 relative z-10">
                    <span className="relative flex h-2.5 w-2.5">
                        <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", isOpen ? "bg-slate-500" : "bg-blue-200")}></span>
                        <span className={cn("relative inline-flex rounded-full h-2.5 w-2.5", isOpen ? "bg-slate-400" : "bg-white")}></span>
                    </span>
                    <span className="tracking-tight ml-0.5">{isOpen ? 'Close Simulator' : 'Prototype Simulator'}</span>
                </div>
                <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center ml-1 transition-all duration-300 relative z-10",
                    isOpen ? "bg-slate-800 dark:bg-slate-900/50" : "bg-white/20 group-hover:bg-white/30"
                )}>
                    {isOpen ? <ChevronDown size={16} /> : <Settings size={16} className="group-hover:rotate-90 transition-transform duration-500" />}
                </div>
            </button>
        </div>
    );
}
