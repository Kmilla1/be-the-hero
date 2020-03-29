const express = require('express');
const {celebrate, Segments, Joi} = require('celebrate');

const OngsController = require('./Controller/OngsController');
const IncidentsController = require('./Controller/IncidentsController');
const ProfileController = require('./Controller/ProfileController');
const SessionController = require('./Controller/SessionController');

const connection = require('./database/connection');

// Modulo de Rotas do express armazenado na variavel
const routes = express.Router();

routes.post('/sessions', SessionController.create)

routes.get('/ongs', OngsController.index); // listando ong
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), OngsController.create); // cadastrando ong

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}) ,ProfileController.index); // listar casos especificos de uma ong

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    }),
}) ,IncidentsController.index);

routes.post('/incidents', IncidentsController.create);

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}) ,IncidentsController.delete);

/*Validações: nas rotas de criação e de alteração. 
Joi: api de validação do javascript
O Celebrate faz a integração do joi com o express*/

// exportando a variavel routes para fora
module.exports = routes;