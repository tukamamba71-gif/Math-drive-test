import { useState } from 'react'
import Layout from './components/Layout'
import Home from './pages/Home'
import ModulePage from './pages/ModulePage'
import { modules } from './data/modules'
import { useProgress } from './hooks/useProgress'

export default function App() {
  const { progress, record, reset } = useProgress()
  const [currentId, setCurrentId] = useState(null)
  const current = modules.find((m) => m.id === currentId)
  const done = modules.filter((m) => progress[m.id]?.done).length
  return <Layout done={done} total={modules.length} onHome={() => setCurrentId(null)} onReset={reset}>
    {current ? <ModulePage key={current.id} mod={current} onBack={() => setCurrentId(null)} onFinish={(score,total) => record(current.id,score,total)} />
      : <Home modules={modules} progress={progress} onOpen={setCurrentId} />}
  </Layout>
}