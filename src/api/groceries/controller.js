import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Groceries } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Groceries.create({ ...body, addedBy: user })
    .then((groceries) => groceries.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Groceries.count(query)
    .then(count => Groceries.find(query, select, cursor)
      .populate('addedBy')
      .then((groceries) => ({
        count,
        rows: groceries.map((groceries) => groceries.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Groceries.findById(params.id)
    .populate('addedBy')
    .then(notFound(res))
    .then((groceries) => groceries ? groceries.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Groceries.findById(params.id)
    .populate('addedBy')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'addedBy'))
    .then((groceries) => groceries ? Object.assign(groceries, body).save() : null)
    .then((groceries) => groceries ? groceries.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Groceries.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'addedBy'))
    .then((groceries) => groceries ? groceries.remove() : null)
    .then(success(res, 204))
    .catch(next)
