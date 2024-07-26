import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export default function AddRelative() {
    const [name, setName] = useState('');
    const [studentId, setStudentId] = useState('');
    const [students, setStudents] = useState([])
    const [loading, setLoading] = useState(false); // Loading state
    const [alert, setAlert] = useState(null); // State to manage alerts

    useEffect(() => {
        const fetchStudents = async () => {
            setLoading(true);

            try {
                const response = await fetch('https://localhost:44357/api/students/all');
                if (!response.ok) {
                    showAlert('Failed to fetch students', 'Be Warned', 'red');
                    return;
                }

                const data = await response.json();
                setStudents(data);

                console.log(data);
            } catch (error) {
                showAlert('An error occurred while fetching students.', 'Be Warned', 'red');
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            }
        };

        fetchStudents();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            Name: name,
            StudentId: studentId
        };

        try {
            const response = await fetch('https://localhost:44357/api/relatives/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorText = await response.text();
                showAlert(errorText, 'Be Warned', 'red');
                console.log(errorText);
                return;
            }

            showAlert('Relative added successfully', 'Success', 'green');
            // navigate("/");
        } catch (error) {
            console.error('Error:', error);
            showAlert('Failed to add Relative', 'Be Warned', 'red');
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
        <div className="w-screen h-screen flex justify-center items-center p-3">
            {alert && (
                <div className={`absolute bg-${alert.color}-100 top-4 left-1/2 transform -translate-x-1/2 border-l-4 border-${alert.color}-500 text-${alert.color}-700 p-4 mb-4`} role="alert">
                    <p className="font-bold">{alert.title}</p>
                    <p>{alert.message}</p>
                </div>
            )}
            <div className="bg-white px-6 py-10 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-purple-600">Добави Разплащател</h2>
                <form className="text-lg" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700">Две Имена</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Янаки Янакиев'
                            className="w-full p-2 border bg-black text-white border-gray-300 rounded mt-1"
                            required
                        />
                    </div>

                    <div className="mb-4">

                        <label htmlFor="students" className="block text-gray-700">Ментор</label>
                        <select id="students" onChange={(e) => setStudentId(e.target.value)} className=" bg-black text-white border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-purple-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="" disabled selected>Избери Студент</option>
                            {students.map(x => (
                                <option key={x.id} value={x.id}>{x.name}</option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        className={`w-full p-2 rounded transform transition-transform duration-300 ${loading ? 'bg-gray-400' : 'bg-purple-600 hover:bg-purple-800 hover:scale-105'}`}
                        disabled={loading}
                    >
                        {loading ? 'Зарежда...' : 'ДОБАВИ'}
                    </button>
                </form>
            </div>
        </div>
    );
}
