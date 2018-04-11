import axios from 'axios';
import ActionTypes from './ActionTypes';

const getData = (year) => {
    return {
        type: ActionTypes.GET_DATA,
        payload: axios.get(`http://localhost:3001/api/v1/data/${year}`)
    }
        
}

const setYear = (year) => {
    console.log(year)
    return {
        type: ActionTypes.SET_YEAR,
        payload: year
    }
}

export default {
    getData,
    setYear,
}