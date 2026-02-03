const CyberCard = () => {
  return (
    <div className="relative p-1 group w-80 h-48">
      {/* Conteneur principal avec clip-path pour les coins coupés */}
      <div 
        className="relative w-full h-full bg-slate-800/80 backdrop-blur-sm flex items-center justify-center border border-cyan-400/30 overflow-hidden"
        style={{
          clipPath: "polygon(15% 0, 100% 0, 100% 85%, 85% 100%, 0 100%, 0 15%)"
        }}
      >
        {/* Grille de fond subtile */}
        <div className="absolute inset-0 opacity-10" 
             style={{ backgroundImage: 'linear-gradient(#4ade80 1px, transparent 1px), linear-gradient(90deg, #4ade80 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
        </div>

        {/* Contenu de la carte */}
        <div className="z-10 text-cyan-400 font-mono">
          {"CYBER_DATA_01"}
        </div>
      </div>

      {/* --- ÉLÉMENTS DE BORDURE DÉCORATIFS --- */}

      {/* Bordure externe double à gauche (haut) */}
      <div className="absolute top-0 left-0 w-8 h-16 border-l-2 border-cyan-400 transform -translate-x-1" />
      <div className="absolute top-4 left-2 w-1 h-12 border-l border-cyan-400/50" />

      {/* Angle coupé en haut à gauche */}
      <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-cyan-400" 
           style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)", transform: 'rotate(0deg)' }} />

      {/* Bordure double à droite (bas) */}
      <div className="absolute bottom-0 right-0 w-8 h-16 border-r-2 border-cyan-400 transform translate-x-1" />
      <div className="absolute bottom-4 right-2 w-1 h-12 border-r border-cyan-400/50" />

      {/* Angle coupé en bas à droite */}
      <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-cyan-400" 
           style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }} />
           
      {/* Lignes fines horizontales */}
      <div className="absolute top-0 left-[15%] right-0 h-[2px] bg-cyan-400" />
      <div className="absolute bottom-0 left-0 right-[15%] h-[2px] bg-cyan-400" />
    </div>
  );
};

export default CyberCard;