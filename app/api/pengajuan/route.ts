import { NextRequest, NextResponse } from "next/server";
import { db } from "@/src/index";
import { nasabah, pengajuan } from "@/src/db/schema";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const [newNasabah] = await db
    .insert(nasabah)
    .values({
      nama: body.nama,
      nomorTelepon: body.nomorTelepon ?? "-",
      pendapatanBulanan: body.pendapatanBulanan,
    })
    .returning();

  const [newPengajuan] = await db
    .insert(pengajuan)
    .values({
      idNasabah: newNasabah.idNasabah,
      tenor: body.tenor,
      tipePengajuan: body.tipePengajuan,
      nominalPengajuan: body.nominalPengajuan,
      pembayaranPerbulan: body.pembayaranPerbulan,
      catatan: body.catatan || null,
      status: "pending",
    })
    .returning();

  return NextResponse.json(newPengajuan);
}
