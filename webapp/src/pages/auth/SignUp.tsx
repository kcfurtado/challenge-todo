import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useAuth } from '../../lib/auth';

import { ToastContainer, toast } from 'react-toastify';

const SignUp: React.FC = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { signUp, errors, loading } = useAuth()

    const handleSignUp = () => {
        signUp(name, email, password)
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
            <div className="flex flex-col lg:w-1/3 md:w-1/3 max-w-md p-6 shadow-lg rounded-md bg-gray-100 sm:p-10 dark:bg-gray-800 dark:text-gray-100">
                <div className="mb-8 text-center">
                    <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
                    <p className="text-sm dark:text-gray-400">Create account now and enjoy it</p>
                </div>
                <form novalidate="" action="" className="space-y-12 ng-untouched ng-pristine ng-valid">
                    <div className="space-y-4">
                        <div>
                            <label for="name" className="block mb-2 text-sm">Name</label>
                            <input type="name" name="name" id="name" placeholder="Fabienne Andrade" className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" />
                        </div>
                        <div>
                            <label for="email" className="block mb-2 text-sm">Email</label>
                            <input type="email" name="email" id="email" placeholder="user@site.com" className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" />
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <label for="password" className="text-sm">Password</label>
                                <a rel="noopener noreferrer" href="#" className="text-xs hover:underline dark:text-gray-400">Forgot password?</a>
                            </div>
                            <input type="password" name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div>
                            <button type="button" className="w-full px-8 py-3 shadow hover:bg-violet-700 hover:text-white font-semibold rounded-md dark:bg-violet-400 dark:text-gray-900" onClick={handleSignUp}>Sign Un</button>
                        </div>
                        <p className="px-6 text-sm text-center dark:text-gray-400">Do you already have account?
                            <Link to={'/'} className='hover:underline dark:text-violet-400'> Sign In Here</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;