import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

// database configuration
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "secrets",
  password: "5911",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

// new user
app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;
  console.log({ email, password });


  const result = await db.query(
    "INSERT INTO users (email,password) VALUES ($1,$2)",
    [email, password]
  );
  // console.log(result);
  
  try {
    if (result.rows.length > 0) {
      res.send("Email already exists, Try logging in.");
    } else {
      res.render("secrets.ejs");
    }
  } catch (error) {
    console.log(error);
  }
});

// already signed in
app.post("/login", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;
  console.log({ email, password });


  const check = await db.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );
  // console.log(check);

  if(check.rows.length == 0){
    res.send("Account does not exists.");
  }
  else{
    if(check.password === password){
      res.render("secrets.ejs");
    }
    else{
      res.send("Password not matched");
    }
  }

});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
