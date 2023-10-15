//jshint esversion:6
require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var md5 = require('md5');
const PORT = process.env.PORT;

const User = require("./userModel");

const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));



mongoose.connect("mongodb://127.0.0.1:27017/userDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

const db = mongoose.connection;

  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    // We are connected
    console.log("Connected to MongoDB...");
  });



app.get("/", (req, res) => {
  res.render("home");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login",(req, res) => {

    const email= req.body.username;
    const password = req.body.password;

  
    User.findOne({ email: email })
        .then((user) => {
          console.log(user);
            if (user) {
                // User found, you can add password validation logic here
                if(user.password === password)
                res.render("secrets");
              else
              res.send("<h1>Username or password incorect</h1>")
            } else {
                // User not found
                res.send("<h1>User not found</h1>");
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("<h1>An error occurred</h1>");
        });

})


app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {

  const newUser = new User({
    email: req.body.username,
    password: md5(req.body.password),
  });
  newUser.save()
  .then(savedUser => {
    console.log("User saved successfully:", savedUser)
      res.render("secrets")
    })
    .catch(err => {
      console.error("Error saving user:", err);
      res.send("Error saving user:", err);
    })


  });


app.listen(PORT, (req, res) => {
  console.log("Server started on port " + PORT );
  console.log("http://localhost:" + PORT);
});
