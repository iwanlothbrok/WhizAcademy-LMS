import React, { useEffect, useState } from 'react';

export default function ShowMentors() {

    const [mentors, setMentors] = useState([]);

    useEffect(() => {
        const fetchMentors = async () => {
            try {
                const response = await fetch('https://localhost:44357/api/mentors/all');
                if (!response.ok) {
                    alert('Failed to fetch mentors');
                    return;
                }

                const data = await response.json();
                setMentors(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchMentors();
    }, []);

    let greenCounter = 300;

    return (
        <div className="w-screen flex justify-center items-center ">
            <div className="bg-gray-600 p-8 rounded shadow-md w-full max-w-4xl">
                <h1 className="text-3xl font-bold mb-6 text-center text-green-400">Mentors</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-green-500 text-white">
                            <tr>
                                <th className="py-2 px-4 text-left">Name</th>
                                <th className="py-2 px-4 text-left">Email</th>
                                <th className="py-2 px-4 text-left">Lessons Count</th>
                                <th className="py-2 px-4 text-left">Earned Money</th>
                                <th className="py-2 px-4 text-left">Last Lesson Date</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {mentors.map((mentor, index) => {
                                const bgColorClass = `bg-lime-${greenCounter}`;
                                greenCounter = (greenCounter + 100) % 900;
                                return (
                                    <tr key={index} className={`border-t ${bgColorClass} hover:bg-green-200 transition duration-300 ease-in-out`}>
                                        <td className="py-2 px-4">{mentor.name}</td>
                                        <td className="py-2 px-4">{mentor.email}</td>
                                        <td className="py-2 px-4">{mentor.lessonsCount}</td>
                                        <td className="py-2 px-4">${mentor.earnedMoney.toLocaleString()}</td>
                                        <td className="py-2 px-4">{new Date(mentor.lastLessonDate).toLocaleString()}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );
};

