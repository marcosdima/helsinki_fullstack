import Person from "./Person"

const Agenda = ({ persons }) => {
    return (
        <>
        <h2>Numbers</h2>
        <div>
            {persons.map(person =>
                <Person key={person.name} name={person.name} />
            )}
        </div>
        </>
    )
}

export default Agenda