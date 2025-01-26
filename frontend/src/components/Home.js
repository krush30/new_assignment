import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="home-container">
            <div className="content">
                <h1>Welcome to Our Platform</h1>
                <p>Please choose an option to get started.</p>
                <div className="button-group">
                    <Link to="/register" className="btn">
                        Register
                    </Link>
                    <Link to="/login" className="btn">
                        Login
                    </Link>
                    <Link to="/dashboard" className="btn">
                        Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
