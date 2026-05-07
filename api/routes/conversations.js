const router = require("express").Router();
const {
  createConversation,
  getConversation,
} = require("../controllers/conversations");
const authenticateUser = require("../middleware/authentication");

router.post("/", authenticateUser, createConversation);
router.get("/:userId", authenticateUser, getConversation);

module.exports = router;
