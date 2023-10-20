const { authenticate } = require("../middleware/auth.middleware");
const config = require("../config");

exports.routesInit = (app, passport) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );
  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      successRedirect: "/user",
      successRedirect: config.CLIENT_URL,
      failureRedirect: "/signup",
    }),
    (req, res) => {
      console.log("User authenticated");
    }
  );
  app.get("/test", authenticate, (req, res) => {
    res.send("<h3>User is authenticated</h3>");
  });
};

// module.exports = routesInit;
