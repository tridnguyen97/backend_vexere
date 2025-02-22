const express = require("express");
const ticketController = require("./controller");
const { authenticate, authorize } = require("../../../middlewares/auth")
const router = express.Router();

router.get(
  "/",
  authenticate,
  authorize(["admin"]),
  ticketController.getTickets
)

router.post(
  "/",
  authenticate,
  authorize(["client"]),
  ticketController.createTicket
)

module.exports = router;