const Country = ({country}) => {
    if (!country) return null

    const { name: { common: name }, capital, area , languages, flag } = country;
    const formattedCapital = capital.join(' ');  
    const arrayOfLanguage = Object.values(languages)

    const flagStyle = {
        fontSize: 300
    }

    return (
        <>
            <h1>{name}</h1>
            <p>capital {formattedCapital}</p>
            <p>area {area}</p>
            <h5>languages:</h5>
            <ul>
                {arrayOfLanguage.map((language, index) => (
                    <li key={index}>{language}</li>
                ))}
            </ul>
            <div style={flagStyle} >{flag}</div>
        </>
    )
}

export default Country