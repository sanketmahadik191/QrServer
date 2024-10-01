const jwt = require('jsonwebtoken');

exports.authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
  
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.hotelId = decoded.hotelId;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};
