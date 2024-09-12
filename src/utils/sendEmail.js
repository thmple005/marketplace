// import * as fs from 'fs';
import nodemailer from 'nodemailer';
// import Handlebars from 'handlebars';
// const logincontent = fs.readFileSync('OtpEmail.html', 'utf8');

export const signupConfirmation = async (name, email, signup_otp) => {
  console.log(name, email, signup_otp)
  try{
//   const template = Handlebars.compile(logincontent);

//   const replacements = {
//     name: name,
//     otp:signup_otp
//   };

//   const htmlToSend = template(replacements);

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
    debug: true,
    logger: true,
  })
  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: 'For Login',
    text: `Hi ${name}`,
    // html:htmlToSend,
    html:`Hi your one time otp verification is ${signup_otp}`,
  })
  return 1
}
catch(error){
    console.log('error',error);
    return 0
}
}

export const resetPasswordConfirmation = async (name, email, reset_otp) => {
  console.log(name, email, reset_otp)
  try{
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
    debug: true,
    logger: true,
  })
  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: 'For Login',
    text: `Hi ${name}`,
    // html:htmlToSend,
    html:`Hi your reset password otp is ${reset_otp}`,
  })
  return 1
}
catch(error){
    console.log('error',error);
    return 0
}
}