var models = require('../../models');
module.exports = {
    index(req, res) {
        models.transaction.findAll().then((transactions) => { // bütün transactionları veritabanından getir
            res.json(transactions);
        });
    },
    store(req, res) {
        models.transaction.create(
            { //Modeli kullanıcının verdiği parametrelere göre oluşturup database'e kaydet
                "external_data": req.body.external_data,
                "status": req.body.status,
            }).then((transaction) => res.json(transaction));
    },
    update(req, res) {
        //Kullanıcı eğer /transactions/:id ye PUT isteği atarsa verdiği datayla birlikte
        //:id kısmına yazılan id'ye sahip olan transaction'u günceller
        // ör: PUT /transactions/5 { input }  5 id'li transactionu güncelle
        models.transaction.update( // PUT /transactions/:id -- :id değerine sahip transaction'ı güncelle
            {
                "external_data": req.body.external_data,
                "status": req.body.status,
            },
            {
                where: { id: req.params.id, }, // WHERE id = :id (:id express tarafından sağlanır) 
            }
        ).then((updated) => {
            res.json(updated); //Etkilenen satırları return et
        });
    },
    delete(req, res) {

        models.transaction.destroy({
            where: {
                id: req.params.id
            }
        }).then(() => {
            res.send('');
            res.status(204).end();
        })
    },
    show(req, res) {
        models.transaction.findOne({
            where: { id: req.params.id },
        }).then(transaction => res.json(transaction));
    }
}