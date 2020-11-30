var models = require("../models");
var bcrypt = require("bcryptjs");

var salt = "$2a$08$3e4XsSo8F9wDKaBwIWHiGO";

module.exports = {
  login(req, res) {
    console.log(bcrypt.hashSync(req.body.password, salt));
    models.user
      .findOne({
        where: {
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, salt)
        }
      })
      .then(user => {
        if (user == null) {
          return res.send(401);
        }
        token = user.generateToken();
        models.user_token
          .build({
            user_id: user.id,
            token: token
          })
          .save()
          .then(userToken => res.json(userToken));
      });
  },
  register(req, res) {
    models.user
      .build({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, salt),
        phone: req.body.phone,
        name: req.body.name
      })
      .save()
      .then(user => {
        token = user.generateToken();
        models.user_token
          .build({
            user_id: user.id,
            token: token
          })
          .save()
          .then(userToken => res.json(userToken));
      });
  },
  profile(req, res) {
    res.json(req.user);
  },
  logout(req, res) {
    var token = req.headers["authorization"].split(" ")[1];
    models.user_token
      .destroy({
        where: {
          token: token
        }
      })
      .then(() => res.json(true));
  }
};
