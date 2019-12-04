import { sign } from '../../services/jwt'
import { success } from '../../services/response/'
import { sendMail } from '../../services/mailer'
import { ForgetTokens } from '../ForgetTokens'
export const login = ({ user }, res, next) =>
  sign(user.id)
    .then((token) => ({ token, user: user.view(true) }))
    .then(success(res, 201))
    .catch(next)

export const forgetPassword = async (req, res, next) => {
  var { email } = req.body
  var target = {}
  target.email = email
  target.token = Math.floor((Math.random() * 1000000) + 1).toString()

  await ForgetTokens.create(target)
    .then((forgetTokens) => forgetTokens.view(true))
    .catch(next)
  sendMail(target)
}
