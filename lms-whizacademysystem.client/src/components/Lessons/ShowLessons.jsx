import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ShowLessons() {
    const [lessons, setLessons] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [alert, setAlert] = useState(null); // State to manage alerts
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const navigate = useNavigate();

    useEffect(() => {
        const fetchLessons = async () => {
            setLoading(true);

            try {
                const response = await fetch('https://localhost:44357/api/lessons/all');
                if (!response.ok) {
                    showAlert('Failed to fetch mentors', 'Be Warned', 'red');
                    return;
                }

                const data = await response.json();
                setLessons(data);
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

        fetchLessons();
    }, []);

    const getRowBgColorClass = (index) => {
        const colors = ['bg-blue-600', 'bg-blue-700', 'bg-blue-800'];
        return colors[index % colors.length];
    };

    const handleDelete = async (id) => {
        setLoading(true);

        try {
            // const response = await fetch(`https://localhost:44357/api/mentors/${id}`, {
            //     method: 'DELETE',
            // });

            // if (!response.ok) {
            //     showAlert('Failed to delete mentor', 'Be Warned', 'red');
            //     return;
            // }

            // setLessons(lessons.filter((mentor) => mentor.id !== id));
            // showAlert('Mentor deleted successfully', 'Success', 'green');
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
        // navigate(`/edit-mentor/${id}`);
    };

    const showAlert = (message, title, color) => {
        setAlert({ message, title, color });
        setTimeout(() => {
            setAlert(null);
        }, 3000); // Hide alert after 3 seconds
    };

    const filteredLessons = lessons.filter((lesson) =>
        lesson.title.toLowerCase().includes(searchQuery.toLowerCase())// ||
        // lesson.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastLesson = currentPage * itemsPerPage;
    const indexOfFirstLesson = indexOfLastLesson - itemsPerPage;
    const currentMentors = filteredLessons.slice(indexOfFirstLesson, indexOfLastLesson);

    const totalPages = Math.ceil(filteredLessons.length / itemsPerPage);

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    function getFormattedDate(dateString) {
        let date = new Date(dateString);

        let year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');
        let hours = date.getHours().toString().padStart(2, '0');
        let minutes = date.getMinutes().toString().padStart(2, '0');
        let seconds = date.getSeconds().toString().padStart(2, '0');

        return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
    }



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
                <h1 className="text-3xl font-bold mb-6 text-center text-blue-400">Уроци</h1>
                <input
                    type="text"
                    placeholder="Потърси по имейл или имена"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:w-3/4 md:w-2/4 p-2 mb-4 border bg-white text-black border-gray-300 rounded"
                />

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="py-2 px-4 text-left">Заглавие</th>
                                <th className="py-2 px-6 text-left">Описание</th>
                                <th className="py-2 px-4 text-left">Начало</th>
                                <th className="py-2 px-4 text-left">Край</th>
                                <th className="py-2 px-4 text-left">Ментор</th>
                                <th className="py-2 px-4 text-left">Студент</th>
                                <th className="py-2 px-4 text-left">Операции</th>
                            </tr>
                        </thead>
                        <tbody className="text-white-700">
                            {currentMentors.map((lesson, index) => (
                                <tr key={lesson.id} className={`border-t ${getRowBgColorClass(index)} hover:bg-blue-900 transition duration-300 ease-in-out`}>
                                    <td className="py-2 px-4">{lesson.title}</td>
                                    <td className="py-2 px-4">{lesson.description}</td>
                                    <td className="py-2 px-4">{getFormattedDate(lesson.startingDate)}</td>
                                    <td className="py-2 px-4">{getFormattedDate(lesson.endingDate)}</td>
                                    <td className="py-2 px-4">{lesson.mentor.name}</td>
                                    <td className="py-2 px-4">{lesson.student.name}</td>
                                    <td className="py-2 px-4">
                                        <button
                                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 mr-2"
                                            onClick={() => handleDelete(lesson.id)}
                                        >
                                            Изтрий
                                        </button>
                                        <button
                                            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                                            onClick={() => handleEdit(lesson.id)}
                                        >
                                            Промяна
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
                        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-20"
                    >
                        Следваща
                    </button>
                </div>
            </div>
        </div>
    );
}