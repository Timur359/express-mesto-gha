const express = require("express");

const router = express.Router();

const {
  getUsers,
  getProfile,
  editUserProfile,
  editUserAvatar,
  getMyProfile,
} = require("../controllers/users");

router.get("/users/me", getMyProfile);
router.get("/users", getUsers);
router.get("/users/:userId", getProfile);
router.patch("/users/me", editUserProfile);
router.patch("/users/me/avatar", editUserAvatar);

module.exports = router;
