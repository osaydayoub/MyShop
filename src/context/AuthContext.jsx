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
        console.log('hello from updateUser');
        return updateProfile(auth.currentUser,newData);
    }
    useEffect(() => {
        const unSubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
            console.log('onAuthStateChanged');
            console.log(user);
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
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
