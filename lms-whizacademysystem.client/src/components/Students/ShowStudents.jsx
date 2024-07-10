import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function ShowStudents() {
    const [students, setStudents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [alert, setAlert] = useState(null); // State to manage alerts
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

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
                console.log(data); // Log data once when fetched
            } catch (error) {
                console.error('Error:', error);
                showAlert('An error occurred while fetching students.', 'Be Warned', 'red');
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            }
        };

        fetchStudents();
    }, []);

    const getRowBgColorClass = (index) => {
        const colors = ['bg-green-200', 'bg-green-300', 'bg-green-400', 'bg-green-500'];
        return colors[index % colors.length];
    };

    const filteredStudents = students.filter((student) =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );


    const handleProgress = (id) => {
        navigate(`/roadmap/${id}`);
    };


    const showAlert = (message, title, color) => {
        setAlert({ message, title, color });
        setTimeout(() => {
            setAlert(null);
        }, 3000); // Hide alert after 3 seconds
    };

    return (
        <div className="w-screen p-4 flex justify-center items-center flex-col">
            {alert && (
                <div className={`bg-${alert.color}-100 border-l-4 border-${alert.color}-500 text-${alert.color}-700 p-5 mb-4`} role="alert">
                    <p className="font-bold">{alert.title}</p>
                    <p>{alert.message}</p>
                </div>
            )}
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <img src="https://i.gifer.com/4SHX.gif" alt="Loading..." className="w-56 h-56" />
                </div>
            )}
            <div className="bg-gray-600 p-5 rounded shadow-md w-full max-w-5xl mb-4">
                <h1 className="text-3xl font-bold mb-6 text-center text-green-400">Студенти</h1>
                <input
                    type="text"
                    placeholder="Потърси по имейл, имена или тел. номер"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:w-3/4 md:w-2/4 p-2 mb-4 border bg-white text-black border-gray-300 rounded"
                />
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-green-500 text-white">
                            <tr>
                                <th className="py-2 px-4 text-left">Имена</th>
                                <th className="py-2 px-4 text-left">Имейл</th>
                                <th className="py-2 px-4 text-left">Телефонен Номер</th>
                                <th className="py-2 px-4 text-left">Цена на Урок</th>
                                <th className="py-2 px-4 text-left">Адрес</th>
                                <th className="py-2 px-4 text-left">Ментор</th>
                                <th className="py-2 px-4 text-left">Разплащател</th>
                                <th className="py-2 px-4 text-left">Функции</th>

                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {filteredStudents.map((student, index) => (
                                <tr key={index} className={`border-t ${getRowBgColorClass(index)} hover:bg-green-600 transition duration-300 ease-in-out`}>
                                    <td className="py-2 px-4">{student.name}</td>
                                    <td className="py-2 px-4">{student.email}</td>
                                    <td className="py-2 px-4">{student.phoneNumber}</td>
                                    <td className="py-2 px-4">${student.priceForHour.toLocaleString()}</td>
                                    <td className="py-2 px-4">{student.address}</td>
                                    <td className="py-2 px-4">{student.mentor ? student.mentor.name : 'няма добавен ментор'}</td>
                                    <td className="py-2 px-4">{student.relative ? student.relative.name : 'няма добавени близки'}</td>
                                    <td className="py-2 px-4">
                                        <button
                                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 mr-2"
                                        // onClick={() => handleDelete(student.id)}
                                        >
                                            Изтрий
                                        </button>
                                        <button
                                            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                                        // onClick={() => handleEdit(student.id)}
                                        >
                                            Промяна
                                        </button>
                                        <button
                                            className="bg-purple-900 text-white px-2 py-1 rounded hover:bg-amber-700"
                                            onClick={() => handleProgress(student.id)}
                                        >
                                            Прогрес
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>)
}
