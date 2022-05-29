import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from '../../lib/auth';

const SignIn: React.FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { signIn, errors, loading } = useAuth()

    const handleSignIn = () => {
        signIn(email, password)
    }

    useEffect(() => {
        console.log('errors>', errors)
        if (errors !== null) {
            toast.error(errors[0], {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }, [errors])

    return (
        <div className='flex flex-col justify-center items-center w-screen h-screen bg-gray-200 dark:bg-gray-900'>
            <ToastContainer
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
            />
            <div className="flex flex-col lg:w-1/3 md:lg:w-1/3 max-w-md p-6 shadow-lg rounded-md bg-gray-100 sm:p-10 dark:bg-gray-800 dark:text-gray-100">
                <div className="mb-8 text-center">
                    <h1 className="my-3 text-4xl font-bold">Sign in</h1>
                    <p className="text-sm dark:text-gray-400">Sign in to access your account</p>
                </div>
                <form novalidate="" action="" className="space-y-12 ng-untouched ng-pristine ng-valid">
                    <div className="space-y-4">
                        <div>
                            <label for="email" className="block mb-2 text-sm">Email</label>
                            <input value={email} type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} placeholder="user@site.com" className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" />
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <label for="password" className="text-sm">Password</label>
                                <a rel="noopener noreferrer" href="#" className="text-xs hover:underline dark:text-gray-400">Forgot password?</a>
                            </div>
                            <input value={password} type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} placeholder="*****" className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div>
                            <button type="button" className="w-full px-8 py-3 shadow hover:bg-violet-700 hover:text-white font-semibold rounded-md dark:bg-violet-400 dark:text-gray-900" onClick={handleSignIn} >Sign In</button>
                        </div>
                        <p className="px-6 text-sm text-center dark:text-gray-400">Don't have an account yet?
                            <Link to={'/register'} className='hover:underline dark:text-violet-400'> Sign up </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignIn;