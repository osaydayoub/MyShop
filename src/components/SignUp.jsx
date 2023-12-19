import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { auth, db } from '../config/firebase';
import {getDocs,collection,addDoc} from 'firebase/firestore'



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
    const [selectedUserType, setSelectedUserType] = useState(options[0]);
    const usersCollectionRef=collection(db,'users')

    const handleChange = event => {
        setSelectedUserType(event.target.value);
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
            const myDocumentData = {
                userAuthId: auth.currentUser.uid,
                userName: userName,
                userType: selectedUserType
              };
            await addDoc(usersCollectionRef, myDocumentData);

            // handleUpdateUser();
            console.log('SignUp before navigate!')
            navigate('/login');

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
                    <select id='user-type' value={selectedUserType} onChange={handleChange}>
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