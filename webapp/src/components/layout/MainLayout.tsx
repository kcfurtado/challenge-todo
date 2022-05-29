import React from 'react';

// import { Container } from './styles';
import Navbar from './Navbar';
import Footer from './Footer';
import { ToastContainer } from 'react-toastify';

export default function MainLayout({ children }) {
    return <>
        <Navbar />
        <main className="container w-full mx-auto dark:bg-gray-800 dark:text-cyan-50 pb-7">
            <ToastContainer
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
            />
            <div className="w-full">{children}</div>
        </main>
        <Footer />
    </>;
}