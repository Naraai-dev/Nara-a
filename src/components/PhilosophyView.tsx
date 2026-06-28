import { motion } from 'motion/react';

interface PhilosophyViewProps {
  setMainTab: (tab: 'philosophy' | 'solutions' | 'trust' | 'integrations' | 'about' | 'simulator') => void;
}

export default function PhilosophyView({ setMainTab }: PhilosophyViewProps) {
  return (
    <motion.div
      key="philosophy-view"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24"
      id="philosophy-section"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        
        {/* Left Column (Span 5) */}
        <div className="lg:col-span-5 space-y-12">
          <div className="space-y-4">
            <p className="font-mono text-xs tracking-[0.2em] text-[#75736D] uppercase font-bold" id="philosophy-index">
              01 / Our Philosophy
            </p>
            <h1 className="text-4xl md:text-[54px] font-serif text-[#1C1C1C] leading-[1.1] font-normal tracking-tight" id="philosophy-hero-title">
              Intelligence<br />
              Designed Around<br />
              <span className="italic font-serif">People.</span>
            </h1>
          </div>

          <div className="space-y-4">
            <p className="font-mono text-[10px] tracking-[0.15em] text-[#75736D] uppercase font-bold">
              Core Alignment
            </p>
            <div className="p-6 border border-[#E3DFD5] bg-white text-[11px] font-mono leading-relaxed text-[#605F5A] tracking-wide" id="alignment-card">
              NARA ACTIVE MODULE — ALL SYSTEMS ENGAGED TO PROTECT INTELLECTUAL HARMONY & PRESERVE USER AGENCY.
            </div>
          </div>

          {/* Calming Minimalist Philosophy Image */}
          <div className="space-y-2 pt-4">
            <div className="border border-[#E3DFD5] bg-white p-2 rounded-xl overflow-hidden shadow-2xs">
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200"
                alt="Minimalist warm living space representing harmonious ambient technology"
                className="w-full h-64 object-cover rounded-lg"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="font-mono text-[9px] text-[#75736D] uppercase tracking-wider text-right">
              Fig 1.1 — Ambient Architectural Integration
            </p>
          </div>
        </div>

        {/* Right Column (Span 7) */}
        <div className="lg:col-span-7 space-y-10 pt-4">
          
          {/* Quote Block */}
          <div className="border-l-2 border-[#1C1C1C] pl-6 py-1">
            <p className="text-2xl md:text-[28px] font-serif text-[#1C1C1C] font-light leading-relaxed">
              We believe artificial intelligence should adapt to people—not the other way around.
            </p>
          </div>

          {/* Story Body */}
          <div className="space-y-6 text-[#605F5A] font-sans text-sm md:text-[15px] leading-relaxed max-w-2xl">
            <p>
              Every person thinks differently, learns differently, and pursues different goals. Yet most AI products are built to serve everyone in the same way.
            </p>
            <p className="font-serif italic text-base md:text-lg text-[#1C1C1C] my-2">
              Nara takes a different approach.
            </p>
            <p>
              Every Nara begins with understanding the individual behind the account. Through a guided onboarding experience, it learns your goals, communication style, preferences, and routines to create an AI that feels uniquely yours.
            </p>
          </div>

          <hr className="border-t border-[#E3DFD5] w-full" />

          {/* Privacy Callout & Mission Statement */}
          <div className="space-y-8 max-w-2xl">
            <p className="font-sans text-[#1C1C1C] font-semibold text-base md:text-[17px] leading-relaxed">
              Your data belongs to you. Your intelligence remains under your control. Personalization should never come at the cost of privacy.
            </p>
            
            <p className="text-[#1C1C1C] font-mono text-[11px] md:text-xs tracking-wider leading-relaxed font-bold uppercase">
              OUR MISSION IS TO BUILD AI THAT GROWS WITH PEOPLE THROUGHOUT THEIR LIVES—NOT SIMPLY RESPOND TO PROMPTS.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={() => setMainTab('solutions')}
              className="bg-[#1C1C1C] hover:bg-[#2D2C27] text-white px-6 py-4 font-mono text-xs tracking-wider uppercase flex items-center gap-2 font-semibold transition-all duration-300 active:scale-95 cursor-pointer"
            >
              <span>Explore Solution Dimensions</span>
              <span>&rarr;</span>
            </button>
            <button
              onClick={() => setMainTab('simulator')}
              className="bg-white border border-[#1C1C1C] hover:bg-[#F2EFE8]/40 text-[#1C1C1C] px-8 py-4 font-mono text-xs tracking-wider uppercase font-semibold transition-all duration-300 active:scale-95 cursor-pointer"
            >
              Skip to Simulator
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
