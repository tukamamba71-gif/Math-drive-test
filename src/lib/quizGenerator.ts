export type Difficulty = 'Dasar' | 'Menengah' | 'HOTS / Penalaran'
export type GeneratedQuestion = { id: string; question: string; options: string[]; answer: number; explanation: string; difficulty: Difficulty; pattern: string }
type Topic = 'addition'|'subtraction'|'multiplication'|'division'|'mixed'|'word'|'variable'|'likeTerms'|'algebraMultiply'|'linear'|'perimeter'|'area'|'volume'|'composite'|'trig'|'functions'|'limits'
const int = (min:number,max:number) => Math.floor(Math.random()*(max-min+1))+min
const shuffle = <T,>(xs:T[]) => { const a=[...xs]; for(let i=a.length-1;i>0;i--){const j=int(0,i);[a[i],a[j]]=[a[j],a[i]]} return a }
const fmt = (n:number) => n.toLocaleString('id-ID')
function build(topic:Topic, difficulty:Difficulty): Omit<GeneratedQuestion,'id'|'difficulty'|'pattern'> {
 let question='', value=0, explanation='', pattern='Latihan konsep'
 const a=int(2, difficulty==='Dasar'?20:100), b=int(2,difficulty==='Dasar'?12:30)
 switch(topic){
 case 'addition': value=a+b; question=`Hitung ${a} + ${b} = ...`; explanation=`Gabungkan kedua bilangan: ${a} + ${b} = ${value}. Periksa dengan mengurangi ${b} dari ${value}; hasilnya kembali ${a}.`; break
 case 'subtraction': {const x=Math.max(a,b),y=Math.min(a,b);value=x-y;question=`Hitung ${x} − ${y} = ...`;explanation=`Kurangi ${y} dari ${x}: hasilnya ${value}. Pemeriksaan: ${value} + ${y} = ${x}.`;break}
 case 'multiplication': value=a*b; question=`Berapakah hasil ${a} × ${b}?`; explanation=`Pecah ${a} × ${b} sebagai perkalian ${a} dengan ${b}; hasilnya ${value}. Kamu dapat memeriksa dengan ${value} ÷ ${a} = ${b}.`; break
 case 'division': {const divisor=int(2,12), quotient=int(2,20);value=quotient;question=`Hitung ${divisor*quotient} ÷ ${divisor} = ...`;explanation=`Pembagian adalah kebalikan perkalian. Karena ${divisor} × ${quotient} = ${divisor*quotient}, hasil bagi adalah ${quotient}.`;break}
 case 'mixed': {const x=int(2,15),y=int(2,9),z=int(2,9);value=x+y*z;question=`Hitung ${x} + ${y} × ${z}.`;explanation=`Kerjakan perkalian dahulu: ${y} × ${z} = ${y*z}. Lalu ${x} + ${y*z} = ${value}.`;break}
 case 'word': {const n=int(2,8),price=int(4,25)*1000,discount=int(1,5)*1000;value=n*price-discount;question=`AKM • Toko menjual ${n} buku seharga Rp${fmt(price)} per buku. Ada potongan total Rp${fmt(discount)}. Berapa total pembayaran?`;explanation=`Hitung total sebelum diskon: ${n} × Rp${fmt(price)} = Rp${fmt(n*price)}. Kurangi potongan Rp${fmt(discount)} sehingga total Rp${fmt(value)}.`;pattern='AKM • Kontekstual';break}
 case 'variable': {const c=int(2,9),x=int(2,12),k=int(1,10);value=c*x+k;question=`Jika x = ${x}, tentukan nilai ${c}x + ${k}.`;explanation=`Substitusi x = ${x}: ${c}(${x}) + ${k} = ${c*x} + ${k} = ${value}.`;break}
 case 'likeTerms': {const p=int(2,9),q=int(1,8);value=p+q;question=`Sederhanakan ${p}x + ${q}x.`;explanation=`Kedua suku sejenis. Jumlahkan koefisiennya: (${p} + ${q})x = ${value}x.`;const opts=shuffle([value,value+1,Math.max(1,value-1),value+3]).map(n=>`${n}x`);return {question,options:opts,answer:opts.indexOf(`${value}x`),explanation};}
 case 'algebraMultiply': {const p=int(2,8),q=int(1,9),r=int(1,8);value=p*q;question=`Kembangkan ${p}x(${q}x + ${r}). Koefisien suku x² adalah ...`;explanation=`Dengan distributif, ${p}x × ${q}x = ${value}x² dan ${p}x × ${r} = ${p*r}x. Koefisien x² adalah ${value}.`;break}
 case 'linear': {const x=int(2,15),m=int(2,8),c=int(1,15);value=x;question=`HOTS • Jika ${m}x + ${c} = ${m*x+c}, nilai x adalah ...`;explanation=`Kurangi ${c} pada kedua sisi: ${m}x = ${m*x}. Bagi kedua sisi dengan ${m}, diperoleh x = ${x}.`;pattern='HOTS • Penalaran';break}
 case 'perimeter': {const p=int(3,20),q=int(2,15);value=2*(p+q);question=`Persegi panjang memiliki panjang ${p} cm dan lebar ${q} cm. Kelilingnya ...`;explanation=`K = 2(p + l) = 2(${p} + ${q}) = ${value} cm.`;break}
 case 'area': {const p=int(3,20),q=int(2,15);value=p*q;question=`Lantai berukuran ${p} m × ${q} m. Berapa luasnya?`;explanation=`Luas persegi panjang = p × l = ${p} × ${q} = ${value} m².`;break}
 case 'volume': {const p=int(2,9),q=int(2,8),r=int(2,7);value=p*q*r;question=`Balok berukuran ${p} cm × ${q} cm × ${r} cm. Volumenya ...`;explanation=`V = p × l × t = ${p} × ${q} × ${r} = ${value} cm³.`;break}
 case 'composite': {const p=int(2,8),q=int(2,8),r=int(2,6);value=p*q+r*r*r;question=`HOTS • Bangun gabungan terdiri dari balok volume ${p*q} cm³ dan kubus sisi ${r} cm tanpa tumpang tindih. Volume totalnya ...`;explanation=`Volume balok = ${p} × ${q} × 1 = ${p*q} cm³. Volume kubus = ${r}³ = ${r*r*r} cm³. Jumlah = ${value} cm³.`;pattern='HOTS • Multi-langkah';break}
 case 'trig': {const pairs=[{a:3,b:5,n:.6},{a:5,b:13,n:5/13},{a:8,b:10,n:.8},{a:7,b:25,n:.28},{a:4,b:5,n:.8},{a:12,b:13,n:12/13},{a:9,b:15,n:.6},{a:5,b:12,n:5/12},{a:15,b:17,n:15/17},{a:20,b:29,n:20/29}];const p=pairs[int(0,pairs.length-1)];const opts=shuffle([p.n,Math.min(.99,p.n+.2),Math.max(.01,p.n-.15),.5]).map(v=>String(Number(v.toFixed(3))));return {question:`Pada segitiga siku-siku, sisi depan sudut θ = ${p.a} dan sisi miring = ${p.b}. Nilai sin θ adalah ...`,options:opts,answer:opts.indexOf(String(Number(p.n.toFixed(3)))),explanation:`sin θ = sisi depan ÷ sisi miring = ${p.a}/${p.b} ≈ ${Number(p.n.toFixed(3))}. Pilih rasio depan terhadap miring.`};}
 case 'functions': {const m=int(2,8),c=int(1,12),x=int(1,10);value=m*x+c;question=`Jika f(x) = ${m}x + ${c}, berapakah f(${x})?`;explanation=`Substitusikan x = ${x}: f(${x}) = ${m} × ${x} + ${c} = ${value}.`;break}
 case 'limits': {const c=int(1,20),x=int(1,10);value=x+c;question=`Tentukan limit x→${x} dari f(x) = x + ${c}.`;explanation=`Fungsi linear kontinu, jadi substitusi langsung: ${x} + ${c} = ${value}.`;break}
 default: value=a+b;question=`Hitung ${a} + ${b}.`;explanation=`Jumlahnya ${value}.`
 }
 const delta=Math.max(1,Math.ceil(Math.abs(value)*.15)), raw=[value,value+delta,value-delta,value+int(2,delta+5)]
 const nums=new Set(raw.filter(Number.isFinite))
 // Pastikan selalu ada empat opsi berbeda, termasuk untuk hasil kecil atau negatif.
 for(let offset=1;nums.size<4;offset++){const candidate=value+(offset%2===1?1:-1)*(delta+offset);nums.add(candidate)}
 const options=shuffle([...nums].slice(0,4)).map(n=>fmt(n))
 return {question,options,answer:options.indexOf(fmt(value)),explanation}
}
export function generateQuiz(topic:string,count=5,difficulty:Difficulty='Dasar',seedKey='') : GeneratedQuestion[] {
 const valid:Topic[]=['addition','subtraction','multiplication','division','mixed','word','variable','likeTerms','algebraMultiply','linear','perimeter','area','volume','composite','trig','functions','limits']
 const safeTopic=(valid.includes(topic as Topic)?topic:'addition') as Topic
 const safeCount=Math.max(1,Math.min(20,Number.isFinite(count)?Math.floor(count):5))
 const out:GeneratedQuestion[]=[]
 const seen=new Set<string>()
 // Never let a small/limited question pool trap the app in a generation loop.
 for(let attempt=0;out.length<safeCount && attempt<safeCount*30;attempt++){
   const q=build(safeTopic,difficulty)
   if(seen.has(q.question))continue
   seen.add(q.question)
   out.push({...q,id:`${Date.now()}-${Math.random().toString(36).slice(2)}-${out.length}-${seedKey}`,difficulty,pattern:q.pattern|| (difficulty==='HOTS / Penalaran'?'HOTS • Penalaran':'Latihan konsep')})
 }
 // If a topic has a limited number of patterns, fill the requested set with valid questions
 // rather than leaving the quiz empty or looping forever.
 while(out.length<safeCount){
   const q=build(safeTopic,difficulty)
   out.push({...q,id:`${Date.now()}-${Math.random().toString(36).slice(2)}-${out.length}-fallback-${seedKey}`,difficulty,pattern:q.pattern||'Latihan konsep'})
 }
 return out
}

