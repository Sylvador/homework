const db = require('../db');
const { firstCapital } = require('../../beautyString');

const getMovies = async (req, res) => {
  try {
    let movies;
    const genre = req.query.genre;

    if(genre) {
      movies = await db.query(
        `SELECT m.movie_id, m.title, g.name AS genre, m.release_year 
        FROM movie m LEFT JOIN movie_genre mg ON m.movie_id = mg.movie_id 
        LEFT JOIN genre g ON g.genre_id = mg.genre_id 
        WHERE $1 in (SELECT g.name FROM genre g JOIN movie_genre mg ON g.genre_id = mg.genre_id WHERE mg.movie_id = m.movie_id)`,
        [firstCapital(genre)]);
    } else {
      movies = await db.query(`SELECT DISTINCT m.movie_id, m.title, g.name AS genre, m.release_year 
      FROM movie m LEFT JOIN movie_genre mg ON m.movie_id = mg.movie_id 
      LEFT JOIN genre g ON g.genre_id = mg.genre_id`);
    }

    const result = {};
    for(let movie of movies.rows) {
      console.log(movie)
      result[movie.movie_id]?.title ? result[movie.movie_id].title = movie.title : result[movie.movie_id] = { title: movie.title };
      result[movie.movie_id].genres ? result[movie.movie_id].genres.push(movie.genre) : result[movie.movie_id].genres = [movie.genre];
      //if(!result[movie.movie_id].release_year) result[movie.movie_id].release_year = movie.release_year;
      result[movie.movie_id].release_year = movie.release_year; // Разницы заметной между этими двумя вариантами нет, но вроде бы так быстрее. Протестил через date.now
    }
    
    res.send(result);
  } catch (error) {
    res.send({ msg: error.message });
  }
}

const createMovie = async (req, res) => {
  try {
    const { title, release_year, genres } = req.body;
    genres.forEach((genre, index) => genres[index] = firstCapital(genre));
    const movie = await db.query('INSERT INTO movie(title, release_year) VALUES ($1, $2) RETURNING *', [title, release_year]);
    // Создание связи между жанром и фильмом. В случае, если указанный жанр отустствует, происходит его добавление в таблицу жанров
    for(let genre of genres) {
      let genre_id = await db.query('SELECT genre_id FROM genre WHERE name = $1', [genre]).then(result => result.rows[0]?.genre_id);
      if (genre_id === undefined) {
        genre_id = await db.query('INSERT INTO genre(name) VALUES ($1) RETURNING genre_id', [genre]).then(result => result.rows[0].genre_id);
      }
      await db.query('INSERT INTO movie_genre(movie_id, genre_id) VALUES ($1, $2)', [movie.rows[0].movie_id, genre_id]);
    }

    res.send(movie.rows[0]);
  } catch (error) {
    res.send({ msg: error.message });
  }
}

const deleteMovie = async (req, res) => {
  try {
    const movie_id = req.params.movie_id;
    const movieTitle = await db.query('DELETE FROM movie m WHERE m.movie_id = $1 RETURNING m.title', [movie_id]).then(result => result.rows[0]?.title);
    if (movieTitle === undefined) {
      throw new Error('Фильм не найден');
    }
    res.send({msg: `Фильм '${movieTitle}' удалён`});
  } catch (error) {
    res.send({msg: error.message});
  }
}
// NOT FINISHED
const updateMovie = async (req, res) => {
  try {
    const {movie_id, title, genres, release_year} = req.body;
    const isExisting = await db.query('SELECT * FROM movie WHERE movie_id = $1', [movie_id]).then(result => result.rows[0]);

    if (!isExisting) throw new Error(`Фильм с id ${movie_id} не найден`);

    genres.forEach((genre, index) => genres[index] = firstCapital(genre));
    // Пересоздание связи между жанром и фильмом. В случае, если указанный жанр отустствует, происходит его добавление в таблицу жанров
    await db.query('DELETE FROM movie_genre WHERE movie_id = $1', [movie_id]);
    for(let genre of genres) {
      let genre_id = await db.query('SELECT genre_id FROM genre WHERE name = $1', [genre]).then(result => result.rows[0]?.genre_id);
      if (genre_id === undefined) {
        genre_id = await db.query('INSERT INTO genre(name) VALUES ($1) RETURNING genre_id', [genre]).then(result => result.rows[0].genre_id);
      }
      await db.query('INSERT INTO movie_genre(movie_id, genre_id) VALUES ($1, $2)', [movie_id, genre_id]);
    }
    const movie = await db.query('UPDATE movie SET title = $1, release_year = $2 WHERE movie_id = $3 RETURNING *',
    [title, release_year, movie_id]);
    res.send(movie.rows[0]);
  } catch (error) {
    res.send({msg: error.message});
  }
}

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
  updateMovie
}