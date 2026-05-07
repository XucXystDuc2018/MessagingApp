const Conversation = require("../models/Conversation");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const createConversation = async (req, res) => {
  const {
    user: { authUserId },
  } = req;
  const newConversation = await Conversation.create({
    members: [authUserId, req.body.receiverId],
  });
  res.status(StatusCodes.OK).json(newConversation);
};

const getConversation = async (req, res) => {
  const {
    user: { authUserId },
    params: { userId },
  } = req;
  if (authUserId !== userId) {
    throw new UnauthenticatedError(
      "You are not authorized to see this conversation",
    );
  }
  const conversation = await Conversation.find({
    members: { $in: [userId] },
  });
  res.status(StatusCodes.OK).json({ conversation });
};

module.exports = { createConversation, getConversation };
