import FormPost from "@/components/shared/FormPost";

const getPost = async (id) => {
  const response = await fetch(`http://localhost:3000/api/post/${id}`, {
    cache: "no-cache",
  });
  const data = await response.json();
  return data;
};
const EditPost = async ({ params: { id } }) => {
  const postData = await getPost(id);

  return (
    <div>
      <h1>Edit Post</h1>
      <FormPost Postdata={postData} type={"Update"} />
    </div>
  );
};

export default EditPost;
