import axios from 'axios';

// Importing axios, my URL where I make requests on the back end.
const api = axios.create({
    baseURL: 'https://localhost:44335'
})

export default api;