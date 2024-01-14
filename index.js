const express = require("express");
const app = express();
const auth = require("./routes/auth");
const songs = require("./routes/song");
const playlists = require("./routes/playlist");
const comments = require("./routes/comment");
const practice = require("./routes/practice");
const external = require("./routes/external");
const verifyAuth = require("./middlewares/verifyAuth");
app.use(express.json());

app.use("/auth", auth);
app.use("/song", verifyAuth, songs);
app.use("/playlist",verifyAuth, playlists);
app.use("/comment", comments);
app.use("/practice", practice);
app.use("/external", external);

// app.get("/login", (req,res) => {
//   console.log(req.params)
//   return res.status(200).json({
//     message: "click here " + req.params.id + " " + req.params.name
//   });
// });

// app.get("/hello", (req, res) => {
//   return res.status(200).send("Hello World!");
// });

// app.post("/signup", (req,res)=>{
//   console.log(req.body)
//   return res.status(200).json({
//     message: "welcome " + req.body.name + " "  + req.body.age
//   });
// })

// app.get("/hello/happy", (req, res) => {
//   console.log(req.query);
//   return res.status(200).json({
//     message: "goodmorning " + req.query.name,
//     reason: "somebody is telling me what to write",
//   });
// });

// app.post("/register", (req, res) => {
//   console.log(req.body);
//   return res.status(200).json({
//     message: "welcome " + req.body.name,
//   });
// });

// app.get("/user/:id/:name", (req, res) => {
//   console.log(req.params);
//   return res.status(200).json({
//     message: "getting user with id - " + req.params.name + " " + req.params.id,
//   });
// });

app.listen(5000, () => {
  console.log("server is still running on port 5000");
});
