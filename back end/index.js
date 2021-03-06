require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const compression = require("compression");
const routes = require("./routes/index.router");
const app = express();
const uri = process.env.DB_URL;
// const uri = "mongodb+srv://project1:beingjeet@6701@cluster0.rgwap.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((data) => {
    console.log("DB CONNECTED!");
  })
  .catch((err) => {
    console.log(err);
  });

// Middlewares
app.use(cors());
app.use(cookieParser());
app.use(compression());
app.use(bodyParser.json());
app.use("/uploads",express.static("uploads"));

app.use("/api", routes);

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`Server is up and running ${PORT}`);
});
