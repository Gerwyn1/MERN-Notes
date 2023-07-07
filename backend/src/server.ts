import app from "./app";
import env from "./utils/validateEnv";
import mongoose from "mongoose";

const port = env.PORT;

// unable to use async await in top level
mongoose
  .connect(env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("Mongoose connected");
    app.listen(port, () => {
      console.log(`server running on port: ${port}`);
    });
  })
  .catch(console.error);
