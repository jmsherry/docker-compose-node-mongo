require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const {
  PORT = 3333,
  MONGODB_URI = "mongodb://localhost:27017/cars",
} = process.env;
// console.log("MONGODB_URI", MONGODB_URI);
app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // parse application/json

mongoose.Promise = global.Promise; // You can use different promise libs
const promise = mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

promise
  .then(function (db) {
    console.log("DATABASE CONNECTED!!");
  })
  .catch(function (err) {
    console.log("CONNECTION ERROR", err);
  });

// CAR SCHEMA
const Schema = mongoose.Schema;
// const ObjectId = Schema.Types.ObjectId;

const carSchema = new Schema({
  name: String,
  bhp: Number,
  avatar_url: { type: String, default: "" },
});

const Car = mongoose.model("Car", carSchema);

// ROUTES

app.get("/api/v1/cars/:carid?", function (req, res) {
  const query = {};
  if (req.params.carid) {
    query._id = req.params.carid;
  }
  Car.find(query).exec(function (err, cars) {
    if (err) return res.status(500).send(err);
    res.status(200).send(cars);
  });
});

app.post("/api/v1/cars", function (req, res) {
  console.log("body", req.body);
  const car = new Car(req.body);
  car.save(function (err, car) {
    if (err) return res.status(500).send(err);
    res.status(201).send(car);
  });
});

app.put("/api/v1/cars/:carid", function (req, res) {
  const { carid } = req.params;
  const updates = req.body;
  Car.update({ _id: carid }, updates, function (err, info) {
    if (err) return res.status(500).send(err);
    res.status(200).send(info);
  });
});

app.delete("/api/v1/cars/:carid", function (req, res) {
  const { carid } = req.params;
  Car.remove({ _id: carid }, function (err) {
    if (err) return res.status(500).send(err);
    res.sendStatus(204);
  });
});

app.listen(PORT, function () {
  console.log(`Server is listening on port ${PORT}`);
});
