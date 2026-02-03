import FutureProjectsList from "../../components/2077/FutureProjectsList";

export default function FutureHome() {
  return (
    <div className="w-full h-screen p-[1rem] future-font">
      <div className="w-full h-full border-2 border-[#22d3ee] flex items-center justify-center">
        {/*<div className="border-2 border-[#22d3ee] w-[20%] h-[30%]">about me</div>*/}
        <div className="relative w-[28%] h-[40%] flex items-center justify-center p-[2px] rounded-full bg-gradient-to-b from-cyan-400 to-purple-600">
          <div className="bg-[#050505] w-full h-full rounded-full p-[1rem] text-white flex items-center justify-center">
            <FutureProjectsList />
          </div>
        </div>
      </div>
    </div>
  );
}