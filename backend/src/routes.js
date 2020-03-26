const express = require('express');

const OngsController = require('./Controller/OngsController');
const IncidentsController = require('./Controller/IncidentsController');
const ProfileController = require('./Controller/ProfileController');
const SessionController = require('./Controller/SessionController');

const connection = require('./database/connection');

// Modulo de Rotas do express armazenado na variavel
const routes = express.Router();

routes.post('/sessions', SessionController.create)

routes.get('/ongs', OngsController.index); // listando ong
routes.post('/ongs', OngsController.create); // cadastrando ong

routes.get('/profile', ProfileController.index); // listar casos especificos de uma ong

routes.get('/incidents', IncidentsController.index);
routes.post('/incidents', IncidentsController.create);
routes.delete('/incidents/:id', IncidentsController.delete);

// exportando a variavel routes para fora
module.exports = routes;