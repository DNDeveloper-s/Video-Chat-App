module.exports.isAuth = (req, res, next) => {
    
    if(!req.session.isLoggedIn) {
        return res.redirect(`/auth/login?reason=You%20need%20to%20login%20for%20such%20functionality.&redirectto=${req.originalUrl}`);
    }
    return next();
}

module.exports.isNotAuth = (req, res, next) => {
    if(req.session.isLoggedIn) {
        return res.redirect(`/dashboard/home`);
    }
    return next();
}