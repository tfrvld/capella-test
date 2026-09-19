export interface Nasabah {
  idNasabah: string;
  nama: string;
  nomorTelepon: string;
  pendapatanBulanan: string;
}

export type StatusPengajuan = "pending" | "approve" | "reject";

export interface Pengajuan {
  idPengajuan: string;
  idNasabah: string;
  tenor: number;
  tipePengajuan: string;
  nominalPengajuan: string;
  tanggalPengajuan: Date;
  pembayaranPerbulan: string;
  status: StatusPengajuan;
  catatan: string | null;
  nasabah: Nasabah;
}
