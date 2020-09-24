const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: 'Name is requrired!',
        trim : true  
    },
    email : {
        type : String,
        unique : true,
        lowercase : true,
        trim : true,
        required : true,
        validate(value){
            if(!validator.isEmail(value))
            {
                throw new Error('Email is invalid!')
            }
        } 
    },
    password : {
        type : String,
        required : true,
        trim : true,
        validate(value) {
            if(value.length < 7 || value.includes('Password') || value.includes('password'))
            {
                throw new Error('Invalid Password')
            }
        }
    },
    tokens : [{
            token : {
                type : String,
                required : true
            }
    }]
})

userSchema.methods.generateToken = async function() {
    const user = this
    const token = await jwt.sign({email : user.email},'FlyDreamAir')
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

userSchema.statics.findUserByCredentials = async (email, password) => {

    const user = await User.findOne({email : email})
    
    
    if(!user)
    {
        throw new Error('Unable to login!')
    }
    
    // const isMatch = await bcrypt.compare(password,user.password)

    // if(!isMatch)
    // {
    //     throw new Error('Unable to login!')
    // }
   
    return user

}

const User = mongoose.model('User',userSchema);

module.exports = User;