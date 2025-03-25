
import mongoose from "mongoose";

const connectDB = () => {
  if(process.env.ENV==="DEV"){
    mongoose
    .connect("mongodb://localhost:27017",{dbName: "SchoolWeb"})
    .then((c) => console.log(`Local Database Connected with ${c.connection.host}`))
    .catch((e) => console.log(e));
  }
  else{
    mongoose
      .connect(process.env.MONGO_URI,{dbName: "SchoolWeb"})
      .then((c) => console.log(`Global Database Connected with ${c.connection.host}`))
      .catch((e) => console.log(e));
  }
};

export default connectDB;