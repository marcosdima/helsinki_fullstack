import Person from "./Person"

const Agenda = ({ persons, filter }) => {
    const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter))
    return (
        <>
        <h2>Numbers</h2>
        <div>
            {filteredPersons.map(person =>
                <Person key={person.id} name={person.name} phone={person.phone} />
            )}
        </div>
        </>
    )
}

export default Agenda