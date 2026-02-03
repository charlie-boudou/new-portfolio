'use client';

interface IPastButtonProps {
    title: string;
    handleClick?: () => void;
    main?: boolean;
}

export default function PastButton({title, handleClick, main}: IPastButtonProps) {
    return (
        <button
            className={`
                bg-[#BCBEBC] 
                text-black 
                flex 
                items-center 
                justify-center
                px-[1.5rem] py-[.2rem] outline-none
                border-t-[1.5px] border-t-white
                border-l-[1.5px] border-l-white
                ${main ? 'border-r-[1.5px] border-r-black border-b-[1.5px] border-b-black' : 'border-r-[1.5px] border-r-[#7C7A7C] border-b-[1.5px] border-b-[#7C7A7C]'}
                ${main ? 'shadow-[1px_1px_1px_1px_black,inset_-1px_-1px_0_0_#BCBEBC]' : 'shadow-[1px_1px_0_0_black,inset_-1px_-1px_0_0_#BCBEBC]'}
            `}
            onClick={handleClick}
        >
            {title}
        </button>
    );
}