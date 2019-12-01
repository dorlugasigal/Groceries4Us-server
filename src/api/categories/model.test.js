import { Categories } from '.'
import { User } from '../user'

let user, categories

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  categories = await Categories.create({ addedBy: user, name: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = categories.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(categories.id)
    expect(typeof view.addedBy).toBe('object')
    expect(view.addedBy.id).toBe(user.id)
    expect(view.name).toBe(categories.name)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = categories.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(categories.id)
    expect(typeof view.addedBy).toBe('object')
    expect(view.addedBy.id).toBe(user.id)
    expect(view.name).toBe(categories.name)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
