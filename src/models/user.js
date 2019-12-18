const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt=require('jsonwebtoken')
const Task = require('../models/task')

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        lowercase: true,
        trim: true,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    Password: {
        type: String,
        trim: true,
        validate(value) {
            if (value < 6) {
                throw new Error('Password is short')
            }
        }
    },
    Age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Number is invalid')
            }
        }
    },
    avatar:{
        type:Buffer
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]

},{
    timestamps:true
})

userSchema.virtual('tasks',{
    ref:'tasks',
    localField:'_id',
    foreignField:'owner'
})

userSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()

    delete userObject.Password
    delete userObject.tokens
    delete userObject.avatar
    
    return userObject
}

userSchema.methods.generateTokenAuth = async function()  {
    const user = this
    token = jwt.sign({_id:user._id.toString()},'naitiklogin')
    user.tokens=user.tokens.concat({token})
    user.save()
    return token
}

userSchema.statics.findByCredential = async (Email, password) => {

    const user = await User.findOne({ Email })
    if (!user) {
        throw new Error('uable to login !')
    }
    const Passwordmatch = await bcrypt.compare(password, user.Password)
    if (!Passwordmatch) {
        throw new Error('unable to login!')
    }
    return user
}


//delete task if its owner remove

userSchema.pre('remove', async function(next){
    const user =this
    await Task.deleteMany({owner:user._id})
    next()
})
//ciphering plain password into hash password
userSchema.pre('save', async function (next) {

    const user = this
    if (user.isModified('Password')) {
      //  console.log('before saving')
        user.Password = await bcrypt.hash(user.Password, 8)
    }
    next()
})
const User = mongoose.model('Users', userSchema)


module.exports = User

