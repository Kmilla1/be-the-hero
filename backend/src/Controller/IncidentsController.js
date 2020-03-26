const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        /* Paginação */
        const {page = 1} = request.query;
        
        // contando o total de casos registrados
        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id') // usado quando relacionar dados de duas tabelas
            .limit(5) // limite de 5
            .offset((page - 1) * 5) // quantos serão pulados, para pegar os proximos 5
            .select(['incidents.*',
                     'ongs.name',
                     'ongs.email', 
                     'ongs.whatsapp', 
                     'ongs.city', 
                     'ongs.uf']); // fazendo um select mais especifico de cada tabela
        
        /* adicionando o count como informação no header */    
        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);

        /* Listando Tudo!
        const incidents = await connection('incidents').select('*');
        return response.json(incidents);*/
    },

    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;
        

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({id});
        //request.headers = acessando o cabeçalho da requisição,
        //guarda informações do contexto da nossa requisição
    },

    async delete(request, response){
        const {id} = request.params;
        const ong_id = request.headers.authorization;

        const incidents = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();
        if(incidents.ong_id != ong_id){ // 401 = sem permisão
            return response.status(401).json({error: 'Operation not permitted.'});
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    }
}