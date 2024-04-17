import { useState } from "react"
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from "../services/query"
import Input from "./Input"

const EditAuthor = () => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')
    const [editAuthor] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [ { query: ALL_AUTHORS } ]
    })

    const handleEdit = (event) => {
        event.preventDefault()

        editAuthor({ variables: { name, born: Number(born) } })

        setName('')
        setBorn('')
    }

    return (
        <div>
            <h2>Set Birthyear</h2>
            <form onSubmit={handleEdit}>
                <Input label={"Name"} value={name} setter={setName}/>
                <Input label={"Born"} value={born} setter={setBorn}/>
                <button type="submit">Edit Author</button>
            </form>
        </div>
    )
}

export default EditAuthor