const { Room } = require("../models/room_model");
const httpStatus = require("http-status");
const { getStandardResponse } = require("../utils/response");
//create a single room
exports.createRoom = async (req, res, next) => {
  const hotelId = req.params.id;
  try {
    const room = await Room.create({
      title: req.body.title,
      price: req.body.price,
      desc: req.body.price,
      hotel: hotelId,
    });
    return res
      .status(httpStatus.OK)
      .json(getStandardResponse(httpStatus.OK, "Created rooms", room, req));
  } catch (error) {
    next(error);
  }
};

//get all rooms
exports.getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find().populate("hotel");
    return res
      .status(httpStatus.OK)
      .json(getStandardResponse(httpStatus.OK, "All rooms", rooms, req));
  } catch (error) {
    next(error);
  }
};

//get a single room
exports.getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id).populate("hotel");
    return res
      .status(httpStatus.OK)
      .json(getStandardResponse(httpStatus.OK, "All rooms", room, req));
  } catch (error) {
    next(error);
  }
};

//update a single Room
exports.updateRooms = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res
      .status(httpStatus.OK)
      .json(
        getStandardResponse(httpStatus.OK, "Updated rooms", updatedRoom, req)
      );
  } catch (error) {
    next(error);
  }
};

//Delete room

exports.deleteRoom = async (req, res, next) => {
  try {
    await Room.findByIdAndDelete(req.params.id);

    return res
      .status(httpStatus.OK)
      .json(
        getStandardResponse(httpStatus.OK, "Deleted Succesfully", "[]", req)
      );
  } catch (error) {
    next(error);
  }
};
