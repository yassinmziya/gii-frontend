import axios from 'axios';
import ActionTypes from './ActionTypes';

const getData = (year) => {
    return {
        type: ActionTypes.GET_DATA,
        payload: axios.all([
            axios.get(`http://localhost:3001/api/v1/data/${year}`),
            axios.get(`http://localhost:3001/api/v1/categories/${year}`),
        ])
    }
        
}

const setYear = (year) => {
    return {
        type: ActionTypes.SET_YEAR,
        payload: year
    }
}

const setIndicator = (indicator) => {
    return{
        type: ActionTypes.SET_INDICATOR,
        payload: indicator
    }
}

export default {
    getData,
    setYear,
    setIndicator,
}