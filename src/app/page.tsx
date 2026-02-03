import ChoiceCard from "@/components/home/ChoiceCard"
import LanguageSwitch from "@/components/home/LanguageSwitch"
export default function Home() {

  return (
    <div className={`w-full h-screen max-h-screen p-[1rem] bg-[url('/images/homeBackground.png')] bg-auto md:bg-cover bg-center bg-no-repeat`}>
      <LanguageSwitch />
      <div className="flex items-center w-full h-[90%]">
        <ChoiceCard />
      </div>
    </div>
  )
}