const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  hotelName: { type: String, required: true },
  ownerName: { type: String, required: true },
  location: { type: String, required: true },
  contactNo: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("Hotel", hotelSchema);
