const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        image: {
            type: String,
            default:
                'https://res.cloudinary.com/meleegod/image/upload/v1672740725/social_media/noAvatar_csvsho.png',
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('user', UserSchema)
