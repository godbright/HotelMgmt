const express = require("express");
const {
  createRoom,
  getAllRooms,
  getRoom,
  updateRooms,
  deleteRoom,
} = require("../controllers/room_controller");
const { verifyAdmin } = require("../utils/methods");

const router = express.Router();

//create room
router.post("/:id", verifyAdmin, createRoom);
//delete room
router.delete("/:id", verifyAdmin, deleteRoom);
//get all rooms
router.get("/", getAllRooms);
//get single room
router.get("/:id", getRoom);
//update room
router.put("/:id", verifyAdmin, updateRooms);
module.exports = router;
