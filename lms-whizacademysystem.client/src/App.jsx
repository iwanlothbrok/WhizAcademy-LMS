import { useEffect, useState } from 'react';
import './assets/css/tailwind.css'
import Navigation from './components/Navigation';
import ImageGrid from './components/ImageGrid';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
    return (
        <>
            <ImageGrid />
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