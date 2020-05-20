import { GET_USERS, LOADING, DELETE_USER, ADD_USER } from './types';
import Axios from 'axios';

export const getUsers = () => dispatch => {
    dispatch(loading());
    Axios.get('/api/users').then(res =>
        dispatch({
            type: GET_USERS,
            payload: res.data
        })
    );
};

export const loading = () => dispatch => {
    dispatch({
        type: LOADING
    });
};

export const deleteUser = _id => dispatch => {
    Axios.delete(`/api/users/${_id}`).then(
        dispatch({
            type: DELETE_USER,
            payload: _id
        })
    );
};

export const addUser = user => dispatch => {
    Axios.post('/api/users', user).then(res =>
        dispatch({
            type: ADD_USER,
            payload: res.data
        })
    );
};
