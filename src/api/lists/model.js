import mongoose, { Schema } from 'mongoose'

const listsSchema = new Schema({
  title: {
    type: String
  },
  personnel: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

listsSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      title: this.title,
      personnel: this.personnel,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Lists', listsSchema)

export const schema = model.schema
export default model
