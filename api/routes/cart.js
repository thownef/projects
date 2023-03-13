const router = require('express').Router()
const Cart = require('../model/Cart')

// Create
router.post('/', async (req, res) => {
    const { user, product } = req.body
    const userId = user._id
    try {
        const findCart = await Cart.findOne({ userId: userId })
        if (findCart) {
            const index = findCart.products.findIndex(
                (item) => item._id === product._id
            )
            if (index !== -1) {
                findCart.products[index].quantity += 1
                findCart.products[index].totalPrice =
                    findCart.products[index].price *
                    findCart.products[index].quantity
            } else {
                findCart.totalQuantity += 1
                findCart.products = [...findCart.products, product]
            }
            findCart.totalAmount = findCart.products.reduce((total, item) => {
                return total + item.totalPrice
            }, 0)
            await findCart.save()
            return res.status(200).json(findCart)
        } else {
            const userId = user._id
            const newCart = Cart({
                userId: userId,
                products: [product],
                totalQuantity: 1,
                totalAmount: product.totalPrice,
            })
            const savedCart = await newCart.save()
            res.status(200).json(savedCart)
        }
    } catch (err) {
        return res.status(500).json(err)
    }
})

// remove a product
router.post('/product/:id', async (req, res) => {
    try {
        const deleteCart = await Cart.findOne({ userId: req.body._id })
        const index = deleteCart.products.findIndex(
            (item) => item._id === req.params.id
        )
        if (deleteCart.products[index].quantity > 1) {
            deleteCart.products[index].quantity -= 1
            deleteCart.products[index].totalPrice =
                deleteCart.products[index].quantity *
                deleteCart.products[index].price
        } else {
            deleteCart.products.splice(index, 1)
            deleteCart.totalQuantity -= 1
        }
        deleteCart.totalAmount = deleteCart.products.reduce((total, item) => {
            return total + item.totalPrice
        }, 0)
        await deleteCart.save()
        res.status(200).json(deleteCart)
    } catch (err) {
        return res.status(500).json(err)
    }
})

// delete product
router.post('/:id', async (req, res) => {
    try {
        const deleteCart = await Cart.findOne({ userId: req.body._id })
        const index = deleteCart.products.findIndex(
            (item) => item._id === req.params.id
        )
        deleteCart.products.splice(index, 1)
        deleteCart.totalQuantity -= 1
        deleteCart.totalAmount = deleteCart.products.reduce((total, item) => {
            return total + item.totalPrice
        }, 0)
        await deleteCart.save()
        res.status(200).json(deleteCart)
    } catch (err) {
        return res.status(500).json(err)
    }
})

// get cart
router.get('/find/:id', async (req, res) => {
    try {
        const findCart = await Cart.findOne({
            userId: req.params.id,
        })
        res.status(201).json(findCart)
    } catch (err) {
        return res.status(500).json(err)
    }
})

module.exports = router
