/**
 * Middleware function that checks for user`s id in session
 * if this value is not equal to the one that specified in .env file
 * returns json with status 403(forbidden)
 */
export const isAuthenticated = (req, res, next) => {
    if (req.session.user === process.env.ADMIN_ID) {
        next();
    }
    else {
        res.status(403).json({ message: 'Access denied' });
    }
};
