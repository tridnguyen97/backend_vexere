const { Trip } = require("../../../models/Trip");
const {Station} = require("../../../models/Station")
const { Seat } = require("../../../models/Seat");
const seatCodes = [
  "A01", "A02", "A03", "A04", "A05", "A06", "A07", "A08", "A09", "A010", "A11", "A12",
  "B01", "B02", "B03", "B04", "B05", "B06", "B07", "B08", "B09", "B010", "B11", "B12"
]

module.exports.getTrips = (req, res, next) => {
  Trip.find()
    .populate("fromStationId")
    .populate("toStationId")
    .select("-seats")
    .then(trips => res.status(200).json(trips))
    .catch(err => res.status(500).json(err))
}

module.exports.getTripById = (req, res, next) => {

}

module.exports.getTripByQuery = (req,res,next) => {
  const fromStationName = req.query.fromStation;
  const toStationName = req.query.toStation;
  let fromStationId;
  let toStationId;
  console.log(fromStationName)
  console.log(toStationName)
  Station.findOne({name:fromStationName})
    .then(station => {
      if(!station) return Promise.reject({message: "departure is not found"})
      fromStationId = station._id
      return Station.findOne({name:toStationName})
    })
    .then(station => {
      if(!station) return Promise.reject({message: "arrival is not found"})
      toStationId = station._id
      console.log("Id of arrival",toStationId)
      console.log("id of departure",fromStationId)
      return Trip.find({"toStationId":toStationId,"fromStationId":fromStationId})
              .populate("fromStationId")
              .populate("toStationId")
    })
    
    .then(trips => {
      console.log(trips)
      if(!trips) return Promise.reject({message: "trip is not found"})
      res.status(200).json(trips)
    })
    .catch(err => res.json(err))
}

module.exports.createTrip = (req, res, next) => {
  const { fromStationId, toStationId, startTime, price } = req.body;
  // const seats = [];
  // seatCodes.forEach(code => {
  //   const newSeat = new Seat({ code: code })
  //   seats.push(newSeat)
  // })
  const seats = seatCodes.map(code => new Seat({ code }))

  const newTrip = new Trip({
    fromStationId, toStationId, startTime, price, seats
  })
  newTrip.save()
    .then(trip => res.status(201).json(trip))
    .catch(err => res.status(500).json(err))
}

module.exports.replaceTripById = (req, res, next) => {

}

module.exports.updateTripById = (req, res, next) => {
  const {id} = req.params;
  Trip.updateOne({_id : id})
    .then(() => res.status(200).json({message: "Update successfully"}))
    .catch(err => res.json(err))
}

module.exports.deleteTripById = (req, res, next) => {
  const {id} = req.params;
  Trip.deleteOne({_id : id})
    .then(() => res.status(200).json({ message: "Delete successfully" }))
    .catch(err => res.json(err))
  }