import React from 'react';
import { Link } from 'react-router-dom';

export default function OperationsCard({ cards, title }) {
    return (
        <div className="w-screen min-h-screen flex flex-col justify-center items-center p-4">
            <h2 className="text-3xl font-bold mb-6 text-center text-white">{title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 gap-4 text-textGreen">
                {cards.map(card => (
                    <Link key={card.id} to={card.link} className="flex justify-center">
                        <div className="border px-12 py-6 m-1 rounded overflow-hidden flex flex-col items-center transform transition-transform duration-300 hover:scale-110 bg-black w-full max-w-xs">
                            <img src={card.src} alt={card.information} loading="lazy" className="w-full h-auto homeContainerImage" />
                            <h3 className="font-bold font-sans text-xl sm:text-2xl mt-1 text-center">{card.information}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
