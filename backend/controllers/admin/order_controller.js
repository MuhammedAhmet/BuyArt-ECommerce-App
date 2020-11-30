var models = require("../../models");
module.exports = {
  index(req, res) {
    models.order
      .findAll({
        include: ["product"]
      })
      .then(orders => {
        // bütün orderları veritabanından getir
        res.json(orders);
      });
  },
  store(req, res) {
    models.order
      .create({
        //Modeli kullanıcının verdiği parametrelere göre oluşturup database'e kaydet

        product_id: req.body.product_id,
        order_status: req.body.order_status,
        city: req.body.city,
        phone: req.body.phone,
        address: req.body.address
      })
      .then(order => res.json(order));
  },
  update(req, res) {
    //Kullanıcı eğer /orders/:id ye PUT isteği atarsa verdiği datayla birlikte
    //:id kısmına yazılan id'ye sahip olan order'u günceller
    // ör: PUT /orders/5 { input }  5 id'li orderu güncelle
    models.order
      .update(
        // PUT /orders/:id -- :id değerine sahip order'ı güncelle
        {
          product_id: req.body.product_id,
          order_status: req.body.order_status,
          city: req.body.city,
          phone: req.body.phone,
          address: req.body.address
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
    models.order
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
    models.order
      .findOne({
        where: { id: req.params.id }
      })
      .then(order => res.json(order));
  }
};
