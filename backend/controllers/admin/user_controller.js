var models = require("../../models");
module.exports = {
  index(req, res) {
    models.user.findAll({ include: ["artist", "tokens"] }).then(users => {
      // bütün userları veritabanından getir
      res.json(users);
    });
  },
  store(req, res) {
    models.user
      .create({
        //Modeli kullanıcının verdiği parametrelere göre oluşturup database'e kaydet
        email: req.body.email,
        phone: req.body.phone,
        profile_picture: req.body.profile_picture,
        name: req.body.name,
        password: req.body.password,
        is_admin: req.body.is_admin,
        artist_id: req.body.artist_id
      })
      .then(user => res.json(user));
  },
  update(req, res) {
    //Kullanıcı eğer /users/:id ye PUT isteği atarsa verdiği datayla birlikte
    //:id kısmına yazılan id'ye sahip olan user'u günceller
    // ör: PUT /users/5 { input }  5 id'li useru güncelle
    models.user
      .update(
        // PUT /users/:id -- :id değerine sahip user'ı güncelle
        {
          email: req.body.email,
          phone: req.body.phone,
          profile_picture: req.body.profile_picture,
          name: req.body.name,
          password: req.body.password,
          is_admin: req.body.is_admin,
          artist_id: req.body.artist_id
        },
        {
          where: { id: req.params.id } // WHERE id = :id (:id express tarafından sağlanır)
        }
      )
      .then(updated => {
        res.json(updated); //Etkilenen satırları return et
      });
  },
  delete(req, res) {
    models.user
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(() => {
        res.send("");
        res.status(204).end();
      });
  },
  show(req, res) {
    models.user
      .findOne({
        where: { id: req.params.id }
      })
      .then(user => res.json(user));
  }
};
