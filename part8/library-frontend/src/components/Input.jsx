/* eslint-disable react/prop-types */
const Input = ({ label, value, setter }) => {
    const padding = { padding: 10 }
    return (
        <div style={padding}>
            <div>{label}: </div>
            <input 
                value={value}
                placeholder={`${label}...`}
                onChange={({ target }) => setter(target.value)}
                />
        </div>
    )
}

export default Input