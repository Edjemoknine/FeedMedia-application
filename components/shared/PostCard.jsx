import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@clerk/nextjs";
import { Bookmark, BookmarkCheck, Edit, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import LikeSavePost from "./LikeSavePost";
const getLoggedInUser = async (id) => {
  const res = await fetch(`http://localhost:3000/api/users/${id}`);
  const data = await res.json();
  return data;
};
const PostCard = async ({ post }) => {
  const { userId } = auth();
  const user = await getLoggedInUser(userId);
  const currentUser = post?.creator?.clerkId;
  const isLiked = user.likedPosts.filter((item) => item._id === post._id);
  const isSaved = user.savedPosts.filter((item) => item._id === post._id);

  return (
    <Card className="bg-gray-900 border-none mb-4">
      <CardHeader>
        <CardTitle className="flex justify-between items-center gap-3">
          <Link
            className="flex text-white mb-3 flex-row gap-3 items-center"
            href={`/profile/${post?.creator?._id}/posts`}
          >
            <Image
              src={post?.creator?.profilePhoto}
              alt="avatar"
              width={50}
              height={50}
              className="rounded-full border-2 border-white"
            />
            <p>{post?.creator?.userName}</p>
          </Link>
          {currentUser === userId && (
            <Link href={`/update/${post?._id}`}>
              <Edit className="text-white " />
            </Link>
          )}
        </CardTitle>
        <CardDescription className="text-gray-300">
          {post?.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4">
        <div className="relative  overflow-hidden md:h-96  h-64 rounded-lg w-full">
          <Image
            src={post?.imageUrl}
            className="object-cover rounded-lg"
            alt="image Post"
            fill
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <p className="text-white -mt-3 mb-2">{post.tags}</p>
        <LikeSavePost
          isSaved={isSaved}
          isLiked={isLiked}
          currentUser={currentUser}
          userId={userId}
          likes={post?.likes.length}
          postId={post._id.toString()}
        />
      </CardFooter>
    </Card>
  );
};

export default PostCard;
