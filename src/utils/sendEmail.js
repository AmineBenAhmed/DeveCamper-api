const nodemailer = require("nodemailer");

const sendEmail = async options => { 
  console.log(process.env.SMTP_PASSWORD);
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD, 
    },
  });

  // send mail with defined transport object
  const message = {
    from: `${process.env.FROM_EMAIL} <${process.env.FROM_EMAIL}>`, // sender address
    to: options.email, // list of receivers,
    subject: options.subject, // Subject line
    text: options.message, // plain text body
  };

  const info = await transporter.sendMail(message);

  console.log("Message sent: %s", info.messageId);
}

module.exports = sendEmail;