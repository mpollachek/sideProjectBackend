const express = require("express");
const app = express();
const mongoose = require('mongoose')
const StrikeEmailsModel = require('./models/StrikeEmails');
const newsletterEmailsModel = require('./models/NewsletterEmails');
const cryptoDonationModel = require("./models/cryptoDonations");
// const { mongoPassword, mongoString } = require('./config');

const cors = require("./routes/cors");

// app.use(cors())

app.use(express.json());
// app.use(cors({
//   origin: ['http://localhost:3000', 'https://www.allworkersunion.com'],
//   credentials: true
// }));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'https://www.allworkersunion.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Content-Type', 'application/json');
  next();
  });

// const getInvolvedRouter = require('./routes/getInvolvedRouter');
// const uri = `mongodb+srv://mpollachek81:${mongoPassword}@awu0.${mongoString}.mongodb.net/allWorkersUnionDB?retryWrites=true&w=majority`;
const port = process.env.PORT || 3001;

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  app.listen(port);
  console.log("Server is Running - booyah - " + port);
});

// app.use('/GetInvolvedEmails', getInvolvedRouter);

app.route("/api/getEmails")
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
  StrikeEmailsModel.countDocuments({}, (err, result) => {
    if (err) {
      res.json("Error: " + err);
    } else {
      res.json(result);
    }
  });
});

app.route("/api/addEmail")
.post(cors.corsWithOptions, async (req, res, next) => {
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
  res.json(r);
});

app.route("/api/cryptoDonation")
.post(cors.corsWithOptions, async (req, res, next) => {
  const r = req.body.values
  console.log("full req: " + JSON.stringify(r))
  const cryptoDonation = new cryptoDonationModel(r);

  // if (req.body.firstName) {
  //   firstname = req.body.firstname;
  // }
  // if (req.body.lastname) {
  //   lastname = req.body.lastName;
  // }
  // if (req.body.address) {
  //   address = req.body.address;
  // }
  // if (req.body.city) {
  //   city = req.body.city;
  // }
  // if (req.body.state) {
  //   state = req.body.state;
  // }
  // if (req.body.zipcode) {
  //   zipcode = req.body.zipcode;
  // }
  // if (req.body.country) {
  //   country = req.body.country;
  // }
  // if (req.body.employer) {
  //   employer = req.body.employer;
  // }
  // if (req.body.occupation) {
  //   occupation = req.body.occupation;
  // }
  cryptoDonation.save(err => {
    if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({err: err});
        return;
    }
});
});
