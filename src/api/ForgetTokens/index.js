import { Router } from 'express'
import { middleware as body } from 'bodymen'
import { create, show, destroy } from './controller'
import { schema } from './model'
export ForgetTokens, { schema } from './model'

const router = new Router()
const { email } = schema.tree

/**
 * @api {post} /ForgetTokens Create forget tokens
 * @apiName CreateForgetTokens
 * @apiGroup ForgetTokens
 * @apiParam email Forget tokens's email.
 * @apiSuccess {Object} forgetTokens Forget tokens's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Forget tokens not found.
 */
router.post('/',
  body({ email }),
  create)

/**
 * @api {get} /ForgetTokens/:id Retrieve forget tokens
 * @apiName RetrieveForgetTokens
 * @apiGroup ForgetTokens
 * @apiSuccess {Object} forgetTokens Forget tokens's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Forget tokens not found.
 */
router.get('/:id',
  show)

/**
 * @api {delete} /ForgetTokens/:id Delete forget tokens
 * @apiName DeleteForgetTokens
 * @apiGroup ForgetTokens
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Forget tokens not found.
 */
router.delete('/:id',
  destroy)

export default router
