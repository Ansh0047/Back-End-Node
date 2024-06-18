import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
// this is important and it comes before the request begin handelled
// this app.use() method invokes the middleware
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res) => {
  // console.log(__dirname + "/public/index.html");
  res.sendFile(__dirname + "/public/index.html");
});

// here we can also use own middleware to get the name of the band either we can directly use in the post req handler
var bandname = "";
function bandNameGenerator(req,res,next){
  console.log(req.body);
  bandname = req.body["street"] + req.body["pet"] + " ▄︻デ══━一💥";
  next();
}
app.use(bandNameGenerator);

app.post("/submit",(req,res) => {
  console.log(req.body);
  // res.send(`<h1>Your Band Name is</h1> ${req.body.street + req.body.pet + " ▄︻デ══━一💥"}`);
  res.send(`<h1>Your Band Name is</h1> ${bandname}`);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
