const express = require("express");
const {getChats} = require("../controllers/chat.controller");
const router = express.Router();

router.get("/:id", getChats)

module.exports = router