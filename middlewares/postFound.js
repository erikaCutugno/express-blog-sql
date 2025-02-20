const postsData = require("../data/post");

const validationPostFound = (req, res, next) => {
  const id = parseInt(req.params.id);
  const posts = postsData.find((elm) => elm.id === id);
  if (!posts) {
    res.status(404);

    return res.json({
      status: 404,
      error: "Not Found",
      message: "Post non trovato",
    });
  }
  next();
};

module.exports = validationPostFound;
