import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../config/firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut ,updateProfile } from 'firebase/auth';

export const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true);

    function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }
    function logout() {
        return signOut(auth);
    }
    function updateUser(newData){
        return updateProfile(auth.currentUser,newData);
    }
    useEffect(() => {
        const unSubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        })
        return unSubscribe;
    }, [])

    const value = {
        currentUser,
        login,
        signUp,
        logout,
        updateUser
    }
    return (
        //add loading spinner
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
