import PostCard from "@/components/shared/PostCard";
import { getSearchPosts } from "@/lib/actions/postActions";
import Link from "next/link";
import React from "react";

const SearchPosts = async ({ params: { query } }) => {
  const searchPosts = await getSearchPosts(query);

  return (
    <div className=" flex flex-col gap-6">
      <div className="flex gap-3">
        <Link
          className="px-2.5 py-1.5 rounded-lg text-white text-sm bg-gray-600 hover:bg-gray-700 duration-300"
          href={`/search/posts/${query}`}
        >
          Posts
        </Link>
        <Link
          className="px-2.5 py-1.5 rounded-lg text-white text-sm bg-gray-600 hover:bg-gray-700 duration-300"
          href={`/search/people/${query}`}
        >
          People
        </Link>
      </div>

      <div>
        {searchPosts.map((post) => (
          <PostCard post={post} key={post._id} />
        ))}
      </div>
    </div>
  );
};

export default SearchPosts;
