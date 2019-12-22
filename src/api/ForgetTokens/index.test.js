import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { ForgetTokens } from '.'

const app = () => express(apiRoot, routes)

let forgetTokens

beforeEach(async () => {
  forgetTokens = await ForgetTokens.create({ email: 'aaa@gmail.com', token: '123456' })
})

test('POST /ForgetTokens 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ email: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.email).toEqual('test')
})

test('GET /ForgetTokens/:email/:token 200', async () => {
  console.log(`${apiRoot}/${forgetTokens.email}/${forgetTokens.token}`)

  console.log(forgetTokens)
  const { status, body } = await request(app())
    .get(`${apiRoot}/${forgetTokens.email}/${forgetTokens.token}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.email).toEqual(forgetTokens.email)
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
