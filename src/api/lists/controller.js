import { success, notFound } from '../../services/response/'
import { Lists } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Lists.create(body)
    .then((lists) => lists.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Lists.count(query)
    .then(count => Lists.find(query, select, cursor)
      .then((lists) => ({
        count,
        rows: lists.map((lists) => lists.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Lists.findById(params.id)
    .then(notFound(res))
    .then((lists) => lists ? lists.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Lists.findById(params.id)
    .then(notFound(res))
    .then((lists) => lists ? Object.assign(lists, body).save() : null)
    .then((lists) => lists ? lists.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Lists.findById(params.id)
    .then(notFound(res))
    .then((lists) => lists ? lists.remove() : null)
    .then(success(res, 204))
    .catch(next)
