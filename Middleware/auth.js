const jwt = require("jsonwebtoken")
const auth = (req, res, next) => {
    const token = req.headers.token;

    if (!token) {
        return res.status(400).json({ error: "Token Not found" });
    }

    jwt.verify(token, "your-secret-key", (err, decodedToken) => {
        if (err) {
            return res.status(400).json({ error: "Invalid token" });
        }

        req.userId = decodedToken.userId;

        next();
    });
}

module.exports = { auth }