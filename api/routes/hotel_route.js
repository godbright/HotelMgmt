const express = require("express");
const mongoose = require("mongoose");

const {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getAllHotels,
} = require("../controllers/hotel_controller");
const { Hotel } = require("../models/hotel_model");
const { verifyAdmin, verifyUser } = require("../utils/methods");

const router = express.Router();

//Create Hotel
router.post("/", verifyAdmin, createHotel);

//Update hOTEL
router.put("/:id", verifyAdmin, updateHotel);

//Get All Hotels
router.get("/", getAllHotels);

//Get  Hotels

router.get("/:id", getHotel);

//Delete
router.delete("/:id", verifyAdmin, deleteHotel);

module.exports = router;
