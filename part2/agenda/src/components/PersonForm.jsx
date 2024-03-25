import Input from "./Input"

const PersonForm = ({submitFunction, inputs}) => {
    return (
        <form onSubmit={submitFunction}>
            {inputs.map(
                input =>
                    <Input
                        key={input.text} 
                        text={input.text} 
                        handler={input.handler}
                        />
            )}
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm