import React, { useState } from 'react';
import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { Descriptions } from 'antd';

export default function Calendar() {
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [eventName, setEventName] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [invitees, setInvitees] = useState([""]);
    const [alert, setAlert] = useState(null); // State to manage alerts

    const session = useSession();
    const supabase = useSupabaseClient();
    const { isLoading } = useSessionContext();

    if (isLoading) {
        return <></>;
    }


    const showAlert = (message, title, color) => {
        setAlert({ message, title, color });
        setTimeout(() => {
            setAlert(null);
        }, 4000); // Hide alert after 4 seconds
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await Promise.all([handleFormSubmission(), createCalendarEvent()]);
            showAlert('Event added and created successfully', 'Succsess', 'green');
            resetForm();
        } catch (error) {
            showAlert('Failed to add or create event', 'Warning', 'red');
        }
    }

    async function googleSignIn() {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                scopes: 'https://www.googleapis.com/auth/calendar'
            }
        });

        if (error) {
            showAlert('Error logging in to Google provider with Supabase', 'Warning', 'red');
        }
    }

    async function signOut() {
        await supabase.auth.signOut();
    }

    const handleInviteeChange = (index, value) => {
        const newInvitees = [...invitees];
        newInvitees[index] = value;
        setInvitees(newInvitees);
    };

    const addInviteeField = () => {
        setInvitees([...invitees, ""]);
    };

    const handleFormSubmission = async () => {
        const lessonForm = {
            Title: eventName,
            StudentEmail: session.user.email,
            MentorEmail: invitees[0],
            StartingDate: start.toISOString(),
            EndingDate: end.toISOString(),
            Description: eventDescription,
        };

        try {
            const response = await fetch('https://localhost:44357/api/lesson/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(lessonForm)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }

            showAlert('Lesson added in database', 'Succsess', 'green');

        } catch (error) {
            showAlert(error, 'Warning', 'red');
            throw error;
        }
    }

    async function createCalendarEvent() {
        if (!session) {
            showAlert('You need to be signed in to create an event', 'Danger', 'red');
            return;
        }

        const event = {
            summary: eventName,
            description: eventDescription,
            start: {
                dateTime: start.toISOString(),
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            },
            end: {
                dateTime: end.toISOString(),
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            },
            attendees: invitees.filter(email => email).map(email => ({ email })),
            reminders: {
                useDefault: false,
                overrides: [
                    { method: 'email', minutes: 60 },
                    { method: 'email', minutes: 30 },
                    { method: 'popup', minutes: 10 }
                ]
            }
        };

        const response = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${session.provider_token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(event)
        });

        const data = await response.json();

        if (response.ok) {
            showAlert('Event created, check your Google Calendar!', 'Succsess', 'green');
        } else {
            showAlert('Failed to add or create event', 'Warning', 'red');
        }
    }

    const resetForm = () => {
        setStart(new Date());
        setEnd(new Date());
        setEventName("");
        setEventDescription("");
        setInvitees([""]);
    }


    return (
        <div className="w-screen h-screen flex justify-center items-center min-h-screen">
            <div className="bg-white text-black p-8 rounded-lg shadow-lg w-full max-w-lg">
                {alert && (
                    <div className={`absolute bg-${alert.color}-100 top-0 left-1/2 transform -translate-x-1/2 border-l-4 border-${alert.color}-500 text-${alert.color}-700 p-4 mb-4`} role="alert">
                        <p className="font-bold">{alert.title}</p>
                        <p>{alert.message}</p>
                    </div>
                )}
                {session ? (
                    <>
                        <h2 className="text-3xl font-bold mb-6 text-center">Hey there, {session.user.email}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Start of your event</label>
                                <DateTimePicker
                                    onChange={setStart}
                                    value={start}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">End of your event</label>
                                <DateTimePicker
                                    onChange={setEnd}
                                    value={end}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Event name</label>
                                <input
                                    type="text"
                                    onChange={(e) => setEventName(e.target.value)}
                                    className="w-full text-white p-2 border border-gray-300 rounded"
                                    placeholder="Enter event name"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Event description</label>
                                <input
                                    type="text"
                                    onChange={(e) => setEventDescription(e.target.value)}
                                    className="w-full text-white p-2 border border-gray-300 rounded"
                                    placeholder="Enter event description"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Invitees</label>
                                {invitees.map((invitee, index) => (
                                    <input
                                        key={index}
                                        type="email"
                                        value={invitee}
                                        onChange={(e) => handleInviteeChange(index, e.target.value)}
                                        className="w-full p-2 mb-2 border text-white border-gray-300 rounded"
                                        placeholder="Enter invitee email"
                                    />
                                ))}
                                <button
                                    type="button"
                                    onClick={addInviteeField}
                                    className="w-full bg-gray-200 text-black p-2 rounded"
                                >
                                    Add another invitee
                                </button>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white p-2 rounded mb-2"
                            >
                                Create Calendar Event
                            </button>
                        </form>
                        <button
                            onClick={signOut}
                            className="w-full bg-red-500 text-white p-2 rounded"
                        >
                            Sign Out
                        </button>
                    </>
                ) : (
                    <button
                        onClick={googleSignIn}
                        className="w-full bg-blue-500 text-white p-2 rounded"
                    >
                        Sign In With Google
                    </button>
                )}
            </div>
        </div>
    );
}
