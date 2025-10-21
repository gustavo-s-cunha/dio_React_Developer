import axios from 'axios';

const api = axios.create({
    baseURL: `${process.env.REACT_APP_HOST || 'http://localhost'}:${process.env.REACT_APP_PORT || '8001'}`
});

export { api }