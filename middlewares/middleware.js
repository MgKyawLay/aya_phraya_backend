const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET_KEY || "yourSecretKey"; // Use your actual secret key

// Middleware to check if the user is authenticated with a Bearer token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  // If no Authorization header or token, send unauthorized error
  if (!authHeader) {
    return res.status(401).json({ error: "Authorization token is required" });
  }

  const token = authHeader.split(" ")[1]; // Extract the token from "Bearer token"

  // If token doesn't exist after splitting, return error
  if (!token) {
    return res.status(401).json({ error: "Token is required" });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, secretKey);

    // Attach the decoded data to the request object (for use in later middleware/controllers)
    req.user = decoded;

    // Call the next middleware or controller
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};

// Middleware to check the user's role
const authorizeRole = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== requiredRole) {
      return res.status(403).json({ error: "Forbidden: You don't have the required role" });
    }
    next();  // Proceed to the next middleware/controller
  };
};

module.exports = { authenticateToken, authorizeRole };
