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


    async function fetchCountry() {
        try {
            const responseName = await axios.get('https://restcountries.com/v3.1/all', {
                params: {
                    fields: 'name',
                }
            })
            const responseAmount = await axios.get('https://restcountries.com/v3.1/all', {
                params: {
                    fields: 'population',
                }
            })
            const responseRegion = await axios.get('https://restcountries.com/v3.1/all', {
                params: {
                    fields: 'region',
                }
            })

            console.log(responseName.data[0])
            console.log(responseAmount.data[0])
            console.log(responseRegion.data[0])
            setCountryName(responseName.data[0])
            setCountryPopulation(responseAmount.data[0])
            setRegion(responseRegion.data[0])
        } catch (error) {
            console.error(error)
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
                    <li className ={regionColor(region)}>{`${countryName.name?.common} has a population of ${countryPopulation.population} people`}</li>
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
