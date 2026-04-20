import React, { useState, useEffect } from 'react';
import { X, Search, Check } from 'lucide-react';
import { Input } from './ui/input';

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

interface TeamManagementDialogProps {
    isOpen: boolean;
    onClose: () => void;
    project: any;
    role: 'am' | 'bm' | 'csm' | 'cm' | 'gd' | null;
    onSave: (newVal: string) => void;
    memberList: string[];
}

export const TeamManagementDialog: React.FC<TeamManagementDialogProps> = ({
    isOpen,
    onClose,
    project,
    role,
    onSave,
    memberList
}) => {
    const [teamSearch, setTeamSearch] = useState('');
    const [tempSelectedMembers, setTempSelectedMembers] = useState<string[]>([]);

    useEffect(() => {
        if (project && role) {
            const currentVal = project[role] || '';
            setTempSelectedMembers(currentVal.split(/,\s*/).filter(Boolean));
        }
    }, [project, role, isOpen]);

    if (!isOpen || !project || !role) return null;

    const getRoleLabel = (r: string) => {
        switch (r) {
            case 'am': return 'Advertising Manager';
            case 'bm': return 'Brand Manager';
            case 'csm': return 'Care Manager';
            case 'cm': return 'Escalation Manager';
            case 'gd': return 'Graphic Designer';
            default: return 'Team Member';
        }
    }

    const toggleTeamMember = (name: string) => {
        const isSingleOnly = role === 'am' || role === 'bm' || role === 'cm';
        setTempSelectedMembers(prev => {
            if (prev.includes(name)) {
                return prev.filter(n => n !== name);
            } else {
                if (isSingleOnly) return [name];
                return [...prev, name];
            }
        });
    };

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-[#0a121e]/40 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}></div>
            <div className="relative z-10 w-full max-w-[500px] bg-white dark:bg-slate-900 border border-[#e3e6ec] dark:border-slate-800 rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900">
                    <div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white">Assign Team Members</h3>
                        <div className="flex flex-col gap-0.5 mt-1">
                            <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                                Project: <span className="text-slate-900 dark:text-white">{project.name || project.projectName}</span>
                            </p>
                            <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                                Role: <span className="text-blue-600 dark:text-blue-400">{getRoleLabel(role)}</span>
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 transition-colors">
                        <X size={18} />
                    </button>
                </div>
                <div className="p-4 border-b border-slate-100 dark:border-slate-800">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={16} />
                        <Input
                            autoFocus
                            type="text"
                            placeholder="Search by name..."
                            value={teamSearch}
                            onChange={(e) => setTeamSearch(e.target.value)}
                            className="pl-9 h-10 bg-background"
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto max-h-[400px] p-2 custom-scrollbar">
                    <div className="space-y-1">
                        {memberList
                            .filter(name => name.toLowerCase().includes(teamSearch.toLowerCase()))
                            .map((name, idx) => {
                                const isSelected = tempSelectedMembers.includes(name);
                                return (
                                    <div
                                        key={idx}
                                        onClick={() => toggleTeamMember(name)}
                                        className={cn(
                                            "flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all border",
                                            isSelected
                                                ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
                                                : "bg-white dark:bg-slate-900 border-transparent hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-100"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={cn(
                                                "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors",
                                                isSelected ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                                            )}>
                                                {name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className={cn("text-sm font-semibold", isSelected ? "text-blue-700 dark:text-blue-300" : "text-slate-700 dark:text-slate-300")}>{name}</p>
                                                <p className="text-[10px] text-slate-400">{name.toLowerCase().replace(' ', '.')}@eva.guru</p>
                                            </div>
                                        </div>
                                        <div className={cn(
                                            "w-5 h-5 rounded border flex items-center justify-center transition-all",
                                            isSelected ? "bg-blue-600 border-blue-600" : "border-slate-300 dark:border-slate-600"
                                        )}>
                                            {isSelected && <Check size={12} className="text-white" />}
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
                <div className="p-4 bg-slate-50/50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors" >
                        Cancel
                    </button>
                    <button
                        onClick={() => onSave(tempSelectedMembers.join(', '))}
                        className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-95"
                    >
                        Save Assignments
                    </button>
                </div>
            </div>
        </div>
    );
};
