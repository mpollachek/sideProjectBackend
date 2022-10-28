const express = require("express");
const app = express();
const mongoose = require('mongoose')
const StrikeEmailsModel = require('./models/StrikeEmails');
const newsletterEmailsModel = require('./models/NewsletterEmails');
//const { mongoPassword, mongoString } = require('./config');

const cors = require("cors");

app.use(express.json());
app.use(cors());


//const getInvolvedRouter = require('./routes/getInvolvedRouter')
// const mongoConnection = `mongodb+srv://mpollachek81:${mongoPassword}@awu0.${mongoString}.mongodb.net/allWorkersUnionDB?retryWrites=true&w=majority`;
const port = process.env.PORT || 3001;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
.then(() => {
  app.listen(port);
  console.log("Server is Running - booyah");
});

//app.use('/GetInvolvedEmails', getInvolvedRouter);

app.get("/getEmails", (req, res) => {
  StrikeEmailsModel.countDocuments({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/addEmail", async (req, res) => {
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

