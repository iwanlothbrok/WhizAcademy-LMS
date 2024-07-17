import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ShowStudents() {
    const [students, setStudents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [alert, setAlert] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

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
                console.log(data);
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

    const handleDelete = async (id) => {
        setLoading(true);

        try {
            const response = await fetch(`https://localhost:44357/api/students/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                showAlert('Failed to delete student', 'Be Warned', 'red');
                return;
            }

            setStudents(students.filter((s) => s.id !== id));
            showAlert('Student deleted successfully', 'Success', 'green');
        } catch (error) {
            console.error('Error:', error);
            showAlert('An error occurred while deleting the student.', 'Be Warned', 'red');
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    };

    const handleClickIncreaseUnpayedLessons = async (id) => {
        setLoading(true);

        const response = await fetch(`https://localhost:44357/api/students/increase-lessons/${id}`, {
            method: 'PUT',
        });

        if (!response.ok) {
            showAlert('Failed to delete payment', 'Be Warned', 'red');
            return;
        }

        await fetchPayments(); // Refresh the payments after decreasing the lesson count

        setTimeout(() => {
            setLoading(false);
        }, 300);
    };

    const handleClickDecreaseUnpayedLessons = async (id) => {
        setLoading(true);

        const response = await fetch(`https://localhost:44357/api/students/decrease-lessons/${id}`, {
            method: 'PUT',
        });

        if (!response.ok) {
            showAlert('Failed to delete payment', 'Be Warned', 'red');
            return;
        }

        await fetchPayments(); // Refresh the payments after decreasing the lesson count

        setTimeout(() => {
            setLoading(false);
        }, 300);
    };


    const getRowBgColorClass = (index) => {
        const colors = ['bg-red-200', 'bg-red-300', 'bg-red-400'];
        return colors[index % colors.length];
    };

    const filteredStudents = students.filter((student) =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastStudent = currentPage * itemsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - itemsPerPage;
    const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

    const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handleProgress = (id) => {
        navigate(`/roadmap/${id}`);
    };

    const showAlert = (message, title, color) => {
        setAlert({ message, title, color });
        setTimeout(() => {
            setAlert(null);
        }, 3000);
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
                <h1 className="text-3xl font-bold mb-6 text-center text-red-500">Студенти</h1>
                <input
                    type="text"
                    placeholder="Потърси по имейл, имена или тел. номер"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:w-3/4 md:w-2/4 p-2 mb-4 border flex justify-center bg-white text-black border-gray-300 rounded"
                />
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-red-500 text-white">
                            <tr>
                                <th className="py-2 px-4 text-left">Имена</th>
                                <th className="py-2 px-4 text-left">Имейл</th>
                                <th className="py-2 px-4 text-left">Телефонен Номер</th>
                                <th className="py-2 px-4 text-left">Цена на Урок</th>
                                <th className="py-2 px-4 text-left">Не Платени Уроци</th>
                                <th className="py-2 px-4 text-left">Адрес</th>
                                <th className="py-2 px-4 text-left">Ментор</th>
                                <th className="py-2 px-4 text-left">Разплащател</th>
                                <th className="py-2 px-4 text-left">Функции</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {currentStudents.map((student, index) => (
                                <tr key={student.id} className={`border-t ${getRowBgColorClass(index)} hover:bg-red-300 transition duration-300 ease-in-out`}>
                                    <td className="py-2 px-4">{student.name}</td>
                                    <td className="py-2 px-4">{student.email}</td>
                                    <td className="py-2 px-4">{student.phoneNumber}</td>
                                    <td className="py-2 px-4">${student.priceForHour.toLocaleString()}</td>
                                    <td className="py-2 px-4">
                                        {student.unpaidLessons}
                                        <button
                                            onClick={() => handleClickIncreaseUnpayedLessons(student.id)}
                                            className="ml-2 bg-blue-500 text-white px-4 py-1 rounded
                                             hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                            +
                                        </button>
                                        <button
                                            onClick={() => handleClickDecreaseUnpayedLessons(student.id)}
                                            className="ml-5 mt-1 bg-red-500 text-white px-4 py-1 rounded
                                             hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                        >
                                            -
                                        </button>
                                    </td>
                                    <td className="py-2 px-4">{student.address}</td>
                                    <td className="py-2 px-4">{student.mentor ? student.mentor.name : 'няма добаве'}</td>
                                    <td className="py-2 px-4">{student.relative ? student.relative.name : 'няма добавен'}</td>
                                    <td className="py-2 px-4">
                                        <button
                                            className="bg-red-500 text-white px-2 py-2 my-1 rounded shadow hover:bg-red-700 mr-2 transition duration-300 ease-in-out transform hover:scale-105"
                                            onClick={() => handleDelete(student.id)}
                                        >
                                            Изтрий
                                        </button>
                                        <button
                                            className="bg-blue-500 text-white px-2 py-2 rounded shadow hover:bg-blue-700 mr-2 transition duration-300 ease-in-out transform hover:scale-105"
                                        >
                                            Промяна
                                        </button>
                                        <button
                                            className="bg-purple-600 text-white px-2 py-2 my-1 rounded shadow hover:bg-purple-900 transition duration-300 ease-in-out transform hover:scale-105"
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

                <div className="flex justify-between mt-4">
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                    >
                        Предишна
                    </button>
                    <span className="text-white">Страница {currentPage} от {totalPages}</span>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                    >
                        Следваща
                    </button>
                </div>
            </div>

        </div>
    );
}
