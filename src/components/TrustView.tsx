import { motion } from 'motion/react';
import { Lock, Eye, CheckCircle, ArrowDown } from 'lucide-react';

interface TrustViewProps {
  setMainTab: (tab: 'philosophy' | 'solutions' | 'trust' | 'integrations' | 'about' | 'simulator') => void;
  setActiveTab: (tab: 'profile' | 'evolution' | 'integrations' | 'vault' | 'booking' | 'variables') => void;
  secretKey: string;
}

export default function TrustView({ setMainTab, setActiveTab, secretKey }: TrustViewProps) {
  const scrollToFramework = () => {
    const el = document.getElementById('trust-framework-details');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const privacyPrinciples = [
    'End-to-end protection for sensitive conversations and personal information',
    'User-controlled memory with the ability to review, edit, or delete stored information',
    'Transparent data practices with clear permission controls',
    'Secure authentication and account protection',
    'Privacy-first architecture designed to minimize unnecessary data collection'
  ];

  const attentionPrinciples = [
    'Intelligent reminders only when requested or explicitly enabled',
    'Focus modes that reduce interruptions during work or study',
    'Adaptive communication based on your personal preferences',
    'Calm, intentional interactions instead of attention-driven engagement'
  ];

  return (
    <motion.div
      key="trust-view"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 space-y-20"
      id="trust-section"
    >
      {/* Hero Header Block */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-b border-[#E3DFD5] pb-16">
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-3">
            <p className="font-mono text-xs tracking-[0.2em] text-[#75736D] uppercase font-bold">
              03 / Trust Framework
            </p>
            <h1 className="text-4xl md:text-5xl font-serif text-[#1C1C1C] leading-[1.1] font-normal tracking-tight">
              Trust Built Into<br />
              <span className="italic font-serif">Every Decision.</span>
            </h1>
          </div>
          <p className="text-xl font-medium text-[#1C1C1C] font-sans leading-relaxed">
            Privacy is not a feature added later—it's the foundation of everything we build.
          </p>
          <p className="text-[#605F5A] font-sans text-sm md:text-base leading-relaxed max-w-xl">
            Every Nara system is designed around a simple principle: your intelligence belongs to you. From the first conversation to years of accumulated memories, your data remains under your control and is handled with transparency, security, and respect.
          </p>
          <div className="pt-4">
            <button
              onClick={scrollToFramework}
              className="px-6 py-3.5 bg-[#1C1C1C] hover:bg-[#5A5A40] text-white font-mono text-xs tracking-wider transition-all duration-300 uppercase font-bold flex items-center gap-2 cursor-pointer shadow-sm rounded active:scale-95"
            >
              <span>Explore the Trust Framework</span>
              <ArrowDown size={14} className="animate-bounce" />
            </button>
          </div>
        </div>

        {/* Live Security Shield Block */}
        <div className="lg:col-span-6 bg-white border border-[#E3DFD5] rounded-xl p-8 md:p-10 flex flex-col justify-between space-y-8 shadow-sm">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono tracking-widest text-[#5A5A40] uppercase block font-bold">Security Verification</span>
              <span className="text-[10px] font-mono font-bold text-[#5A5A40] bg-[#5A5A40]/10 px-2 py-0.5 rounded border border-[#5A5A40]/20">ACTIVE PROTECTION</span>
            </div>
            <h3 className="text-2xl font-serif text-[#1C1C1C]">Cryptographic Safety Shield</h3>
            <p className="text-sm text-[#605F5A] leading-relaxed">
              Our active system includes an operational secure vault designed to store and protect your custom prompts, API configurations, and context keys.
            </p>
          </div>
          <div className="p-5 bg-[#FAF9F5] rounded-lg border border-[#E3DFD5] space-y-3">
            <div className="flex items-center justify-between border-b border-[#E3DFD5]/60 pb-2">
              <span className="text-[10px] font-mono text-[#605F5A]">SECURE KEY ENDPOINT</span>
              <span className="text-[10px] font-mono font-bold text-[#5A5A40]">AUTHENTICATED</span>
            </div>
            <p className="text-xs font-mono text-[#75736D] overflow-hidden text-ellipsis whitespace-nowrap">
              SYSTEM VAULT KEY: <span className="text-[#1C1C1C] font-semibold">{secretKey ? `${secretKey.slice(0, 12)}...` : 'NARA-SECURE-KEY-2026'}</span>
            </p>
          </div>
          <button
            onClick={() => {
              setMainTab('simulator');
              setActiveTab('vault');
            }}
            className="w-full py-3.5 border border-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-white text-[#1C1C1C] text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 rounded cursor-pointer text-center"
          >
            Access Security Vault &rarr;
          </button>
        </div>
      </div>

      {/* Immersive Trust Banner Image */}
      <div className="w-full border border-[#E3DFD5] bg-white p-2.5 rounded-2xl shadow-sm">
        <div className="relative h-64 md:h-96 rounded-xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1200"
            alt="Secure decentralized neural matrix representing trusted, zero-knowledge artificial intelligence"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/40 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
            <span className="font-mono text-[9px] md:text-xs tracking-widest text-[#C5A880] uppercase block font-bold">CORE TRUST METRIC</span>
            <h4 className="text-white text-lg md:text-xl font-serif font-light mt-1">Zero-Knowledge Encrypted Secure Compartment</h4>
          </div>
        </div>
      </div>

      {/* Target anchor */}
      <div id="trust-framework-details" className="pt-8 space-y-16">
        
        {/* Dimension Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Dimension A */}
          <div className="bg-white border border-[#E3DFD5] rounded-xl p-8 md:p-10 space-y-8 relative overflow-hidden group hover:border-[#5A5A40]/50 transition-all">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#5A5A40]/5 rounded-bl-full flex items-center justify-center">
              <Lock size={20} className="text-[#5A5A40] translate-x-2 -translate-y-2" />
            </div>
            <div className="space-y-4">
              <span className="text-[10px] font-mono tracking-widest text-[#75736D] uppercase block font-bold">
                Dimension A
              </span>
              <h2 className="text-2xl md:text-3xl font-serif text-[#1C1C1C] font-normal">
                Your Data. Your Control.
              </h2>
              <blockquote className="border-l-2 border-[#C5A880] pl-4 italic text-sm text-[#1C1C1C]">
                "Your conversations, documents, memories, and preferences are never treated as products."
              </blockquote>
              <p className="text-xs md:text-sm text-[#605F5A] leading-relaxed">
                Nara stores and processes your information securely so your personal AI can serve you while giving you clear control over what is stored, shared, or permanently deleted.
              </p>
            </div>

            <div className="space-y-4 border-t border-[#E3DFD5] pt-6">
              <span className="text-[10px] font-mono tracking-wider text-[#1C1C1C] uppercase block font-bold">
                Privacy Principles
              </span>
              <ul className="space-y-3">
                {privacyPrinciples.map((principle, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle size={14} className="text-[#5A5A40] mt-0.5 shrink-0" />
                    <span className="text-xs text-[#605F5A] leading-relaxed font-sans">{principle}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Dimension B */}
          <div className="bg-white border border-[#E3DFD5] rounded-xl p-8 md:p-10 space-y-8 relative overflow-hidden group hover:border-[#5A5A40]/50 transition-all">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#C5A880]/5 rounded-bl-full flex items-center justify-center">
              <Eye size={20} className="text-[#C5A880] translate-x-2 -translate-y-2" />
            </div>
            <div className="space-y-4">
              <span className="text-[10px] font-mono tracking-widest text-[#75736D] uppercase block font-bold">
                Dimension B
              </span>
              <h2 className="text-2xl md:text-3xl font-serif text-[#1C1C1C] font-normal">
                AI That Respects Your Attention
              </h2>
              <blockquote className="border-l-2 border-[#C5A880] pl-4 italic text-sm text-[#1C1C1C]">
                "The most helpful AI isn't the loudest one."
              </blockquote>
              <p className="text-xs md:text-sm text-[#605F5A] leading-relaxed">
                Nara is designed to support your life without constantly demanding it. Your companion is available whenever you need it while respecting your focus, routines, and moments of uninterrupted work.
              </p>
            </div>

            <div className="space-y-4 border-t border-[#E3DFD5] pt-6">
              <span className="text-[10px] font-mono tracking-wider text-[#1C1C1C] uppercase block font-bold">
                Designed for Healthy Interaction
              </span>
              <ul className="space-y-3">
                {attentionPrinciples.map((principle, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle size={14} className="text-[#C5A880] mt-0.5 shrink-0" />
                    <span className="text-xs text-[#605F5A] leading-relaxed font-sans">{principle}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Protocol Structure & Security by Design */}
        <div className="border border-[#E3DFD5] rounded-xl bg-[#FAF9F5] p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-[#75736D] uppercase block font-bold">Protocol Structure</span>
            <h3 className="text-2xl md:text-3xl font-serif text-[#1C1C1C]">Security by Design</h3>
          </div>
          <div className="lg:col-span-8 space-y-4 text-xs md:text-sm text-[#605F5A] leading-relaxed font-sans">
            <p>
              Every layer of Nara is built with security in mind—from authentication and encrypted communication to responsible AI development and ongoing monitoring.
            </p>
            <p>
              As Nara grows, we are committed to meeting internationally recognized security and privacy standards while continuously improving our systems through independent testing and regular security reviews.
            </p>
          </div>
        </div>

        {/* Our Pledge & Commitment Block */}
        <div className="bg-[#1C1C1C] text-white rounded-xl p-8 md:p-12 max-w-4xl mx-auto space-y-8 border border-white/10 shadow-lg text-center relative">
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#C5A880] uppercase block font-bold">Our Pledge</span>
            <h3 className="text-3xl font-serif text-white font-normal">Our Commitment</h3>
          </div>
          
          <blockquote className="text-xl md:text-2xl font-serif italic text-gray-200 leading-relaxed max-w-2xl mx-auto">
            "We believe trust is earned through transparency—not promises."
          </blockquote>

          <p className="text-sm text-gray-400 font-sans max-w-xl mx-auto leading-relaxed">
            Your AI should work for you, protect your information, and always leave you in control.
          </p>

          <div className="border-t border-white/10 pt-6 max-w-xs mx-auto space-y-1">
            <p className="font-mono text-[10px] text-[#C5A880] tracking-widest font-bold">NARA TRUST TEAM</p>
            <p className="font-mono text-[9px] text-gray-500 tracking-wider">SECURE & EMBARGOED</p>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

