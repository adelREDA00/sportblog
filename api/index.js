const express  = require("express");
const app  = express();

const dotenv = require("dotenv");
const mongoose = require("mongoose")

const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");

//mongoDb url 
dotenv.config();
//the app can send json data
app.use(express.json());

//connecting mongoDB
mongoose.connect(process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
).then(console.log('connected')).catch((err)=> console.log(err));

//creating auth users
app.use("/api/auth", authRoute);
//crud user
app.use("/api/users", userRoute);
//crud posts
app.use("/api/posts", postRoute);

app.listen("5000", () => {
  console.log("Backend is running.");
});