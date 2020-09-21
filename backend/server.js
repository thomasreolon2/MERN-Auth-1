const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = 3000;
require("dotenv").config();
require("./models/User");

const requireToken = require("./middleware/requireToken");
const authRoutes = require("./routes/authRoutes");

app.use(bodyParser.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use("/uploads", express.static("uploads"));
app.use(cors());
app.use(authRoutes);

mongoose.connect(process.env.mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected ! fuck yeaaaaaaaah!!");
});

mongoose.connection.on("error", (err) => {
  console.log("some error", err);
});

app.listen(PORT, () => {
  console.log("server running at port " + PORT);
});
