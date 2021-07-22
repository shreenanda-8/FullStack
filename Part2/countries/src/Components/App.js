import React, { useEffect, useState } from 'react'
import axios from 'axios'
const Expand = ({ info }) => {
     const Languages = info[0].languages.map((name, index) => <li key={index}>{name.name}</li>)
    const Style = {
        width: "100px",
        height: "100px",
        margin: "15px"
    }
   
     const [weatherData, setWeather] = useState({})
    const dependency = info[0].capital
     useEffect(()=>{
        const params = {
            access_key: process.env.REACT_APP_API_KEY,
            query: `${dependency}`
          }
          axios.get('http://api.weatherstack.com/current', {params})
                                     .then((response)=>{
                                      
                                        const {temperature,weather_icons,wind_speed,wind_dir} = response.data.current
                                        setWeather({
                                            temperature,
                                            weather_icons,
                                            wind_speed,
                                            wind_dir
                                        })
                                     })
                                     .catch((error)=>{
                                         console.log({error: error.message})
                                     })
     }, [dependency])
   
    return (

        <div>
            <h1>{info[0].name}</h1>
            <p>Capital:  {info[0].capital}</p>
            <p>Population:  {info[0].population}</p>

            <h2>Languages</h2>
            {Languages}
            <img src={`${info[0].flag}`} style={Style} alt={"flag"} />
            <h2>Weather in {info[0].capital}</h2>
            <p>Temperature: {weatherData.temperature} Celcious</p>
            <img src = {weatherData.weather_icons} style = {Style} alt={""}/>
            <p>Wind {weatherData.wind_speed} mph direction {weatherData.wind_dir}</p>
        </div>

    )
   
   
}
const Display = ({ info }) => {
    const [expand, setExpand] = useState([])
    useEffect(() => {
        setExpand([])
    }, [info])
    
    if (info.length > 10 && info.length > 1) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    }
    if (expand.length === 1) {

        return (<Expand info={expand} />)
    }
    if (info.length === 1) {

        return (<Expand info={info} />)
    }
    const handleExpand = (info) => {

        setExpand([info])
    }
    const data = info.map((data, index) => {
        return <p key={index}>{data.name} <button onClick={() => handleExpand(data)}>Show</button></p>
    })
    return (
        data
    )

}
const App = () => {
    const [countryInfo, setCountryInfo] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [result, setResult] = useState([])
    useEffect(() => {
        axios.get('https://restcountries.eu/rest/v2/all')
            .then((response) => {
                const data = response.data

                setCountryInfo([...data])
            })
            .catch((error) => {
                console.log({ error: error.message })
            })
    }, [])
    const handleChangeInput = (event) => {

        setInputValue(event.target.value)
        const responseFromAPI = countryInfo.filter((info) => {
            return info.name.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setResult(responseFromAPI)
    }

    return (
        <div>
            find countries <input value={inputValue} onChange={(event) => handleChangeInput(event)} />
            <Display info={result} />
        </div>

    )
}
export default App