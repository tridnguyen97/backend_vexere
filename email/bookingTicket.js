const nodemailer = require('nodemailer');
const fs = require('fs')
const hogan = require('hogan.js')

const template = fs.readFileSync(`${__dirname}/template/bookingTicket.hjs`,"utf-8")
const compiledTemplate = hogan.compile(template)

module.exports.sendBookTicketEmail = (ticket, trip, user) => {
  const transport = {
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    requireSSL: true,
    auth: {
      user: "chrisnguyen2504@gmail.com",
      pass: "natelee2504"
    }
  }

  const transporter = nodemailer.createTransport(transport);

  const seatCodes = ticket.seats.map(seat => seat.code)
  const mailOptions = {
    from: "chrisnguyen2504@gmail.com",
    to: "natelee2504@gmail.com",
    subject: "Xác nhận mua vé thành công",
    html: compiledTemplate.render({
      email : user.email,
      fromStation: trip.fromStationId.stationName,
      toStation: trip.toStationId.name,
      price: trip.price,
      amount: ticket.seats.length,
      seats: seatCodes.join(),
      total: ticket.totalPrice
    })
  }

  transporter.sendMail(mailOptions, err => {
    if (err) return console.log(err.message)
    console.log("Send email success")
  })
}