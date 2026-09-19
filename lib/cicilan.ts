const ANNUAL_FLAT_RATE = 0.12; // asumsi 12%/tahun flat

export function calculateCicilan(nominal: number, tenor: number) {
  if (!nominal || !tenor) return 0;
  const bunga = nominal * ANNUAL_FLAT_RATE * (tenor / 12);
  return (nominal + bunga) / tenor;
}

export function formatRupiah(value: number) {
  return "Rp." + new Intl.NumberFormat("id-ID").format(Math.round(value));
}
