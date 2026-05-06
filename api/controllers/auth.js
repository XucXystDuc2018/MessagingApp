const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  //const token = user.createJWT();
  //by commenting out creating token, user would have to login after register
  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.username } });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Could not find user with this email");
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new UnauthenticatedError("Please provide correct password");
  }
  const token = user.createJWT();
  res
    .status(StatusCodes.OK)
    .json({
      user: {
        userId: user._id,
        username: user.username,
        profilePicture: user.profilePicture,
        coverPicture: user.coverPicture,
        desc: user.description,
      },
      token,
    });
};

module.exports = { register, login };
