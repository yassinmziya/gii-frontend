import RankingsReducer from './RankingsReducer';
import VisualiztionReducer from './VisualizationReducer';
import {combineReducers} from 'redux';

export default combineReducers({
    rankings: RankingsReducer,
    visualization: VisualiztionReducer
})
