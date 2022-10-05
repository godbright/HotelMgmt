const express = require("express");
const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user_controller");
const { verifyAdmin, verifyUser } = require("../utils/methods");

const router = express.Router();
//get all users
router.get("/allusers", verifyAdmin, getAllUsers);
//update user
router.delete("/:id", verifyUser, verifyAdmin, deleteUser);

//delete user
router.put("/:id", verifyUser, verifyAdmin, updateUser);
//
router.get("/singleuser", verifyUser, verifyAdmin, getUser);
module.exports = router;
