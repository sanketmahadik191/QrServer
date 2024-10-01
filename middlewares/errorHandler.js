const errorHandler = (err, req, res, next) => {
    console.error(err.stack);  // Log the error stack for debugging
  
    const statusCode = err.statusCode || 500;  // Default to 500 if statusCode isn't set
    const message = err.message || "Internal Server Error";
  
    res.status(statusCode).json({
      success: false,
      message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack, // Hide stack in production
    });
  };
  
  module.exports = errorHandler;
