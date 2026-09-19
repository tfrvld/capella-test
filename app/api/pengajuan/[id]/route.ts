import { NextRequest, NextResponse } from "next/server";
import { db } from "@/src/index";
import { pengajuan } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json();

  await db
    .update(pengajuan)
    .set({ status: body.status })
    .where(eq(pengajuan.idPengajuan, id));

  return NextResponse.json({ success: true });
}
