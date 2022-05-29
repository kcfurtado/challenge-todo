import React from 'react'
import { useAuth } from '../../lib/auth'

export default function Navbar() {
    const { user, signOut } = useAuth()

    return (
        <header className="p-4 dark:bg-gray-800 dark:text-gray-100">

            <title>TODO PROJECTS</title>

            <div className="container flex justify-between h-16 mx-auto">
                <a rel="noopener noreferrer" href="#" aria-label="Back to homepage" className="flex items-center p-2 text-4xl">
                    Task Manager
                </a>

                <div className="items-center flex-shrink-0 hidden lg:flex">
                    <span className='mx-2'>{user?.name}</span>

                    {
                        user && (
                            <button className="self-center px-8 py-3 font-semibold rounded dark:bg-red-400 dark:text-gray-900" onClick={signOut}>Sign up</button>
                        )
                    }

                </div>
            </div>
        </header>
    )
}
