import { ALL_AUTHORS } from "../services/query"
import { useQuery } from '@apollo/client'
import EditAuthor from "./EditAuthor"

const Authors = () => {
    const result = useQuery(ALL_AUTHORS)

    if (result.loading) {
        return (
        <>
            Loading...
        </>
        )
    }

    const { data: { allAuthors: authors } } = result

    return (
        <div>
            <h1>Authors</h1>
            <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Born</th>
                    </tr>
                    {
                        authors.map(author =>
                            <tr key={author.id}>
                                <td>{author.name}</td>
                                <td>{author?.born ?? 'Unknown'}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <EditAuthor />
        </div>
    )
}

export default Authors