"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { LogOut, Plus, Search } from "lucide-react";
import Link from "next/link";
import { SignOutButton, SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (search) {
      router.push(`/search/posts/${search}`);
    } else {
      return false;
    }
  };
  return (
    <div className="w-full  flex justify-between gap-4 items-center mt-6">
      <div className="relative">
        <Input
          size={"sm"}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-gray-700 text-gray-300 border-none py-1"
          placeholder="Search posts ..."
        />
        <Search
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 "
          onClick={handleSearch}
        />
      </div>
      <Button className="hidden md:flex" size={"sm"}>
        <Link className="flex items-center gap-1" href={"/create-post"}>
          <Plus size={20} />
          <p>Create Post</p>
        </Link>
      </Button>

      <div className="flex gap-3">
        <SignedIn>
          <SignOutButton>
            <div className="flex gap-4  justify-start rounded-lg py-2 px-4 ">
              <LogOut size={30} className="text-white md:hidden" />
            </div>
          </SignOutButton>
        </SignedIn>
        <Link href={"/"}>
          <Image
            src={"/mok.jpg"}
            className="rounded-full border-2 md:hidden "
            alt="logo"
            width={50}
            height={50}
          />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
