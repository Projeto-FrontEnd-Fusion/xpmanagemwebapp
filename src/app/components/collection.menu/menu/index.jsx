import Link from "next/link"
import { Telescope ,Code2, Swords} from "lucide-react"
export function MenuSuper(){
  return(
    <>
     <nav className="h-16 items-center justify-center gap-8 flex
        bg-[#011222]
     ">
          <Link className="bg-[#032443] h-10 w-10 rounded-full grid place-content-center" href={"/explore"}><Telescope strokeWidth={1} color="white" /></Link>
          <Link className="bg-[#032443] h-10 w-10 rounded-full grid place-content-center" href={"/wizard"}><Swords strokeWidth={1} color="white" /></Link>
          <Link className="bg-[#032443] h-10 w-10 rounded-full grid place-content-center" href={"/sensi"}><Code2 strokeWidth={1} color="white" /></Link>
        </nav>
    </>
  )
}