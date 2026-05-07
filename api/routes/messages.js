const router = require("express").Router();
const { createMessage, getMessages } = require("../controllers/messages");
const authenticateUser = require("../middleware/authentication");
router.post("/", authenticateUser, createMessage);
router.get("/:conversationId", authenticateUser, getMessages);

module.exports = router;
