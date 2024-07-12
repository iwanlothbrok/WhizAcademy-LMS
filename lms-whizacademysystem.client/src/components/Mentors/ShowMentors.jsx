import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ShowMentors() {
    const [mentors, setMentors] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [alert, setAlert] = useState(null); // State to manage alerts
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

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
                console.log(data); // Log data once when fetched
            } catch (error) {
                console.error('Error:', error);
                showAlert('An error occurred while fetching mentors.', 'Be Warned', 'red');
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            }
        };

        fetchMentors();
    }, []);

    const getRowBgColorClass = (index) => {
        const colors = ['bg-green-200', 'bg-green-300', 'bg-green-400', 'bg-green-500'];
        return colors[index % colors.length];
    };

    const handleDelete = async (id) => {
        setLoading(true);

        try {
            const response = await fetch(`https://localhost:44357/api/mentors/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                showAlert('Failed to delete mentor', 'Be Warned', 'red');
                return;
            }

            setMentors(mentors.filter((mentor) => mentor.id !== id));
            showAlert('Mentor deleted successfully', 'Success', 'green');
        } catch (error) {
            console.error('Error:', error);
            showAlert('An error occurred while deleting the mentor.', 'Be Warned', 'red');
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 1000); // Slight delay to ensure the loading GIF is displayed properly
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit-mentor/${id}`);
    };

    const showAlert = (message, title, color) => {
        setAlert({ message, title, color });
        setTimeout(() => {
            setAlert(null);
        }, 3000); // Hide alert after 3 seconds
    };

    const filteredMentors = mentors.filter((mentor) =>
        mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    console.log(filteredMentors);

    return (
        <div className="w-screen p-2 mt-10 flex justify-center items-center flex-col">
            {alert && (
                <div className={`bg-${alert.color}-100 border-l-4 border-${alert.color}-500 text-${alert.color}-700 p-4 mb-4`} role="alert">
                    <p className="font-bold">{alert.title}</p>
                    <p>{alert.message}</p>
                </div>
            )}

            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <img src="https://i.gifer.com/4SHX.gif" alt="Loading..." className="w-56 h-56" />
                </div>
            )}

            <div className="bg-gray-600 p-5 rounded shadow-md w-full max-w-4xl mb-4">
                <h1 className="text-3xl font-bold mb-6 text-center text-green-400">Ментори</h1>
                <input
                    type="text"
                    placeholder="Потърси по имейл или имена"
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
                                <th className="py-2 px-4 text-left">Брой Уроци</th>
                                <th className="py-2 px-4 text-left">Изкарани Пари</th>
                                <th className="py-2 px-4 text-left">Последен Урок</th>
                                <th className="py-2 px-4 text-left">Брой Студенти</th>
                                <th className="py-2 px-4 text-left">Операции</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {filteredMentors.map((mentor, index) => (
                                <tr key={index} className={`border-t ${getRowBgColorClass(index)} hover:bg-green-600 transition duration-300 ease-in-out`}>
                                    <td className="py-2 px-4">{mentor.name}</td>
                                    <td className="py-2 px-4">{mentor.email}</td>
                                    <td className="py-2 px-4">{mentor.lessonsCount}</td>
                                    <td className="py-2 px-4">${mentor.earnedMoney.toLocaleString()}</td>
                                    <td className="py-2 px-4">{new Date(mentor.lastLessonDate).toLocaleString()}</td>
                                    <td className="py-2 px-4">{mentor.studentsCount}</td>
                                    <td className="py-2 px-4">
                                        <button
                                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 mr-2"
                                            onClick={() => handleDelete(mentor.id)}
                                        >
                                            Изтрий
                                        </button>
                                        <button
                                            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                                            onClick={() => handleEdit(mentor.id)}
                                        >
                                            Промяна
                                        </button>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
