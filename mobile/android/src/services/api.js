import axios from 'axios';

const api = axios.create({
    baseURL: 'https://megahack-locdown.herokuapp.com',
})

export default api;