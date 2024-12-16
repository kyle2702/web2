import { Router } from "express";

import { Film } from "../types";

const router = Router();

const films: Film[] = [
  {
    id: 1,
    title: "Shang-Chi and the Legend of the Ten Rings",
    director: "Destin Daniel Cretton",
    duration: 132,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/7/74/Shang-Chi_and_the_Legend_of_the_Ten_Rings_poster.jpeg",
    description:
      "Shang-Chi, the master of unarmed weaponry-based Kung Fu, is forced to confront his past after being drawn into the Ten Rings organization.",
    budget: 150,
  },
  {
    id: 2,
    title: "The Matrix",
    director: "Lana Wachowski, Lilly Wachowski",
    duration: 136,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg",
    description:
      "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    budget: 63,
  },
  {
    id: 3,
    title: "Summer Wars",
    director: "Mamoru Hosoda",
    duration: 114,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/7/7d/Summer_Wars_poster.jpg",
    description:
      "A young math genius solves a complex equation and inadvertently puts a virtual world's artificial intelligence in a position to destroy Earth.",
    budget: 18.7,
  },
  {
    id: 4,
    title: "The Meyerowitz Stories",
    director: "Noah Baumbach",
    duration: 112,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/a/af/The_Meyerowitz_Stories.png",
    description:
      "An estranged family gathers together in New York City for an event celebrating the artistic work of their father.",
  },
  {
    id: 5,
    title: "her",
    director: "Spike Jonze",
    duration: 126,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/4/44/Her2013Poster.jpg",
    description:
      "In a near future, a lonely writer develops an unlikely relationship with an operating system designed to meet his every need.",
    budget: 23,
  },
];

// READ ALL + FILTER
router.get('/', (req, res) => {
  const minDuration = req.query['minimum-duration'];

  if (minDuration !== undefined) {
    const duration = Number(minDuration);
    if (isNaN(duration)) {
      return res.status(400).json({ error: 'minimum-duration must be a number' });
    }
    if (duration <= 0) {
      return res.status(400).json({ error: 'minimum-duration must be positive' });
    }
    return res.json(films.filter(film => film.duration >= duration));
  }

  return res.json(films);
});

// READ ONE
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: 'Id must be a number' });
  }

  const film = films.find(film => film.id === id);
  if (!film) {
    return res.status(404).json({ error: 'Film not found' });
  }

  return res.json(film);
});

// CREATE ONE
router.post('/', (req, res) => {
  const { title, director, duration, budget, description, imageUrl } = req.body;

  // Validation des champs requis
  if (!title || !director || !duration) {
    return res.status(400).json({ error: 'title, director and duration are required' });
  }

  // Validation des types et valeurs
  if (typeof title !== 'string' || typeof director !== 'string') {
    return res.status(400).json({ error: 'title and director must be strings' });
  }

  if (typeof duration !== 'number' || duration <= 0) {
    return res.status(400).json({ error: 'duration must be a positive number' });
  }

  if (budget !== undefined && (typeof budget !== 'number' || budget <= 0)) {
    return res.status(400).json({ error: 'budget must be a positive number' });
  }

  // Vérification si le film existe déjà
  const filmExists = films.some(
    film => film.title.toLowerCase() === title.toLowerCase() && 
           film.director.toLowerCase() === director.toLowerCase()
  );

  if (filmExists) {
    return res.status(409).json({ error: 'Film already exists' });
  }

  // Création du nouveau film
  const newId = films.length > 0 ? Math.max(...films.map(f => f.id)) + 1 : 1;
  const newFilm: Film = {
    id: newId,
    title,
    director,
    duration,
    budget,
    description,
    imageUrl
  };

  films.push(newFilm);
  return res.status(201).json(newFilm);
});

export default router;