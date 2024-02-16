import { connectToDatabase } from "@/lib/Database/mongoose";
import Post from "@/lib/Database/schema/post";
import { revalidatePath } from "next/cache";

export const GET = async (req, { params }) => {
  const id = params.id;
  console.log("The Id is:" + id);

  try {
    await connectToDatabase();

    const post = await Post.findById(id);
    console.log(post);
    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    console.log(error);
  }
};

export const PUT = async (req, { params }) => {
  const id = params.id;
  const body = await req.json();
  console.log({ id }, { body });

  try {
    await connectToDatabase();

    const post = await Post.findByIdAndUpdate(id, {
      description: body.description,
      tags: body.tags,
      imageUrl: body.imageUrl,
    });
    revalidatePath("/");

    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    console.log(error);
  }
};
