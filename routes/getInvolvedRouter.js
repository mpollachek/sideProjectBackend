const express = require('express');
const GetInvolvedEmailsModel = require('../models/NewsletterEmails');
const StrikeEmailsModel = require('../models/StrikeEmails');
const cors = require('cors');

const getInvolvedRouter = express.Router();

getInvolvedRouter.use(cors())


getInvolvedRouter.route("/api/getEmails")
.get((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  StrikeEmailsModel.countDocuments({}, (err, result) => {
    if (err) {
      res.json("Error: " + err);
    } else {
      res.json(result);
    }
  });
});

getInvolvedRouter.route("/api/addEmail")
.post( async (req, res, next) => {
  const r = req.body.values
  console.log("full req: " + JSON.stringify(r))
  if (r.strike) {
    const strikeEmail= new StrikeEmailsModel(r);
    await strikeEmail.save();
  } 

  if (r.newsletter) {
    const newsletterEmail= new newsletterEmailsModel(r);
    await newsletterEmail.save();
  } 

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json(r);
})

module.exports = getInvolvedRouter;