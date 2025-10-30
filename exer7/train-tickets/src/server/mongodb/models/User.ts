import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
});

export default mongoose.models?.User || mongoose.model("User", userSchema);