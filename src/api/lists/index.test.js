import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Lists } from '.'

const app = () => express(apiRoot, routes)

let userSession, lists

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  userSession = signSync(user.id)
  lists = await Lists.create({personell: [user.id]})
})

test('POST /lists 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, title: 'test', personnel: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.title).toEqual('test')
  expect(body.personnel).toEqual('test')
})

test('POST /lists 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /lists 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /lists/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${lists.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(lists.id)
})

test('GET /lists/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /lists/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${lists.id}`)
    .send({ access_token: userSession, title: 'test', personnel: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(lists.id)
  expect(body.title).toEqual('test')
  expect(body.personnel).toEqual('test')
})

test('PUT /lists/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${lists.id}`)
  expect(status).toBe(401)
})

test('PUT /lists/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: userSession, title: 'test', personnel: 'test' })
  expect(status).toBe(404)
})

test('DELETE /lists/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${lists.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /lists/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${lists.id}`)
  expect(status).toBe(401)
})

test('DELETE /lists/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})
