'use client';

interface IFutureFrameProps {
    children: React.ReactNode;
}
export default function FutureFrame({children}: IFutureFrameProps) {
  return (
    <div className="relative p-8 min-h-[400px] w-full max-w-4xl mx-auto">
      {/* SVG de fond pour la forme complexe */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
      >
        {/* Fond sombre translucide */}
        <path 
          d="M 10,0 L 85,0 L 100,15 L 100,85 L 90,100 L 15,100 L 0,85 L 0,15 Z" 
          fill="rgba(15, 23, 42, 0.6)"
          className="backdrop-blur-xl"
        />
        
        {/* Bordure principale Cyan */}
        <path 
          d="M 10,0 L 85,0 L 100,15 L 100,85 L 90,100 L 15,100 L 0,85 L 0,15 Z" 
          fill="none" 
          stroke="#22d3ee" 
          strokeWidth="0.5" 
          vectorEffect="non-scaling-stroke"
          className="opacity-50"
        />

        {/* Détails d'angles (Double lignes) */}
        <path d="M 0,30 L 0,15 L 15,0 L 40,0" fill="none" stroke="#22d3ee" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        <path d="M 60,100 L 90,100 L 100,90 L 100,70" fill="none" stroke="#22d3ee" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        
        {/* Éléments décoratifs (petits blocs) */}
        <rect x="80" y="0" width="5" height="1" fill="#22d3ee" vectorEffect="non-scaling-stroke" />
        <rect x="0" y="80" width="1" height="10" fill="#22d3ee" vectorEffect="non-scaling-stroke" />
        
        {/* Scan line décorative sur le côté */}
        <line x1="102" y1="20" x2="102" y2="50" stroke="#f43f5e" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      </svg>

      {/* Contenu interne */}
      <div className="relative z-10 font-mono text-cyan-400">
        {children}
      </div>
    </div>
  );
}