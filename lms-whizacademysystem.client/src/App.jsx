import { useEffect, useState } from 'react';
import './App.css';
import './assets/css/tailwind.css'
import Navigation from './components/Navigation';
import ImageGrid from './components/ImageGrid';
function App() {
    return (
        <>
            <ImageGrid />
            <h1 className="text-3xl text-red-600 font-bold underline">
                helllpooo
            </h1>
        </>
    );


}

export default App;


//     const [forecasts, setForecasts] = useState();

// useEffect(() => {
//     populateWeatherData();
// }, []);

// async function populateWeatherData() {
//     const response = await fetch('weatherforecast');
//     const data = await response.json();
//     setForecasts(data);
// }