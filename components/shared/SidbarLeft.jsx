import { Facebook, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Menu from "./Menu";
import { SignOutButton, SignedIn, UserButton } from "@clerk/nextjs";

const SidbarLeft = () => {
  return (
    <div className="min-h-screen sticky left-0 top-0 overflow-auto px-10 flex flex-col gap-6 py-4 max-md:hidden">
      <Link
        href={"/"}
        className="flex items-baseline justify-center text-white"
      >
        <Facebook size={40} />
        <p className="text-4xl font-bold text-sky-500 -ml-2 -mt-1">eedz</p>
      </Link>
      <div className=" flex flex-col gap-4">
        <div className="flex flex-col gap-2 items-center text-white">
          <Link href={"/"}>
            <Image
              src={"/mok.jpg"}
              className="rounded-full border-2 "
              alt="logo"
              width={60}
              height={60}
            />
          </Link>
          <p className="text-sm font-bold">Moknine</p>
        </div>
        <div className="flex items-center text-white justify-between">
          <div className=" flex justify-center flex-col items-center">
            <p className="text-base font-bold">1</p>
            <p className="text-base font-medium">Posts</p>
          </div>
          <div className=" flex justify-center flex-col items-center">
            <p className="text-base font-bold">0</p>
            <p className="text-base font-medium">Followers</p>
          </div>
          <div className=" flex justify-center flex-col items-center">
            <p className="text-base font-bold">1</p>
            <p className="text-base font-medium">Following</p>
          </div>
        </div>
        {/* Top User  */}
        <hr />
        <Menu />
        <hr />
        <div className="flex gap-4 items-center py-2 px-4 ">
          <UserButton />
          <p className=" font-semibold text-white">Manage Account</p>
        </div>
        <SignedIn>
          <SignOutButton>
            <div className="flex gap-4  justify-start rounded-lg py-2 px-4 ">
              <LogOut size={30} className="text-white" />
              <p className="font-semibold text-white">Log out</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </div>
  );
};

export default SidbarLeft;
