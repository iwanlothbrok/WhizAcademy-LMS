import React from 'react';
import { Link } from 'react-router-dom';
import images from './database/images';

export default function ImageGrid() {
    console.log(images);

    return (
        <div className="w-screen  h-screen flex justify-center items-center">

            <div className="grid grid-cols-2 m-6 sm:grid-cols-4 md:grid-cols-3 gap-2  text-textGreen">
                {images.map(image => (
                    <div >

                        <div key={image.id} className="border px-5 m-1 mb-2 p-8 rounded overflow-hidden flex flex-col items-center homeContainer">
                            <Link to={image.link}>
                                <img src={image.src} alt={`Image ${image.id}`} className="w-56 h-auto homeContainerImage" />
                            </Link>
                            <h3 className='font-bold font-sans text-2xl mt-1'>{image.information}</h3>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};
