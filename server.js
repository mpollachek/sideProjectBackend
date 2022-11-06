const express = require("express");
const app = express();
const mongoose = require('mongoose')
const StrikeEmailsModel = require('./models/StrikeEmails');
const newsletterEmailsModel = require('./models/NewsletterEmails');
//const { mongoPassword, mongoString } = require('./config');
//const { createProxyMiddleware } = require('http-proxy-middleware')

const cors = require("./routes/cors");

// app.use(cors())

app.use(express.json());
// app.use(cors({
//   origin: ['http://localhost:3000', 'https://www.allworkersunion.com'],
//   credentials: true
// }));

// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', 'https://www.allworkersunion.com');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
//   });

//app.use('/api/*', createProxyMiddleware({target:'*', changeOrigin: true }));

// app.use(function(req, res, next) {
//   const allowedOrigins = ['http://localhost:3000', 'https://www.allworkersunion.com'];
//   const origin = req.headers.origin;
//   if (allowedOrigins.includes(origin)) {
//     res.setHeader('Access-Control-Allow-Origin', origin);
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// }});

// app.all('/GetInvolved', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   next()
// });


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

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use('/GetInvolvedEmails', getInvolvedRouter);



app.route("/api/getEmails")
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
  res.set('Access-Control-Allow-Origin', 'https://www.allworkersunion.com');
  StrikeEmailsModel.countDocuments({}, (err, result) => {
    if (err) {
      res.json("Error: " + err);
    } else {
      res.json(result);
    }
  });
});

app.route("/api/addEmail")
.post( cors.corsWithOptions, async (req, res, next) => {
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
});

