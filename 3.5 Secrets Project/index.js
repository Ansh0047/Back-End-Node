//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming


import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));


// here we can also use our own middleware just before any requets will be processed

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req,res)=>{
    // we can use our own middleware in case of any authentication
    var passcod = req.body.password;
    if(passcod === "ILoveProgramming"){
        res.sendFile(__dirname + "/public/secret.html");
    }
    else{
        res.sendFile(__dirname + "/public/index.html");
    }
    console.log(req.body);
});

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});