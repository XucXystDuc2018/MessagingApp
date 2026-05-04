const router = require("express").Router();
const {
  createConversation,
  getConversation,
} = require("../controllers/conversations");
//this might need some auth, remember to add it later
router.post("/", createConversation);
router.get("/:userId", getConversation);

module.exports = router;
