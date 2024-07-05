// src/components/ImageGrid.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const images = [
    { id: 1, src: 'https://wallsdesk.com/bmw-logo/', link: '/page1' },
    { id: 2, src: 'https://wallsdesk.com/bmw-logo/', link: '/page2' },
    { id: 3, src: 'https://wallsdesk.com/bmw-logo/', link: '/page3' },
    { id: 4, src: 'https://wallsdesk.com/bmw-logo/', link: '/page4' },
    { id: 5, src: 'https://wallsdesk.com/bmw-logo/', link: '/page5' },
    { id: 6, src: 'https://wallsdesk.com/bmw-logo/', link: '/page6' },
];

const ImageGrid = () => {
    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {images.map(image => (
                    <div key={image.id} className="border rounded overflow-hidden">
                        <Link to={image.link}>
                            <img src={image.src} alt={`Image ${image.id}`} className="w-full h-auto" />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageGrid;
