import ActionTypes from '../actions/ActionTypes'

var init = {
    data: [],
    indicator: 'GII',
    year: '2013',
}

const rankingsReducer = (state=init, action) => {
    var nextState = {...state};

    switch (action.type) {
        case ActionTypes.GET_DATA + "_FULFILLED":
        
            nextState.data = action.payload.data
            break;
    
        case ActionTypes.SET_YEAR:
            nextState.year = action.payload.data
            break;
    }
    return nextState
}

export default rankingsReducer;