import Person from "./Person"

const Agenda = ({ persons, filter }) => {
    const lowerFilter = filter.toLowerCase()
    const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(lowerFilter))
    return (
        <>
        <h2>Numbers</h2>
        <div>
            {filteredPersons.map(person =>
                <Person key={person.id} name={person.name} number={person.number} />
            )}
        </div>
        </>
    )
}

export default Agenda