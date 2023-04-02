const Router = require('../framework/Router');
const {
  getMovies, 
  createMovie,
  deleteMovie,
  updateMovie,
} = require('../controller/movie-controller');
const router = new Router();

router.get('/movie', getMovies);
router.post('/movie', createMovie);
router.delete('/movie/:movie_id', deleteMovie);
router.put('/movie', updateMovie);

module.exports = router;