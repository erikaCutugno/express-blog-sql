const connection = require("../data/db");

const postsData = require("../data/post");

//Index
const index = (req, res) => {
  const sql = "SELECT * FROM posts";

  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Database query failed",
      });
    }
    res.json(results);
  });
};

//Show
const show = (req, res) => {
  const id = parseInt(req.params.id);

  const postSql = "SELECT * FROM posts WHERE id = ?";
  const tagsSql = `
    SELECT tags.*
    FROM tags
    JOIN post_tag ON tags.id = post_tag.tag_id
    WHERE post_tag.post_id = ?
    `;
  connection.query(postSql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    if (results.length === 0)
      return res.status(404).json({ error: "Post not found" });

    const post = results[0];

    connection.query(tagsSql, [id], (err, results) => {
      if (err) return res.status(500).json({ error: "Database query failed" });
      if (results.length === 0)
        return res.status(404).json({ error: "Post not found" });

      post.tags = results;
      res.json(post);
    });
  });
};

//Store
const store = (req, res) => {
  const id = postsData[postsData.length - 1].id + 1;

  const newPost = {
    id,
    title: req.body.title,
    image: req.body.image,
    content: req.body.content,
    tags: req.body.tags,
    available: req.body.available,
  };

  postsData.push(newPost);
  console.log(postsData);
  res.status(201);
  res.json(newPost);
};

//update
const update = (req, res) => {
  const id = parseInt(req.params.id);
  const posts = postsData.find((elm) => elm.id === id);
  //   if (!posts) {
  //     res.status(404);

  //     return res.json({
  //       status: 404,
  //       error: "Not Found",
  //       message: "Post non trovato",
  //     });
  //   }

  posts.title = req.body.title;
  posts.image = req.body.image;
  posts.content = req.body.content;
  posts.tags = req.body.tags;
  posts.available = req.body.available;

  res.json(posts);
};
//Modify
const modify = (req, res) => {
  res.send(`Modifica parziale del post:${req.params.id}`);
};
//Destroy
const destroy = (req, res) => {
  const id = parseInt(req.params.id);

  const sql = "DELETE FROM posts WHERE id = ?";

  connection.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Failed to delete post",
      });
    }
    res.sendStatus(204);
  });
};

module.exports = { index, show, store, update, modify, destroy };
