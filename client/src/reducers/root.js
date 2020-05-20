import { combineReducers } from 'redux';
import usersReducer from './usersReducer';

const rootReducer = combineReducers({ userState: usersReducer });

export default rootReducer;
