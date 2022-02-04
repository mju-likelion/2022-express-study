import express from "express";
import api from "./api";
import db from "./models";

const app = express();
const port = 3000;

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("DB successfully connected");
  })
  .catch(e => {
    console.error(e);
  });

app.use(express.json());

app.use("/api", api);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
