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

            country.sort((a, b) => a.population - b.population)

            setCountry(country);

            console.log(country);
            setCountryName(country.name);
            setCountryPopulation(country.population);
            setRegion(country.region);
            setFlag(country.flag)
            setCountry(response.data)
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
                <button type="button"
                        onClick={fetchCountry}
                >
                    Land!
                </button>
                <ul>
                    {country.map((c) => (
                    <li key={c.name.common}>
                        <div className ={regionColor(c.region)}>
                            <span>{c.flag}</span>
                            {c.name.common || 'Unknown'}
                        </div>
                        <p>has a population of {c.population} people</p>
                    </li>))
                })
                </ul>

            </main>
        </>
    )
}

export default App
