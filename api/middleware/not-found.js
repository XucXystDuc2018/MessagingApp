//add a frontend 404 page on top of this simple message
const NotFound = (req, res) => {
  res.status(404).send("404 not found");
};

module.exports = NotFound;
