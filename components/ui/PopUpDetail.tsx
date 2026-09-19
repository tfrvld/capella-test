import React from "react";

import { Pengajuan } from "@/interface/data";
import Close from "@/src/svg/x-lg";

interface TableProps {
  onClose: () => void;
  data: Pengajuan;
}

const PopUpDetail = ({ data, onClose }: TableProps) => {
  return (
    <div className="h-[100vh] w-[100vw] bg-black/40 absolute z-10 left-0 top-0 flex justify-center items-center">
      <div className="w-[70vw] lg:w-[50vw] h-[80vh] bg-[#fcfcfc] rounded-[10] p-5 hidden md:block">
        <div className="flex justify-between">
          <div className="cursor-pointer" onClick={onClose}>
            <Close className="text-black w-10 h-10" />
          </div>
          <div>
            <p className="font-viga text-black text-[25px] text-center">
              DETAIL NASABAH
            </p>
            <p className="text-gray-600 text-center">
              {data.nasabah.nama} - {data.nasabah.nomorTelepon}
            </p>
          </div>
          <div className="w-10 h-10"></div>
        </div>
        <div className="flex justify-evenly mt-10">
          <div className="w-[20vw] flex flex-col gap-10 justify-center ml-[5vw]">
            <div>
              <p className="text-gray-400 text-md">Pendapatan Bulanan</p>
              <p className="text-gray-800 text-lg font-bold">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(Number(data.nasabah.pendapatanBulanan))}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-md">Tenor</p>
              <p className="text-gray-800 text-xl font-bold">{data.tenor}</p>
            </div>
            <div>
              <p className="text-gray-400 text-md">Tipe Pengajuan</p>
              <p className="text-gray-800 text-xl font-bold">
                {data.tipePengajuan}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-md">Nominal Pengajuan</p>
              <p className="text-gray-800 text-xl font-bold">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(Number(data.nominalPengajuan))}
              </p>
            </div>
          </div>
          <div className="w-[2px] h-100 bg-gray-300"></div>
          <div className="w-[20vw] flex flex-col gap-10 justify-center ml-[5vw]">
            <div>
              <p className="text-gray-400 text-md">Tanggal Pengajuan</p>
              <p className="text-gray-800 text-lg font-bold">
                {new Date(data.tanggalPengajuan).toLocaleDateString("id-ID")}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-md">Pembayaran Bulanan</p>
              <p className="text-gray-800 text-xl font-bold">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(Number(data.pembayaranPerbulan))}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-md">Status</p>
              <p className="text-gray-800 text-xl font-bold">
                <span className="rounded-md bg-amber-100 px-2 py-1 text-xl font-semibold text-amber-800">
                  {data.status}
                </span>
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-md">Nominal Pengajuan</p>
              <p className="text-gray-800 text-lg font-bold">{data.catatan}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[90vw] max-w-2xl max-h-[85vh] bg-[#fcfcfc] rounded-[10px] p-5 overflow-y-auto md:hidden">
        <div className="flex justify-between items-start">
          <div className="cursor-pointer shrink-0" onClick={onClose}>
            <Close className="text-black w-8 h-8 md:w-10 md:h-10" />
          </div>
          <div className="flex-1 px-2">
            <p className="font-viga text-black text-[18px] md:text-[25px] text-center">
              DETAIL NASABAH
            </p>
            <p className="text-gray-600 text-[13px] md:text-[20px] text-center">
              {data.nasabah.nama} - {data.nasabah.nomorTelepon}
            </p>
          </div>
          <div className="w-8 h-8 md:w-10 md:h-10 shrink-0"></div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-4 mt-8 md:mt-10">
          <div className="flex-1 flex flex-col gap-6 md:gap-10 justify-center">
            <div>
              <p className="text-gray-400 text-xs md:text-sm">
                Pendapatan Bulanan
              </p>
              <p className="text-gray-800 text-md md:text-lg font-bold">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(Number(data.nasabah.pendapatanBulanan))}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-xs md:text-sm">Tenor</p>
              <p className="text-gray-800 text-md md:text-xl font-bold">
                {data.tenor}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-xs md:text-sm">Tipe Pengajuan</p>
              <p className="text-gray-800 text-md md:text-xl font-bold">
                {data.tipePengajuan}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-xs md:text-sm">
                Nominal Pengajuan
              </p>
              <p className="text-gray-800 text-md md:text-xl font-bold">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(Number(data.nominalPengajuan))}
              </p>
            </div>
          </div>

          <div className="hidden md:block w-[2px] h-full bg-gray-300"></div>
          <div className="block md:hidden h-[2px] w-full bg-gray-300"></div>

          <div className="flex-1 flex flex-col gap-6 md:gap-10 justify-center">
            <div>
              <p className="text-gray-400 text-xs md:text-sm">
                Tanggal Pengajuan
              </p>
              <p className="text-gray-800 text-md md:text-lg font-bold">
                {new Date(data.tanggalPengajuan).toLocaleDateString("id-ID")}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-xs md:text-sm">
                Pembayaran Bulanan
              </p>
              <p className="text-gray-800 text-md md:text-xl font-bold">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(Number(data.pembayaranPerbulan))}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-xs md:text-sm">Status</p>
              <span className="inline-block rounded-md bg-amber-100 px-2 py-1 text-md md:text-xl font-semibold text-amber-800">
                {data.status}
              </span>
            </div>
            <div>
              <p className="text-gray-400 text-xs md:text-sm">Catatan</p>
              <p className="text-gray-800 text-md md:text-lg font-bold break-words">
                {data.catatan || "-"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUpDetail;
