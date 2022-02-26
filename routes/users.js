const express = require("express");
const router = express.Router();

const {
  getUsers,
  getProfile,
  createUsers,
  editUserProfile,
  editUserAvatar,
} = require("../controllers/users");

router.get("/users", getUsers);
router.get("/users/:userId", getProfile);
router.post("/users", createUsers);
router.patch("/users/me", editUserProfile);
router.patch("/users/me/avatar", editUserAvatar);

module.exports = router;
