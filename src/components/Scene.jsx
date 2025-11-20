import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

// Lightweight canvas-based parallax scene (placeholder for Three.js)
export default function Scene({ sessionId, onEvent }) {
  const canvasRef = useRef(null)
  const [lights, setLights] = useState([...Array(20)].map(()=>({x: Math.random()*1, y: Math.random()*1, s: 0.4+Math.random()*1.2})))

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf

    function resize(){
      const dpr = window.devicePixelRatio || 1
      canvas.width = canvas.clientWidth * dpr
      canvas.height = canvas.clientHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    function draw(t){
      ctx.clearRect(0,0,canvas.width,canvas.height)
      const w = canvas.clientWidth
      const h = canvas.clientHeight

      // gradient sky
      const g = ctx.createLinearGradient(0,0,0,h)
      g.addColorStop(0,'#0f172a')
      g.addColorStop(1,'#111827')
      ctx.fillStyle = g
      ctx.fillRect(0,0,w,h)

      // distant mountains
      ctx.fillStyle = '#0b1220'
      ctx.beginPath()
      ctx.moveTo(0, h*0.7)
      for(let x=0; x<=w; x+=40){
        const y = h*0.7 - 40*Math.sin((x+t*0.0002)/60)
        ctx.lineTo(x,y)
      }
      ctx.lineTo(w,h)
      ctx.lineTo(0,h)
      ctx.closePath()
      ctx.fill()

      // fireflies
      ctx.fillStyle = 'rgba(56,189,248,0.85)'
      lights.forEach((L,i)=>{
        const x = (L.x*w + (Math.sin(t*0.001 + i)*20))
        const y = (L.y*h + (Math.cos(t*0.0012 + i)*12))
        ctx.beginPath(); ctx.arc(x,y, L.s, 0, Math.PI*2); ctx.fill()
      })

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [lights])

  // interactions -> send events
  const send = async (type, payload={}) => {
    onEvent?.(type)
    try{
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/interaction`,{
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ session_id: sessionId, type, ...payload })
      })
    }catch{}
  }

  return (
    <div className="relative w-full h-[60vh] md:h-[70vh] rounded-3xl overflow-hidden border border-blue-500/20">
      <canvas ref={canvasRef} className="w-full h-full block" onClick={()=>send('light_collect',{intensity:1+Math.random()*2})} />
      <motion.div
        onClick={()=>send('companion_tap',{intensity:1})}
        className="absolute bottom-6 right-6 px-4 py-2 rounded-xl bg-sky-500/90 text-white text-sm shadow-lg cursor-pointer"
        whileHover={{scale:1.03}} whileTap={{scale:0.97}}
      >
        Reiseführer: Hier entlang →
      </motion.div>
      <motion.div
        onMouseEnter={()=>send('cloud_touch',{intensity:0.8})}
        className="absolute top-6 left-6 px-3 py-1.5 rounded-xl bg-white/10 text-blue-100 text-xs border border-white/10"
      >
        Wolken der Schwere
      </motion.div>
    </div>
  )
}
