require("dotenv").config();
const cors = require("cors");
const https = require("https");
const path = require("path");
const fs = require("fs");
const express = require("express");
const passport = require("passport");
const cookieSession = require("cookie-session");
const helmet = require("helmet");
const app = express();
const connectDB = require("./database/db");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const errorHandler = require("./middleware/error");
const multer = require("multer");

// const sslServer = https.createServer(
//   {
//     key: fs.readFileSync(path.join(__dirname, "cert", "key.pem")),
//     cert: fs.readFileSync(path.join(__dirname, "cert", "cert.pem")),
//   },
//   app
// );

//route paths
const wildlifeObservationRoutes = require("./routes/wildlifeObservationRoute");
const bannerRoutes = require("./routes/banner");
const authRoutes = require("./routes/auth");
const protectedAreaRoutes = require("./routes/protectedAreaRoute");
const animalRoutes = require("./routes/yoloIdentificationRoute");
const passportStrategy = require("./passport");

// Call the connectDB function to connect to the database
connectDB();

//middlewares
// Use Helmet middleware to secure the webapplication
app.use(helmet());
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "100mb" }));
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    limit: "100mb",
    extended: false,
  }),
  cookieSession({
    name: "session",
    keys: ["cyberwolve"],
    maxAge: 24 * 60 * 60 * 100,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
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

// const PORT = process.env.PORT || 443;
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  // googleAuth(passport);
});
