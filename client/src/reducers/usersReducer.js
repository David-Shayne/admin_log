import { GET_USERS, LOADING, DELETE_USER, ADD_USER } from '../actions/types';

const initialState = {
    users: [],
    loading: false
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                loading: true
            };

        case GET_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false
            };

        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(user => user._id !== action.payload)
            };

        case ADD_USER:
            return {
                ...state,
                users: [...state.users, action.payload]
            };
        default:
            return state;
    }
};

export default usersReducer;
