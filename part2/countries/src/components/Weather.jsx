function farToCelcius(temp) {
    const celcius = temp - 273.15
    return celcius.toFixed(2)
}

const Weather = ({weather}) => {
    if (!weather) return null
    const {country, temperature, icon, wind} = weather

    return (
        <>
            <h2>Weather in {country}</h2>
            <p>temperature {farToCelcius(temperature)} Celcius</p>
            <img src={icon} alt="Weather Icon" />
            <p>wind {wind} m/s</p>
        </>
    )
}

export default Weather