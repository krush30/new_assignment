import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { createDashboard, updateDashboard, deleteDashboard } from '../actions/dashboard';
import { logout } from '../actions/register';

const Dashboard = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dashboards = useSelector((state) => state.dash.dashboards);

    const [formData, setFormData] = useState({
        name: '',
        dateOfBirth: '',
    });
    const [editMode, setEditMode] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    const { name, dateOfBirth } = formData;

    useEffect(() => {
        // Optional: Fetch existing dashboards here if needed
    }, []);

    // Age calculation function
    const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const diff = Date.now() - birthDate.getTime();
        const ageDate = new Date(diff);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    };

    if (!isAuthenticated) {
        return <Navigate to="/register" />;
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Calculate age before sending to backend
        const age = calculateAge(dateOfBirth);
        const dataToSubmit = { ...formData, age };

        if (editMode) {
            dispatch(updateDashboard(currentId, dataToSubmit));
            setEditMode(false);
        } else {
            dispatch(createDashboard(dataToSubmit));
        }
        setFormData({ name: '', dateOfBirth: '' });
    };

    const handleEdit = (id, existingData) => {
        setEditMode(true);
        setCurrentId(id);
        setFormData(existingData);
    };

    const handleDelete = (id) => {
        dispatch(deleteDashboard(id));
    };

    const handleLogout = () => {
        dispatch(logout()); // Dispatch the logout action
    };

    return (
        <div className="container">
            <h1 className="dashboard-title">Dashboard</h1>

            {/* Logout Button */}
            <button onClick={handleLogout} className="logout-button">
                Logout
            </button>

            {/* Dashboard Form */}
            <form onSubmit={handleSubmit} className="dashboard-form">
                <div className="form-group">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
                    <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={dateOfBirth}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </div>
                <button type="submit" className="form-button">
                    {editMode ? 'Update' : 'Add'} Dashboard
                </button>
            </form>

            {/* Dashboard List */}
            <div className="dashboard-list">
                {dashboards.map((dashboard) => (
                    <div key={dashboard._id} className="dashboard-item">
                        <div className="item-content">
                            <p className="item-name">{dashboard.name}</p>
                            <p className="item-dob">Date of Birth: {dashboard.dateOfBirth}</p>
                            <p className="item-age">Age: {dashboard.age}</p>
                        </div>
                        <div className="item-actions">
                            <button
                                onClick={() =>
                                    handleEdit(dashboard._id, {
                                        name: dashboard.name,
                                        dateOfBirth: dashboard.dateOfBirth,
                                    })
                                }
                                className="item-button edit-button"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(dashboard._id)}
                                className="item-button delete-button"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
