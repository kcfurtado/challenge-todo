import React from 'react';
import { Routes, Route } from 'react-router-dom'

import App from '../App';
import { useAuth } from "../lib/auth";

import SignIn from '../pages/auth/SignIn'
import SignUp from '../pages/auth/SignUp'

const CustomRoutes: React.FC = () => {
    const { user } = useAuth()

    if (user) {
        return (<App />)
    } else {
        return (
            <Routes>
                <Route path='/register' element={<SignUp />} ></Route>
                <Route path='*' element={<SignIn />} />
            </Routes>
        )
    }
}
export default CustomRoutes;