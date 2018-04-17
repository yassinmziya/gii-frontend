import ActionTypes from '../actions/ActionTypes';
import ChartTypes from '../common/ChartTypes';

var init = {
    year: '2017',
    countryOpts: [],
    chartType: ""
}

const visualiztionReducer = (state=init, action) => {
    var nextState= {...state}
    switch (action.type) {
        case ActionTypes.GET_COUNTRIES+"_FULFILLED":
            var countries = action.payload.data.countries;
            console.log(countries)
            nextState.countryOpts = countries.map((x) => {
                return { key: x.iso3, value: x.iso3, text: x.country }
            })
            break;
    }
    return nextState;
}

export default visualiztionReducer;