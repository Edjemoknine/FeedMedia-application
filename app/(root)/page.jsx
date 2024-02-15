import PostCard from "@/components/shared/PostCard";
import { getPosts } from "@/lib/actions/postActions";
import React from "react";

const Home = async () => {
  const posts = await getPosts();

  return (
    <div>
      {posts.map((post) => (
        <PostCard post={post} key={post._id} />
      ))}
    </div>
  );
};

export default Home;
