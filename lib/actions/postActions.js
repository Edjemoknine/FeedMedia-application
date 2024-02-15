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
        creator: user.id,
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
