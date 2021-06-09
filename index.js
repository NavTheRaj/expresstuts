const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
// const logger = require("./middleware/logger");
const members = require("./utils/members");

const app = express();

// Handlebar middleware
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Home page route
app.get("/", (req, res) =>
  res.render("index", {
    title: "Member App",
    members,
  })
);

// Init the middleware
// app.use(logger);

// Set static folder
// app.use(express.static(path.join(__dirname, "public")));

// Routes for member api
app.use("/api/members", require("./routes/api/members"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
