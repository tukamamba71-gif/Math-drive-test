const L = (strings,...values) => strings.reduce((out,s,i)=>out+s+(values[i]??''),'')
export const tiers=[
 {id:'dasar',title:'Dasar',desc:'Bangun fondasi matematika.'},
 {id:'menengah',title:'Menengah',desc:'Latihan aljabar dan geometri.'},
 {id:'lanjut',title:'Lanjutan',desc:'Kenali konsep matematika lebih lanjut.'}
]
export const modules=[
 {id:'aritmetika',tier:'dasar',title:'Aritmetika Dasar',level:'Dasar',summary:'Operasi hitung dan urutan operasi.',lesson:[
 {type:'p',text:'Matematika dimulai dari empat operasi: penjumlahan, pengurangan, perkalian, dan pembagian.'},
 {type:'math',tex:L`a+b,quad a-b,quad a	imes b,quad adiv b`},
 {type:'p',text:'Kerjakan perkalian dan pembagian sebelum penjumlahan dan pengurangan.'}],
 examples:[{title:'Contoh 1',problem:L`Hitung $3+4	imes2$.`,steps:[L`Kerjakan perkalian dahulu: $4	imes2=8$.`,L`Lalu $3+8=11$.`]}],
 quiz:[
 {question:'Hasil 8 + 7 adalah ...',options:['13','14','15','16'],answer:2,explanation:'8 + 7 = 15.'},
 {question:L`Hasil $6	imes4$ adalah ...`,options:['10','20','24','28'],answer:2,explanation:'6 dikali 4 sama dengan 24.'},
 {question:L`Hasil $18div3+2$ adalah ...`,options:['4','6','8','10'],answer:2,explanation:'18 dibagi 3 = 6, lalu tambah 2 menjadi 8.'}]},
 {id:'aljabar',tier:'menengah',title:'Aljabar Dasar',level:'Menengah',summary:'Variabel, persamaan, dan pertidaksamaan.',lesson:[
 {type:'p',text:'Variabel adalah lambang untuk bilangan yang belum diketahui. Persamaan menjaga kedua sisi tetap setara.'},
 {type:'math',tex:L`2x+3=11`},
 {type:'p',text:'Untuk mencari x, lakukan operasi yang sama pada kedua sisi persamaan.'}],
 examples:[{title:'Contoh 1',problem:L`Selesaikan $2x+3=11$.`,steps:[L`Kurangi 3 dari kedua sisi: $2x=8$.`,L`Bagi kedua sisi dengan 2: $x=4$.`]}],
 quiz:[
 {question:L`Jika $x+5=12$, maka $x=$ ...`,options:['5','6','7','17'],answer:2,explanation:'Kurangi 5 dari 12, hasilnya 7.'},
 {question:L`Jika $3x=21$, maka $x=$ ...`,options:['6','7','8','9'],answer:1,explanation:'21 dibagi 3 sama dengan 7.'},
 {question:L`Sederhanakan $2a+3a$.`,options:['5','5a','6a','a'],answer:1,explanation:'Suku sejenis dijumlahkan: 2a + 3a = 5a.'}]},
 {id:'geometri',tier:'lanjut',title:'Geometri Dasar',level:'Lanjut',summary:'Luas, keliling, dan Pythagoras.',lesson:[
 {type:'p',text:'Keliling adalah panjang seluruh sisi bangun datar. Luas mengukur besar daerah di dalamnya.'},
 {type:'math',tex:L`L_{{persegi panjang}}=p	imes l,quad L_{{lingkaran}}=pi r^2`},
 {type:'p',text:'Pada segitiga siku-siku berlaku teorema Pythagoras: jumlah kuadrat kedua sisi siku-siku sama dengan kuadrat sisi miring.'},
 {type:'math',tex:L`a^2+b^2=c^2`}],
 examples:[{title:'Contoh 1',problem:L`Segitiga siku-siku memiliki sisi 3 dan 4. Berapa sisi miringnya?`,steps:[L`Gunakan $c^2=3^2+4^2=9+16=25$.`,L`Maka $c=sqrt{25}=5$.`]}],
 quiz:[
 {question:'Luas persegi panjang dengan panjang 6 dan lebar 4 adalah ...',options:['10','20','24','28'],answer:2,explanation:'Luas = panjang × lebar = 6 × 4 = 24.'},
 {question:L`Jika $a=3$ dan $b=4$, sisi miring $c$ adalah ...`,options:['5','6','7','12'],answer:0,explanation:'Pythagoras: akar dari 9 + 16 = 5.'},
 {question:L`Keliling persegi dengan sisi 5 adalah ...`,options:['10','15','20','25'],answer:2,explanation:'Keliling persegi = 4 × sisi = 20.'}]}
]