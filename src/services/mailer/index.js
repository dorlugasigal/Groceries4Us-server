import { truncateSync } from 'fs'

var nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'groceries4us.help@gmail.com',
    pass: '@Aa123456'
  }
})

export const sendMail = (target, success, error) => {
  const {email, token} = target
  var mailOptions = {
    from: 'groceries4us.help@gmail.com',
    to: email,
    subject: 'Forget your password at Groceries4Us?',
    text: `Your reset code is: ${token} 
for your information, this code is valid for 30 minutes
if you didn't forgot your password, ignore this mail.
    
From the creators of Groceries4Us`
  }
  var ret = transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err)
      error('error when sending mail')
    } else {
      console.log('Email sent: ' + info.response)
      success(true)
    }
  })
  return ret
}
