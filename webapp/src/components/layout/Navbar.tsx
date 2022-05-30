import { useAuth } from '../../lib/auth'
import { FiLogOut } from 'react-icons/fi';

export default function Navbar() {
    const { user, signOut } = useAuth()

    return (
        <header className="p-4 dark:bg-gray-800 dark:text-gray-100 shadow">

            <title>TODO PROJECTS</title>

            <div className="container flex justify-between h-16 mx-auto">
                <a rel="noopener noreferrer" href="#" aria-label="Back to homepage" className="flex items-center p-2 text-2xl">
                    Task Manager
                </a>

                <div className="items-center flex-shrink-0 hidden lg:flex">
                    <span className='mx-2'>{user?.name}</span>

                    {
                        user && (
                            <button type="button" className="flex border-2 rounded  flex-row items-center px-3 py-2" onClick={signOut}><FiLogOut /></button>
                        )
                    }

                </div>
            </div>
        </header>
    )
}
