import { connectToDatabase } from "@/lib/Database/mongoose";
import User from "@/lib/Database/schema/user";

export const GET = async (req, { params }) => {
  const id = params.id;
  console.log({ id });
  try {
    await connectToDatabase();

    const user = await User.findOne({ clerkId: id })
      .populate("posts savedPosts likedPosts followers following")
      .exec();
    // console.log(user);
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.log(error);
  }
};
