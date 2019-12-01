import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Categories } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, categories

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  categories = await Categories.create({ addedBy: user })
})

test('POST /categories 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, name: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(typeof body.addedBy).toEqual('object')
})

test('POST /categories 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /categories 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /categories/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${categories.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(categories.id)
})

test('GET /categories/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /categories/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${categories.id}`)
    .send({ access_token: userSession, name: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(categories.id)
  expect(body.name).toEqual('test')
  expect(typeof body.addedBy).toEqual('object')
})

test('PUT /categories/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${categories.id}`)
    .send({ access_token: anotherSession, name: 'test' })
  expect(status).toBe(401)
})

test('PUT /categories/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${categories.id}`)
  expect(status).toBe(401)
})

test('PUT /categories/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, name: 'test' })
  expect(status).toBe(404)
})

test('DELETE /categories/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${categories.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /categories/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${categories.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /categories/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${categories.id}`)
  expect(status).toBe(401)
})

test('DELETE /categories/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
