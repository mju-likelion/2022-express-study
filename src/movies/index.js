import { Router } from "express";

const route = Router();

let nextId = 4;

let movies = [
  {
    id: 1,
    title: 'Avengers',
  },
  {
    id: 2,
    title: 'Spider-man',
  },
  {
    id: 3,
    title: 'Harry Potter',
  },
];

route.get("/", (req, res) => {
  res.json(movies);
});

route.get('/:id', (req, res) => {
  const index = movies.findIndex(movie => movie.id === +req.params.id);
  if (index === -1) {
    return res.json({
      error: "That movie does not exist",
    });
  }
  res.json(movies.filter(movie => movie.id === +req.params.id)[0]);
});

route.post('/', (req, res) => {
  movies.push({
    id: nextId++,
    title: req.body.title,
  });
  res.json(movies);
});

route.put('/:id', (req, res) => {
  const index = movies.findIndex(movie => movie.id === +req.params.id);
  if (index === -1) {
    return res.json({
      error: "That movie does not exist",
    });
  }

  movies[index] = {
    id: req.params.id,
    title: req.body.title,
  };
  res.json(movies);
});

route.delete('/:id', (req, res) => {
  const index = movies.findIndex(movie => movie.id === +req.params.id);
  if (index === -1) {
    return res.json({
      error: "That movie does not exist",
    });
  }

  movies = movies.filter(movie => movie.id !== +req.params.id);
  res.json(movies);
});

export default route;
