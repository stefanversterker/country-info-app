import './App.css';
/*import Region from "./components/regions/Region.jsx";*/
import world_map from "./assets/world_map.png"
import axios from "axios";
import {useState} from "react";
import regionColor from "./helpers/region-colors.js";



function App() {

    const [countryName, setCountryName] = useState('')
    const [countryPopulation, setCountryPopulation] = useState(0)
    const [region, setRegion] = useState('')
    const [flag, setFlag] = useState('')
    const [country, setCountry] = useState([])


    async function fetchCountry() {
        try {
            const response = await axios.get('https://restcountries.com/v3.1/all', {
                params: { fields: 'name,population,region,flag' }
            });

            const country = response.data;


            console.log(country);
            setCountryName(country.name);
            setCountryPopulation(country.population);
            setRegion(country.region);
            setFlag(country.flag)
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <header>
                <figure className="world-map">
                    <img src={world_map} alt="a map of the whole world"/>
                </figure>
                <h1>World Regions</h1>
            </header>

            <main>
                <ul>

                    {country.map(() => {
                    return <li key={countryName}>
                        <div className ={regionColor(region)}>
                            <span>{flag}</span>
                            {countryName?.common || 'Unknown'}
                        </div>
                        <p>has a population of {countryPopulation} people</p>
                    </li>
                })}

                </ul>
                <button type="button"
                        onClick={fetchCountry}
                >
                    Land!
                </button>
            </main>
        </>
    )
}

export default App
