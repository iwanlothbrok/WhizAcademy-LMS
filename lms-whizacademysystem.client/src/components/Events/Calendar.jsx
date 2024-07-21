import React, { useState } from 'react';
import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

export default function Calendar() {
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [eventName, setEventName] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [invitees, setInvitees] = useState([""]);
    const [studentId, setStudentId] = useState(0);
    const [mentorId, setMentorId] = useState(0);

    const session = useSession();
    const supabase = useSupabaseClient();
    const { isLoading } = useSessionContext();

    if (isLoading) {
        return <></>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createCalendarEvent();
    }

    const handleFormSubmission = async () => {
        const formData = new FormData();
        formData.append('Name', eventName);
        formData.append('StudentId', studentId.toString());
        formData.append('MentorId', mentorId.toString());
        formData.append('StartingDate', start.toISOString());
        formData.append('EndingDate', end.toISOString());

        console.log(formData);

        try {
            const response = await fetch('https://localhost:44357/api/event/add/', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.log(errorText);
                alert('Failed to add event');
                return;
            }

            alert('Event added successfully');
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to add event');
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
            console.error('Error logging in to Google provider with Supabase:', error);
            alert("Error logging in to Google provider with Supabase");
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

    async function createCalendarEvent() {
        if (!session) {
            alert("You need to be signed in to create an event");
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
                    { method: 'email', minutes: 60 },    // Email reminder 1 hour before
                    { method: 'email', minutes: 30 },    // Email reminder 30 minutes before
                    { method: 'popup', minutes: 10 }     // Popup reminder 10 minutes before
                ]
            }
        };

        try {
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
                alert("Event created, check your Google Calendar!");
                await saveEventToSupabase(event);
            } else {
                console.error('Error creating event:', data);
                alert('Failed to create event');
            }
        } catch (error) {
            console.error('Error creating event:', error);
            alert('Failed to create event');
        }
    }

    const saveEventToSupabase = async (event) => {
        const { data, error } = await supabase
            .from('events')
            .insert([{ name: event.summary, date: event.start.dateTime || event.start.date }]);

        if (error) {
            console.error('Error saving data:', error);
        } else {
            console.log('Event saved:', data);
        }
    };

    return (
        <div className=" w-screen h-screen flex justify-center items-center  min-h-screen">
            <div className="bg-white text-black p-8 rounded-lg shadow-lg w-full max-w-lg">
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
                                    className="w-full  text-white p-2 border border-gray-300 rounded"
                                    placeholder="Enter event name"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Event description</label>
                                <input
                                    type="text"
                                    onChange={(e) => setEventDescription(e.target.value)}
                                    className="w-full  text-white p-2 border border-gray-300 rounded"
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