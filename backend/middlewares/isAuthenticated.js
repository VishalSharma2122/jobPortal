import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies?.token; // Ensure `cookies` exists

    // Check if the token is present
    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }

    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.SECRET_KEY); 

    // Attach the user ID to the request object
    req.userId = decoded.userId; // Ensure your token contains a `userId` field
    next(); // Pass control to the next middleware/route handler
  } catch (error) {
    console.error("Authentication error:", error.message);
    return res.status(401).json({
      message: "Authentication failed",
      success: false,
    });
  }
};

export default isAuthenticated;
