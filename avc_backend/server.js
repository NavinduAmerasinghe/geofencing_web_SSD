// require("dotenv").config();
// const cors = require("cors");
// const https = require("https");
// const path = require("path");
// const fs = require("fs");
// const express = require("express");
// const session = require("express-session");
// const passport = require("passport");
// const cookieSession = require("cookie-session");
// const config = require("./config");
// const MongoStore = require("connect-mongo");
// const helmet = require("helmet");
// const app = express();
// const connectDB = require("./database/db");
// const bodyParser = require("body-parser");
// const morgan = require("morgan");
// const cookieParser = require("cookie-parser");
// app.use(cookieParser());
// const errorHandler = require("./middleware/error");
// const multer = require("multer");
// const { googleAuth } = require("./config/google.auth");
// const { routesInit } = require("./routes/index");

// // const sslServer = https.createServer(
// //   {
// //     key: fs.readFileSync(path.join(__dirname, "cert", "key.pem")),
// //     cert: fs.readFileSync(path.join(__dirname, "cert", "cert.pem")),
// //   },
// //   app
// // );

// //route paths
// const wildlifeObservationRoutes = require("./routes/wildlifeObservationRoute");
// const bannerRoutes = require("./routes/banner");
// const authRoutes = require("./routes/auth");
// const protectedAreaRoutes = require("./routes/protectedAreaRoute");
// const animalRoutes = require("./routes/yoloIdentificationRoute");

// // Call the connectDB function to connect to the database
// connectDB();

// //middlewares
// // Use Helmet middleware to secure the webapplication
// app.use(helmet());
// app.use(morgan("dev"));
// app.use(
//   session({
//     secret: config.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     store: MongoStore.create({ mongoUrl: config.DB_CONNECTION_STRING }),
//     cookie: {
//       secure: false,
//       expires: new Date(Date.now() + 10000),
//       maxAge: 10000,
//     },
//   })
// );
// // app.use((req, res, next) => {
// //   res.header("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
// //   res.header(
// //     "Access-Control-Allow-Headers",
// //     "Origin, X-Requested-With, Content-Type, Accept"
// //   );
// //   next();
// // });
// app.use(bodyParser.json({ limit: "100mb" }));
// app.use(
//   bodyParser.urlencoded({
//     // to support URL-encoded bodies
//     limit: "100mb",
//     extended: false,
//   })
//   // cookieSession({
//   //   name: "session",
//   //   keys: ["cyberwolve"],
//   //   maxAge: 24 * 60 * 60 * 100,
//   // })
// );
// app.use(passport.initialize());
// app.use(passport.session());

// // app.use(
// //   cors({
// //     origin: "http://localhost:3000",
// //     methods: "GET,POST,PUT,DELETE",
// //     credentials: true,
// //   })
// // );

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: "GET,POST,PUT,DELETE",
//     credentials: true,
//   })
// );
// app.use(express.json());
// app.use(passport.initialize());
// app.use(passport.session());

// app.get("/get", (req, res) => {
//   res.send("Safe Pass");
// });

// // app.get("/", (req, res) => {
// //   res.json({ message: "API running..." });
// // });
// app.get("/google-signin", (req, res, next) => {
//   res.send("<a href='http://localhost:8090/auth/google'>Login with Google</a>");
//   next();
// });

// //Routes middleware
// app.use("/api", wildlifeObservationRoutes);
// app.use("/api", bannerRoutes);
// app.use("/api", authRoutes);
// app.use("/api", protectedAreaRoutes);
// app.use("/api/yolo", animalRoutes);

// //Error Middleware
// app.use(errorHandler);

// // const PORT = process.env.PORT || 443;
// const PORT = process.env.PORT || 8090;

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
//   googleAuth(passport);
//   routesInit(app, passport);
// });

require("dotenv").config();
const cors = require("cors");
const https = require("https");
const path = require("path");
const fs = require("fs");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cookieSession = require("cookie-session");
const config = require("./config");
const MongoStore = require("connect-mongo");
const helmet = require("helmet");
const app = express();
const connectDB = require("./database/db");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const errorHandler = require("./middleware/error");
const multer = require("multer");
const { googleAuth } = require("./config/google.auth");
const { routesInit } = require("./routes/index");

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

// Call the connectDB function to connect to the database
connectDB();

//middlewares
// Use Helmet middleware to secure the webapplication
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"], // Define a default source for resources
        frameAncestors: ["'none'"], // Prevent framing of your website
      },
    },
    referrerPolicy: {
      policy: "same-origin", // Set the Referrer-Policy header to 'same-origin'
    },
    contentTypes: {
      nosniff: true, // Add the X-Content-Type-Options header
    },
    frameguard: {
      action: "sameorigin", // Set X-Frame-Options header to 'SAMEORIGIN'
    },
  })
);

app.use(morgan("dev"));
app.use(
  session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: config.DB_CONNECTION_STRING }),
    cookie: {
      secure: false,
      expires: new Date(Date.now() + 10000),
      maxAge: 10000,
    },
  })
);
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
app.use(bodyParser.json({ limit: "100mb" }));
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    limit: "100mb",
    extended: false,
  })
  // cookieSession({
  //   name: "session",
  //   keys: ["cyberwolve"],
  //   maxAge: 24 * 60 * 60 * 100,
  // })
);
app.use(passport.initialize());
app.use(passport.session());

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: "GET,POST,PUT,DELETE",
//     credentials: true,
//   })
// );

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

// fixed ssrf vulnerability issue
function isURLValid(url) {
  const allowedPrefix = "https://localhost:3000/";

  return url.startsWith(allowedPrefix);
}

app.use((req, res, next) => {
  const url = req.query.url;
  if (url && url.trim() !== "") {
    if (!isURLValid(url)) {
      res.status(400).send("Invalid URL.");
      return;
    }
  }
  next();
});

app.get("/get", (req, res) => {
  res.send("Safe Pass");
});

// app.get("/", (req, res) => {
//   res.json({ message: "API running..." });
// });
app.get("/google-signin", (req, res, next) => {
  res.send("<a href='http://localhost:8090/auth/google'>Login with Google</a>");
  next();
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
const PORT = process.env.PORT || 8090;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  googleAuth(passport);
  routesInit(app, passport);
});
