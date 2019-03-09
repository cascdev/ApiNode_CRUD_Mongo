const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// Configurações do mongoose
// useFindAndModify: false serve para alguns verbos depreciados como findByIdAndUpdate
const OPTIONS = { useNewUrlParser: true, useFindAndModify: false}


const app = express()

// Configurações do Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const dbConfig = require('./app/config/mongodb.config')

mongoose.Promise = global.Promise
// Connecting to the database
mongoose.connect(dbConfig.url, OPTIONS)
.then(() => {
    console.log("Conectado com sucesso ao MongoDB.")
}).catch(err => {
    console.log('O MongoDB não foi conectado.', err)
    process.exit()
})
 
//Declara e registra rotas num só passo - menos verboso
require('./app/routes/customer.routes')(app) 

// Cria um servidor
app.listen(3000, () => {
  console.log('App ouvindo a porta 3000')
})
