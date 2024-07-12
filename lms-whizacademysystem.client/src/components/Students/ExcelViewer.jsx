import React, { useEffect, useState } from 'react';
import Pagination from './Pagination';
import { useNavigate, useParams } from 'react-router-dom';

export default function ExcelViewer() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(10);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState([]);
    const [searchTask, setSearchTask] = useState('');
    const [searchStartDate, setSearchStartDate] = useState('');
    const [searchEndDate, setSearchEndDate] = useState('');

    const { id } = useParams(); // Get the mentor ID from the URL


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://localhost:44357/api/students/get/roadmap/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                setData(jsonData);
                setEditData(jsonData);
            } catch (error) {
                console.error('Error fetching and parsing data:', error);
            }
        };

        fetchData();
    }, []);

    const handleSearch = () => {
        const filteredData = data.filter(row =>
            (row['Task'] || '').toLowerCase().includes(searchTask.toLowerCase()) &&
            (row['Start Date'] || '').toLowerCase().includes(searchStartDate.toLowerCase()) &&
            (row['End Date'] || '').toLowerCase().includes(searchEndDate.toLowerCase())
        );
        setEditData(filteredData);
        setCurrentPage(1); // Reset to first page
    };

    const totalPages = Math.ceil(editData.length / rowsPerPage);
    const currentData = editData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    const handleEdit = (rowIndex, key, value) => {
        const updatedData = [...editData];
        updatedData[rowIndex][key] = value;
        setEditData(updatedData);
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`https://localhost:44357/api/students/update/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editData),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            alert('Data saved successfully!');
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    return (
        <div className="w-screen p-10 mt-10 flex justify-center items-center flex-col">
            <h1 className="text-2xl font-bold mb-4">Excel Data Visualization</h1>
            <div className="mb-4">
                <div className="flex space-x-4">
                    <input
                        type="text"
                        placeholder="Search Task"
                        value={searchTask}
                        onChange={(e) => setSearchTask(e.target.value)}
                        className="w-full border rounded px-2 py-1"
                    />
                    <input
                        type="text"
                        placeholder="Search Start Date"
                        value={searchStartDate}
                        onChange={(e) => setSearchStartDate(e.target.value)}
                        className="w-full border rounded px-2 py-1"
                    />
                    <input
                        type="text"
                        placeholder="Search End Date"
                        value={searchEndDate}
                        onChange={(e) => setSearchEndDate(e.target.value)}
                        className="w-full border rounded px-2 py-1"
                    />
                    <button
                        onClick={handleSearch}
                        className="px-4 py-2 bg-yellow-600 text-white rounded transform transition-transform duration-300  hover:bg-yellow-700 hover:scale-125"
                    >
                        Search
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto rounded-lg">
                <table className={`min-w-full bg-white border border-gray-200 rounded-lg ${isEditing ? 'text-white' : 'text-black'}`}>
                    <thead>
                        <tr className="bg-green-500 border-b">
                            {data.length > 0 && Object.keys(data[0]).map((key) => (
                                <th key={key} className="text-left py-2 px-4 border-r">{key}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((row, rowIndex) => (
                            <tr key={rowIndex} className="border-b">
                                {Object.keys(row).map((key, idx) => (
                                    <td key={idx} className={`py-2 px-4 border-r ${isEditing ? 'bg-gray-700' : ''}`}>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={row[key]}
                                                onChange={(e) => handleEdit((currentPage - 1) * rowsPerPage + rowIndex, key, e.target.value)}
                                                className="w-full border rounded px-2 py-1 bg-gray-800 text-white"
                                            />
                                        ) : (
                                            row[key]
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
            />
            <div className="flex justify-end mt-4">
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-4 py-2 mx-2 bg-blue-500 text-white rounded transform transition-transform duration-300  hover:bg-blue-700 hover:scale-125"
                >
                    {isEditing ? 'Cancel' : 'Edit'}
                </button>
                {isEditing && (
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 mx-1 bg-yellow-600 text-white rounded transform transition-transform duration-300  hover:bg-yellow-700 hover:scale-125"
                    >
                        Save
                    </button>
                )}
            </div>
        </div>
    );
}
