import axios from 'axios';

const instance = axios.create({
    baseURL: "https://my-burgerbuilder-react.firebaseio.com/"
})

export default instance;