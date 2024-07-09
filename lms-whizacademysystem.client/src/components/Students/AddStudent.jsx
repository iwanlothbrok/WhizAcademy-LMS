import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../tailwind.css'; // Tailwind styles

export default function AddStudent() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [priceForHours, setPriceForHours] = useState('');
    const [address, setAddress] = useState('');
    // const [relativeId, setRelativeId] = useState('');
    const [mentorId, setMentorId] = useState('');
    const [roadmap, setRoadmap] = useState(null);
    const [loading, setLoading] = useState(false); // Loading state
    const [alert, setAlert] = useState(null); // State to manage alerts

    const [mentors, setMentors] = useState([]);
    const navigate = useNavigate();

    // setting mentors for options select
    useEffect(() => {
        const fetchMentors = async () => {
            setLoading(true);

            try {
                const response = await fetch('https://localhost:44357/api/mentors/all');
                if (!response.ok) {
                    showAlert('Failed to fetch mentors', 'Be Warned', 'red');
                    return;
                }

                const data = await response.json();
                setMentors(data);

                console.log(data);
            } catch (error) {
                showAlert('An error occurred while fetching mentors.', 'Be Warned', 'red');
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            }
        };

        fetchMentors();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('Name', name);
        formData.append('Email', email);
        formData.append('PhoneNumber', phoneNumber);
        formData.append('PriceForHours', priceForHours);
        formData.append('Address', address);
        formData.append('MentorId', mentorId);

        console.log(roadmap);

        if (roadmap) {
            formData.append('Roadmap', roadmap);
        }
        console.log(formData);
        try {
            const response = await fetch('https://localhost:44357/api/students/add/', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorText = await response.text();
                showAlert(errorText, 'Be Warned', 'red');
                console.log(errorText);
                return;
            }

            showAlert('Student added successfully', 'Success', 'green');
            navigate("/");
        } catch (error) {
            console.error('Error:', error);
            showAlert('Failed to add student', 'Be Warned', 'red');
        } finally {
            setLoading(false);
        }
    };

    const showAlert = (message, title, color) => {
        setAlert({ message, title, color });
        setTimeout(() => {
            setAlert(null);
        }, 4000); // Hide alert after 4 seconds
    };

    return (
        <div className="w-screen h-screen flex justify-center items-center mt-16 p-3">
            {alert && (
                <div className={`absolute bg-${alert.color}-100 top-0 left-1/2 transform -translate-x-1/2 border-l-4 border-${alert.color}-500 text-${alert.color}-700 p-4 mb-4`} role="alert">
                    <p className="font-bold">{alert.title}</p>
                    <p>{alert.message}</p>
                </div>
            )}
            <div className="bg-white px-6 py-10 rounded shadow-md w-full max-w-md">
                <h2 className="text-1xl font-bold mb-6 text-center text-green-600">Добави Ментор</h2>
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
                    <div className="mb-4">
                        <label htmlFor="phoneNumber" className="block text-gray-700">Телефонен Номер</label>
                        <input
                            id="phoneNumber"
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="w-full p-2 border bg-black text-white border-gray-300 rounded mt-1"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="priceForHours" className="block text-gray-700">Цена за час</label>
                        <input
                            id="priceForHours"
                            type="number"
                            step="0.01"
                            value={priceForHours}
                            onChange={(e) => setPriceForHours(e.target.value)}
                            className="w-full p-2 border bg-black text-white border-gray-300 rounded mt-1"
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

                        <label htmlFor="mentors" className="block text-gray-700">Пътна карта</label>
                        <select id="mentors" onChange={(e) => setMentorId(e.target.value)} className=" bg-black text-white border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="" disabled selected>Избери Ментор</option>
                            {mentors.map(x => (
                                <option key={x.id} value={x.id}>{x.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="roadmap" className="block text-gray-700">Пътна карта</label>
                        <input
                            id="roadmap"
                            type="file"
                            onChange={(e) => setRoadmap(e.target.files[0])}
                            className="w-full p-2 border bg-gray-50 text-gray-900 border-gray-300 rounded-lg mt-1"
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
}
