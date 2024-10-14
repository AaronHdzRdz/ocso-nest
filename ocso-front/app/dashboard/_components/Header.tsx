import Image from "next/image"

export default function Header() {
    return (
        <div className="w-screen h-[10vh] flex flex-row items-center px-10 bg-[#FEDCE1]">
            <Image src="oxxo-logo.svg" width={100} height={0} alt="Ocso logo" draggable={false}/>
        </div>
    )
}