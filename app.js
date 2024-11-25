const express = require("express");

const app = express();
const pageRoute = require("./routes/pageRoute");

//Template Engine
app.set("view engine", "ejs");

//Middleware
app.use(express.static("public"));

//Routes
app.use("/", pageRoute);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
