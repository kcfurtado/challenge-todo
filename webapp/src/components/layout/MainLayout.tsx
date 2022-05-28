import React from 'react';

// import { Container } from './styles';
import Navbar from './Navbar';
import Footer from './Footer';

export default function MainLayout({ children }) {
    return <>
        <Navbar />
        <main className="dark:bg-gray-800 dark:text-cyan-50 w-full">
            <div>{children}</div>
        </main>
        <Footer />
    </>;
}