const https = require("https");
const path = require("path");
const fs = require("fs");
const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./database/db");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const errorHandler = require("./middleware/error");
const multer = require("multer");

const sslServer = https.createServer(
  {
    // key: fs.readFileSync(path.join(__dirname, "cert", "key.pem")),
    // cert: fs.readFileSync(path.join(__dirname, "cert", "cert.pem")),
    key: fs.readFileSync(
      path.join(__dirname, "certificate_generation", "MyServer.pfx")
    ),
    // passphrase: "123123",
  },
  app
);

//route paths
const wildlifeObservationRoutes = require("./routes/wildlifeObservationRoute");
const bannerRoutes = require("./routes/banner");
const authRoutes = require("./routes/auth");
const protectedAreaRoutes = require("./routes/protectedAreaRoute");
const animalRoutes = require("./routes/yoloIdentificationRoute");

// Call the connectDB function to connect to the database
connectDB();

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "100mb" }));
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    limit: "100mb",
    extended: false,
  })
);
app.use(cors());
app.use(express.json());

app.get("/get", (req, res) => {
  res.send("Safe Pass");
});

app.get("/", (req, res) => {
  res.json({ message: "API running..." });
});

//Routes middleware
app.use("/api", wildlifeObservationRoutes);
app.use("/api", bannerRoutes);
app.use("/api", authRoutes);
app.use("/api", protectedAreaRoutes);
app.use("/api/yolo", animalRoutes);

//Error Middleware
app.use(errorHandler);

//const PORT = process.env.PORT || 3443;

sslServer.listen(3443, () => {
  console.log(`Server is running on port 3443`);
});
