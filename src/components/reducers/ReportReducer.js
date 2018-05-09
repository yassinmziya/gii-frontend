import ActionTypes from '../actions/ActionTypes';

var init = {
    year: '2017',
    summary: null,
    geographyObject: null,
    data: {}
}

const reportReducer = (state=init, action) => {
    var nextState = {...state};
    switch (action.type) {
        case ActionTypes.SUMMARY+'_FULFILLED':
            nextState.summary = action.payload.data;
            break;

        case ActionTypes.GEOGRAPHY:
            nextState.geographyObject = action.payload;
            break;
    
        default:
            return nextState;
    }
    return nextState;
}

export default reportReducer;