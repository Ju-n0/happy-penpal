const isAuthorized = (req, res, next) => {
  if (!req.session.user_obj) return res.redirect("/");

  next();
};

module.exports = isAuthorized;
