import axios from 'axios';
import ActionTypes from './ActionTypes';

const summarize = (iso3, year) => {
    return {
        type: ActionTypes.SUMMARY,
        payload: axios.get(`http://localhost:3001/api/v1/data/summary/${iso3}/${year}`)
    }
}

const setGeo = (geography) => {
    return {
        type: ActionTypes.GEOGRAPHY,
        payload: geography
    }
}

export default {
    summarize,
    setGeo
}