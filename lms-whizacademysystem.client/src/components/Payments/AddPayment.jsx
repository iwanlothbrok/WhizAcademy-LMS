import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddPayment() {
    const [amount, setAmount] = useState(0);

    const [lessonsCount, setLessonsCount] = useState(0);

    const [firstLessonDate, setFirstLessonDate] = useState(null) // datetime
    const [lastLessonDate, setLastLessonDate] = useState(null) // datetime

    const [students, setStudents] = useState([]);
    const [mentors, setMentors] = useState({});

    const [student, setStudent] = useState([]);
    const [mentorId, setMentorId] = useState('');

    const [relative, setRelative] = useState('');

    const [loading, setLoading] = useState(false); // Loading state
    const [alert, setAlert] = useState(null); // State to manage alerts

    // getting the mentors 
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
                console.log(data);
                setMentors(data);

                console.log(data);
            } catch (error) {
                showAlert('An error occurred while fetching mentors.', 'Be Warned', 'red');
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            }
        }

        fetchMentors();
    }, []);


    // getting the mentors 
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
                console.log(data);
                setMentors(data);

                console.log(data);
            } catch (error) {
                showAlert('An error occurred while fetching mentors.', 'Be Warned', 'red');
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            }
        }

        fetchMentors();
    }, [mentorId]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // const formData = new FormData();
        // // formData.append('Name', name);
        // formData.append('Email', email ? email : 'няма въведен имейл');
        // formData.append('PhoneNumber', phoneNumber);
        // formData.append('PriceForHour', priceForHour);
        // formData.append('Address', address);
        // formData.append('MentorId', mentorId);

        console.log(formData);

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
                <h2 className="text-2xl font-bold mb-6 text-center text-green-600">Добави Студент</h2>
                <form className="text-lg" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="amount" className="block text-gray-700">Сума</label>
                        <input
                            id="amount"
                            type="number"
                            step="10.00"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder='150'
                            className="w-full p-2 border bg-black text-white border-gray-300 rounded mt-1"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="lessonsCount" className="block text-gray-700">Брой уроци</label>
                        <input
                            id="lessonsCount"
                            type="number"
                            value={lessonsCount}
                            onChange={(e) => setLessonsCount(e.target.value)}
                            placeholder='10'
                            className="w-full p-2 border bg-black text-white border-gray-300 rounded mt-1"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="firstLessonDate" className="block text-gray-700">Дата на първия урок</label>
                        <input
                            id="firstLessonDate"
                            type="datetime-local"
                            value={firstLessonDate}
                            onChange={(e) => setFirstLessonDate(e.target.value)}
                            className="w-full p-2 border bg-black text-white border-gray-300 rounded mt-1"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="lastLessonDate" className="block text-gray-700">Дата на последния урок</label>
                        <input
                            id="lastLessonDate"
                            type="datetime-local"
                            value={lastLessonDate}
                            onChange={(e) => setLastLessonDate(e.target.value)}
                            className="w-full p-2 border bg-black text-white border-gray-300 rounded mt-1"
                        />
                    </div>
                    {/* <div className="mb-4">
                        <label htmlFor="students" className="block text-gray-700">Студент</label>
                        <select id="students" onChange={(e) => setStudent(e.target.value)} className=" bg-black text-white border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="" disabled selected>Избери Студент</option>
                            {students.map(x => (
                                <option key={x.id} value={x.id}>{x.name}</option>
                            ))}
                        </select>
                    </div> */}
                    <div className="mb-4">
                        <label htmlFor="mentors" className="block text-gray-700">Ментор</label>
                        <select id="mentors" onChange={(e) => setMentorId(e.target.value)} className=" bg-black text-white border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="" disabled selected>Избери Ментор</option>
                            {mentors.map(x => (
                                <option key={x.id} value={x.id}>{x.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="relative" className="block text-gray-700">Роднина</label>
                        <input
                            id="relative"
                            type="text"
                            value={relative}
                            onChange={(e) => setRelative(e.target.value)}
                            placeholder='Relative'
                            className="w-full p-2 border bg-black text-white border-gray-300 rounded mt-1"
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full p-2 rounded transform transition-transform duration-300 ${loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-800 hover:scale-105'}`}
                        disabled={loading}
                    >
                        {loading ? 'Зарежда...' : 'ДОБАВИ'}
                    </button>
                </form>
            </div>
        </div>
    );
};