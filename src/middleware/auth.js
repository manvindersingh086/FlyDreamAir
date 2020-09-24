const jwt = require('jsonwebtoken')
const User = require('../models/User')

const auth = async (req, res, next) => {
    try {
        const token = req.query.token;
        const decoded = jwt.verify(token, 'FlyDreamAir')
        const user = await User.findOne({email:decoded.email,'tokens.token' : token})
        console.log(user)
        if(!user)
        {
            throw new Error()
        }
        req.user = user
        req.token = token
        next()
    }
   catch(e)
   {
       res.status(401).send({error : 'Please Login.'})
   }

}

module.exports= auth