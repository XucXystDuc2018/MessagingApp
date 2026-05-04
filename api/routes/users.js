const express = require("express");
const {
  getUser,
  updateUser,
  deleteUser,
  getFriends,
} = require("../controllers/users");
const authenticateUser = require("../middleware/authentication");
const router = express.Router();

//GET USER PROFILE
router.get("/:userId", getUser);
//GET USER'S FRIENDS
router.get("/:userId/friends", authenticateUser, getFriends);
//UPDATE USER PROFILE
router.put("/:userId", authenticateUser, updateUser);
//DELETE USER
router.delete("/:userId", authenticateUser, deleteUser);
module.exports = router;
