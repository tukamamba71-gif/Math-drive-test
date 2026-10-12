import { useEffect, useState } from 'react'
import { Compass, Shield, Moon } from 'lucide-react'

export const REALMS = {
  grandLine: { label: 'Grand Line Realm', description: 'Emas dan biru samudra', theme: 'light', accent: 'ocean', icon: Compass },
  surveyCorps: { label: 'Survey Corps Realm', description: 'Hijau dan bumi militer', theme: 'light', accent: 'forest', icon: Shield },
  eclipse: { label: 'Eclipse Realm', description: 'Gelap, besi, dan merah', theme: 'dark', accent: 'rose', icon: Moon },
}

export default function ThemeSwitcher({ value, onChange }) {
  const [selected, setSelected] = useState(value || 'grandLine')
  useEffect(() => { setSelected(value || 'grandLine') }, [value])
  const choose = (id) => {
    if (!REALMS[id]) return
    setSelected(id)
    try { localStorage.setItem('matematikaku:realm', id) } catch {}
    onChange?.(id, REALMS[id])
  }
  return <div className="realm-switcher" role="group" aria-label="Pilih tema petualangan">
    {Object.entries(REALMS).map(([id, realm]) => {
      const Icon = realm.icon
      return <button key={id} type="button" className={'realm-option ' + (selected === id ? 'selected' : '')} aria-pressed={selected === id} onClick={() => choose(id)} title={realm.description}>
        <Icon size={15} aria-hidden="true" /><span>{realm.label}</span>{selected === id && <span className="realm-check" aria-hidden="true">✓</span>}
      </button>
    })}
  </div>
}
