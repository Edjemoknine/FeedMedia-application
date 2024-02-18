"use client";
import { likePost, savePost } from "@/lib/actions/postActions";
import { Bookmark, BookmarkCheck, Heart } from "lucide-react";
import React from "react";

const LikeSavePost = ({
  isSaved,
  postId,
  likes,
  isLiked,
  currentUser,
  userId,
}) => {
  return (
    <div className="flex justify-between w-full text-white">
      <div className="flex items-center gap-2">
        {isLiked ? (
          <Heart
            onClick={() => likePost(postId, userId)}
            fill="red"
            className=" cursor-pointer"
          />
        ) : (
          <Heart
            onClick={() => likePost(postId, userId)}
            className="cursor-pointer"
          />
        )}
        <p>{likes}</p>
      </div>
      {!(currentUser === userId) &&
        (isSaved ? (
          <BookmarkCheck
            onClick={() => savePost(postId, userId)}
            fill="blue"
            className="cursor-pointer"
          />
        ) : (
          <Bookmark
            onClick={() => savePost(postId, userId)}
            className="cursor-pointer"
          />
        ))}
    </div>
  );
};

export default LikeSavePost;
