const express = require("express");
const mongoConnect = require("./db/db.database");
require("dotenv").config();
const cors = require("cors");
const userRouter = require("./Routes/user.routes");
const postRouter = require("./Routes/post.routes");
const autherization = require("./middleware/autherization.middleware");
const app = express();
app.use(express.json());
app.use(cors());

// user route
app.use("/user", userRouter);

//post route
app.use(autherization)
app.use("/post", postRouter);

app.listen(process.env.port, () => {
    mongoConnect();
    console.log(`server is running at ${process.env.port}`);
});