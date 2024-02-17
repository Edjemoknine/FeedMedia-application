import { auth } from "@clerk/nextjs";
import { UserMinus, UserPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import FollowCard from "./FollowCard";

const getCurrentUser = async (id) => {
  const response = await fetch(`http://localhost:3000/api/users/${id}`);
  const data = await response.json();
  return data;
};

const ProfileCard = async ({ userProfile }) => {
  const { userId } = auth();
  const user = await getCurrentUser(userId);
  const isFollowing = user?.following?.find(
    (foll) => foll._id === userProfile._id
  );
  const userProId = userProfile?._id;

  return (
    <div>
      <div className="flex gap-3 mb-3 duration-300 rounded-lg p-3 items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            className="rounded-full"
            src={userProfile.profilePhoto}
            alt="someone"
            width={100}
            height={100}
          />
          <div>
            <h3 className="font-medium text-xl text-white">
              {userProfile.userName}
            </h3>
            <p className="text-gray-400 text-xs">{userProfile.firstName}</p>
            <div className="flex items-center gap-8 mt-3 text-white justify-between">
              <div className=" flex justify-center flex-col items-center">
                <p className=" font-bold">{userProfile?.posts.length}</p>
                <p className=" font-medium">Posts</p>
              </div>
              <div className=" flex justify-center flex-col items-center">
                <p className=" font-bold">{userProfile?.followers?.length}</p>
                <p className=" font-medium">Followers</p>
              </div>
              <div className=" flex justify-center flex-col items-center">
                <p className=" font-bold">{userProfile?.following?.length}</p>
                <p className=" font-medium">Following</p>
              </div>
            </div>
          </div>
        </div>
        <FollowCard
          userId={userId}
          isFollowing={isFollowing}
          id={userProId.toString()}
          clerkId={userProfile.clerkId}
          user={user}
        />
      </div>
      <div className="flex items-center gap-6">
        <Link
          href={`/profile/${userProfile._id}/posts`}
          className={`px-3 bg-gray-600 py-1.5 rounded-lg hover:bg-sky-800 text-white`}
        >
          Posts
        </Link>
        <Link
          href={`/profile/${userProfile._id}/followers`}
          className={`px-3 bg-gray-600 py-1.5 rounded-lg hover:bg-sky-800 text-white`}
        >
          Followers
        </Link>
        <Link
          href={`/profile/${userProfile._id}/following`}
          className={`px-3 bg-gray-600 py-1.5 rounded-lg hover:bg-sky-800 text-white`}
        >
          Following
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;
