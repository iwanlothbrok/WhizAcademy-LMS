import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddStudent() {
    const [step, setStep] = useState(1);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [priceForHour, setPriceForHour] = useState('');
    const [address, setAddress] = useState('');
    const [mentorId, setMentorId] = useState('');
    const [roadmap, setRoadmap] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [skills, setSkills] = useState('');
    const [description, setDescription] = useState('');
    const [homework, setHomework] = useState('');

    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);
    const [mentors, setMentors] = useState([]);
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
            } catch (error) {
                showAlert('An error occurred while fetching mentors.', 'Be Warned', 'red');
            } finally {
                setLoading(false);
            }
        };
        fetchMentors();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('Name', name);
        formData.append('Email', email);
        formData.append('PhoneNumber', phoneNumber);
        formData.append('PriceForHour', priceForHour);
        formData.append('Address', address);
        formData.append('MentorId', mentorId);
        formData.append('Roadmap', roadmap);
        formData.append('Photo', photo);
        formData.append('Description', description);
        formData.append('Skills', skills);
        formData.append('Homework', homework);

        try {
            const response = await fetch('https://localhost:44357/api/students/add/', {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                const errorText = await response.text();
                showAlert(errorText, 'Be Warned', 'red');
                return;
            }
            showAlert('Student added successfully', 'Success', 'green');
            navigate("/");
        } catch (error) {
            showAlert('Failed to add student', 'Be Warned', 'red');
        } finally {
            setLoading(false);
        }
    };

    const showAlert = (message, title, color) => {
        setAlert({ message, title, color });
        setTimeout(() => {
            setAlert(null);
        }, 4000);
    };

    const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

    return (
        <div className="w-screen p-4 flex justify-center items-center flex-col">
            {alert && (
                <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 bg-${alert.color}-100 border-l-4 border-${alert.color}-500 text-${alert.color}-700 p-4`}>
                    <p className="font-bold">{alert.title}</p>
                    <p>{alert.message}</p>
                </div>
            )}
            <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-6 text-center text-red-600">Добави Студент</h2>
                <form onSubmit={handleSubmit}>
                    {step === 1 && (
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-gray-700">Две Имена</label>
                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder='Янаки Янакиев'
                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-gray-700">Имейл</label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder='example@example.com'
                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                />
                            </div>
                            <div>
                                <label htmlFor="phoneNumber" className="block text-gray-700">Телефонен Номер</label>
                                <input
                                    id="phoneNumber"
                                    type="tel"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    placeholder='+359 88 888 8888'
                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                />
                            </div>
                            <div className="flex justify-between">
                                <button type="button" onClick={nextStep} className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700">
                                    Напред
                                </button>
                            </div>
                        </div>
                    )}
                    {step === 2 && (
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="address" className="block text-gray-700">Адрес</label>
                                <input
                                    id="address"
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder='Sofia, blok 40'
                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                />
                            </div>
                            <div>
                                <label htmlFor="priceForHours" className="block text-gray-700">Цена за час</label>
                                <input
                                    id="priceForHours"
                                    type="number"
                                    step="0.01"
                                    value={priceForHour}
                                    onChange={(e) => setPriceForHour(e.target.value)}
                                    placeholder='150'
                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                />
                            </div>
                            <div>
                                <label htmlFor="description" className="block text-gray-700">Информация за ученика</label>
                                <textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder='Топ ученик...знае Х, Y и Z'
                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                    rows="3"
                                />
                            </div>
                            <div className="flex justify-between">
                                <button type="button" onClick={prevStep} className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400">
                                    Назад
                                </button>
                                <button type="button" onClick={nextStep} className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700">
                                    Напред
                                </button>
                            </div>
                        </div>
                    )}
                    {step === 3 && (
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="skills" className="block text-gray-700">Умения</label>
                                <textarea
                                    id="skills"
                                    value={skills}
                                    onChange={(e) => setSkills(e.target.value)}
                                    placeholder='.Net, React, arrays...'
                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                    rows="2"
                                />
                            </div>
                            <div>
                                <label htmlFor="homework" className="block text-gray-700">Домашна работа</label>
                                <textarea
                                    id="homework"
                                    value={homework}
                                    onChange={(e) => setHomework(e.target.value)}
                                    placeholder='.Net, React, arrays...'
                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                    rows="2"
                                />
                            </div>
                            <div>
                                <label htmlFor="mentors" className="block text-gray-700">Ментор</label>
                                <select
                                    id="mentors"
                                    value={mentorId}
                                    onChange={(e) => setMentorId(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                >
                                    <option value="" disabled>Избери Ментор</option>
                                    {mentors.map(mentor => (
                                        <option key={mentor.id} value={mentor.id}>{mentor.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="photo" className="block text-gray-700">Снимка</label>
                                <input
                                    id="photo"
                                    type="file"
                                    onChange={(e) => setPhoto(e.target.files[0])}
                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                />
                            </div>
                            <div>
                                <label htmlFor="roadmap" className="block text-gray-700">Пътека За Обучение</label>
                                <input
                                    id="roadmap"
                                    type="file"
                                    onChange={(e) => setRoadmap(e.target.files[0])}
                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                />
                            </div>
                            <div className="flex justify-between">
                                <button type="button" onClick={prevStep} className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400">
                                    Назад
                                </button>
                                <button type="submit" className={`bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 ${loading ? 'bg-gray-400' : ''}`} disabled={loading}>
                                    {loading ? 'Зарежда...' : 'ДОБАВИ'}
                                </button>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
