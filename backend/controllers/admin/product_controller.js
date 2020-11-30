var models = require("../../models");
module.exports = {
  index(req, res) {
    models.product
      .findAll({
        include: ["orders", "artist"]
      })
      .then(products => {
        // bütün productları veritabanından getir
        res.json(products);
      });
  },
  store(req, res) {
    models.product
      .create({
        //Modeli kullanıcının verdiği parametrelere göre oluşturup database'e kaydet
        type: req.body.type,
        price: req.body.price,
        image_paths: req.body.image_paths,
        count: req.body.count,
        name: req.body.name,
        description: req.body.description,
        artist_id: req.body.artist_id
      })
      .then(product => res.json(product));
  },
  update(req, res) {
    //Kullanıcı eğer /products/:id ye PUT isteği atarsa verdiği datayla birlikte
    //:id kısmına yazılan id'ye sahip olan product'u günceller
    // ör: PUT /products/5 { input }  5 id'li productu güncelle
    models.product
      .update(
        // PUT /products/:id -- :id değerine sahip product'ı güncelle
        {
          type: req.body.type,
          price: req.body.price,
          image_paths: req.body.image_paths,
          count: req.body.count,
          name: req.body.name,
          description: req.body.description,
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
    models.product
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
    models.product
      .findOne({
        where: { id: req.params.id }
      })
      .then(product => res.json(product));
  }
};
