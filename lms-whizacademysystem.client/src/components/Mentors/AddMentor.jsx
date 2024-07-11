import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddMentor = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // Loading state
    const [alert, setAlert] = useState(null); // State to manage alerts

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const mentor = { Name: name, Email: email, Password: password };

        try {
            const response = await fetch('https://localhost:44357/api/mentors/add/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(mentor),
            });

            if (!response.ok) {
                const errorText = await response.text();
                showAlert('Failed to add mentor', 'Be Warned', 'orange');
                return;
                // ТОДО
            }

            showAlert('Mentor added successfully', 'Success', 'green');

            resetForm();
            setTimeout(() => {
                navigate("/");
            }, 1000);
        } catch (error) {
            console.error('Error:', error);
            showAlert('Failed to add mentor', 'Be Warned', 'orange');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setName('');
        setEmail('');
        setPassword('');
    };


    const showAlert = (message, title, color) => {
        setAlert({ message, title, color });
        setTimeout(() => {
            setAlert(null);
        }, 4000); // Hide alert after 3 seconds
    };

    return (
        <div className="w-screen h-screen flex justify-center items-center p-3">
            {alert && (
                <div className={`absolute bg-${alert.color}-100 top-0 left-1/2 transform -translate-x-1/2 border-l-4 border-${alert.color}-500 text-${alert.color}-700 p-4 mb-4`} role="alert">
                    <p className="font-bold">{alert.title}</p>
                    <p>{alert.message}</p>
                </div>
            )}
            {/* {alert && (
                <div className={`absolute bg-${alert.color}-100 top-0 left-1/2 transform -translate-x-1/2 border-l-4 border-${alert.color}-500 text-${alert.color}-700 p-4 mb-4`} role="alert">
                    <p className="font-bold">{alert.title}</p>
                    <p>{alert.message}</p>
                </div>
            )} */}
            <div className="bg-white px-8 py-10 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-green-600">Добави Ментор</h2>
                <form className="text-lg" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700">Две Имена</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border bg-black text-white border-gray-300 rounded mt-1"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Имейл</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border bg-black text-white border-gray-300 rounded mt-1"
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password" className="block text-gray-700">Парола</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border bg-black text-white border-gray-300 rounded mt-1"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full p-2 rounded transform transition-transform duration-300 ${loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-800 hover:scale-105'}`}
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'ДОБАВИ'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddMentor;
