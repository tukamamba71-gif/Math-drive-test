import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { CheckCircle2, RotateCcw, XCircle, Sparkles } from 'lucide-react'
import { Rich } from './Tex'
import ProgressBar from './ProgressBar'
import { PASS_RATIO } from '../hooks/useProgress'

export default function Quiz({ questions, onFinish, onExit }) {
  const [i, setI] = useState(0), [picked, setPicked] = useState(null), [score, setScore] = useState(0), [finished, setFinished] = useState(false), [attemptedFinish, setAttemptedFinish] = useState(false)
  const total = questions.length, q = questions[i], answered = picked !== null, correct = picked === q.answer, passed = score / total >= PASS_RATIO
  const next = () => {
    if (i + 1 < total) { setI(i + 1); setPicked(null) }
    else { const finalPassed = score / total >= PASS_RATIO; setFinished(true); setAttemptedFinish(true); onFinish(score, total); if (finalPassed) confetti({ particleCount: 105, spread: 72, origin: { y: .68 }, colors: ['#635bff', '#20c997', '#ffbf69', '#ff70a6'] }) }
  }
  const restart = () => { setI(0); setPicked(null); setScore(0); setFinished(false); setAttemptedFinish(false) }
  if (finished) return <motion.div className="panel result-panel" initial={{opacity:0,scale:.96,y:12}} animate={{opacity:1,scale:1,y:0}} transition={{type:'spring',stiffness:240,damping:22}}>
    <div className={'result-orb ' + (passed ? 'success' : 'retry')}>{passed ? <Sparkles size={28}/> : <RotateCcw size={27}/>}</div><div className="eyebrow">{passed ? 'LEVEL SELESAI' : 'SEDIKIT LAGI'}</div><h2>{score} <span>/ {total}</span></h2><p className="result-headline">{passed ? 'Kamu berhasil menyelesaikan modul!' : 'Terus berlatih, kamu pasti bisa.'}</p><p className="muted">{passed ? 'Materi ini sudah tercatat sebagai pencapaianmu. Konsistensi adalah kunci menguasai matematika.' : 'Diperlukan nilai minimal 60% untuk menandai modul selesai. Pelajari kembali pembahasan, lalu coba lagi.'}</p><div className="result-scorebar"><ProgressBar value={score} max={total} label={'Akurasi jawaban ' + Math.round(score / total * 100) + '%'}/></div><div className="row"><button className="btn" onClick={restart}><RotateCcw size={16}/> Coba lagi</button><button className="btn ghost" onClick={onExit}>Kembali ke materi</button></div>
  </motion.div>
  return <motion.div className="panel quiz-panel" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:.25}}>
    <div className="quiz-top"><div><span className="eyebrow">LATIHAN INTERAKTIF</span><h3>Uji pemahamanmu</h3></div><span className="question-count">{i+1}<span> / {total}</span></span></div>
    <ProgressBar value={i + (answered ? 1 : 0)} max={total} label={'Soal ' + (i + 1) + ' dari ' + total}/>
    <p className="question"><Rich text={q.question}/></p>
    <div className="options">{q.options.map((opt, idx) => { let cls = 'option'; if (answered && idx === q.answer) cls += ' correct'; else if (answered && idx === picked) cls += ' wrong'; return <motion.button key={idx} whileHover={!answered?{y:-2}:undefined} whileTap={!answered?{scale:.985}:undefined} animate={answered && idx===picked && !correct ? {x:[0,-5,5,-4,4,0]} : answered && idx===q.answer ? {scale:[1,1.025,1]} : {}} transition={{duration:.28}} className={cls} disabled={answered} onClick={()=>{setPicked(idx);if(idx===q.answer)setScore(s=>s+1)}}><span className="option-letter">{String.fromCharCode(65+idx)}</span><span className="option-text"><Rich text={opt}/></span>{answered && idx===q.answer && <CheckCircle2 size={18}/>}{answered && idx===picked && !correct && <XCircle size={18}/>}</motion.button>})}</div>
    <AnimatePresence>{answered && <motion.div className={'feedback ' + (correct?'ok':'bad')} initial={{opacity:0,y:8,height:0}} animate={{opacity:1,y:0,height:'auto'}} exit={{opacity:0}}><strong>{correct?'Tepat sekali!':'Belum tepat.'}</strong><p><Rich text={q.explanation}/></p></motion.div>}</AnimatePresence>
    {answered && <motion.button className="btn next-btn" initial={{opacity:0,y:5}} animate={{opacity:1,y:0}} onClick={next}>{i+1<total?'Lanjut ke soal berikutnya':'Selesaikan kuis'} <span>→</span></motion.button>}
  </motion.div>
}