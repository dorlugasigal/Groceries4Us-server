import { Lists } from '.'

let lists

beforeEach(async () => {
  lists = await Lists.create({ title: 'test', personnel: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = lists.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(lists.id)
    expect(view.title).toBe(lists.title)
    expect(view.personnel).toBe(lists.personnel)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = lists.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(lists.id)
    expect(view.title).toBe(lists.title)
    expect(view.personnel).toBe(lists.personnel)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