export function generateStoryQuiz(topic:string,count=10,seedKey=''): GeneratedQuestion[] {
 const valid:Topic[]=['addition','subtraction','multiplication','division','mixed','word','variable','likeTerms','algebraMultiply','linear','perimeter','area','volume','composite','trig','functions','limits']
 const safeTopic=(valid.includes(topic as Topic)?topic:'addition') as Topic
 const n=Math.max(1,Math.min(20,Number.isFinite(count)?Math.floor(count):10))
 const make=(i:number):GeneratedQuestion=>{
   const a=int(3,18), b=int(2,12), c=int(2,9)
   let value=0, question='', explanation='', pattern='Soal cerita • Penerapan'
   switch(safeTopic){
    case 'addition': value=a+b; question=`Rani mengumpulkan ${a} stiker pada hari Senin dan ${b} stiker pada hari Selasa. Berapa stiker Rani seluruhnya?`; explanation=`Gabungkan kedua jumlah: ${a} + ${b} = ${value} stiker.`; break
    case 'subtraction': {const hi=Math.max(a,b),lo=Math.min(a,b);value=hi-lo;question=`Perpustakaan memiliki ${hi} buku. Sebanyak ${lo} buku dipinjam. Berapa buku yang tersisa?`;explanation=`Kurangi buku yang dipinjam: ${hi} − ${lo} = ${value} buku.`;break}
    case 'multiplication': value=a*b; question=`Ada ${a} kotak pensil dengan ${b} pensil di setiap kotak. Berapa jumlah pensil semuanya?`; explanation=`Kelompok sama banyak: ${a} × ${b} = ${value} pensil.`; break
    case 'division': {const d=int(2,10),q=int(2,12);value=q;question=`Sebanyak ${d*q} kue dibagi rata kepada ${d} anak. Berapa kue yang diterima setiap anak?`;explanation=`Bagi jumlah kue dengan jumlah anak: ${d*q} ÷ ${d} = ${q} kue per anak.`;break}
    case 'mixed': {const x=int(4,20),y=int(2,8),z=int(1,6);value=x+y*z;question=`Dina membeli ${y} kantong apel berisi ${z} apel per kantong, lalu mendapat ${x} apel lagi. Berapa apel Dina sekarang?`;explanation=`Hitung apel dalam kantong dahulu: ${y} × ${z} = ${y*z}. Tambahkan ${x}: total ${x} + ${y*z} = ${value} apel.`;break}
    case 'word': {const q=int(2,8),price=int(4,20)*1000,disc=int(1,4)*1000;value=q*price-disc;question=`Sebuah toko menjual ${q} buku seharga Rp${fmt(price)} per buku dengan potongan total Rp${fmt(disc)}. Berapa yang harus dibayar?`;explanation=`Total awal ${q} × Rp${fmt(price)} = Rp${fmt(q*price)}. Setelah diskon: Rp${fmt(q*price)} − Rp${fmt(disc)} = Rp${fmt(value)}.`;break}
    case 'variable': {const k=int(2,8),xv=int(2,9),fee=int(1,10);value=k*xv+fee;question=`Biaya perjalanan terdiri dari biaya tetap Rp${fmt(fee*1000)} dan Rp${fmt(k*1000)} untuk setiap kilometer. Jika jarak ${xv} km, berapa biaya total dalam ribuan rupiah?`;explanation=`Model biaya adalah ${k}x + ${fee}. Untuk x=${xv}: ${k}×${xv}+${fee}=${value} ribu rupiah.`;break}
    case 'likeTerms': {const p=int(2,8),q=int(1,7);value=p+q;question=`Satu paket berisi ${p} pensil dan paket lain berisi ${q} pensil. Jika x menyatakan isi satu unit paket yang sama, koefisien total dari ${p}x + ${q}x adalah ...`;explanation=`Keduanya suku sejenis, jadi koefisien dijumlahkan: ${p}+${q}=${value}. Hasilnya ${value}x.`;break}
    case 'algebraMultiply': {const p=int(2,6),q=int(2,7),v=int(1,5);value=p*q;question=`Sebuah persegi panjang memiliki lebar ${p}x dan panjang (${q}x + ${v}). Koefisien suku x² saat luasnya dikembangkan adalah ...`;explanation=`Luas = ${p}x(${q}x+${v}). Suku x² berasal dari ${p}x×${q}x=${value}x², jadi koefisiennya ${value}.`;break}
    case 'linear': {const xv=int(2,12),m=int(2,7),k=int(1,12);value=xv;question=`Harga ${m} barang yang sama ditambah biaya kemasan Rp${fmt(k*1000)} menjadi Rp${fmt((m*xv+k)*1000)} ribu. Jika harga tiap barang x ribu rupiah, persamaan ${m}x+${k}=${m*xv+k}. Berapa x?`;explanation=`Kurangi ${k} dari kedua sisi lalu bagi dengan ${m}: x=${xv}.`;break}
    case 'perimeter': {const p=int(4,15),q=int(3,10);value=2*(p+q);question=`Kebun berbentuk persegi panjang memiliki panjang ${p} m dan lebar ${q} m. Berapa meter pagar untuk mengelilinginya?`;explanation=`Keliling = 2(p+l) = 2(${p}+${q}) = ${value} m.`;break}
    case 'area': {const p=int(3,15),q=int(2,10);value=p*q;question=`Lantai ruangan berukuran ${p} m × ${q} m akan dipasangi karpet. Berapa luas karpet yang diperlukan?`;explanation=`Luas = panjang × lebar = ${p}×${q} = ${value} m².`;break}
    case 'volume': {const p=int(2,8),q=int(2,6),v=int(2,5);value=p*q*v;question=`Akuarium berbentuk balok berukuran ${p} dm × ${q} dm × ${v} dm. Berapa volumenya?`;explanation=`Volume = p×l×t = ${p}×${q}×${v} = ${value} dm³.`;break}
    case 'composite': {const p=int(2,6),q=int(2,5);value=p*q+q*q*q;question=`Sebuah pajangan terdiri dari balok bervolume ${p*q} cm³ dan kubus sisi ${q} cm tanpa tumpang tindih. Berapa volume seluruhnya?`;explanation=`Jumlahkan volume kedua bagian: ${p*q} + ${q}³ = ${p*q} + ${q*q*q} = ${value} cm³.`;break}
    case 'trig': {const pairs=[{a:3,b:5,n:.6},{a:5,b:13,n:5/13},{a:8,b:10,n:.8},{a:7,b:25,n:.28}];const t=pairs[int(0,pairs.length-1)];value=Number(t.n.toFixed(3));question=`Sebuah penyangga membentuk segitiga siku-siku. Sisi di depan sudut θ sepanjang ${t.a} m dan sisi miring ${t.b} m. Berapa nilai sin θ?`;explanation=`sin θ = sisi depan ÷ sisi miring = ${t.a}/${t.b} ≈ ${value}.`;break}
    case 'functions': {const m=int(2,6),k=int(1,9),xv=int(1,8);value=m*xv+k;question=`Biaya layanan mengikuti f(x)=${m}x+${k} ribu rupiah, dengan x jumlah unit. Berapa biaya untuk ${xv} unit?`;explanation=`Substitusi x=${xv}: f(${xv})=${m}×${xv}+${k}=${value} ribu rupiah.`;break}
    case 'limits': {const k=int(2,12),xv=int(1,8);value=xv+k;question=`Biaya mendekati aturan f(x)=x+${k} ribu rupiah ketika jumlah x mendekati ${xv}. Berapa nilai limit f(x) saat x→${xv}?`;explanation=`Karena fungsi linear kontinu, substitusi langsung: ${xv}+${k}=${value}.`;break}
   }
   const candidates=[value,value+int(1,5),value-int(1,4),value+int(6,10)]
   const opts=shuffle([...new Set(candidates)].slice(0,4).concat([]).map(String))
   while(opts.length<4)opts.push(String(value+opts.length+11))
   const answer=opts.indexOf(String(value))
   return {id:`story-${Date.now()}-${seedKey}-${i}-${Math.random().toString(36).slice(2)}`,question,options:opts,answer,explanation,difficulty:'Menengah',pattern}
 }
 const out:GeneratedQuestion[]=[]
 for(let i=0;i<n;i++)out.push(make(i))
 return out
}
