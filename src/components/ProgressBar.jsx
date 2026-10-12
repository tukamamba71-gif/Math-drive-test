import { motion } from 'framer-motion'
export default function ProgressBar({ value, max, label }) {
  const pct = max ? Math.min(100, Math.round(value / max * 100)) : 0
  return <div className="pb"><div className="pb-track" role="progressbar" aria-valuemin={0} aria-valuemax={max} aria-valuenow={value} aria-label={label}><motion.div className="pb-fill" initial={false} animate={{ width: pct + '%' }} transition={{ duration: .65, ease: [.22, 1, .36, 1] }}/></div>{label && <span className="pb-label">{label}</span>}</div>
}