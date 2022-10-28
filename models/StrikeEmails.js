const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const strikeEmailSchema = new Schema({
  email: {
    type: String,
    required: true
  }
});

const StrikeEmailsModel = mongoose.model("strikeemails", strikeEmailSchema);

module.exports = StrikeEmailsModel;