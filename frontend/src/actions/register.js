import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_SUCCESS, USER_LOADED } from "./types";



export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);

    }
    try {
        const res = await axios.get('http://localhost:5002/api/login');
        dispatch({
            type: USER_LOADED,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: AUTH_ERROR,
        });
    }


}



export const register = ({ name, email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',

        }
    }

    const body = JSON.stringify({ name, email, password });
    try {
        const res = await axios.post('http://localhost:5002/api/user', body, config);
        if (res.data.token) {
            localStorage.setItem('token', res.data.token);
        }
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())

        console.log(res.data, 'token');


    } catch (error) {
        const errors = error.response.data.errors;

        dispatch({
            type: REGISTER_FAILURE
        })

    }
}

export const login = ({ email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    const body = JSON.stringify({ email, password });

    try {
        // Log the payload to verify values
        console.log('Request payload:', { email, password });

        const res = await axios.post('http://localhost:5002/api/login', body, config);

        // Save token to localStorage
        if (res.data.token) {
            localStorage.setItem('token', res.data.token);
        }

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser())


        console.log('Token:', res.data.token);

        // Load user after login

    } catch (error) {
        console.error('Login error:', error.response);

        const errors = error.response?.data?.errors;

        // if (errors) {
        //     errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
        // }

        dispatch({
            type: LOGIN_FAIL
        });
    }
};

// LOGout // clear the profile

export const logout = () => dispatch => {
    dispatch({ type: LOGOUT })

}