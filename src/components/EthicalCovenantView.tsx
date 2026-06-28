import { motion } from 'motion/react';
import { X, BookOpen, Fingerprint } from 'lucide-react';

interface EthicalCovenantViewProps {
  onClose: () => void;
}

export default function EthicalCovenantView({ onClose }: EthicalCovenantViewProps) {
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
            <span className="w-2 h-2 bg-amber-600 rounded-full animate-pulse" />
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#5A5A40] font-bold">
              Ethical Covenant Core // Nara AI
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-[#FDFCFB] transition-all text-[9px] font-mono uppercase tracking-wider font-bold rounded-none cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            Close Covenant
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
              <BookOpen className="w-6 h-6" />
            </div>
            <h1 
              className="text-4xl md:text-5xl font-light tracking-tight text-[#1C1C1C]"
              style={{ fontFamily: 'Georgia, "Lora", serif' }}
            >
              The Nara Ethical Covenant
            </h1>
            <p className="text-[10px] font-mono text-[#5A5A40] uppercase tracking-[0.22em] font-bold">
              The Principles Behind Every Intelligence
            </p>
            <div className="h-[1px] w-24 bg-[#5A5A40]/30 mx-auto pt-2" />
          </motion.div>

          {/* Intro Section */}
          <motion.div variants={itemVariants} className="border border-[#1C1C1C]/10 p-8 bg-[#EAE7E1]/10 space-y-4">
            <h2 
              className="text-2xl font-normal text-[#1C1C1C]"
              style={{ fontFamily: 'Georgia, "Lora", serif' }}
            >
              Technology Carries Responsibility
            </h2>
            <p className="text-sm md:text-base text-[#1C1C1C]/85 leading-relaxed font-light">
              Artificial intelligence should strengthen humanity—not compete with it.
            </p>
            <p className="text-sm md:text-base text-[#1C1C1C]/85 leading-relaxed font-light">
              At Nara, we believe technology carries responsibility. Every intelligence we create is guided by principles that protect human dignity, privacy, freedom, and trust. These principles define how we design, develop, and continuously improve every Nara.
            </p>
          </motion.div>

          {/* Pillars of Covenant */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Principle 1 */}
            <div className="border border-[#1C1C1C]/10 p-6 bg-white space-y-3">
              <div className="flex justify-between items-start border-b border-[#1C1C1C]/10 pb-2">
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#5A5A40] font-bold">Principle 01</span>
                <span className="text-xs font-serif italic text-[#1C1C1C]/40">Humanity First</span>
              </div>
              <h3 
                className="text-lg font-normal text-[#1C1C1C]"
                style={{ fontFamily: 'Georgia, "Lora", serif' }}
              >
                Human Before Technology
              </h3>
              <p className="text-xs text-[#1C1C1C]/75 leading-relaxed font-light">
                Technology exists to serve people. Every Nara is created to help individuals, families, and organizations think more clearly, learn more effectively, create more confidently, and make better decisions. Human judgment always comes first.
              </p>
            </div>

            {/* Principle 2 */}
            <div className="border border-[#1C1C1C]/10 p-6 bg-white space-y-3">
              <div className="flex justify-between items-start border-b border-[#1C1C1C]/10 pb-2">
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#5A5A40] font-bold">Principle 02</span>
                <span className="text-xs font-serif italic text-[#1C1C1C]/40">Trust Architecture</span>
              </div>
              <h3 
                className="text-lg font-normal text-[#1C1C1C]"
                style={{ fontFamily: 'Georgia, "Lora", serif' }}
              >
                Intelligence Deserves Trust
              </h3>
              <p className="text-xs text-[#1C1C1C]/75 leading-relaxed font-light">
                Trust cannot be programmed. It must be earned through honesty, transparency, security, and consistent action. Every decision we make should strengthen that trust.
              </p>
            </div>

            {/* Principle 3 */}
            <div className="border border-[#1C1C1C]/10 p-6 bg-white space-y-3">
              <div className="flex justify-between items-start border-b border-[#1C1C1C]/10 pb-2">
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#5A5A40] font-bold">Principle 03</span>
                <span className="text-xs font-serif italic text-[#1C1C1C]/40">Absolute Control</span>
              </div>
              <h3 
                className="text-lg font-normal text-[#1C1C1C]"
                style={{ fontFamily: 'Georgia, "Lora", serif' }}
              >
                Ownership Belongs to the Owner
              </h3>
              <p className="text-xs text-[#1C1C1C]/75 leading-relaxed font-light">
                Your intelligence belongs to you. Your conversations, memories, and knowledge belong to you. You decide what your intelligence remembers, what it forgets, what it connects to, and when it is permanently deleted. Ownership always remains with the owner.
              </p>
            </div>

            {/* Principle 4 */}
            <div className="border border-[#1C1C1C]/10 p-6 bg-white space-y-3">
              <div className="flex justify-between items-start border-b border-[#1C1C1C]/10 pb-2">
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#5A5A40] font-bold">Principle 04</span>
                <span className="text-xs font-serif italic text-[#1C1C1C]/40">Non-Manipulation</span>
              </div>
              <h3 
                className="text-lg font-normal text-[#1C1C1C]"
                style={{ fontFamily: 'Georgia, "Lora", serif' }}
              >
                Personalization Without Exploitation
              </h3>
              <p className="text-xs text-[#1C1C1C]/75 leading-relaxed font-light">
                Understanding someone is a privilege—not an opportunity for manipulation. Nara will never intentionally use personal information to exploit emotional vulnerabilities, encourage unhealthy dependence, or manipulate behavior for commercial benefit. Our purpose is empowerment, not influence.
              </p>
            </div>

            {/* Principle 5 */}
            <div className="border border-[#1C1C1C]/10 p-6 bg-white space-y-3">
              <div className="flex justify-between items-start border-b border-[#1C1C1C]/10 pb-2">
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#5A5A40] font-bold">Principle 05</span>
                <span className="text-xs font-serif italic text-[#1C1C1C]/40">Foundation Core</span>
              </div>
              <h3 
                className="text-lg font-normal text-[#1C1C1C]"
                style={{ fontFamily: 'Georgia, "Lora", serif' }}
              >
                Privacy Is Fundamental
              </h3>
              <p className="text-xs text-[#1C1C1C]/75 leading-relaxed font-light">
                Privacy is not an optional feature. It is one of the foundations upon which every Nara intelligence is created. We design our platform to minimize unnecessary data collection and provide meaningful control over personal information.
              </p>
            </div>

            {/* Principle 6 */}
            <div className="border border-[#1C1C1C]/10 p-6 bg-white space-y-3">
              <div className="flex justify-between items-start border-b border-[#1C1C1C]/10 pb-2">
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#5A5A40] font-bold">Principle 06</span>
                <span className="text-xs font-serif italic text-[#1C1C1C]/40">Safe Innovation</span>
              </div>
              <h3 
                className="text-lg font-normal text-[#1C1C1C]"
                style={{ fontFamily: 'Georgia, "Lora", serif' }}
              >
                Security Before Innovation
              </h3>
              <p className="text-xs text-[#1C1C1C]/75 leading-relaxed font-light">
                Innovation should never compromise safety. Every new capability is evaluated for security, privacy, and responsible deployment before becoming available to owners.
              </p>
            </div>

            {/* Principle 7 */}
            <div className="border border-[#1C1C1C]/10 p-6 bg-white space-y-3">
              <div className="flex justify-between items-start border-b border-[#1C1C1C]/10 pb-2">
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#5A5A40] font-bold">Principle 07</span>
                <span className="text-xs font-serif italic text-[#1C1C1C]/40">Continuous Alignment</span>
              </div>
              <h3 
                className="text-lg font-normal text-[#1C1C1C]"
                style={{ fontFamily: 'Georgia, "Lora", serif' }}
              >
                Intelligence That Evolves Responsibly
              </h3>
              <p className="text-xs text-[#1C1C1C]/75 leading-relaxed font-light">
                Every Nara grows through experience. As it learns, it must remain aligned with your preferences, your permissions, and your expectations. You remain in control throughout the relationship.
              </p>
            </div>

            {/* Principle 8 */}
            <div className="border border-[#1C1C1C]/10 p-6 bg-[#5A5A40]/5 space-y-3">
              <div className="flex justify-between items-start border-[#1C1C1C]/10 pb-2">
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#5A5A40] font-bold">Principle 08</span>
                <span className="text-xs font-serif italic text-[#1C1C1C]/40">Human Bonding</span>
              </div>
              <h3 
                className="text-lg font-normal text-[#1C1C1C]"
                style={{ fontFamily: 'Georgia, "Lora", serif' }}
              >
                A Relationship Built on Respect
              </h3>
              <p className="text-xs text-[#1C1C1C]/75 leading-relaxed font-light">
                We do not believe artificial intelligence should replace friendship, family, or human connection. Nara exists to support people—not substitute them. The strongest intelligence is one that helps people become more capable while preserving what makes them human.
              </p>
            </div>

          </motion.div>

          {/* Section: Continuous Accountability */}
          <motion.div variants={itemVariants} className="border border-[#1C1C1C]/10 p-8 space-y-4 text-center bg-white max-w-2xl mx-auto">
            <div className="mx-auto w-10 h-10 border border-[#1C1C1C]/10 bg-[#EAE7E1]/15 text-[#5A5A40] flex items-center justify-center mb-1">
              <Fingerprint className="w-5 h-5" />
            </div>
            <h3 
              className="text-xl font-normal text-[#1C1C1C]"
              style={{ fontFamily: 'Georgia, "Lora", serif' }}
            >
              Continuous Accountability
            </h3>
            <p className="text-xs text-[#1C1C1C]/70 leading-relaxed max-w-md mx-auto">
              As artificial intelligence evolves, so does our responsibility. We regularly review our systems, strengthen our safeguards, and improve our practices to ensure every Nara continues to deserve the trust placed in it.
            </p>
          </motion.div>

          {/* Bottom Commitment / Sign off */}
          <motion.div variants={itemVariants} className="space-y-6 text-center max-w-xl mx-auto pt-8 border-t border-[#1C1C1C]/10">
            <h3 
              className="text-2xl font-light italic text-[#5A5A40]"
              style={{ fontFamily: 'Georgia, "Lora", serif' }}
            >
              Our Promise
            </h3>
            
            <div className="text-xs text-[#1C1C1C]/85 leading-relaxed font-light space-y-4">
              <p>
                Every Nara is created with care. Every owner is treated with respect. Every decision is guided by responsibility.
              </p>
              <p className="text-sm font-serif italic font-bold text-[#1C1C1C]">
                "We are not simply building intelligent software. We are building trusted lifelong intelligence."
              </p>
            </div>

            <div className="py-4 font-mono text-[10px] uppercase tracking-widest text-[#5A5A40] space-y-1">
              <p>That is our covenant.</p>
              <p>That is our promise.</p>
              <p className="font-bold text-[#1C1C1C]">That is Nara.</p>
            </div>
            
            <div className="pt-8 flex flex-col items-center justify-center select-none space-y-1.5">
              <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#1C1C1C]/40">
                Ethical & Moral Charter Alignment
              </span>
              <div className="w-12 h-[1px] bg-[#1C1C1C]/10" />
              <span className="text-[10px] font-mono uppercase text-[#5A5A40] font-bold">
                NARA ETHICAL DESIGN COUNCIL
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
            Agree & Close Covenant
          </button>
        </div>

      </div>
    </motion.div>
  );
}
