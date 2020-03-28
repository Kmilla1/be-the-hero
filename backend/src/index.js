/*importando o modulo express pra dentro da variavel express*/
const express = require('express');
/* importando o arquivo routes */
const routes = require('./routes');

const cors = require('cors');

/* instanciando a aplicação */
const app = express();

// Cors é para segurança, identificar qual endereço que pode acessar a aplicação
// usasse cors({origin: 'http://pipipopo.com'})
app.use(cors()); 
/* informar o express que usaremos o json para o corpo das requisições */
app.use(express.json());
app.use(routes);
/**
 * app.'get' -> get referece ao metodo HTTP get
 * GET: busca uma informação do back-end 
 *      (Rotas são pegas pelo metodo get por default)
 * POST: Criar uma informação no back-end
 * PUT: Alterar uma informação no back-end
 * DELETE: Deletar uma informação no back-end
 */

/**
 * Tipos de parâmetros
 * Query Params: Parametros nomeados enviados na rota após o "?"
 * Route Params: Parametros utilizados para identificar recursos (/users/:id)
 * Request Body: Corpo da requisição, utilizado para criar ou alterar recursos
 */

/**
 * SQL: MySQL, SQLite, PostgreSQL, Oracle...
 * NoSQL: MongoDB, ...
 * */
/**
 * Driver: SELECT * FROM users
 * Query Builder: table('users').select('*').where()  (escrever isso ->[SELECT * FROM users] em java script)
 *  */ 

/* aplciação escute a porta 3333. Essa porta foi usada por padrão para node */
app.listen(3333); 