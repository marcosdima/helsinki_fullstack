import Person from "./Person"

const Agenda = ({ persons, filter, deletePerson }) => {
    const lowerFilter = filter.toLowerCase()
    const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(lowerFilter))
    return (
        <>
        <h2>Numbers</h2>
        <div>
            {filteredPersons.map(person =>
                <span key={person.id}>
                    <div>
                        <Person name={person.name} number={person.number} />
                        <button onClick={() => deletePerson(person.id)} >delete</button>
                    </div>
                </span>
            )}
        </div>
        </>
    )
}

export default Agenda