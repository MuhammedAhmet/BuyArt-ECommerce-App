const express = require('express') // Expressi include et
const app = express() // Express instance oluştur
const port = 3000
const bodyParser = require('body-parser')
const models = require('./models');
var cors = require('cors')

const routers = require('./routes');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/", routers);


models.sequelize.sync().then(() => {
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
})