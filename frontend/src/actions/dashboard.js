import axios from "axios";
import {
    DASHBOARD_CREATE_SUCCESS,
    DASHBOARD_CREATE_FAILURE,
    DASHBOARD_UPDATE_SUCCESS,
    DASHBOARD_UPDATE_FAILURE,
    DASHBOARD_DELETE_SUCCESS,
    DASHBOARD_DELETE_FAILURE
} from "./types";

// Create a dashboard entry
export const createDashboard = ({ name, dateOfBirth, age }) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const body = JSON.stringify({ name, dateOfBirth, age }); // Ensure age is included

    try {
        const res = await axios.post("http://localhost:5002/api/dashboard", body, config);
        dispatch({
            type: DASHBOARD_CREATE_SUCCESS,
            payload: res.data,
        });
    } catch (error) {
        const errors = error.response?.data?.errors;
        console.error(errors);

        dispatch({
            type: DASHBOARD_CREATE_FAILURE,
        });
    }
};


// Update a dashboard entry
export const updateDashboard = (id, { name, dateOfBirth }) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const body = JSON.stringify({ name, dateOfBirth });

    try {
        const res = await axios.put(`http://localhost:5002/api/dashboard/${id}`, body, config);
        dispatch({
            type: DASHBOARD_UPDATE_SUCCESS,
            payload: res.data,
        });
    } catch (error) {
        const errors = error.response?.data?.errors;
        console.error(errors);

        dispatch({
            type: DASHBOARD_UPDATE_FAILURE,
        });
    }
};

// Delete a dashboard entry
export const deleteDashboard = (id) => async (dispatch) => {
    try {
        await axios.delete(`http://localhost:5002/api/dashboard/${id}`);
        dispatch({
            type: DASHBOARD_DELETE_SUCCESS,
            payload: id,
        });
    } catch (error) {
        console.error(error.message);
        dispatch({
            type: DASHBOARD_DELETE_FAILURE,
        });
    }
};
