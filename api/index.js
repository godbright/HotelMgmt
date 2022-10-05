const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth_route");
const hotelRouter = require("./routes/hotel_route");
const roomRouter = require("./routes/room_route");
const userRouter = require("./routes/users_route");

const app = express();
dotenv.config();
let port = 8080;

//Database connection
const connect = async () => {
  try {
    mongoose.connect(process.env.MONGO);
    console.log("connected to MongoDb");
  } catch (error) {
    throw error;
  }
};

//middlewares
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/hotel", hotelRouter);
app.use("/api/room", roomRouter);
app.use("/api/user", userRouter);

app.use((err, req, res, next) => {
  const { status, message } = err;

  res.status(status || 500).json({
    success: false,
    code: status,
    message: message || "Something went Wrong",
    stack: err.stack,
  });
});

app.listen(port, () => {
  connect();
  console.log(`listening at port ${port}`);
});
