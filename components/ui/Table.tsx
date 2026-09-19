"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

import { Pengajuan } from "@/interface/data";

import Check from "@/src/svg/check";
import XCircle from "@/src/svg/x-circle";
import Info from "@/src/svg/info-circle";

interface TableProps {
  searchTerm: string;
  data: Pengajuan[];
}

export default function Table({ searchTerm, data }: TableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const router = useRouter();

  const handleApprove = async (id: string) => {
    Swal.fire({
      title: "Apakah anda yakin ingin Approve?",
      text: "Anda tidak dapat merubah status setelah mengubahnya.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Approve!",
    }).then(async (result) => {
      if (result.isConfirmed)
        await fetch(`/api/pengajuan/${id}`, {
          method: "PATCH",
          body: JSON.stringify({ status: "approve" }),
        });
      Swal.fire({
        title: "Approve",
        text: "Pengajuan berhasil disetujui.",
        icon: "success",
      });
      router.refresh();
    });
  };

  const handleReject = async (id: string) => {
    Swal.fire({
      title: "Apakah anda yakin ingin Reject?",
      text: "Anda tidak dapat merubah status setelah mengubahnya.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Reject!",
    }).then(async (result) => {
      if (result.isConfirmed)
        await fetch(`/api/pengajuan/${id}`, {
          method: "PATCH",
          body: JSON.stringify({ status: "Reject" }),
        });
      Swal.fire({
        title: "Reject",
        text: "Pengajuan berhasil ditolak.",
        icon: "error",
      });
      router.refresh();
    });
  };

  const filteredData = data.filter((item) => {
    const term = searchTerm.toLowerCase();
    return (
      item.nasabah.nama.toLowerCase().includes(term) ||
      item.tipePengajuan.toLowerCase().includes(term) ||
      item.status.toLowerCase().includes(term)
    );
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full text-left text-sm text-gray-600">
        <thead className="bg-[#FFC043]/20 text-xs text-gray-800 uppercase">
          <tr>
            <th className="px-4 py-3 text-center">No</th>
            <th className="px-4 py-3">Nama Nasabah</th>
            <th className="px-4 py-3">Tipe Pengajuan</th>
            <th className="px-4 py-3 text-right">Nominal</th>
            <th className="px-4 py-3 text-right">Tenor</th>
            <th className="px-4 py-3 text-right">Tagihan</th>
            <th className="px-4 py-3 text-center">Tanggal</th>
            <th className="px-4 py-3 text-center">Status</th>
            <th className="px-4 py-3 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {currentData.length > 0 ? (
            currentData.map((item, idx) => (
              <tr key={idx} className="hover:bg-amber-50/40">
                <td className="px-4 py-3 text-center font-medium">{idx + 1}</td>
                <td className="px-4 py-3 font-semibold text-gray-800">
                  {item.nasabah.nama}
                </td>
                <td className="px-4 py-3">{item.tipePengajuan}</td>
                <td className="px-4 py-3 text-right font-medium">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(Number(item.nominalPengajuan))}
                </td>
                <td className="px-4 py-3 text-right">{item.tenor}</td>
                <td className="px-4 py-3 text-right font-medium">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(Number(item.pembayaranPerbulan))}
                </td>
                <td className="px-4 py-3 text-center">
                  {new Date(item.tanggalPengajuan).toLocaleDateString("id-ID")}
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="rounded-md bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-800">
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-center space-x-1">
                  <button
                    className="rounded bg-gray-300 hover:bg-emerald-500 px-1 py-1 text-xs text-white transition-all"
                    onClick={() => handleApprove(item.idPengajuan)}
                  >
                    <Check className="w-5 h-5" />
                  </button>
                  <button
                    className="rounded bg-gray-300 hover:bg-rose-500 px-1 py-1 text-xs text-white transition-all"
                    onClick={() => handleReject(item.idPengajuan)}
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                  <button className="rounded bg-gray-300 hover:bg-sky-500 px-1 py-1 text-xs text-white transition-all">
                    <Info className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9} className="px-4 py-6 text-center text-gray-400">
                Data tidak ditemukan
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex items-center justify-between border-t border-gray-100 bg-white px-4 py-3 text-sm text-gray-600">
        <div>
          Menampilkan{" "}
          <span className="font-semibold">{currentData.length}</span> dari{" "}
          <span className="font-semibold">{filteredData.length}</span> data
        </div>

        <div className="flex gap-1">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="rounded border border-gray-200 px-3 py-1 text-xs hover:bg-gray-100 disabled:opacity-40 transition-all"
          >
            Sebelumnya
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`rounded px-3 py-1 text-xs font-medium transition-all ${
                currentPage === i + 1
                  ? "bg-[#FFC043] text-white"
                  : "border border-gray-200 hover:bg-gray-100 text-gray-600"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="rounded border border-gray-200 px-3 py-1 text-xs hover:bg-gray-100 disabled:opacity-40 transition-all"
          >
            Selanjutnya
          </button>
        </div>
      </div>
    </div>
  );
}
