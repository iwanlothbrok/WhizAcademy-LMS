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

    useEffect(() => {
        const fetchPayments = async () => {
            setLoading(true);

            try {
                const response = await fetch('https://localhost:44357/api/payment/all');
                if (!response.ok) {
                    showAlert('Failed to fetch payments', 'Be Warned', 'red');
                    return;
                }

                const data = await response.json();
                setPayments(data);
                console.log(data);
            } catch (error) {
                console.error('Error:', error);
                showAlert('An error occurred while fetching payments.', 'Be Warned', 'red');
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            }
        };

        fetchPayments();
    }, []);

    const filteredPayments = payments.filter(payment =>
        payment.student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.paymentDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.firstLessonDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.lastLessonDate.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastPayment = currentPage * itemsPerPage;
    const indexOfFirstPayment = indexOfLastPayment - itemsPerPage;
    const currentPayments = filteredPayments.slice(indexOfFirstPayment, indexOfLastPayment);

    const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);

    const getRowBgColorClass = (index) => {
        const colors = ['bg-green-200', 'bg-green-300', 'bg-green-400', 'bg-green-500'];
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

            {filteredPayments.length === 0 ? (
                <h1 className='text-3xl text-red-400'>Няма добавени плащания.</h1>
            ) : (
                <div className="bg-gray-600 p-5 rounded shadow-md w-full max-w-5xl mb-4">
                    <h1 className="text-3xl font-bold mb-6 text-center text-green-400">Плащания</h1>
                    <input
                        type="text"
                        placeholder="Потърси по имейл, имена или тел. номер"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full sm:w-3/4 md:w-2/4 p-2 mb-4 border flex justify-center bg-white text-black border-gray-300 rounded"
                    />
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                            <thead className="bg-green-500 text-white">
                                <tr>
                                    <th className="py-2 px-4 text-left">Студент</th>
                                    <th className="py-2 px-4 text-left">Адрес</th>
                                    <th className="py-2 px-4 text-left">Ментор</th>
                                    <th className="py-2 px-4 text-left">Сума</th>
                                    <th className="py-2 px-4 text-left">Брой Уроци</th>
                                    <th className="py-2 px-4 text-left">От</th>
                                    <th className="py-2 px-4 text-left">До</th>
                                    <th className="py-2 px-4 text-left">Дата на Плащане</th>
                                    <th className="py-2 px-4 text-left">Функции</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700">
                                {currentPayments.map((payment, index) => (
                                    <tr key={payment.id} className={`border-t ${getRowBgColorClass(index)} hover:bg-green-600 transition duration-300 ease-in-out`}>
                                        <td className="py-2 px-4">{payment.student.name}</td>
                                        <td className="py-2 px-4">{payment.student.address}</td>
                                        <td className="py-2 px-4">{payment.mentor.name}</td>
                                        <td className="py-2 px-4">{payment.amount}</td>
                                        <td className="py-2 px-4">{payment.lessonsCount}</td>
                                        <td className="py-2 px-4">{new Date(payment.firstLessonDate).toLocaleDateString()}</td>
                                        <td className="py-2 px-4">{new Date(payment.lastLessonDate).toLocaleDateString()}</td>
                                        <td className="py-2 px-4">{new Date(payment.paymentDate).toLocaleDateString()}</td>
                                        <td className="py-2 px-4">
                                            <button
                                                className="bg-red-500 text-white px-2 py-2 my-1 rounded shadow hover:bg-red-700 mr-2 transition duration-300 ease-in-out transform hover:scale-105"
                                            // onClick={() => handleDelete(payment.id)}
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
            )}
        </div>
    );
}
