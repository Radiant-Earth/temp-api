const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");

dotenv.config();

async function httpSendEmail(data) {
  console.log("Email data: ", data);

  let readHTMLFile = function (path, callback) {
    fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
      if (err) {
        callback(err);
      } else {
        callback(null, html);
      }
    });
  };

  // let transporter = nodemailer.createTransport({
  //   service: "gmail",
  //   auth: {
  //     type: "OAuth2",
  //     user: process.env.MAIL_USERNAME,
  //     pass: process.env.MAIL_PASSWORD,
  //     clientId: process.env.OAUTH_CLIENTID,
  //     clientSecret: process.env.OAUTH_CLIENT_SECRET,
  //     refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  //   },
  // });

  // console.log({
  //   name: process.env.MAIL_NAME,
  //   pass: process.env.MAIL_KEY,
  // });

  let transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.zoho.com",
    auth: {
      user: `${process.env.MAIL_NAME}`,
      pass: `${process.env.MAIL_KEY}`,
    },
    from: process.env.MAIL_NAME,
    secure: true,
    tls: {
      rejectUnauthorized: false,
    },
  });

  console.log({
    key: process.env.MAIL_KEY,
    name: process.env.MAIL_NAME,
  });

  // console.log(__dirname + '/../public/index.html')

  readHTMLFile(__dirname + "/../utils/welcomeMail.html", function (err, html) {
    if (err) {
      console.log("error reading file", err);
      return;
    }
    var template = handlebars.compile(html);
    var replacements = {
      username: data.fullName,
      store: data.metadata_id.split(".")[0],
      link: data.link,
    };
    var htmlToSend = template(replacements);
    let mailOptions = {
      envelope: {
        from: process.env.MAIL_NAME,
        to: data.email,
      },
      subject: `[REWARDED] ${
        data.metadata_id.split(".")[0]
      } store sent you a coupon!!!`,
      text: "You've been rewarded with a coupon.",
      html: htmlToSend,
    };

    transporter.verify((error, success) => {
      if (error) {
        console.log(error.message);
      }
      console.log({
        success: success,
        message: "mail server is ready for your messages",
      });
    });

    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log("Error " + err);
        throw new Error("Unable to sent email");
      } else {
        return {
          message: "Email sent successfull",
          data,
        };
      }
    });
  });
}

module.exports = {
  httpSendEmail,
};
