import './App.css';
/*import Region from "./components/regions/Region.jsx";*/
import world_map from "./assets/world_map.png"
import axios from "axios";
import {useState} from "react";
import regionColor from "./helpers/region-colors.js";
import millions from "./helpers/round.js";

function App() {

    const [countryName, setCountryName] = useState('')
    const [countryPopulation, setCountryPopulation] = useState(0)
    const [region, setRegion] = useState('')
    const [flag, setFlag] = useState('')
    const [country, setCountry] = useState([])
    const [singleCountry, setSingleCountry] = useState(0)
    const [singleCountryName, setSingleCountryName] = useState('')
    const [singleCountrySubregion, setSingleCountrySubregion] = useState('')
    const [singleCountryCapital, setSingleCountryCapital] = useState('')
    const [singleCountryFlag, setSingleCountryFlag] = useState(null)
    const [singleCountryAlt, setSingleCountryAlt] = useState('')
    const [singleCountryPopulation, setSingleCountryPopulation] = useState(0)
    const [singleCountryNeighbours, setSingleCountryNeighbours] = useState(0)
    const [singleCountryDomain, setSingleCountryDomain] = useState('')



    async function fetchCountry() {
        try {
            const response = await axios.get('https://restcountries.com/v3.1/all', {
                params: {fields: 'name,population,region,flag'}
            });

            const country = response.data;

            country.sort((a, b) => a.population - b.population)


            /*console.log(country);*/
            setCountry(country);
            setCountryName(country.name);
            setCountryPopulation(country.population);
            setRegion(country.region);
            setFlag(country.flag)
            setCountry(response.data)
        } catch (error) {
            console.error(error);
        }
    }

    async function fetchSingleCountry() {
        try {
            const response = await axios.get('https://restcountries.com/v3.1/name/nederland', {});

            const singleCountry = response.data;
            console.log(singleCountry[0].name.common);
            console.log(singleCountry[0].capital[0]);
            console.log(singleCountry[0]);
            console.log(millions(singleCountry[0].population));

            setSingleCountry(singleCountry)
            setSingleCountryName(singleCountry[0].name.common)
            setSingleCountrySubregion(singleCountry[0].subregion)
            setSingleCountryCapital(singleCountry[0].capital)
            setSingleCountryFlag(singleCountry[0].flags.png)
            setSingleCountryPopulation(millions(singleCountry[0].population))
            setSingleCountryNeighbours(singleCountry[0].borders.length)
            setSingleCountryDomain(singleCountry[0].tld[0])


        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="full-page">
            <header className="map-and-title">
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
                <section>
                    <ul className="country-list">
                        {country.map((c) => (
                            <li key={c.name.common}>
                                <div className={regionColor(c.region)}>
                                    <span>{c.flag}</span>
                                    {c.name.common || 'Unknown'}
                                </div>
                                <p>has a population of {c.population} people</p>
                            </li>))
                        }
                    </ul>
                </section>

                <section>
                    <button type="button"
                            onClick={fetchSingleCountry}
                    >
                        Zoek
                    </button>
                    <h1><span><img className="flag" src={singleCountryFlag} alt={singleCountryAlt}/></span>{singleCountryName}</h1>
                    <p>{singleCountryName} is situated in {singleCountrySubregion} and the capital is {singleCountryCapital}.
                        It has a population of {singleCountryPopulation} million people and it borders with {singleCountryNeighbours} neighboring countries.
                        Websites can be found on {singleCountryDomain} domains</p>
                </section>

            </main>
        </div>
    )
}

export default App
