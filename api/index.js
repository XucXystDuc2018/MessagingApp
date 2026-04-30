const express = require("express");
require("dotenv").config();
require("express-async-errors");

const app = express();

//connectDB
const connectDB = require("./db/connect");
const connect = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Connected to mongoDB");
  } catch (error) {
    throw error;
  }
};
//routers
const authRouter = require("./routes/auth");
//error handlers
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/error-handler");

app.use(express.json());

//route
app.use("/api/v1/auth", authRouter);

//middlewares
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);
const port = process.env.PORT || 3000;

app.listen(port, () => {
  connect();
  console.log(`server is listening on port ${port}...`);
});
