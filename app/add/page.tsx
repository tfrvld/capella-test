"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { calculateCicilan, formatRupiah } from "@/lib/cicilan";
import Left from "@/src/svg/caret-left";

const TENOR_MIN = 6;
const TENOR_MAX = 24;
const NOMINAL_MIN = 3_000_000;
const NOMINAL_MAX = 200_000_000;
const MIN_PENDAPATAN = 1_000_000;

const tipeOptions = [
  { value: "mobil", label: "Mobil" },
  { value: "sepeda_motor", label: "Sepeda Motor" },
  { value: "multiguna", label: "Multiguna" },
];

const Page = () => {
  const router = useRouter();

  const [nama, setNama] = useState("");
  const [pendapatan, setPendapatan] = useState("");
  const [nomorTelepon, setNomorTelepon] = useState("");
  const [tipe, setTipe] = useState("multiguna");
  const [nominal, setNominal] = useState(NOMINAL_MIN);
  const [tenor, setTenor] = useState(TENOR_MIN);
  const [catatan, setCatatan] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const cicilan = useMemo(
    () => calculateCicilan(nominal, tenor),
    [nominal, tenor],
  );

  const handleSubmit = async () => {
    if (!nama.trim()) {
      Swal.fire("Gagal", "Nama nasabah wajib diisi.", "error");
      return;
    }
    const pendapatanNum = Number(pendapatan);
    if (!pendapatanNum || pendapatanNum < MIN_PENDAPATAN) {
      Swal.fire(
        "Gagal",
        "Nasabah belum dapat mengajukan pinjaman pendapatan terlalu rendah",
        "error",
      );
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/pengajuan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama,
          nomorTelepon,
          pendapatanBulanan: pendapatanNum,
          tipePengajuan: tipe,
          nominalPengajuan: nominal,
          tenor,
          pembayaranPerbulan: Math.round(cicilan),
          catatan,
        }),
      });
      if (!res.ok) throw new Error();
      await Swal.fire("Berhasil", "Pengajuan berhasil ditambahkan.", "success");
      router.push("/");
      router.refresh();
    } catch (e) {
      Swal.fire("Gagal", `Terjadi kesalahan, coba lagi. ${e}`, "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items- center text-black">
      <div className="mt-5 bg-[#fcfcfc] w-[90vw] md:w-[70vw] p-5 rounded-[10px] shadow">
        {/* DESKTOP */}
        <section>
          <div className="flex items-center gap-4 mb-6 justify-between">
            <button
              onClick={() => router.back()}
              className="text-gray-800 cursor-pointer"
            >
              <div className="flex items-center">
                <Left className="w-5 h-5 md:w-8 md:h-8" />
              </div>
            </button>
            <h1 className="text-lg md:text-2xl font-viga">
              Tambah Pengajuan Kredit
            </h1>
            <div className="w-5 h-5 md:w-8 md:h-8"></div>
          </div>

          <div className=" w-full justify-evenly items-center hidden md:flex">
            <div className="flex flex-col items-center w-[100px]">
              <div className="p-2 w-6 h-6 text-sm bg-main  rounded-full line flex justify-center items-center">
                <p>1</p>
              </div>
              <p className="text-lg text-center">Informasi Nasabah</p>
            </div>
            <div className="h-[1px] w-[150px] border border-dashed border-black"></div>
            <div className="flex flex-col items-center w-[100px]">
              <div className="p-2 w-6 h-6 text-sm bg-main  rounded-full line flex justify-center items-center">
                <p>2</p>
              </div>
              <p className="text-lg text-center">Informasi Pengajuan</p>
            </div>
            <div className="h-[1px] w-[150px] border border-dashed border-black"></div>
            <div className="flex flex-col items-center w-[100px]">
              <div className="p-2 w-6 h-6 text-sm bg-main  rounded-full line flex justify-center items-center">
                <p>3</p>
              </div>
              <p className="text-lg text-center">Catatan</p>
            </div>
          </div>

          <div className=" grid-cols-3 gap-5 p-5 justify-between hidden md:grid">
            <div>
              <label className="text-sm text-gray-800">Nama Nasabah</label>
              <input
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Masukkan nama"
                className="w-full border bg-gray-200 rounded-lg px-3 py-2 mt-1 mb-3 text-sm"
              />
              <label className="text-sm text-gray-800">
                Pendapatan Bulanan Nasabah
              </label>
              <input
                type="number"
                value={pendapatan}
                onChange={(e) => setPendapatan(e.target.value)}
                placeholder="Masukkan pendapatan"
                className="w-full border bg-gray-200 rounded-lg px-3 py-2 mt-1 text-sm"
              />
              <label className="text-sm text-gray-800">
                Nomor Telepon Nasabah
              </label>
              <input
                type="string"
                value={nomorTelepon}
                onChange={(e) => setNomorTelepon(e.target.value)}
                placeholder="Masukkan nomor telepon"
                className="w-full border bg-gray-200 rounded-lg px-3 py-2 mt-1 text-sm appearance-none"
              />
            </div>
            {/* ---------- */}
            <div>
              <label className="text-sm text-gray-800 block mb-2">
                Tipe Pengajuan
              </label>
              <div className="flex gap-2 mb-4 flex-wrap">
                {tipeOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setTipe(opt.value)}
                    className={`px-3 py-2 rounded-lg text-sm border cursor-pointer ${
                      tipe === opt.value
                        ? "bg-main border-main font-medium"
                        : "border-gray-200 text-gray-800"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              <label className="text-sm text-gray-800">Nominal Pengajuan</label>
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>3 juta</span>
                <span>200 juta</span>
              </div>
              <input
                type="range"
                min={NOMINAL_MIN}
                max={NOMINAL_MAX}
                step={1_000_000}
                value={nominal}
                onChange={(e) => setNominal(Number(e.target.value))}
                className="w-full accent-[#FFC043]"
              />
              <input
                readOnly
                value={formatRupiah(nominal)}
                className="w-full border rounded-lg px-3 py-2 mt-1 mb-4 text-sm bg-gray-200"
              />

              <label className="text-sm text-gray-800">
                Tenor/Lama Pinjaman
              </label>
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>6 bulan</span>
                <span>24 bulan</span>
              </div>
              <input
                type="range"
                min={TENOR_MIN}
                max={TENOR_MAX}
                step={1}
                value={tenor}
                onChange={(e) => setTenor(Number(e.target.value))}
                className="w-full accent-[#FFC043]"
              />
              <input
                readOnly
                value={`${tenor} Bulan`}
                className="w-full border rounded-lg px-3 py-2 mt-1 text-sm bg-gray-200"
              />
            </div>
            {/* ----------- */}
            <div className="">
              <div>
                <textarea
                  value={catatan}
                  onChange={(e) => setCatatan(e.target.value)}
                  placeholder="Tulis catatan (opsional)"
                  rows={5}
                  className="w-full border bg-gray-200 rounded-lg px-3 py-2 text-sm resize-none"
                />
              </div>

              <div className="bg-gray-100 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-800 font-semibold">
                  CICILAN PERBULAN
                </p>
                <p className="text-[10px] text-gray-400 mb-1">
                  *Terhitung bunga flat 12%
                </p>
                <p className="text-xl font-bold text-gray-800">
                  {formatRupiah(cicilan)}
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* MOBILE */}
        <section>
          <div className=" w-full justify-evenly items-start flex flex-col md:hidden">
            <div className="flex items-center w-[300px] gap-2">
              <div className="p-2 w-6 h-6 text-sm bg-main rounded-full line flex justify-center items-center">
                <p>1</p>
              </div>
              <p className="text-lg text-center">Informasi Nasabah</p>
            </div>
            <div className="flex">
              <div className="w-[1px] h-[250px] ml-3 border border-dashed border-black"></div>
              <div className="pl-3">
                <label className="text-sm text-gray-800">Nama Nasabah</label>
                <input
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Masukkan nama"
                  className="w-full border bg-gray-200 rounded-lg px-3 py-2 mt-1 mb-3 text-sm"
                />
                <label className="text-sm text-gray-800">
                  Pendapatan Bulanan Nasabah
                </label>
                <input
                  type="number"
                  value={pendapatan}
                  onChange={(e) => setPendapatan(e.target.value)}
                  placeholder="Masukkan pendapatan"
                  className="w-full border bg-gray-200 rounded-lg px-3 py-2 mt-1 text-sm"
                />
                <label className="text-sm text-gray-800">
                  Nomor Telepon Nasabah
                </label>
                <input
                  type="string"
                  value={nomorTelepon}
                  onChange={(e) => setNomorTelepon(e.target.value)}
                  placeholder="Masukkan nomor telepon"
                  className="w-full border bg-gray-200 rounded-lg px-3 py-2 mt-1 text-sm appearance-none"
                />
              </div>
            </div>
            <div className="flex items-center w-[300px] gap-2">
              <div className="p-2 w-6 h-6 text-sm bg-main rounded-full line flex justify-center items-center">
                <p>2</p>
              </div>
              <p className="text-lg text-center">Informasi Pengajuan</p>
            </div>
            <div className="flex">
              <div className="w-[1px] h-[400px] ml-3 border border-dashed border-black"></div>
              <div className="pl-3">
                <label className="text-sm text-gray-800 block mb-2">
                  Tipe Pengajuan
                </label>
                <div className="flex gap-2 mb-4 flex-wrap">
                  {tipeOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setTipe(opt.value)}
                      className={`px-3 py-2 rounded-lg text-sm border cursor-pointer ${
                        tipe === opt.value
                          ? "bg-main border-main font-medium"
                          : "border-gray-200 text-gray-800"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                <label className="text-sm text-gray-800">
                  Nominal Pengajuan
                </label>
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>3 juta</span>
                  <span>200 juta</span>
                </div>
                <input
                  type="range"
                  min={NOMINAL_MIN}
                  max={NOMINAL_MAX}
                  step={1_000_000}
                  value={nominal}
                  onChange={(e) => setNominal(Number(e.target.value))}
                  className="w-full accent-[#FFC043]"
                />
                <input
                  readOnly
                  value={formatRupiah(nominal)}
                  className="w-full border rounded-lg px-3 py-2 mt-1 mb-4 text-sm bg-gray-200"
                />

                <label className="text-sm text-gray-800">
                  Tenor/Lama Pinjaman
                </label>
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>6 bulan</span>
                  <span>24 bulan</span>
                </div>
                <input
                  type="range"
                  min={TENOR_MIN}
                  max={TENOR_MAX}
                  step={1}
                  value={tenor}
                  onChange={(e) => setTenor(Number(e.target.value))}
                  className="w-full accent-[#FFC043]"
                />
                <input
                  readOnly
                  value={`${tenor} Bulan`}
                  className="w-full border rounded-lg px-3 py-2 mt-1 text-sm bg-gray-200"
                />
              </div>
            </div>
            <div className="flex items-center w-[300px] gap-2">
              <div className="p-2 w-6 h-6 text-sm bg-main rounded-full line flex justify-center items-center">
                <p>3</p>
              </div>
              <p className="text-lg text-center">Catatan</p>
            </div>
            <div className="flex">
              <div className="w-[1px] h-[230px] ml-3 border border-dashed border-black"></div>
              <div className="pl-3">
                <div>
                  <textarea
                    value={catatan}
                    onChange={(e) => setCatatan(e.target.value)}
                    placeholder="Tulis catatan (opsional)"
                    rows={5}
                    className="w-full border bg-gray-200 rounded-lg px-3 py-2 text-sm resize-none"
                  />
                </div>

                <div className="bg-gray-100 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-800 font-semibold">
                    CICILAN PERBULAN
                  </p>
                  <p className="text-[10px] text-gray-400 mb-1">
                    *Terhitung bunga flat 12%
                  </p>
                  <p className="text-xl font-bold text-gray-800">
                    {formatRupiah(cicilan)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full bg-main mt-6 py-3 rounded-lg font-medium cursor-pointer disabled:opacity-50"
        >
          {submitting ? "Menyimpan..." : "Tambahkan Pengajuan"}
        </button>
      </div>
    </div>
  );
};

export default Page;
