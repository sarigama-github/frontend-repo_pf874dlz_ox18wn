import { useEffect, useState } from 'react'

export default function TeaOasis({ sessionId }) {
  const [teas, setTeas] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(()=>{
    (async()=>{
      try{
        setLoading(true)
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/analyze`,{
          method:'POST', headers:{'Content-Type':'application/json'},
          body: JSON.stringify({ session_id: sessionId })
        })
        const data = await res.json()
        const detailed = await Promise.all(
          data.teas.map(async slug => {
            const r = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tea/${slug}`)
            return await r.json()
          })
        )
        setTeas(detailed)
      }catch(e){ setError('Fehler bei der Analyse.'); }
      finally{ setLoading(false) }
    })()
  }, [sessionId])

  if (loading) return <div className="text-blue-100">Die Oase erscheint ...</div>
  if (error) return <div className="text-red-200">{error}</div>

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {teas.map(t => (
        <div key={t.slug} className="bg-slate-800/60 border border-blue-500/20 rounded-2xl p-4">
          <div className="text-blue-200 text-sm">{t.latin}</div>
          <div className="text-white font-semibold text-lg">{t.name}</div>
          <div className="mt-2 text-blue-100/90 text-sm">{t.description}</div>
          <div className="mt-3 text-xs text-blue-300">Zubereitung: {t.preparation}</div>
          {t.contraindications?.length > 0 && (
            <div className="mt-3 text-xs text-amber-300">Kontraindikationen: {t.contraindications.join(', ')}</div>
          )}
        </div>
      ))}
    </div>
  )
}
