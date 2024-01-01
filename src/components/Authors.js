import { gql, useQuery } from '@apollo/client'
import BirthYear from './BirthYear'

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

const Authors = (props) => {
  const { loading, error, data } = useQuery(ALL_AUTHORS, {
    pollInterval: 2000,
  })
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  const authors = data && data.allAuthors ? data.allAuthors : []
  const authorsWithoutBirthYear = authors.filter(a => a.born == null)
  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <BirthYear authors={authorsWithoutBirthYear} />
    </div>
  )
}

export default Authors
