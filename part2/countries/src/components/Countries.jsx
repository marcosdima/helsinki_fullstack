const Countries = ({ countries }) => {
    return (
        <div>
            {countries.map(country =>
                <div key={country.name.common}>
                    {country.name.common}
                </div>
            )}
        </div>
    )
}

export default Countries