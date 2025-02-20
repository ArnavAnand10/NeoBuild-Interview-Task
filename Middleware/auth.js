const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized: No access token provided" });
    }

    const accessToken = authHeader.split(" ")[1];

    jwt.verify(accessToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({ error: "Access token expired. Please refresh the token." });
            }
            return res.status(403).json({ error: "Forbidden: Invalid access token" });
        }
        req.user = decoded; 
        next(); 
    });
};

module.exports = authenticate;
