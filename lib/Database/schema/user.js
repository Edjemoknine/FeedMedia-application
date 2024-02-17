import { model, Schema, models } from "mongoose";

const UserSchema = Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  profilePhoto: {
    type: String,
    required: true,
  },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],

  savedPosts: [{ type: Schema.Types.ObjectId, ref: "Post" }],

  likedPosts: [{ type: Schema.Types.ObjectId, ref: "Post" }],

  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],

  following: [{ type: Schema.Types.ObjectId, ref: "User" }],

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const User = models.User || model("User", UserSchema);
export default User;
