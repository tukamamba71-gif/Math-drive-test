import { useCallback, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Layout from './components/Layout'
import Home from './pages/Home'
import ModulePage from './pages/ModulePage'
import { modules } from './data/modules'
import { useProgress } from './hooks/useProgress'

export default function App() {
  const { progress, record, reset, streak, badges } = useProgress()
  const [currentId, setCurrentId] = useState(null)
  const [theme, setTheme] = useState(() => { try { return localStorage.getItem('matematikaku:theme') || 'light' } catch { return 'light' } })
  const [accent, setAccent] = useState(() => { try { return localStorage.getItem('matematikaku:accent') || 'terracotta' } catch { return 'terracotta' } })
  const current = modules.find(m => m.id === currentId)
  const done = modules.filter(m => progress[m.id]?.done).length
  const openModule = useCallback(id => { const index = modules.findIndex(m => m.id === id); if (index > 0 && !progress[modules[index - 1].id]?.done) return; setCurrentId(id) }, [progress])
  const openNextModule = useCallback(() => { const index = modules.findIndex(m => m.id === currentId); const next = modules[index + 1]; if (next && progress[currentId]?.done) setCurrentId(next.id); else setCurrentId(null) }, [currentId, progress])
  const toggleTheme = () => setTheme(old => {
    const next = old === 'light' ? 'dark' : 'light'
    try { localStorage.setItem('matematikaku:theme', next) } catch {}
    return next
  })
  const changeAccent = value => {
    setAccent(value)
    try { localStorage.setItem('matematikaku:accent', value) } catch {}
  }
  const page = useMemo(() => current
    ? <ModulePage key={current.id} mod={current} onBack={() => setCurrentId(null)} onFinish={(score, total, masteryScore, masteryTotal) => record(current.id, score, total, masteryScore, masteryTotal)} onNextModule={openNextModule} />
    : <Home modules={modules} progress={progress} streak={streak} badges={badges} onOpen={openModule} />, [current, progress, streak, badges, openModule, openNextModule, record])
  return <div data-theme={theme} data-accent={accent} className="theme-root">
    <Layout done={done} total={modules.length} modules={modules} progress={progress} streak={streak} badges={badges}
      onHome={() => setCurrentId(null)} onOpen={openModule} onReset={reset} theme={theme} onToggleTheme={toggleTheme}
      accent={accent} onAccentChange={changeAccent}>
      <AnimatePresence mode="wait"><motion.div key={currentId || 'home'} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: .16, ease: 'easeOut' }}>{page}</motion.div></AnimatePresence>
    </Layout>
  </div>
}