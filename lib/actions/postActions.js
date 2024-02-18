"use server";

import { connectToDatabase } from "../Database/mongoose";
import { auth } from "@clerk/nextjs";
import User from "../Database/schema/user";
import Post from "../Database/schema/post";
import { revalidatePath } from "next/cache";

export const getPosts = async () => {
  try {
    await connectToDatabase();

    const posts = await Post.find().populate("creator").exec();
    return posts;
  } catch (error) {
    console.log(error);
  }
};

export const createPostAction = async (data) => {
  const { userId } = auth();
  try {
    await connectToDatabase();
    const user = await User.findOne({ clerkId: userId });
    if (user) {
      const post = await Post.create({
        creator: user._id,
        description: data.description,
        tags: data.tags,
        imageUrl: data.imageUrl,
      });
      await post.save();
      revalidatePath("/");
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSearchPosts = async (query) => {
  try {
    await connectToDatabase();

    const posts = await Post.find({
      $or: [
        { description: { $regex: query, $options: "i" } },
        { tags: { $regex: query, $options: "i" } },
      ],
    })
      .populate("creator likes")
      .exec();
    return posts;
  } catch (error) {
    console.log(error);
  }
};

export const likePost = async (postId, userId) => {
  try {
    await connectToDatabase();

    const user = await User.findOne({ clerkId: userId }).populate("posts");
    const post = await Post.findById(postId).populate("creator likes");

    const isliked = user.likedPosts.find(
      (item) => item._id.toString() === postId
    );

    if (isliked) {
      user.likedPosts = user.likedPosts.filter(
        (item) => item._id.toString() !== postId
      );
      post.likedPosts = post.likedPosts.filter(
        (item) => item._id.toString() !== user._id.toString()
      );
    } else {
      user.likedPosts.push(post);
      post.likes.push(user);
    }
    return user;
  } catch (error) {
    console.log(error);
  }
};
export const savePost = async (postId, userId) => {
  try {
    await connectToDatabase();

    const user = await User.findOne({ clerkId: userId }).populate(
      "posts savedPosts"
    );
    const post = await Post.findById(postId).populate("creator likes");
    console.log({ post, user });
    const isSaved = user.savedPosts.find(
      (item) => item._id.toString() === postId
    );
    console.log(isSaved);
    if (isSaved) {
      user.savedPosts = user.savedPosts.filter(
        (item) => item._id.toString() !== postId
      );
    } else {
      user.savedPosts.push(post);
    }
    return user;
  } catch (error) {
    console.log(error);
  }
};
