import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


function SignUp() {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const { signUp, updateUser } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const options = [
        'Customer',
        'Store',
        'Delivery'
    ];
    const [selectedUser, setSelectedUser] = useState(options[0]);


    const handleChange = event => {
        setSelectedUser(event.target.value);
    };

    async function handleSubmit(e) {
        e.preventDefault();
        if (password !== passwordConfirm) {
            return setError('Passwords do not match')
        }
        try {
            setError('');
            setLoading(true);
            await signUp(email, password);
            const update = {
                displayName: userName
            };
            await updateUser(update);

            // handleUpdateUser();
            navigate('/');

        } catch {
            setError('Faild to creat an account')
        }
        setLoading(false);
        console.log('SignUp completed!')
    }

    return (
        <div className="SignUp-container">
            <h2>Sign Up</h2>
            {error && <div>{error}</div>}
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label htmlFor="name">Name:</label><br />
                    <input
                        type="text"
                        id='name'
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>
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
                    <label htmlFor="password-Conform">Password Conformation:</label><br />
                    <input
                        type='password'
                        id='password-Conform'
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="user-type">User Type:</label><br />
                    <select id='user-type' value={selectedUser} onChange={handleChange}>
                        {options.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <button disabled={loading} type='submit'>Sign Up</button>
                </div>
            </form>

            <div>Already have an account?<Link to='/login'>Log In</Link> </div>
        </div>
    )
}

export default SignUp