const express = require("express");
const morgan = require("morgan");
const layout = require("./views/layout")
const { db, Page, User } = require('./models');
const wiki = require("./routes/wiki");
const users = require("./routes/users");


db.authenticate()
  .then(() => {
    console.log('connected to the database');
  });

const app = express();

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended: false}))

app.use("/wiki", wiki);
app.use("/users", users);

app.get("/", (req, res) => {
  res.send(layout(''));
})

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = 3000;

const init = async () => {
  await db.sync();
  //await db.sync({force: true})

  app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
  });
}

init();