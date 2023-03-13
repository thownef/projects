const router = require('express').Router()
const User = require('../model/User')

// register
router.post('/register', async (req, res) => {
    try {
        const newUser = new User({
            username: req.body.username,
            password: req.body.password,
        })
        const user = await newUser.save()
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
})

//login
router.post('/login', async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await User.findOne({ username: username })
        if (!user) {
            res.status(500).json('Sai tài khoản or mật khẩu')
        } else {
            user.password == password
                ? res.status(200).json(user)
                : res.status(500).json('Sai tên tài khoản hoặc mật khẩu')
        }
    } catch (err) {
        console.log(err)
    }
})

module.exports = router
