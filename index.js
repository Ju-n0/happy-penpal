require("dotenv").config();
const path = require("node:path");
const express = require("express");
const app = express();
const router = require("./src/router");
const session = require("express-session");

app.set("view engine", "ejs");

const viewsDirectory = path.join(__dirname, "./views");
app.set("views", viewsDirectory);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);

app.use(router);

app.set("port", process.env.PORT || 5000);
app.set("base_url", process.env.BASE_URL || "http://localhost");

app.listen(app.get("port"), () => {
  console.log(`Listening on ${app.get("base_url")}:${app.get("port")}`);
});

// TODO: create login route + implement logic
// TODO: implement search logic
// TODO: create middlewares: errorHandler, authMiddleware, formValidationMiddlewares

// TODO: migrate to ajax
// TODO: use react for frontend
