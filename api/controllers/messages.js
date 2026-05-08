const Message = require("../models/Message");
const { StatusCodes } = require("http-status-codes");
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");

const createMessage = async (req, res) => {
  const { conversationId, sender, text } = req.body;
  if (!conversationId || !sender || !text) {
    throw new BadRequestError(
      "conversationId, senderId and text message cannot be empty",
    );
  }
  const newMessage = await Message.create({ ...req.body });
  res.status(StatusCodes.OK).json({ newMessage });
};

const getMessages = async (req, res) => {
  const messages = await Message.find({
    conversationId: req.params.conversationId,
  });
  if (!messages) {
    throw new NotFoundError("you havent had any conversation with this person");
  }
  res.status(StatusCodes.OK).json({ messages });
};
module.exports = { createMessage, getMessages };
