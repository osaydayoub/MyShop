import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setError('');
            setLoading(true);
            await login(email, password);
            navigate('/');
        } catch {
            setError('Faild to login')
        }
        setLoading(false);
    }

    return (
        <div className="LogIn-container">
            <h2>Log In</h2>
            {error && <div>{error}</div>}
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label htmlFor="email">Email:</label><br />
                    <input
                        type="email"
                        id='email'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label><br />
                    <input
                        type='password'
                        id='password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>


                <div>
                    <button disabled={loading} type='submit'>Login</button>
                </div>
            </form>

            <div>Need an account?<Link to='/signup'>Sign Up</Link> </div>
        </div>
    )
}

export default Login