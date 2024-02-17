import { auth } from "@clerk/nextjs";
import { UserMinus, UserPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const getCurrentUser = async (id) => {
  const response = await fetch(`http://localhost:3000/api/users/${id}`);
  const data = await response.json();
  return data;
};

const UserCard = async ({ someone }) => {
  const { userId } = auth();
  const user = await getCurrentUser(userId);
  console.log(user);
  const isFollowing = user?.following?.find((foll) => foll._id === someone._id);

  return (
    <div>
      <div className="flex gap-3 mb-3 hover:bg-gray-700 duration-300 rounded-lg p-3 items-center justify-between">
        <Link
          href={`/profile/${someone._id}/posts`}
          className="flex items-center gap-3"
        >
          <Image
            className="rounded-full"
            src={someone.profilePhoto}
            alt="someone"
            width={70}
            height={70}
          />
          <div>
            <h3 className="font-medium text-white">{someone.userName}</h3>
            <p className="text-gray-400">{someone.firstName}</p>
          </div>
        </Link>
        {userId !== someone.clerkId &&
          (isFollowing ? (
            <UserPlus className="cursor-pointer text-white" />
          ) : (
            <UserMinus className="cursor-pointer text-white" />
          ))}
      </div>
    </div>
  );
};

export default UserCard;
