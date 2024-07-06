import React, { useState } from 'react';

const AddMentor = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const mentor = { name, email, password };

        try {
            const response = await fetch('https://your-api-url.com/api/mentors', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(mentor),
            });

            if (!response.ok) {
                alert('Something went wrong');
                return;
            }

            alert('Mentor added successfully');
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to add mentor');
        }
    };

    return (
        <div className="w-screen  h-screen flex justify-center items-center m-a ">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-green-500">Добави Ментор</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor='name' className="block text-gray-700">Две Имена</label>
                        <input
                            id='name'
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor='email' className="block text-gray-700">Имейл</label>
                        <input
                            id='email'
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 text-border border-gray-300 rounded mt-1 bg-black text-white focus:bg-black focus:text-white"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor='password' className="block text-gray-700">Парола</label>
                        <input
                            id='password'
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-700  transform transition-transform duration-300 hover:scale-105"
                    >
                        ДОБАВИ
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddMentor;
