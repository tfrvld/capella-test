import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

config({ path: ".env" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

async function main() {
  await db.delete(schema.pengajuan);
  await db.delete(schema.nasabah);

  const dummyNasabah = [
    {
      idNasabah: "NSB-001",
      nama: "Budi Santoso",
      nomorTelepon: "081234567890",
      pendapatanBulanan: "5000000.00",
    },
    {
      idNasabah: "NSB-002",
      nama: "Siti Rahma",
      nomorTelepon: "082198765432",
      pendapatanBulanan: "8500000.00",
    },
    {
      idNasabah: "NSB-003",
      nama: "Ahmad Dahlan",
      nomorTelepon: "085711223344",
      pendapatanBulanan: "12000000.00",
    },
  ];

  await db.insert(schema.nasabah).values(dummyNasabah);

  const dummyPengajuan = [
    {
      idPengajuan: "PGJ-2026-001",
      idNasabah: "NSB-001",
      tenor: 12,
      tipePengajuan: "Sepeda Motor",
      nominalPengajuan: "10000000.00",
      tanggalPengajuan: new Date("2026-02-12"),
      pembayaranPerbulan: "1000000.00",
      status: "pending" as const,
      catatan: "Pengajuan pembelian sepeda motor baru",
    },
    {
      idPengajuan: "PGJ-2026-002",
      idNasabah: "NSB-002",
      tenor: 24,
      tipePengajuan: "Mobil",
      nominalPengajuan: "150000000.00",
      tanggalPengajuan: new Date("2026-03-01"),
      pembayaranPerbulan: "7200000.00",
      status: "approve" as const,
      catatan: "Dokumen lengkap dan disetujui",
    },
    {
      idPengajuan: "PGJ-2026-003",
      idNasabah: "NSB-003",
      tenor: 6,
      tipePengajuan: "Multiguna",
      nominalPengajuan: "25000000.00",
      tanggalPengajuan: new Date("2026-03-10"),
      pembayaranPerbulan: "4500000.00",
      status: "reject" as const,
      catatan:
        "Maksimal pengajuan telah terlampaui / riwayat kredit kurang baik",
    },
  ];

  await db.insert(schema.pengajuan).values(dummyPengajuan);

  console.log("seed success");
}

main()
  .catch((e) => {
    console.error("seed error:", e);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
