var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport();

module.exports = {
  sendTo: function(toAddress, subject, message) {
    transporter.sendMail({
      from: 'FROM_ADDRESS@DOMAIN',
      to: toAddress,
      subject: subject,
      text: message
    });
  }
}
