const express = require("express");
const {
  createMesage,
  getMessages,
} = require("../Controllers/messageController");

const router = express.Router();

router.post("/", createMesage);
router.get("/:chatId", getMessages);

module.exports = router;
