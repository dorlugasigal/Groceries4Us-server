import { success, notFound } from '../../services/response/'
import { ForgetTokens } from '.'
import { sign } from '../../services/jwt'
import {User} from '../user/index'
export const create = ({ bodymen: { body } }, res, next) => {
  ForgetTokens.create(body)
    .then((forgetTokens) => forgetTokens.view(true))
    .then(success(res, 201))
    .catch(next)
}
const getUserByEmail = (params, res, next) => {
  const { email } = params
  return User.findOne({email})
    .then(notFound(res))
    .then((user) => user ? user.view() : null)
    .then(res)
    .catch(next)
}
export const show = ({ params }, res, next) =>
  ForgetTokens.findOne({email: params.email, token: params.token})
    .then(notFound(res))
    .then((forgetTokens) => forgetTokens ? forgetTokens.view() : null)
    .then(() => {
      console.log('IM HERE')
      getUserByEmail(params, res, next)
        .then(found => {
          console.log('NOW HERE')
          console.log(found)
          sign(found.id)
            .then((token) => {
              console.log('AND NOW HERE')
              found.email = params.email
              return ({ token, user: found })
            })
            .then(success(res, 201))
        })
    })
    .catch(next)

export const destroy = ({ params }, res, next) =>
  ForgetTokens.findById(params.id)
    .then(notFound(res))
    .then((forgetTokens) => forgetTokens ? forgetTokens.remove() : null)
    .then(success(res, 204))
    .catch(next)
