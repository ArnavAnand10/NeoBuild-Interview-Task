const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

function decryptData(encryptedData) {
    const bytes = CryptoJS.AES.decrypt(encryptedData, process.env.SECRET_KEY);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
}

const login = (req, res) => {
    let { username, password } = req.body;

    try {
        // Decrypt credentials
        username = decryptData(username);
        password = decryptData(password);

        console.log(typeof(username), typeof(password));

        // Validate credentials
        if (username !== process.env.username || password !== process.env.password) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Generate access token and refresh token
        const accessToken = jwt.sign({ username }, process.env.JWT_SECRET_KEY, { expiresIn: "15m" });
        const refreshToken = jwt.sign({ username }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });

        // Set refresh token as cookie
        res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, sameSite: "Strict" });

        // Send access token to client
        res.json({ accessToken });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const refreshToken = (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ error: "Unauthorized: No refresh token provided" });
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
        if (err) {
            console.error("Error verifying refresh token:", err);
            return res.status(403).json({ error: "Forbidden: Invalid refresh token" });
        }

        const newAccessToken = jwt.sign({ username: decoded.username }, process.env.JWT_SECRET_KEY, { expiresIn: "15m" });

        res.json({ accessToken: newAccessToken });
    });
};

const logout = (req, res) => {
    try {
        res.clearCookie("refreshToken");  // Clear refresh token cookie
        res.json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Error logging out:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { login, refreshToken, logout };
