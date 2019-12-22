import { success, notFound } from '../../services/response/'
import { ForgetTokens } from '.'

export const create = ({ bodymen: { body } }, res, next) => {
  console.log(body)

  ForgetTokens.create(body)
    .then((forgetTokens) => forgetTokens.view(true))
    .then(success(res, 201))
    .catch(next)
}

export const show = ({ params }, res, next) =>
  ForgetTokens.findOne({email: params.email, token: params.token})
    .then(notFound(res))
    .then((forgetTokens) => forgetTokens ? forgetTokens.view() : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  ForgetTokens.findById(params.id)
    .then(notFound(res))
    .then((forgetTokens) => forgetTokens ? forgetTokens.remove() : null)
    .then(success(res, 204))
    .catch(next)
