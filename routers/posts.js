const express = require("express");
const postsControllers = require("../controllers/postsControllers");
const middlewarePostFound = require("../middlewares/postFound");
const middlewareValidationId = require("../middlewares/validationParamId");

const router = express.Router();

router.use("/:id", middlewareValidationId, middlewarePostFound);

//index
router.get("/", postsControllers.index);
//show
router.get("/:id", postsControllers.show);
//store
router.post("/", postsControllers.store);
//update
router.put("/:id", postsControllers.update);
//modify
router.patch("/:id", postsControllers.modify);
//destroy
router.delete("/:id", postsControllers.destroy);

module.exports = router;
