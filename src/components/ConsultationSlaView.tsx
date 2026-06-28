import { motion } from 'motion/react';
import { X, FileText, Compass, Milestone, Clock, ShieldAlert, Award, CheckCircle2 } from 'lucide-react';

interface ConsultationSlaViewProps {
  onClose: () => void;
}

export default function ConsultationSlaView({ onClose }: ConsultationSlaViewProps) {
  // Stagger animation container
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-[#FDFCFB]/98 backdrop-blur-md flex justify-center p-4 md:p-8 select-text"
    >
      <div className="w-full max-w-4xl relative">
        
        {/* Floating close button */}
        <div className="sticky top-4 md:top-8 flex justify-between items-center bg-[#FDFCFB]/80 backdrop-blur-sm py-4 border-b border-[#1C1C1C]/10 z-10 select-none">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#5A5A40] rounded-full animate-pulse" />
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#5A5A40] font-bold">
              Creation Standard SLA // Nara AI
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-[#FDFCFB] transition-all text-[9px] font-mono uppercase tracking-wider font-bold rounded-none cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            Close Document
          </button>
        </div>

        {/* Content body */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="py-12 md:py-16 space-y-16"
        >
          {/* Header Title Block */}
          <motion.div variants={itemVariants} className="space-y-4 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-12 h-12 border border-[#1C1C1C]/10 bg-[#EAE7E1]/20 text-[#5A5A40] rounded-none mb-2">
              <FileText className="w-6 h-6" />
            </div>
            <h1 
              className="text-4xl md:text-5xl font-light tracking-tight text-[#1C1C1C]"
              style={{ fontFamily: 'Georgia, "Lora", serif' }}
            >
              Intelligence Creation Standards
            </h1>
            <p className="text-[10px] font-mono text-[#5A5A40] uppercase tracking-[0.22em] font-bold">
              Consultation Service Level Agreement & Craftsmanship Charter
            </p>
            <div className="h-[1px] w-24 bg-[#5A5A40]/30 mx-auto pt-2" />
          </motion.div>

          {/* Purpose Intro Section */}
          <motion.div variants={itemVariants} className="border border-[#1C1C1C]/10 p-8 bg-[#EAE7E1]/10 space-y-4">
            <h2 
              className="text-2xl font-normal text-[#1C1C1C]"
              style={{ fontFamily: 'Georgia, "Lora", serif' }}
            >
              Every Intelligence Is Created With Purpose
            </h2>
            <p className="text-sm md:text-base text-[#1C1C1C]/80 leading-relaxed font-light">
              A Nara intelligence is never generated instantly or mass-produced.
            </p>
            <p className="text-sm md:text-base text-[#1C1C1C]/80 leading-relaxed font-light">
              Every intelligence is individually created for the person, family, or organization it will serve. Before activation, each Nara follows a structured creation process designed to ensure it reflects your preferences, protects your privacy, and meets our quality standards.
            </p>
            <p className="text-xs font-mono text-[#5A5A40] font-bold uppercase tracking-wider pt-2">
              * Your one-time <span className="underline">Intelligence Creation Fee</span> supports this personalized creation process.
            </p>
          </motion.div>

          {/* Creation Philosophy */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="border-b border-[#1C1C1C]/10 pb-2 flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#5A5A40]" />
              <h2 
                className="text-2xl font-normal text-[#1C1C1C]"
                style={{ fontFamily: 'Georgia, "Lora", serif' }}
              >
                Our Creation Philosophy
              </h2>
            </div>
            <div className="max-w-3xl space-y-4 text-sm text-[#1C1C1C]/80 font-light leading-relaxed">
              <p>
                We believe personalized intelligence deserves thoughtful craftsmanship.
              </p>
              <p>
                Rather than delivering the same assistant to every customer, we create an intelligence designed around your goals, communication style, preferred voice, visual identity, privacy preferences, and digital ecosystem.
              </p>
              <p className="font-serif italic text-base text-[#1C1C1C] pt-2">
                "Every Nara begins with understanding the owner behind the intelligence."
              </p>
            </div>
          </motion.div>

          {/* The Intelligence Creation Journey Phases */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="border-b border-[#1C1C1C]/10 pb-2 flex items-center gap-2">
              <Milestone className="w-5 h-5 text-[#5A5A40]" />
              <h2 
                className="text-2xl font-normal text-[#1C1C1C]"
                style={{ fontFamily: 'Georgia, "Lora", serif' }}
              >
                The Intelligence Creation Journey
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Phase 1 */}
              <div className="border border-[#1C1C1C]/10 p-6 bg-white space-y-4">
                <div className="flex justify-between items-baseline border-b border-[#1C1C1C]/10 pb-2">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#5A5A40] font-bold">Phase One</span>
                  <span className="font-serif italic text-xs text-[#1C1C1C]/50">Initial Node</span>
                </div>
                <h3 
                  className="text-lg font-normal text-[#1C1C1C]"
                  style={{ fontFamily: 'Georgia, "Lora", serif' }}
                >
                  Discovery
                </h3>
                <p className="text-xs text-[#1C1C1C]/70 leading-relaxed font-light">
                  We begin by understanding who you are and what you want your intelligence to become. This includes exploring:
                </p>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-[#1C1C1C]/80 pt-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#5A5A40]">•</span> Goals & Priorities
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#5A5A40]">•</span> Communication Prefs
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#5A5A40]">•</span> Preferred Personality
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#5A5A40]">•</span> Voice Selection
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#5A5A40]">•</span> Visual Companions
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#5A5A40]">•</span> Privacy Settings
                  </div>
                  <div className="flex items-center gap-1.5 col-span-2">
                    <span className="text-[#5A5A40]">•</span> Connected Services
                  </div>
                </div>
              </div>

              {/* Phase 2 */}
              <div className="border border-[#1C1C1C]/10 p-6 bg-white space-y-4">
                <div className="flex justify-between items-baseline border-b border-[#1C1C1C]/10 pb-2">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#5A5A40] font-bold">Phase Two</span>
                  <span className="font-serif italic text-xs text-[#1C1C1C]/50">Assembly</span>
                </div>
                <h3 
                  className="text-lg font-normal text-[#1C1C1C]"
                  style={{ fontFamily: 'Georgia, "Lora", serif' }}
                >
                  Intelligence Design
                </h3>
                <p className="text-xs text-[#1C1C1C]/70 leading-relaxed font-light">
                  Your personalized intelligence is assembled. This state includes refining and embedding:
                </p>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-[#1C1C1C]/80 pt-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#5A5A40]">•</span> Identity Creation
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#5A5A40]">•</span> Personality Arch
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#5A5A40]">•</span> Memory Framework
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#5A5A40]">•</span> Knowledge Profile
                  </div>
                  <div className="flex items-center gap-1.5 col-span-2">
                    <span className="text-[#5A5A40]">•</span> Behavioral Preferences
                  </div>
                  <div className="flex items-center gap-1.5 col-span-2">
                    <span className="text-[#5A5A40]">•</span> Specialized Capabilities
                  </div>
                </div>
              </div>

              {/* Phase 3 */}
              <div className="border border-[#1C1C1C]/10 p-6 bg-white space-y-4">
                <div className="flex justify-between items-baseline border-b border-[#1C1C1C]/10 pb-2">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#5A5A40] font-bold">Phase Three</span>
                  <span className="font-serif italic text-xs text-[#1C1C1C]/50">Ecosystem</span>
                </div>
                <h3 
                  className="text-lg font-normal text-[#1C1C1C]"
                  style={{ fontFamily: 'Georgia, "Lora", serif' }}
                >
                  Ecosystem Integration
                </h3>
                <p className="text-xs text-[#1C1C1C]/70 leading-relaxed font-light">
                  Your approved services are securely connected. This may include integrating nodes such as:
                </p>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-[#1C1C1C]/80 pt-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#5A5A40]">•</span> Email Channels
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#5A5A40]">•</span> Shared Calendars
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#5A5A40]">•</span> Document Vaults
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#5A5A40]">•</span> Messaging Channels
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#5A5A40]">•</span> Web Browsers
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#5A5A40]">•</span> Health Platforms
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#5A5A40]">•</span> Financial Ledgers
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#5A5A40]">•</span> Smart Devices
                  </div>
                </div>
              </div>

              {/* Phase 4 & 5 */}
              <div className="border border-[#1C1C1C]/10 p-6 bg-[#5A5A40]/5 space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-baseline border-b border-[#5A5A40]/20 pb-2">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[#5A5A40] font-bold">Phases Four & Five</span>
                    <span className="font-serif italic text-xs text-[#5A5A40]">Verification & Run</span>
                  </div>
                  <h3 
                    className="text-lg font-normal text-[#1C1C1C] mt-4"
                    style={{ fontFamily: 'Georgia, "Lora", serif' }}
                  >
                    Validation & Activation
                  </h3>
                  <p className="text-xs text-[#1C1C1C]/70 leading-relaxed font-light mt-2">
                    Every intelligence is thoroughly validated against safety protocols and configuration alignment before live deployment:
                  </p>
                  <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono text-[#1C1C1C]/85 pt-3">
                    <div className="flex items-center gap-1">
                      <span className="text-emerald-600 font-bold">✓</span> Personality Match
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-emerald-600 font-bold">✓</span> Memory Verify
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-emerald-600 font-bold">✓</span> Voice Config
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-emerald-600 font-bold">✓</span> Companion Review
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-emerald-600 font-bold">✓</span> Integration Test
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-emerald-600 font-bold">✓</span> Privacy Audit
                    </div>
                    <div className="flex items-center gap-1 col-span-2">
                      <span className="text-emerald-600 font-bold">✓</span> Security & Performance Validation
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#1C1C1C]/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#1C1C1C]">Activated State</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#1C1C1C]/50 italic">Lifelong Growth</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* SLA Timeline Table */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="border-b border-[#1C1C1C]/10 pb-2 flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#5A5A40]" />
              <h2 
                className="text-2xl font-normal text-[#1C1C1C]"
                style={{ fontFamily: 'Georgia, "Lora", serif' }}
              >
                Intelligence Creation Timeline
              </h2>
            </div>
            
            <p className="text-xs text-[#1C1C1C]/70 leading-relaxed font-light max-w-2xl">
              Due to the rigorous personalization process and manual verification standards, each subscription level has a dedicated queue and creation cycle.
            </p>

            <div className="border border-[#1C1C1C]/10 overflow-hidden bg-white">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#EAE7E1]/30 border-b border-[#1C1C1C]/10 text-[#5A5A40]">
                    <th className="p-4 font-mono text-[10px] uppercase tracking-wider font-bold">Experience Tier</th>
                    <th className="p-4 font-mono text-[10px] uppercase tracking-wider font-bold text-right">Estimated Creation Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1C1C1C]/5 font-mono text-xs text-[#1C1C1C]">
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-4 font-semibold">Essential</td>
                    <td className="p-4 text-right">5–7 Business Days</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-4 font-semibold">Professional</td>
                    <td className="p-4 text-right">7–10 Business Days</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-4 font-semibold text-[#5A5A40]">Signature</td>
                    <td className="p-4 text-right font-bold text-[#1C1C1C]">10–14 Business Days</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-4 font-semibold">Family Connect</td>
                    <td className="p-4 text-right">5–7 Business Days</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-4 font-semibold text-[#5A5A40]">Family Signature</td>
                    <td className="p-4 text-right font-bold text-[#1C1C1C]">10–14 Business Days</td>
                  </tr>
                  <tr className="hover:bg-[#5A5A40]/5">
                    <td className="p-4 font-bold text-[#5A5A40]">Enterprise</td>
                    <td className="p-4 text-right font-bold text-[#5A5A40]">2–6 Weeks</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* The Adaptive Intelligence Period */}
          <motion.div variants={itemVariants} className="border border-[#1C1C1C]/10 p-8 bg-[#1C1C1C]/5 space-y-4">
            <div className="flex items-center gap-2 text-[#5A5A40]">
              <ShieldAlert className="w-5 h-5" />
              <h3 
                className="text-xl font-normal text-[#1C1C1C]"
                style={{ fontFamily: 'Georgia, "Lora", serif' }}
              >
                The Adaptive Intelligence Period
              </h3>
            </div>
            <p className="text-xs md:text-sm text-[#1C1C1C]/80 leading-relaxed font-light">
              Creation does not end with activation.
            </p>
            <p className="text-xs md:text-sm text-[#1C1C1C]/80 leading-relaxed font-light">
              During the first ninety days, your Nara gradually develops a deeper understanding of your routines, communication patterns, preferences, and objectives. This continuous learning process allows your intelligence to become increasingly personalized over time.
            </p>
          </motion.div>

          {/* Four Principles Standards */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="border-b border-[#1C1C1C]/10 pb-2 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#5A5A40]" />
              <h2 
                className="text-2xl font-normal text-[#1C1C1C]"
                style={{ fontFamily: 'Georgia, "Lora", serif' }}
              >
                Our Standards
              </h2>
            </div>

            <p className="text-xs text-[#1C1C1C]/70 leading-relaxed font-light max-w-2xl">
              Every intelligence we create is expected to meet four principles before activation:
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="border border-[#1C1C1C]/10 p-4 bg-white text-center">
                <span className="text-[9px] font-mono text-[#5A5A40] uppercase tracking-widest block mb-1">Principle I</span>
                <span className="text-xs font-bold text-[#1C1C1C] block">Personalization</span>
              </div>
              <div className="border border-[#1C1C1C]/10 p-4 bg-white text-center">
                <span className="text-[9px] font-mono text-[#5A5A40] uppercase tracking-widest block mb-1">Principle II</span>
                <span className="text-xs font-bold text-[#1C1C1C] block">Security</span>
              </div>
              <div className="border border-[#1C1C1C]/10 p-4 bg-white text-center">
                <span className="text-[9px] font-mono text-[#5A5A40] uppercase tracking-widest block mb-1">Principle III</span>
                <span className="text-xs font-bold text-[#1C1C1C] block">Reliability</span>
              </div>
              <div className="border border-[#1C1C1C]/10 p-4 bg-white text-center">
                <span className="text-[9px] font-mono text-[#5A5A40] uppercase tracking-widest block mb-1">Principle IV</span>
                <span className="text-xs font-bold text-[#1C1C1C] block">Respect for Privacy</span>
              </div>
            </div>

            <p className="text-xs italic text-[#1C1C1C]/60 text-center font-serif pt-2">
              "If these standards are not met, your intelligence continues through refinement before release."
            </p>
          </motion.div>

          {/* Bottom Commitment / Sign off */}
          <motion.div variants={itemVariants} className="space-y-6 text-center max-w-2xl mx-auto pt-8 border-t border-[#1C1C1C]/10">
            <h3 
              className="text-2xl font-light italic text-[#5A5A40]"
              style={{ fontFamily: 'Georgia, "Lora", serif' }}
            >
              Our Commitment
            </h3>
            <p className="text-xs text-[#1C1C1C]/75 leading-relaxed font-light">
              We do not measure success by how quickly we activate an intelligence. We measure success by how well it understands the person it was created to serve.
            </p>
            <div className="py-4 font-mono text-[10px] uppercase tracking-wider text-[#1C1C1C]/80 space-y-1">
              <p>Every Nara is individually created.</p>
              <p>Every Nara is reviewed.</p>
              <p className="font-bold">Every Nara is built to grow with its owner.</p>
            </div>
            
            <div className="pt-8 flex flex-col items-center justify-center select-none space-y-1.5">
              <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#1C1C1C]/40">
                Authorized Service Level Standard
              </span>
              <div className="w-12 h-[1px] bg-[#1C1C1C]/10" />
              <span className="text-[10px] font-mono uppercase text-[#5A5A40] font-bold">
                NARA ADAPTIVE INTELLIGENCE BOARD
              </span>
            </div>
          </motion.div>

        </motion.div>

        {/* Footer actions */}
        <div className="py-12 border-t border-[#1C1C1C]/10 flex justify-center select-none">
          <button
            type="button"
            onClick={onClose}
            className="px-8 py-3.5 bg-[#1C1C1C] hover:bg-[#1C1C1C]/90 text-white font-mono text-[10px] uppercase tracking-[0.25em] font-bold rounded-none transition-all duration-300 cursor-pointer"
          >
            Acknowledge SLA & Close
          </button>
        </div>

      </div>
    </motion.div>
  );
}
