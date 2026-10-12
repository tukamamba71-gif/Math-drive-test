import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Activity, Award, BookOpen, Check, ChevronLeft, Command, Flame, GraduationCap, Home, Menu, Moon, Search, Sun, X } from 'lucide-react'
import ProgressBar from './ProgressBar'

export default function Layout({ done, total, onHome, onReset, children, modules = [], progress = {}, streak = 0, badges = [], onOpen, theme, onToggleTheme }) {
  const [drawer, setDrawer] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const results = useMemo(() => modules.filter(m => (m.title + ' ' + m.summary + ' ' + m.level).toLowerCase().includes(query.toLowerCase())).slice(0, 7), [modules, query])
  useEffect(() => {
    const key = (e) => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setSearchOpen(v => !v) } if (e.key === 'Escape') { setSearchOpen(false); setDrawer(false) } }
    window.addEventListener('keydown', key); return () => window.removeEventListener('keydown', key)
  }, [])
  const choose = (id) => { onOpen(id); setSearchOpen(false); setDrawer(false); setQuery('') }
  const nav = <><button className="nav-item" onClick={() => { onHome(); setDrawer(false) }}><Home size={18}/><span>Beranda</span></button>
    <div className="side-label">JALUR BELAJAR</div>
    {modules.map((m, i) => <button key={m.id} className="nav-item" onClick={() => choose(m.id)}><span className={'nav-dot ' + (progress[m.id]?.done ? 'is-done' : '')}>{progress[m.id]?.done ? <Check size={12}/> : i + 1}</span><span className="nav-title">{m.title}</span></button>)}
    <div className="side-label">PENCAPAIAN</div><div className="sidebar-mini"><Flame size={17}/><div><strong>{streak} hari</strong><small>Streak belajar</small></div></div>
    <div className="sidebar-mini"><Award size={17}/><div><strong>{badges.length} badge</strong><small>Sudah dibuka</small></div></div>
  </>
  return <div className="app-shell">
    <aside className="sidebar"><button className="brand" onClick={onHome}><span className="brand-mark"><GraduationCap size={21}/></span><span>Matematika<span className="brand-accent">Ku</span><small>LEARN • PRACTICE • GROW</small></span></button><nav className="side-nav">{nav}</nav><div className="sidebar-bottom"><div className="sidebar-note"><div className="note-icon"><Activity size={17}/></div><strong>Belajar sedikit,<br/>maju setiap hari.</strong><small>Langkah kecil jadi kemajuan besar.</small></div><button className="nav-item reset-link" onClick={() => { if (window.confirm('Hapus seluruh progres, streak, dan badge?')) onReset() }}>Reset progres</button></div></aside>
    <AnimatePresence>{drawer && <><motion.button className="drawer-scrim" aria-label="Tutup menu" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setDrawer(false)}/><motion.aside className="mobile-drawer" initial={{x:-300}} animate={{x:0}} exit={{x:-300}} transition={{type:'spring',damping:28}}><button className="icon-button drawer-close" onClick={()=>setDrawer(false)} aria-label="Tutup"><X size={19}/></button><div className="side-nav">{nav}</div></motion.aside></>}</AnimatePresence>
    <div className="app-main"><header className="topbar"><div className="topbar-left"><button className="icon-button mobile-menu" onClick={()=>setDrawer(true)} aria-label="Buka menu"><Menu size={20}/></button><div><div className="eyebrow">RUANG BELAJAR MATEMATIKA</div><div className="topbar-title">Belajar jadi lebih mudah.</div></div></div><div className="top-actions"><button className="search-trigger" onClick={()=>setSearchOpen(true)}><Search size={16}/><span>Cari materi...</span><kbd><Command size={11}/> K</kbd></button><button className="icon-button" onClick={onToggleTheme} aria-label="Ganti tema">{theme==='light'?<Moon size={18}/>:<Sun size={18}/>}</button><div className="avatar">M</div></div></header>
      <div className="mobile-progress"><ProgressBar value={done} max={total} label={done + ' dari ' + total + ' modul selesai'}/></div>
      <main className="content-area">{children}</main><footer className="footer">Dibuat untuk rasa ingin tahu. <span>Terus bertumbuh ✦</span></footer>
    </div>
    <AnimatePresence>{searchOpen && <motion.div className="command-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onMouseDown={(e)=>{if(e.target===e.currentTarget)setSearchOpen(false)}}><motion.div className="command-menu" initial={{opacity:0,y:-12,scale:.98}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:-8,scale:.98}} transition={{duration:.16}}><div className="command-input"><Search size={19}/><input autoFocus value={query} onChange={e=>setQuery(e.target.value)} placeholder="Cari materi matematika..." /><kbd>ESC</kbd></div><div className="command-caption">{query ? 'HASIL PENCARIAN' : 'MATERI YANG TERSEDIA'}</div>{results.length ? results.map(m=><button className="command-result" key={m.id} onClick={()=>choose(m.id)}><span className="command-icon"><BookOpen size={17}/></span><span><strong>{m.title}</strong><small>{m.summary}</small></span><ChevronLeft className="command-arrow" size={16}/></button>) : <div className="empty-search">Tidak ada materi yang cocok. Coba kata kunci lain.</div>}<div className="command-footer"><span><Command size={12}/> K untuk membuka pencarian</span><span>{results.length} materi</span></div></motion.div></motion.div>}</AnimatePresence>
  </div>
}