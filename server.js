const express = require("express");
const app = express();
const mongoose = require('mongoose')
const StrikeEmailsModel = require('./models/StrikeEmails');
const newsletterEmailsModel = require('./models/NewsletterEmails');
//const { mongoPassword, mongoString } = require('./config');
//const { createProxyMiddleware } = require('http-proxy-middleware')

const cors = require("cors");

app.use(express.json());
app.use(cors());

//app.use('/api/*', createProxyMiddleware({target:'*', changeOrigin: true }));

app.use(function(req, res, next) {
  const allowedOrigins = ['http://localhost:3000', 'https://www.allworkersunion.com'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    // res.header('Access-Control-Allow-HEaders', 'Content-Type, Authorization');
  }
  return next();
});


//const getInvolvedRouter = require('./routes/getInvolvedRouter')
//const uri = `mongodb+srv://mpollachek81:${mongoPassword}@awu0.${mongoString}.mongodb.net/allWorkersUnionDB?retryWrites=true&w=majority`;
const port = process.env.PORT || 3001;

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  app.listen(port);
  console.log("Server is Running - booyah");
});

//app.use('/GetInvolvedEmails', getInvolvedRouter);

app.get("/api/getEmails", (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  StrikeEmailsModel.countDocuments({}, (err, result) => {
    if (err) {
      res.json("Error: " + err);
    } else {
      res.json(result);
    }
  });
});

app.post("/api/addEmail", async (req, res) => {
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

