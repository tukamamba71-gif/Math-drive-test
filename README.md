# MatematikaKu

Aplikasi pembelajaran matematika interaktif dengan React, Vite, TypeScript-ready data conventions, Framer Motion, dan KaTeX. Repo ini saat ini menggunakan **Vite + React**, bukan Next.js App Router; struktur yang ada dipertahankan agar perbaikan tidak memutus aplikasi yang sudah berjalan.

## Fitur
- Jalur materi atomik dengan navigasi berantai dan fallback aman.
- Materi dan contoh langkah demi langkah.
- Generator soal acak berdasarkan topik, distraktor, pembahasan, serta latihan cerita.
- Progres, streak harian, dan badge yang tersimpan di LocalStorage.
- Theme Switcher: Grand Line Realm, Survey Corps Realm, dan Eclipse Realm.
- Tampilan responsif dengan animasi Framer Motion.

## Prasyarat
- Node.js 20 LTS atau versi LTS yang didukung Vite.
- npm.

## Jalankan secara lokal

```bash
git clone https://github.com/tukamamba71-gif/Math-drive-test.git
cd Math-drive-test
npm install
npm run dev
```

Vite akan menampilkan URL lokal di terminal (umumnya `http://localhost:5173`).

## Build dan pemeriksaan lokal

```bash
npm run build
npm run preview
```

Pastikan build berhasil sebelum melakukan deploy. Jika build gagal, baca pesan pertama di terminal dan perbaiki dependensi atau import yang disebutkan.

## Upload perubahan ke GitHub

Jika repo sudah dikloning dan perubahan telah dibuat secara lokal:

```bash
git status
git add .
git commit -m "Improve math curriculum and quiz navigation"
git push origin main
```

Jika branch default bukan `main`, ganti nama branch pada perintah terakhir sesuai branch repo.

## Deploy ke Vercel
1. Buka https://vercel.com/ dan masuk dengan akun GitHub.
2. Pilih **Add New → Project**, lalu import `tukamamba71-gif/Math-drive-test`.
3. Untuk proyek yang ada sekarang, Vercel biasanya mendeteksi Vite. Gunakan **Build Command** `npm run build` dan **Output Directory** `dist`.
4. Pilih **Deploy**. Setiap push ke branch yang terhubung akan memicu deployment baru.
5. Setelah deployment, uji dashboard, buka beberapa modul, pindah modul, kerjakan kuis, refresh halaman, dan pastikan progres/tema tetap tersimpan.

> Catatan: proyek ini belum dikonversi menjadi Next.js App Router. Jangan mengganti framework di pengaturan Vercel menjadi Next.js tanpa migrasi source dan dependensi secara menyeluruh.

## Data dan navigasi
Sumber kurikulum yang dipakai aplikasi berada di `src/data/atomicModules.js`. Tiap modul dibangun dengan ID kanonis dan tautan modul berikutnya. Generator soal berada di `src/lib/quizGenerator.js`. Tema petualangan berada di `src/components/ThemeSwitcher.jsx`.

## Penyimpanan
Progres, streak, dan tema disimpan pada perangkat/browser melalui LocalStorage. Data ini tidak otomatis tersinkron lintas perangkat dan dapat hilang bila penyimpanan browser dibersihkan.
