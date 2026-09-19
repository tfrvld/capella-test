"use client";

import { useState } from "react";

import React from "react";
import Plus from "@/src/svg/plus-circle";
import Search from "@/src/svg/search";

interface TableProps {
  searchTerm: string;
  setSearchTerm: (hasil: string) => void;
}

const SearchBar = ({ searchTerm, setSearchTerm }: TableProps) => {
  // const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="px-10 flex justify-between">
      <div className="flex gap-3">
        <div className="bg-main py-2 px-3 rounded-[10px]">
          <p className="text-black font-medium">Pengajuan Nasabah</p>
        </div>
        <div className="bg-main py-2 px-2 rounded-[10px]">
          <Plus />
        </div>
      </div>
      <div className="flex gap-3">
        <div className="bg-[#fff]/50 border-2 border-main py-2 px-3 rounded-[10px] flex justify-between w-[300px]">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="focus:outline-none text-black/70 bg-transparent w-full pr-2"
          />
          <button className="cursor-pointer">
            <Search />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
