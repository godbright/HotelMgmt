const mongoose = require("mongoose");

const HotelSchema = mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  city: { type: String, required: true },
  featured: { type: Boolean },
  rating: { type: Number, required: true, min: 0, max: 5 },
  distance: { type: Number, required: true },
  photos: { type: [String] },
  desc: { type: String },
  address: { type: String },
  cheapestPrice: { type: Number, required: true },
  title: { type: String, required: true },
});

const Hotel = mongoose.model("Hotel", HotelSchema);

exports.Hotel = Hotel;
