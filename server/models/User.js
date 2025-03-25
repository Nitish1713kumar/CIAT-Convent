import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "user" }, // Default role is 'user', admin needs to be set manually
});

// Export using ES6 module syntax
const User = mongoose.model("User", UserSchema);
export default User;