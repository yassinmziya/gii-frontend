import ActionTypes from '../actions/ActionTypes';

var init = {
    data: [],
    allIndicators: [],
    indicator: 'GII',
    year: '2017',
}

const rankingsReducer = (state=init, action) => {
    var nextState = {...state};

    switch (action.type) {
        case ActionTypes.GET_DATA + '_FULFILLED':
            nextState.data = action.payload[0].data;
            nextState.allIndicators = action.payload[1].data;
            break;

        case ActionTypes.SET_INDICATOR:
            nextState.indicator = action.payload;
            break;
    
        case ActionTypes.SET_YEAR:
            nextState.year = action.payload.data
            break;

        default:
            return nextState;
    }
    return nextState;
}

export default rankingsReducer;