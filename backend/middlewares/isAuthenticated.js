import jwt from 'jsonwebtoken';

const isAuthenticated = async (req, res, next) => {  // Add 'next' here
    try {
        const token = req.cookies.token;

        // Check if the token is present
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false
            });
        }

        // Verify the token using the secret key
        const decoded = await jwt.verify(token, process.env.SECRET_KEY);

        // If the token is invalid
        if (!decoded) {
            return res.status(401).json({
                message: "Invalid token",
                success: false
            });
        }

        // Attach the user ID to the request object
        req.userId = decoded.userId;  // Or `req.id = decoded.userId` based on your usage
        next();  // Pass control to the next middleware/route handler
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

export default isAuthenticated;