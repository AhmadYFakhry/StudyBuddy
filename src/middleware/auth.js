const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const dec = jwt.verify(token, process.env.JWTS);
        const user = await User.findOne({
            _id: dec._id,
            'tokens.token': token
        })
        if(!user) throw new Error();
        req.token = token;
        req.user = user;
    } catch (error) {
        console.log(error)
        res.status(401).send({message: "Please authenticate beforehand"})
    }
    next();
}

module.exports = auth;