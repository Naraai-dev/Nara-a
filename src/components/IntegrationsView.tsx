import { motion } from 'motion/react';

interface IntegrationsViewProps {
  setMainTab: (tab: 'philosophy' | 'solutions' | 'trust' | 'integrations' | 'about' | 'simulator') => void;
  setActiveTab: (tab: 'profile' | 'evolution' | 'integrations' | 'vault' | 'booking' | 'variables') => void;
  connectedServices: string[];
  services: { name: string; icon: string; desc: string }[];
}

export default function IntegrationsView({ setMainTab, setActiveTab, connectedServices, services }: IntegrationsViewProps) {
  return (
    <motion.div
      key="integrations-view"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24"
      id="integrations-section"
    >
      <div className="space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-3">
            <p className="font-mono text-xs tracking-[0.2em] text-[#75736D] uppercase font-bold">
              04 / Workspace Bridges
            </p>
            <h2 className="text-3xl md:text-5xl font-serif text-[#1C1C1C] font-normal tracking-tight">
              Seamless API Hub
            </h2>
            <p className="text-[#605F5A] max-w-2xl text-sm md:text-base leading-relaxed">
              Link Nara to your workspace tools to pool context, coordinate drafts, synchronize calendar digests, and build custom automated workflows.
            </p>
          </div>
          <div className="lg:col-span-5 border border-[#E3DFD5] bg-white p-1.5 rounded-xl shadow-2xs overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&q=80&w=800"
              alt="Sleek geometric lines and structures symbolizing unified API integrations and workspace bridges"
              className="w-full h-40 object-cover rounded-lg"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((srv) => {
            const isConnected = connectedServices.includes(srv.name);
            return (
              <div key={srv.name} className={`bg-white border p-6 flex flex-col justify-between transition-all duration-300 ${isConnected ? 'border-[#5A5A40] bg-[#5A5A40]/5' : 'border-[#E3DFD5] hover:border-[#5A5A40]/50'}`}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{srv.icon}</span>
                    <span className={`text-[9px] font-mono tracking-wider font-semibold uppercase px-2 py-0.5 rounded ${isConnected ? 'bg-[#5A5A40] text-white' : 'bg-[#E3DFD5] text-[#605F5A]'}`}>
                      {isConnected ? 'Bridge Active' : 'Disconnected'}
                    </span>
                  </div>
                  <h3 className="text-lg font-serif text-[#1C1C1C] font-medium">{srv.name}</h3>
                  <p className="text-xs text-[#605F5A] leading-relaxed">{srv.desc}</p>
                </div>
                <div className="pt-6 border-t border-[#FAF9F5] mt-6">
                  <button
                    onClick={() => {
                      setMainTab('simulator');
                      setActiveTab('integrations');
                    }}
                    className="text-xs font-mono text-[#1C1C1C] font-semibold hover:underline cursor-pointer"
                  >
                    {isConnected ? 'Disconnect Bridge' : 'Connect Workspace &rarr;'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
