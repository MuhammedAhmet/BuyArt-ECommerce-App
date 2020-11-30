module.exports = {
  isAdmin(req, res, next) {
    if (req.user && req.user.is_admin) return next();
    return res.send(403);
  }
};
