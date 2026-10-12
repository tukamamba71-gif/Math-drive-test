export const tiers = [
  { id: 'dasar', title: 'Dasar', desc: 'Bangun fondasi matematika yang kuat.' },
  { id: 'menengah', title: 'Menengah', desc: 'Latih cara berpikir logis lewat simbol dan bentuk.' },
  { id: 'lanjut', title: 'Lanjutan', desc: 'Hubungkan rumus dengan pola dan ruang.' }
]
export const modules = [
  {
    id: 'aritmetika', tier: 'dasar', title: 'Aritmetika Dasar', level: 'Dasar', summary: 'Pahami operasi hitung, urutan operasi, dan cara angka bekerja.',
    lesson: [
      { type: 'heading', text: 'Mengapa operasi hitung itu penting?' },
      { type: 'p', text: 'Aritmetika adalah bahasa dasar untuk menggambarkan jumlah, perubahan, pengulangan, dan pembagian yang kita temui setiap hari. Saat menghitung uang belanja, membandingkan harga, membagi makanan secara adil, atau memperkirakan waktu perjalanan, kita sedang memakai aritmetika.' },
      { type: 'p', text: 'Penjumlahan menggabungkan dua jumlah menjadi satu jumlah baru. Pengurangan menjawab pertanyaan “berapa selisihnya?” atau “berapa yang tersisa?”. Perkalian adalah penjumlahan berulang dari kelompok yang sama besar, sedangkan pembagian membagi jumlah menjadi kelompok sama besar atau mencari berapa kelompok yang dapat dibentuk.' },
      { type: 'math', tex: 'a+b,\\quad a-b,\\quad a\\times b,\\quad a\\div b' },
      { type: 'heading', text: 'Mengapa ada urutan operasi?' },
      { type: 'p', text: 'Bayangkan sebuah ekspresi matematika sebagai instruksi. Jika setiap orang mengerjakannya dengan urutan berbeda, hasilnya bisa berbeda pula. Karena itu, matematika memiliki aturan yang disepakati: kerjakan tanda kurung terlebih dahulu, lalu pangkat, kemudian perkalian dan pembagian dari kiri ke kanan, dan terakhir penjumlahan serta pengurangan dari kiri ke kanan.' },
      { type: 'math', tex: '3+4\\times2=3+8=11' },
      { type: 'p', text: 'Contoh dunia nyata: jika kamu membeli 3 paket yang masing-masing berisi 4 roti, lalu mendapat tambahan 2 roti, jumlahnya adalah 3 × 4 + 2 = 14 roti. Mengalikan dahulu memastikan kita menghitung isi paket sebelum menambahkan roti bonus.' },
      { type: 'heading', text: 'Strategi menghitung dengan teliti' },
      { type: 'p', text: 'Sebelum menghitung, baca ekspresi secara utuh. Tandai operasi yang harus dikerjakan lebih dahulu. Setelah mendapat hasil antara, tulis kembali ekspresi yang tersisa agar tidak kehilangan jejak. Terakhir, periksa apakah hasilnya masuk akal: membeli 4 barang seharga 6 ribu rupiah tidak mungkin hanya menghabiskan 10 ribu rupiah jika tidak ada diskon.' }
    ],
    examples: [
      { title: 'Contoh 1 · Urutan operasi', problem: 'Hitung $3+4\\times2$.', steps: ['Perhatikan dua operasi yang muncul: penjumlahan dan perkalian. Menurut aturan urutan operasi, perkalian harus dikerjakan terlebih dahulu.', 'Hitung perkaliannya: $4\\times2=8$. Ekspresi sekarang menjadi $3+8$.', 'Lakukan penjumlahan terakhir: $3+8=11$. Jadi, hasil akhirnya adalah $11$, bukan $14$.'] },
      { title: 'Contoh 2 · Membagi sama rata', problem: 'Ada 24 kue yang dibagikan sama rata kepada 6 orang. Berapa kue yang diterima setiap orang?', steps: ['Kita mengetahui jumlah keseluruhan kue (24) dan jumlah orang (6). Karena semua mendapat bagian sama, gunakan pembagian.', 'Hitung $24\\div6=4$. Artinya, ada 4 kue untuk setiap orang.', 'Periksa dengan operasi kebalikan: $6\\times4=24$. Semua kue terbagi tepat, sehingga jawabannya 4 kue per orang.'] }
    ],
    quiz: [
      { question: 'Hasil $8+7$ adalah ...', options: ['13','14','15','16'], answer: 2, explanation: 'Mulai dari 8 lalu tambahkan 7 satuan: 8 + 7 = 15.' },
      { question: 'Hasil $6\\times4$ adalah ...', options: ['10','20','24','28'], answer: 2, explanation: 'Perkalian 6 × 4 berarti empat kelompok berisi enam atau enam kelompok berisi empat. Totalnya 24.' },
      { question: 'Hasil $18\\div3+2$ adalah ...', options: ['4','6','8','10'], answer: 2, explanation: 'Pembagian dikerjakan sebelum penjumlahan: 18 ÷ 3 = 6, lalu 6 + 2 = 8.' },
      { question: 'Hasil $5+2\\times3$ adalah ...', options: ['21','11','15','13'], answer: 1, explanation: 'Kerjakan perkalian dahulu: 2 × 3 = 6. Kemudian 5 + 6 = 11.' }
    ]
  },
  {
    id: 'aljabar', tier: 'menengah', title: 'Aljabar Dasar', level: 'Menengah', summary: 'Pahami variabel, suku sejenis, dan persamaan seperti timbangan.',
    lesson: [
      { type: 'heading', text: 'Apa itu variabel dan mengapa kita memerlukannya?' },
      { type: 'p', text: 'Variabel adalah simbol, biasanya huruf seperti x atau y, yang mewakili nilai yang belum diketahui atau nilai yang dapat berubah. Daripada menulis aturan harga untuk setiap jumlah barang secara terpisah, kita dapat menulis satu aturan umum. Jika satu pensil berharga 2.000 rupiah dan x menyatakan jumlah pensil, total harga dapat ditulis sebagai 2.000x.' },
      { type: 'p', text: 'Ekspresi aljabar membantu kita menjelaskan pola secara ringkas. Pada 2x + 3, angka 2 disebut koefisien, x adalah variabel, dan 3 adalah konstanta. Suku 2x berarti dua kali nilai x; kita belum dapat menentukan hasil akhirnya sebelum mengetahui nilai x.' },
      { type: 'math', tex: '2x+3=11' },
      { type: 'heading', text: 'Persamaan seperti timbangan seimbang' },
      { type: 'p', text: 'Tanda sama dengan menyatakan bahwa nilai di sisi kiri sama dengan nilai di sisi kanan. Bayangkan timbangan dengan dua sisi. Jika kita mengambil 3 satuan dari sisi kiri, kita juga harus mengambil 3 satuan dari sisi kanan agar tetap seimbang. Prinsip ini adalah alasan kita melakukan operasi yang sama pada kedua sisi persamaan.' },
      { type: 'p', text: 'Untuk menyelesaikan 2x + 3 = 11, kita ingin menyisakan x sendirian. Kebalikan penjumlahan adalah pengurangan, dan kebalikan perkalian adalah pembagian. Karena itu, kurangi 3 terlebih dahulu, lalu bagi 2.' },
      { type: 'math', tex: '2x+3=11\\Rightarrow2x=8\\Rightarrow x=4' },
      { type: 'heading', text: 'Suku sejenis dan penerapannya' },
      { type: 'p', text: 'Suku sejenis memiliki bagian variabel dan pangkat yang sama. Dua apel ditambah tiga apel menjadi lima apel; demikian pula 2x + 3x = 5x. Namun, 2x + 3y tidak bisa digabung menjadi 5xy karena x dan y mewakili hal yang berbeda. Ide ini membantu kita merapikan model biaya, menghitung kebutuhan bahan, serta menyusun rumus umum.' }
    ],
    examples: [
      { title: 'Contoh 1 · Persamaan satu langkah', problem: 'Selesaikan $2x+3=11$.', steps: ['Tujuan kita adalah membuat suku yang memuat x berdiri sendiri. Saat ini ada tambahan 3 di sisi kiri, jadi kurangi 3 pada kedua sisi agar keseimbangan terjaga: $2x+3-3=11-3$.', 'Sederhanakan kedua sisi. Angka +3 dan −3 saling menghapus, sedangkan 11 − 3 = 8. Kita memperoleh $2x=8$.', 'x masih dikalikan 2. Bagi kedua sisi dengan 2: $2x\\div2=8\\div2$, sehingga $x=4$.', 'Periksa jawaban ke persamaan awal: $2(4)+3=8+3=11$. Kedua sisi sama, jadi $x=4$ benar.'] },
      { title: 'Contoh 2 · Menggabungkan suku sejenis', problem: 'Sederhanakan $2a+3a- a$.', steps: ['Perhatikan bahwa ketiga suku memiliki variabel yang sama, yaitu a, dan pangkatnya sama. Jadi, semuanya adalah suku sejenis.', 'Gabungkan koefisiennya: $2+3-1=4$. Variabel a tetap ditulis karena semua suku memuat a.', 'Hasil akhirnya adalah $4a$. Jika a = 5, ekspresi ini bernilai 4 × 5 = 20.'] }
    ],
    quiz: [
      { question: 'Jika $x+5=12$, maka $x=...$', options: ['5','6','7','17'], answer: 2, explanation: 'Kurangi 5 dari kedua sisi: x = 12 − 5 = 7. Cek: 7 + 5 = 12.' },
      { question: 'Jika $3x=21$, maka $x=...$', options: ['6','7','8','9'], answer: 1, explanation: 'Bagi kedua sisi dengan 3 agar x sendiri: x = 21 ÷ 3 = 7.' },
      { question: 'Sederhanakan $2a+3a$.', options: ['5','5a','6a','a'], answer: 1, explanation: 'Kedua suku sejenis, sehingga koefisien dijumlahkan: 2a + 3a = (2 + 3)a = 5a.' },
      { question: 'Jika $2x-4=10$, nilai x adalah ...', options: ['3','5','7','8'], answer: 2, explanation: 'Tambahkan 4 pada kedua sisi: 2x = 14. Bagi 2, maka x = 7.' }
    ]
  },
  {
    id: 'geometri', tier: 'lanjut', title: 'Geometri Dasar', level: 'Lanjut', summary: 'Pahami luas, keliling, lingkaran, dan teorema Pythagoras.',
    lesson: [
      { type: 'heading', text: 'Bentuk, ukuran, dan ruang di sekitar kita' },
      { type: 'p', text: 'Geometri mempelajari bentuk, ukuran, posisi, dan hubungan ruang. Kita menggunakannya saat menghitung jumlah cat untuk dinding, memasang pagar di sekitar kebun, menentukan ukuran ubin, membaca peta, atau merancang kemiringan tangga. Dua pertanyaan penting dalam bangun datar adalah keliling dan luas, tetapi keduanya mengukur hal yang berbeda.' },
      { type: 'p', text: 'Keliling adalah panjang garis yang mengelilingi sebuah bangun. Bayangkan berjalan tepat di tepi taman; total jarak perjalanan itu adalah keliling. Luas adalah ukuran daerah yang tertutup di dalam batas bangun. Jika taman akan ditutupi rumput atau lantainya dipasang ubin, yang diperlukan adalah luas.' },
      { type: 'math', tex: 'K_{\\text{persegi}}=4s,\\qquad L_{\\text{persegi}}=s^2' },
      { type: 'p', text: 'Untuk persegi panjang, dua sisi memiliki panjang p dan dua sisi lainnya lebar l. Kelilingnya adalah p + l + p + l, yang dapat dikelompokkan menjadi 2(p + l). Luasnya p × l karena kita menghitung banyaknya persegi satuan yang mengisi baris dan kolom.' },
      { type: 'math', tex: 'K=2(p+l),\\qquad L=p\\times l' },
      { type: 'heading', text: 'Mengapa rumus lingkaran memakai π dan jari-jari?' },
      { type: 'p', text: 'Lingkaran memiliki jarak dari pusat ke tepi yang disebut jari-jari (r), sedangkan diameter adalah dua kali jari-jari. Untuk lingkaran apa pun, perbandingan keliling terhadap diameter selalu sama, yaitu π (pi), kira-kira 3,14159. Itulah sebabnya keliling dapat ditulis 2πr. Luas lingkaran adalah πr²; secara intuitif, lingkaran dapat dibagi menjadi banyak sektor lalu disusun mendekati persegi panjang dengan tinggi r dan panjang sekitar setengah keliling, yaitu πr, sehingga luasnya mendekati πr × r.' },
      { type: 'math', tex: 'K_{\\text{lingkaran}}=2\\pi r,\\qquad L_{\\text{lingkaran}}=\\pi r^2' },
      { type: 'heading', text: 'Teorema Pythagoras: hubungan sisi segitiga siku-siku' },
      { type: 'p', text: 'Pada segitiga yang memiliki satu sudut 90°, sisi terpanjang yang berhadapan dengan sudut siku-siku disebut hipotenusa atau sisi miring. Teorema Pythagoras menyatakan bahwa kuadrat panjang sisi miring sama dengan jumlah kuadrat kedua sisi siku-sikunya. Ini bukan sekadar trik mencari panjang: hubungan ini muncul dari kesetaraan luas persegi yang dibangun pada ketiga sisi segitiga siku-siku.' },
      { type: 'math', tex: 'a^2+b^2=c^2' },
      { type: 'p', text: 'Contoh nyata: tangga yang bersandar ke dinding membentuk segitiga siku-siku. Jika kaki tangga berjarak 3 meter dari dinding dan ujung atas mencapai ketinggian 4 meter, panjang tangga adalah √(3² + 4²) = 5 meter. Pastikan satuan panjang konsisten dan gunakan rumus ini hanya saat segitiganya siku-siku.' }
    ],
    examples: [
      { title: 'Contoh 1 · Luas persegi panjang', problem: 'Sebuah kamar memiliki panjang 6 m dan lebar 4 m. Berapa luas lantainya?', steps: ['Identifikasi ukuran yang diketahui: panjang p = 6 m dan lebar l = 4 m. Karena yang ditanyakan daerah lantai, kita perlu menghitung luas, bukan keliling.', 'Gunakan rumus luas persegi panjang: $L=p\\times l$. Rumus ini berasal dari jumlah kolom dikalikan jumlah baris persegi satuan.', 'Masukkan nilainya: $L=6\\times4=24$. Satuannya menjadi meter persegi karena meter dikalikan meter. Jadi luas lantai adalah 24 m².'] },
      { title: 'Contoh 2 · Teorema Pythagoras', problem: 'Segitiga siku-siku memiliki sisi siku-siku 3 cm dan 4 cm. Berapa panjang sisi miringnya?', steps: ['Pastikan sisi yang diketahui adalah dua sisi yang membentuk sudut 90°. Sisi miring c selalu berhadapan dengan sudut siku-siku.', 'Gunakan teorema Pythagoras: $c^2=a^2+b^2$. Masukkan a = 3 dan b = 4 sehingga $c^2=3^2+4^2$.', 'Hitung kuadratnya: $3^2=9$ dan $4^2=16$, jadi $c^2=9+16=25$.', 'Ambil akar kuadrat positif karena panjang tidak negatif: $c=\\sqrt{25}=5$. Periksa: 3, 4, dan 5 memang memenuhi 9 + 16 = 25. Jadi sisi miringnya 5 cm.'] }
    ],
    quiz: [
      { question: 'Luas persegi panjang dengan panjang 6 dan lebar 4 adalah ...', options: ['10','20','24','28'], answer: 2, explanation: 'Luas = panjang × lebar = 6 × 4 = 24 satuan persegi.' },
      { question: 'Jika sisi siku-siku segitiga adalah 3 dan 4, sisi miringnya ...', options: ['5','6','7','12'], answer: 0, explanation: 'c² = 3² + 4² = 9 + 16 = 25. Panjang c adalah √25 = 5.' },
      { question: 'Keliling persegi dengan sisi 5 cm adalah ...', options: ['10 cm','15 cm','20 cm','25 cm'], answer: 2, explanation: 'Persegi memiliki empat sisi sama panjang, sehingga keliling = 4 × 5 = 20 cm.' },
      { question: 'Jika jari-jari lingkaran 7 cm, luasnya (gunakan π = 22/7) adalah ...', options: ['44 cm²','88 cm²','154 cm²','308 cm²'], answer: 2, explanation: 'L = πr² = (22/7) × 7 × 7 = 154 cm².' }
    ]
  }
]