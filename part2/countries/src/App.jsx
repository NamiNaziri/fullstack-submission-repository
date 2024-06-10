/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import axios from 'axios'

const ShowCountriesList = ({countriesToShow, onShowCountry}) => {
  return (
    <>
      {countriesToShow.map((country) => (
      <div key={country.name.common.toLowerCase()}>
        <p >{country.name.common.toLowerCase()}
        <button onClick={()=>onShowCountry(country.name.common.toLowerCase())}>show</button></p>
      </div>
      ))}
      </>
    
  )
}

const Showweather = ({weather}) => {
  return(
    <>
      <p>Temperature {weather.main.temp} Celcius</p>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></img>
      <p>Wind {weather.wind.speed} m/s</p>
    </>
  )
}

const ShowCountry = ({country, weather}) => {
  console.log(weather.weather[0])
  return(
    <>
    <h2>{country.name.common.toLowerCase()} </h2>
    <p>{`capital ${country.capital}`}</p>
    <p>{`area ${country.area}`}</p>
    <h3>Languages</h3>
    <ul>
      {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
    </ul>
    <img src={country.flags.png}/>
    <Showweather weather={weather}></Showweather>
    </>
  )

}

const App = () => {

  const [countrySearch, setCountrySearch] = useState('')
  const [countriesToShow, setCountriesToShow] = useState([])
  const [weather, setWeather] = useState(null)
  const api_key = import.meta.env.VITE_SOME_KEY
  useEffect(() => {

    // skip if currency is not defined
    if (countrySearch) {
      console.log('fetching exchange ratecountries...')
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          const allCountries = response.data
          const filteredCountries = allCountries.filter(country => country.name.common.toLowerCase().includes(countrySearch.toLowerCase()))
          const filteredCountriesName = filteredCountries.map(country => country.name.common.toLowerCase())
          console.log(filteredCountriesName.length)
          
          if(filteredCountries.length == 1)
            {
              axios
                .get(`https://api.openweathermap.org/data/2.5/weather?q=${filteredCountries[0].capital}&appid=${api_key}&units=metric`)
                .then(response =>{
                  setWeather(response.data)
                  setCountriesToShow(filteredCountries)
                })
            }
          else
            {setCountriesToShow(filteredCountries)}
        })
    }
  }, [countrySearch])

  const handleChange = (event) => {
    setCountrySearch(event.target.value)
  }

  const handleShowCountry = (name) => {
    // const newCountryToShow = countriesToShow.filter(country => country.name.common.toLowerCase() === name)
    // console.log(newCountryToShow)
    // axios
    //   .get(`https://api.openweathermap.org/data/2.5/weather?q=${newCountryToShow.capital}&appid=${api_key}&units=metric`)
    //   .then(response =>{
    //     setWeather(response.data)
    // })
    // setCountriesToShow(newCountryToShow)
    setCountrySearch(name)
  }


  return (
    <div>
      <p>
        find countries:</p>
       <input value={countrySearch} onChange={handleChange} />
        
       {countriesToShow.length > 10 ? <p>Too many matches, specify another filter </p> :
       countriesToShow.length == 1? <ShowCountry country={countriesToShow[0]} weather={weather} /> : <ShowCountriesList countriesToShow={countriesToShow} onShowCountry={handleShowCountry} />}
    </div>
  )
}

export default App