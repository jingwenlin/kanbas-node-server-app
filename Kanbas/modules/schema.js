import mongoose from "mongoose";
export default mongoose.Schema(
  {
    id: String,
    name: String,
    description: String,
    course:String,
    lesson:Array,
  },
  { collection: "modules" }
);