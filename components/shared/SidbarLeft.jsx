"use client";

import { Facebook, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import { SignOutButton, SignedIn, UserButton, useUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const SidbarLeft = () => {
  const { user, isLoaded } = useUser();
  const [loading, setloading] = useState(true);
  const [userData, setUserData] = useState();

  const getCurrentUser = async () => {
    const response = await fetch(`/api/users/${user?.id}`);
    const data = await response.json();
    setUserData(data);
    setloading(false);
  };
  useEffect(() => {
    getCurrentUser();
  }, [user]);

  // console.log(userData);
  if (loading) return <div>Loading...</div>;
  return (
    <div className="min-h-screen text-sm sticky left-0 top-0 overflow-auto mt-1 px-4 md:px-6 flex flex-col gap-6 py-4 max-md:hidden">
      <Link
        href={"/"}
        className="flex items-baseline justify-center text-white"
      >
        <Facebook size={40} />
        <p className="text-4xl font-bold text-sky-500 -ml-2 -mt-1">eedz</p>
      </Link>
      <div className=" flex flex-col gap-3">
        <div className="flex flex-col gap-2 items-center text-white">
          <Link href={"/"}>
            <Image
              src={userData?.profilePhoto}
              className="rounded-full border-2 "
              alt="logo"
              width={60}
              height={60}
            />
          </Link>
          <p className="text-sm font-bold">{userData?.userName}</p>
        </div>
        <div className="flex items-center text-white justify-between">
          <div className=" flex justify-center flex-col items-center">
            <p className=" font-bold">{userData?.posts.length}</p>
            <p className=" font-medium">Posts</p>
          </div>
          <div className=" flex justify-center flex-col items-center">
            <p className=" font-bold">{userData?.followers?.length}</p>
            <p className=" font-medium">Followers</p>
          </div>
          <div className=" flex justify-center flex-col items-center">
            <p className=" font-bold">{userData?.following?.length}</p>
            <p className=" font-medium">Following</p>
          </div>
        </div>
        {/* Top User  */}
        <hr />
        <Menu />
        <hr />
        <div className="flex gap-4 items-center py-2 px-4 ">
          <UserButton appearance={{ baseTheme: dark }} />
          <p className=" font-semibold text-white">Manage Account</p>
        </div>
        <SignedIn>
          <SignOutButton>
            <div className="flex gap-4 cursor-pointer hover:bg-blue-700 justify-start rounded-lg py-1.5 px-4 ">
              <LogOut size={25} className="text-white" />
              <p className="font-semibold text-white">Log out</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </div>
  );
};

export default SidbarLeft;
