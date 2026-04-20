import React, { useState } from 'react';
import { 
    ChevronLeft, 
    ChevronRight, 
    Check, 
    ShieldCheck, 
    Globe, 
    Building2, 
    Layout, 
    ArrowUpRight, 
    Target, 
    BadgeCheck,
    Lock,
    ExternalLink,
    AlertCircle,
    Info,
    Store,
    Plus,
    User
} from 'lucide-react';

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

const AmazonIcon = ({ className }: { className?: string }) => (
    <img
        src="https://bf.eva.guru/_next/image?url=%2F128px-Amazon_icon.svg.png&w=32&q=75"
        className={className}
        alt="Amazon"
    />
);

interface ConnectionWizardProps {
    onClose: () => void;
    onComplete: () => void;
    onAmazonPage?: (showing: boolean) => void;
    onNavigateAnalytics?: (model: 'Seller' | 'Vendor') => void;
    needsAccountName?: boolean;
    initialStep?: number;
}

export const ConnectionWizard: React.FC<ConnectionWizardProps> = ({ onClose, onComplete, onAmazonPage, onNavigateAnalytics, needsAccountName, initialStep = 0 }) => {
    const [step, setStep] = useState(initialStep); // 0 is model selection, 1-7 are numbered steps
    const [model, setModel] = useState<'vendor' | 'seller' | null>(initialStep >= 4 ? 'seller' : null);
    const [location, setLocation] = useState('US');
    const [displayName, setDisplayName] = useState('ACME CORP');
    const [region, setRegion] = useState<'NA' | 'EU' | 'FE' | null>(null);
    const [isAuthing, setIsAuthing] = useState(false);
    const [authStep, setAuthStep] = useState(1); // 1: Info, 2: Amazon Login Simulation, 3: Permissions
    const [isAdAuthing, setIsAdAuthing] = useState(false);
    const [selectedProfiles, setSelectedProfiles] = useState<string[]>(['acme_us']);
    const [stepHistory, setStepHistory] = useState<number[]>([]);

    const totalSteps = 7;

    const nextStep = () => {
        setStepHistory(prev => [...prev, step]);
        setStep(prev => prev + 1);
    };
    
    const prevStep = () => {
        if (stepHistory.length > 0) {
            const h = [...stepHistory];
            const p = h.pop()!;
            setStepHistory(h);
            setStep(p);
        } else {
            setStep(prev => Math.max(0, prev - 1));
        }
    };

    const goToStep = (newStep: number) => {
        setStepHistory(prev => [...prev, step]);
        setStep(newStep);
    };

    // Notify parent when Amazon pages are active
    React.useEffect(() => {
        onAmazonPage?.(isAuthing || isAdAuthing);
    }, [isAuthing, isAdAuthing]);

    // --- RENDER HELPERS ---

    const renderProgressBar = () => {
        if (step === 0) return null;
        return (
            <div className="flex flex-col gap-2 mb-10">
                <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                    <span>Step {step} out of {totalSteps}</span>
                    <span className="text-blue-600">{Math.round((step / totalSteps) * 100)}% Complete</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-700 ease-out shadow-[0_0_10px_rgba(37,99,235,0.3)]"
                        style={{ width: `${(step / totalSteps) * 100}%` }}
                    />
                </div>
            </div>
        );
    };

    // --- STEP RENDERS ---

    const renderModelSelection = () => (
        <div className="flex flex-col gap-10 animate-in fade-in zoom-in-95 duration-500">
            <div className="text-center space-y-4">
                <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">How do you sell on Amazon?</h2>
                <p className="text-lg text-slate-500 font-medium">Choose your business model to optimize your connection.</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
                {[
                    { id: 'vendor', title: 'Amazon Vendor', desc: '1P Model: You sell directly to Amazon as a wholesaler.', icon: Building2 },
                    { id: 'seller', title: 'Amazon Seller', desc: '3P Model: You sell to customers via Marketplace.', icon: Layout }
                ].map(opt => (
                    <div 
                        key={opt.id}
                        onClick={() => setModel(opt.id as any)}
                        className={cn(
                            "relative p-8 rounded-[32px] border-2 cursor-pointer transition-all duration-300 flex flex-col gap-6 group",
                            model === opt.id 
                                ? "bg-blue-50/50 border-blue-600 shadow-xl shadow-blue-500/10 dark:bg-blue-900/10" 
                                : "bg-white border-slate-100 hover:border-blue-200 dark:bg-slate-900 dark:border-slate-800"
                        )}
                    >
                        {model === opt.id && (
                            <div className="absolute top-6 right-6 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg animate-in zoom-in duration-300">
                                <Check size={18} strokeWidth={3} />
                            </div>
                        )}
                        <div className={cn(
                            "w-16 h-16 rounded-2xl flex items-center justify-center transition-all",
                            model === opt.id ? "bg-blue-600 text-white" : "bg-slate-50 dark:bg-slate-800 text-slate-400 group-hover:text-blue-500"
                        )}>
                            <opt.icon size={32} />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white">{opt.title}</h3>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed">{opt.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex gap-4 mt-4">
                <button 
                    onClick={onClose}
                    className="flex-1 py-5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-black rounded-2xl transition-all active:scale-95"
                >
                    Cancel
                </button>
                <button 
                    disabled={!model}
                    onClick={nextStep}
                    className="flex-[2] flex items-center justify-center gap-3 py-5 bg-[#0084FF] hover:bg-[#0076E5] text-white text-lg font-black rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,132,255,0.4)] transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed group"
                >
                    <span>Continue</span>
                    <ChevronRight size={22} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );

    const renderStep1Identify = () => (
        <div className="flex flex-col gap-10 animate-in slide-in-from-right-8 duration-500">
            <div className="space-y-2 text-center">
                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Identity Details</h2>
                <p className="text-slate-500 font-medium">Let's identify you and your store location.</p>
            </div>

            <div className="space-y-8">
                <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-500 ml-1">Marketplace Location</label>
                    <div className="relative group">
                        <select 
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full h-16 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl px-6 appearance-none font-bold text-slate-900 dark:text-white focus:border-blue-500 outline-none transition-all cursor-pointer"
                        >
                            <option value="US">United States of America (US)</option>
                            <option value="UK">United Kingdom (UK)</option>
                            <option value="DE">Germany (DE)</option>
                            <option value="FR">France (FR)</option>
                            <option value="JP">Japan (JP)</option>
                            <option value="AU">Australia (AU)</option>
                        </select>
                        <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-slate-600 transition-colors" size={20} />
                    </div>
                </div>

                {((model === 'vendor') || (model === 'seller' && needsAccountName)) && (
                    <div className="space-y-3">
                        <label className="text-sm font-bold text-slate-500 ml-1">
                            {model === 'vendor' ? 'Vendor Display Name' : 'Account Name'}
                        </label>
                        <div className="relative">
                            <input 
                                type="text"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                placeholder={model === 'vendor' ? "Enter display name..." : "Enter your account name..."}
                                className="w-full h-16 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl px-6 font-bold text-slate-900 dark:text-white focus:border-blue-500 outline-none transition-all placeholder:text-slate-300"
                            />
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-bold text-blue-500 bg-blue-50 dark:bg-blue-900/40 px-3 py-1.5 rounded-lg border border-blue-100 dark:border-blue-800/50 shadow-sm">
                                Required
                            </div>
                        </div>
                        <p className="text-[11px] text-slate-400 font-medium ml-1 flex items-center gap-1.5">
                            <Info size={12} className="text-blue-500" />
                            {model === 'vendor' 
                                ? 'This name will be used as a nickname for reporting in Eva Flow.' 
                                : 'Please provide a name for your Eva Account to continue.'}
                        </p>
                    </div>
                )}
            </div>

            <div className="flex gap-4">
                <button onClick={prevStep} className="flex-1 py-5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-black rounded-2xl transition-all active:scale-95">Back</button>
                <button 
                    disabled={(model === 'vendor' && !displayName.trim()) || (model === 'seller' && needsAccountName && !displayName.trim())}
                    onClick={nextStep} 
                    className={cn(
                        "flex-[2] py-5 bg-[#0084FF] hover:bg-[#0076E5] text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 transition-all active:scale-95",
                        ((model === 'vendor' && !displayName.trim()) || (model === 'seller' && needsAccountName && !displayName.trim())) && "opacity-50 grayscale cursor-not-allowed shadow-none"
                    )}
                >
                    Next Step
                </button>
            </div>
        </div>
    );

    const renderStep2Regional = () => (
        <div className="flex flex-col gap-10 animate-in slide-in-from-right-8 duration-500">
            <div className="space-y-2 text-center">
                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Regional Segmentation</h2>
                <p className="text-slate-500 font-medium">Select the primary region where you sell.</p>
            </div>

            <div className="flex flex-col gap-4">
                {[
                    { id: 'NA', title: 'North America', desc: 'United States, Canada, Mexico', icon: Globe },
                    { id: 'EU', title: 'Europe', desc: 'UK, Germany, France, Italy, Spain', icon: Map },
                    { id: 'FE', title: 'Far East', desc: 'Japan, Australia, Singapore', icon: Compass }
                ].map(opt => (
                    <div 
                        key={opt.id}
                        onClick={() => setRegion(opt.id as any)}
                        className={cn(
                            "p-6 rounded-2xl border-2 flex items-center gap-6 cursor-pointer transition-all duration-300",
                            region === opt.id 
                                ? "bg-blue-50/50 border-blue-600 shadow-lg shadow-blue-500/5 dark:bg-blue-900/10" 
                                : "bg-white border-slate-100 hover:border-blue-200 dark:bg-slate-900 dark:border-slate-800"
                        )}
                    >
                        <div className={cn(
                            "w-12 h-12 rounded-xl flex items-center justify-center",
                            region === opt.id ? "bg-blue-600 text-white" : "bg-slate-50 dark:bg-slate-800 text-slate-400"
                        )}>
                            <opt.icon size={24} />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-slate-900 dark:text-white">{opt.title}</h4>
                            <p className="text-xs text-slate-500">{opt.desc}</p>
                        </div>
                        {region === opt.id && <Check size={20} className="text-blue-600" />}
                    </div>
                ))}
            </div>

            <div className="flex gap-4">
                <button onClick={prevStep} className="flex-1 py-5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-black rounded-2xl transition-all active:scale-95">Back</button>
                <button disabled={!region} onClick={nextStep} className="flex-[2] py-5 bg-[#0084FF] hover:bg-[#0076E5] text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 transition-all active:scale-95 disabled:opacity-50">Continue</button>
            </div>
        </div>
    );

    const renderStep3Auth = () => {
        if (isAuthing) {
            return (
                <div className="fixed inset-0 z-[9999] w-screen h-screen flex flex-col items-center justify-center animate-in slide-in-from-bottom-5 duration-300 bg-white dark:bg-slate-950 overflow-y-auto font-sans">
                    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center py-10 my-auto animate-in zoom-in-95 duration-500">
                    
                    {/* Header Logo for Steps 1-3 */}
                    {(authStep >= 1 && authStep <= 3) && (
                        <div className="w-full flex justify-center mb-6">
                            <div className="flex flex-col items-center">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" className="h-10 dark:brightness-0 dark:invert" alt="Amazon" />
                                {model === 'vendor' && <span className="text-[#f0c14b] font-bold text-sm -mt-2 ml-16">vendor central</span>}
                                {model === 'seller' && <span className="text-[#f0c14b] font-bold text-sm -mt-2 ml-16">seller central</span>}
                            </div>
                        </div>
                    )}

                    {authStep === 1 && (
                        <div className="w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-8 shadow-sm">
                            <h2 className="text-[28px] font-normal mb-4 font-sans text-[#0f1111] dark:text-white">Sign in</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="font-bold text-[13px] text-[#0f1111] dark:text-slate-300 block mb-1">Email or mobile phone number</label>
                                    <input 
                                        type="text" 
                                        value="acme@acmedomain.com"
                                        readOnly
                                        className="w-full px-3 py-2 border border-[#a6a6a6] rounded shadow-[0_1px_2px_rgba(15,17,17,.1)_inset] focus:outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,.5)] bg-white dark:bg-slate-800 text-[#0f1111] dark:text-white"
                                    />
                                </div>
                                <button onClick={() => setAuthStep(2)} className="w-full py-2 bg-[#f0c14b] border border-[#a88734_#9c7e31_#846a29] hover:bg-[#f4d078] text-[#111] rounded shadow-sm text-[13px] font-normal">
                                    Continue
                                </button>
                                
                                <div className="mt-4 text-[12px] text-[#0f1111] dark:text-slate-300">
                                    By continuing, you agree to Amazon's <a href="#" className="text-[#0066c0] hover:text-[#c45500] hover:underline">Conditions of Use</a> and <a href="#" className="text-[#0066c0] hover:text-[#c45500] hover:underline">Privacy Notice</a>.
                                </div>
                                <div className="mt-6 pt-6 border-t border-[#e7e7e7] dark:border-slate-700 text-center">
                                    <button onClick={() => setIsAuthing(false)} className="text-sm text-blue-600 hover:underline">Cancel connection process</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {authStep === 2 && (
                        <div className="w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-8 shadow-sm">
                            <h2 className="text-[28px] font-normal mb-4 font-sans text-[#0f1111] dark:text-white">Sign in</h2>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-[13px]">
                                    <span className="text-[#0f1111] dark:text-white">acme@acmedomain.com</span>
                                    <button onClick={() => setAuthStep(1)} className="text-[#0066c0] hover:text-[#c45500] hover:underline">Change</button>
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-1 text-[13px]">
                                        <label className="font-bold text-[#0f1111] dark:text-slate-300 block">Password</label>
                                        <a href="#" className="text-[#0066c0] hover:text-[#c45500] hover:underline">Forgot password?</a>
                                    </div>
                                    <input 
                                        type="password" 
                                        value="••••••••••••"
                                        readOnly
                                        className="w-full px-3 py-2 border border-[#a6a6a6] rounded shadow-[0_1px_2px_rgba(15,17,17,.1)_inset] focus:outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,.5)] bg-[#f8fcfd] dark:bg-slate-800 text-[#0f1111] dark:text-white"
                                    />
                                </div>
                                <button onClick={() => setAuthStep(3)} className="w-full py-2 bg-[#f0c14b] hover:bg-[#f4d078] border border-[#a88734_#9c7e31_#846a29] text-[#111] rounded shadow-sm text-[13px] font-normal transition-colors">
                                    Sign in
                                </button>
                                <div className="mt-2 text-center text-sm">
                                    <button onClick={() => setAuthStep(1)} className="text-[#0066c0] hover:underline">Back</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {authStep === 3 && (
                        <div className="w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-8 shadow-sm">
                            <h2 className="text-2xl font-normal mb-2 font-sans text-[#0f1111] dark:text-white">Two-Step Verification</h2>
                            <p className="text-[13px] text-[#0f1111] dark:text-slate-300 mb-4">For added security, please enter the One Time Password (OTP) generated by your Authenticator App</p>
                            <div className="space-y-4">
                                <div>
                                    <label className="font-bold text-[13px] text-[#0f1111] dark:text-slate-300 block mb-1">Enter code:</label>
                                    <input 
                                        type="text" 
                                        className="w-full px-3 py-2 border border-[#a6a6a6] rounded shadow-[0_1px_2px_rgba(15,17,17,.1)_inset] focus:outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,.5)] bg-white dark:bg-slate-800 text-[#0f1111] dark:text-white"
                                    />
                                </div>
                                <button onClick={() => setAuthStep(4)} className="w-full py-2 bg-[#f0c14b] bg-gradient-to-b from-[#f7dfa5] to-[#f0c14b] hover:from-[#f5d78e] hover:to-[#eeb933] border border-[#a88734_#9c7e31_#846a29] text-[#111] rounded shadow-sm text-[13px] font-normal transition-colors">
                                    Sign in
                                </button>
                                <div className="mt-4 flex flex-col gap-2">
                                    <button onClick={() => setAuthStep(2)} className="text-[13px] text-[#0066c0] hover:text-[#c45500] hover:underline flex items-center gap-1 self-start">
                                        <span className="w-1 h-1 rounded-full bg-slate-400"></span> Didn't receive the code?
                                    </button>
                                    <button onClick={() => setAuthStep(2)} className="text-[13px] text-[#0066c0] hover:text-[#c45500] hover:underline flex items-center gap-1 self-start">
                                        <span className="w-1 h-1 rounded-full bg-slate-400"></span> Back
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {authStep === 4 && (
                        <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border-[3px] border-[#000] dark:border-slate-700 rounded-sm p-10 shadow-sm font-sans mx-auto">
                            <h2 className="text-[22px] font-normal text-[#004b91] mb-6">Authorize Eva</h2>
                            
                            <p className="font-bold text-[14px] text-[#0f1111] dark:text-slate-200 mb-6">
                                Eva requires access to view and edit the following data related to your Seller Partner account:
                            </p>
                            
                            <div className="border-t border-b border-[#e7e7e7] dark:border-slate-700 divide-y divide-[#e7e7e7] dark:divide-slate-700 mb-8">
                                <div className="py-4 flex items-center text-[14px] font-bold text-[#004b91] dark:text-blue-400">
                                    Amazon Fulfilment
                                    <button className="ml-2 text-blue-500 rounded-full border border-blue-500 w-4 h-4 flex items-center justify-center text-[10px]">i</button>
                                </div>
                                <div className="py-4 flex items-center text-[14px] font-bold text-[#004b91] dark:text-blue-400">
                                    Product Listing
                                    <button className="ml-2 text-blue-500 rounded-full border border-blue-500 w-4 h-4 flex items-center justify-center text-[10px]">i</button>
                                </div>
                                <div className="py-4 flex items-center text-[14px] font-bold text-[#004b91] dark:text-blue-400">
                                    Brand Analytics
                                    <button className="ml-2 text-blue-500 rounded-full border border-blue-500 w-4 h-4 flex items-center justify-center text-[10px]">i</button>
                                </div>
                                <div className="py-4 flex items-center text-[14px] font-bold text-[#004b91] dark:text-blue-400">
                                    Direct-to-Consumer Shipping
                                    <button className="ml-2 text-blue-500 rounded-full border border-blue-500 w-4 h-4 flex items-center justify-center text-[10px]">i</button>
                                </div>
                            </div>

                            <p className="text-[12px] text-[#0f1111] dark:text-slate-300 mb-8 leading-relaxed">
                                Note: Authorizing an application gives an application the ability to view or edit information about your Amazon business and take action on your Selling Partner account.
                            </p>

                            <label className="flex items-start gap-3 text-[12px] text-[#004b91] dark:text-blue-400 cursor-pointer mb-6">
                                <input type="checkbox" className="mt-1 border-[#004b91]" />
                                <span className="leading-relaxed">
                                    I direct Amazon to provide Eva access to my Selling Partner account and related data. I am responsible for any actions taken by the application.
                                </span>
                            </label>

                            <p className="text-[12px] text-[#0f1111] dark:text-slate-300 mb-8">
                                Once you confirm, Eva will be authorized to access selling data on your behalf.
                            </p>

                            <div className="flex justify-end gap-3">
                                <button onClick={() => setAuthStep(3)} className="px-6 py-2 bg-white border border-[#a6a6a6] rounded shadow-[0_1px_0_rgba(255,255,255,.6)_inset] text-[#111] text-[13px]">
                                    Cancel
                                </button>
                                <button 
                                    onClick={() => {
                                        setIsAuthing(false);
                                        goToStep(4);
                                    }} 
                                    className="px-6 py-2 bg-[#8c949a] text-white border border-[#747d84] rounded text-[13px]"
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    )}
                    
                    </div>
                </div>
            );
        }

        return (
            <div className="flex flex-col gap-10 animate-in slide-in-from-right-8 duration-500">
                <div className="space-y-2 text-center text-white py-12 px-6 rounded-[32px] bg-gradient-to-br from-slate-800 to-slate-950 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <AmazonIcon className="w-32 h-32 brightness-0 invert" />
                    </div>
                    <div className="relative z-10 space-y-4">
                        <h2 className="text-3xl font-black tracking-tight">Authorization & Security</h2>
                        <p className="text-slate-400 font-medium max-w-sm mx-auto">We use official Amazon SP-API protocols. You'll be redirected to Amazon for secure authentication.</p>
                        <ul className="flex flex-col gap-3 text-left max-w-xs mx-auto mt-8">
                            <li className="flex items-center gap-3 text-xs font-bold text-slate-300">
                                <div className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-blue-400"><Check size={12} /></div>
                                Eva doesn't see your password
                            </li>
                            <li className="flex items-center gap-3 text-xs font-bold text-slate-300">
                                <div className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-blue-400"><Check size={12} /></div>
                                Official Amazon SP-API Integration
                            </li>
                            <li className="flex items-center gap-3 text-xs font-bold text-slate-300">
                                <div className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-blue-400"><Check size={12} /></div>
                                Secure Two-Step Verification
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex gap-4">
                    <button onClick={prevStep} className="flex-1 py-5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-black rounded-2xl transition-all active:scale-95">Back</button>
                    <button onClick={() => setIsAuthing(true)} className="flex-[2] py-5 bg-[#0084FF] hover:bg-[#0076E5] text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 transition-all active:scale-95 flex items-center justify-center gap-3">
                        <span>Authenticate Now</span>
                        <ChevronRight size={22} />
                    </button>
                </div>
            </div>
        );
    };

    const renderStep4AdAccount = () => (
        <div className="flex flex-col gap-8 animate-in slide-in-from-right-8 duration-500">
            <div className="space-y-4 text-center">
                <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/20 rounded-[24px] flex items-center justify-center text-emerald-600 mx-auto relative">
                    <Check size={40} strokeWidth={3} />
                    <div className="absolute -inset-2 bg-emerald-500/20 rounded-[28px] animate-pulse"></div>
                </div>
                <div className="space-y-2">
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Sales Data Connected!</h2>
                    <p className="text-slate-500 font-medium max-w-md mx-auto">Your Vendor Central account is linked. Now, let's optimize your growth with Advertising data.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                <button 
                    onClick={() => goToStep(5)}
                    className="p-8 bg-blue-600 hover:bg-blue-700 text-white rounded-3xl flex items-center justify-between transition-all group shadow-xl shadow-blue-500/20"
                >
                    <div className="flex items-center gap-6">
                        <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                            <Target size={28} strokeWidth={2.5} />
                        </div>
                        <div className="text-left space-y-1">
                            <h4 className="text-xl font-black">Connect Ad Account</h4>
                            <p className="text-sm font-medium text-white/70">Sync Amazon Advertising data & autopilot.</p>
                        </div>
                    </div>
                    <ArrowUpRight size={28} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform opacity-70" />
                </button>

                <div className="grid grid-cols-2 gap-4">
                    <button 
                        onClick={() => { 
                            const type = model?.charAt(0).toUpperCase() + (model?.slice(1) || '') as 'Seller' | 'Vendor';
                            if (onNavigateAnalytics) onNavigateAnalytics(type); else onComplete(); 
                        }}
                        className="p-6 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-3xl flex flex-col items-center gap-4 transition-all border border-slate-100 dark:border-slate-700"
                    >
                        <div className="w-10 h-10 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-center shadow-sm">
                            <Layout size={20} className="text-slate-400" />
                        </div>
                        <span className="text-xs font-black uppercase tracking-widest">Go to Analytics</span>
                    </button>
                    <button 
                        onClick={() => {
                            setStepHistory([]);
                            setStep(1);
                        }}
                        className="p-6 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-3xl flex flex-col items-center gap-4 transition-all border border-slate-100 dark:border-slate-700"
                    >
                        <div className="w-10 h-10 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-center shadow-sm">
                            <Plus size={20} className="text-slate-400" />
                        </div>
                        <span className="text-xs font-black uppercase tracking-widest">Connect Another</span>
                    </button>
                </div>
            </div>

            <div className="flex gap-4 pt-4 border-t border-slate-50 dark:border-slate-800/50">
                <button onClick={prevStep} className="flex-1 py-5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-black rounded-2xl transition-all active:scale-95">Back</button>
            </div>

            <div className="pt-2">
                <p className="text-center text-[10px] text-slate-400 font-medium">You can always connect Advertising accounts later from settings.</p>
            </div>
        </div>
    );

    const renderStep5AdPerm = () => {
        if (isAdAuthing) {
            return (
                <div className="fixed inset-0 z-[9999] w-screen h-screen flex flex-col items-center justify-center animate-in slide-in-from-bottom-5 duration-300 bg-white dark:bg-slate-950 overflow-y-auto font-sans">
                    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center py-10 my-auto animate-in zoom-in-95 duration-500">
                        <div className="w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-10 shadow-sm font-sans mx-auto flex flex-col items-center">
                            <div className="w-full flex justify-between items-center mb-16">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" className="h-8 dark:brightness-0 dark:invert" alt="Amazon" />
                                <User size={24} className="text-slate-500" />
                            </div>

                            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 font-bold text-2xl mb-12 shadow-sm">
                                eva
                            </div>

                            <h2 className="text-[28px] font-normal text-[#0f1111] dark:text-white mb-16 text-center">
                                Click 'Allow' to Sign-In to evacommerce.
                            </h2>

                            <div className="flex gap-4 w-full justify-center max-w-md mb-8">
                                <button onClick={() => setIsAdAuthing(false)} className="flex-1 py-3 bg-white border border-[#d5d9d9] hover:bg-[#f7fafa] text-[#0f1111] rounded-[8px] text-[13px] shadow-[0_2px_5px_0_rgba(213,217,217,.5)]">
                                    Cancel
                                </button>
                                <button 
                                    onClick={() => {
                                        setIsAdAuthing(false);
                                        goToStep(6);
                                    }} 
                                    className="flex-1 py-3 bg-[#ffd814] hover:bg-[#f7ca00] text-[#0f1111] rounded-[8px] text-[13px] shadow-[0_2px_5px_0_rgba(213,217,217,.5)]"
                                >
                                    Allow
                                </button>
                            </div>

                            <p className="text-[12px] text-[#565959] dark:text-slate-400 text-center mb-8">
                                You can remove access at any time by visiting <a href="#" className="text-[#007185] hover:text-[#c45500] hover:underline">Manage apps & services with data access</a> at Amazon.
                            </p>

                            <div className="flex justify-center gap-6 text-[12px] text-[#007185] border-t border-[#e7e7e7] dark:border-slate-800 w-full pt-6">
                                <a href="#" className="hover:text-[#c45500] hover:underline">Amazon Terms & Privacy</a>
                                <a href="#" className="hover:text-[#c45500] hover:underline">evacommerce Privacy</a>
                                <span className="text-[#565959] dark:text-slate-500">© 1996-2026, Amazon.com, Inc. or its affiliates</span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="flex flex-col gap-10 animate-in slide-in-from-right-8 duration-500">
                <div className="space-y-2 text-center">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/40 rounded-2xl flex items-center justify-center text-blue-600 mx-auto">
                        <Target size={32} />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Ad Data Permissions</h2>
                    <p className="text-slate-500 font-medium">Eva needs permission to sync your Amazon Advertising API data.</p>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
                    <div className="flex items-start gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800/50">
                        <Info size={18} className="text-blue-500 shrink-0 mt-0.5" />
                        <p className="text-[12px] font-medium text-blue-700 dark:text-blue-300 leading-relaxed">
                            By connecting Advertising, you allow Eva to read Campaign metadata, Report data (Clicks, Sales, RoAS), and manage Bids via Amazon Advertising API.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between py-3 border-b border-slate-50 dark:border-slate-800">
                            <span className="text-[13px] font-bold text-slate-700 dark:text-slate-300">Read Advertising Performance</span>
                            <Check size={18} className="text-emerald-500" />
                        </div>
                        <div className="flex items-center justify-between py-3 border-b border-slate-50 dark:border-slate-800">
                            <span className="text-[13px] font-bold text-slate-700 dark:text-slate-300">Campaign Management Permissions</span>
                            <Check size={18} className="text-emerald-500" />
                        </div>
                        <div className="flex items-center justify-between py-3 border-b border-slate-50 dark:border-slate-800">
                            <span className="text-[13px] font-bold text-slate-700 dark:text-slate-300">Inventory Sync for Ads</span>
                            <Check size={18} className="text-emerald-500" />
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button onClick={prevStep} className="flex-1 py-4 bg-slate-100 text-slate-600 font-black rounded-xl transition-all hover:bg-slate-200">Back</button>
                        <button onClick={() => setIsAdAuthing(true)} className="flex-[2] py-4 bg-[#0084FF] text-white font-black rounded-xl shadow-lg shadow-blue-500/20 active:scale-95 transition-all">Allow Access</button>
                    </div>
                </div>
            </div>
        );
    };

    const renderStep6Profile = () => (
        <div className="flex flex-col gap-10 animate-in slide-in-from-right-8 duration-500">
            <div className="space-y-2 text-center">
                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Sync Profiles</h2>
                <p className="text-slate-500 font-medium">Select the specific store profiles you want to import.</p>
            </div>

            <div className="space-y-3">
                <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Profiles found in your account</label>
                <div className="flex flex-col gap-3">
                    {[
                        { id: 'acme_us', name: 'Acme Store - Amazon.com', region: 'North America', channel: 'US' },
                        { id: 'acme_ca', name: 'Acme Store - Amazon.ca', region: 'North America', channel: 'CA' },
                        { id: 'acme_mx', name: 'Acme Store - Amazon.mx', region: 'North America', channel: 'MX' }
                    ].map(p => (
                        <div 
                            key={p.id}
                            onClick={() => {
                                setSelectedProfiles(prev => prev.includes(p.id) ? prev.filter(id => id !== p.id) : [...prev, p.id]);
                            }}
                            className={cn(
                                "p-6 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all duration-300",
                                selectedProfiles.includes(p.id)
                                    ? "bg-blue-50/50 border-blue-600 shadow-md dark:bg-blue-900/10" 
                                    : "bg-white border-slate-100 hover:border-blue-200 dark:bg-slate-900 dark:border-slate-800"
                            )}
                        >
                            <div className="flex items-center gap-4">
                                <div className={cn(
                                    "w-10 h-10 rounded-xl flex items-center justify-center",
                                    selectedProfiles.includes(p.id) ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                                )}>
                                    <Store size={20} />
                                </div>
                                <div className="space-y-0.5 text-left">
                                    <h4 className="text-sm font-black text-slate-900 dark:text-white">{p.name}</h4>
                                    <div className="flex items-center gap-2">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{p.region}</p>
                                        <div className="w-1 h-1 rounded-full bg-slate-300" />
                                        <p className="text-[10px] font-black text-blue-500">{p.channel}</p>
                                    </div>
                                </div>
                            </div>
                            <div className={cn(
                                "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all",
                                selectedProfiles.includes(p.id) ? "bg-blue-600 border-blue-600 text-white" : "border-slate-200 dark:border-slate-700"
                            )}>
                                {selectedProfiles.includes(p.id) && <Check size={14} strokeWidth={4} />}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex gap-4 mt-6">
                <button onClick={prevStep} className="flex-1 py-5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-black rounded-2xl transition-all active:scale-95">Back</button>
                <button 
                    disabled={selectedProfiles.length === 0}
                    onClick={nextStep} 
                    className="flex-[2] py-5 bg-[#0084FF] hover:bg-[#0076E5] text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 transition-all active:scale-95 disabled:opacity-50"
                >
                    Connect Selected Profiles
                </button>
            </div>
        </div>
    );

    const renderStep7Success = () => (
        <div className="flex flex-col items-center justify-center gap-10 py-10 animate-in zoom-in-95 duration-700">
            <div className="relative">
                <div className="w-40 h-40 bg-gradient-to-tr from-emerald-400 to-emerald-600 rounded-[48px] flex items-center justify-center text-white shadow-2xl shadow-emerald-500/30 rotate-12 transition-transform hover:rotate-0 duration-500">
                    <Check size={80} strokeWidth={4} />
                </div>
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg animate-bounce">
                    <BadgeCheck size={24} />
                </div>
            </div>

            <div className="text-center space-y-4">
                <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">Well done!</h2>
                <p className="text-xl text-slate-500 font-medium max-w-sm mx-auto leading-relaxed">
                    Your Amazon Vendor account is fully synchronized and ready for optimization.
                </p>
            </div>

            <div className="flex flex-col gap-4 w-full max-w-sm mt-4">
                <div className="flex gap-3 w-full">
                    <button 
                        onClick={onComplete}
                        className="flex-1 flex items-center justify-center gap-2 py-5 bg-slate-900 hover:bg-black text-white font-black rounded-2xl shadow-xl transition-all hover:scale-[1.02] active:scale-95 group"
                    >
                        <span className="text-sm">Go to Eva Help</span>
                        <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                    <button 
                        onClick={() => { 
                            const type = model?.charAt(0).toUpperCase() + (model?.slice(1) || '') as 'Seller' | 'Vendor';
                            if (onNavigateAnalytics) onNavigateAnalytics(type); else onComplete(); 
                        }}
                        className="flex-1 flex items-center justify-center gap-2 py-5 bg-[#0084FF] hover:bg-[#0076E5] text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-95 group"
                    >
                        <span className="text-sm">Go to Analytics</span>
                        <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                </div>
                <button 
                    onClick={() => {
                        setStepHistory([]);
                        setStep(1);
                        setDisplayName('');
                        setRegion(null);
                    }}
                    className="w-full py-5 bg-white border-2 border-slate-100 dark:bg-slate-900 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-black rounded-3xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                >
                    Connect Another Account
                </button>
            </div>

            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-4">
                Integration ID: #EB-{Math.floor(Math.random() * 900000 + 100000)}
            </p>
        </div>
    );

    return (
        <div className="w-full max-w-4xl mx-auto p-12 bg-white dark:bg-slate-950 rounded-[48px] border border-slate-200 dark:border-slate-800 shadow-2xl relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-blue-600 to-indigo-600"></div>
            
            <div className="relative z-10">
                {renderProgressBar()}

                {step === 0 && renderModelSelection()}
                {step === 1 && renderStep1Identify()}
                {step === 2 && renderStep2Regional()}
                {step === 3 && renderStep3Auth()}
                {step === 4 && renderStep4AdAccount()}
                {step === 5 && renderStep5AdPerm()}
                {step === 6 && renderStep6Profile()}
                {step === 7 && renderStep7Success()}
            </div>
        </div>
    );
};

const ChevronDown = ({ className, size }: { className?: string, size?: number }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size || 24} 
        height={size || 24} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <path d="m6 9 6 6 6-6"/>
    </svg>
);

const Map = ({ className, size }: { className?: string, size?: number }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size || 24} 
        height={size || 24} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"/>
        <path d="M15 5.764v15"/>
        <path d="M9 3.236v15"/>
    </svg>
);

const Compass = ({ className, size }: { className?: string, size?: number }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size || 24} 
        height={size || 24} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <circle cx="12" cy="12" r="10"/>
        <path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36z"/>
    </svg>
);
