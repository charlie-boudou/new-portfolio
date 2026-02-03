'use client';
export default function FutureProjectList() {
  const projects = ["OPX", "Villa Calm", "Tikok", "Drapo", "Ma plus belle toile", "Memories", "Le Comptoir des Arcs"];

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-12 p-4">
      < div className="relative w-64 h-64 flex items-center justify-center">
        <div className="absolute w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="z-20 p-[2px] rounded-xl bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.5)]">
                <div className="bg-slate-800 p-4 rounded-[10px] flex items-center justify-center">
                    <span className="text-3xl font-bold">{`${"</>"}`}</span>
                </div>
            </div>
            <div className="absolute border-2 border-dotted border-[#CF5CCD] w-full h-[98%] rounded-full" />
            {projects.map((name, i) => (
                <div 
                    key={name}
                    className="absolute bg-slate-800 truncate text-center w-[5rem] p-2 border border-cyan-400 rounded-lg text-[10px] hover:border-cyan-400 transition-colors cursor-pointer shadow-lg shadow-cyan-500/10"
                    style={{
                    transform: `rotate(${i * 60}deg) translate(120px) rotate(-${i * 60}deg)`
                    }}
                >
                    {name}
                </div>
            ))}
      </div>
    </div>
  );
}