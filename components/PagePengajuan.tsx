"use client";

import { useState } from "react";
import Table from "@/components/ui/Table";
import SearchBar from "@/components/ui/SearchBar";
import { Pengajuan } from "@/interface/data";

interface data {
  data: Pengajuan[];
}

const PagePengajuan = ({ data }: data) => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="mt-5">
        <Table searchTerm={searchTerm} data={data} />
      </div>
    </div>
  );
};

export default PagePengajuan;
