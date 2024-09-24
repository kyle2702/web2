import express, { ErrorRequestHandler } from "express";

import filmsRouter from "./routes/films";

const app = express();
const port = 3000;

app.use((_req, _res, next) => {
    console.log(
      "Time:",
      new Date().toLocaleString("fr-FR", { timeZone: "Europe/Brussels" })
    );
    next();
  });
  

// Middleware pour parser le JSON
app.use(express.json());

// Routes
app.use('/films', filmsRouter);

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});