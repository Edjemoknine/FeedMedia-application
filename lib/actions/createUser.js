"use server";

import { connectToDatabase } from "../Database/mongoose";
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
