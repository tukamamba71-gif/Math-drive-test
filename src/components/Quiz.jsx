import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { CheckCircle2, RotateCcw, XCircle, Sparkles, RefreshCw, Brain, Calculator, Shapes, BookOpen } from 'lucide-react'
import { Rich } from './Tex'
import ProgressBar from './ProgressBar'
import { PASS_RATIO } from '../hooks/useProgress'
import { generateQuiz, generateStoryQuiz } from '../lib/quizGenerator'

export default function Quiz({ questions: initialQuestions = [], topic = 'addition', moduleTitle = 'materi ini', onFinish, onExit, onNextModule }) {
  const [batch, setBatch] = useState(0)
  const [questions, setQuestions] = useState(() => initialQuestions.length ? initialQuestions : [...generateQuiz(topic, 10, 'Dasar'), ...generateStoryQuiz(topic, 10, 'awal')])
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState(null)
  const [score, setScore] = useState(0)
  const [results, setResults] = useState([])
  const [finished, setFinished] = useState(false)
  const [direction, setDirection] = useState(1)
  const total = questions.length, q = questions[i], answered = picked !== null
  const masteryTotal = Math.min(10, total)
  const masteryScore = results.slice(0, masteryTotal).filter(Boolean).length
  const passed = masteryTotal > 0 && masteryScore === masteryTotal
  const TopicIcon = ['perimeter','area','volume','composite','trig','functions','limits'].includes(topic) ? Shapes : ['variable','likeTerms','algebraMultiply','linear'].includes(topic) ? BookOpen : topic === 'word' ? Brain : Calculator
  const correct = picked === q.answer
  const next = () => {
    if (i + 1 < total) { setDirection(1); setI(v => v + 1); setPicked(null) }
    else {
      const finalPassed = masteryTotal > 0 && results.slice(0, masteryTotal).filter(Boolean).length === masteryTotal
      setFinished(true); onFinish(score, total, results.slice(0, masteryTotal).filter(Boolean).length, masteryTotal)
      if (finalPassed) confetti({ particleCount: 55, spread: 55, origin: { y: .72 }, colors: ['#b85f43', '#438263', '#d9a441'] })
    }
  }
  const newPractice = () => {
    const nextBatch = batch + 1
    setBatch(nextBatch); setQuestions([...generateQuiz(topic, 10, nextBatch % 3 === 0 ? 'HOTS / Penalaran' : nextBatch % 2 ? 'Dasar' : 'Menengah', String(nextBatch)), ...generateStoryQuiz(topic, 10, String(nextBatch))])
    setI(0); setPicked(null); setScore(0); setResults([]); setFinished(false); setDirection(1)
  }
  const restart = () => { setI(0); setPicked(null); setScore(0); setResults([]); setFinished(false); setDirection(-1) }
  if (!q || !Array.isArray(q.options) || q.options.length < 2) return <div className="panel"><h3>Soal belum tersedia</h3><p>Generator belum menghasilkan soal untuk materi ini.</p><button className="btn" onClick={newPractice}>Generate soal lagi</button></div>
  if (finished) return <motion.div className="panel result-panel" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:.2,ease:'easeOut'}}>
    <div className={'result-orb ' + (passed ? 'success' : 'retry')}>{passed ? <Sparkles size={25}/> : <RotateCcw size={24}/>}</div>
    <div className="eyebrow">{passed ? 'SELESAI' : 'COBA LAGI'}</div><h2>{score} <span>/ {total}</span></h2>
    <p className="result-headline">{passed ? 'Bagus, kamu sudah memahami materi ini.' : 'Belum berhasil kali ini. Tidak apa-apa.'}</p>
    <p className="muted">{passed ? 'Penguasaan konsep mencapai 100% pada 10 soal pertama. Soal cerita adalah latihan penerapan tambahan.' : 'Target penguasaan adalah 10/10 pada soal pemahaman. Soal cerita digunakan untuk latihan penerapan dan tetap memiliki koreksi.'}</p>
    <div className="result-scorebar"><ProgressBar value={score} max={total} label={'Jawaban benar ' + Math.round(score / total * 100) + '%'}/></div>
    <div className="row"><button className="btn" onClick={newPractice}><RefreshCw size={16}/> Latihan Soal Baru</button><button className="btn ghost" onClick={restart}><RotateCcw size={16}/> Ulangi set ini</button><button className="btn ghost" onClick={onExit}>Kembali ke materi</button>{passed&&onNextModule&&<button className="btn" onClick={onNextModule}>Materi berikutnya <span>→</span></button>}</div>
  </motion.div>
  return <motion.div className="panel quiz-panel" initial={{opacity:0,y:4}} animate={{opacity:1,y:0}} transition={{duration:.18,ease:'easeOut'}}>
    <div className="quiz-top"><div className="quiz-topic-title"><span className="quiz-topic-icon"><TopicIcon size={18}/></span><div><span className="eyebrow">{i < 10 ? 'PEMAHAMAN MATERI' : 'SOAL CERITA'}</span><h3>{moduleTitle}</h3></div></div><span className="question-count">{i+1}<span> / {total}</span></span></div>
    <div className="quiz-badges"><span className="difficulty-badge">{q.difficulty || 'Dasar'}</span><span className="pattern-badge">{q.pattern || 'Latihan konsep'}</span></div>
    <ProgressBar value={i + (answered ? 1 : 0)} max={total} label={i < 10 ? 'Latihan pemahaman ' + (i + 1) + ' dari 10' : 'Soal cerita ' + (i - 9) + ' dari 10'}/>
    <AnimatePresence mode="wait" initial={false} custom={direction}><motion.div key={q.id || i} className="quiz-question-stage" custom={direction} initial={d => ({opacity:0,x:d > 0 ? 16 : -16})} animate={{opacity:1,x:0}} exit={d => ({opacity:0,x:d > 0 ? -12 : 12})} transition={{duration:.19,ease:[.22,.61,.36,1]}}>
      <p className="question"><Rich text={q.question}/></p>
      <div className="options">{q.options.map((opt, idx) => {let cls='option';if(answered&&idx===q.answer)cls+=' correct';else if(answered&&idx===picked)cls+=' wrong';return <motion.button key={idx} whileHover={!answered?{y:-1}:undefined} whileTap={!answered?{scale:.995}:undefined} animate={answered&&idx===picked&&!correct?{x:[0,-3,3,-2,2,0]}:{}} transition={{duration:.22}} className={cls} disabled={answered} onClick={()=>{setPicked(idx);setResults(prev=>{const next=[...prev];next[i]=idx===q.answer;return next});if(idx===q.answer)setScore(s=>s+1)}}><span className="option-letter">{String.fromCharCode(65+idx)}</span><span className="option-text"><Rich text={opt}/></span>{answered&&idx===q.answer&&<CheckCircle2 size={18} />}{answered&&idx===picked&&!correct&&<XCircle size={18}/>}</motion.button>})}</div>
      <AnimatePresence initial={false}>{answered&&<motion.div className={'feedback '+(correct?'ok':'bad')} initial={{opacity:0,y:5,height:0,marginTop:0}} animate={{opacity:1,y:0,height:'auto',marginTop:14}} exit={{opacity:0,y:-3,height:0,marginTop:0}} transition={{duration:.17,ease:'easeOut'}}><strong>{correct?'Benar!':'Belum tepat.'}</strong>{!correct&&<p className="answer-correction"><strong>Jawaban yang benar: </strong><Rich text={q.options[q.answer]}/></p>}<p><Rich text={q.explanation}/></p></motion.div>}</AnimatePresence>
      {answered&&<motion.button className="btn next-btn" initial={{opacity:0,y:4}} animate={{opacity:1,y:0}} transition={{duration:.14}} onClick={next}>{i+1<total?'Soal berikutnya':'Lihat hasil'} <span>→</span></motion.button>}
    </motion.div></AnimatePresence>
  </motion.div>
}
