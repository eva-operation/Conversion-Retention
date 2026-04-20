import React, { useState, useEffect } from 'react';
import {
    X, Info, Lock, ChevronRight, RotateCcw, CheckSquare, Clock,
    Bold, Italic, Strikethrough, Heading1, Heading2, Heading3,
    List, ListOrdered, Quote, ChevronDown, Eye, Code2
} from 'lucide-react';
import {
    Tooltip, TooltipContent, TooltipProvider, TooltipTrigger
} from './Tooltip';
import { getEmailHTML, renderEmailCharts } from '../emailTemplate';
import { RichTextEditor } from './RichTextEditor';

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

interface RiskManagementDialogProps {
    isOpen: boolean;
    onClose: () => void;
    project: any;
    activePersona: string;
    userRole: string;
    theme: 'light' | 'dark';
    onSave: (updates: any) => void;
    risks: any[];
    factors: any[];
}

export const RiskManagementDialog: React.FC<RiskManagementDialogProps> = ({
    isOpen,
    onClose,
    project,
    activePersona,
    userRole,
    theme,
    onSave,
    risks,
    factors
}) => {
    const [dialogTab, setDialogTab] = useState<'internal' | 'customer'>('internal');
    const [selectedNewRisk, setSelectedNewRisk] = useState<any>(null);
    const [selectedFactors, setSelectedFactors] = useState<Set<string>>(new Set());
    const [riskNotes, setRiskNotes] = useState('');
    const [customerUpdateContent, setCustomerUpdateContent] = useState('');
    const [customerUpdateStatus, setCustomerUpdateStatus] = useState<'blank' | 'draft' | 'sent'>('blank');
    const [customerUpdateSentAt, setCustomerUpdateSentAt] = useState('');
    const [toEmail, setToEmail] = useState('');
    const [contactName, setContactName] = useState('');
    const [riskGuideOpen, setRiskGuideOpen] = useState(false);
    const [emailViewMode, setEmailViewMode] = useState<'preview' | 'edit'>('preview');

    useEffect(() => {
        if (project) {
            setSelectedNewRisk(project.risk);
            setRiskNotes(project.notes || '');
            setCustomerUpdateStatus(project.customerUpdateStatus || 'blank');
            setCustomerUpdateContent(project.customerUpdateContent || '');
            setCustomerUpdateSentAt(project.customerUpdateSentAt || '');
            setToEmail(project.contactEmail || '');
            setContactName(project.contactName || '');
            setSelectedFactors(new Set(project.riskFactors || []));
        }
    }, [project, isOpen]);

    useEffect(() => {
        if (dialogTab === 'customer' && customerUpdateContent && (customerUpdateContent.includes('email-preview-wrapper') || customerUpdateContent.includes('canvas'))) {
            const timer = setTimeout(() => {
                renderEmailCharts();
            }, 600);
            return () => clearTimeout(timer);
        }
    }, [customerUpdateContent, dialogTab]);

    if (!isOpen || !project) return null;

    const handlePublish = (asSent: boolean = false) => {
        const now = new Date().toLocaleString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });

        onSave({
            risk: selectedNewRisk,
            notes: riskNotes,
            riskFactors: Array.from(selectedFactors),
            customerUpdateContent,
            customerUpdateStatus: asSent ? 'sent' : 'draft',
            customerUpdateSentAt: asSent ? now : customerUpdateSentAt,
            contactEmail: toEmail,
            contactName: contactName
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-[#0a121e]/22 backdrop-blur-[2px] animate-in fade-in duration-200" onClick={onClose}></div>
            <div className="relative z-10 w-full max-w-[700px] bg-white border border-[#e3e6ec] rounded-[11px] shadow-[0_20px_48px_rgba(10,18,30,0.11),0_4px_10px_rgba(10,18,30,0.06)] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="px-[17px] pt-[15px] border-b border-[#e3e6ec] flex flex-col gap-3">
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="text-[10.5px] text-[#98a3b3] font-medium font-mono tracking-wide mb-[3px]">
                                <span className="text-[#68748a] font-sans font-semibold">Project Update</span> / {project.name || project.projectName}
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="text-[14px] font-bold text-[#0e1520] tracking-tight">Status & Communication</div>
                                <span className="text-[10px] text-[#98a3b3] font-mono bg-slate-50 border border-slate-100 px-1.5 py-0.5 rounded">2026W08 (02/16 – 02/22)</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className="flex items-center gap-1.5 px-2 py-1 rounded-[6px] text-[10.5px] font-bold text-[#98a3b3] hover:text-[#68748a] transition-all cursor-help select-none">
                                            <Info size={12} strokeWidth={2.5} />
                                            <span className="underline decoration-dotted underline-offset-2">Last Note</span>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent side="left" className="w-[280px] p-4 shadow-2xl border-[#e3e6ec] bg-white animate-in slide-in-from-right-2">
                                        <div className="space-y-3 text-slate-900">
                                            <div className="flex items-center justify-between">
                                                <span className="text-[10px] font-bold text-[#98a3b3] uppercase tracking-wider">Previous Report</span>
                                                <div className="flex items-center gap-2 px-2 py-0.5 rounded-full border text-[9px] font-bold" style={{ backgroundColor: project.risk.bg, borderColor: project.risk.hex, color: project.risk.hex }}>
                                                    {project.risk.name}
                                                </div>
                                            </div>
                                            <div className="p-3 rounded-lg bg-[#f5f6f8] border border-[#e3e6ec]/50">
                                                <div
                                                    className="text-[11px] leading-relaxed text-[#0e1520] italic"
                                                    dangerouslySetInnerHTML={{ __html: project.notes || 'No previous notes available.' }}
                                                />
                                            </div>
                                            <div className="text-[9px] text-[#98a3b3] font-medium text-right">Last updated: {project.createdAt}</div>
                                        </div>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <button onClick={onClose} className="p-1 hover:bg-[#f5f6f8] rounded-[5px] text-[#98a3b3] hover:text-[#0e1520] transition-colors">
                                <X size={15} strokeWidth={2.3} />
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <button onClick={() => setDialogTab('internal')} className={cn("pb-[11px] text-[11.5px] font-bold transition-all relative", dialogTab === 'internal' ? "text-[#2563eb]" : "text-[#98a3b3] hover:text-[#68748a]")}>
                            Risk Analysis
                            {dialogTab === 'internal' && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2563eb] rounded-t-full" />}
                        </button>
                        <button
                            onClick={() => {
                                setDialogTab('customer');
                                if (!customerUpdateContent || customerUpdateContent === '') {
                                    setCustomerUpdateContent(getEmailHTML(project.name || project.projectName, "Week 6 (Feb 1 – Feb 7)"));
                                }
                            }}
                            className={cn("pb-[11px] text-[11.5px] font-bold transition-all relative flex items-center gap-2", dialogTab === 'customer' ? "text-[#2563eb]" : "text-[#98a3b3] hover:text-[#68748a]")}
                        >
                            Weekly Customer Update
                            {customerUpdateStatus === 'sent' && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                            {dialogTab === 'customer' && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2563eb] rounded-t-full" />}
                        </button>
                    </div>
                </div>

                {/* Body */}
                <div className="p-[17px] max-h-[70vh] overflow-y-auto flex flex-col gap-[14px]">
                    {dialogTab === 'internal' ? (
                        <>
                            <div>
                                <span className="text-[10px] font-bold text-[#98a3b3] uppercase tracking-[0.55px]">Risk Status</span>
                                <div className="grid grid-cols-4 gap-[6px] mt-2">
                                    {risks.map(r => {
                                        const isSelected = selectedNewRisk?.name === r.name;
                                        const isAdmin = userRole === 'eva_admin';
                                        const current = project.risk.name;
                                        const target = r.name;
                                        let isAllowed = true;
                                        let reason = "";

                                        if (current === target) {
                                            // Mevcut durumu seçmek her zaman serbest
                                            isAllowed = true;
                                        } else {
                                            // ── Evrensel kural: White'a geri dönüş yok ──────────
                                            if (target === 'White') {
                                                isAllowed = false;
                                                reason = "Cannot return to White";
                                            }

                                            // ── Orange: Giriş ve çıkış yalnızca Admin ───────────
                                            else if (target === 'Orange' || current === 'Orange') {
                                                if (!isAdmin) {
                                                    isAllowed = false;
                                                    reason = "Admin only — service suspension";
                                                }
                                            }

                                            // ── Blue: Yalnızca Black'ten, yalnızca Admin ─────────
                                            else if (target === 'Blue') {
                                                if (!isAdmin) {
                                                    isAllowed = false;
                                                    reason = "Admin only — cancellation confirmed";
                                                } else if (current !== 'Black') {
                                                    isAllowed = false;
                                                    reason = "Blue can only be set from Black status";
                                                }
                                            }

                                            // ── Blue'dan çıkış: yalnızca Admin ──────────────────
                                            else if (current === 'Blue') {
                                                if (!isAdmin) {
                                                    isAllowed = false;
                                                    reason = "Admin only — cancellation confirmed";
                                                }
                                            }
                                        }

                                        return (
                                            <TooltipProvider key={r.name}>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <button
                                                            disabled={!isAllowed}
                                                            onClick={() => isAllowed && setSelectedNewRisk(r)}
                                                            className={cn("p-3 rounded-xl border relative transition-all flex flex-col items-center", isSelected ? "ring-1 scale-[1.02] shadow-sm" : "border-[#e3e6ec] bg-white opacity-90 text-slate-700", !isAllowed && "cursor-not-allowed")}
                                                            style={{
                                                                backgroundColor: isSelected
                                                                    ? (r.name === 'Black' ? '#1e293b' : r.bg)
                                                                    : undefined,
                                                                borderColor: isSelected
                                                                    ? (r.name === 'White' ? '#cbd5e1' : (r.name === 'Black' ? '#475569' : r.hex))
                                                                    : undefined,
                                                                color: isSelected
                                                                    ? (r.name === 'White' ? '#475569' : (r.name === 'Black' ? '#ffffff' : r.hex))
                                                                    : undefined
                                                            }}
                                                        >
                                                            {!isAllowed && <div className="absolute top-1.5 right-1.5 text-slate-400"><Lock size={10} /></div>}
                                                            <div className="flex items-center gap-2 w-full justify-center py-1.5">
                                                                <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: r.hex, border: r.name === 'White' ? '1px solid #cbd5e1' : '1px solid rgba(0,0,0,0.1)' }} />
                                                                <span className="text-[10px] font-bold">{r.name}</span>
                                                            </div>
                                                        </button>
                                                    </TooltipTrigger>
                                                    {!isAllowed && (
                                                        <TooltipContent side="top">
                                                            <p className="text-[10px] font-bold">{reason}</p>
                                                        </TooltipContent>
                                                    )}
                                                </Tooltip>
                                            </TooltipProvider>
                                        );
                                    })}
                                </div>
                                {selectedNewRisk && (
                                    <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-lg animate-in fade-in slide-in-from-top-1 duration-200">
                                        <div className="flex items-start gap-2.5">
                                            <div className="mt-1 w-2.5 h-2.5 rounded-full shrink-0 shadow-sm border border-black/5" style={{ backgroundColor: selectedNewRisk.hex }} />
                                            <div className="text-[11px] leading-relaxed text-slate-600">
                                                <span className="font-bold text-slate-900">{selectedNewRisk.name}</span> is selected, this means <span className="text-slate-700">{selectedNewRisk.desc}</span>.
                                                <button onClick={() => setRiskGuideOpen(!riskGuideOpen)} className="ml-1 text-blue-600 hover:text-blue-700 font-medium hover:underline inline-flex items-center gap-0.5">
                                                    To see the meaning of other cards, click here
                                                    <ChevronDown size={10} className={cn("transition-transform duration-200", riskGuideOpen && "rotate-180")} strokeWidth={2.5} />
                                                </button>
                                            </div>
                                        </div>
                                        {riskGuideOpen && (
                                            <div className="mt-3 pt-3 border-t border-slate-200 grid grid-cols-1 gap-2 animate-in slide-in-from-top-1 fade-in duration-200">
                                                {risks.filter(r => r.name !== selectedNewRisk.name).map(r => (
                                                    <div key={r.name} className="flex items-start gap-2">
                                                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 border border-black/5" style={{ backgroundColor: r.hex }} />
                                                        <div className="text-[10.5px] leading-snug">
                                                            <span className="font-bold text-slate-900 mr-1">{r.name}:</span>
                                                            <span className="text-slate-500">{r.desc}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div>
                                <span className="text-[10px] font-bold text-[#98a3b3] uppercase tracking-[0.55px]">Risk Factors</span>
                                <div className="flex flex-wrap gap-[6px] mt-2">
                                    {factors.map(f => {
                                        const isSelected = selectedFactors.has(f.name);
                                        return (
                                            <TooltipProvider key={f.name}>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <button
                                                            onClick={() => {
                                                                const next = new Set(selectedFactors);
                                                                if (next.has(f.name)) next.delete(f.name);
                                                                else next.add(f.name);
                                                                setSelectedFactors(next);
                                                            }}
                                                            className={cn("px-[10px] py-[6px] rounded-full border text-[11px] font-bold flex items-center gap-1.5 transition-all", isSelected ? "border-[#2563eb] bg-[#eef3ff] text-[#2563eb]" : "border-[#e3e6ec] bg-[#f5f6f8] text-[#68748a] hover:bg-white")}
                                                        >
                                                            <div className={cn("w-[5px] h-[5px] rounded-full", isSelected ? "bg-[#2563eb]" : "bg-[#cdd2db]")} />
                                                            {f.name}
                                                        </button>
                                                    </TooltipTrigger>
                                                    <TooltipContent side="top" className="max-w-[220px] text-center">
                                                        <p className="text-[11px]">{f.desc}</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        );
                                    })}
                                </div>
                            </div>

                            <div>
                                <span className="text-[10px] font-bold text-[#98a3b3] uppercase tracking-[0.55px]">Internal Notes</span>
                                <RichTextEditor
                                    value={riskNotes}
                                    onChange={setRiskNotes}
                                    placeholder="Briefly note key developments observed this week..."
                                    minHeight="140px"
                                    className="mt-2"
                                />
                            </div>
                        </>
                    ) : (
                        <div className="space-y-[14px]">
                            <div className="flex items-center justify-between pb-3 border-b border-[#e3e6ec]">
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[11.5px] text-slate-500">To:</span>
                                        <input className="bg-transparent border-none outline-none text-[11.5px] font-bold w-full text-slate-900" value={toEmail} onChange={(e) => setToEmail(e.target.value)} placeholder="Email..." />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[11.5px] text-slate-500">Name:</span>
                                        <input className="bg-transparent border-none outline-none text-[11.5px] font-bold w-full text-slate-900" value={contactName} onChange={(e) => setContactName(e.target.value)} placeholder="Name..." />
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {/* Preview / Edit toggle */}
                                    <div className="flex items-center border border-[#e3e6ec] rounded-[6px] overflow-hidden">
                                        <button
                                            onClick={() => setEmailViewMode('preview')}
                                            className={`flex items-center gap-1 px-2 py-1 text-[10px] font-bold transition-all ${emailViewMode === 'preview'
                                                ? 'bg-[#2563eb] text-white'
                                                : 'bg-white text-[#98a3b3] hover:text-[#68748a]'
                                                }`}
                                        >
                                            <Eye size={11} /> Preview
                                        </button>
                                        <button
                                            onClick={() => setEmailViewMode('edit')}
                                            className={`flex items-center gap-1 px-2 py-1 text-[10px] font-bold transition-all ${emailViewMode === 'edit'
                                                ? 'bg-[#2563eb] text-white'
                                                : 'bg-white text-[#98a3b3] hover:text-[#68748a]'
                                                }`}
                                        >
                                            <Code2 size={11} /> Edit
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => setCustomerUpdateContent(getEmailHTML(project.name || project.projectName, "Week 6 (Feb 1 – Feb 7)"))}
                                        className="text-[10px] font-bold text-blue-600 hover:underline flex items-center gap-1"
                                    >
                                        <RotateCcw size={12} /> Get Template
                                    </button>
                                </div>
                            </div>

                            {emailViewMode === 'preview' ? (
                                customerUpdateContent ? (
                                    <iframe
                                        srcDoc={customerUpdateContent}
                                        className="w-full rounded-[7px] border border-[#e3e6ec] bg-white"
                                        style={{ minHeight: '360px', height: '360px' }}
                                        title="Email Preview"
                                        sandbox="allow-same-origin"
                                    />
                                ) : (
                                    <div className="w-full min-h-[360px] border border-dashed border-[#e3e6ec] rounded-[7px] flex flex-col items-center justify-center gap-3 text-[#98a3b3]">
                                        <Eye size={32} strokeWidth={1.5} />
                                        <div className="text-center">
                                            <p className="text-[12px] font-bold">No template loaded</p>
                                            <p className="text-[11px] mt-0.5">Click <span className="font-bold text-blue-500">Get Template</span> to load the default email</p>
                                        </div>
                                    </div>
                                )
                            ) : (
                                <RichTextEditor
                                    value={customerUpdateContent}
                                    onChange={setCustomerUpdateContent}
                                    placeholder="Compose your customer update here..."
                                    minHeight="340px"
                                />
                            )}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-[17px] py-[13px] border-t border-[#e3e6ec] flex items-center justify-between bg-[#f5f6f8]">
                    <button onClick={onClose} className="text-[11.5px] font-semibold text-[#98a3b3] hover:text-[#e05252]">Discard Changes</button>
                    <div className="flex gap-[8px]">
                        <button onClick={() => handlePublish(false)} className="px-[14px] py-[7px] rounded-[7px] border-[1.5px] border-[#e3e6ec] text-[12px] font-bold text-[#68748a] hover:bg-white transition-all">Save as Draft</button>
                        <button onClick={() => handlePublish(true)} className="flex items-center gap-[6px] px-[16px] py-[7px] rounded-[7px] bg-[#2563eb] text-white text-[12px] font-bold shadow-lg hover:bg-[#1d4ed8] active:scale-[0.97] transition-all">
                            {dialogTab === 'customer' ? 'Send Update' : 'Publish Report'}
                            <ChevronRight size={13} strokeWidth={2.5} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
