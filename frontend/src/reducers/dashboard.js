import {
    DASHBOARD_CREATE_SUCCESS,
    DASHBOARD_CREATE_FAILURE,
    DASHBOARD_UPDATE_SUCCESS,
    DASHBOARD_UPDATE_FAILURE,
    DASHBOARD_DELETE_SUCCESS,
    DASHBOARD_DELETE_FAILURE,
} from "../actions/types";

const initialState = {
    dashboards: [],
    loading: true,
    error: null,
};

const dashboardReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case DASHBOARD_CREATE_SUCCESS:
            return {
                ...state,
                dashboards: [...state.dashboards, payload],
                loading: false,
            };
        case DASHBOARD_UPDATE_SUCCESS:
            return {
                ...state,
                dashboards: state.dashboards.map((dashboard) =>
                    dashboard._id === payload._id ? payload : dashboard
                ),
                loading: false,
            };
        case DASHBOARD_DELETE_SUCCESS:
            return {
                ...state,
                dashboards: state.dashboards.filter((dashboard) => dashboard._id !== payload),
                loading: false,
            };
        case DASHBOARD_CREATE_FAILURE:
        case DASHBOARD_UPDATE_FAILURE:
        case DASHBOARD_DELETE_FAILURE:
            return {
                ...state,
                error: payload,
                loading: false,
            };
        default:
            return state;
    }
};

export default dashboardReducer;
