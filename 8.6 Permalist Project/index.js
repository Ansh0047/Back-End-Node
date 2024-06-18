import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "5911",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// let items = [
//   { id: 1, title: "Buy milk" },
//   { id: 2, title: "Finish homework" },
// ];

async function getItems(){
  let items = await db.query("SELECT * FROM items");
  return items.rows;
}

app.get("/", async (req, res) => {
  try {
    let items = await getItems();
    console.log(items);

    res.render("index.ejs", {
      listTitle: "Today ",
      listItems: items,
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  try {
    await db.query("INSERT INTO ITEMS (title) VALUES ($1)",[item]);
    // items.push({ title: item });
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
  
});

app.post("/edit", async (req, res) => {
  const editItemId = req.body.updatedItemId;
  const newTitle = req.body.updatedItemTitle;
  try {
    await db.query("UPDATE items SET title = $1 WHERE id = $2",[newTitle,editItemId]);
    res.redirect("/"); 
  } catch (error) {
    console.log(error);
  }
  
});

app.post("/delete", async(req, res) => {
  const itemIdToDelete = req.body.deleteItemId;
  try {
    await db.query("DELETE FROM items WHERE id = $1",[itemIdToDelete]);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
