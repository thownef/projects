const router = require('express').Router()
const cloudinary = require('../utils/cloudinary.js')
const upload = require('../utils/multer.js')
const Product = require('../model/Product')

// Create
router.post('/', async (req, res) => {
    const newProduct = new Product(req.body)

    try {
        const savedProduct = await newProduct.save()
        res.status(200).json(savedProduct)
    } catch (err) {
        res.status(500).json(err)
    }
})

// Get product
router.get('/find/:id', async (req, res) => {
    try {
        const getProduct = await Product.findById(req.params.id)
        res.status(200).json(getProduct)
    } catch (err) {
        res.status(500).json(err)
    }
})

//get all
router.get('/', async (req, res) => {
    try {
        const product = await Product.find()
        res.status(200).json(product)
    } catch (err) {
        res.status(500).json(err)
    }
})

// delete
router.delete('/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json('Đã xóa')
    } catch (error) {
        res.status(500).json(err)
    }
})

//update
router.put('/:id', async (req, res) => {
    try {
        const update = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        })
        res.status(200).json(update)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router
