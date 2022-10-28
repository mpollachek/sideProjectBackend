const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsletterEmailSchema = new Schema({
  email: {
    type: String,
    required: true
  }
});

const newsletterEmailsModel = mongoose.model("newsletteremails", newsletterEmailSchema);

module.exports = newsletterEmailsModel;