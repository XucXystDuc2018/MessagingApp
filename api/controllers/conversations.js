const Conversation = require("../models/Conversation");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const createConversation = async (req, res) => {
  const newConversation = await Conversation.create({
    members: [req.body.senderId, req.body.receiverId],
  });
  res.status(StatusCodes.OK).json(newConversation);
};

const getConversation = async (req, res) => {
  const conversation = await Conversation.find({
    members: { $in: [req.params.userId] },
  });
  res.status(StatusCodes.OK).json({ conversation });
};

module.exports = { createConversation, getConversation };
