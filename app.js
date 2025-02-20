const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const postsRouter = require("./routers/posts");
const routeNotFound = require("./middlewares/routeNotFound");
const errorsHandler = require("./middlewares/errorsHandler");

app.use(express.static("public"));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use("/posts", postsRouter);

app.use(errorsHandler);
app.use(routeNotFound);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
