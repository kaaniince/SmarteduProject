const express = require("express");

const app = express();

//Template Engine
app.set("view engine", "ejs");

//Middleware
app.use(express.static("public"));

const PORT = 3000;

//Routes

app.use("/about", (req, res) => {
  res.status(200).render("about", {
    page_name: "about",
  });
});

app.get("/", (req, res) => {
  res.status(200).render("index", {
    page_name: "index",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
