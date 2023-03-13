const mongoose = require('mongoose')
const { Schema } = mongoose

const CartSchema = new Schema(
    {
        userId: { type: String, required: true },
        products: [
            {
                _id: { type: String },
                title: { type: String },
                image: { type: String },
                price: { type: Number },
                category: { type: String },
                quantity: { type: Number, default: 1 },
                totalPrice: { type: Number, default: 0 },
            },
        ],
        totalQuantity: { type: Number, default: 0 },
        totalAmount: { type: Number, default: 0 },
    },
    { timestamps: true }
)

module.exports = mongoose.model('cart', CartSchema)
