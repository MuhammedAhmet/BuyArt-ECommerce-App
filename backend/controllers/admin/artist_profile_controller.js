var models = require("../../models");
module.exports = {
  index(req, res) {
    models.artist_profile
      .findAll({
        include: ["user", "products"]
      })
      .then(artist_profiles => {
        // bütün productları veritabanından getir
        res.json(artist_profiles);
      });
  },
  store(req, res) {
    models.artist_profile
      .create({
        //Modeli kullanıcının verdiği parametrelere göre oluşturup database'e kaydet

        nick_name: req.body.nick_name,
        slug: req.body.slug,
        biography: req.body.biography
      })
      .then(artist_profile => res.json(artist_profile));
  },
  update(req, res) {
    //Kullanıcı eğer /products/:id ye PUT isteği atarsa verdiği datayla birlikte
    //:id kısmına yazılan id'ye sahip olan product'u günceller
    // ör: PUT /products/5 { input }  5 id'li productu güncelle
    models.artist_profile
      .update(
        // PUT /products/:id -- :id değerine sahip product'ı güncelle
        {
          nick_name: req.body.nick_name,
          slug: req.body.slug,
          biography: req.body.biography
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
    models.artist_profile
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
    models.artist_profile
      .findOne({
        where: { id: req.params.id }
      })
      .then(artist_profile => res.json(artist_profile));
  }
};
