import React from 'react';
import logo from '../assets/images/logo.png';
import { Link } from 'react-router-dom';

export default function Navigation() {
    return (
        <nav className="fixed top-0 w-full flex items-center justify-center flex-wrap   p-2 z-50">
            <div className="flex items-center flex-shrink-0 text-white">
                <button>
                    <Link to='/'>
                        <img className='h-24 w-auto mx-auto transform transition-transform duration-500 hover:scale-125' src={logo} alt="Logo" />
                    </Link>
                </button>
            </div>
        </nav>
    );
}
