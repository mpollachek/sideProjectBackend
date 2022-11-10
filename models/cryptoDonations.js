const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cryptoDonationSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zipcode: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  employer: {
    type: String,
    required: true
  },
  occupation: {
    type: String,
    required: true
  }
});

const cryptoDonationModel = mongoose.model("cryptodonations", cryptoDonationSchema);

module.exports = cryptoDonationModel;