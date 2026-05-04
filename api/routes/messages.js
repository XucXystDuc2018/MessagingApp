const router = require("express").Router();
const { createMessage, getMessages } = require("../controllers/messages");
//add authorization later
router.post("/", createMessage);
router.get("/:conversationId", getMessages);

module.exports = router;
