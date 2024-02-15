import { model, Schema, models } from "mongoose";

const postSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
    required: true,
  },
  likes: {
    type: [{ type: Schema.Types.ObjectId, ref: "User" }],
    default: [],
  },
  createAt: {
    type: Date,
    default: new Date(),
  },
});

const Post = models.Post || model("Post", postSchema);

export default Post;
