const jwt = require('jsonwebtoken');


const fetchuser = (req,res, next) => {
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).send({error : "Please Auth valid Token !"})
    }
    try {
        const data = jwt.verify(token,process.env.JWT_SECRET);
        req.user = data.user
        next();
    } catch (error) {
        res.status(500).send("Internal Server Error !");
    }
    
}

module.exports = fetchuser;