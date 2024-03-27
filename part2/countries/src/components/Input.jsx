const Input = ({value, handler, text}) => {
    return (
        <div>
          {text}: <input 
            value={value} 
            onChange={handler}
          />
        </div>
    )
}

export default Input