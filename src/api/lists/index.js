import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Lists, { schema } from './model'

const router = new Router()
const { title, personnel } = schema.tree

/**
 * @api {post} /lists Create lists
 * @apiName CreateLists
 * @apiGroup Lists
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam title Lists's title.
 * @apiParam personnel Lists's personnel.
 * @apiSuccess {Object} lists Lists's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Lists not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ title, personnel }),
  create)

/**
 * @api {get} /lists Retrieve lists
 * @apiName RetrieveLists
 * @apiGroup Lists
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of lists.
 * @apiSuccess {Object[]} rows List of lists.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /lists/:id Retrieve lists
 * @apiName RetrieveLists
 * @apiGroup Lists
 * @apiSuccess {Object} lists Lists's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Lists not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /lists/:id Update lists
 * @apiName UpdateLists
 * @apiGroup Lists
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam title Lists's title.
 * @apiParam personnel Lists's personnel.
 * @apiSuccess {Object} lists Lists's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Lists not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ title, personnel }),
  update)

/**
 * @api {delete} /lists/:id Delete lists
 * @apiName DeleteLists
 * @apiGroup Lists
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Lists not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
