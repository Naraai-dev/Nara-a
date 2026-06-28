import { motion } from 'motion/react';
import { Instagram, Facebook, Disc, AlertCircle, ArrowUpRight, Twitter } from 'lucide-react';

interface AboutViewProps {
  setMainTab: (tab: 'philosophy' | 'solutions' | 'trust' | 'integrations' | 'about' | 'simulator') => void;
}

export default function AboutView({ setMainTab }: AboutViewProps) {
  const socialNetworks = [
    {
      name: 'Instagram',
      handle: '@nara_ai_solution',
      url: 'https://instagram.com/nara_ai_solution',
      icon: <Instagram className="text-pink-600" size={20} />
    },
    {
      name: 'Facebook',
      handle: 'Nara Ai',
      url: 'https://facebook.com',
      icon: <Facebook className="text-blue-600" size={20} />
    },
    {
      name: 'Reddit',
      handle: 'u/nara_ai',
      url: 'https://reddit.com/user/nara_ai',
      icon: <Disc className="text-orange-500" size={20} />
    },
    {
      name: 'TikTok',
      handle: '@nara_ai_intel',
      url: 'https://tiktok.com/@nara_ai_intel',
      icon: <AlertCircle className="text-cyan-500" size={20} />
    },
    {
      name: 'X / Twitter',
      handle: '@Naraintelligenc',
      url: 'https://x.com/Naraintelligenc',
      icon: <Twitter className="text-slate-800" size={20} />
    }
  ];

  return (
    <motion.div
      key="about-view"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 space-y-24"
      id="about-section"
    >
      {/* 05 / About Nara - The Meaning of Nara */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 border-b border-[#E3DFD5] pb-16">
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-4">
            <p className="font-mono text-xs tracking-[0.2em] text-[#75736D] uppercase font-bold">
              05 / About Nara
            </p>
            <h1 className="text-4xl md:text-5xl font-serif text-[#1C1C1C] leading-[1.1] font-normal tracking-tight">
              The Meaning<br />
              <span className="italic font-serif">of Nara.</span>
            </h1>
          </div>
          <div className="border border-[#E3DFD5] bg-white p-1.5 rounded-xl shadow-2xs overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800"
              alt="Delicate glowing green plant leaves under soft sunlight representing organic human growth and wisdom"
              className="w-full h-56 object-cover rounded-lg"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6 text-[#605F5A] font-sans text-sm md:text-base leading-relaxed">
          <p className="text-lg md:text-xl font-serif text-[#1C1C1C] italic">
            Nara represents growth, wisdom, and the lifelong journey of becoming.
          </p>
          <p>
            For us, Nara is more than a name—it is a philosophy. It reflects our belief that intelligence should not simply answer questions. It should understand people, grow alongside them, and help them navigate every stage of life with greater confidence, clarity, and purpose.
          </p>
          <p className="font-medium text-[#1C1C1C]">
            That belief inspires everything we build.
          </p>
        </div>
      </div>

      {/* A New Paradigm - Intelligence Designed Around People */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5 space-y-6">
          <span className="font-mono text-xs tracking-widest text-[#75736D] uppercase block font-bold">
            A New Paradigm
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-[#1C1C1C] font-normal leading-tight">
            Intelligence Designed<br />
            <span className="italic font-serif">Around People.</span>
          </h2>
          <blockquote className="border-l-2 border-[#5A5A40] pl-5 italic text-sm text-[#1C1C1C] leading-relaxed py-1">
            "Artificial intelligence is changing the world, but most AI systems are built for everyone in the same way. They are powerful, yet they rarely understand the individual behind each conversation."
          </blockquote>
        </div>

        <div className="lg:col-span-7 space-y-6 text-sm md:text-base text-[#605F5A] leading-relaxed font-sans">
          <p>
            Nara was founded on a different vision. We believe every person deserves intelligence that is uniquely their own—an AI that learns your goals, adapts to your way of thinking, respects your privacy, and becomes more helpful over time.
          </p>
          <p>
            Rather than creating another general-purpose assistant, we are building personalized intelligence designed to support individuals, families, and organizations throughout their unique journeys.
          </p>
        </div>
      </div>

      {/* Mission & Vision Bento Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Mission Card */}
        <div className="bg-white border border-[#E3DFD5] rounded-xl p-8 md:p-10 space-y-4 hover:border-[#5A5A40]/50 transition-all duration-300">
          <span className="font-mono text-[10px] tracking-widest text-[#75736D] uppercase block font-bold">Our Mission</span>
          <h3 className="text-2xl font-serif text-[#1C1C1C] font-normal">Empower the Human Journey</h3>
          <p className="text-sm md:text-base text-[#605F5A] leading-relaxed font-sans pt-2">
            To create personalized artificial intelligence that empowers every human journey through trust, long-term memory, meaningful collaboration, and human-centered design.
          </p>
        </div>

        {/* Vision Card */}
        <div className="bg-white border border-[#E3DFD5] rounded-xl p-8 md:p-10 space-y-4 hover:border-[#5A5A40]/50 transition-all duration-300">
          <span className="font-mono text-[10px] tracking-widest text-[#75736D] uppercase block font-bold">Our Vision</span>
          <h3 className="text-2xl font-serif text-[#1C1C1C] font-normal">Lifelong Context-Bound AI</h3>
          <p className="text-sm md:text-base text-[#605F5A] leading-relaxed font-sans pt-2">
            We envision a future where everyone has access to an AI that truly understands them—not only through prompts, but through long-term relationships built on trust, context, and continuous learning.
          </p>
          <p className="text-xs text-[#75736D] leading-relaxed pt-1">
            Our ambition is to make personalized intelligence as essential and accessible as the internet itself, while ensuring every experience remains secure, private, and entirely centered on the individual.
          </p>
        </div>
      </div>

      {/* Global Presence */}
      <div className="bg-[#FAF9F5] border border-[#E3DFD5] rounded-xl p-8 md:p-12 space-y-8">
        <div className="space-y-3">
          <span className="font-mono text-xs tracking-widest text-[#75736D] uppercase block font-bold">
            Global Presence
          </span>
          <h3 className="text-2xl md:text-3xl font-serif text-[#1C1C1C] font-normal">
            Connect with Nara AI across our verified public intelligence networks
          </h3>
          <p className="text-sm text-[#605F5A] max-w-2xl font-sans leading-relaxed">
            Follow our active nodes for the latest briefings on companion research, system updates, and digital ethics discussions.
          </p>
        </div>

        {/* Social Networks List Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {socialNetworks.map((net) => (
            <a
              key={net.name}
              href={net.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-[#E3DFD5] rounded-lg p-5 flex flex-col justify-between hover:border-[#5A5A40] hover:shadow-sm transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="p-2 bg-[#FAF9F5] border border-[#E3DFD5] rounded-md group-hover:bg-[#5A5A40]/5 transition-colors">
                  {net.icon}
                </div>
                <ArrowUpRight size={14} className="text-[#75736D] group-hover:text-[#1C1C1C] transition-colors" />
              </div>
              <div className="mt-6">
                <span className="text-[10px] font-mono text-[#75736D] uppercase block tracking-wider font-bold">{net.name}</span>
                <span className="text-xs font-sans font-medium text-[#1C1C1C] mt-1 block truncate">{net.handle}</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* CTA To Simulator */}
      <div className="pt-4 flex justify-center">
        <button
          onClick={() => setMainTab('simulator')}
          className="px-10 py-4 bg-[#1C1C1C] hover:bg-[#5A5A40] text-white font-mono text-xs tracking-wider uppercase font-bold transition-all duration-300 rounded active:scale-95 shadow-md cursor-pointer"
        >
          Launch Architecture Simulator &rarr;
        </button>
      </div>
    </motion.div>
  );
}

