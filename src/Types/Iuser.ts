import { Document } from "mongoose";

export interface Iuser extends Document {
  username: string;
  name: string;
  surname: string;
}
