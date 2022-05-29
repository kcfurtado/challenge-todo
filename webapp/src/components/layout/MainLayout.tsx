import React from 'react';

// import { Container } from './styles';
import Navbar from './Navbar';
import Footer from './Footer';
import { ToastContainer } from 'react-toastify';

export default function MainLayout({ children }) {
    return <>
        <Navbar />
        <main className="dark:bg-gray-800 dark:text-cyan-50 w-full">
            <ToastContainer
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
            />
            <div>{children}</div>
        </main>
        <Footer />
    </>;
}