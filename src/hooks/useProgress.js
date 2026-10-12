import { useState, useEffect, useCallback } from 'react'
const KEY='matematikaku:progress:v2'
const LEGACY_KEY='matematikaku:progress:v1'
export const PASS_RATIO=1
const today=()=>new Date().toLocaleDateString('sv-SE')
const yesterday=()=>{const d=new Date();d.setDate(d.getDate()-1);return d.toLocaleDateString('sv-SE')}
const load=()=>{try{const newer=localStorage.getItem(KEY);if(newer)return JSON.parse(newer);const old=JSON.parse(localStorage.getItem(LEGACY_KEY)||'{}');return old||{}}catch{return {}}}
const calcBadges=(p)=>{const ids=Object.keys(p).filter(k=>k!=='_meta'&&p[k]?.done),all=Object.keys(p).filter(k=>k!=='_meta').map(k=>p[k]);const badges=[];if(ids.length>=1)badges.push('first');if(ids.length>=3)badges.push('three');if(all.some(x=>x.total>0&&x.best===x.total))badges.push('perfect');return badges}
export function useProgress(){
  const [progress,setProgress]=useState(load)
  useEffect(()=>{try{localStorage.setItem(KEY,JSON.stringify(progress))}catch{}},[progress])
  const meta=progress._meta||{}, streak=meta.streak||0, badges=calcBadges(progress)
  const record=useCallback((id,score,total)=>setProgress(prev=>{
    const old=prev[id],day=today(),prior=prev._meta||{},nextStreak=prior.lastDay===day?(prior.streak||1):prior.lastDay===yesterday()?(prior.streak||0)+1:1
    return {...prev,[id]:{best:Math.max(old?.best??0,score),total,done:Boolean(old?.done)||score/total>=PASS_RATIO,lastScore:score},_meta:{...prior,lastDay:day,streak:nextStreak,attempts:(prior.attempts||0)+1}}
  }),[])
  const reset=useCallback(()=>{setProgress({});try{localStorage.removeItem(KEY);localStorage.removeItem(LEGACY_KEY)}catch{}},[])
  return {progress,record,reset,streak,badges}
}