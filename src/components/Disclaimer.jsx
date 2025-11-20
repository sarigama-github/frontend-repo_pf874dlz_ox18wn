import { useEffect, useState } from 'react'

export default function Disclaimer({ onAccept }) {
  const [text, setText] = useState('')
  const [note, setNote] = useState('')
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/disclaimer`)
        const data = await res.json()
        setText(data.disclaimer)
        setNote(data.expert_note)
      } catch (e) {
        setText('Diese Anwendung ist kein medizinisches Gerät...')
      }
    }
    load()
  }, [])

  return (
    <div className="bg-slate-800/60 border border-blue-500/20 rounded-2xl p-6">
      <p className="text-blue-100/90 text-sm leading-relaxed">{text}</p>
      <p className="text-blue-200/80 text-xs mt-3">{note}</p>
      <div className="mt-4 flex items-center gap-3">
        <input id="consent" type="checkbox" checked={checked} onChange={(e)=>setChecked(e.target.checked)} className="accent-blue-500" />
        <label htmlFor="consent" className="text-blue-100/90 text-sm">Ich habe den Hinweis gelesen und stimme zu.</label>
      </div>
      <button
        disabled={!checked}
        onClick={onAccept}
        className="mt-4 px-4 py-2 rounded-lg bg-emerald-500/90 text-white disabled:opacity-50"
      >
        Zustimmen und fortfahren
      </button>
    </div>
  )
}
