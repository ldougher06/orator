'use strict';

var express = require('express');
var mongodb     = require('../config/mongodb');
var ObjectID = require('mongodb').ObjectID;
var nodemailer = require('nodemailer');
var _       = require('lodash');

// Send Grid

var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'nsscohort9.demoday@gmail.com',
    pass: 'cohort9demo'
  }
});

function sendMail (content, cb) {
  console.log(content);
  var content = JSON.stringify(content);
  var mailOptions = {
    from    :'nsscohort9.demoday@gmail.com',
    to      :'logan.dougher@gmail.com',
    subject : 'New Overton Orator',
    text    : content
  }

  transporter.sendMail(mailOptions, function(err, info) {
    if(err) {
      console.log('error error');
      console.log(err);
      return;
    } else {
    cb();
    console.log('Email Sent!!!!');
    console.log(info.response);
    }
  });
};

module.exports = {
  send: sendMail
}
