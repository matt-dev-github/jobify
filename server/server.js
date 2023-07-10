import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();

// db and authenticateUser
import connectDB from "./db/connect.js";

// routers
import authRouter from "./routes/authRoutes.js";
import jobsRouter from "./routes/jobsRoutes.js";

// middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

app.use(express.json());

app.get("/", (req, res) => {
  //throw new Error("error");
  res.send("Welcome!");
});

app.use("/auth", authRouter);
app.use("/jobs", jobsRouter);

// signals that we are looking fot http methods
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || dotenv.PORT;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`server is listening on port ${port}.`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
