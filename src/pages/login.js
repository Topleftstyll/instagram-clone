import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';

const Login = () => {
    const history = useHistory();
    const { firebase } = useContext(FirebaseContext);

    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const isInvalied = password === '' || emailAddress === '';

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
            history.push(ROUTES.DASHBOARD);
        } catch (error) {
            setEmailAddress('');
            setPassword('');
            setError(error.message);
        }
    }

    useEffect(() => {
        document.title = 'Login - Instagram';
    }, []);

    return (
        <div className="container flex flex-col lg:flex-row mx-auto max-w-screen-md items-center h-screen px-4 lg:px-0">
            <div className="hidden lg:visible lg:flex w-5/5 lg:w-3/5">
                <img src="images/iphone-with-profile.jpg" alt="iPhone with Instagram app"/>
            </div>

            <div className="flex flex-col w-full lg:w-2/5 justify-center h-full max-w-md m-auto" >
                <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
                    <h1 className="flex justify-center w-full text-4xl mb-5">Insta Clone</h1>
                    <p className="text-sm mb-3 text-red-primary">This is an instagram clone website.</p>
                    {error && <p data-testid="error" className="mb-4 text-xs text-red-primary">{error}</p>}

                    <form onSubmit={handleLogin} method="POST" data-testid="login">
                        <input aria-label="Enter your email address" type="text" placeholder="Email Address" onChange={({ target}) => setEmailAddress(target.value)} value={emailAddress}
                        className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2" />

                        <input aria-label="Enter your password" type="password" placeholder="Password" onChange={({ target}) => setPassword(target.value)} value={password}
                        className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2" />

                        <button disabled={isInvalied} type="submit" 
                        className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${isInvalied && 'opacity-50'}`}>
                            Login
                        </button>
                    </form>
                </div>

                <div className="flex justify-center items-center flex-col rounded w-full bg-white p-4 border border-gray-primary">
                    <p className="text-sm">Don&apos;t have an account?{` `}
                        <Link to={ROUTES.SIGN_UP} className="font-bold text-blue-medium" data-testid="sign-up">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;