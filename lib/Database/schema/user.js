import { model, Schema, models, SchemaTypes } from "mongoose";

const UserSchema = Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
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
  posts: [{ type: SchemaTypes.ObjectId, ref: "Post" }],

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
