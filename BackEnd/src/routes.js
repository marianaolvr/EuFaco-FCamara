const ClientController = require('./controllers/ClientController');
const ProviderController = require('./controllers/ProviderController');
const SessionController = require('./controllers/SessionController');

module.exports = function handleRoutes({ app, auth }) {
  app.post('/login', SessionController.login);

  //CLIENT\\
  app.post('/client', ClientController.create);
  app.get('/client', auth, ClientController.find);
  app.patch('/client', auth, ClientController.update);
  app.delete('/client', auth, ClientController.destroy);
  app.post('/client/budget', auth, ClientController.createBudgte);
  app.get('/client/rooms', auth, ClientController.findAllRooms);

  //PROVIDER\\
  app.post('/provider', ProviderController.create);
  app.get('/provider', auth, ProviderController.index);
  app.patch('/provider', auth, ProviderController.update);
  app.delete('/provider', auth, ProviderController.delete);
  app.post('/provider/categorie', auth, ProviderController.createCategory);
  app.get('/provider/categories', ProviderController.findAll);
  app.get('/provider/:id', ProviderController.findById);
  app.get('/budgets', auth, ProviderController.findAllBudgets);
  app.get('/rooms', auth, ProviderController.findAllRooms);

  return app;
};
