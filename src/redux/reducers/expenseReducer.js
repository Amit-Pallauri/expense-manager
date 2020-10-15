import {
    CATEGORIES, 
    EXPENSE_DETAILS,
    EXPENSE_LOADER 
} from '../actionTypes/expenseActionTypes';

const initialState = {
    expenses : '',
    categories : '',
    loader : false
}

const expenseReducer = (state = initialState, action) => {
    const {
        type,
        payload
    } = action;

    switch (type) {
        case EXPENSE_DETAILS:
            return {
                ...state, expenses: payload
            }

        case CATEGORIES:
            console.log(payload)
            return {
                ...state, categories: payload.categories
            }

        case EXPENSE_LOADER:
            return{
                ...state, loader : payload
            }

        default:
            return state;
    }
}

export default expenseReducer;
