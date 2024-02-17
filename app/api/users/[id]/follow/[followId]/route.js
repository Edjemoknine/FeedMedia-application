import { connectToDatabase } from "@/lib/Database/mongoose";
import User from "@/lib/Database/schema/user";

export const POST = async (req, { params }) => {
  const { id, followId } = params;

  try {
    await connectToDatabase();
    const user = await User.findOne({ clerkId: id }).populate(
      "posts savedPosts likedPosts followers following"
    );
    const personToFollow = await User.findById(followId).populate(
      "posts savedPosts likedPosts followers following"
    );
    console.log(user);
    const isFollowing = user.following.find(
      (item) => item._id.toString() === followId
    );

    if (isFollowing) {
      user.following = user?.following?.filter(
        (item) => item._id.toString() !== followId
      );
      personToFollow.followers = personToFollow.followers.filter(
        (item) => item._id.toString() !== user._id.toString()
      );
    } else {
      user.following.push(personToFollow);
      personToFollow.followers.push(user);
    }

    await user.save();
    await personToFollow.save();

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error, { status: 500 });
  }
};
