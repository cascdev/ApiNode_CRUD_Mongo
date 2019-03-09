module.exports = function(app) {
 
    const customers = require('../controllers/customer.controller')
 
    // Cria um novo usuario
    app.post('/customers', customers.create)
 
    // Recupera todos os Customers
    app.get('/customers', customers.findAll)
 
    // Recupera um Customer único quando passado seu Id
    app.get('/customers/:customerId', customers.findOne)
 
    // Atualiza um Customer quando passado seu Id
    // O metodo PATCH é mais adequado , neste caso para usar o findByIdAndUpdate() no controller
    app.patch('/customers/:customerId', customers.update)    
 
    // Deleta um determinado Customer quando passado seu Id
    app.delete('/customers/:customerId', customers.delete)
}