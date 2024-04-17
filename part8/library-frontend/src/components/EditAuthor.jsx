/* eslint-disable react/prop-types */
import { useState } from "react"
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from "../services/query"
import { SelectorStyle } from "../styles"
import Input from "./Input"

const EditAuthor = ({ authorNames }) => {
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

    const authors = authorNames.map(name => {
        return { value: name, label: name}
    })

    return (
        <div>
            <h2>Set Birthyear</h2>
            <form onSubmit={handleEdit}>
                <SelectorStyle 
                    defaultInputValue=""
                    onChange={({ value }) => setName(value)}
                    options={authors}
                    />
                <Input label={"Born"} value={born} setter={setBorn}/>
                <button type="submit">Edit Author</button>
            </form>
        </div>
    )
}

export default EditAuthor