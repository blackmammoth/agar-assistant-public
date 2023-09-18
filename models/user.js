import validator from 'validator'
import { Schema, model, models } from 'mongoose'


const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: [true, "Email already exists"],
        validate: [validator.isEmail, 'Please enter a valid email']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

})

const User = models.User || model('User', userSchema);
export default User;