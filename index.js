const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./authRouter");
const PORT = process.env.PORT || 5060;
const app = express();

app.use(express.json());

app.use("/auth", authRouter);

const start = async () => {
  try {
    mongoose.set("strictQuery", true); //additional config for warning

    mongoose.connect(
      "mongodb+srv://admin:Aa123456@cluster0.ylr3y8b.mongodb.net/?retryWrites=true&w=majority"
    );
    app.listen(PORT, () => {
      console.log(`Server started on ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
