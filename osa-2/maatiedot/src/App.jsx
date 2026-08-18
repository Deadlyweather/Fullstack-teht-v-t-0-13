import { useState, useEffect } from 'react'
import axios from "axios"
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'

const api_key = import.meta.env.VITE_WEATHER_KEY
console.log(api_key)

const Searchbar = (props) => {
  return (
    <div>
      <input type="text" placeholder="Add filter" onChange={props.Filter} value={props.filters}></input>
      <div>
        
        {props.DenyFilter}
      </div>
      
    </div>
  )
}

const Languages = (props) => {
  if (!props.country) {
    return null
  }

  const languages = props.country.languages ? Object.values(props.country.languages) : []

  // Estää kaatumisen
  if (!props.weather || !props.weather.main || !props.weather.weather) {
    return (
      "Loading"
    )
  }

  const temperature = Math.round(props.weather.main.temp)
  const icon = `https://openweathermap.org/img/wn/${props.weather.weather[0].icon}@2x.png`
  const windSpeed = props.weather.wind.speed

  return (
    <div>
      <h1>
        {props.country.name.common}
      </h1>
      
      <p>
        Capital: {props.country.capital}
      </p>
      <p>
        Area: {props.country.area}
      </p>

      <h2>
        Languages
      </h2>
      <ul>
        {languages.map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <img src={props.country.flags.png}></img>
      <h2>Weather in {props.country.name.common}</h2>
      <div>
        <p>Temperature: {temperature}°C</p>
        <img src={icon}></img>
        <p>Wind Speed: {windSpeed} m/s</p>
      </div>
    </div>
  )
}

function App() {

  const [countries, setCountries] = useState([])
  const [filters, setFilters] = useState('')
  const [Selected, setSelect] = useState('')
  const [weather, setWeather] = useState('')

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => response.data)
      .then(data => {
        setCountries(data)
      })
  }, [])

  const KEY = api_key

  console.log(KEY)

  const getWeather = () => {
    if (!Selected) {return}
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${Selected.latlng[0]}&lon=${Selected.latlng[1]}&appid=${KEY}`)
    .then(response => {
      console.log(response.data);
      setWeather(response.data)
    })
  }

  useEffect(() => {
    getWeather()
  }, [Selected])

  const Filter = (event) => {
    console.log(event.target.value)
    setFilters(event.target.value)
    // Poistaa valinnan kätevyyden vuoksi
    setSelect('')
  }

  const DenyFilter = () => {
    return "Add more specific filter"
  }

  const MaxFilter = 10

  const filteredCountries = countries.filter(country => 
    country.name.common.toLowerCase().includes(filters.toLowerCase())
  )

  const SelectCountry = (event) => {
    setSelect(event.target.value)
  }

  return (
    <div>
      <Searchbar 
        Filter={Filter}
        setFilters={setFilters}
        DenyFilter={filters.length > 0 && filteredCountries.length > MaxFilter ? <DenyFilter /> : null}
      />

      <Languages
        country={Selected ? Selected : (filteredCountries.length === 1 ? filteredCountries[0] : null)}
        weather={weather}
      />
      
      <ul>
        {(filteredCountries.length > MaxFilter && filters.length > 0) || filteredCountries.length === 1 || Selected ? null : filteredCountries.map((country, index) => {
          return <li key={index}>{country.name.common} <button onClick={() => setSelect(country)}>Show</button></li>
        })}
      </ul>
    </div>
  )
}

export default App