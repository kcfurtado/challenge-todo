import React from 'react'

export default function Footer() {
    return (
        <footer className="dark:bg-gray-800 dark:text-gray-50">
            <div className="container flex flex-col p-4 mx-auto md:p-8 lg:flex-row divide-gray-400">
                <ul className="self-center py-6 space-y-4 text-center sm:flex sm:space-y-0 sm:justify-around sm:space-x-4 lg:flex-1 lg:justify-start">
                    <li>Bolttech Code Challenge &copy; All rights reserved</li>
                </ul>
                <div className="flex flex-col justify-center pt-6 lg:pt-0">
                    <div className="flex justify-center space-x-4">
                        Powered by:
                        <a rel="noopener noreferrer" href="https://github.com/kcfurtado" title="Instagram" className="flex items-center justify-center  dark:bg-violet-400 dark:text-gray-900">
                            Kelton Furtado
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
