import { motion } from 'motion/react';
import { X, ShieldCheck, Lock, Eye, Key, Database, Cpu, Mail } from 'lucide-react';

interface SecurityPolicyViewProps {
  onClose: () => void;
}

export default function SecurityPolicyView({ onClose }: SecurityPolicyViewProps) {
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
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#5A5A40] font-bold">
              Secure Document Core // Nara AI
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
          <motion.div variants={itemVariants} className="space-y-4 text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center w-12 h-12 border border-[#1C1C1C]/10 bg-[#EAE7E1]/20 text-[#5A5A40] rounded-none mb-2">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 
              className="text-4xl md:text-5xl font-light tracking-tight text-[#1C1C1C]"
              style={{ fontFamily: 'Georgia, "Lora", serif' }}
            >
              Security Policy
            </h1>
            <p className="text-[10px] font-mono text-[#5A5A40] uppercase tracking-[0.22em] font-bold">
              Published: June 2026 // Certified Core Standard
            </p>
            <div className="h-[1px] w-24 bg-[#5A5A40]/30 mx-auto pt-2" />
          </motion.div>

          {/* Intro Section */}
          <motion.div variants={itemVariants} className="border border-[#1C1C1C]/10 p-8 bg-[#EAE7E1]/10 space-y-4">
            <h2 
              className="text-2xl font-normal text-[#1C1C1C]"
              style={{ fontFamily: 'Georgia, "Lora", serif' }}
            >
              Security by Design
            </h2>
            <p className="text-sm md:text-base text-[#1C1C1C]/80 leading-relaxed font-light">
              At Nara, security is not an afterthought—it is the foundation of every intelligence we create.
            </p>
            <p className="text-sm md:text-base text-[#1C1C1C]/80 leading-relaxed font-light">
              Every Nara is built to protect the people it serves through strong encryption, secure authentication, transparent privacy controls, and continuous monitoring. Our goal is simple: your personal intelligence should always remain private, secure, and under your control.
            </p>
          </motion.div>

          {/* Pillars: Security Principles */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="border-b border-[#1C1C1C]/10 pb-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#5A5A40] font-bold block">
                Pillar 01
              </span>
              <h2 
                className="text-2xl font-normal text-[#1C1C1C]"
                style={{ fontFamily: 'Georgia, "Lora", serif' }}
              >
                Our Security Principles
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="border border-[#1C1C1C]/10 p-6 bg-white space-y-3">
                <div className="text-[#5A5A40]"><Eye className="w-5 h-5" /></div>
                <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-[#1C1C1C]">Privacy First</h3>
                <p className="text-xs text-[#1C1C1C]/70 leading-relaxed font-light">
                  Your personal information belongs to you. Nara never sells your personal data and never shares your information with third parties without your explicit permission.
                </p>
              </div>

              <div className="border border-[#1C1C1C]/10 p-6 bg-white space-y-3">
                <div className="text-[#5A5A40]"><Lock className="w-5 h-5" /></div>
                <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-[#1C1C1C]">User Ownership</h3>
                <p className="text-xs text-[#1C1C1C]/70 leading-relaxed font-light">
                  You remain in control of your conversations, memories, connected services, and personal information. You can review, export, or permanently delete your data at any time.
                </p>
              </div>

              <div className="border border-[#1C1C1C]/10 p-6 bg-white space-y-3">
                <div className="text-[#5A5A40]"><Key className="w-5 h-5" /></div>
                <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-[#1C1C1C]">Secure by Default</h3>
                <p className="text-xs text-[#1C1C1C]/70 leading-relaxed font-light">
                  Every Nara account is protected using modern security practices designed to reduce unauthorized access and safeguard sensitive information.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Section: Data Protection */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="border-b border-[#1C1C1C]/10 pb-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#5A5A40] font-bold block">
                Pillar 02
              </span>
              <h2 
                className="text-2xl font-normal text-[#1C1C1C]"
                style={{ fontFamily: 'Georgia, "Lora", serif' }}
              >
                Data Protection
              </h2>
              <p className="text-xs text-[#1C1C1C]/60 italic font-serif mt-1">
                We protect customer information using multiple layers of security.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#5A5A40] uppercase tracking-wider">
                  <span>01 // Encryption</span>
                </div>
                <ul className="text-xs text-[#1C1C1C]/75 space-y-2 list-disc list-inside font-sans pl-1">
                  <li>Encryption for data while it is transmitted between your device and our servers.</li>
                  <li>Encryption for stored customer data.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#5A5A40] uppercase tracking-wider">
                  <span>02 // Authentication</span>
                </div>
                <ul className="text-xs text-[#1C1C1C]/75 space-y-2 list-disc list-inside font-sans pl-1">
                  <li>Secure account authentication</li>
                  <li>Multi-Factor Authentication (MFA)</li>
                  <li>Trusted device management</li>
                  <li>Login activity monitoring</li>
                </ul>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#5A5A40] uppercase tracking-wider">
                  <span>03 // Access Control</span>
                </div>
                <p className="text-xs text-[#1C1C1C]/75 leading-relaxed font-light pl-1">
                  Only authorized systems may process your information. Access to customer data follows the principle of least privilege, meaning systems and personnel receive only the minimum access necessary to perform their responsibilities.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Section: AI Memory Protection & Connected Services */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div className="border border-[#1C1C1C]/10 p-6 space-y-4">
              <div className="flex items-center gap-2 text-[#5A5A40]">
                <Cpu className="w-5 h-5" />
                <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-[#1C1C1C]">AI Memory Protection</h3>
              </div>
              <p className="text-xs text-[#1C1C1C]/70 leading-relaxed font-light">
                Your AI memory is personal. Nara stores memories only to improve your experience and only according to the preferences you choose.
              </p>
              <div className="pt-2">
                <span className="text-[9px] font-mono uppercase text-[#5A5A40] font-bold block mb-2">Available controls:</span>
                <ul className="text-xs text-[#1C1C1C]/80 space-y-1.5 list-none font-mono">
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500">•</span> Review stored memories
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500">•</span> Edit memories
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500">•</span> Delete memories
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500">•</span> Disable long-term memory
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500">•</span> Reset your AI companion
                  </li>
                </ul>
              </div>
            </div>

            <div className="border border-[#1C1C1C]/10 p-6 space-y-4">
              <div className="flex items-center gap-2 text-[#5A5A40]">
                <Database className="w-5 h-5" />
                <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-[#1C1C1C]">Connected Services</h3>
              </div>
              <p className="text-xs text-[#1C1C1C]/70 leading-relaxed font-light">
                When you connect services such as email, calendars, documents, or messaging platforms:
              </p>
              <div className="pt-2">
                <span className="text-[9px] font-mono uppercase text-[#5A5A40] font-bold block mb-2">Integration guarantees:</span>
                <ul className="text-xs text-[#1C1C1C]/80 space-y-1.5 list-none font-sans">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 font-mono">•</span> <span>You choose what Nara can access.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 font-mono">•</span> <span>Permissions can be revoked at any time.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 font-mono">•</span> <span>Connected accounts remain under your control.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 font-mono">•</span> <span>Nara only accesses information required to perform the tasks you authorize.</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Section: Infrastructure Security & Responsible AI */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="border-b border-[#1C1C1C]/10 pb-2">
                <h3 
                  className="text-lg font-normal text-[#1C1C1C]"
                  style={{ fontFamily: 'Georgia, "Lora", serif' }}
                >
                  Infrastructure Security
                </h3>
              </div>
              <p className="text-xs text-[#1C1C1C]/75 leading-relaxed font-light">
                Our platform is designed with resilience and reliability in mind. Security measures include:
              </p>
              <ul className="text-xs text-[#1C1C1C]/80 space-y-2 list-none font-mono">
                <li className="flex items-center gap-2"><span className="text-[#5A5A40]">&gt;&gt;</span> Continuous system monitoring</li>
                <li className="flex items-center gap-2"><span className="text-[#5A5A40]">&gt;&gt;</span> Automated threat detection</li>
                <li className="flex items-center gap-2"><span className="text-[#5A5A40]">&gt;&gt;</span> Regular software updates</li>
                <li className="flex items-center gap-2"><span className="text-[#5A5A40]">&gt;&gt;</span> Secure cloud infrastructure</li>
                <li className="flex items-center gap-2"><span className="text-[#5A5A40]">&gt;&gt;</span> Encrypted backups</li>
                <li className="flex items-center gap-2"><span className="text-[#5A5A40]">&gt;&gt;</span> Disaster recovery planning</li>
              </ul>
            </div>

            <div className="space-y-4">
              <div className="border-b border-[#1C1C1C]/10 pb-2">
                <h3 
                  className="text-lg font-normal text-[#1C1C1C]"
                  style={{ fontFamily: 'Georgia, "Lora", serif' }}
                >
                  Responsible AI
                </h3>
              </div>
              <p className="text-xs text-[#1C1C1C]/75 leading-relaxed font-light">
                Artificial intelligence should be both capable and accountable. Nara is designed to:
              </p>
              <ul className="text-xs text-[#1C1C1C]/80 space-y-2 list-none font-mono">
                <li className="flex items-center gap-2"><span className="text-[#5A5A40]">&gt;&gt;</span> Respect user privacy</li>
                <li className="flex items-center gap-2"><span className="text-[#5A5A40]">&gt;&gt;</span> Minimize unnecessary data collection</li>
                <li className="flex items-center gap-2"><span className="text-[#5A5A40]">&gt;&gt;</span> Provide transparent AI interactions</li>
                <li className="flex items-center gap-2"><span className="text-[#5A5A40]">&gt;&gt;</span> Give users meaningful control over their information</li>
                <li className="flex items-center gap-2"><span className="text-[#5A5A40]">&gt;&gt;</span> Support human decision-making rather than replace it</li>
              </ul>
            </div>
          </motion.div>

          {/* Reporting Vulnerabilities */}
          <motion.div variants={itemVariants} className="border border-[#1C1C1C]/10 p-8 text-center space-y-4 bg-white">
            <div className="mx-auto w-10 h-10 border border-[#1C1C1C]/10 bg-[#EAE7E1]/15 text-[#5A5A40] flex items-center justify-center mb-1">
              <Mail className="w-5 h-5" />
            </div>
            <h3 
              className="text-xl font-normal text-[#1C1C1C]"
              style={{ fontFamily: 'Georgia, "Lora", serif' }}
            >
              Reporting Security Issues
            </h3>
            <p className="text-xs text-[#1C1C1C]/70 max-w-lg mx-auto leading-relaxed">
              We welcome responsible disclosure from researchers and the security community. If you believe you have discovered a security vulnerability, please contact us directly:
            </p>
            <div className="inline-block px-4 py-2 border border-[#1C1C1C]/10 bg-[#FDFCFB] font-mono text-xs font-bold text-[#5A5A40]">
              <a href="mailto:security@nara.ai" className="hover:underline flex items-center gap-2">
                security@nara.ai ↗
              </a>
            </div>
            <p className="text-[10px] text-[#1C1C1C]/50 font-mono uppercase tracking-wider">
              Our security team will investigate every legitimate report and work to resolve verified issues as quickly as possible.
            </p>
          </motion.div>

          {/* Bottom Commitment / Sign off */}
          <motion.div variants={itemVariants} className="space-y-6 text-center max-w-xl mx-auto pt-8 border-t border-[#1C1C1C]/10">
            <h3 
              className="text-2xl font-light italic text-[#5A5A40]"
              style={{ fontFamily: 'Georgia, "Lora", serif' }}
            >
              Our Commitment
            </h3>
            <p className="text-xs text-[#1C1C1C]/75 leading-relaxed font-light">
              Trust is earned through consistent action. As Nara evolves, we will continue investing in stronger security, independent audits, and internationally recognized security standards to protect every customer and every personalized intelligence we build.
            </p>
            <p className="text-xs font-serif font-bold text-[#1C1C1C] italic">
              "Because the future of AI begins with trust."
            </p>
            <div className="pt-8 flex flex-col items-center justify-center select-none space-y-1.5">
              <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#1C1C1C]/40">
                Authorized Document Signature Core
              </span>
              <div className="w-12 h-[1px] bg-[#1C1C1C]/10" />
              <span className="text-[10px] font-mono uppercase text-[#5A5A40] font-bold">
                NARA TRUST & SAFETY COMMITTEE
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
            Acknowledge & Close Document
          </button>
        </div>

      </div>
    </motion.div>
  );
}
