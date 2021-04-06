const jwt = require('jsonwebtoken')


const AccessToken = (userid) => {
    let token = jwt.sign({id: userid}, process.env.ACCESS_SECRET , {expiresIn: '30s'})
    return token
}

const RefreshToken = (userid) => {
    let token = jwt.sign({id: userid}, process.env.REFRESH_SECRET , {expiresIn: '1y'})
    return token
}

module.exports= {AccessToken, RefreshToken}