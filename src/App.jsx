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
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('matematikaku:theme') || 'light' } catch { return 'light' }
  })
  const current = modules.find((m) => m.id === currentId)
  const done = modules.filter((m) => progress[m.id]?.done).length
  const openModule = useCallback((id) => setCurrentId(id), [])
  const toggleTheme = () => setTheme((old) => {
    const next = old === 'light' ? 'dark' : 'light'
    try { localStorage.setItem('matematikaku:theme', next) } catch {}
    return next
  })
  const page = useMemo(() => current
    ? <ModulePage key={current.id} mod={current} onBack={() => setCurrentId(null)} onFinish={(score, total) => record(current.id, score, total)} />
    : <Home modules={modules} progress={progress} streak={streak} badges={badges} onOpen={openModule} />, [current, progress, streak, badges, openModule, record])
  return <div data-theme={theme} className="theme-root">
    <Layout done={done} total={modules.length} modules={modules} progress={progress} streak={streak} badges={badges}
      onHome={() => setCurrentId(null)} onOpen={openModule} onReset={reset} theme={theme} onToggleTheme={toggleTheme}>
      <AnimatePresence mode="wait"><motion.div key={currentId || 'home'} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .22, ease: 'easeOut' }}>{page}</motion.div></AnimatePresence>
    </Layout>
  </div>
}