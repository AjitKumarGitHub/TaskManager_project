import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
    const token = req.cookies.access_token || req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: "Access denied, no token provided." });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.secret_key);
       // console.log("Decoded user:", decoded); // Debugging line
        req.user = { _id: decoded.id }; // Set the user ID correctly
        return next();
    } catch (error) {
        console.error("Token verification error:", error); // Debugging line
        return res.status(401).json({ message: "Invalid token." }); // Send error response
    }
};


export default authenticate;
