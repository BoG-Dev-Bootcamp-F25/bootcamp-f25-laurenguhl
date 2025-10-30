import connectDB from "../index";
import User from "../models/User";

export const createUser = async ({name, age}: { name: string; age: number }) => {
  try {
    await connectDB();
    const user = new User({ name, age });
    await user.save();
    return true;
  } catch (error) {
    console.error("Error creating user:", error);
    return false;
  }
};