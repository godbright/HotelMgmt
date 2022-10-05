const { Hotel } = require("../models/hotel_model");
const httpStatus = require("http-status");
const { getStandardResponse } = require("../utils/response");

//create a hOTel
exports.createHotel = async (req, res, next) => {
  const hotel = new Hotel(req.body);

  try {
    const newHotel = await hotel.save();
    return res
      .status(httpStatus.OK)
      .json(getStandardResponse(httpStatus.OK, "Created hotel", newHotel, req));
  } catch (error) {
    next(error);
  }
};

//update hotel data
exports.updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    return res
      .status(httpStatus.OK)
      .json(
        getStandardResponse(httpStatus.OK, "Updated hotel", updatedHotel, req)
      );
  } catch (error) {
    next(error);
  }
};

//delete hotel
exports.deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    return res
      .status(httpStatus.OK)
      .json(getStandardResponse(httpStatus.OK, "deleted hotel", "[]", req));
  } catch (error) {
    next(error);
  }
};

//get a single hotel
exports.getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    return res
      .status(httpStatus.OK)
      .json(getStandardResponse(httpStatus.OK, "Single hotel", hotel, req));
  } catch (error) {
    next(error);
  }
};

//get all hotels
exports.getAllHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find();
    return res
      .status(httpStatus.OK)
      .json(getStandardResponse(httpStatus.OK, "All hotel", hotels, req));
  } catch (error) {
    next(error);
  }
};
