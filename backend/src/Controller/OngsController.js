//const crypto = require('crypto'); crypto.randomBytes(4).toString('HEX');
const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },

    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;
    
        const id = generateUniqueId();
    
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        });
    
        return response.json({ id });
        /*const body = request.body;
        console.log(body);*/
        
        /*const params = request.params;
        console.log(params);*/
    
        /*const params = request.query; (Query Params)
        console.log(params);
        http://localhost:3333/users?name=Camilinha&idade=20*/
    
        /*return response.send('Hello World');*/
    }
}