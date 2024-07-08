import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditMentor() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // Loading state
    const [alert, setAlert] = useState(null); // State to manage alerts
    const navigate = useNavigate();
    const { id } = useParams(); // Get the mentor ID from the URL

    useEffect(() => {
        const fetchMentor = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://localhost:44357/api/mentors/${id}`);
                if (!response.ok) {
                    showAlert('Failed to fetch mentor', 'Be Warned', 'red');
                    return;
                }

                const mentor = await response.json();
                setName(mentor.name);
                setEmail(mentor.email);
                setPassword(''); // Do not populate the password field for security reasons
            } catch (error) {
                console.error('Error:', error);
                showAlert('An error occurred while fetching mentor details.', 'Be Warned', 'orange');
            } finally {
                setLoading(false);
            }
        };

        fetchMentor();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);

        const mentor = { Id: id, Name: name, Email: email, Password: password };
        try {
            const response = await fetch('https://localhost:44357/api/mentors/edit', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(mentor),
            });

            if (!response.ok) {
                const errorText = await response.text();
                showAlert('Failed to update mentor', 'Be Warned', 'red');
                return;
            }

            showAlert('Mentor updated successfully', 'Success', 'green');
            navigate("/");
        } catch (error) {
            console.error('Error:', error);
            showAlert('Failed to update mentor', 'Be Warned', 'red');
        } finally {
            setLoading(false);
        }
    };

    const validateForm = () => {
        if (!name.trim()) {
            showAlert('Name is required', 'Validation Error', 'red');
            return false;
        }
        if (!email.trim()) {
            showAlert('Email is required', 'Validation Error', 'red');
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            showAlert('Email is not valid', 'Validation Error', 'red');
            return false;
        }
        return true;
    };

    const showAlert = (message, title, color) => {
        setAlert({ message, title, color });
        setTimeout(() => {
            setAlert(null);
        }, 4000); // Hide alert after 4 seconds
    };

    return (
        <div className="w-screen h-screen flex justify-center items-center p-3">
            {alert && (
                <div className={`bg-${alert.color}-100 border-l-4 border-${alert.color}-500 text-${alert.color}-700 p-4 mb-4`} role="alert">
                    <p className="font-bold">{alert.title}</p>
                    <p>{alert.message}</p>
                </div>
            )}
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="spinner-border text-light" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )}
            <div className="bg-white px-8 py-16 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-green-600">Редактирай Ментор</h2>
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
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full p-2 rounded transform transition-transform duration-300 ${loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-800 hover:scale-105'}`}
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Актуализирай'}
                    </button>
                </form>
            </div>
        </div>
    );
}
