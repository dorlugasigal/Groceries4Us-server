var nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'groceries4us.help@gmail.com',
    pass: '@Aa123456'
  }
})

export const sendMail = (target) => {
  const {email, token} = target
  var mailOptions = {
    from: 'groceries4us.help@gmail.com',
    to: email,
    subject: 'Forget your password at Groceries4Us?',
    text: `Your reset code is: ${token} \nif you didn't forgot your password, ignore this mail.\n\nFrom the creators of Groceries4Us`
  }
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}
