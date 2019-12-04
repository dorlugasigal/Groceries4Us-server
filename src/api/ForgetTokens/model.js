import mongoose, { Schema } from 'mongoose'

const forgetTokensSchema = new Schema({
  email: {
    type: String
  },
  token: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

forgetTokensSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      email: this.email,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('ForgetTokens', forgetTokensSchema)

export const schema = model.schema
export default model
