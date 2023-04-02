module.exports = (baseUrl) => (req, res) => {
  const parsedUrl = new URL(req.url, baseUrl);
  const params = parsedUrl.pathname.match(/\/(\d+)\b/);
  if (params) {
    const pathname = parsedUrl.pathname.replace(/(movie)\/\d+\b/, '$1');
    req.pathname = pathname + '/:movie_id';
    req.params = {
      movie_id: params[1]
    };
  }
}