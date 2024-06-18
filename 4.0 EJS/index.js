import express from "express";

const app = express();
const port = 3000;


app.get("/",(req,res)=>{
    var day = "a weekday";
    var adv = "it's time to work hard";
    var n = Math.floor(Math.random()*7);

    // we can either use getDay method to do this
    // const d = new Date();
    // let day = d.getDay();
    // 0 => Sunday and so on till 6
    if(n === 0 || n === 6){
        day = "the weekend";
        adv = "it's time to chill and relax"
    }
    console.log(n);
    res.render("index.ejs",{dayType : day, advice : adv});
});

app.listen(port,()=>{
    console.log(`Server running on port ${port}.`);
});