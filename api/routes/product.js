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
        const qsearch = req.query.search
        const qfilter = req.query.filter
        const qsort = req.query.sort
        let product
        //filter
        if (qfilter !== 'default') {
            product = await Product.find({
                category: {
                    $in: [qfilter],
                },
            })
        } else {
            product = await Product.find()
        }

        // search
        if (!qsearch === undefined) {
            return false
        } else {
            const data = product.filter(
                (item) =>
                    item.title.toLowerCase().indexOf(qsearch.toLowerCase()) !==
                    -1
            )
            product = data
        }
        //sort
        if (qsort === 'default') {
            product
        }
        if (qsort === 'ascending') {
            product.sort((a, b) => {
                let x = a.title.toLowerCase()
                let y = b.title.toLowerCase()
                return x === y ? 0 : x < y ? 1 : -1
            })
        }
        if (qsort === 'descending') {
            product.sort((a, b) => {
                let x = a.title.toLowerCase()
                let y = b.title.toLowerCase()
                return x === y ? 0 : x > y ? 1 : -1
            })
        }
        if (qsort === 'highprice') {
            product.sort((a, b) => {
                let x = a.price
                let y = b.price
                return x === y ? 0 : x < y ? 1 : -1
            })
        }
        if (qsort === 'lowprice') {
            product.sort((a, b) => {
                let x = a.price
                let y = b.price
                return x === y ? 0 : x > y ? 1 : -1
            })
        }

        res.status(200).json(product)
    } catch (error) {
        console.log(error)
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
