import mongoose from "mongoose";
import modulesSchema from "./schema.js";
const modulesModel = mongoose.model("modules", modulesSchema);
export default modulesModel;