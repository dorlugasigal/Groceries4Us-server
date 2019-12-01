import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Groceries } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, groceries

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  groceries = await Groceries.create({ addedBy: user })
})

test('POST /groceries 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, name: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(typeof body.addedBy).toEqual('object')
})

test('POST /groceries 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /groceries 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
  expect(typeof body.rows[0].addedBy).toEqual('object')
})

test('GET /groceries 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /groceries/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${groceries.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(groceries.id)
  expect(typeof body.addedBy).toEqual('object')
})

test('GET /groceries/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${groceries.id}`)
  expect(status).toBe(401)
})

test('GET /groceries/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /groceries/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${groceries.id}`)
    .send({ access_token: userSession, name: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(groceries.id)
  expect(body.name).toEqual('test')
  expect(typeof body.addedBy).toEqual('object')
})

test('PUT /groceries/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${groceries.id}`)
    .send({ access_token: anotherSession, name: 'test' })
  expect(status).toBe(401)
})

test('PUT /groceries/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${groceries.id}`)
  expect(status).toBe(401)
})

test('PUT /groceries/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, name: 'test' })
  expect(status).toBe(404)
})

test('DELETE /groceries/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${groceries.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /groceries/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${groceries.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /groceries/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${groceries.id}`)
  expect(status).toBe(401)
})

test('DELETE /groceries/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
