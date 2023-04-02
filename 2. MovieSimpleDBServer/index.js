const PORT = process.env.PORT || 5000;
const Application = require('./framework/Application');
const movieRouter = require('./routes/movie-router');
const jsonParser = require('./framework/parseJson');
const parseUrl = require('./framework/parseUrl.js');
const getMovieIdParams = require('./framework/getMovieIdParams');
const app = new Application();

app.use(jsonParser);
app.use(parseUrl('http://localhost:5000'));
app.use(getMovieIdParams('http://localhost:5000'));
app.addRouter(movieRouter);

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
