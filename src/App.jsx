import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import Disclaimer from './components/Disclaimer'
import Scene from './components/Scene'
import Guide from './components/Guide'
import TeaOasis from './components/TeaOasis'

function App() {
  const [sessionId, setSessionId] = useState('')
  const [accepted, setAccepted] = useState(false)
  const [step, setStep] = useState(0)

  useEffect(()=>{
    async function boot(){
      try{
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/session`,{ method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ locale: 'de' }) })
        const data = await res.json()
        setSessionId(data.session_id)
      }catch{}
    }
    boot()
  }, [])

  const accept = async () => {
    try{
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/consent`,{ method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ session_id: sessionId, accepted: true }) })
      setAccepted(true)
      setStep(1)
    }catch{}
  }

  const onSceneEvent = (type) => {
    if(type === 'companion_tap') setStep(s=>Math.min(2, s+1))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-blue-100">
      <div className="relative max-w-6xl mx-auto px-4 py-10">
        {!accepted ? (
          <>
            <Hero onStart={()=>setStep(0)} />
            <div className="max-w-3xl mx-auto mt-8">
              <Disclaimer onAccept={accept} />
            </div>
          </>
        ) : (
          <>
            <Scene sessionId={sessionId} onEvent={onSceneEvent} />
            <Guide step={step} onTap={()=>setStep(s=>s+1)} />
            {step >= 2 && (
              <div className="mt-10">
                <h2 className="text-white text-2xl font-semibold mb-3">Teepflanzen-Oase</h2>
                <TeaOasis sessionId={sessionId} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default App
