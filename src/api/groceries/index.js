import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Groceries, { schema } from './model'

const router = new Router()
const { name } = schema.tree

/**
 * @api {post} /groceries Create groceries
 * @apiName CreateGroceries
 * @apiGroup Groceries
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Groceries's name.
 * @apiSuccess {Object} groceries Groceries's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Groceries not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ name }),
  create)

/**
 * @api {get} /groceries Retrieve groceries
 * @apiName RetrieveGroceries
 * @apiGroup Groceries
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of groceries.
 * @apiSuccess {Object[]} rows List of groceries.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /groceries/:id Retrieve groceries
 * @apiName RetrieveGroceries
 * @apiGroup Groceries
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} groceries Groceries's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Groceries not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /groceries/:id Update groceries
 * @apiName UpdateGroceries
 * @apiGroup Groceries
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Groceries's name.
 * @apiSuccess {Object} groceries Groceries's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Groceries not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ name }),
  update)

/**
 * @api {delete} /groceries/:id Delete groceries
 * @apiName DeleteGroceries
 * @apiGroup Groceries
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Groceries not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
