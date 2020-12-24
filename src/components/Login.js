import React from 'react';
import '../css/login.css'
import { Button } from '@material-ui/core';
import { auth, provider } from '../firebase'
import { useStateValue } from '../StateProvider'
import { actionTypes } from '../reducer';

const Login = () => {

    const [{ }, dispatch] = useStateValue()

    const signIn = () => {
        auth.signInWithPopup(provider)
            .then(result => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user
                })
            })
            .catch(err => alert(err.message))
    }

    return (
        <div className="login">
            <div className="login__container">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGHahBmcITh1JhwA947O4R_AbpDFX1LovVtw&usqp=CAU" alt="" />
                <div className="login__text">
                    <h3>Sign in to WhatsApp</h3>
                </div>

                <Button type="Submit" onClick={signIn}>
                    Sign In With Google
                </Button>
            </div>
        </div>
    );
}

export default Login;
