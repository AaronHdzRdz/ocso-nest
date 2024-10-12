import { useEffect, useState } from "react"

export default function Effect() {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    
    function handleMouseMove(e: MouseEvent) {
        setPosition({ x: e.clientX, y: e.clientY })
    }
    
    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove)
        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
        }
    }, [])
    
    return (
        <div style={{
            position: "absolute",
            backgroundColor: "red",
            opacity: 0.5,
            transform: `translateX(${position.x}px) translateY(${position.y}px)`,
            height: 30,
            width: 30,
            top: 0,
            bottom: 0,
            left:-20,
            borderRadius: "50%"
        }}/>
    )
}