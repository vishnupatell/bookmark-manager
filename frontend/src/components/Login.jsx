import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [empty, setEmpty] = useState(false);

    const submitButton = async () => {
        try {
            if (username === '' || password === '') {
                setEmpty(true);
                return;
            }
            setEmpty(false);
            const submit = await axios.post('http://localhost:3000/login', {
                userName: username,
                password: password,
            });
            const token = submit.data.token;
            localStorage.setItem('jwtToken', token);
            const message = submit.data.message;
            alert(message);
            setUsername('');
            setPassword('');
        } catch (error) {
            if (error.response && error.response.data) {
                alert('Error in Login: ' + error.response.data.message);
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 to-indigo-950">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Welcome Back</h2>
                <p className="text-gray-500 text-center mb-6">Log in to your account</p>
                <div className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    {empty && (
                        <p className="text-sm text-red-500">Username or password cannot be empty</p>
                    )}
                    <button
                        onClick={submitButton}
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-md shadow-lg transition duration-300"
                    >
                        Log In
                    </button>
                </div>
                <p className="text-sm text-gray-500 mt-4 text-center">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-blue-500 hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
