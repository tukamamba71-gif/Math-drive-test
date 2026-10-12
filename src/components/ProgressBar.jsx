export default function ProgressBar({ value, max, label }) {
 const pct = max ? Math.round(value / max * 100) : 0
 return <div className="pb"><div className="pb-track" role="progressbar" aria-valuemin={0} aria-valuemax={max} aria-valuenow={value} aria-label={label}><div className="pb-fill" style={{width: pct + '%'}} /></div><span className="pb-label">{label}</span></div>
}