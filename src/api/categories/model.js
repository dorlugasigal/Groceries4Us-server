import mongoose, { Schema } from 'mongoose'

const categoriesSchema = new Schema({
  addedBy: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

categoriesSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      addedBy: this.addedBy.view(full),
      name: this.name,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Categories', categoriesSchema)

export const schema = model.schema
export default model
