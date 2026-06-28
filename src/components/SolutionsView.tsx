import { motion } from 'motion/react';
import { Sparkles, Users, Building, ArrowRight, Check } from 'lucide-react';

interface SolutionsViewProps {
  setMainTab: (tab: 'philosophy' | 'solutions' | 'trust' | 'integrations' | 'about' | 'simulator') => void;
  setActiveTab: (tab: 'profile' | 'evolution' | 'integrations' | 'vault' | 'booking' | 'variables') => void;
  setCompanionType?: (type: string) => void;
}

export default function SolutionsView({ setMainTab, setActiveTab, setCompanionType }: SolutionsViewProps) {
  const SOLUTIONS_LIST = [
    {
      id: 'personal',
      num: 'Solution 01',
      title: 'Personal AI Companion',
      quote: 'A lifelong intelligence designed to understand you, support your ambitions, and grow alongside you.',
      desc: 'Every person has unique goals, routines, and ways of thinking. Nara creates a personalized AI companion that learns from your preferences, adapts to your communication style, and becomes a trusted partner throughout your journey.',
      extra: "Whether you're learning a new skill, building a business, managing your daily life, or simply looking for thoughtful conversations, your Nara companion evolves with you over time.",
      icon: <Sparkles className="text-[#C5A880]" size={24} />,
      imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600",
      btnLabel: 'Configure Personal Companion',
      mappedRole: 'Personal Coach',
      capabilities: [
        'Personalized conversations with long-term memory and contextual understanding',
        'Daily planning, focus coaching, and intelligent reminders',
        'Learning support tailored to your pace, interests, and goals',
        'Thoughtful brainstorming, writing assistance, and decision support',
        'Journaling, reflection, and habit-building for long-term personal growth'
      ]
    },
    {
      id: 'family',
      num: 'Solution 02',
      title: 'Family AI System',
      quote: 'Shared intelligence that keeps families connected, organized, and protected.',
      desc: "Families thrive when communication is simple, responsibilities are shared, and everyone feels supported. Nara's Family AI System helps coordinate daily life while respecting every family member's privacy and independence.",
      extra: 'Designed for parents, children, and elders, it provides a secure digital environment that encourages collaboration without unnecessary complexity or intrusive monitoring.',
      icon: <Users className="text-[#5A5A40]" size={24} />,
      imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600",
      btnLabel: 'Design Family System',
      mappedRole: 'Creative Partner',
      capabilities: [
        'Shared calendars, schedules, reminders, and family planning',
        'Age-appropriate learning support for children',
        'Fair task management and household coordination',
        'Secure communication with privacy-first family controls',
        'Intelligent assistance for caregiving, routines, and important family moments'
      ]
    },
    {
      id: 'org',
      num: 'Solution 03',
      title: 'Organizational AI',
      quote: 'Intelligence that strengthens teams, preserves knowledge, and empowers better decisions.',
      desc: 'Organizations succeed when knowledge is easy to access, collaboration is seamless, and every employee can focus on meaningful work. Nara develops secure AI systems that integrate into your organization to support productivity while protecting institutional knowledge.',
      extra: 'Rather than replacing people, Nara helps every team member work with greater clarity, confidence, and efficiency.',
      icon: <Building className="text-[#75736D]" size={24} />,
      imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600",
      btnLabel: 'Architect Organizational AI',
      mappedRole: 'Executive Assistant',
      capabilities: [
        'Intelligent knowledge search across documents, policies, and internal resources',
        'AI-powered onboarding and personalized employee guidance',
        'Workflow automation for repetitive administrative tasks',
        'Secure collaboration with enterprise-grade privacy and access controls',
        'Leadership insights, team analytics, and organizational knowledge preservation'
      ]
    }
  ];

  const handleConfigure = (mappedRole: string) => {
    if (setCompanionType) {
      setCompanionType(mappedRole);
    }
    setMainTab('simulator');
    setActiveTab('profile');
  };

  return (
    <motion.div
      key="solutions-view"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 space-y-20"
      id="solutions-section"
    >
      {/* Page Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-[#E3DFD5] pb-12">
        <div className="lg:col-span-5 space-y-4">
          <p className="font-mono text-xs tracking-[0.2em] text-[#75736D] uppercase font-bold" id="solutions-index">
            02 / Bespoke Solutions
          </p>
          <h1 className="text-4xl md:text-[54px] font-serif text-[#1C1C1C] leading-[1.1] font-normal tracking-tight" id="solutions-hero-title">
            Custom Solutions<br />
            <span className="italic font-serif">Portfolio.</span>
          </h1>
        </div>
        <div className="lg:col-span-7 lg:pt-8">
          <p className="text-lg md:text-xl text-[#605F5A] font-sans leading-relaxed max-w-2xl">
            Click a blueprint dimension below to inspect core features and pre-select your target model configuration inside the active simulator.
          </p>
        </div>
      </div>

      {/* Solutions Cards / Interactive Modules */}
      <div className="space-y-16">
        {SOLUTIONS_LIST.map((sol) => (
          <div
            key={sol.id}
            className="bg-white border border-[#E3DFD5] rounded-xl p-8 md:p-12 hover:shadow-lg transition-all duration-300 group relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
          >
            {/* Design accents */}
            <div className="absolute top-0 left-0 w-1 h-full bg-[#5A5A40]/40 group-hover:bg-[#5A5A40] transition-colors" />
            
            {/* Left Column: Summary */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#FAF9F5] border border-[#E3DFD5] rounded-lg">
                  {sol.icon}
                </div>
                <div>
                  <span className="font-mono text-xs tracking-widest text-[#75736D] uppercase font-bold block">{sol.num}</span>
                  <h3 className="text-2xl md:text-3xl font-serif text-[#1C1C1C] font-normal tracking-tight">{sol.title}</h3>
                </div>
              </div>

              <div className="border-l-2 border-[#C5A880] pl-4 py-1">
                <p className="text-[#1C1C1C] font-serif italic text-base leading-relaxed">
                  "{sol.quote}"
                </p>
              </div>

              <div className="space-y-4 text-sm text-[#605F5A] font-sans leading-relaxed">
                <p>{sol.desc}</p>
                {sol.extra && <p>{sol.extra}</p>}
              </div>

              <div className="pt-4">
                <button
                  onClick={() => handleConfigure(sol.title)}
                  className="px-6 py-3.5 bg-[#1C1C1C] text-white font-mono text-xs tracking-wider hover:bg-[#5A5A40] transition-all duration-300 uppercase font-bold flex items-center gap-2 cursor-pointer shadow-sm rounded active:scale-95"
                >
                  <span>{sol.btnLabel}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Right Column: Capabilities */}
            <div className="lg:col-span-6 bg-[#FAF9F5] border border-[#E3DFD5] rounded-lg overflow-hidden flex flex-col justify-between">
              {/* Image banner inside Right Column card */}
              <div className="h-44 overflow-hidden relative border-b border-[#E3DFD5]">
                <img
                  src={sol.imageUrl}
                  alt={sol.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>

              <div className="p-6 md:p-8 space-y-6 flex-1 flex flex-col justify-between">
                <div className="space-y-6">
                  <span className="font-mono text-[10px] tracking-widest text-[#75736D] uppercase block font-bold border-b border-[#E3DFD5] pb-2">
                    System Capabilities Blueprint
                  </span>
                  <ul className="space-y-4">
                    {sol.capabilities.map((cap, cIdx) => (
                      <li key={cIdx} className="flex items-start gap-3">
                        <div className="mt-1 bg-[#5A5A40]/10 text-[#5A5A40] p-0.5 rounded-full shrink-0">
                          <Check size={12} className="stroke-[3]" />
                        </div>
                        <span className="text-xs md:text-sm text-[#605F5A] leading-relaxed font-sans">{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-[#E3DFD5]/60 flex items-center justify-between text-[11px] font-mono text-[#75736D]">
                  <span>MODEL TARGET: {sol.title.toUpperCase()}</span>
                  <span className="font-bold text-[#5A5A40]">READY TO DEPLOY</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* One Platform. Three Experiences. One Philosophy section */}
      <div className="bg-[#1C1C1C] text-white rounded-xl p-8 md:p-12 text-center max-w-4xl mx-auto space-y-6 border border-white/10 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full pointer-events-none" />
        <span className="font-mono text-xs tracking-[0.3em] text-[#C5A880] uppercase block font-bold">
          One Platform. Three Experiences. One Philosophy.
        </span>
        <blockquote className="text-xl md:text-2xl font-serif font-light text-gray-200 leading-relaxed italic max-w-3xl mx-auto">
          "Whether designed for an individual, a family, or an organization, every Nara intelligence begins the same way: by understanding the people it serves. Every system is personalized, privacy-first, and built to grow through long-term relationships—not one-time interactions."
        </blockquote>
        <div className="pt-4 flex justify-center gap-4">
          <button
            onClick={() => setMainTab('trust')}
            className="px-6 py-3 border border-[#C5A880] text-[#C5A880] font-mono text-xs tracking-wider hover:bg-[#C5A880] hover:text-[#1C1C1C] transition-all duration-300 uppercase font-bold cursor-pointer rounded"
          >
            Proceed to Trust Framework
          </button>
        </div>
      </div>
    </motion.div>
  );
}

