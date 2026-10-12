import { useCallback, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Layout from './components/Layout'
import Home from './pages/Home'
import ModulePage from './pages/ModulePage'
import { modules, getModuleById, getNextModule } from './data/modules'
import { useProgress } from './hooks/useProgress'
import { REALMS } from './components/ThemeSwitcher'

export default function App() {
  const { progress, record, reset, streak, badges } = useProgress()
  const [currentId, setCurrentId] = useState(null)
  const [realm, setRealm] = useState(() => { try { return localStorage.getItem('matematikaku:realm') || 'grandLine' } catch { return 'grandLine' } })
  const theme = REALMS[realm]?.theme || 'light'
  const accent = REALMS[realm]?.accent || 'ocean'
  const changeRealm = value => { if (!REALMS[value]) return; setRealm(value); try { localStorage.setItem('matematikaku:realm', value); localStorage.setItem('matematikaku:theme', REALMS[value].theme); localStorage.setItem('matematikaku:accent', REALMS[value].accent) } catch {} }
  const current = getModuleById(currentId) ?? null
  const done = modules.filter(m => progress[m.id]?.done).length
  const openModule = useCallback(id => { const index = modules.findIndex(m => (m.id === id || m.slug === id)); if (index < 0) { setCurrentId(null); return } if (index > 0 && !progress[modules[index - 1]?.id]?.done) return; setCurrentId(modules[index].id) }, [progress])
  const openNextModule = useCallback(() => {
    const active = modules.find(m => m?.id === currentId)
    const nextId = active?.nextId ?? active?.nextModuleId ?? null
    const next = nextId ? modules.find(m => m?.id === nextId || m?.slug === nextId) : null
    // Tombol ini hanya tersedia setelah 10/10 soal pemahaman; jangan bergantung
    // pada waktu pembaruan local state progress untuk melakukan navigasi.
    if (next) setCurrentId(next.id)
    else setCurrentId(null)
  }, [currentId])
  const page = useMemo(() => current
    ? <ModulePage key={current.id} mod={current} onBack={() => setCurrentId(null)} onFinish={(score, total, masteryScore, masteryTotal) => record(current.id, score, total, masteryScore, masteryTotal)} onNextModule={openNextModule} />
    : <Home modules={modules} progress={progress} streak={streak} badges={badges} onOpen={openModule} />, [current, progress, streak, badges, openModule, openNextModule, record])
  return <div data-theme={theme} data-accent={accent} className="theme-root">
    <Layout done={done} total={modules.length} modules={modules} progress={progress} streak={streak} badges={badges}
      onHome={() => setCurrentId(null)} onOpen={openModule} onReset={reset} theme={theme} realm={realm} onRealmChange={changeRealm}
      accent={accent} onAccentChange={changeRealm}>
      <AnimatePresence mode="wait"><motion.div key={currentId || 'home'} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: .16, ease: 'easeOut' }}>{page}</motion.div></AnimatePresence>
    </Layout>
  </div>
}