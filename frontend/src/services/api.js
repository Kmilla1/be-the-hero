import axios from 'axios';

const api = axios.create({ /* base = padrão de url */
    baseURL: 'http://localhost:3333',
});

export default api;