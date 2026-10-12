import katex from 'katex'
import 'katex/dist/katex.min.css'

const render = (tex, displayMode) => katex.renderToString(String(tex ?? ''), { displayMode, throwOnError: false, strict: 'ignore' })

export function Tex({ tex, block = false }) {
  const Tag = block ? 'div' : 'span'
  return <Tag className={block ? 'tex-block' : undefined} dangerouslySetInnerHTML={{ __html: render(tex, block) }} />
}

export function Rich({ text }) {
  const safeText = typeof text === 'string' ? text : text == null ? '' : String(text)
  if (!safeText) return <span>Konten belum tersedia.</span>
  return safeText.split(/\$([^$]+)\$/g).map((part, i) => i % 2 ? <Tex key={i} tex={part} /> : <span key={i}>{part}</span>)
}
