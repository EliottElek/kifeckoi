"use strict";

import { Project } from "../entities/Project";
import { User } from "../entities/User";
const hbs = require('nodemailer-express-handlebars')
const nodemailer = require("nodemailer");
const path = require('path')

const handlebarOptions = {
  viewEngine: {
    partialsDir: path.resolve('./views/'),
    defaultLayout: false,
  },
  viewPath: path.resolve('./views/'),
};
async function sendMail(sender: User, project: Project, receiver: User, template: string, subject: string, mentionContext: string) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: "kifekoi.no.reply@gmail.com",
      pass: "kifekoi123456789",
    },
  });
  transporter.use('compile', hbs(handlebarOptions))

  await transporter.sendMail({
    from: '"Kifekoi" <kifekoi.no.reply@gmail.com>',
    to: receiver.email,
    subject: subject,
    template: template,
    context: {
      sender: sender,
      receiver: receiver,
      project: project,
      mentionContext: mentionContext
    }
  });
}

export default sendMail;