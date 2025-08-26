const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    let token = req.headers["authorization"];

    if (token) {
        token = token.split(" ")[1]; // remove "Bearer "
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(400).json({ message: "Invalid token" });
            } else {
                req.user = decoded;
                next();
            }
        });
    } else {
        return res.status(400).json({ message: "No token provided" });
    }
};

module.exports = verifyToken;
