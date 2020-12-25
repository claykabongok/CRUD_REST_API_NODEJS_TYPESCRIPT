import mongoose, { Schema } from "mongoose";
import { Ipost } from "../Types/Ipost";
const PostSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    vote: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },

  { timestamps: true }
);
const Post = mongoose.model<Ipost>("Post", PostSchema);
export default Post;
