import RankingsReducer from './RankingsReducer';
import VisualiztionReducer from './VisualizationReducer';
import ReportReducer from './ReportReducer';
import {combineReducers} from 'redux';

export default combineReducers({
    rankings: RankingsReducer,
    visualization: VisualiztionReducer,
    report: ReportReducer
})
