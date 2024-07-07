import React from 'react';
import logo from '../assets/images/logo.png';
import { Link } from 'react-router-dom';

export default function Navigation() {
    return (
        <nav className="flex items-center justify-center flex-wrap bg-teal-500 p-2">
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
