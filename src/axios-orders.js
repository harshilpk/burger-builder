import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-27356.firebaseio.com/'
});

export default instance;