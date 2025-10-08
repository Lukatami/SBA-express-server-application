// Middleware of ID validation in GET / PUT / PATCH / DELETE requests (if ID specified)
export default function idValidation(req, res, next) {
  const numId = Number(req.params.id);

  // All in HTTP requests recieving as String, to manipulate with correct numeral id we must validate it for Integer
  if (!Number.isInteger(numId) || numId <= 0) {
    return res.status(400).json({
      error: `ID for ${req.method} ${req.originalUrl} must be a positive number`,
    });
  }

  req.validId = numId;

  next();
}
