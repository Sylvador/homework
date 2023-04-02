module.exports = (baseUrl) => (req, res) => {
  const parsedUrl = new URL(req.url, baseUrl);
  const query = {};
  parsedUrl.searchParams.forEach((value, key) => query[key] = value);
  req.pathname = parsedUrl.pathname;
  req.query = query;
}