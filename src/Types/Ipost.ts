import { Document } from "mongoose";

export interface Ipost extends Document {
  title: string;
  description: string;
  vote: number;
  user: string;
}
