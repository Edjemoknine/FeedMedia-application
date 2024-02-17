"use client";
import { UserMinus, UserPlus } from "lucide-react";
import React from "react";

const FollowCard = ({ userId, id, clerkId, user, isFollowing }) => {
  const handleFollow = async () => {
    const response = await fetch(
      `http://localhost:3000/api/users/${user.clerkId}/follow/${id}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    return data;
  };

  return (
    <div>
      {" "}
      {userId !== clerkId &&
        (isFollowing ? (
          <UserPlus
            onClick={() => handleFollow()}
            className="cursor-pointer text-white"
          />
        ) : (
          <UserMinus
            onClick={() => handleFollow()}
            className="cursor-pointer text-white"
          />
        ))}
    </div>
  );
};

export default FollowCard;
