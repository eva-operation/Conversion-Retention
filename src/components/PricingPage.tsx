import React, { useState } from 'react';
import { 
  Zap, BarChart3, Users, 
  CheckCircle2, MessageSquare, 
  ArrowRight, Sparkles, Layout,
  Database, RefreshCcw, HeartPulse, Palette, X
} from 'lucide-react';
import { cn } from '../lib/utils';

interface PricingPageProps {
  onClose?: () => void;
}

const ACCEL_TIERS = [
  { label: "Up to $10K", max: 10000, rate: 0.02 },
  { label: "$10K – $50K", max: 50000, rate: 0.015 },
  { label: "$50K – $100K", max: 100000, rate: 0.01 },
];

export const PricingPage: React.FC<PricingPageProps> = ({ onClose }) => {
  const [adSpend, setAdSpend] = useState(15000);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const annualDiscount = 0.8; // 20% off

  const calcAccelFee = (spend: number) => {
    let fee = 0, remaining = spend, prev = 0;
    for (const t of ACCEL_TIERS) {
      if (remaining <= 0) break;
      const size = t.max - prev;
      fee += Math.min(remaining, size) * t.rate;
      remaining -= size;
      prev = t.max;
    }
    return fee;
  };

  const calcManagedPrice = (spend: number) => {
    if (spend <= 30000) return 749;
    if (spend <= 100000) return 1499;
    return 1499 + (spend - 100000) * 0.01;
  };

  const formatPrice = (price: number) => {
    const finalPrice = billingCycle === 'annual' ? Math.round(price * annualDiscount) : price;
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(finalPrice);
  };

  const spendPct = ((adSpend - 1000) / (250000 - 1000)) * 100;

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#E8E6E1] font-sans selection:bg-[#6C5CE7]/30 pb-12">
      {/* Background Orbs */}
      <div className="fixed top-[-200px] left-[-200px] w-[600px] h-[600px] rounded-full bg-[#6C5CE7]/10 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-100px] right-[-150px] w-[500px] h-[500px] rounded-full bg-[#6C5CE7]/05 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 py-8 relative z-10">
        {/* Header - More Compact */}
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#6C5CE7] flex items-center justify-center">
              <Zap size={20} className="text-white fill-white" />
            </div>
            <span className="text-lg font-black tracking-tight uppercase">Eva Commerce</span>
          </div>
          <div className="flex items-center gap-6">
             {/* Billing Toggle - Compact */}
            <div className="flex items-center bg-white/5 border border-white/10 rounded-full p-1">
               <button 
                  onClick={() => setBillingCycle('monthly')}
                  className={cn("px-4 py-1.5 rounded-full text-[11px] font-black transition-all", billingCycle === 'monthly' ? "bg-[#6C5CE7] text-white" : "text-white/40 hover:text-white")}
               >
                  MONTHLY
               </button>
               <button 
                  onClick={() => setBillingCycle('annual')}
                  className={cn("px-4 py-1.5 rounded-full text-[11px] font-black transition-all flex items-center gap-1.5", billingCycle === 'annual' ? "bg-[#6C5CE7] text-white" : "text-white/40 hover:text-white")}
               >
                  ANNUAL
                  <span className="text-[9px] bg-[#00D68F] text-black px-1.5 py-0.5 rounded-full font-black">-20%</span>
               </button>
            </div>
            {onClose && (
                <button 
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-white/10 hover:bg-white/5 transition-colors text-white/40 hover:text-white"
                >
                    <X size={18} />
                </button>
            )}
          </div>
        </div>

        {/* Hero & Slider - Combined & Condensed */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6C5CE7]/10 border border-[#6C5CE7]/20 text-[#A29BFE] text-[10px] font-black tracking-widest uppercase mb-4">
                    <Sparkles size={12} />
                    Transparent pricing
                </div>
                <h1 className="text-4xl font-black tracking-tighter mb-4 leading-none">
                    Choose your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C5CE7] to-[#A29BFE]">growth plan</span>
                </h1>
                <p className="text-sm text-white/40 max-w-md leading-relaxed">
                    Automated insights to world-class management. Scale with precision.
                </p>
            </div>
            
            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Monthly Ad Spend</span>
                    <span className="text-xl font-black text-[#A29BFE] font-mono">
                        ${(adSpend / 1000).toFixed(0)}K<span className="text-xs opacity-50">/mo</span>
                    </span>
                </div>
                <div className="relative pt-2 pb-6">
                    <div className="h-1 w-full bg-white/5 rounded-full absolute" />
                    <div 
                    className="h-1 bg-gradient-to-r from-[#6C5CE7] to-[#A29BFE] rounded-full absolute" 
                    style={{ width: `${spendPct}%` }}
                    />
                    <input 
                    type="range" 
                    min={1000} 
                    max={250000} 
                    step={1000} 
                    value={adSpend} 
                    onChange={(e) => setAdSpend(parseInt(e.target.value))}
                    className="w-full h-1 opacity-0 cursor-pointer relative z-10"
                    />
                    <div 
                    className="absolute top-[4px] w-4 h-4 bg-white rounded-full shadow-[0_0_15px_rgba(108,92,231,0.5)] border-2 border-[#6C5CE7] pointer-events-none"
                    style={{ left: `calc(${spendPct}% - 8px)` }}
                    />
                </div>
                <div className="flex justify-between text-[9px] uppercase font-black tracking-widest text-white/20">
                    <span>$1K</span>
                    <span>$50K</span>
                    <span>$100K</span>
                    <span>$250K+</span>
                </div>
            </div>
        </div>

        {/* Primary Plans Grid - More Tighter */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          <MainPlanCard 
            title="Insights"
            icon={<BarChart3 size={18} />}
            desc="Full visibility, real-time analytics & reporting."
            price={formatPrice(79)}
            sub="Flat rate, no spend fees."
            features={["Real-time P&L analytics", "Multi-marketplace", "Smart alerts", "Auto dashboards"]}
            btn="Buy Now"
          />

          <MainPlanCard 
            title="Accelerate"
            icon={<Zap size={18} className="fill-white" />}
            desc="Smarter ads with bid & campaign automation."
            price={formatPrice(149 + calcAccelFee(adSpend))}
            sub="$149 base + tiered ad spend fee"
            features={["Everything in Insights", "PPC Automation Suite", "Bid & Day-parting Rules", "Strategy Sessions"]}
            btn="Select Plan"
            highlighted
          />

          <MainPlanCard 
            title="Managed"
            icon={<Users size={18} />}
            desc="A dedicated expert manages your growth."
            price={formatPrice(calcManagedPrice(adSpend))}
            sub="Custom pricing based on spend"
            features={["Account Specialist", "Channel Management", "Weekly Performance Calls", "Custom Strategy"]}
            btn="Contact Sales"
          />
        </div>

        {/* specialized services Row - Very Compact */}
        <div className="mb-16">
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-6 text-center">Specialized Services</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <ServiceMiniCard 
                    title="FBA Reimbursements"
                    price="15% Fee"
                    icon={<RefreshCcw size={16} />}
                />
                <ServiceMiniCard 
                    title="Vendor Recovery"
                    price="20% Fee"
                    icon={<Database size={16} />}
                />
                <ServiceMiniCard 
                    title="Creative Design"
                    price="from $75"
                    icon={<Palette size={16} />}
                />
                <ServiceMiniCard 
                    title="Account Health"
                    price="$750/mo"
                    icon={<HeartPulse size={16} />}
                />
            </div>
        </div>

        {/* Full Service - Compact Overlay style */}
        <div className="bg-gradient-to-r from-[#6C5CE7]/10 to-transparent border border-[#6C5CE7]/20 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#6C5CE7]/20 flex items-center justify-center border border-[#6C5CE7]/30">
                    <Layout size={24} className="text-[#6C5CE7]" />
                </div>
                <div>
                    <h3 className="text-lg font-black tracking-tight">Full Service Management</h3>
                    <p className="text-xs text-white/40">Omnichannel strategy, fulfillment & creative studio.</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#6C5CE7]">Tailored Quote</span>
                <button 
                  onClick={() => window.location.href = "mailto:sales@eva.guru"}
                  className="px-6 py-3 rounded-xl bg-white text-black font-black text-xs flex items-center gap-2 hover:bg-[#6C5CE7] hover:text-white transition-all"
                >
                  LET'S TALK
                  <MessageSquare size={14} />
                </button>
            </div>
        </div>

      </div>
    </div>
  );
};

const MainPlanCard = ({ title, icon, desc, price, sub, features, btn, highlighted = false }: any) => (
  <div className={cn(
    "flex flex-col rounded-3xl p-6 transition-all duration-300",
    highlighted 
        ? "bg-[#6C5CE7]/10 border border-[#6C5CE7]/30 shadow-[0_20px_40px_rgba(108,92,231,0.1)] scale-105 z-20" 
        : "bg-white/5 border border-white/10 hover:border-white/20"
  )}>
    <div className="flex items-center gap-3 mb-4">
      <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", highlighted ? "bg-[#6C5CE7]" : "bg-white/5")}>
        {icon}
      </div>
      <h3 className="text-lg font-black tracking-tight">{title}</h3>
    </div>
    <p className="text-[11px] text-white/40 mb-6 leading-relaxed flex-1">{desc}</p>
    <div className="mb-6">
      <div className="flex items-baseline gap-1">
        <span className={cn("text-3xl font-black font-mono tracking-tighter", highlighted && "text-[#A29BFE]")}>{price}</span>
        <span className="text-[10px] text-white/20">/mo</span>
      </div>
      <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest mt-1">{sub}</p>
    </div>
    <button className={cn(
      "w-full py-3 rounded-xl font-black text-xs mb-6 transition-all",
      highlighted ? "bg-[#6C5CE7] text-white shadow-lg" : "bg-white/10 text-white hover:bg-white/20"
    )}>
      {btn}
    </button>
    <div className="space-y-3">
      {features.map((f: string, i: number) => (
        <div key={i} className="flex items-center gap-2">
          <CheckCircle2 size={12} className={highlighted ? "text-[#6C5CE7]" : "text-white/20"} />
          <span className={cn("text-[10px] tracking-tight", highlighted ? "text-white/80" : "text-white/40")}>{f}</span>
        </div>
      ))}
    </div>
  </div>
);

const ServiceMiniCard = ({ title, price, icon }: any) => (
    <div className="group bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4 hover:border-[#6C5CE7]/30 hover:bg-white/[0.08] transition-all cursor-pointer">
        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:text-[#6C5CE7] group-hover:bg-[#6C5CE7]/10 transition-all">
            {icon}
        </div>
        <div className="min-w-0">
            <h4 className="text-[10px] font-black uppercase tracking-wider text-white/60 mb-0.5 truncate">{title}</h4>
            <div className="flex items-center gap-2">
                <span className="text-[13px] font-black font-mono">{price}</span>
                <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-[#6C5CE7]" />
            </div>
        </div>
    </div>
);
