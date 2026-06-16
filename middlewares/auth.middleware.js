import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const secretKey = process.env.JWT_SECRET; // Make sure to set this in your environment variables
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1]; // Bearer token -> Bearer $13gsvhjbsvhbehbes
  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  console.log(token,secretKey);
  
  // Here you would typically verify the token and extract user information
  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user; // Attach user info to request object
    next();
  });
};

export default authMiddleware;
