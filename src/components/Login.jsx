import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import '../pages/LoginPage/LoginPage.css'
import loginImg from '../assets/img1.png'

function Login({ handle }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const { changeCurrentUserType } = useAuth
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setError('');
            setLoading(true);
            await login(email, password);
            // changeCurrentUserType();
            navigate('/');
        } catch {
            setError('Faild to login')
        }
        setLoading(false);
    }

    return (
        <div className="login-container">
            <img className='img-login' src={loginImg} alt="champions-img" />
            <h2>Welcome</h2>
            {error && <div>{error}</div>}
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label htmlFor="email">Email</label><br />
                    <input
                        type="email"
                        id='email'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label><br />
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

            <div>Need an account?<Link onClick={handle}>Sign Up</Link> </div>
        </div>
    )
}

export default Login