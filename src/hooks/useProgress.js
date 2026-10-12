import {useState,useEffect,useCallback} from 'react'
const KEY='matematikaku:progress:v1'
export const PASS_RATIO=.6
const load=()=>{try{return JSON.parse(localStorage.getItem(KEY))||{}}catch{return {}}}
export function useProgress(){
 const [progress,setProgress]=useState(load)
 useEffect(()=>{try{localStorage.setItem(KEY,JSON.stringify(progress))}catch{}},[progress])
 const record=useCallback((id,score,total)=>setProgress(prev=>{const old=prev[id];return {...prev,[id]:{best:Math.max(old?.best??0,score),total,done:Boolean(old?.done)||score/total>=PASS_RATIO}}}),[])
 const reset=useCallback(()=>setProgress({}),[])
 return {progress,record,reset}
}