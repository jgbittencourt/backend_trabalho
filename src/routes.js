const express = require('express');
const raizControllers = require('./controllers/raizControllers');
const userControllers = require('./controllers/userControllers');
const appointmentControllers = require('./controllers/appointmentControllers');
const chatControllers = require('./controllers/chatControllers');
const notificationControllers = require('./controllers/notificationControllers');
const reviewControllers = require('./controllers/reviewControllers');
const authorization = require('./middleware/authorization');

const routes = express.Router();

// Rotas públicas
routes.get('/', raizControllers.raiz);
routes.post('/user', userControllers.create);
routes.post('/userauth', userControllers.searcherUser);

// Rotas protegidas
routes.use(authorization);

// Rotas de usuário
routes.get('/user', userControllers.searchUsersAll);
routes.put('/user/:codcli', userControllers.updateClient);

// Rotas de agendamento
routes.post('/appointments', appointmentControllers.create);
routes.get('/appointments/:user_id', appointmentControllers.list);
routes.put('/appointments/:id', appointmentControllers.update);

// Rotas de chat
routes.post('/chat', chatControllers.create);
routes.get('/chat/:user_id/:doctor_id', chatControllers.list);
routes.get('/chat/conversations/:user_id', chatControllers.listConversations);

// Rotas de notificação
routes.post('/notifications', notificationControllers.create);
routes.get('/notifications/:user_id', notificationControllers.list);
routes.put('/notifications/:id/read', notificationControllers.markAsRead);

// Rotas de avaliação
routes.post('/reviews', reviewControllers.create);
routes.get('/reviews/:doctor_id', reviewControllers.list);
routes.get('/reviews/:doctor_id/rating', reviewControllers.getDoctorRating);

module.exports = routes;