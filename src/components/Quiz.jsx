import {useState} from 'react'
import {Rich} from './Tex'
import ProgressBar from './ProgressBar'
import {PASS_RATIO} from '../hooks/useProgress'
export default function Quiz({questions,onFinish,onExit}){
 const [i,setI]=useState(0),[picked,setPicked]=useState(null),[score,setScore]=useState(0),[finished,setFinished]=useState(false)
 const total=questions.length,q=questions[i],answered=picked!==null,correct=picked===q.answer
 const next=()=>{if(i+1<total){setI(i+1);setPicked(null)}else{setFinished(true);onFinish(score,total)}}
 const restart=()=>{setI(0);setPicked(null);setScore(0);setFinished(false)}
 if(finished)return <div className="panel result"><h2>{score} dari {total} benar</h2><p>{score/total>=PASS_RATIO?'Lulus! Modul berikutnya sudah terbuka.':'Belum lulus (minimal 60%). Coba lagi.'}</p><div className="row"><button className="btn" onClick={restart}>Ulangi kuis</button><button className="btn ghost" onClick={onExit}>Kembali</button></div></div>
 return <div className="panel"><ProgressBar value={i+(answered?1:0)} max={total} label={'Soal '+(i+1)+' dari '+total}/><p className="question"><Rich text={q.question}/></p><div className="options">{q.options.map((opt,idx)=>{let cls='option';if(answered&&idx===q.answer)cls+=' correct';else if(answered&&idx===picked)cls+=' wrong';return <button key={idx} className={cls} disabled={answered} onClick={()=>{setPicked(idx);if(idx===q.answer)setScore(s=>s+1)}}><Rich text={opt}/></button>})}</div>{answered&&<><div className={'feedback '+(correct?'ok':'bad')}><strong>{correct?'Benar!':'Kurang tepat.'}</strong> <Rich text={q.explanation}/></div><button className="btn" onClick={next}>{i+1<total?'Soal berikutnya':'Lihat hasil'}</button></>}</div>
}