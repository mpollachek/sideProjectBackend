const express = require('express');
const GetInvolvedEmailsModel = require('../models/NewsletterEmails');

const getInvolvedRouter = express.Router();


getInvolvedRouter.route('/GetInvolvedEmails')
.get((req, res, next) => {
  GetInvolvedEmailsModel.find()
  .then(email => {
    console.log('email saved: ', email);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(email);
  })
  .catch(err => next(err));
})

getInvolvedRouter.route('/GetInvolvedEmails')
.post((req, res, next) => {
  GetInvolvedEmailsModel.create(req.body)
  .then(email => {
    console.log('email saved: ', email);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(email);
  })
  .catch(err => next(err));
})