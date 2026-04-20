import React from 'react';
import { HelpCircle, ExternalLink, ArrowUpRight, Lock } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './Tooltip';

interface HelpLinkProps {
  href?: string;
  internalHref?: string;
  text?: string;
  side?: "top" | "right" | "bottom" | "left";
  additionalContent?: React.ReactNode;
  showInternal?: boolean;
}

export const HelpLink = ({ 
  href = "https://help.eva.guru/", 
  internalHref = "https://wiki.eva.guru/",
  text = "Have questions? Our Help Center has you covered.",
  side = "right",
  additionalContent,
  showInternal = false
}: HelpLinkProps) => (
    <TooltipProvider delayDuration={0}>
        <Tooltip>
            <TooltipTrigger asChild>
                <a 
                    href={href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center p-1.5 rounded-full text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all active:scale-95 shadow-sm relative -top-0.5"
                >
                    <div className="relative w-3.5 h-3.5 flex items-center justify-center">
                        <HelpCircle 
                            size={14} 
                            className="absolute inset-0 transition-all duration-300 group-hover:opacity-0 group-hover:scale-50 group-hover:rotate-12" 
                        />
                        <ExternalLink 
                            size={14} 
                            strokeWidth={2.5}
                            className="absolute inset-0 transition-all duration-300 opacity-0 scale-50 -rotate-12 group-hover:opacity-100 group-hover:scale-100 group-hover:rotate-0 text-blue-500" 
                        />
                    </div>
                </a>
            </TooltipTrigger>
            <TooltipContent 
                side={side} 
                className="bg-[#0f172a] text-white border-slate-800 text-[10px] py-4 px-5 rounded-xl shadow-2xl z-[9999] max-w-[280px] leading-relaxed [&>svg]:fill-[#0f172a]"
            >
                <div className="space-y-4">
                    {/* Public Section */}
                    <div className="flex flex-col gap-2">
                        <a 
                            href={href} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors w-fit"
                        >
                            <ExternalLink size={12} strokeWidth={3} />
                            <span className="uppercase tracking-widest text-[9px] font-black">Help Center</span>
                        </a>
                        <div className="text-[12px] font-medium text-slate-100 leading-tight">
                            Have questions? Our Help Center has you covered.
                        </div>
                    </div>

                    {showInternal && (
                        <>
                            <div className="h-px bg-slate-800/50" />

                            {/* Internal Section */}
                            <div className="flex flex-col gap-2">
                                <a 
                                    href={internalHref} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="flex items-center gap-2 text-amber-500 hover:text-amber-400 transition-colors w-fit"
                                >
                                    <ExternalLink size={12} strokeWidth={3} />
                                    <span className="uppercase tracking-widest text-[9px] font-black">Help Center Internal</span>
                                </a>
                                <div className="text-[12px] text-slate-400 font-medium leading-normal">
                                    You can also visit Internal Help Page for this page
                                </div>
                            </div>
                        </>
                    )}

                    {additionalContent && (
                        <div className="mt-2 pt-2 border-t border-slate-800">
                            {additionalContent}
                        </div>
                    )}
                </div>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
);
