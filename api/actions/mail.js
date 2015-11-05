import nodemailer from 'nodemailer';
const isEmpty = value => value === undefined || value === null || value === '';

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'radiohseperm@gmail.com',
      pass: 'OhJIM$z@@b@#'
    }
});

export default function sendMail(req) {
  return new Promise((resolve, reject) => {
    const mail = req.body.mail;

    console.log(req);

    if (isEmpty(mail) || isEmpty(mail.from) || isEmpty(mail.subject) || isEmpty(mail.text)) {
      reject("empty fields");
    }

    const mailOptions = {
      ...mail,
      from: '<' + mail.from + '>',
      to: 'radiohseperm@gmail.com'
    }

    transporter.sendMail(mailOptions, function(error, info){
      if (error){
        console.log(error)
        reject(error);
      } else {
        console.log('Message sent: ' + info.response);
        resolve();
      }
    });

  });
}
