import nodemailer from 'nodemailer';
const isEmpty = value => value === undefined || value === null || value === '';

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'bsod.chebureg@gmail.com',
        pass: 'Bsodalfa007'
    }
});

export default function sendMail(req) {
  return new Promise((resolve, reject) => {
    const mail = req.body.mail;

    if (isEmpty(mail) || isEmpty(mail.from) || isEmpty(mail.subject) || isEmpty(mail.text)) {
      reject("empty fields");
    }

    const mailOptions = {
      ...mail,
      to: 'psychedelicespresso@gmail.com'
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
