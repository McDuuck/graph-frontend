import { useState } from "react";
import { gql, useMutation } from '@apollo/client'

const UPDATE_AUTHOR = gql`
    mutation updateAuthor($name: String!, $born: Int!){
        editAuthor (
            name: $name,
            setBornTo: $born
        ) {
            name
            born
        }
    }
`

const BirthYear = ({ authors }) => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')
    const [ updateAuthor ] = useMutation(UPDATE_AUTHOR)

    const submit = async (event) => {
        event.preventDefault()
        updateAuthor({ variables: { name, born: parseInt(born) } })
        
        setName('')
        setBorn('')
    }

    return (
        <div>
            <b>Set birthyear</b>
          <form onSubmit={submit}>
            <div>
              name
              <select value={name} onChange={({ target }) => setName(target.value)}>
                <option value="">Select author</option>
                {authors.map(author => (
                  <option key={author.name} value={author.name}>
                    {author.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              born
              <input
                value={born}
                onChange={({ target }) => setBorn(target.value)}
              />
            </div>
            <button type="submit">update author</button>
          </form>
        </div>
      )
}

export default BirthYear