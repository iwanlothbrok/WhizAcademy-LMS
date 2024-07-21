import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditStudent() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [priceForHour, setPriceForHour] = useState('');
    const [unpaidLessons, setUnpaidLessons] = useState(0);
    const [loading, setLoading] = useState(false); // Loading state
    const [alert, setAlert] = useState(null); // State to manage alerts
    const navigate = useNavigate();
    const { id } = useParams(); // Get the student ID from the URL

    useEffect(() => {
        const fetchStudent = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://localhost:44357/api/students/details/${id}`);
                if (!response.ok) {
                    showAlert('Failed to fetch student', 'Be Warned', 'red');
                    return;
                }

                const student = await response.json();
                setName(student.name);
                setEmail(student.email);
                setPhoneNumber(student.phoneNumber);
                setAddress(student.address);
                setPriceForHour(student.priceForHour);
                setUnpaidLessons(student.unpaidLessons);
            } catch (error) {
                console.error('Error:', error);
                showAlert('An error occurred while fetching student details.', 'Be Warned', 'orange');
            } finally {
                setLoading(false);
            }
        };

        fetchStudent();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);

        const student = { id, name, email, phoneNumber, address, priceForHour, unpaidLessons };
        try {
            const response = await fetch(`https://localhost:44357/api/students/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(student),
            });

            if (!response.ok) {
                const errorText = await response.text();
                showAlert('Failed to update student', 'Be Warned', 'red');
                return;
            }

            showAlert('Student updated successfully', 'Success', 'green');
            navigate("/students/all");
        } catch (error) {
            console.error('Error:', error);
            showAlert('Failed to update student', 'Be Warned', 'red');
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
                <h2 className="text-2xl font-bold mb-6 text-center text-green-600">Редактирай Студент</h2>
                <form className="text-lg" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700">Име</label>
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
                    <div className="mb-4">
                        <label htmlFor="phoneNumber" className="block text-gray-700">Телефонен номер</label>
                        <input
                            id="phoneNumber"
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="w-full p-2 border bg-black text-white border-gray-300 rounded mt-1"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="address" className="block text-gray-700">Адрес</label>
                        <input
                            id="address"
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full p-2 border bg-black text-white border-gray-300 rounded mt-1"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="priceForHour" className="block text-gray-700">Цена на час</label>
                        <input
                            id="priceForHour"
                            type="number"
                            value={priceForHour}
                            onChange={(e) => setPriceForHour(e.target.value)}
                            className="w-full p-2 border bg-black text-white border-gray-300 rounded mt-1"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="unpaidLessons" className="block text-gray-700">Неплатени уроци</label>
                        <input
                            id="unpaidLessons"
                            type="number"
                            value={unpaidLessons}
                            onChange={(e) => setUnpaidLessons(e.target.value)}
                            className="w-full p-2 border bg-black text-white border-gray-300 rounded mt-1"
                            required
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
