import React from 'react'
import { Route,redirect } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
function PrivateRoute({ component: Component, ...rest }) {
    const { currentUser } = useAuth();
    return (
        <Route
            {...rest}
            render={props => {
                currentUser ? <Component{...props} />:<redirect to="/login"/>

            }}
            
        ></Route>
    )
}

export default PrivateRoute

{/* <Route exact path='/'
element={
  currentUser ? (<Homepage />) : (<Navigate replace to={'/login'} />)
} /> */}