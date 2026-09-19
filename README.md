# Capella Multidana - Sistem Pengajuan Kredit

Prototype internal tool untuk mencatat pengajuan kredit nasabah, melihat daftar pengajuan, dan mengubah status pengajuan (approve/reject). Dibuat sebagai bagian dari coding test IT Department PT Capella Multidana.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL (hosted di [Neon](https://neon.tech))
- **ORM**: Drizzle ORM
- **UI Feedback**: SweetAlert2

## Fitur

- Mencatat pengajuan kredit nasabah melalui form dengan kalkulasi cicilan real-time
- Melihat daftar pengajuan dalam bentuk tabel, dengan pencarian dan pagination
- Mengubah status pengajuan (Approve/Reject) melalui dialog konfirmasi
- Melihat detail pengajuan lengkap dengan kalkulasi cicilan per bulan
- Validasi bisnis:
  - Pendapatan bulanan nasabah minimal Rp1.000.000 untuk dapat mengajukan pinjaman
  - Nominal pengajuan maksimal Rp200.000.000
  - Tenor maksimal 24 bulan
  - Status yang sudah ditetapkan (approve/reject) tidak dapat diubah kembali

## Cara Menjalankan Project

### 1. Clone repository

```bash
git clone https://github.com/tfrvld/capella-test
cd capella-multidana-test-trifahmi
```

### 2. Install dependencies

```bash
npm install
```

### 3. Konfigurasi environment variable

Buat file `.env` di root project (contoh tersedia di `.env.example`), isi dengan connection string PostgreSQL dibawah ini jika `.env` tidak ada:

```
DATABASE_URL="postgresql://neondb_owner:npg_6IXvn5ZpiMgV@ep-jolly-king-b4umbdi9-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
```
*key ini saya share karna tidak mengandung data pribadi dan ini project untuk testing

> Project ini dikembangkan menggunakan database Postgres gratis dari [Neon](https://neon.tech). Anda bisa membuat database sendiri di sana, atau menghubungi kandidat untuk connection string yang sudah berisi data contoh.

### 4. Jalankan migrasi database

```bash
npx drizzle-kit push
```

Perintah ini akan membuat tabel `nasabah` dan `pengajuan` sesuai skema di `src/db/schema.ts`.

### 5. Jalankan development server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## Struktur Folder

```
app/
  page.tsx              # Halaman utama (tabel daftar pengajuan)
  add/page.tsx          # Halaman tambah pengajuan kredit
  api/
    pengajuan/
      route.ts          # POST — tambah pengajuan baru
      [id]/route.ts     # PATCH — ubah status approve/reject
components/
  PagePengajuan.tsx     # Wrapper client (state pencarian + tabel)
  ui/
    Table.tsx           # Tabel daftar pengajuan
    SearchBar.tsx        # Search bar + navigasi
    PopUpDetail.tsx      # Popup detail pengajuan
src/
  db/
    schema.ts           # Skema database Drizzle
  index.ts              # Koneksi database (Neon + Drizzle)
lib/
  cicilan.ts             # Helper kalkulasi cicilan & format Rupiah
interface/
  data.ts                # TypeScript interface (Nasabah, Pengajuan)
```

## Kalkulasi Cicilan

Cicilan per bulan dihitung menggunakan skema bunga flat 12%/tahun:

```
bunga = nominal × 12% × (tenor / 12)
cicilan per bulan = (nominal + bunga) / tenor
```

> Skema bunga tidak ditentukan secara eksplisit di spesifikasi coding test, sehingga 12%/tahun flat digunakan sebagai asumsi kerja dan dapat disesuaikan di `lib/cicilan.ts`.

## Catatan Pengembangan

- Approve/reject tidak bisa diubah kembali setelah ditetapkan (dicek di sisi UI; disarankan menambahkan pengecekan yang sama di level query untuk pengamanan tambahan)
- Validasi pembatasan maksimal 3 pengajuan per nasabah belum diimplementasikan pada versi ini

## Kontak

Trifahmi Rivaldo (TFRVLD)
