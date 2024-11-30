const express = require("express");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const pageRoute = require("./routes/pageRoute");
const courseRoute = require("./routes/courseRoute");
const categoryRoute = require("./routes/categoryRoute");
const userRoute = require("./routes/userRoute");

const app = express();

//Connect DB
mongoose
  .connect("mongodb://localhost/smartedu-db")
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch((err) => {
    console.error("DB connection error:", err);
  });

//Template Engine
app.set("view engine", "ejs");

//Global Variable
global.userIN = null;

//Middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "my_keyboard_cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: "mongodb://localhost/smartedu-db" }),
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

//Routes
app.use("*", (req, res, next) => {
  userIN = req.session.userID;
  next(); //next middleware olmalı çünkü diğerlerinde kullanmama sebebimiz render vb. ile bunu karşılamamızdır.
});
app.use("/", pageRoute);
app.use("/courses", courseRoute);
app.use("/categories", categoryRoute);
app.use("/users", userRoute);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
