const { User } = require("../models/user_model");
const httpStatus = require("http-status");
const { getStandardResponse } = require("../utils/response");

//get all users

exports.getAllUsers = async (req, res, next) => {
  try {
    const user = await User.find();
    return res
      .status(httpStatus.OK)
      .json(getStandardResponse(httpStatus.OK, "All users", user, req));
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res
      .status(httpStatus.OK)
      .json(getStandardResponse(httpStatus.OK, "Delete user", "[]", req));
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res
      .status(httpStatus.OK)
      .json(
        getStandardResponse(httpStatus.OK, "Updated user", updatedUser, req)
      );
  } catch (error) {
    next(error);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userid);
    return res
      .status(httpStatus.OK)
      .json(getStandardResponse(httpStatus.OK, "Get User", user, req));
  } catch (error) {
    next(error);
  }
};
