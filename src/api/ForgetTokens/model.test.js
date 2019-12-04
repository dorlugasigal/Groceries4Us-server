import { ForgetTokens } from '.'

let forgetTokens

beforeEach(async () => {
  forgetTokens = await ForgetTokens.create({ email: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = forgetTokens.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(forgetTokens.id)
    expect(view.email).toBe(forgetTokens.email)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = forgetTokens.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(forgetTokens.id)
    expect(view.email).toBe(forgetTokens.email)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
