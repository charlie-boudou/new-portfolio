'use client';
export default function FutureProjectList() {
  const projects = ["OPX", "Villa Calm", "Tikok", "Drapo"];

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-12 p-4">

      {/* Section Droite : Les Nœuds (Hexagones) */}
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Cercle central Glow */}
        <div className="absolute w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        
        {/* Logo Central */}
        <div className="z-20 p-[2px] rounded-xl bg-gradient-to-br from-cyan-400 to-purple-600 shadow-[0_0_20px_rgba(34,211,238,0.5)]">
           <div className="bg-slate-900 p-4 rounded-[10px] flex items-center justify-center">
              <span className="text-3xl font-bold italic">N</span>
           </div>
        </div>

        {/* Projets satellites */}
        {projects.map((name, i) => (
          <div 
            key={name}
            className="absolute p-2 border border-cyan-500/30 bg-slate-900/80 rounded-lg text-[10px] hover:border-cyan-400 transition-colors cursor-pointer shadow-lg shadow-cyan-500/10"
            style={{
              transform: `rotate(${i * 90}deg) translate(100px) rotate(-${i * 90}deg)`
            }}
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}