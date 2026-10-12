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
 case 'trig': {const pairs=[{a:3,b:5,n:.6},{a:5,b:13,n:5/13},{a:8,b:10,n:.8},{a:7,b:25,n:.28}];const p=pairs[int(0,pairs.length-1)];const opts=shuffle([p.n,Math.min(.99,p.n+.2),Math.max(.01,p.n-.15),.5]).map(v=>String(Number(v.toFixed(3))));return {question:`Pada segitiga siku-siku, sisi depan sudut θ = ${p.a} dan sisi miring = ${p.b}. Nilai sin θ adalah ...`,options:opts,answer:opts.indexOf(String(Number(p.n.toFixed(3)))),explanation:`sin θ = sisi depan ÷ sisi miring = ${p.a}/${p.b} ≈ ${Number(p.n.toFixed(3))}. Pilih rasio depan terhadap miring.`};}
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
 const out:GeneratedQuestion[]=[]
 const seen=new Set<string>()
 while(out.length<count){const q=build(safeTopic,difficulty);if(seen.has(q.question))continue;seen.add(q.question);out.push({...q,id:`${Date.now()}-${Math.random().toString(36).slice(2)}-${out.length}-${seedKey}`,difficulty,pattern:q.pattern|| (difficulty==='HOTS / Penalaran'?'HOTS • Penalaran':'Latihan konsep')})}
 return out
}
