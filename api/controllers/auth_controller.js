const { User, validate } = require("../models/user_model");
const { createError } = require("../utils/error");

const bcrypt = require("bcrypt");
const { hashPassWord, createToken, verifyToken } = require("../utils/methods");

exports.registerUser = async (req, res, next) => {
  // const { error } = validate(req.body);
  // if(error) return createError(req,res,next,{status: 401, message: error.details[0].message})
  try {
    //check if the user exist
    const userExist = await User.findOne({ username: req.body.username });
    if (userExist)
      return createError(req, res, next, {
        status: 400,
        message: "username already exist",
      });
    const hashedPassword = await hashPassWord(req.body.password);
    const user = await User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      phone: req.body.phone,
      isAdmin: req.body.isAdmin,
    });

    await user.save();
    const { password, isAdmin, ...otherDetails } = user._doc;

    res.status(201).json({
      status: "success",
      user: { ...otherDetails },
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const userExist = await User.findOne({ username: req.body.username });
  if (!userExist)
    return createError(req, res, next, {
      status: 400,
      message: "username doesnt exist",
    });

  const valid = await bcrypt.compare(req.body.password, userExist.password);
  if (!valid)
    return createError(req, res, next, {
      status: 400,
      message: "invalid username or password",
    });
  const { password, isAdmin, ...otherDetails } = userExist._doc;
  const token = await createToken(userExist._id, userExist.isAdmin);
  res.status(200).json({
    status: "success",
    user: { ...otherDetails, token: token },
  });
};
