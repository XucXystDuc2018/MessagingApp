const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { StatusCodes } = require("http-status-codes");
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");

const getUser = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  if (!user) {
    throw new NotFoundError(`Could not find user with id ${userId}`);
  }
  const { password, email, ...other } = user._doc;
  res.status(StatusCodes.OK).json({ user: { ...other } });
};

const updateUser = async (req, res) => {
  const {
    user: { authUserId },
    params: { userId },
    body: { username, email, profilePicture, coverPicture, description },
  } = req;
  let password = req.body.password;
  if (authUserId !== userId) {
    throw new UnauthenticatedError(
      "You are not authorized to change this profile",
    );
  }
  const updateFields = {};
  if (username) {
    updateFields.username = username;
  }
  if (email) {
    updateFields.email = email;
  }
  if (profilePicture) {
    updateFields.profilePicture = profilePicture;
  }
  if (coverPicture) {
    updateFields.coverPicture = coverPicture;
  }
  if (description) {
    updateFields.description = description;
  }

  if (password) {
    const salt = await bcrypt.genSalt(10);
    updateFields.password = await bcrypt.hash(password, salt);
  }
  const user = await User.findByIdAndUpdate(userId, updateFields, {
    returnDocument: "after",
    runValidators: true,
  });
  res.status(StatusCodes.OK).json({ user });
};

const deleteUser = async (req, res) => {
  const {
    user: { authUserId },
    params: { userId },
  } = req;
  if (authUserId !== userId) {
    throw new UnauthenticatedError(
      "You are not authorized to delete this profile",
    );
  }
  const user = await User.findByIdAndDelete(userId);
  if (!user) {
    throw new NotFoundError(`No user with id ${userId}`);
  }
  res
    .status(StatusCodes.OK)
    .json({ user: null, status: "delete user successfully" });
};

const getFriends = async (req, res) => {
  const {
    user: { authUserId },
    params: { userId },
  } = req;
  if (authUserId !== userId) {
    throw new UnauthenticatedError(
      "You are not authorized to see their friends",
    );
  }
  const user = await User.findById(userId);
  if (!user) {
    throw new NotFoundError(`No user with id ${userId}`);
  }
  const friends = await Promise.all(
    (user.friends || []).map((friendId) => {
      return User.findById(friendId);
    }),
  );
  let friendList = [];
  friends.map((friend) => {
    let { _id, username, profilePicture } = friend;
    friendList.push({ _id, username, profilePicture });
  });
  res.status(StatusCodes.OK).json({ friendList });
};

//I dont implement sending friend request feature yet because its not my focus rn

module.exports = { getUser, updateUser, deleteUser, getFriends };
