import axios from 'axios'
import React, {useEffect, useState} from 'react'

const QueryCountry = ({name, setQuery}) => (
    <p>{name}
        <button onClick={() => setQuery(name)}>show</button>
    </p>
)

const CountryInfo = ({name, capital, population, languages, flag}) => {
    const [weather, setWeather] = useState({})
    useEffect(() => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
        axios
            .get(url)
            .then(response => {
                setWeather(response.data)
            })
    },[])
    return (
        <div>
            <h1>{name}</h1>
            <p>capital {capital}</p>
            <p>population {population}</p>
            <h2>languages</h2>
            <ul>
                {languages.map(language => <li key={language}>{language}</li>)}
            </ul>
            <img src={flag} alt="flag"/>
            <h2>Weather in {capital}</h2>
            <p><b>temperature: </b>{weather?.main?.temp ?? '[loading]'} Celcius</p>
            <p><b>forecast: </b>{weather?.weather?.[0]?.main ?? '[loading]'}</p>
            <p><b>wind: </b>{weather?.wind?.speed ?? '[loading]'} kph</p>

        </div>
    )
}
const App = () => {
    const [countries, setCountries] = useState([])
    useEffect(() => {
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(response => {
                setCountries(response.data)
            })
    }, [])

    const [query, setQuery] = useState('')

    const handleQueryChange = (event) => {
        setQuery(event.target.value)
    };
    const queryCountries = countries
        .map(country => country.name.common)
        .filter(name => name.toLowerCase().includes(query.toLowerCase()))
    let output = ""
    if (queryCountries.length > 10) {
        output = (
            <p>Too many matches, specify another filter</p>
        )
    } else if (queryCountries.length > 1) {
        output = queryCountries.map(country => <QueryCountry key={country} name={country} setQuery={setQuery}/>)
    } else if (queryCountries.length === 1) {
        const country = countries.find(country => country.name.common === queryCountries[0])
        output = <CountryInfo
            name={country.name.common}
            capital={country.capital[0]}
            population={country.population}
            languages={Object.values(country.languages)}
            flag={country.flags.png}/>
    }
    return (
        <div>
            find countries <input type="text" value={query} onChange={handleQueryChange}/>
            {output}
        </div>
    )
}

export default App