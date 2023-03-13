const User = require('../model/User')

const router = require('express').Router()

//get user
router.get('/find/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const { password, ...others } = user._doc
        res.status(200).json(others)
    } catch (err) {
        res.status(500).json(err)
    }
})

//get all user
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json(err)
    }
})

//delete
router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json('Đã xóa')
    } catch (err) {
        res.status(500).json(err)
    }
})

//update
router.put('/:id', async (req, res) => {
    try {
        const userUpdate = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        })
        res.status(200).json(userUpdate)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router
