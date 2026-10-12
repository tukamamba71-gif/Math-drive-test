// Infinite, topic-aware multiple-choice generator for MatematikaKu.
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const shuffle = (items) => {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = rand(0, i);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};
const fmt = (n) => Number.isInteger(n) ? String(n) : String(Number(n.toFixed(2))).replace('.', ',');
const makeQuestion = (topic, difficulty, id, question, answer, explanation, distractors) => {
  const unique = [...new Set([answer, ...distractors].filter((x) => Number.isFinite(x)))].slice(0, 4);
  while (unique.length < 4) unique.push(answer + rand(2, 12) * (Math.random() < .5 ? -1 : 1));
  const options = shuffle(unique).map(fmt);
  return { id: String(id), topic, difficulty, pattern: 'Latihan konsep', question, options, answer: options.indexOf(fmt(answer)), explanation };
};
export function generateQuiz(topic = 'addition', count = 10, difficulty = 'Dasar', seed = '') {
  const questions = [];
  for (let i = 0; i < Math.max(0, count); i++) {
    const a = rand(2, difficulty.includes('HOTS') ? 500 : 99);
    const b = rand(2, difficulty.includes('HOTS') ? 100 : 30);
    let q;
    switch (topic) {
      case 'subtraction': { const x = a + b; q = makeQuestion(topic,difficulty,seed+i,`Hitung ${x} − ${a}.`,b,`Pengurangan membalik penjumlahan: ${x} − ${a} = ${b}.`,[b+1,b-1,b+rand(2,8)]); break; }
      case 'multiplication': { const x=rand(2,20), y=rand(2,12), ans=x*y; q=makeQuestion(topic,difficulty,seed+i,`Hitung ${x} × ${y}.`,ans,`${x} kelompok yang masing-masing berisi ${y} menghasilkan ${ans}.`,[ans+x,ans-y,ans+rand(2,10)]); break; }
      case 'division': { const d=rand(2,12), ans=rand(2,20), n=d*ans; q=makeQuestion(topic,difficulty,seed+i,`Hitung ${n} ÷ ${d}.`,ans,`Karena ${d} × ${ans} = ${n}, maka hasil baginya ${ans}.`,[ans+1,ans-1,ans+rand(2,5)]); break; }
      case 'mixed': { const x=rand(2,12), y=rand(2,9), z=rand(1,15), ans=x+y*z; q=makeQuestion(topic,difficulty,seed+i,`Hitung ${x} + ${y} × ${z}.`,ans,`Kerjakan perkalian lebih dahulu: ${y} × ${z} = ${y*z}, kemudian tambahkan ${x} sehingga hasilnya ${ans}.`,[x+y*z+z,x+y+z,x*y+z]); break; }
      case 'variable': case 'likeTerms': { const x=rand(2,9), y=rand(1,8), ans=x+y; q=makeQuestion(topic,difficulty,seed+i,`Sederhanakan ${x}x + ${y}x.`,ans,`Suku sejenis dijumlahkan melalui koefisien: ${x} + ${y} = ${ans}, sehingga menjadi ${ans}x.`,[ans+1,Math.abs(x-y),x*y]); break; }
      case 'linear': { const x=rand(2,15), c=rand(1,12), ans=x; q=makeQuestion(topic,difficulty,seed+i,`Jika 2x + ${c} = ${2*x+c}, berapakah x?`,ans,`Kurangi kedua sisi dengan ${c}, lalu bagi 2. Diperoleh x = ${ans}.`,[ans+1,ans-1,ans+3]); break; }
      case 'perimeter': { const x=rand(3,15), y=rand(2,12), ans=2*(x+y); q=makeQuestion(topic,difficulty,seed+i,`Persegi panjang panjangnya ${x} cm dan lebarnya ${y} cm. Berapa kelilingnya?`,ans,`Keliling = 2(p + l) = 2(${x} + ${y}) = ${ans} cm.`,[x*y, x+y, ans+2]); break; }
      case 'area': { const x=rand(3,15), y=rand(2,12), ans=x*y; q=makeQuestion(topic,difficulty,seed+i,`Persegi panjang berukuran ${x} cm × ${y} cm. Berapa luasnya?`,ans,`Luas = panjang × lebar = ${x} × ${y} = ${ans} cm².`,[2*(x+y),ans+x,ans-y]); break; }
      case 'volume': case 'composite': { const x=rand(2,8), y=rand(2,7), z=rand(2,6), ans=x*y*z; q=makeQuestion(topic,difficulty,seed+i,`Balok berukuran ${x} cm × ${y} cm × ${z} cm. Berapa volumenya?`,ans,`Volume balok = p × l × t = ${x} × ${y} × ${z} = ${ans} cm³.`,[x*y,ans+x,ans-z]); break; }
      case 'trig': { const rows=[['sin θ',3,5,'3/5'],['cos θ',4,5,'4/5'],['tan θ',3,4,'3/4']]; const row=rows[rand(0,2)]; const value=row[3]; const opts=shuffle([value,'1/2','2/3','3/5'].filter((v,i,a)=>a.indexOf(v)===i)); while(opts.length<4)opts.push('5/6'); q={id:String(seed+i),topic,difficulty,pattern:'Rasio segitiga siku-siku',question:`Jika sisi-sisi relatif sudut θ diketahui dengan perbandingan ${row[1]} dan ${row[2]}, nilai ${row[0]} yang sesuai adalah …`,options:opts,answer:opts.indexOf(value),explanation:`Gunakan definisi ${row[0]} sebagai perbandingan sisi yang sesuai pada segitiga siku-siku.`}; break; }
      case 'functions': { const x=rand(1,12), m=rand(2,5), c=rand(1,9), ans=m*x+c; q=makeQuestion(topic,difficulty,seed+i,`Jika f(x) = ${m}x + ${c}, tentukan f(${x}).`,ans,`Substitusi x = ${x}: ${m} × ${x} + ${c} = ${ans}.`,[ans+1,ans-1,m*x-c]); break; }
      case 'limits': { const x=rand(1,10), c=rand(1,8), ans=x+c; q=makeQuestion(topic,difficulty,seed+i,`Tentukan limit saat x → ${x} dari f(x) = x + ${c}.`,ans,`Fungsi linear kontinu, sehingga substitusi langsung memberi ${x} + ${c} = ${ans}.`,[ans+1,ans-1,x*c]); break; }
      default: { const ans=a+b; q=makeQuestion(topic,difficulty,seed+i,`Hitung ${a} + ${b}.`,ans,`Penjumlahan menggabungkan kedua bilangan: ${a} + ${b} = ${ans}.`,[ans+1,ans-1,ans+rand(2,9)]); }
    }
    questions.push(q);
  }
  return questions;
}
export function generateStoryQuiz(topic = 'addition', count = 10, seed = '') {
  return Array.from({ length: Math.max(0, count) }, (_, i) => {
    const a=rand(3,40), b=rand(2,25);
    const subtract = topic === 'subtraction';
    const answer = subtract ? a+b-b : a+b;
    const prompt = topic === 'multiplication' ? `Ada ${a} kotak berisi masing-masing ${b} pensil. Berapa jumlah pensil?` : topic === 'division' ? `Sebanyak ${a*b} kue dibagikan sama rata kepada ${a} anak. Berapa kue per anak?` : `Rani memiliki ${a} kelereng lalu mendapat ${b} kelereng lagi. Berapa jumlahnya?`;
    const value = topic === 'multiplication' ? a*b : topic === 'division' ? b : answer;
    const distractors = [value+1, Math.max(0,value-1), value+rand(2,7)];
    const options = shuffle([...new Set([value,...distractors])].map(fmt));
    return { id: `story-${seed}-${i}`, topic, difficulty:'Kontekstual', pattern:'Soal cerita', question:prompt, options, answer:options.indexOf(fmt(value)), explanation: topic === 'multiplication' ? `Kalikan banyak kotak dengan isi tiap kotak: ${a} × ${b} = ${value}.` : topic === 'division' ? `Bagikan ${a*b} kue kepada ${a} anak: ${a*b} ÷ ${a} = ${b} kue per anak.` : `Gabungkan jumlah awal dan tambahan: ${a} + ${b} = ${value}.` };
  });
}
