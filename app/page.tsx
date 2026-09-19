import PagePengajuan from "@/components/PagePengajuan";
import { db } from "@/src/index";

export default async function Home() {
  const data = await db.query.pengajuan.findMany({
    with: {
      nasabah: true,
    },
  });

  console.log(data);
  return (
    <div className="px-[40px] mt-[50px]">
      <PagePengajuan data={data} />
    </div>
  );
}
