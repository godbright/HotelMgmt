const mongoose = require("mongoose");

//room schema
const roomSchema = mongoose.Schema(
  {
    hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel" },
    title: { type: String, required: false },
    price: { type: String, required: true },
    desc: { type: String, required: true },
    roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],
  },
  { timestamps: true }
);

//room model
const Room = mongoose.model("Room", roomSchema);

exports.Room = Room;
