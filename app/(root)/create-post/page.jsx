import FormPost from "@/components/shared/FormPost";
import React from "react";

const CreatePost = () => {
  return (
    <div className="pt-6">
      <FormPost postData={""} handlePublish={""} />
    </div>
  );
};

export default CreatePost;
