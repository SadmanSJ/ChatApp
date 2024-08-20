import React from "react";
import { BsSearch } from "react-icons/bs";

export default function SearchBar() {
  return (
    <div className="flex px-4 items-center w-full group group-focus-within:outline-purple-500 bg-neutral-900 rounded-full overflow-hidden">
      <BsSearch className="icon" size={20} />

      <input
        className="ml-2 h-10 w-full bg-transparent outline-none rounded-full text-base"
        type="text"
        name="search"
        placeholder="Search"
      />
    </div>
  );
}
