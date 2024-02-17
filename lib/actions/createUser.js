"use server";

import { connectToDatabase } from "../Database/mongoose";
import Post from "../Database/schema/post";
import User from "../Database/schema/user";

export const createUser = async (
  id,
  first_name,
  last_name,
  image_url,
  email_addresses,
  username
) => {
  try {
    await connectToDatabase();
    const user = await User.findOneAndUpdate(
      { clerkId: id },

      {
        $set: {
          firstName: first_name,
          lastName: last_name,
          userName: username,
          profilePhoto: image_url,
          email: email_addresses[0].email_address,
        },
      },
      {
        upsert: true,
        new: true,
      }
    );

    await user.save();
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (id) => {
  try {
    await connectToDatabase();

    await User.findOneAndDelete({ clerkId: id });
  } catch (error) {
    console.log(error);
  }
};

export const getSearchUser = async (query) => {
  try {
    await connectToDatabase();

    const users = await User.find({
      $or: [
        { userName: { $regex: query, $options: "i" } },
        { firstName: { $regex: query, $options: "i" } },
        { lastName: { $regex: query, $options: "i" } },
      ],
    })
      .populate("posts")
      .exec();
    return users;
  } catch (error) {
    console.log(error);
  }
};

export const getProfile = async (id) => {
  try {
    await connectToDatabase();

    const user = await User.findById(id)
      .populate({
        path: "posts",
        model: Post,
        populate: {
          path: "creator",
          model: User,
        },
      })
      .populate({
        path: "followers following",
        model: User,
        populate: {
          path: "posts",
          model: Post,
        },
      })
      .exec();
    return user;
  } catch (error) {
    console.log(error);
  }
};
