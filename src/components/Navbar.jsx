import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 text-white p-4">
            <ul className="flex justify-center space-x-4">
                <li>
                    <Link to="/" className="hover:text-blue-300">Home</Link>
                </li>
                <li>
                    <Link to="/cards" className="hover:text-blue-300">Cards</Link>
                </li>
                <li>
                    <Link to="/contact" className="hover:text-blue-300">Contact</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
