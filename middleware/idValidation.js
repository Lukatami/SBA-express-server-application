// Middleware of ID validation in GET / PUT / PATCH / DELETE requests (if ID specified)
export default function idValidation(req, res, next) {
  // All data in HTTP requests recieving as a String
  // Convert recieved data to a number
  const numId = Number(req.params.id);

  // Check if it's actually a Integer and positive
  if (!Number.isInteger(numId) || numId <= 0) {
    return res.status(400).json({
      error: `ID for ${req.method} ${req.originalUrl} must be a positive Integer`,
    });
  }

  // Param with validId for all requests using this middleware
  req.validId = numId;

  next();
}
