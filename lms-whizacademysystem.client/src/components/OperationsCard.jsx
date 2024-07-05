import React from 'react';
import { Link } from 'react-router-dom';

export default function OperationsCard({cards}) {

    console.log(cards);
    return (
        <div className="w-screen  h-screen flex justify-center items-center">

            <div className="grid grid-cols-2 m-6 sm:grid-cols-4 md:grid-cols-2 gap-2  text-textGreen">
                {cards.map(x => (
                    <div >

                        <div key={x.id} className="border px-5 m-1 mb-2 p-8 rounded overflow-hidden flex flex-col items-center homeContainer">
                            <Link to={x.link}>
                                <img src={x.src} alt={`Image ${x.id}`} className="w-56 h-auto homeContainerImage" />
                            </Link>
                            <h3 className='font-bold font-sans text-2xl mt-1'>{x.information}</h3>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}
