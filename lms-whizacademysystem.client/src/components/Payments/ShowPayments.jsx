import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ShowPayments() {
    const [payments, setPayments] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [alert, setAlert] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    const navigate = useNavigate();

    const fetchPayments = async () => {
        setLoading(true);

        try {
            const response = await fetch('https://localhost:44357/api/payment/all');
            if (!response.ok) {
                showAlert('Failed to fetch payments', 'Be Warned', 'red');
                return;
            }

            const data = await response.json();
            // Sort payments by paymentDate
            const sortedData = data.sort((a, b) => new Date(b.paymentDate) - new Date(a.paymentDate));
            setPayments(sortedData);
        } catch (error) {
            console.error('Error:', error);
            showAlert('An error occurred while fetching payments.', 'Be Warned', 'red');
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 500);
        }
    };

    useEffect(() => {
        fetchPayments();
    }, []);


    const handleDelete = async (id) => {
        setLoading(true);

        try {
            const response = await fetch(`https://localhost:44357/api/payment/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                showAlert('Failed to delete payment', 'Be Warned', 'red');
                return;
            }

            setPayments(payments.filter((s) => s.id !== id));
            showAlert('payment deleted successfully', 'Success', 'green');
        } catch (error) {
            console.error('Error:', error);
            showAlert('An error occurred while deleting the payment.', 'Be Warned', 'red');
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    };

    const handleClickIncreaseLessonsCount = async (id) => {
        setLoading(true);

        const response = await fetch(`https://localhost:44357/api/payment/increase-lessons/${id}`, {
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

    const handleClickDecreaseLessonsCount = async (id) => {
        setLoading(true);
        try {

            const response = await fetch(`https://localhost:44357/api/payment/decrease-lessons/${id}`, {
                method: 'PUT',
            });

            if (!response.ok) {
                showAlert('Failed to delete payment', 'Be Warned', 'red');
                return;
            }
            console.log(response);
            await fetchPayments(); // Refresh the payments after decreasing the lesson count

        } catch (error) {
            console.error('Error:', error);
            showAlert('An error occurred while deleting the payment.', 'Be Warned', 'red');
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 300);
        }
    };

    const filteredPayments = payments.filter(payment =>
        payment.student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.paymentDate.toLowerCase().includes(searchQuery.toLowerCase()));

    const indexOfLastPayment = currentPage * itemsPerPage;
    const indexOfFirstPayment = indexOfLastPayment - itemsPerPage;
    const currentPayments = filteredPayments.slice(indexOfFirstPayment, indexOfLastPayment);

    const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);

    const getRowBgColorClass = (index) => {
        const colors = ['bg-yellow-100', 'bg-yellow-200', 'bg-yellow-300'];
        return colors[index % colors.length];
    };

    const showAlert = (message, title, color) => {
        setAlert({ message, title, color });
        setTimeout(() => {
            setAlert(null);
        }, 3000);
    };

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
                <h1 className="text-3xl font-bold mb-6 text-center text-yellow-400">Плащания</h1>
                <input
                    type="text"
                    placeholder="Потърси по имейл, имена или тел. номер"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:w-3/4 md:w-2/4 p-2 mb-4 border flex justify-center bg-white text-black border-gray-300 rounded"
                />
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-yellow-600 text-white">
                            <tr>
                                <th className="py-2 px-4 text-left">Студент</th>
                                <th className="py-2 px-4 text-left">Ментор</th>
                                <th className="py-2 px-4 text-left">Разплащател</th>
                                <th className="py-2 px-4 text-left">Сума</th>
                                <th className="py-2 px-4 text-left">Платени Уроци</th>
                                <th className="py-2 px-4 text-left">Завършени Уроци</th>

                                <th className="py-2 px-4 text-left">Дата на Плащане</th>
                                <th className="py-2 px-4 text-left">Функции</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {currentPayments.map((payment, index) => (
                                <tr key={payment.id} className={`border-t ${getRowBgColorClass(index)} hover:bg-yellow-400 transition duration-300 ease-in-out`}>
                                    <td className="py-2 px-4">{payment.student.name}</td>
                                    <td className="py-2 px-4">{payment.mentor.name}</td>
                                    <td className="py-2 px-4">{payment.student.relative.name === undefined ? 'няма добавени близки' : payment.student.relative.name}</td>
                                    <td className="py-2 px-4">{payment.amount}</td>
                                    <td className="py-2 px-4">{payment.payedLessons}</td>
                                    <td className="py-2 px-4">
                                        {payment.lessonsCompleted}
                                        <button
                                            onClick={() => handleClickIncreaseLessonsCount(payment.id)}
                                            className="ml-2 bg-blue-500 text-white px-3 py-1 rounded
                                             hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                            +
                                        </button>
                                        <button
                                            onClick={() => handleClickDecreaseLessonsCount(payment.id)}
                                            className="ml-2 bg-red-500 text-white px-3 py-1 rounded
                                             hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                        >
                                            -
                                        </button>
                                    </td>
                                    <td className="py-2 px-4">{getFormattedDate(payment.paymentDate)}</td>
                                    <td className="py-2 px-4">
                                        <button
                                            className="bg-red-500 text-white px-2 py-2 my-1 rounded shadow hover:bg-red-700 mr-2 transition duration-300 ease-in-out transform hover:scale-105"
                                            onClick={() => handleDelete(payment.id)}
                                        >
                                            Изтрий
                                        </button>
                                        <button
                                            className="bg-blue-500 text-white px-2 py-2 rounded shadow hover:bg-blue-700 mr-2 transition duration-300 ease-in-out transform hover:scale-105"
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
                        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                    >
                        Следваща
                    </button>
                </div>
            </div>
        </div>
    );
}
