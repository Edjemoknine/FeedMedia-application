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

const PostCard = ({ post }) => {
  const { userId } = auth();
  const currentUser = post?.creator?.clerkId;
  const isLiked = false;
  const isSaved = false;

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
        <div className="flex justify-between w-full text-white">
          <div className="flex items-center gap-2">
            {isLiked ? (
              <Heart fill="red" className=" cursor-pointer" />
            ) : (
              <Heart className="cursor-pointer" />
            )}
            <p>{post?.likes.length}</p>
          </div>
          {!(currentUser === userId) &&
            (isSaved ? (
              <BookmarkCheck fill="blue" className="cursor-pointer" />
            ) : (
              <Bookmark className="cursor-pointer" />
            ))}
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
