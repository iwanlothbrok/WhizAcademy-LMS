import React from 'react';
import { Link } from 'react-router-dom';

export default function OperationsCard({ cards }) {
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="grid grid-cols-2 m-6 sm:grid-cols-4 md:grid-cols-2 gap-2 text-textGreen">
                {cards.map(card => (
                    <Link key={card.id} to={card.link}>
                        <div className="border px-5 m-1 mb-2 p-8 rounded overflow-hidden flex flex-col items-center transform transition-transform duration-300 hover:scale-110 bg-black">
                            <img src={card.src} alt={card.information} loading="lazy" className="w-56 h-auto homeContainerImage" />
                            <h3 className="font-bold font-sans text-2xl mt-1">{card.information}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
