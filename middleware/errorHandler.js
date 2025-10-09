// Middleware for handling any server errors. Check special GET request in browser:
// http://localhost:3000/test-error
export default function errorHandler (err, req, res, next) {
    console.error(err.stack)
    res.status(500).json({error: "Something goes wrong from server side"})
}