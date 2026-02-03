interface IPastWindowButtonProps {
  icon: React.ReactNode;
  handleClick: () => void;
}

export default function PastWindowButton({ icon, handleClick }: IPastWindowButtonProps) {
  return (
    <div
        onClick={handleClick}
        className="bg-[#BCBEBC] w-[1.3rem] h-[1.1rem] pb-[.2rem] flex items-end text-black justify-center border-1 border-gray-300 border-b-[#424242] border-r-[#424242] shadow-[1px_1px_0_0_black,-1px_-1px_0_0_white]"
    >
        {icon}
    </div>
         
  );
}