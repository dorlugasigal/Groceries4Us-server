import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { ForgetTokens } from '.'

const app = () => express(apiRoot, routes)

let forgetTokens

beforeEach(async () => {
  forgetTokens = await ForgetTokens.create({})
})

test('POST /ForgetTokens 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ email: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.email).toEqual('test')
})

test('GET /ForgetTokens/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${forgetTokens.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(forgetTokens.id)
})

test('GET /ForgetTokens/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('DELETE /ForgetTokens/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${forgetTokens.id}`)
  expect(status).toBe(204)
})

test('DELETE /ForgetTokens/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
