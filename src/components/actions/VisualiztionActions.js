import ActionTypes from './ActionTypes';
import axios from 'axios';

const getCountries = () => {
    return {
        type: ActionTypes.GET_COUNTRIES,
        payload: axios.get('http://localhost:3001/api/v1/countries')
    }
}

export default {
    getCountries,
}