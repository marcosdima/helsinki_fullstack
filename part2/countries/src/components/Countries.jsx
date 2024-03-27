const Countries = ({ countries, show }) => {
    const conutryStyle = { marginRight: 10 }
    return (
        <div>
            {countries.map(country =>
                <div key={country.name.common}>
                    <span style={conutryStyle} >{country.name.common}</span>
                    <button onClick={() => show(country.name.common)} >show</button>
                </div>
            )}
        </div>
    )
}

export default Countries