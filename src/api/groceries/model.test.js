import { Groceries } from '.'
import { User } from '../user'

let user, groceries

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  groceries = await Groceries.create({ addedBy: user, name: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = groceries.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(groceries.id)
    expect(typeof view.addedBy).toBe('object')
    expect(view.addedBy.id).toBe(user.id)
    expect(view.name).toBe(groceries.name)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = groceries.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(groceries.id)
    expect(typeof view.addedBy).toBe('object')
    expect(view.addedBy.id).toBe(user.id)
    expect(view.name).toBe(groceries.name)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
