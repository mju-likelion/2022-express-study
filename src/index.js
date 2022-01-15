import express from 'express';
import movies from "./movies";

const app = express();
const port = 3000;

app.use(express.json());

app.use('/movies', movies);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});