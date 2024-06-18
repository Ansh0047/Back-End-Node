import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

// database configuration
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "5911",
  port: "5432",
});
db.connect();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


// to get the countries from visited_countries database
async function checkVisited() {
  // this will give us the whole column of country codes
  const result = await db.query("SELECT country_code FROM visited_countries");
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });

  return countries;
}

// get home page
app.get("/", async (req, res) => {

  const countries = await checkVisited();

  console.log(countries);
  res.render("index.ejs", { countries: countries,total: countries.length });
});


// to insert new country
app.post("/add", async (req, res) => {
  const cntry = req.body["country"];
  // outer try block is to check if country name entered exists or not
  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [cntry.toLowerCase()]
    );
    const data = result.rows[0];
    const cntry_code = data.country_code;

    // this try block is to check if it already exists then go to catch else add that to the visited
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code) VALUES ($1)",
        [cntry_code]
      );
      res.redirect("/");
    } catch (err) {
      // console.log(err);
      const countries = await checkVisited();
      res.render("index.ejs",{total: countries.length, countries: countries ,error: "Country has already been added, try again."});
    }
    
  } catch (err) {
    // console.log(err);
    const countries = await checkVisited();
    res.render("index.ejs",{total: countries.length, countries: countries , error: "Country name doest not exists"});
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
