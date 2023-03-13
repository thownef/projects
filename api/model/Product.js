const mongoose = require('mongoose')
const { Schema } = mongoose

const ProductSchema = new Schema(
    {
        title: { type: String, required: true, unique: true },
        image: {
            type: String,
        },
        price: { type: Number, required: true },
        category: { type: String, require: true },
        cloudinary_id: { type: String },
    },
    { timestamps: true }
)

module.exports = mongoose.model('product', ProductSchema)
