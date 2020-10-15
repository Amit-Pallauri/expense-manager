import {combineReducers} from 'redux';
import expenseReducer from './reducers/expenseReducer'
import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
    userState : userReducer, 
    expenseState : expenseReducer
})

export default rootReducer;