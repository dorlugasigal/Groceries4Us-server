import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { ForgetTokens } from '.'
import {User} from '../user/index'

const app = () => express(apiRoot, routes)

let forgetTokens
let mockUser

beforeEach(async () => {
  mockUser = await User.create({name: 'dor lugasi', password: '123456', email: 'dorlugasigal@gmail.com'})
  forgetTokens = await ForgetTokens.create({ email: 'dorlugasigal@gmail.com', token: '613344' })
})

test('POST /ForgetTokens 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ email: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.email).toEqual('test')
})

test('GET /ForgetTokens/:email/:token 201', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${forgetTokens.email}/${forgetTokens.token}`)
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.user.email).toEqual(forgetTokens.email)
  expect(body).toHaveProperty('token')
})

test('GET /ForgetTokens/:email/no token 404', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${forgetTokens.email}/`)
  expect(status).toBe(404)
})

test('GET /ForgetTokens/:email/:token 404', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/aaaaaa@gmail.com/123456`)
  expect(status).toBe(404)
})
test('GET /ForgetTokens/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('DELETE /ForgetTokens/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${forgetTokens._id}`)
  expect(status).toBe(204)
})

test('DELETE /ForgetTokens/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
